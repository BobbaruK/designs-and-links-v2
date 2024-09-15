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
import DesignRowActions from "./design-row-actions";
import { FaCaretRight } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa6";
import { SortingArrows } from "@/components/sorting-arrows";
import { NameCell } from "@/components/data-table/name-cell";

type Design = Prisma.DL_DesignGetPayload<{
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
    subDesigns: {
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
    };
    LandingPages: true;
  };
}>;

type SubDesign = Prisma.DL_SubDesignGetPayload<{
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

export const columns: ColumnDef<Design>[] = [
  // Expand
  {
    accessorKey: "expand",
    id: "expand",
    enableHiding: false,
    header: ({ column, table }) => {
      return (
        <>
          <div className="flex w-full items-center justify-start gap-2">
            <Button
              variant="ghost"
              className="grid place-items-center"
              {...{
                onClick: table.getToggleAllRowsExpandedHandler(),
              }}
            >
              {table.getIsAllRowsExpanded() ? (
                <FaCaretDown />
              ) : (
                <FaCaretRight />
              )}
            </Button>
          </div>
        </>
      );
    },
    cell: ({ row, getValue }) => {
      return (
        <>
          {row.getCanExpand() && (
            <>
              <Button
                variant="ghost"
                className="grid place-items-center"
                {...{
                  onClick: row.getToggleExpandedHandler(),
                }}
              >
                {row.getIsExpanded() ? <FaCaretDown /> : <FaCaretRight />}
              </Button>
            </>
          )}
        </>
      );
    },
  },
  // Name
  {
    accessorKey: "name",
    id: "name",
    accessorFn: (originalRow) => originalRow.name,
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
    cell: ({ row, getValue }) => {
      const slug = row.original.slug;
      const name = row.original.name;
      const image = row.original.avatar || "";
      const lps = row.original.LandingPages;

      return (
        <div
          style={{
            // Since rows are flattened by default,
            // we can use the row.depth property
            // and paddingLeft to visually indicate the depth
            // of the row
            paddingLeft: `${row.depth * 2}rem`,
          }}
        >
          <CustomHoverCard
            triggerAsChild
            trigger={
              <NameCell
                link={`/design/${slug}`}
                name={name}
                length={lps ? lps.length : 0}
                image={
                  <CustomAvatar
                    image={image}
                    className="h-[110px] w-[130px] overflow-hidden rounded-md bg-black"
                  />
                }
              />
            }
          >
            {image ? (
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
            ) : (
              <p>no image added</p>
            )}
          </CustomHoverCard>
        </div>
      );
    },
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
    accessorFn: (originalRow) => originalRow.createdBy?.name,
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
    accessorFn: (originalRow) => originalRow.updatedAt,
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
    accessorFn: (originalRow) => originalRow.updatedBy?.name,
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
      const design = row.original;

      return <DesignRowActions design={design as Design & SubDesign} />;
    },
  },
];
