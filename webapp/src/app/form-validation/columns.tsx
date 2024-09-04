"use client";

import { Button } from "@/components/ui/button";
import { cn, returnFormattedDate } from "@/lib/utils";
import { DL_FormValidation } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import {
  PiArrowBendRightDownDuotone,
  PiArrowBendRightUpDuotone,
} from "react-icons/pi";
import FormValidationRowActions from "./form-validation-row-actions";

// type FormValidation = Prisma.FormValidationGetPayload<{
//   include: {
//     createdBy: true;
//     updatedBy: true;
//   };
// }>;

export const columns: ColumnDef<DL_FormValidation>[] = [
  // Name
  {
    accessorKey: "name",
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
    cell: ({ row }) => (
      <Button asChild variant={"link"} className={cn("text-foreground")}>
        <Link href={`/form-validation/${row.original.slug}`}>
          {row.original.name}
        </Link>
      </Button>
    ),
  },
  // Slug
  {
    accessorKey: "slug",
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
    cell: ({ row }) => (
      <Button asChild variant={"link"} className={cn("text-foreground")}>
        <Link href={`/form-validation/${row.original.slug}`}>
          {row.original.slug}
        </Link>
      </Button>
    ),
  },
  // Description
  {
    accessorKey: "description",
    enableSorting: false,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex cursor-context-menu gap-2"
          // onClick={() => column.toggleSorting()}
        >
          Description
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
        <div className="line-clamp-2 max-w-[25ch]">
          {row.original.description || "-"}
        </div>
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
  // {
  //   accessorKey: "createdBy",
  //   // enableSorting: false,
  //   sortingFn: (rowA, rowB, columnId) => {
  //     const rA_Username = rowA.original.createdBy.username;
  //     const rB_Username = rowB.original.createdBy.username;

  //     return rA_Username > rB_Username ? 1 : rA_Username < rB_Username ? -1 : 0;
  //   },
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         className="flex gap-2"
  //         onClick={() => column.toggleSorting()}
  //       >
  //         Created By
  //         {column.getIsSorted() === "asc" && (
  //           <PiArrowBendRightUpDuotone size={20} />
  //         )}
  //         {column.getIsSorted() === "desc" && (
  //           <PiArrowBendRightDownDuotone size={20} />
  //         )}
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     const id = row.original.createdBy.id;
  //     const userName = row.original.createdBy.username;
  //     const firstName = row.original.createdBy.firstName;
  //     const lastName = row.original.createdBy.lastName;
  //     const email = row.original.createdBy.email;

  //     const avatar = getUserAvatar(row.original.createdBy.avatar);

  //     return (
  //       <>
  //         <HoverCard>
  //           <HoverCardTrigger
  //             className="flex items-center justify-start gap-4 hover:cursor-pointer"
  //             asChild
  //           >
  //             <Link href={`/profile/${id}`}>
  //               <Avatar>
  //                 <AvatarImage src={avatar} />
  //                 <AvatarFallback>
  //                   {firstName?.charAt(0) || userName.charAt(0).toUpperCase()}
  //                   {lastName?.charAt(0) || userName.charAt(1).toUpperCase()}
  //                 </AvatarFallback>
  //               </Avatar>

  //               {userName}
  //             </Link>
  //           </HoverCardTrigger>
  //           <HoverCardContent className="leading-relaxed">
  //             <p>
  //               User:{" "}
  //               <Link className={cn("hover:underline")} href={`/profile/${id}`}>
  //                 <strong>{userName}</strong>
  //               </Link>
  //             </p>
  //             <p>
  //               Full Name:{" "}
  //               <strong>
  //                 {firstName} {lastName}
  //               </strong>
  //             </p>
  //             <p>
  //               Email:{" "}
  //               <Link
  //                 className={cn("hover:underline")}
  //                 href={`mailto:${email}`}
  //               >
  //                 <strong>{email}</strong>
  //               </Link>
  //             </p>
  //             <p>
  //               Created at:{" "}
  //               <strong>
  //                 {returnFormattedDate(row.original.createdAt)} (UTC)
  //               </strong>
  //             </p>
  //           </HoverCardContent>
  //         </HoverCard>
  //       </>
  //     );
  //   },
  // },
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
  // {
  //   accessorKey: "updatedBy",
  //   // enableSorting: false,
  //   sortingFn: (rowA, rowB, columnId) => {
  //     const rA_Username = rowA.original.updatedBy?.username!;
  //     const rB_Username = rowB.original.updatedBy?.username!;

  //     return rA_Username > rB_Username ? 1 : rA_Username < rB_Username ? -1 : 0;
  //   },
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         className="flex gap-2"
  //         onClick={() => column.toggleSorting()}
  //       >
  //         Updated By
  //         {column.getIsSorted() === "asc" && (
  //           <PiArrowBendRightUpDuotone size={20} />
  //         )}
  //         {column.getIsSorted() === "desc" && (
  //           <PiArrowBendRightDownDuotone size={20} />
  //         )}
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     const id = row.original.updatedBy?.id;
  //     const userName = row.original.updatedBy?.username;
  //     const firstName = row.original.updatedBy?.firstName;
  //     const lastName = row.original.updatedBy?.lastName;
  //     const email = row.original.updatedBy?.email;

  //     const avatar = getUserAvatar(row.original.updatedBy?.avatar);

  //     return (
  //       <>
  //         <HoverCard>
  //           <HoverCardTrigger
  //             className="flex items-center justify-start gap-4 hover:cursor-pointer"
  //             asChild
  //           >
  //             <Link href={`/profile/${id}`}>
  //               <Avatar>
  //                 <AvatarImage src={avatar} />
  //                 <AvatarFallback>
  //                   {firstName?.charAt(0) || userName.charAt(0).toUpperCase()}
  //                   {lastName?.charAt(0) || userName.charAt(1).toUpperCase()}
  //                 </AvatarFallback>
  //               </Avatar>

  //               {userName}
  //             </Link>
  //           </HoverCardTrigger>
  //           <HoverCardContent className="leading-relaxed">
  //             <p>
  //               User:{" "}
  //               <Link className={cn("hover:underline")} href={`/profile/${id}`}>
  //                 <strong>{userName}</strong>
  //               </Link>
  //             </p>
  //             <p>
  //               Full Name:{" "}
  //               <strong>
  //                 {firstName} {lastName}
  //               </strong>
  //             </p>
  //             <p>
  //               Email:{" "}
  //               <Link
  //                 className={cn("hover:underline")}
  //                 href={`mailto:${email}`}
  //               >
  //                 <strong>{email}</strong>
  //               </Link>
  //             </p>
  //             <p>
  //               Created at:{" "}
  //               <strong>
  //                 {returnFormattedDate(row.original.updatedAt)} (UTC)
  //               </strong>
  //             </p>
  //           </HoverCardContent>
  //         </HoverCard>
  //       </>
  //     );
  //   },
  // },
  // Actions
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const formValidation = row.original;

      return <FormValidationRowActions formValidation={formValidation} />;
    },
  },
];
