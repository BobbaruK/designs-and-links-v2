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
import AdminUsersRowActions from "./admin-users-row-actions";
import { BsCheckCircle } from "react-icons/bs";
import { IoIosCloseCircleOutline } from "react-icons/io";

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
    accessorKey: "email",
    id: "email",
    enableHiding: false,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex gap-2"
          onClick={() => column.toggleSorting()}
        >
          Email
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
    accessorKey: "emailVerified",
    id: "emailVerified",
    sortDescFirst: false,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex gap-2"
          onClick={() => column.toggleSorting()}
        >
          Email verified At (UTC)
          {column.getIsSorted() === "asc" && (
            <PiArrowBendRightUpDuotone size={20} />
          )}
          {column.getIsSorted() === "desc" && (
            <PiArrowBendRightDownDuotone size={20} />
          )}
        </Button>
      );
    },
    cell: ({ row }) => returnFormattedDate(row.getValue("emailVerified")),
    sortUndefined: "last",
    sortingFn: "datetime",
  },
  // Role
  {
    accessorKey: "role",
    id: "role",
    enableHiding: false,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex gap-2"
          onClick={() => column.toggleSorting()}
        >
          Role
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
      return <>{row.original.role}</>;
    },
  },
  // 2FA
  {
    accessorKey: "twoFactorAuth",
    id: "twoFactorAuth",
    enableSorting: false,
    header: ({ column }) => {
      return (
        <div className="grid h-full w-full place-items-center">
          <Button
            variant="ghost"
            className="flex gap-2"
            // onClick={() => column.toggleSorting()}
          >
            2FA
            {column.getIsSorted() === "asc" && (
              <PiArrowBendRightUpDuotone size={20} />
            )}
            {column.getIsSorted() === "desc" && (
              <IoIosCloseCircleOutline size={20} />
            )}
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
    accessorKey: "isOauth",
    id: "isOauth",
    enableSorting: false,
    header: ({ column }) => {
      return (
        <div className="grid h-full w-full place-items-center">
          <Button
            variant="ghost"
            className="flex gap-2"
            // onClick={() => column.toggleSorting()}
          >
            Is Oauth
            {column.getIsSorted() === "asc" && (
              <PiArrowBendRightUpDuotone size={20} />
            )}
            {column.getIsSorted() === "desc" && (
              <IoIosCloseCircleOutline size={20} />
            )}
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
  // Actions
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

      return <AdminUsersRowActions user={user} />;
    },
  },
];
