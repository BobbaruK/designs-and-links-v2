"use client";

import { addDesign, addSubDesign } from "@/actions/dl";
import { revalidate } from "@/actions/reavalidate";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";
import { CustomAvatar } from "@/components/custom-avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DesignSchema } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { DL_Design, Prisma } from "@prisma/client";
import { Check, ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  designAvatars:
    | Prisma.DL_DesignAvatarGetPayload<{
        include: {
          createdBy: {
            omit: {
              password: false;
            };
          };
          updatedBy: {
            omit: {
              password: false;
            };
          };
        };
      }>[]
    | null;

  designs: DL_Design[] | null;
}

export const AddDesign = ({ designAvatars, designs }: Props) => {
  const router = useRouter();
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const [subDesignAvatar, setSubDesignAvatar] = useState<string | null>();

  const form = useForm<z.infer<typeof DesignSchema>>({
    resolver: zodResolver(DesignSchema),
    defaultValues: {
      name: "",
      slug: "",
      avatar: "",
      isSubDesign: "",
    },
  });

  const onSubmit = (values: z.infer<typeof DesignSchema>) => {
    setSuccess(undefined);
    setError(undefined);

    startTransition(() => {
      if (!form.getValues("isSubDesign")) {
        addDesign(values)
          .then((data) => {
            if (data.error) {
              setError(data.error);
            }
            if (data.success) {
              setSuccess(data.success);
              setTimeout(() => router.push(`/design/${data.slug}`), 300);
            }
            revalidate();
          })
          .catch(() => setError("Something went wrong!"));

        return;
      }

      addSubDesign(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            setSuccess(data.success);
            setTimeout(() => router.push(`/design/${data.slug}`), 300);
          }
          revalidate();
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl
                  onKeyUp={(e) => {
                    form.setValue(
                      "slug",
                      field.value.toLowerCase().replaceAll(/[^A-Z0-9]/gi, "-"),
                    );
                  }}
                >
                  <Input
                    {...field}
                    placeholder="Amazon World"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="amazon-world"
                    type="text"
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="self-start">Avatar</FormLabel>
                <div className="flex flex-row items-center gap-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl className="w-full">
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[300px] justify-between",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value
                            ? designAvatars?.find(
                                (designAvatar) =>
                                  designAvatar.url === field.value,
                              )?.name
                            : "Select design avatar"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                      <Command>
                        <CommandInput placeholder="Search design avatar..." />
                        <CommandList>
                          <CommandEmpty>No design avatar found.</CommandEmpty>
                          <CommandGroup>
                            {designAvatars
                              ?.sort((a, b) => {
                                const nameA = a.name.toUpperCase();
                                const nameB = b.name.toUpperCase();
                                if (nameA < nameB) {
                                  return -1;
                                }
                                if (nameA > nameB) {
                                  return 1;
                                }

                                return 0;
                              })
                              .map((designAvatar) => (
                                <CommandItem
                                  value={designAvatar.name}
                                  key={designAvatar.id}
                                  onSelect={() => {
                                    form.setValue("avatar", designAvatar.url);
                                  }}
                                  className="flex items-center gap-0"
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      designAvatar.url === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  <div className="flex items-center gap-4">
                                    <CustomAvatar
                                      image={designAvatar.url}
                                      className="size-7"
                                    />
                                    {designAvatar.name}
                                  </div>
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription
                    className={cn("flex h-auto items-center gap-4")}
                  >
                    {/* <CustomAvatar image={form.getValues("logo")} /> */}
                    {form.getValues("avatar") && (
                      <>
                        <Image
                          src={form.getValues("avatar")!}
                          alt={`Logo`}
                          className="object-cover"
                          unoptimized
                          width={150}
                          height={10}
                        />
                        <Button
                          size={"sm"}
                          variant={"link"}
                          className="text-foreground"
                          onClick={() => form.setValue("avatar", "")}
                          type="button"
                        >
                          Remove design avatar
                        </Button>
                      </>
                    )}
                  </FormDescription>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isSubDesign"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="self-start">Is subdesign to:</FormLabel>
                <div className="flex flex-row items-center gap-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl className="w-full">
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[300px] justify-between",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value
                            ? designs?.find(
                                (design) => design.id === field.value,
                              )?.name
                            : "Select design"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                      <Command>
                        <CommandInput placeholder="Search design..." />
                        <CommandList>
                          <CommandEmpty>No design found.</CommandEmpty>
                          <CommandGroup>
                            {designs
                              ?.sort((a, b) => {
                                const nameA = a.name.toUpperCase();
                                const nameB = b.name.toUpperCase();
                                if (nameA < nameB) {
                                  return -1;
                                }
                                if (nameA > nameB) {
                                  return 1;
                                }

                                return 0;
                              })
                              .map((design) => (
                                <CommandItem
                                  value={design.name}
                                  key={design.id}
                                  onSelect={() => {
                                    form.setValue("isSubDesign", design.id);
                                    setSubDesignAvatar(design.avatar);
                                  }}
                                  className="flex items-center gap-0"
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      design.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  <div className="flex items-center gap-4">
                                    <CustomAvatar
                                      image={design.avatar}
                                      className="size-7"
                                    />
                                    {design.name}
                                  </div>
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription
                    className={cn("flex h-auto items-center gap-4")}
                  >
                    {subDesignAvatar && (
                      <>
                        <Image
                          src={subDesignAvatar}
                          alt={`Logo`}
                          className="object-cover"
                          unoptimized
                          width={150}
                          height={10}
                        />
                        <Button
                          size={"sm"}
                          variant={"link"}
                          className="text-foreground"
                          onClick={() => form.setValue("isSubDesign", "")}
                          type="button"
                        >
                          Remove sub design avatar
                        </Button>
                      </>
                    )}
                  </FormDescription>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormSuccess message={success} />
        <FormError message={error} />
        <Button type="submit">Add</Button>
      </form>
    </Form>
  );
};
