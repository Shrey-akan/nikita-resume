import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useFeedback } from "@/components/FeedbackProvider";
import { BlogEditorFields, emptyBlogForm, type BlogFormState } from "@/components/BlogEditorFields";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api, type ContactMessage, type StudioUser } from "@/lib/api-client";
import { formatBlogDate, type BlogPost } from "@/lib/blog";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [{ title: "Admin — Nikita Nautiyal" }, { name: "robots", content: "noindex" }],
  }),
  component: Studio,
});

function Studio() {
  const { user, ready, token } = useAuth();
  const feedback = useFeedback();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [inbox, setInbox] = useState<ContactMessage[]>([]);
  const [users, setUsers] = useState<StudioUser[]>([]);
  const [form, setForm] = useState<BlogFormState>(emptyBlogForm);
  const [published, setPublished] = useState(true);
  const [isBlogOfTheDay, setIsBlogOfTheDay] = useState(false);
  const [saving, setSaving] = useState(false);

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    if (!ready) return;
    if (!user) {
      void navigate({ to: "/login", search: { redirect: "/studio", tab: "login" } });
    }
  }, [ready, user, navigate]);

  useEffect(() => {
    if (!token || !isAdmin) return;
    void refresh(token);
  }, [token, isAdmin]);

  async function refresh(value = token) {
    if (!value) return;
    const [nextPosts, nextInbox, nextUsers] = await Promise.all([
      api.listAdminBlogs(value),
      api.listMessages(value),
      api.listAdminUsers(value),
    ]);
    setPosts(nextPosts);
    setInbox(nextInbox);
    setUsers(nextUsers);
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
    setPublished(post.status === "approved");
    setIsBlogOfTheDay(post.isBlogOfTheDay);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function onSave(event: FormEvent) {
    event.preventDefault();
    if (!token) return;
    setSaving(true);
    try {
      const result = await api.saveAdminBlog(token, {
        id: form.id || undefined,
        title: form.title,
        excerpt: form.excerpt,
        body: form.body,
        coverImage: form.coverImage,
        coverThumb: form.coverThumb,
        published,
        isBlogOfTheDay,
      });
      setForm((current) => ({ ...current, id: result.id }));
      await refresh();
      await feedback.success({
        title: form.id ? "Post updated" : published ? "Post published" : "Post saved",
        description: published
          ? "It’s live on the public blog list now."
          : "Saved as pending. Approve it to show it on the blog.",
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
      description: "It will be removed from the admin list and the public blog.",
      action: "Delete",
    });
    if (!ok) return;
    try {
      await api.deleteAdminBlog(token, id);
      if (form.id === id) setForm(emptyBlogForm);
      await refresh();
      await feedback.success({
        title: "Post deleted",
        description: "That post is no longer on the site.",
        action: "OK",
      });
    } catch (error) {
      feedback.error("Could not delete the post", error instanceof Error ? error.message : "Try again.");
    }
  }

  async function onApprove(id: string, feature: boolean) {
    if (!token) return;
    try {
      await api.approveBlog(token, id, feature);
      await refresh();
      await feedback.success({
        title: feature ? "Approved as blog of the day" : "Post approved",
        description: "It’s now visible on the public blog list.",
        action: "OK",
      });
    } catch (error) {
      feedback.error("Could not approve the post", error instanceof Error ? error.message : "Try again.");
    }
  }

  async function onReject(id: string) {
    if (!token) return;
    try {
      await api.rejectBlog(token, id);
      await refresh();
      await feedback.success({
        title: "Post rejected",
        description: "It will not show on the public blog.",
        action: "OK",
      });
    } catch (error) {
      feedback.error("Could not reject the post", error instanceof Error ? error.message : "Try again.");
    }
  }

  const pending = useMemo(() => posts.filter((post) => post.status === "pending"), [posts]);
  const editingLabel = form.id ? "Editing existing post" : "New admin post";

  if (!ready || !user) {
    return <div className="mx-auto max-w-md px-4 py-24 text-muted-foreground sm:px-6">Checking admin access…</div>;
  }

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 sm:px-6">
        <p className="font-mono text-xs uppercase tracking-widest text-primary mb-4">Admin</p>
        <h1 className="font-display text-4xl mb-4">Admin only</h1>
        <p className="text-sm text-muted-foreground mb-6">
          This page is for the site admin. Log in with the admin account to review posts and users.
        </p>
        <Button asChild>
          <Link to="/login" search={{ redirect: "/studio", tab: "login" }}>
            Log in as admin
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 md:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">Admin</p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl">Users and blogs</h1>
          <p className="mt-2 break-all text-sm text-muted-foreground">
            Signed in as {user.email}. Approve a post to make it visible on the public blog.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => {
            setForm(emptyBlogForm);
            setPublished(true);
            setIsBlogOfTheDay(false);
          }}
        >
          New post
        </Button>
      </div>

      <Tabs defaultValue="blogs">
        <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1">
          <TabsTrigger value="blogs">Blogs ({posts.length})</TabsTrigger>
          <TabsTrigger value="users">Users ({users.length})</TabsTrigger>
          <TabsTrigger value="write">Write</TabsTrigger>
          <TabsTrigger value="inbox">Inbox ({inbox.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="blogs" className="mt-8 space-y-5">
          <p className="text-sm text-muted-foreground">
            {pending.length} waiting for approval. Approved posts appear on the public blog; others stay hidden.
          </p>
          {posts.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border p-10 text-muted-foreground">
              No blog posts yet.
            </div>
          ) : (
            posts.map((post) => (
              <article key={post.id} className="space-y-4 rounded-lg border border-border bg-card p-4 sm:p-6">
                <div className="flex flex-wrap justify-between gap-3">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                      {post.status}
                      {post.isBlogOfTheDay ? " · Today" : ""}
                      {post.status === "approved" ? " · Live" : " · Hidden from blog"}
                    </p>
                    <h2 className="font-display text-2xl mt-1">{post.title}</h2>
                    <p className="mt-1 break-words font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      {post.authorName}
                      {post.authorEmail ? ` · ${post.authorEmail}` : ""} · {formatBlogDate(post.updatedAt)}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.status !== "approved" ? (
                      <>
                        <Button size="sm" onClick={() => void onApprove(post.id, false)}>
                          Approve
                        </Button>
                        <Button size="sm" variant="secondary" onClick={() => void onApprove(post.id, true)}>
                          Approve as today
                        </Button>
                      </>
                    ) : (
                      <Button asChild size="sm" variant="outline">
                        <Link to="/blog/$slug" params={{ slug: post.slug }}>
                          View live
                        </Link>
                      </Button>
                    )}
                    {post.status !== "rejected" ? (
                      <Button size="sm" variant="outline" onClick={() => void onReject(post.id)}>
                        {post.status === "approved" ? "Unpublish" : "Reject"}
                      </Button>
                    ) : null}
                    <Button size="sm" variant="ghost" onClick={() => void onDelete(post.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
                {post.coverThumb ? (
                  <img src={post.coverThumb} alt="" className="max-h-48 rounded-md object-cover border border-border" />
                ) : null}
                <p className="text-muted-foreground">{post.excerpt}</p>
                <p className="whitespace-pre-wrap text-sm text-muted-foreground line-clamp-6">{post.body}</p>
                <button type="button" className="text-xs text-primary hover:underline" onClick={() => loadPost(post)}>
                  Open in editor
                </button>
              </article>
            ))
          )}
        </TabsContent>

        <TabsContent value="write" className="mt-8 grid lg:grid-cols-[minmax(0,1fr)_20rem] gap-8">
          <form onSubmit={onSave} className="min-w-0 space-y-5 rounded-lg border border-border bg-card p-4 sm:p-6 md:p-8">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{editingLabel}</p>
            <BlogEditorFields form={form} setForm={setForm} />
            <div className="flex flex-wrap gap-8">
              <label className="flex items-center gap-3 text-sm">
                <Switch checked={published} onCheckedChange={setPublished} />
                Publish immediately
              </label>
              <label className="flex items-center gap-3 text-sm">
                <Switch checked={isBlogOfTheDay} onCheckedChange={setIsBlogOfTheDay} />
                Blog of the day
              </label>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button type="submit" disabled={saving}>
                {saving ? "Saving…" : "Save post"}
              </Button>
              {form.id && published ? (
                <Button asChild variant="outline">
                  <Link to="/blog/$slug" params={{ slug: posts.find((p) => p.id === form.id)?.slug ?? "" }}>
                    View
                  </Link>
                </Button>
              ) : null}
            </div>
          </form>
          <aside className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Saved posts</p>
            {posts.map((post) => (
              <button
                key={post.id}
                type="button"
                onClick={() => loadPost(post)}
                className="w-full text-left rounded-lg border border-border bg-card p-4"
              >
                <p className="font-display text-lg leading-snug">{post.title}</p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  {post.status}
                </p>
              </button>
            ))}
          </aside>
        </TabsContent>

        <TabsContent value="users" className="mt-8">
          {users.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border p-10 text-muted-foreground">
              No accounts yet.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead className="bg-secondary/40 text-left font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3">Joined</th>
                    <th className="px-4 py-3">Last login</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((account) => (
                    <tr key={account.id} className="border-t border-border">
                      <td className="px-4 py-3">{account.name}</td>
                      <td className="px-4 py-3">{account.email}</td>
                      <td className="px-4 py-3 font-mono text-xs uppercase tracking-widest">{account.role}</td>
                      <td className="px-4 py-3 text-muted-foreground">{formatBlogDate(account.createdAt)}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {account.lastLoginAt ? formatBlogDate(account.lastLoginAt) : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>

        <TabsContent value="inbox" className="mt-8 space-y-4">
          {inbox.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border p-10 text-muted-foreground">
              No messages yet.
            </div>
          ) : (
            inbox.map((item) => (
              <article key={item.id} className="rounded-lg border border-border bg-card p-6">
                <div className="flex flex-wrap justify-between gap-2">
                  <h2 className="font-display text-2xl">{item.name}</h2>
                  <p className="font-mono text-xs text-muted-foreground">{formatBlogDate(item.createdAt)}</p>
                </div>
                <p className="mt-1 text-sm text-primary">{item.subject}</p>
                <p className="mt-2 font-mono text-xs text-muted-foreground">
                  <a href={`mailto:${item.email}`} className="hover:text-primary">
                    {item.email}
                  </a>
                  {item.phone ? ` · ${item.phone}` : ""}
                </p>
                <p className="mt-4 whitespace-pre-wrap text-muted-foreground leading-relaxed">{item.message}</p>
              </article>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
