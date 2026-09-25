import { QUERY_TOPICS } from "@/lib/blog";
import { z } from "zod";
import { messagesCollection } from "./db.server";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Enter a valid email").max(120),
  phone: z.string().trim().max(30).optional().default(""),
  subject: z.enum(QUERY_TOPICS),
  message: z.string().trim().min(10, "Write a short message").max(5000),
  website: z.string().optional().default(""),
});

export async function submitContactMessage(data: z.infer<typeof contactSchema>) {
  if (data.website) {
    return { ok: true };
  }
  const messages = await messagesCollection();
  await messages.insertOne({
    name: data.name,
    email: data.email,
    phone: data.phone ?? "",
    subject: data.subject,
    message: data.message,
    createdAt: new Date(),
  });
  return { ok: true };
}

export async function listContactMessages() {
  const messages = await messagesCollection();
  const docs = await messages.find({}).sort({ createdAt: -1 }).limit(200).toArray();
  return docs.map((doc) => ({
    id: String(doc._id),
    name: doc.name,
    email: doc.email,
    phone: doc.phone,
    subject: doc.subject,
    message: doc.message,
    createdAt: doc.createdAt.toISOString(),
  }));
}
