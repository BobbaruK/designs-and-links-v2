"use client";

import { CustomAvatar } from "@/components/custom-avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn, returnFormattedDate } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import {
  PiArrowBendRightDownDuotone,
  PiArrowBendRightUpDuotone,
} from "react-icons/pi";
import LandingPageRowActions from "./landing-page-row-actions";
import { CustomHoverCard } from "@/components/custom-hover-card";
import { BsCheckCircle } from "react-icons/bs";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Image from "next/image";

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
    accessorKey: "name",
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
          {column.getIsSorted() === "asc" && (
            <PiArrowBendRightUpDuotone size={20} />
          )}
          {column.getIsSorted() === "desc" && (
            <PiArrowBendRightDownDuotone size={20} />
          )}
        </Button>
      );
    },
    cell: ({ row, getValue }) => {
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
    accessorKey: "slug",
    id: "slug",
    accessorFn: (originalRow) => originalRow?.slug,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex gap-2"
          onClick={() => column.toggleSorting()}
        >
          Slug
          {column.getIsSorted() === "asc" && (
            <PiArrowBendRightUpDuotone size={20} />
          )}
          {column.getIsSorted() === "desc" && (
            <PiArrowBendRightDownDuotone size={20} />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      const slug =
        row.original.subDesign?.slug || row.original.design?.slug || "";
      return (
        <Button asChild variant={"link"} className={cn("text-foreground")}>
          <Link href={`/design/${slug}`}>{slug}</Link>
        </Button>
      );
    },
  },
  // WhatsApp
  {
    accessorKey: "whatsapp",
    // enableSorting: false,
    accessorFn: (originalRow) => originalRow?.whatsapp,
    header: ({ column }) => {
      return (
        <div className="grid w-full place-items-center">
          <Button
            variant="ghost"
            className="flex gap-2"
            onClick={() => column.toggleSorting()}
          >
            WhatsApp
            {column.getIsSorted() === "asc" && (
              <PiArrowBendRightUpDuotone size={20} />
            )}
            {column.getIsSorted() === "desc" && (
              <PiArrowBendRightDownDuotone size={20} />
            )}
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
    accessorKey: "fxoroFooter",
    // enableSorting: false,
    accessorFn: (originalRow) => originalRow?.fxoroFooter,
    header: ({ column }) => {
      return (
        <div className="grid w-full place-items-center">
          <Button
            variant="ghost"
            className="flex gap-2"
            onClick={() => column.toggleSorting()}
          >
            FXORO Footer
            {column.getIsSorted() === "asc" && (
              <PiArrowBendRightUpDuotone size={20} />
            )}
            {column.getIsSorted() === "desc" && (
              <PiArrowBendRightDownDuotone size={20} />
            )}
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
    accessorKey: "requester",
    // enableSorting: false,
    accessorFn: (originalRow) => originalRow.requester?.name,
    sortingFn: (rowA, rowB, columnId) => {
      const rA_Username = rowA.original.requester?.name!;
      const rB_Username = rowB.original.requester?.name!;

      return rA_Username > rB_Username ? 1 : rA_Username < rB_Username ? -1 : 0;
    },
    sortUndefined: "last",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex gap-2"
          onClick={() => column.toggleSorting()}
        >
          Requester
          {column.getIsSorted() === "asc" && (
            <PiArrowBendRightUpDuotone size={20} />
          )}
          {column.getIsSorted() === "desc" && (
            <PiArrowBendRightDownDuotone size={20} />
          )}
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
    accessorKey: "topic",
    // enableSorting: false,
    accessorFn: (originalRow) => originalRow.topic?.name,
    sortingFn: (rowA, rowB, columnId) => {
      const rA_Username = rowA.original.topic?.name!;
      const rB_Username = rowB.original.topic?.name!;

      return rA_Username > rB_Username ? 1 : rA_Username < rB_Username ? -1 : 0;
    },
    sortUndefined: "last",
    enableMultiSort: true,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex gap-2"
          onClick={() => column.toggleSorting()}
        >
          Topic
          {column.getIsSorted() === "asc" && (
            <PiArrowBendRightUpDuotone size={20} />
          )}
          {column.getIsSorted() === "desc" && (
            <PiArrowBendRightDownDuotone size={20} />
          )}
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
    accessorKey: "license",
    // enableSorting: false,
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
          {column.getIsSorted() === "asc" && (
            <PiArrowBendRightUpDuotone size={20} />
          )}
          {column.getIsSorted() === "desc" && (
            <PiArrowBendRightDownDuotone size={20} />
          )}
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
    accessorKey: "lpType",
    // enableSorting: false,
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
          {column.getIsSorted() === "asc" && (
            <PiArrowBendRightUpDuotone size={20} />
          )}
          {column.getIsSorted() === "desc" && (
            <PiArrowBendRightDownDuotone size={20} />
          )}
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
    accessorKey: "formValidation",
    // enableSorting: false,
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
          {column.getIsSorted() === "asc" && (
            <PiArrowBendRightUpDuotone size={20} />
          )}
          {column.getIsSorted() === "desc" && (
            <PiArrowBendRightDownDuotone size={20} />
          )}
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
    accessorKey: "language",
    // enableSorting: false,
    accessorFn: (originalRow) => originalRow?.language?.englishName,
    sortUndefined: "last",
    sortingFn: (rowA, rowB, columnId) => {
      const rA_Username = rowA.original.language?.englishName!;
      const rB_Username = rowB.original.language?.englishName!;

      return rA_Username > rB_Username ? 1 : rA_Username < rB_Username ? -1 : 0;
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex gap-2"
          onClick={() => column.toggleSorting()}
        >
          Language
          {column.getIsSorted() === "asc" && (
            <PiArrowBendRightUpDuotone size={20} />
          )}
          {column.getIsSorted() === "desc" && (
            <PiArrowBendRightDownDuotone size={20} />
          )}
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
    accessorKey: "brand",
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
          {column.getIsSorted() === "asc" && (
            <PiArrowBendRightUpDuotone size={20} />
          )}
          {column.getIsSorted() === "desc" && (
            <PiArrowBendRightDownDuotone size={20} />
          )}
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
    accessorKey: "createdAt",
    sortDescFirst: false,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex gap-2"
          onClick={() => column.toggleSorting()}
        >
          Created At (UTC)
          {column.getIsSorted() === "asc" && (
            <PiArrowBendRightUpDuotone size={20} />
          )}
          {column.getIsSorted() === "desc" && (
            <PiArrowBendRightDownDuotone size={20} />
          )}
        </Button>
      );
    },
    cell: ({ row }) => returnFormattedDate(row.getValue("createdAt")),
    sortingFn: "datetime",
  },
  // Created By
  {
    accessorKey: "createdBy",
    // enableSorting: false,
    accessorFn: (originalRow) => originalRow?.createdBy?.name,
    sortUndefined: "last",
    sortingFn: (rowA, rowB, columnId) => {
      const rA_Username = rowA.original.createdBy?.name!;
      const rB_Username = rowB.original.createdBy?.name!;

      return rA_Username > rB_Username ? 1 : rA_Username < rB_Username ? -1 : 0;
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex gap-2"
          onClick={() => column.toggleSorting()}
        >
          Created By
          {column.getIsSorted() === "asc" && (
            <PiArrowBendRightUpDuotone size={20} />
          )}
          {column.getIsSorted() === "desc" && (
            <PiArrowBendRightDownDuotone size={20} />
          )}
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
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex gap-2"
          onClick={() => column.toggleSorting()}
        >
          Updated At (UTC)
          {column.getIsSorted() === "asc" && (
            <PiArrowBendRightUpDuotone size={20} />
          )}
          {column.getIsSorted() === "desc" && (
            <PiArrowBendRightDownDuotone size={20} />
          )}
        </Button>
      );
    },
    cell: ({ row }) => returnFormattedDate(row.getValue("updatedAt")),
    sortingFn: "datetime",
  },
  // Updated By
  {
    accessorKey: "updatedBy",
    // enableSorting: false,
    accessorFn: (originalRow) => originalRow?.updatedBy?.name,
    sortUndefined: "last",
    sortingFn: (rowA, rowB, columnId) => {
      const rA_Username = rowA.original.updatedBy?.name!;
      const rB_Username = rowB.original.updatedBy?.name!;

      return rA_Username > rB_Username ? 1 : rA_Username < rB_Username ? -1 : 0;
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex gap-2"
          onClick={() => column.toggleSorting()}
        >
          Updated By
          {column.getIsSorted() === "asc" && (
            <PiArrowBendRightUpDuotone size={20} />
          )}
          {column.getIsSorted() === "desc" && (
            <PiArrowBendRightDownDuotone size={20} />
          )}
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
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const landingPage = row.original;

      return <LandingPageRowActions landingPage={landingPage} />;
    },
  },
];
