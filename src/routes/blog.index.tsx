import { Link, createFileRoute } from "@tanstack/react-router";
import { BlogStats } from "@/components/BlogStats";
import { UserAvatar } from "@/components/UserAvatar";
import { WritePostButton } from "@/components/WritePostButton";
import { formatBlogDate, type BlogCard } from "@/lib/blog";
import { getBlogIndex } from "@/server/blogs";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Journal — Nikita Nautiyal" },
      {
        name: "description",
        content: "Design notes and journal posts from Nikita Nautiyal.",
      },
      { property: "og:title", content: "Journal — Nikita Nautiyal" },
    ],
  }),
  loader: () => getBlogIndex(),
  component: BlogIndex,
});

function BlogIndex() {
  const { blogOfTheDay, top } = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20 md:py-28">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-6">Writing</p>
          <h1 className="font-display text-4xl leading-[1] text-balance sm:text-5xl md:text-7xl">Blog</h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Featured post, then the top 100. Like, comment, or write your own — you’ll be asked to
            sign in if you don’t have an account yet.
          </p>
        </div>
        <WritePostButton />
      </div>

      <section className="mt-14">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-5">
          Blog of the day
        </p>
        {blogOfTheDay ? (
          <FeaturedPost post={blogOfTheDay} />
        ) : (
          <div className="rounded-lg border border-dashed border-border p-10 text-muted-foreground">
            No featured post yet. Check back later.
          </div>
        )}
      </section>

      <section className="mt-20">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="font-display text-3xl md:text-4xl">Top 100</h2>
          <p className="font-mono text-xs text-muted-foreground">{top.length} published</p>
        </div>
        {top.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border p-10 text-muted-foreground">
            Posts will appear here as they’re published.
          </div>
        ) : (
          <ol className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {top.map((post, index) => (
              <li key={post.id}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card hover:border-primary/60 transition h-full"
                >
                  <div className="relative h-40 bg-secondary/40">
                    {post.coverThumb ? (
                      <img src={post.coverThumb} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-primary/20 to-transparent" />
                    )}
                    <span className="absolute left-3 top-3 rounded-full bg-background/85 px-2 py-1 font-mono text-[11px] text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-xl group-hover:text-primary transition line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                    <div className="mt-auto pt-5 flex items-center justify-between gap-3">
                      <span className="flex items-center gap-2 min-w-0">
                        <UserAvatar name={post.authorName} className="h-7 w-7" />
                        <span className="truncate text-xs text-muted-foreground">{post.authorName}</span>
                      </span>
                      <BlogStats likes={post.likesCount} comments={post.commentsCount} views={post.views} />
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
}

function FeaturedPost({ post }: { post: BlogCard }) {
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className="group grid md:grid-cols-[1.15fr_1fr] overflow-hidden rounded-xl border border-border bg-card hover:border-primary/60 transition"
    >
      <div className="min-h-56 bg-surface">
        {post.coverThumb ? (
          <img src={post.coverThumb} alt="" className="h-full w-full object-cover min-h-56 md:min-h-80" />
        ) : (
          <div className="h-full min-h-56 md:min-h-80 bg-gradient-to-br from-primary/25 to-secondary" />
        )}
      </div>
      <div className="flex flex-col justify-center p-5 sm:p-8 md:p-10">
        <p className="font-mono text-xs uppercase tracking-widest text-primary mb-4">Featured today</p>
        <h2 className="font-display text-2xl group-hover:text-primary transition sm:text-3xl md:text-4xl">{post.title}</h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">{post.excerpt}</p>
        <div className="mt-6 flex items-center gap-3">
          <UserAvatar name={post.authorName} />
          <div>
            <p className="text-sm">{post.authorName}</p>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              {formatBlogDate(post.publishedAt || post.createdAt)}
            </p>
          </div>
        </div>
        <div className="mt-6">
          <BlogStats likes={post.likesCount} comments={post.commentsCount} views={post.views} />
        </div>
      </div>
    </Link>
  );
}
