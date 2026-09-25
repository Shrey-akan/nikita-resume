import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { AuthForm } from "@/components/AuthForm";
import { useAuth } from "@/components/AuthProvider";
import { useFeedback } from "@/components/FeedbackProvider";
import { BlogEditorFields, emptyBlogForm, type BlogFormState } from "@/components/BlogEditorFields";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api-client";
import { formatBlogDate, type BlogPost } from "@/lib/blog";

export const Route = createFileRoute("/write")({
  head: () => ({
    meta: [
      { title: "Write — Nikita Nautiyal" },
      { name: "description", content: "Create an account, log in, and submit a blog for review." },
    ],
  }),
  component: WritePage,
});

function statusLabel(status: BlogPost["status"]) {
  if (status === "approved") return "Live on the site";
  if (status === "rejected") return "Needs changes";
  return "Waiting for admin approval";
}

function WritePage() {
  const { user, ready, token, logout } = useAuth();
  const feedback = useFeedback();
  const [form, setForm] = useState<BlogFormState>(emptyBlogForm);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!token) {
      setPosts([]);
      return;
    }
    void api.listMyBlogs(token).then(setPosts).catch(() => setPosts([]));
  }, [token]);

  async function onSave(event: FormEvent) {
    event.preventDefault();
    if (!token) return;
    setSaving(true);
    try {
      const result = await api.saveMyBlog(token, {
        id: form.id || undefined,
        title: form.title,
        excerpt: form.excerpt,
        body: form.body,
        coverImage: form.coverImage,
        coverThumb: form.coverThumb,
      });
      setForm((current) => ({ ...current, id: result.id }));
      setPosts(await api.listMyBlogs(token));
      await feedback.success({
        title: form.id ? "Post updated" : "Post submitted",
        description: "It’s waiting for admin approval. It will show on the blog after it’s approved.",
        action: "OK",
      });
    } catch (error) {
      feedback.error("Could not save the post", error instanceof Error ? error.message.slice(0, 180) : "Try again.");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(id: string) {
    if (!token) return;
    const ok = await feedback.confirm({
      title: "Delete this post?",
      description: "This cannot be undone.",
      action: "Delete",
    });
    if (!ok) return;
    try {
      await api.deleteMyBlog(token, id);
      if (form.id === id) setForm(emptyBlogForm);
      setPosts(await api.listMyBlogs(token));
      await feedback.success({
        title: "Post deleted",
        description: "That draft is gone from your list.",
        action: "OK",
      });
    } catch (error) {
      feedback.error("Could not delete the post", error instanceof Error ? error.message : "Try again.");
    }
  }

  function loadPost(post: BlogPost) {
    setForm({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      body: post.body,
      coverImage: post.coverImage,
      coverThumb: post.coverThumb,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (!ready) {
    return <div className="mx-auto max-w-md px-4 py-24 text-muted-foreground sm:px-6">Checking your account…</div>;
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-14 sm:px-6 sm:py-20 md:py-28">
        <p className="font-mono text-xs uppercase tracking-widest text-primary mb-4">Write</p>
        <h1 className="mb-3 font-display text-3xl sm:text-4xl md:text-5xl">Sign in to write</h1>
        <p className="text-muted-foreground mb-8">
          Create an account or log in with the same email. Posts go live after admin approval.
        </p>
        <AuthForm defaultTab="register" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 md:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">Write</p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl">Hello, {user.name}</h1>
          <p className="mt-2 text-muted-foreground">
            Submit a post with text and an image. Admin reviews it before it appears on the blog.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setForm(emptyBlogForm)}>
            New post
          </Button>
          <Button variant="ghost" onClick={() => void logout()}>
            Log out
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_20rem] gap-8">
        <form onSubmit={onSave} className="min-w-0 space-y-5 rounded-lg border border-border bg-card p-4 sm:p-6 md:p-8">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {form.id ? "Editing your post" : "New post"}
          </p>
          <BlogEditorFields form={form} setForm={setForm} />
          <Button type="submit" disabled={saving}>
            {saving ? "Saving…" : "Save for review"}
          </Button>
        </form>

        <aside className="space-y-3">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Your posts</p>
          {posts.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nothing saved yet.</p>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="rounded-lg border border-border bg-card p-4">
                <button type="button" onClick={() => loadPost(post)} className="text-left w-full">
                  <p className="font-display text-lg leading-snug">{post.title}</p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                    {statusLabel(post.status)} · {formatBlogDate(post.updatedAt)}
                  </p>
                </button>
                {post.status === "approved" ? (
                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="mt-2 inline-block text-xs text-primary hover:underline"
                  >
                    View live
                  </Link>
                ) : null}
                <button
                  type="button"
                  className="mt-2 ml-3 text-xs text-destructive hover:underline"
                  onClick={() => void onDelete(post.id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </aside>
      </div>
    </div>
  );
}
