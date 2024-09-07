"use server";

import { currentUser } from "@/lib/auth";
import { getUserByEmail, getUserById } from "@/lib/data";
import db from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { SettingsSchema } from "@/lib/schemas";
import { generateVerificationToken } from "@/lib/tokens";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: "Unauthorized!" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Unauthorized!" };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id)
      return { error: "Email already in use!" };

    const verificationToken = await generateVerificationToken(
      values.email,
      user?.email,
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return {
      success: "Verification email sent!",
    };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(
      values.password,
      dbUser.password,
    );

    if (!passwordMatch) return { error: "Incorrect password!" };

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);

    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  await db.user.update({
    where: {
      id: dbUser.id,
    },
    data: { ...values },
  });

  return {
    success: "Settings Updated!",
  };
};
