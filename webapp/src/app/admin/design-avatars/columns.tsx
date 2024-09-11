"use client";

import { CustomAvatar } from "@/components/custom-avatar";
import { CustomHoverCard } from "@/components/custom-hover-card";
import { Button } from "@/components/ui/button";
import { cn, returnFormattedDate } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import {
  PiArrowBendRightDownDuotone,
  PiArrowBendRightUpDuotone,
} from "react-icons/pi";
import AdminDesignAvatarRowActions from "./design-avatar-row-actions";

type DB_DesignAvatar = Prisma.DL_DesignAvatarGetPayload<{
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

export const columns: ColumnDef<DB_DesignAvatar>[] = [
  // Name
  {
    accessorKey: "name",
    id: "name",
    enableHiding: false,
    sortingFn: "text",
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
        <CustomHoverCard
          triggerAsChild
          trigger={
            <Link
              href={`/admin/design-avatars/${id}`}
              className="flex items-center gap-2"
            >
              <CustomAvatar
                image={image}
                className="overflow-hidden bg-black"
              />
              {name}
            </Link>
          }
        >
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
        </CustomHoverCard>
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
                  {returnFormattedDate(row.original.createdAt)} (UTC)
                </strong>
              </p>
            </CustomHoverCard>
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

      return <AdminDesignAvatarRowActions designAvatar={avatars} />;
    },
  },
];
