"use client";

import { CustomAvatar } from "@/components/custom-avatar";
import { SortingArrows } from "@/components/sorting-arrows";
import { Button } from "@/components/ui/button";
import { columnId } from "@/lib/constants";
import { cn, returnFormattedDate } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { BsCheckCircle } from "react-icons/bs";
import { IoIosCloseCircleOutline } from "react-icons/io";
import AdminUsersRowActions from "./admin-users-row-actions";

type DB_User = Prisma.UserGetPayload<{
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
}>;

export const columns: ColumnDef<DB_User>[] = [
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
      const name = row.original.name || "-";
      const image = row.original.image;

      return (
        <Button asChild variant={"link"} className={cn("p-0 text-foreground")}>
          <Link href={`/profile/${id}`} className="flex items-center gap-2">
            <CustomAvatar image={image} />
            {name}
          </Link>
        </Button>
      );
    },
    sortUndefined: "last",
  },
  // Email
  {
    ...columnId({ id: "email" }),
    accessorFn: (originalRow) => originalRow.email,
    enableHiding: false,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex gap-2"
          onClick={() => column.toggleSorting()}
        >
          Email
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <Button asChild variant={"link"} className={cn("p-0 text-foreground")}>
          <Link
            href={`mailto:${row.original.email}`}
            className="flex items-center gap-2"
          >
            {row.original.email}
          </Link>
        </Button>
      );
    },
  },
  // Email verified at
  {
    ...columnId({ id: "emailVerified" }),
    accessorFn: (originalRow) => originalRow.emailVerified,
    sortDescFirst: false,
    sortingFn: "datetime",
    sortUndefined: "last",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex gap-2"
          onClick={() => column.toggleSorting()}
        >
          Email verified At (UTC)
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => returnFormattedDate(row.getValue("emailVerified")),
  },
  // Role
  {
    ...columnId({ id: "role" }),
    accessorFn: (originalRow) => originalRow.role.toLowerCase(),
    enableHiding: false,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex gap-2"
          onClick={() => column.toggleSorting()}
        >
          Role
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <>{row.original.role}</>;
    },
  },
  // 2FA
  {
    ...columnId({ id: "twoFactorAuth" }),
    accessorFn: (originalRow) => originalRow.isTwoFactorEnabled,
    sortDescFirst: false,
    header: ({ column }) => {
      return (
        <div className="grid h-full w-full place-items-center">
          <Button
            variant="ghost"
            className="flex gap-2"
            onClick={() => column.toggleSorting()}
          >
            2FA
            <SortingArrows sort={column.getIsSorted()} />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="grid h-full w-full place-items-center">
          {row.original.isTwoFactorEnabled ? (
            <BsCheckCircle size={25} className="text-green-500" />
          ) : (
            <IoIosCloseCircleOutline size={31} className="text-red-500" />
          )}
        </div>
      );
    },
  },
  // Is Oauth
  {
    ...columnId({ id: "isOauth" }),
    accessorFn: (originalRow) => originalRow.accounts.length,
    sortDescFirst: false,
    header: ({ column }) => {
      return (
        <div className="grid h-full w-full place-items-center">
          <Button
            variant="ghost"
            className="flex gap-2"
            onClick={() => column.toggleSorting()}
          >
            Is Oauth
            <SortingArrows sort={column.getIsSorted()} />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="grid h-full w-full place-items-center">
          {row.original.accounts.length ? (
            <BsCheckCircle size={25} className="text-green-500" />
          ) : (
            <IoIosCloseCircleOutline size={31} className="text-red-500" />
          )}
        </div>
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
  // Actions
  {
    ...columnId({ id: "actions" }),
    enableHiding: false,
    header: () => {
      return " ";
    },
    cell: ({ row }) => {
      const user = row.original;

      return <AdminUsersRowActions user={user} />;
    },
  },
];
