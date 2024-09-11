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
import AdminFlagsRowActions from "./admin-flags-row-actions";

type DB_Flags = Prisma.DL_FlagGetPayload<{
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

export const columns: ColumnDef<DB_Flags>[] = [
  // Name
  {
    accessorKey: "name",
    id: "name",
    enableHiding: false,
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
    cell: ({ row }) => {
      const id = row.original.id;
      const name = row.original.name;
      const image = row.original.url;

      return (
        <Button asChild variant={"link"} className={cn("p-0 text-foreground")}>
          <Link href={`/admin/flags/${id}`} className="flex items-center gap-2">
            <CustomAvatar image={image} />
            {name}
          </Link>
        </Button>
      );
    },
  },
  // Created At
  {
    accessorKey: "createdAt",
    id: "createdAt",
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
            <HoverCard>
              <HoverCardTrigger
                className="flex items-center justify-start gap-4 hover:cursor-pointer"
                asChild
              >
                <Link href={`/profile/${id}`}>
                  <CustomAvatar image={image} />

                  {name}
                </Link>
              </HoverCardTrigger>
              <HoverCardContent className="leading-relaxed">
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
                    {returnFormattedDate(row.original.createdAt)} (UTC)
                  </strong>
                </p>
              </HoverCardContent>
            </HoverCard>
          ) : (
            <div className="flex items-center gap-4">
              <CustomAvatar image={null} />
              Deleted user
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
              <HoverCard>
                <HoverCardTrigger
                  className="flex items-center justify-start gap-4 hover:cursor-pointer"
                  asChild
                >
                  <Link href={`/profile/${id}`}>
                    <CustomAvatar image={image} />

                    {name}
                  </Link>
                </HoverCardTrigger>
                <HoverCardContent className="leading-relaxed">
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
                </HoverCardContent>
              </HoverCard>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <CustomAvatar image={null} />
              Deleted user
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
      const avatars = row.original;

      return <AdminFlagsRowActions flag={avatars} />;
    },
  },
];
