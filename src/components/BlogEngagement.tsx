import { Heart, MessageCircle } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { useAuth } from "@/components/AuthProvider";
import { useFeedback } from "@/components/FeedbackProvider";
import { UserAvatar } from "@/components/UserAvatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatBlogTime } from "@/lib/blog";
import { addComment, deleteComment, getPostEngagement, toggleLike, type PublicComment } from "@/server/engagement";

export function BlogEngagement({
  slug,
  likesCount,
  commentsCount,
}: {
  slug: string;
  likesCount: number;
  commentsCount: number;
}) {
  const { user, token, ready } = useAuth();
  const feedback = useFeedback();
  const [likes, setLikes] = useState(likesCount);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState<PublicComment[]>([]);
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);
  const loginHref = `/login?redirect=${encodeURIComponent(`/blog/${slug}`)}`;

  useEffect(() => {
    if (!ready) return;
    void getPostEngagement({ data: { slug, token: token || undefined } })
      .then((data) => {
        setLikes(data.likesCount);
        setLiked(data.liked);
        setComments(data.comments);
      })
      .catch(() => {
        // keep loader counts
      });
  }, [ready, slug, token]);

  async function onLike() {
    if (!user || !token) {
      window.location.href = loginHref;
      return;
    }
    try {
      const result = await toggleLike({ data: { token, slug } });
      setLiked(result.liked);
      setLikes(result.likesCount);
      toast.success(result.liked ? "Liked." : "Like removed.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not like this post.");
    }
  }

  async function onComment(event: FormEvent) {
    event.preventDefault();
    if (!user || !token) {
      window.location.href = loginHref;
      return;
    }
    setBusy(true);
    try {
      const comment = await addComment({ data: { token, slug, body } });
      setComments((current) => [...current, comment]);
      setBody("");
      toast.success("Comment posted.", { description: "Thanks for joining the discussion." });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not post the comment.");
    } finally {
      setBusy(false);
    }
  }

  async function onDelete(id: string) {
    if (!token) return;
    const ok = await feedback.confirm({
      title: "Delete this comment?",
      description: "This cannot be undone.",
      action: "Delete",
    });
    if (!ok) return;
    try {
      await deleteComment({ data: { token, id } });
      setComments((current) => current.filter((comment) => comment.id !== id));
      toast.success("Comment deleted.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not delete the comment.");
    }
  }

  return (
    <section className="mt-14 border-t border-border pt-10">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => void onLike()}
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
            liked
              ? "border-primary bg-primary/15 text-primary"
              : "border-border text-muted-foreground hover:border-primary/60 hover:text-foreground"
          }`}
        >
          <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
          {likes} {likes === 1 ? "like" : "likes"}
        </button>
        <span className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground">
          <MessageCircle className="h-4 w-4" />
          {comments.length || commentsCount} {comments.length === 1 ? "comment" : "comments"}
        </span>
      </div>

      <div className="mt-10">
        <h2 className="font-display text-2xl sm:text-3xl">Comments</h2>
        {!user ? (
          <p className="mt-3 text-sm text-muted-foreground">
            <a href={loginHref} className="text-foreground underline-offset-2 hover:underline">
              Log in
            </a>{" "}
            to like and comment.
          </p>
        ) : (
          <form onSubmit={onComment} className="mt-5 space-y-3">
            <Textarea
              value={body}
              onChange={(event) => setBody(event.target.value)}
              placeholder={`Write a comment as ${user.name}`}
              className="min-h-28"
              required
            />
            <Button type="submit" disabled={busy}>
              {busy ? "Posting…" : "Post comment"}
            </Button>
          </form>
        )}

        <div className="mt-8 space-y-4">
          {comments.length === 0 ? (
            <p className="text-sm text-muted-foreground">No comments yet. Start the discussion.</p>
          ) : (
            comments.map((comment) => (
              <article key={comment.id} className="rounded-lg border border-border bg-card p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <UserAvatar name={comment.authorName} />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{comment.authorName}</p>
                      <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                        {formatBlogTime(comment.createdAt)}
                      </p>
                    </div>
                  </div>
                  {comment.mine ? (
                    <button
                      type="button"
                      className="text-xs text-destructive hover:underline"
                      onClick={() => void onDelete(comment.id)}
                    >
                      Delete
                    </button>
                  ) : null}
                </div>
                <p className="mt-3 break-words whitespace-pre-wrap leading-relaxed text-muted-foreground">{comment.body}</p>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
