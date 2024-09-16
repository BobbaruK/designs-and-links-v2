"use client";

import { CustomAvatar } from "@/components/custom-avatar";
import { CustomHoverCard } from "@/components/custom-hover-card";
import { SortingArrows } from "@/components/sorting-arrows";
import { Button } from "@/components/ui/button";
import { columnId } from "@/lib/constants";
import { cn, returnFormattedDate } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import AdminUserAvatarsRowActions from "./admin-user-avatars-row-actions";

type DB_UserAvatars = Prisma.DL_UserAvatarGetPayload<{
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

export const columns: ColumnDef<DB_UserAvatars>[] = [
  // Name
  {
    ...columnId({ id: "name" }),
    accessorFn: (originalRow) => originalRow.name.toLowerCase(),
    enableHiding: false,
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
      const id = row.original.id;
      const name = row.original.name;
      const image = row.original.url;

      return (
        <Button asChild variant={"link"} className={cn("p-0 text-foreground")}>
          <Link
            href={`/admin/user-avatars/${id}`}
            className="flex items-center gap-2"
          >
            <CustomAvatar image={image} />
            {name}
          </Link>
        </Button>
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
    accessorFn: (originalRow) => originalRow.createdBy?.name.toLowerCase(),
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
    accessorFn: (originalRow) => originalRow.updatedBy?.name.toLowerCase(),
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
      const avatars = row.original;

      return <AdminUserAvatarsRowActions avatar={avatars} />;
    },
  },
];
