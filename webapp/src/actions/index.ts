"use server";

import { login } from "@/actions/login";
import { newVerification } from "@/actions/new-verification";
import { register } from "@/actions/register";
import { reset } from "@/actions/reset";
import { newPassword } from "@/actions/new-password";
import { logout } from "@/actions/logout";
import { admin } from "@/actions/admin";

export { login, newPassword, newVerification, register, reset, logout, admin };
