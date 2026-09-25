import { Heart, MessageCircle } from "lucide-react";

export function BlogStats({
  likes,
  comments,
  views,
}: {
  likes: number;
  comments: number;
  views: number;
}) {
  return (
    <div className="flex flex-wrap items-center gap-4 text-xs font-mono uppercase tracking-widest text-muted-foreground">
      <span className="inline-flex items-center gap-1.5">
        <Heart className="h-3.5 w-3.5" />
        {likes}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <MessageCircle className="h-3.5 w-3.5" />
        {comments}
      </span>
      <span>{views} reads</span>
    </div>
  );
}
