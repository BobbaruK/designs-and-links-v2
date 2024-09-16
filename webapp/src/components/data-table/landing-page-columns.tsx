"use client";

import { CustomAvatar } from "@/components/custom-avatar";
import { CustomHoverCard } from "@/components/custom-hover-card";
import { Button } from "@/components/ui/button";
import { columnId } from "@/lib/constants";
import { cn, returnFormattedDate } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import { BsCheckCircle } from "react-icons/bs";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { SortingArrows } from "../sorting-arrows";
import LandingPageRowActions from "./landing-page-row-actions";

type LandingPage = Prisma.DL_LandingPageGetPayload<{
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
    brand: true;
    design: true;
    formValidation: true;
    language: true;
    license: true;
    lpType: true;
    requester: {
      omit: {
        password: true;
      };
    };
    subDesign: true;
    topic: true;
  };
}>;

export const columns: ColumnDef<LandingPage>[] = [
  // Name
  {
    ...columnId({ id: "name" }),
    enableHiding: false,
    accessorFn: (originalRow) => originalRow?.name,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex gap-2"
          onClick={() => column.toggleSorting()}
        >
          Name
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const slug =
        row.original.subDesign?.slug || row.original.design?.slug || "";
      const name = row.original.name;
      const image =
        row.original.subDesign?.avatar || row.original.design?.avatar || "";

      return (
        <CustomHoverCard
          triggerAsChild
          trigger={
            <div className="flex items-center gap-2">
              <Link
                href={`/design/${slug}`}
                className="flex items-center gap-2"
              >
                <CustomAvatar
                  image={image}
                  className="h-[110px] w-[100px] overflow-hidden rounded-md bg-black"
                />
              </Link>
              <Link
                href={`/landing-page/${row.original.slug}`}
                className="flex items-center gap-2"
              >
                {name}
              </Link>
            </div>
          }
        >
          {image ? (
            <div className="space-y-2">
              <p className="text-center">
                {row.original.design?.name}
                {row.original.subDesign?.name &&
                  ` / ${row.original.subDesign?.name}`}
              </p>
              <Link
                href={image}
                className="flex items-center gap-2"
                target="_blank"
              >
                <Image
                  src={image}
                  alt={`${name}'s Logo`}
                  className="h-auto object-cover"
                  unoptimized
                  width={300}
                  height={50}
                />
              </Link>
            </div>
          ) : (
            <p>no image added</p>
          )}
        </CustomHoverCard>
      );
    },
  },
  // Slug
  {
    ...columnId({ id: "slug" }),
    accessorFn: (originalRow) => originalRow?.slug,
    sortUndefined: "last",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex gap-2"
          onClick={() => column.toggleSorting()}
        >
          Slug
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const slug = row.original.slug || "-";

      return (
        <Button asChild variant={"link"} className={cn("text-foreground")}>
          {slug && <Link href={`/landing-page/${slug}`}>{slug}</Link>}
        </Button>
      );
    },
  },
  // WhatsApp
  {
    ...columnId({ id: "whatsapp" }),
    accessorFn: (originalRow) => originalRow?.whatsapp,
    sortDescFirst: false,
    header: ({ column }) => {
      return (
        <div className="grid w-full place-items-center">
          <Button
            variant="ghost"
            className="flex gap-2"
            onClick={() => column.toggleSorting()}
          >
            WhatsApp
            <SortingArrows sort={column.getIsSorted()} />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="grid h-full w-full place-items-center">
        {row.original.whatsapp ? (
          <BsCheckCircle size={25} className="text-green-500" />
        ) : (
          <IoIosCloseCircleOutline size={31} className="text-red-500" />
        )}
      </div>
    ),
  },
  // FXORO Footer
  {
    ...columnId({ id: "fxoroFooter" }),
    accessorFn: (originalRow) => originalRow?.fxoroFooter,
    sortDescFirst: false,
    header: ({ column }) => {
      return (
        <div className="grid w-full place-items-center">
          <Button
            variant="ghost"
            className="flex gap-2"
            onClick={() => column.toggleSorting()}
          >
            FXORO Footer
            <SortingArrows sort={column.getIsSorted()} />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="grid h-full w-full place-items-center">
        {row.original.fxoroFooter ? (
          <BsCheckCircle size={25} className="text-green-500" />
        ) : (
          <IoIosCloseCircleOutline size={31} className="text-red-500" />
        )}
      </div>
    ),
  },
  // Requester
  {
    ...columnId({ id: "requester" }),
    accessorFn: (originalRow) => originalRow.requester?.name,
    sortDescFirst: false,
    sortUndefined: "last",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex gap-2"
          onClick={() => column.toggleSorting()}
        >
          Requester
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const requester = row.original.requester;
      const id = requester?.id;
      const name = requester?.name;
      const email = requester?.email;
      const image = requester?.image;

      return (
        <>
          {requester ? (
            <CustomHoverCard
              triggerAsChild
              trigger={
                <Link href={`/profile/${id}`}>
                  <CustomAvatar image={image} />
                  {name}
                </Link>
              }
            >
              <p>
                User:{" "}
                <Link className={cn("hover:underline")} href={`/profile/${id}`}>
                  <strong>{name}</strong>
                </Link>
              </p>
              <p>
                Email:{" "}
                <Link
                  className={cn("hover:underline")}
                  href={`mailto:${email}`}
                >
                  <strong>{email}</strong>
                </Link>
              </p>
              <p>
                Created at:{" "}
                <strong>
                  {returnFormattedDate(row.original.updatedAt)} (UTC)
                </strong>
              </p>
            </CustomHoverCard>
          ) : (
            <div className="flex items-center gap-4">
              <CustomAvatar image={null} />
              No User
            </div>
          )}
        </>
      );
    },
  },
  // Topic
  {
    ...columnId({ id: "topic" }),
    accessorFn: (originalRow) => originalRow.topic?.name,
    sortUndefined: "last",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex gap-2"
          onClick={() => column.toggleSorting()}
        >
          Topic
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const topic = row.original.topic;
      const slug = topic?.slug;
      const name = topic?.name;

      return (
        <>
          {topic ? (
            <Link href={`/topic/${slug}`}>{name}</Link>
          ) : (
            <p>No topic</p>
          )}
        </>
      );
    },
  },
  // License
  {
    ...columnId({ id: "license" }),
    accessorFn: (originalRow) => originalRow?.license?.name,
    sortUndefined: "last",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex gap-2"
          onClick={() => column.toggleSorting()}
        >
          License
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const license = row.original.license;
      const slug = license?.slug;
      const name = license?.name;

      return (
        <>
          {license ? (
            <Link href={`/license/${slug}`}>{name}</Link>
          ) : (
            <p>No license</p>
          )}
        </>
      );
    },
  },
  // Landing Page Type
  {
    ...columnId({ id: "lpType" }),
    accessorFn: (originalRow) => originalRow?.lpType?.name,
    sortUndefined: "last",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex gap-2"
          onClick={() => column.toggleSorting()}
        >
          Landing Page Type
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const lpType = row.original.lpType;
      const slug = lpType?.slug;
      const name = lpType?.name;

      return (
        <>
          {lpType ? (
            <Link href={`/lp-type/${slug}`}>{name}</Link>
          ) : (
            <p>No landing page type</p>
          )}
        </>
      );
    },
  },
  // Form Validation
  {
    ...columnId({ id: "formValidation" }),
    accessorFn: (originalRow) => originalRow?.formValidation?.name,
    sortUndefined: "last",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex gap-2"
          onClick={() => column.toggleSorting()}
        >
          Form Validation
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formValidation = row.original.formValidation;
      const slug = formValidation?.slug;
      const name = formValidation?.name;

      return (
        <>
          {formValidation ? (
            <Link href={`/form-validation/${slug}`}>{name}</Link>
          ) : (
            <p>No form validation</p>
          )}
        </>
      );
    },
  },
  // Language
  {
    ...columnId({ id: "language" }),
    accessorFn: (originalRow) => originalRow?.language?.englishName,
    sortUndefined: "last",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex gap-2"
          onClick={() => column.toggleSorting()}
        >
          Language
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const language = row.original.language;
      const iso = language?.iso_639_1;
      const name = language?.englishName;
      const image = language?.flag;

      return (
        <>
          {language ? (
            <Link
              href={`/language/${iso}`}
              className="flex items-center justify-start gap-4 hover:cursor-pointer"
            >
              <CustomAvatar image={image} />
              {name}
            </Link>
          ) : (
            <div className="flex items-center gap-4">
              <CustomAvatar image={null} />
              No Language
            </div>
          )}
        </>
      );
    },
  },
  // Brand
  {
    ...columnId({ id: "brand" }),
    accessorFn: (originalRow) => originalRow?.brand?.name,
    sortUndefined: "last",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex gap-2"
          onClick={() => column.toggleSorting()}
        >
          Brand
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row, getValue }) => {
      const slug = row.original.brand?.slug;
      const name = row.original.brand?.name;
      const image = row.original.brand?.logo;

      return (
        <>
          {row.original.brand ? (
            <CustomHoverCard
              triggerAsChild
              trigger={
                <Link
                  href={`/brand/${slug}`}
                  className="flex items-center gap-2"
                >
                  <CustomAvatar image={image} className="" />
                  {name}
                </Link>
              }
            >
              {image ? (
                <div className="space-y-2">
                  <Link
                    href={image}
                    className="flex items-center gap-2"
                    target="_blank"
                  >
                    <Image
                      src={image}
                      alt={`${name}'s Logo`}
                      className="h-auto object-cover"
                      unoptimized
                      width={300}
                      height={50}
                    />
                  </Link>
                </div>
              ) : (
                <p>no image added</p>
              )}
            </CustomHoverCard>
          ) : (
            <div className="flex items-center gap-4">
              <CustomAvatar image={null} />
              No Brand
            </div>
          )}
        </>
      );
    },
  },
  // Created At
  {
    ...columnId({ id: "createdAt" }),
    accessorFn: (originalRow) => originalRow.createdAt,
    sortingFn: "datetime",
    sortDescFirst: false,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex gap-2"
          onClick={() => column.toggleSorting()}
        >
          Created At (UTC)
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => returnFormattedDate(row.getValue("createdAt")),
  },
  // Created By
  {
    ...columnId({ id: "createdBy" }),
    accessorFn: (originalRow) => originalRow.createdBy?.name,
    sortUndefined: "last",
    sortDescFirst: false,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex gap-2"
          onClick={() => column.toggleSorting()}
        >
          Created By
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const createdBy = row.original.createdBy;
      const id = createdBy?.id;
      const name = createdBy?.name;
      const email = createdBy?.email;
      const image = createdBy?.image;

      return (
        <>
          {createdBy ? (
            <CustomHoverCard
              triggerAsChild
              trigger={
                <Link href={`/profile/${id}`}>
                  <CustomAvatar image={image} />
                  {name}
                </Link>
              }
            >
              <p>
                User:{" "}
                <Link className={cn("hover:underline")} href={`/profile/${id}`}>
                  <strong>{name}</strong>
                </Link>
              </p>
              <p>
                Email:{" "}
                <Link
                  className={cn("hover:underline")}
                  href={`mailto:${email}`}
                >
                  <strong>{email}</strong>
                </Link>
              </p>
              <p>
                Created at:{" "}
                <strong>
                  {returnFormattedDate(row.original.updatedAt)} (UTC)
                </strong>
              </p>
            </CustomHoverCard>
          ) : (
            <div className="flex items-center gap-4">
              <CustomAvatar image={null} />
              No User
            </div>
          )}
        </>
      );
    },
  },
  // Updated At
  {
    ...columnId({ id: "updatedAt" }),
    sortingFn: "datetime",
    sortDescFirst: false,
    accessorFn: (originalRow) => originalRow.updatedAt,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex gap-2"
          onClick={() => column.toggleSorting()}
        >
          Updated At (UTC)
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => returnFormattedDate(row.getValue("updatedAt")),
  },
  // Updated By
  {
    ...columnId({ id: "updatedBy" }),
    accessorFn: (originalRow) => originalRow.updatedBy?.name,
    sortUndefined: "last",
    sortDescFirst: false,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex gap-2"
          onClick={() => column.toggleSorting()}
        >
          Updated By
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const updatedBy = row.original.updatedBy;
      const id = updatedBy?.id;
      const name = updatedBy?.name;
      const email = updatedBy?.email;
      const image = updatedBy?.image;

      return (
        <>
          {updatedBy ? (
            <CustomHoverCard
              triggerAsChild
              trigger={
                <Link href={`/profile/${id}`}>
                  <CustomAvatar image={image} />
                  {name}
                </Link>
              }
            >
              <p>
                User:{" "}
                <Link className={cn("hover:underline")} href={`/profile/${id}`}>
                  <strong>{name}</strong>
                </Link>
              </p>
              <p>
                Email:{" "}
                <Link
                  className={cn("hover:underline")}
                  href={`mailto:${email}`}
                >
                  <strong>{email}</strong>
                </Link>
              </p>
              <p>
                Created at:{" "}
                <strong>
                  {returnFormattedDate(row.original.updatedAt)} (UTC)
                </strong>
              </p>
            </CustomHoverCard>
          ) : (
            <div className="flex items-center gap-4">
              <CustomAvatar image={null} />
              No User
            </div>
          )}
        </>
      );
    },
  },
  // Actions
  {
    ...columnId({ id: "actions" }),
    enableHiding: false,
    header: () => {
      return " ";
    },
    cell: ({ row }) => {
      const landingPage = row.original;

      return <LandingPageRowActions landingPage={landingPage} />;
    },
  },
];
