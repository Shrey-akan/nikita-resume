import { createServerFn } from "@tanstack/react-start";
import { adminTokenInput } from "./auth";
import { requireAdmin } from "./auth.server";
import { contactSchema, listContactMessages, submitContactMessage } from "./contact.server";

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator(contactSchema)
  .handler(async ({ data }) => submitContactMessage(data));

export const listMessages = createServerFn({ method: "POST" })
  .inputValidator(adminTokenInput)
  .handler(async ({ data }) => {
    await requireAdmin(data.token);
    return listContactMessages();
  });
