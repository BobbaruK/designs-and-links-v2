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
import LanguageRowActions from "./language-row-actions";
import { CustomHoverCard } from "@/components/custom-hover-card";

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
  };
}>;

export const columns: ColumnDef<Language>[] = [
  // English name
  {
    accessorKey: "englishName",
    id: "englishName",
    enableHiding: false,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex gap-2"
          onClick={() => column.toggleSorting()}
        >
          English name
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
      const image = row.original.flag;

      return (
        <Button asChild variant={"link"} className={cn("text-foreground")}>
          <Link
            href={`/language/${row.original.iso_639_1}`}
            className="flex items-center gap-2"
          >
            <CustomAvatar image={image} />
            {row.original.englishName}
          </Link>
        </Button>
      );
    },
  },
  // Name
  {
    accessorKey: "name",
    id: "name",
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
    cell: ({ row }) => (
      <Button asChild variant={"link"} className={cn("text-foreground")}>
        <Link href={`/language/${row.original.iso_639_1}`}>
          {row.original.name}
        </Link>
      </Button>
    ),
  },
  // ISO 639-1
  {
    accessorKey: "iso_639_1",
    id: "iso_639_1",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex gap-2"
          onClick={() => column.toggleSorting()}
        >
          ISO 639-1
          {column.getIsSorted() === "asc" && (
            <PiArrowBendRightUpDuotone size={20} />
          )}
          {column.getIsSorted() === "desc" && (
            <PiArrowBendRightDownDuotone size={20} />
          )}
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
    sortUndefined: "last",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex gap-2"
          onClick={() => column.toggleSorting()}
        >
          ISO 3166-1
          {column.getIsSorted() === "asc" && (
            <PiArrowBendRightUpDuotone size={20} />
          )}
          {column.getIsSorted() === "desc" && (
            <PiArrowBendRightDownDuotone size={20} />
          )}
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
