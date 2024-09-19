"use client";

import { addLandingPage } from "@/actions/dl";
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
import { Switch } from "@/components/ui/switch";
import { LandingPageSchema } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Prisma } from "@prisma/client";
import { Check, ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type SubDesign =
  | Prisma.DL_SubDesignGetPayload<{
      include: {
        createdBy: {
          omit: {
            password: true;
          };
        };
        updatedBy: {
          omit: {
            password: true;
          };
        };
      };
    }>[]
  | null;

interface Props {
  users:
    | Prisma.UserGetPayload<{
        omit: {
          password: true;
        };
        include: {
          accounts: {
            omit: {
              refresh_token: true;
              access_token: true;
              token_type: true;
              id_token: true;
              session_state: true;
              providerAccountId: true;
              expires_at: true;
              scope: true;
            };
          };
          formValidationCreated: false;
          formValidationUpdated: false;
        };
      }>[]
    | null;
  topics:
    | Prisma.DL_TopicGetPayload<{
        include: {
          createdBy: {
            omit: {
              password: true;
            };
          };
          updatedBy: {
            omit: {
              password: true;
            };
          };
        };
      }>[]
    | null;
  designs:
    | Prisma.DL_DesignGetPayload<{
        include: {
          createdBy: {
            omit: {
              password: true;
            };
          };
          updatedBy: {
            omit: {
              password: true;
            };
          };
          subDesigns: {
            include: {
              createdBy: {
                omit: {
                  password: true;
                };
              };
              updatedBy: {
                omit: {
                  password: true;
                };
              };
            };
          };
        };
      }>[]
    | null;
  subDesigns: SubDesign;
  formValidations:
    | Prisma.DL_FormValidationGetPayload<{
        include: {
          createdBy: {
            omit: {
              password: true;
            };
          };
          updatedBy: {
            omit: {
              password: true;
            };
          };
        };
      }>[]
    | null;
  licenses:
    | Prisma.DL_LicenseGetPayload<{
        include: {
          createdBy: {
            omit: {
              password: true;
            };
          };
          updatedBy: {
            omit: {
              password: true;
            };
          };
        };
      }>[]
    | null;
  lpTypes:
    | Prisma.DL_LandingPageTypeGetPayload<{
        include: {
          createdBy: {
            omit: {
              password: true;
            };
          };
          updatedBy: {
            omit: {
              password: true;
            };
          };
        };
      }>[]
    | null;
  languages:
    | Prisma.DL_LanguageGetPayload<{
        include: {
          createdBy: {
            omit: {
              password: true;
            };
          };
          updatedBy: {
            omit: {
              password: true;
            };
          };
        };
      }>[]
    | null;
  brands:
    | Prisma.DL_BrandGetPayload<{
        include: {
          createdBy: {
            omit: {
              password: true;
            };
          };
          updatedBy: {
            omit: {
              password: true;
            };
          };
        };
      }>[]
    | null;
}

export const AddLandingPage = ({
  users,
  topics,
  designs,
  subDesigns,
  formValidations,
  licenses,
  lpTypes,
  languages,
  brands,
}: Props) => {
  const router = useRouter();
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const [leSubDesigns, setLeSubDesigns] = useState<SubDesign>();
  const [requesterAvatar, setRequesterAvatar] = useState<string | null>(null);
  const [designAvatar, setDesignAvatar] = useState<string | null>(null);
  const [subDesignAvatar, setSubDesignAvatar] = useState<string | null>(null);
  const [language, setLanguage] = useState<string | null>(null);
  const [brand, setBrand] = useState<string | null>(null);

  const form = useForm<z.infer<typeof LandingPageSchema>>({
    resolver: zodResolver(LandingPageSchema),
    defaultValues: {
      name: "",
      slug: "",
      url: "",
      whatsapp: false,
      fxoroFooter: false,
      requester: "",
      topic: "",
      design: "",
      subDesign: "",
      formValidation: "",
      license: "",
      language: "",
      lpType: "",
      brand: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LandingPageSchema>) => {
    setSuccess(undefined);
    setError(undefined);

    startTransition(() => {
      addLandingPage(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            setSuccess(data.success);
            setTimeout(() => router.push(`/landing-page/${data.slug}`), 300);
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
                    placeholder="Landing Page Name"
                    disabled={isPending}
                  />
                </FormControl>
                <FormDescription>
                  <Link
                    href={
                      "https://www.fantasynamegenerators.com/dragon-names.php"
                    }
                    target="_blank"
                  >
                    https://www.fantasynamegenerators.com/dragon-names.php
                  </Link>
                </FormDescription>
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
                    placeholder="landing-page-name"
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
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="https://something.com/lp/name-of-lp"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="whatsapp"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-md border p-3 shadow-sm">
                <FormLabel>Whatsapp</FormLabel>
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
          <FormField
            control={form.control}
            name="fxoroFooter"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-md border p-3 shadow-sm">
                <FormLabel>FXORO Footer</FormLabel>
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
          <FormField
            control={form.control}
            name="requester"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="self-start">Requester</FormLabel>
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
                            ? users?.find((user) => user.id === field.value)
                                ?.name
                            : "Select user"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                      <Command>
                        <CommandInput placeholder="Search user..." />
                        <CommandList>
                          <CommandEmpty>No user found.</CommandEmpty>
                          <CommandGroup>
                            {users
                              ?.sort((a, b) => {
                                const nameA = a.name.toLowerCase();
                                const nameB = b.name.toLowerCase();
                                if (nameA < nameB) {
                                  return -1;
                                }
                                if (nameA > nameB) {
                                  return 1;
                                }

                                return 0;
                              })
                              .map((user) => (
                                <CommandItem
                                  value={user.name}
                                  key={user.id}
                                  onSelect={() => {
                                    form.setValue("requester", user.id);
                                    setRequesterAvatar(user.image);
                                  }}
                                  className="flex items-center gap-0"
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      user.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  <div className="flex items-center gap-4">
                                    <CustomAvatar
                                      image={user.image}
                                      className="size-7"
                                    />
                                    {user.name}
                                  </div>
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription className="flex items-center gap-4">
                    {requesterAvatar && (
                      <>
                        <CustomAvatar image={requesterAvatar} />
                        <Button
                          size={"sm"}
                          variant={"link"}
                          className="text-foreground"
                          onClick={() => {
                            form.setValue("requester", "");
                            setRequesterAvatar(null);
                          }}
                          type="button"
                        >
                          Remove user
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
            name="topic"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="self-start">Topic</FormLabel>
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
                            ? topics?.find((user) => user.id === field.value)
                                ?.name
                            : "Select topic"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                      <Command>
                        <CommandInput placeholder="Search topic..." />
                        <CommandList>
                          <CommandEmpty>No topic found.</CommandEmpty>
                          <CommandGroup>
                            {topics
                              ?.sort((a, b) => {
                                const nameA = a.name.toLowerCase();
                                const nameB = b.name.toLowerCase();
                                if (nameA < nameB) {
                                  return -1;
                                }
                                if (nameA > nameB) {
                                  return 1;
                                }

                                return 0;
                              })
                              .map((topic) => (
                                <CommandItem
                                  value={topic.name}
                                  key={topic.id}
                                  onSelect={() => {
                                    form.setValue("topic", topic.id);
                                  }}
                                  className="flex items-center gap-0"
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      topic.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  <div className="flex items-center gap-4">
                                    {topic.name}
                                  </div>
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription className="flex items-center gap-4">
                    {form.getValues("topic") && (
                      <Button
                        size={"sm"}
                        variant={"link"}
                        className="p-0 text-foreground"
                        onClick={() => form.setValue("topic", "")}
                        type="button"
                      >
                        Remove topic
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
            name="design"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="self-start">Design</FormLabel>
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
                                (design) =>
                                  design.id.toLowerCase() ===
                                  field.value?.toLowerCase(),
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
                                const nameA = a.name.toLowerCase();
                                const nameB = b.name.toLowerCase();
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
                                    form.setValue("design", design.id);
                                    form.setValue("subDesign", "");
                                    setDesignAvatar(design.avatar);
                                    setSubDesignAvatar(null);
                                    setLeSubDesigns(design.subDesigns);
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
                                      className="size-20 rounded-md"
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
                  <FormDescription className="flex items-center gap-4">
                    {designAvatar && (
                      <CustomAvatar
                        image={designAvatar}
                        className="size-20 rounded-md"
                      />
                    )}
                    {form.getValues("design") && (
                      <Button
                        size={"sm"}
                        variant={"link"}
                        className="px-0 text-foreground"
                        onClick={() => {
                          form.setValue("design", "");
                          form.setValue("subDesign", "");
                          setDesignAvatar(null);
                          setSubDesignAvatar(null);
                        }}
                        type="button"
                      >
                        Remove design avatar
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
            name="subDesign"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="self-start">Sub Design</FormLabel>
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
                            ? subDesigns?.find(
                                (subDesign) => subDesign.id === field.value,
                              )?.name
                            : "Select sub design"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                      <Command>
                        <CommandInput placeholder="Search sub design..." />
                        <CommandList>
                          <CommandEmpty>No sub design found.</CommandEmpty>
                          <CommandGroup>
                            {leSubDesigns
                              ?.filter(
                                (subDesign) =>
                                  subDesign.DL_DesignId ===
                                  form.getValues("design"),
                              )
                              ?.sort((a, b) => {
                                const nameA = a.name.toLowerCase();
                                const nameB = b.name.toLowerCase();
                                if (nameA < nameB) {
                                  return -1;
                                }
                                if (nameA > nameB) {
                                  return 1;
                                }

                                return 0;
                              })
                              .map((subDesign) => (
                                <CommandItem
                                  value={subDesign.name}
                                  key={subDesign.id}
                                  onSelect={() => {
                                    form.setValue("subDesign", subDesign.id);
                                    setSubDesignAvatar(subDesign.avatar);
                                  }}
                                  className="flex items-center gap-0"
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      subDesign.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  <div className="flex items-center gap-4">
                                    <CustomAvatar
                                      image={subDesign.avatar}
                                      className="size-20 rounded-md"
                                    />
                                    {subDesign.name}
                                  </div>
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription className="flex items-center gap-4">
                    {subDesignAvatar && (
                      <>
                        <CustomAvatar
                          image={subDesignAvatar}
                          className="size-20 rounded-md"
                        />
                        <Button
                          size={"sm"}
                          variant={"link"}
                          className="px-0 text-foreground"
                          onClick={() => {
                            form.setValue("subDesign", "");
                            setSubDesignAvatar(null);
                          }}
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
          <FormField
            control={form.control}
            name="formValidation"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="self-start">Form Validation</FormLabel>
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
                            ? formValidations?.find(
                                (formValidation) =>
                                  formValidation.id === field.value,
                              )?.name
                            : "Select form validation"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                      <Command>
                        <CommandInput placeholder="Search form validation..." />
                        <CommandList>
                          <CommandEmpty>No form validation found.</CommandEmpty>
                          <CommandGroup>
                            {formValidations
                              ?.sort((a, b) => {
                                const nameA = a.name.toLowerCase();
                                const nameB = b.name.toLowerCase();
                                if (nameA < nameB) {
                                  return -1;
                                }
                                if (nameA > nameB) {
                                  return 1;
                                }

                                return 0;
                              })
                              .map((formValidation) => (
                                <CommandItem
                                  value={formValidation.name}
                                  key={formValidation.id}
                                  onSelect={() => {
                                    form.setValue(
                                      "formValidation",
                                      formValidation.id,
                                    );
                                  }}
                                  className="flex items-center gap-0"
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      formValidation.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  <div className="flex items-center gap-4">
                                    {formValidation.name}
                                  </div>
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription className="flex items-center gap-4">
                    {form.getValues("formValidation") && (
                      <Button
                        size={"sm"}
                        variant={"link"}
                        className="p-0 text-foreground"
                        onClick={() => form.setValue("formValidation", "")}
                        type="button"
                      >
                        Remove form validation
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
            name="license"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="self-start">License</FormLabel>
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
                            ? licenses?.find(
                                (license) => license.id === field.value,
                              )?.name
                            : "Select license"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                      <Command>
                        <CommandInput placeholder="Search licenses..." />
                        <CommandList>
                          <CommandEmpty>No licenses found.</CommandEmpty>
                          <CommandGroup>
                            {licenses
                              ?.sort((a, b) => {
                                const nameA = a.name.toLowerCase();
                                const nameB = b.name.toLowerCase();
                                if (nameA < nameB) {
                                  return -1;
                                }
                                if (nameA > nameB) {
                                  return 1;
                                }

                                return 0;
                              })
                              .map((license) => (
                                <CommandItem
                                  value={license.name}
                                  key={license.id}
                                  onSelect={() => {
                                    form.setValue("license", license.id);
                                  }}
                                  className="flex items-center gap-0"
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      license.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  <div className="flex items-center gap-4">
                                    {license.name}
                                  </div>
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription className="flex items-center gap-4">
                    {form.getValues("license") && (
                      <Button
                        size={"sm"}
                        variant={"link"}
                        className="p-0 text-foreground"
                        onClick={() => form.setValue("license", "")}
                        type="button"
                      >
                        Remove license
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
            name="lpType"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="self-start">Landing Page Type</FormLabel>
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
                            ? lpTypes?.find(
                                (lpType) => lpType.id === field.value,
                              )?.name
                            : "Select license"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                      <Command>
                        <CommandInput placeholder="Search landing page types..." />
                        <CommandList>
                          <CommandEmpty>
                            No landing page types found.
                          </CommandEmpty>
                          <CommandGroup>
                            {lpTypes
                              ?.sort((a, b) => {
                                const nameA = a.name.toLowerCase();
                                const nameB = b.name.toLowerCase();
                                if (nameA < nameB) {
                                  return -1;
                                }
                                if (nameA > nameB) {
                                  return 1;
                                }

                                return 0;
                              })
                              .map((lpType) => (
                                <CommandItem
                                  value={lpType.name}
                                  key={lpType.id}
                                  onSelect={() => {
                                    form.setValue("lpType", lpType.id);
                                  }}
                                  className="flex items-center gap-0"
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      lpType.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  <div className="flex items-center gap-4">
                                    {lpType.name}
                                  </div>
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription className="flex items-center gap-4">
                    {form.getValues("lpType") && (
                      <Button
                        size={"sm"}
                        variant={"link"}
                        className="p-0 text-foreground"
                        onClick={() => form.setValue("lpType", "")}
                        type="button"
                      >
                        Remove landing page type
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
            name="language"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="self-start">Language</FormLabel>
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
                            ? languages?.find(
                                (language) => language.id === field.value,
                              )?.englishName
                            : "Select language"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                      <Command>
                        <CommandInput placeholder="Search language..." />
                        <CommandList>
                          <CommandEmpty>No language found.</CommandEmpty>
                          <CommandGroup>
                            {languages
                              ?.sort((a, b) => {
                                const nameA = a.englishName.toLowerCase();
                                const nameB = b.englishName.toLowerCase();
                                if (nameA < nameB) {
                                  return -1;
                                }
                                if (nameA > nameB) {
                                  return 1;
                                }

                                return 0;
                              })
                              .map((lang) => (
                                <CommandItem
                                  value={lang.name}
                                  key={lang.id}
                                  onSelect={() => {
                                    form.setValue("language", lang.id);
                                    setLanguage(lang.flag);
                                  }}
                                  className="flex items-center gap-0"
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      lang.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  <div className="flex items-center gap-4">
                                    <CustomAvatar
                                      image={lang.flag}
                                      className="size-7"
                                    />
                                    {lang.englishName}
                                  </div>
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription className="flex items-center gap-4">
                    {language && (
                      <>
                        <CustomAvatar image={language} />
                        <Button
                          size={"sm"}
                          variant={"link"}
                          className="text-foreground"
                          onClick={() => {
                            form.setValue("language", "");
                            setLanguage(null);
                          }}
                          type="button"
                        >
                          Remove language
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
            name="brand"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="self-start">Brand</FormLabel>
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
                            ? brands?.find((brand) => brand.id === field.value)
                                ?.name
                            : "Select brand"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                      <Command>
                        <CommandInput placeholder="Search brand..." />
                        <CommandList>
                          <CommandEmpty>No brand found.</CommandEmpty>
                          <CommandGroup>
                            {brands
                              ?.sort((a, b) => {
                                const nameA = a.name.toLowerCase();
                                const nameB = b.name.toLowerCase();
                                if (nameA < nameB) {
                                  return -1;
                                }
                                if (nameA > nameB) {
                                  return 1;
                                }

                                return 0;
                              })
                              .map((brand) => (
                                <CommandItem
                                  value={brand.name}
                                  key={brand.id}
                                  onSelect={() => {
                                    form.setValue("brand", brand.id);
                                    setBrand(brand.logo);
                                  }}
                                  className="flex items-center gap-0"
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      brand.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  <div className="flex items-center gap-4">
                                    <CustomAvatar
                                      image={brand.logo}
                                      className=""
                                    />
                                    {brand.name}
                                  </div>
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription className="flex items-center gap-4">
                    {brand && (
                      <>
                        <CustomAvatar
                          image={brand}
                          className="h-[50px] w-[200px] rounded-md"
                        />
                        <Button
                          size={"sm"}
                          variant={"link"}
                          className="text-foreground"
                          onClick={() => {
                            form.setValue("brand", "");
                            setBrand(null);
                          }}
                          type="button"
                        >
                          Remove brand
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
