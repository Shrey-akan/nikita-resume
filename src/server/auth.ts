import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { loginSchema, registerSchema } from "@/lib/auth-rules";
import {
  currentUserImpl,
  listUsersImpl,
  loginAccountImpl,
  logoutAccountImpl,
  registerAccountImpl,
} from "./auth.server";

export type { PublicUser } from "./auth.server";

export const adminTokenInput = z.object({ token: z.string().min(1, "Please log in") });

export const registerAccount = createServerFn({ method: "POST" })
  .inputValidator(registerSchema)
  .handler(async ({ data }) => registerAccountImpl(data));

export const loginAccount = createServerFn({ method: "POST" })
  .inputValidator(loginSchema)
  .handler(async ({ data }) => loginAccountImpl(data));

export const currentUser = createServerFn({ method: "POST" })
  .inputValidator(z.object({ token: z.string() }))
  .handler(async ({ data }) => currentUserImpl(data.token));

export const logoutAccount = createServerFn({ method: "POST" })
  .inputValidator(z.object({ token: z.string() }))
  .handler(async ({ data }) => logoutAccountImpl(data.token));

export const listUsers = createServerFn({ method: "POST" })
  .inputValidator(adminTokenInput)
  .handler(async ({ data }) => listUsersImpl(data.token));
