import { useState, type FormEvent } from "react";
import { useFeedback } from "@/components/FeedbackProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QUERY_TOPICS, type QueryTopic } from "@/lib/blog";
import { api } from "@/lib/api-client";

export function ContactForm() {
  const feedback = useFeedback();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState<QueryTopic>("Job opportunity");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    try {
      await api.submitContact({ name, email, phone, subject, message, website });
      setName("");
      setEmail("");
      setPhone("");
      setSubject("Job opportunity");
      setMessage("");
      await feedback.success({
        title: "Message sent",
        description: "Thanks. I’ll get back within one business day.",
        action: "OK",
      });
    } catch (error) {
      const text = error instanceof Error ? error.message : "Could not send the message.";
      feedback.error("Could not send the message", text.replace(/^\[.*?\]\s*/, "").slice(0, 180));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="relative space-y-5 overflow-hidden rounded-lg border border-border bg-card p-4 sm:p-6 md:p-8">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-primary mb-2">Write to me</p>
        <h2 className="font-display text-2xl sm:text-3xl">Send a message</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Jobs, collaborations, or a quick question — this lands in my inbox.
        </p>
      </div>

      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
          />
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="contact-name">Name</Label>
          <Input
            id="contact-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-email">Email</Label>
          <Input
            id="contact-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@company.com"
            required
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="contact-phone">Phone (optional)</Label>
          <Input
            id="contact-phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="+91 …"
          />
        </div>
        <div className="space-y-2">
          <Label>Topic</Label>
          <Select value={subject} onValueChange={(value) => setSubject(value as QueryTopic)}>
            <SelectTrigger>
              <SelectValue placeholder="What is this about?" />
            </SelectTrigger>
            <SelectContent>
              {QUERY_TOPICS.map((topic) => (
                <SelectItem key={topic} value={topic}>
                  {topic}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Tell me about the role, project, or question."
          className="min-h-40"
          required
        />
      </div>

      <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
        {submitting ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
