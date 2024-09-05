import { currentUser } from "@/lib/auth";
import { getUserById } from "@/lib/data";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await currentUser();
  const dbUser = await getUserById(user?.id!);

  if (!dbUser) {
    return new NextResponse(null, {
      status: 403,
    });
  }

  if (user?.role === UserRole.ADMIN) {
    return new NextResponse(null, {
      status: 200,
    });
  }

  return new NextResponse(null, {
    status: 403,
  });
}
