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
import AdminBrandLogosRowActions from "./admin-brand-logos-row-actions";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GrDocumentMissing } from "react-icons/gr";
import Image from "next/image";

type DB_BrandLogos = Prisma.DL_BrandLogoGetPayload<{
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

export const columns: ColumnDef<DB_BrandLogos>[] = [
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
        // TODO: Make this a component. it's used in almost all columns files
        <HoverCard openDelay={100} closeDelay={100}>
          <HoverCardTrigger
            className="flex items-center justify-start gap-4 hover:cursor-pointer"
            asChild
          >
            <Link
              href={`/admin/brand-logos/${id}`}
              className="flex items-center gap-2"
            >
              <CustomAvatar
                image={image}
                className="overflow-hidden bg-black"
              />
              {name}
            </Link>
          </HoverCardTrigger>
          <HoverCardContent
            className="w-auto overflow-hidden leading-relaxed"
            align="start"
          >
            {/* <div className="h-[50px] w-[300px]"> */}
            <Link
              href={`/admin/brand-logos/${id}`}
              className="flex items-center gap-2"
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
            {/* </div> */}
          </HoverCardContent>
        </HoverCard>
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
            // TODO: Make this a component. it's used in almost all columns files
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

      return <AdminBrandLogosRowActions brandLogo={avatars} />;
    },
  },
];
