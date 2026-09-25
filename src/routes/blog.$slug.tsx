import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import { BlogEngagement } from "@/components/BlogEngagement";
import { BlogStats } from "@/components/BlogStats";
import { UserAvatar } from "@/components/UserAvatar";
import { WritePostButton } from "@/components/WritePostButton";
import { BlogBody, formatBlogDate, type BlogPost } from "@/lib/blog";
import { getBlogBySlug, recordBlogView } from "@/server/blogs";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = await getBlogBySlug({ data: { slug: params.slug } });
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => {
    const post = loaderData as BlogPost | undefined;
    return {
      meta: [
        { title: post ? `${post.title} — Nikita Nautiyal` : "Journal — Nikita Nautiyal" },
        {
          name: "description",
          content: post?.excerpt ?? "A note from Nikita Nautiyal.",
        },
      ],
    };
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const post = Route.useLoaderData() as BlogPost;

  useEffect(() => {
    void recordBlogView({ data: { slug: post.slug } });
  }, [post.slug]);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-20 md:py-28">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link to="/blog" className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary">
          ← All posts
        </Link>
        <WritePostButton />
      </div>
      {post.isBlogOfTheDay ? (
        <p className="mt-8 font-mono text-xs uppercase tracking-widest text-primary">Blog of the day</p>
      ) : (
        <p className="mt-8 font-mono text-xs uppercase tracking-widest text-primary">Writing</p>
      )}
      <h1 className="mt-4 font-display text-3xl leading-[1.05] text-balance sm:text-4xl md:text-6xl">{post.title}</h1>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <UserAvatar name={post.authorName} className="h-10 w-10 text-sm" />
          <div>
            <p className="text-sm">{post.authorName}</p>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              {formatBlogDate(post.publishedAt || post.createdAt)}
            </p>
          </div>
        </div>
        <BlogStats likes={post.likesCount} comments={post.commentsCount} views={post.views} />
      </div>
      {post.coverImage || post.coverThumb ? (
        <img
          src={post.coverImage || post.coverThumb || ""}
          alt=""
          className="mt-10 w-full rounded-xl border border-border object-cover max-h-[28rem]"
        />
      ) : null}
      <p className="mt-8 text-lg text-muted-foreground leading-relaxed">{post.excerpt}</p>
      <div className="mt-10">
        <BlogBody body={post.body} />
      </div>
      <BlogEngagement slug={post.slug} likesCount={post.likesCount} commentsCount={post.commentsCount} />
    </article>
  );
}
