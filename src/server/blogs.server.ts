import type { BlogCard, BlogPost, BlogStatus } from "@/lib/blog";
import { slugify } from "@/lib/blog";
import type { PublicUser } from "./auth.server";
import { approvedBlogFilter, blogsCollection, objectId, type BlogDoc } from "./db.server";

export function resolveStatus(doc: Partial<BlogDoc>): BlogStatus {
  if (doc.status) return doc.status;
  return doc.published ? "approved" : "pending";
}

export function toCard(id: string, doc: BlogDoc): BlogCard {
  return {
    id,
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    coverThumb: doc.coverThumb,
    views: doc.views,
    publishedAt: doc.publishedAt ? doc.publishedAt.toISOString() : null,
    createdAt: doc.createdAt.toISOString(),
    isBlogOfTheDay: doc.isBlogOfTheDay,
    authorName: doc.authorName || "Nikita Nautiyal",
    status: resolveStatus(doc),
    likesCount: Math.max(0, doc.likesCount ?? 0),
    commentsCount: Math.max(0, doc.commentsCount ?? 0),
  };
}

export function toPost(id: string, doc: BlogDoc): BlogPost {
  return {
    ...toCard(id, doc),
    body: doc.body,
    coverImage: doc.coverImage,
    published: resolveStatus(doc) === "approved",
    updatedAt: doc.updatedAt.toISOString(),
    authorEmail: doc.authorEmail || "",
    authorId: doc.authorId ?? null,
  };
}

async function uniqueSlug(title: string, ignoreId?: string) {
  const blogs = await blogsCollection();
  let slug = slugify(title);
  const existing = await blogs.findOne({
    slug,
    ...(ignoreId ? { _id: { $ne: objectId(ignoreId) } } : {}),
  });
  if (existing) {
    slug = `${slug}-${Date.now().toString(36)}`;
  }
  return slug;
}

export const emptyBlogIndex = { blogOfTheDay: null, top: [] as BlogCard[] };

export async function listPublicBlogs() {
  const blogs = await blogsCollection();
  const [blogOfTheDay, top] = await Promise.all([
    blogs.find({ ...approvedBlogFilter, isBlogOfTheDay: true }).sort({ publishedAt: -1 }).limit(1).next(),
    blogs
      .find(approvedBlogFilter)
      .project({ body: 0, coverImage: 0 })
      .sort({ views: -1, publishedAt: -1, createdAt: -1 })
      .limit(100)
      .toArray(),
  ]);

  return {
    blogOfTheDay: blogOfTheDay ? toCard(String(blogOfTheDay._id), blogOfTheDay) : null,
    posts: top.map((doc) => toCard(String(doc._id), doc as BlogDoc)),
    top: top.map((doc) => toCard(String(doc._id), doc as BlogDoc)),
  };
}

export async function getPublicBlog(slug: string) {
  const blogs = await blogsCollection();
  const doc = await blogs.findOne({ slug, ...approvedBlogFilter });
  if (!doc) return null;
  return toPost(String(doc._id), doc);
}

export async function recordPublicBlogView(slug: string) {
  const blogs = await blogsCollection();
  const result = await blogs.updateOne({ slug, ...approvedBlogFilter }, { $inc: { views: 1 } });
  if (!result.matchedCount) throw new Error("Blog not found");
  return { ok: true };
}

export async function listAdminBlogs() {
  const blogs = await blogsCollection();
  const docs = await blogs.find({}).sort({ updatedAt: -1 }).limit(200).toArray();
  const posts = docs.map((doc) => toPost(String(doc._id), doc));
  const rank: Record<BlogStatus, number> = { pending: 0, rejected: 1, approved: 2 };
  return posts.sort((a, b) => rank[a.status] - rank[b.status] || b.updatedAt.localeCompare(a.updatedAt));
}

export async function getAdminBlog(id: string) {
  const blogs = await blogsCollection();
  const doc = await blogs.findOne({ _id: objectId(id) });
  if (!doc) throw new Error("Blog not found");
  return toPost(String(doc._id), doc);
}

export type AdminBlogInput = {
  id?: string;
  title: string;
  excerpt: string;
  body: string;
  coverImage?: string | null;
  coverThumb?: string | null;
  published: boolean;
  isBlogOfTheDay: boolean;
};

export async function saveAdminBlog(data: AdminBlogInput) {
  const blogs = await blogsCollection();
  const now = new Date();
  const slug = await uniqueSlug(data.title, data.id);
  const status: BlogStatus = data.published ? "approved" : "pending";

  if (data.isBlogOfTheDay) {
    await blogs.updateMany({ isBlogOfTheDay: true }, { $set: { isBlogOfTheDay: false } });
  }

  const coverImage = data.coverImage || null;
  const coverThumb = data.coverThumb || coverImage;

  if (data.id) {
    const current = await blogs.findOne({ _id: objectId(data.id) });
    if (!current) throw new Error("Blog not found");
    const publishedAt = status === "approved" && !current.publishedAt ? now : current.publishedAt;
    await blogs.updateOne(
      { _id: current._id },
      {
        $set: {
          slug,
          title: data.title,
          excerpt: data.excerpt,
          body: data.body,
          coverImage,
          coverThumb,
          published: status === "approved",
          status,
          isBlogOfTheDay: data.isBlogOfTheDay,
          updatedAt: now,
          publishedAt,
        },
      },
    );
    return { id: String(current._id), slug, status };
  }

  const result = await blogs.insertOne({
    slug,
    title: data.title,
    excerpt: data.excerpt,
    body: data.body,
    coverImage,
    coverThumb,
    published: status === "approved",
    status,
    isBlogOfTheDay: data.isBlogOfTheDay,
    views: 0,
    authorId: null,
    authorName: "Nikita Nautiyal",
    authorEmail: "",
    likesCount: 0,
    commentsCount: 0,
    createdAt: now,
    updatedAt: now,
    publishedAt: status === "approved" ? now : null,
  });

  return { id: String(result.insertedId), slug, status };
}

export async function deleteAdminBlog(id: string) {
  const blogs = await blogsCollection();
  const result = await blogs.deleteOne({ _id: objectId(id) });
  if (!result.deletedCount) throw new Error("Blog not found");
  return { ok: true };
}

export async function approveBlogById(id: string, isBlogOfTheDay?: boolean) {
  const blogs = await blogsCollection();
  const current = await blogs.findOne({ _id: objectId(id) });
  if (!current) throw new Error("Blog not found");
  const now = new Date();
  if (isBlogOfTheDay) {
    await blogs.updateMany({ isBlogOfTheDay: true }, { $set: { isBlogOfTheDay: false } });
  }
  await blogs.updateOne(
    { _id: current._id },
    {
      $set: {
        status: "approved",
        published: true,
        isBlogOfTheDay: Boolean(isBlogOfTheDay) || current.isBlogOfTheDay,
        updatedAt: now,
        publishedAt: current.publishedAt ?? now,
      },
    },
  );
  return { ok: true, id: String(current._id), slug: current.slug, status: "approved" as const };
}

export async function rejectBlogById(id: string) {
  const blogs = await blogsCollection();
  const current = await blogs.findOne({ _id: objectId(id) });
  if (!current) throw new Error("Blog not found");
  await blogs.updateOne(
    { _id: current._id },
    {
      $set: {
        status: "rejected",
        published: false,
        isBlogOfTheDay: false,
        updatedAt: new Date(),
      },
    },
  );
  return { ok: true, id: String(current._id), slug: current.slug, status: "rejected" as const };
}

export type UserBlogInput = {
  id?: string;
  title: string;
  excerpt: string;
  body: string;
  coverImage?: string | null;
  coverThumb?: string | null;
};

export async function saveUserBlogPost(author: PublicUser, data: UserBlogInput) {
  const blogs = await blogsCollection();
  const now = new Date();
  const slug = await uniqueSlug(data.title, data.id);
  const coverImage = data.coverImage || null;
  const coverThumb = data.coverThumb || coverImage;

  if (data.id) {
    const current = await blogs.findOne({ _id: objectId(data.id) });
    if (!current || current.authorId !== author.id) {
      throw new Error("You can only edit your own posts");
    }
    await blogs.updateOne(
      { _id: current._id },
      {
        $set: {
          slug,
          title: data.title,
          excerpt: data.excerpt,
          body: data.body,
          coverImage,
          coverThumb,
          status: "pending",
          published: false,
          isBlogOfTheDay: false,
          authorName: author.name,
          authorEmail: author.email,
          updatedAt: now,
        },
      },
    );
    return { id: String(current._id), slug, status: "pending" as const };
  }

  const result = await blogs.insertOne({
    slug,
    title: data.title,
    excerpt: data.excerpt,
    body: data.body,
    coverImage,
    coverThumb,
    published: false,
    status: "pending",
    isBlogOfTheDay: false,
    views: 0,
    authorId: author.id,
    authorName: author.name,
    authorEmail: author.email,
    likesCount: 0,
    commentsCount: 0,
    createdAt: now,
    updatedAt: now,
    publishedAt: null,
  });

  return { id: String(result.insertedId), slug, status: "pending" as const };
}

export async function listUserBlogs(authorId: string) {
  const blogs = await blogsCollection();
  const docs = await blogs.find({ authorId }).sort({ updatedAt: -1 }).limit(100).toArray();
  return docs.map((doc) => toPost(String(doc._id), doc));
}

export async function deleteUserBlogPost(authorId: string, id: string) {
  const blogs = await blogsCollection();
  const current = await blogs.findOne({ _id: objectId(id) });
  if (!current || current.authorId !== authorId) {
    throw new Error("You can only delete your own posts");
  }
  await blogs.deleteOne({ _id: current._id });
  return { ok: true };
}
