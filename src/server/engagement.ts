import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireUser } from "./auth.server";
import {
  approvedBlogFilter,
  blogsCollection,
  commentsCollection,
  likesCollection,
  objectId,
} from "./db.server";

async function approvedBlog(slug: string) {
  const blogs = await blogsCollection();
  const blog = await blogs.findOne({ slug, ...approvedBlogFilter });
  if (!blog) throw new Error("Post not found");
  return blog;
}

export type PublicComment = {
  id: string;
  authorName: string;
  body: string;
  createdAt: string;
  mine: boolean;
};

export const getPostEngagement = createServerFn({ method: "POST" })
  .inputValidator(z.object({ slug: z.string().min(1), token: z.string().optional() }))
  .handler(async ({ data }) => {
    const blog = await approvedBlog(data.slug);
    const blogId = String(blog._id);
    const comments = await commentsCollection();
    const likes = await likesCollection();
    const [commentDocs, likesCount] = await Promise.all([
      comments.find({ blogId }).sort({ createdAt: 1 }).limit(200).toArray(),
      likes.countDocuments({ blogId }),
    ]);

    let userId = "";
    if (data.token) {
      try {
        userId = (await requireUser(data.token)).id;
      } catch {
        userId = "";
      }
    }

    const liked = userId ? Boolean(await likes.findOne({ blogId, userId })) : false;

    return {
      likesCount: blog.likesCount ?? likesCount,
      commentsCount: blog.commentsCount ?? commentDocs.length,
      liked,
      comments: commentDocs.map((doc) => ({
        id: String(doc._id),
        authorName: doc.authorName,
        body: doc.body,
        createdAt: doc.createdAt.toISOString(),
        mine: userId !== "" && doc.userId === userId,
      })) satisfies PublicComment[],
    };
  });

export const toggleLike = createServerFn({ method: "POST" })
  .inputValidator(z.object({ token: z.string(), slug: z.string().min(1) }))
  .handler(async ({ data }) => {
    const { id: userId } = await requireUser(data.token);
    const blog = await approvedBlog(data.slug);
    const blogId = String(blog._id);
    const likes = await likesCollection();
    const blogs = await blogsCollection();
    const existing = await likes.findOne({ blogId, userId });
    if (existing) {
      await likes.deleteOne({ _id: existing._id });
      await blogs.updateOne({ _id: blog._id }, { $inc: { likesCount: -1 } });
      const count = Math.max(0, (blog.likesCount ?? 1) - 1);
      return { liked: false, likesCount: count };
    }
    try {
      await likes.insertOne({ blogId, userId, createdAt: new Date() });
      await blogs.updateOne({ _id: blog._id }, { $inc: { likesCount: 1 } });
    } catch {
      return { liked: true, likesCount: (blog.likesCount ?? 0) + 1 };
    }
    return { liked: true, likesCount: (blog.likesCount ?? 0) + 1 };
  });

export const addComment = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      token: z.string(),
      slug: z.string().min(1),
      body: z.string().trim().min(2, "Write a short comment").max(2000),
    }),
  )
  .handler(async ({ data }) => {
    const { id: userId, user } = await requireUser(data.token);
    const blog = await approvedBlog(data.slug);
    const blogId = String(blog._id);
    const now = new Date();
    const result = await commentsCollection().then((comments) =>
      comments.insertOne({
        blogId,
        userId,
        authorName: user.name,
        body: data.body,
        createdAt: now,
      }),
    );
    await blogsCollection().then((blogs) =>
      blogs.updateOne({ _id: blog._id }, { $inc: { commentsCount: 1 } }),
    );
    return {
      id: String(result.insertedId),
      authorName: user.name,
      body: data.body,
      createdAt: now.toISOString(),
      mine: true,
    } satisfies PublicComment;
  });

export const deleteComment = createServerFn({ method: "POST" })
  .inputValidator(z.object({ token: z.string(), id: z.string().min(1) }))
  .handler(async ({ data }) => {
    const { id: userId } = await requireUser(data.token);
    const comments = await commentsCollection();
    const current = await comments.findOne({ _id: objectId(data.id) });
    if (!current || current.userId !== userId) {
      throw new Error("You can only delete your own comments");
    }
    await comments.deleteOne({ _id: current._id });
    await blogsCollection().then((blogs) =>
      blogs.updateOne({ _id: objectId(current.blogId) }, { $inc: { commentsCount: -1 } }),
    );
    return { ok: true };
  });
