"use client";

import { CustomAvatar } from "@/components/custom-avatar";
import { CustomHoverCard } from "@/components/custom-hover-card";
import { SortingArrows } from "@/components/sorting-arrows";
import { Button } from "@/components/ui/button";
import { cn, returnFormattedDate } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import LanguageRowActions from "./language-row-actions";
import { NameCell } from "@/components/data-table/name-cell";

type Language = Prisma.DL_LanguageGetPayload<{
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
    LandingPages: true;
  };
}>;

export const columns: ColumnDef<Language>[] = [
  // English name
  {
    accessorKey: "englishName",
    id: "englishName",
    accessorFn: (originalRow) => originalRow.englishName,
    enableHiding: false,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex gap-2"
          onClick={() => column.toggleSorting()}
        >
          English name
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const slug = row.original.iso_639_1;
      const name = row.original.englishName;
      const image = row.original.flag;
      const lps = row.original.LandingPages;

      return (
        <NameCell link={`/language/${slug}`} name={name} length={lps.length} image={image} />
      );
    },
  },
  // Name
  {
    accessorKey: "name",
    id: "name",
    accessorFn: (originalRow) => originalRow.name,
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
    cell: ({ row }) => (
      <Button asChild variant={"link"} className={cn("text-foreground")}>
        <Link href={`/language/${row.original.iso_639_1}`}>
          {row.original.name}{" "}
        </Link>
      </Button>
    ),
  },
  // ISO 639-1
  {
    accessorKey: "iso_639_1",
    id: "iso_639_1",
    accessorFn: (originalRow) => originalRow.iso_639_1,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex gap-2"
          onClick={() => column.toggleSorting()}
        >
          ISO 639-1
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.original.iso_639_1}</div>
    ),
  },
  // ISO 3166-1
  {
    accessorKey: "iso_3166_1",
    id: "iso_3166_1",
    // TODO: nullish bullish
    // sortUndefined not working because accessorFn returns null not undefined
    accessorFn: (originalRow) => originalRow?.iso_3166_1,
    sortUndefined: "last",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex gap-2"
          onClick={() => column.toggleSorting()}
        >
          ISO 3166-1
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.original.iso_3166_1 || "-"}</div>
    ),
  },
  // Created At
  {
    accessorKey: "createdAt",
    id: "createdAt",
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
    accessorKey: "createdBy",
    id: "createdBy",
    accessorFn: (originalRow) => originalRow?.createdBy?.name,
    sortUndefined: "last",
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
    accessorKey: "updatedAt",
    id: "updatedAt",
    accessorFn: (originalRow) => originalRow?.updatedAt,
    sortingFn: "datetime",
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
    accessorKey: "updatedBy",
    id: "updatedBy",
    accessorFn: (originalRow) => originalRow?.updatedBy?.name,
    sortUndefined: "last",
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
            <>
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
                  <Link
                    className={cn("hover:underline")}
                    href={`/profile/${id}`}
                  >
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
            </>
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
      const language = row.original;

      return <LanguageRowActions language={language} />;
    },
  },
];
