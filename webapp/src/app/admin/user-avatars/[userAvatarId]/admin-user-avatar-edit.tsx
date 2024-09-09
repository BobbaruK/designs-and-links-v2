"use client";

import { adminDeleteUserAvatar, adminEditUserAvatar } from "@/actions/dl";
import { revalidate } from "@/actions/reavalidate";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";
import { DeleteDialog } from "@/components/delete-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCurrentRole } from "@/hooks/use-current-role";
import { UserAvatarSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { DL_UserAvatar } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  avatar: DL_UserAvatar;
}

export const AdminUserAvatarEdit = ({ avatar }: Props) => {
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const userRole = useCurrentRole();

  const form = useForm<z.infer<typeof UserAvatarSchema>>({
    resolver: zodResolver(UserAvatarSchema),
    defaultValues: {
      name: avatar.name || undefined,
      url: avatar.url || undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof UserAvatarSchema>) => {
    setSuccess(undefined);
    setError(undefined);

    startTransition(() => {
      adminEditUserAvatar(values, avatar.id)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            update();
            setSuccess(data.success);
            setTimeout(() => router.push("/admin/user-avatars"), 300);
          }
          revalidate();
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  const onDelete = () => {
    adminDeleteUserAvatar(avatar.id).then((data) => {
      if (data.error) {
        setError(data.error);
      }
      if (data.success) {
        setSuccess(data.success);
        setTimeout(() => router.push(`/admin/user-avatars`), 300);
      }
      revalidate();
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
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Avatar 1"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Url</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="https://site.com/image.png"
                    disabled={isPending}
                  />
                </FormControl>
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
              label={avatar.name}
              asset={"user avatar"}
              onDelete={onDelete}
            />
          )}
        </div>
      </form>
    </Form>
  );
};
