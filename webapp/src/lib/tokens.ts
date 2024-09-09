import {
  PASSWORD_RESET_TOKEN_EXPIRATION,
  TWO_FACTOR_TOKEN_EXPIRATION,
  VERIFICATION_TOKEN_EXPIRATION,
} from "@/lib/constants";
import {
  getPasswordResetTokenByEmail,
  getTwoFactorTokenByEmail,
  getVerificationTokenByEmail,
} from "@/lib/data";
import db from "@/lib/db";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

export const generateVerificationToken = async (
  email: string,
  emailOld?: string | null,
) => {
  const token = uuidv4();
  const expires = new Date(
    new Date().getTime() + VERIFICATION_TOKEN_EXPIRATION,
  );

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      emailOld,
      token,
      expires,
    },
  });

  return verificationToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(
    new Date().getTime() + PASSWORD_RESET_TOKEN_EXPIRATION,
  );

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + TWO_FACTOR_TOKEN_EXPIRATION);

  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    await db.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return twoFactorToken;
};
