import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { compressImage, makeThumb } from "@/lib/blog";
import { toast } from "sonner";

export type BlogFormState = {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  coverImage: string | null;
  coverThumb: string | null;
};

export const emptyBlogForm: BlogFormState = {
  id: "",
  title: "",
  excerpt: "",
  body: "",
  coverImage: null,
  coverThumb: null,
};

export function BlogEditorFields({
  form,
  setForm,
}: {
  form: BlogFormState;
  setForm: (update: (current: BlogFormState) => BlogFormState) => void;
}) {
  async function onImage(file: File | undefined) {
    if (!file) return;
    try {
      const coverImage = await compressImage(file);
      const coverThumb = await makeThumb(coverImage);
      setForm((current) => ({ ...current, coverImage, coverThumb }));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not use that image.");
    }
  }

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="post-title">Title</Label>
        <Input
          id="post-title"
          value={form.title}
          onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
          placeholder="Today’s post"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="post-excerpt">Short summary</Label>
        <Textarea
          id="post-excerpt"
          value={form.excerpt}
          onChange={(event) => setForm((current) => ({ ...current, excerpt: event.target.value }))}
          className="min-h-24"
          placeholder="One or two lines that appear on the blog list."
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="post-cover">Cover image</Label>
        <Input
          id="post-cover"
          type="file"
          accept="image/*"
          onChange={(event) => void onImage(event.target.files?.[0])}
        />
        {form.coverImage ? (
          <div>
            <img
              src={form.coverImage}
              alt=""
              className="mt-2 max-h-56 w-full rounded-md object-cover border border-border"
            />
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="mt-2"
              onClick={() => setForm((current) => ({ ...current, coverImage: null, coverThumb: null }))}
            >
              Remove image
            </Button>
          </div>
        ) : null}
      </div>
      <div className="space-y-2">
        <Label htmlFor="post-body">Post</Label>
        <Textarea
          id="post-body"
          value={form.body}
          onChange={(event) => setForm((current) => ({ ...current, body: event.target.value }))}
          className="min-h-80 font-body text-base leading-relaxed"
          placeholder={"Write the full post here.\n\nBlank line = new paragraph.\n## Heading\n**bold**  *italic*\n- list item"}
          required
        />
      </div>
    </>
  );
}
