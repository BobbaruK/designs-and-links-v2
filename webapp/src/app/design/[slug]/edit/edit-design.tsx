"use client";

import {
  deleteDesign,
  deleteSubDesign,
  editDesign,
  editSubDesign,
} from "@/actions/dl";
import { revalidate } from "@/actions/reavalidate";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";
import { CustomAvatar } from "@/components/custom-avatar";
import { DeleteDialog } from "@/components/delete-dialog";
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
import { useCurrentRole } from "@/hooks/use-current-role";
import { DesignSchema } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DL_Design,
  DL_DesignAvatar,
  DL_SubDesign,
  Prisma,
} from "@prisma/client";
import { Check, ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  design?: DL_Design;
  subDesign?: DL_SubDesign;
  designAvatars: DL_DesignAvatar[] | null;
  designs: DL_Design[] | null;
}

export const EditDesign = ({
  design,
  subDesign,
  designAvatars,
  designs,
}: Props) => {
  const router = useRouter();
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const userRole = useCurrentRole();
  const [subDesignAvatar, setSubDesignAvatar] = useState<string | null>();

  const form = useForm<z.infer<typeof DesignSchema>>({
    resolver: zodResolver(DesignSchema),
    defaultValues: {
      name: design?.name || subDesign?.name || undefined,
      slug: design?.slug || subDesign?.slug || undefined,
      avatar: design?.avatar || subDesign?.avatar || undefined,
      isSubDesign: subDesign?.DL_DesignId || undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof DesignSchema>) => {
    setSuccess(undefined);
    setError(undefined);

    startTransition(() => {
      if (design) {
        editDesign(values, design.id)
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

      if (subDesign) {
        editSubDesign(values, subDesign.id)
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

      setError("Something went wrong!");
    });
  };

  const onDelete = () => {
    if (design) {
      deleteDesign(design.id).then((data) => {
        if (data.error) {
          setError(data.error);
        }
        if (data.success) {
          setSuccess(data.success);
          setTimeout(() => router.push(`/design`), 300);
        }
        revalidate();
      });

      return;
    }

    if (subDesign) {
      deleteSubDesign(subDesign.id).then((data) => {
        if (data.error) {
          setError(data.error);
        }
        if (data.success) {
          setSuccess(data.success);
          setTimeout(() => router.push(`/design`), 300);
        }
        revalidate();
      });

      return;
    }
  };

  const onResetAvatar = () => {
    form.setValue("avatar", "");
  };

  const onResetDesign = () => {
    form.setValue("isSubDesign", "");
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
                    placeholder="Form Validation"
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
                  <Input {...field} placeholder="design" type="text" disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
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
                            : "Select design logo"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                      <Command>
                        <CommandInput placeholder="Search design logo..." />
                        <CommandList>
                          <CommandEmpty>No flag found.</CommandEmpty>
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
                              .map((design) => (
                                <CommandItem
                                  value={design.name}
                                  key={design.id}
                                  onSelect={() => {
                                    form.setValue("avatar", design.url);
                                  }}
                                  className="flex items-center gap-0"
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      design.url === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  <div className="flex items-center gap-4">
                                    <CustomAvatar
                                      image={design.url}
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
                    {/* <CustomAvatar image={form.getValues("avatar")} /> */}
                    {form.getValues("avatar") && (
                      <Image
                        src={form.getValues("avatar")!}
                        alt={`'s Logo`}
                        className="object-cover"
                        unoptimized
                        width={150}
                        height={10}
                      />
                    )}

                    {form.getValues("avatar") && (
                      <Button
                        size={"sm"}
                        variant={"link"}
                        className="text-foreground"
                        onClick={onResetAvatar}
                        type="button"
                      >
                        Remove design
                      </Button>
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
                              .map((leDesign) => {
                                if (leDesign.id === design?.id) return;

                                return (
                                  <CommandItem
                                    value={leDesign.name}
                                    key={leDesign.id}
                                    onSelect={() => {
                                      form.setValue("isSubDesign", leDesign.id);
                                      setSubDesignAvatar(leDesign.avatar);
                                    }}
                                    className="flex items-center gap-0"
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        leDesign.id === field.value
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
                                    <div className="flex items-center gap-4">
                                      <CustomAvatar
                                        image={leDesign.avatar}
                                        className="size-7"
                                      />
                                      {leDesign.name}
                                    </div>
                                  </CommandItem>
                                );
                              })}
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
                      </>
                    )}
                    {form.getValues("isSubDesign") && (
                      <Button
                        size={"sm"}
                        variant={"link"}
                        className="text-foreground"
                        onClick={() => form.setValue("isSubDesign", "")}
                        type="button"
                      >
                        Remove sub design avatar
                      </Button>
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
        <div className="flex gap-4">
          <Button type="submit">Update</Button>
          {userRole !== "USER" && (
            <DeleteDialog
              label={design?.name || subDesign?.name || ""}
              asset={"design"}
              onDelete={onDelete}
            />
          )}
        </div>
      </form>
    </Form>
  );
};
