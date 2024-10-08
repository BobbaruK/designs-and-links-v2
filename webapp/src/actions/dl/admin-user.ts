"use server";

import { currentUser } from "@/lib/auth";
import { getUserByEmail, getUserById } from "@/lib/data";
import db from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { AdminUserAddSchema, AdminUserEditSchema } from "@/lib/schemas";
import { generateVerificationToken } from "@/lib/tokens";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const adminAddUser = async (
  values: z.infer<typeof AdminUserAddSchema>,
) => {
  const user = await currentUser();

  const validatedFields = AdminUserAddSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { name, password, email, role, isTwoFactorEnabled, image } =
    validatedFields.data;

  if (!user || !user.id) {
    return { error: "Unauthorized!" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role !== "ADMIN") return { error: "Unauthorized!" };

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        image,
        role,
        isTwoFactorEnabled,
      },
    });

    return { success: "User sucessfuly added!" };
  } catch (error) {
    return { error: "User could not be added!" };
  }
};

export const adminEditUser = async (
  values: z.infer<typeof AdminUserEditSchema>,
  id: string,
) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: "Unauthorized!" };
  }

  const dbUser = await getUserById(user.id!);

  if (!dbUser || user.role !== "ADMIN") return { error: "Unauthorized!" };

  const editedUser = await db.user.findUnique({
    where: {
      id,
    },
    include: {
      accounts: true,
    },
  });

  if (!editedUser) {
    return { error: "User does not exists!" };
  }

  if (editedUser.accounts.length) {
    values.email = undefined;
    values.password = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== editedUser.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id)
      return { error: "Email already in use!" };

    const verificationToken = await generateVerificationToken(
      values.email,
      editedUser.email,
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return {
      success: "Verification email sent!",
    };
  }

  if (values.password && editedUser.password) {
    const passwordMatch = await bcrypt.compare(
      values.password,
      editedUser.password,
    );

    if (passwordMatch)
      return { error: "User's new password cannot be old password!" };

    const hashedPassword = await bcrypt.hash(values.password, 10);

    values.password = hashedPassword;
  }

  try {
    await db.user.update({
      where: {
        id,
      },
      data: { ...values },
    });

    return {
      success: "User updated!",
    };
  } catch (error) {
    return { error: "Could not update the user!" };
  }
};

export const adminDeleteUser = async (id: string) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: "Unauthorized!" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role !== "ADMIN") return { error: "Unauthorized!" };

  try {
    await db.user.delete({
      where: { id },
    });

    return {
      success: "User deleted!",
    };
  } catch (error) {
    return { error: "Could not delete the user!" };
  }
};
