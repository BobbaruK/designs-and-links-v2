"use client";

import { adminAddUser } from "@/actions/dl";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { userRoles } from "@/lib/constants";
import { AdminUserAddSchema } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Prisma, UserRole } from "@prisma/client";
import { Check, ChevronsUpDown } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  avatars:
    | Prisma.DL_UserAvatarGetPayload<{
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
}

export const AdminUserAdd = ({ avatars }: Props) => {
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof AdminUserAddSchema>>({
    resolver: zodResolver(AdminUserAddSchema),
    defaultValues: {
      name: "",
      email: "",
      password: process.env.NEXT_PUBLIC_DEFAULT_REGISTER_PASSWORD || "",
      image: "",
      role: UserRole.USER,
      isTwoFactorEnabled: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof AdminUserAddSchema>) => {
    setSuccess(undefined);
    setError(undefined);

    startTransition(() => {
      adminAddUser(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            update();
            setSuccess(data.success);
            setTimeout(() => router.push("/admin/users"), 300);
          }
          revalidate();
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  const onResetAvatar = () => {
    form.setValue("image", "");
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
                <FormControl>
                  <Input
                    {...field}
                    placeholder="John Doe"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="john.doe@example.com"
                    type="email"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="******"
                    type="password"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
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
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value
                            ? avatars?.find(
                                (avatar) => avatar.url === field.value,
                              )?.name
                            : "Select avatar"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search avatar..." />
                        <CommandList>
                          <CommandEmpty>No avatar found.</CommandEmpty>
                          <CommandGroup>
                            {avatars
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
                              .map((avatar) => (
                                <CommandItem
                                  value={avatar.id}
                                  key={avatar.id}
                                  onSelect={() => {
                                    form.setValue("image", avatar.url);
                                  }}
                                  className="flex items-center gap-0"
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      avatar.url === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  <div className="flex items-center gap-4">
                                    <CustomAvatar
                                      image={avatar.url}
                                      className="size-7"
                                    />
                                    {avatar.name}
                                  </div>
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription className="flex items-center gap-4">
                    <CustomAvatar image={form.getValues("image")} />
                    {form.getValues("image") && (
                      <Button
                        size={"sm"}
                        variant={"link"}
                        className="text-foreground"
                        onClick={onResetAvatar}
                        type="button"
                      >
                        Delete avatar
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
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  disabled={isPending}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {userRoles().map((role) => (
                      <SelectItem value={role} key={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isTwoFactorEnabled"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-md border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Two Factor Authentication</FormLabel>
                  <FormDescription>
                    Enable 2FA for your account.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    disabled={isPending}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormSuccess message={success} />
        <FormError message={error} />
        <Button type="submit">Add user</Button>
      </form>
    </Form>
  );
};
