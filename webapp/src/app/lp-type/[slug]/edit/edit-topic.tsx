"use client";

import { deleteLandingPageType, editLandingPageType } from "@/actions/dl";
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
import { Textarea } from "@/components/ui/textarea";
import { useCurrentRole } from "@/hooks/use-current-role";
import { LandingPageTypeSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { DL_Topic } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  topic: DL_Topic;
}

export const EditLandingPageType = ({ topic }: Props) => {
  const router = useRouter();
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const userRole = useCurrentRole();

  const form = useForm<z.infer<typeof LandingPageTypeSchema>>({
    resolver: zodResolver(LandingPageTypeSchema),
    defaultValues: {
      name: topic?.name || undefined,
      slug: topic?.slug || undefined,
      description: topic?.description || undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof LandingPageTypeSchema>) => {
    setSuccess(undefined);
    setError(undefined);

    startTransition(() => {
      editLandingPageType(values, topic.id)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            setSuccess(data.success);

            setTimeout(() => router.push(`/lp-type/${data.slug}`), 300);
          }
          revalidate();
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  const onDelete = () => {
    deleteLandingPageType(topic.id).then((data) => {
      if (data.error) {
        setError(data.error);
      }
      if (data.success) {
        setSuccess(data.success);
        setTimeout(() => router.push(`/lp-type`), 300);
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
                  <Input {...field} placeholder="topic" type="text" disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Topic description..."
                    className="resize-none"
                    {...field}
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
              label={topic?.name}
              asset={"topic"}
              onDelete={onDelete}
            />
          )}
        </div>
      </form>
    </Form>
  );
};
