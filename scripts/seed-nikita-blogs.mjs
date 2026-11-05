import { MongoClient } from "mongodb";
import { readFileSync } from "fs";

const env = Object.fromEntries(
  readFileSync(".env", "utf8")
    .split("\n")
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => {
      const i = line.indexOf("=");
      return [line.slice(0, i), line.slice(i + 1)];
    }),
);

const posts = [
  {
    slug: "designing-the-first-photograph",
    title: "Designing the first photograph",
    excerpt:
      "A UI/UX case study for Banknote: the first session has to teach the photograph before it teaches the account.",
    cover: "/blog/banknote.jpg",
    isBlogOfTheDay: true,
    publishedAt: new Date("2026-11-02T10:00:00.000Z"),
    views: 128,
    body: `Banknote asks a person to point a camera at a bill and understand what they are holding. I owned the UI/UX: research into the first session, the flow, and the high-fidelity UI for mobile and web.

## The problem

A note is not a profile photo. People hold it at an angle, fold a corner, or shoot it on a busy table. If the interface explains the account before it explains the photograph, the first result is the wrong lesson.

## The flow

- Onboarding explains the scan before it asks anyone to sign in.
- The camera offers gallery, capture, and guidance inside the frame.
- The result speaks about a note: what it is, and what to look at next.
- Expert review is a separate surface, written for a bill, not a modal on the camera.

## What I delivered

A PRD and a Figma UI so the same journey holds on mobile and on web. The consumer app is public on Google Play and the App Store.

- [Banknote on Trackzio](https://trackzio.com/apps/banknotes)
- [Google Play](https://play.google.com/store/apps/details?id=com.trackzio.banknote)
- [App Store](https://apps.apple.com/us/app/banknote-identification-ai/id6747063766)`,
  },
  {
    slug: "a-coin-needs-two-photographs",
    title: "A coin needs two photographs",
    excerpt:
      "Coinzy is not Banknote with a new icon. The UI is built around heads, tails, and a result that shows both.",
    cover: "/blog/coinzy.jpg",
    isBlogOfTheDay: false,
    publishedAt: new Date("2026-10-22T10:00:00.000Z"),
    views: 104,
    body: `A coin has two faces. I designed Coinzy as its own product: the journey can rhyme with a note identifier, and the screens cannot be a copy.

## The problem

One portrait is not an identification. People have to photograph one side, crop it, flip the coin, and photograph the other. If the interface treats the second photo as optional, the result is unfinished.

## The flow

- Onboarding explains the two photographs before it asks anyone to sign in.
- The camera guides the first face, then the flip.
- Crop sits between the two captures, so the coin fills the frame.
- The result is written for a coin, with both faces visible.
- Expert review uses those same photographs.

## What I delivered

Flows and high-fidelity UI in Figma, specified so a team can build the same journey on mobile and web. The consumer app is public.

- [Coinzy on Trackzio](https://trackzio.com/apps/coinzy)
- [Google Play](https://play.google.com/store/apps/details?id=com.coinzy.trackzio)
- [App Store](https://apps.apple.com/us/app/coinzy-coin-ai-identification/id6752857760)`,
  },
  {
    slug: "expert-review-is-its-own-screen",
    title: "Expert review is its own screen",
    excerpt:
      "After the camera, some identifications need a person. The review is a product surface, written for the object in the frame.",
    cover: "/apps/banknotes-shot.png",
    isBlogOfTheDay: false,
    publishedAt: new Date("2026-10-14T10:00:00.000Z"),
    views: 91,
    body: `Identification does not always end on the model. I designed the handoff to a person as its own screen, once per product.

## The problem

A shared form looks efficient and reads as unfinished. A bill, a coin, an antique, and a mineral are not the same review. Leftover questions from another product make the expert scroll past work that is not theirs.

## What changes

**Banknote** reviews a bill.

**Coinzy** reviews a coin, and both photographs belong in the review.

**Antiqzy** reviews an object, not a piece of currency.

**Rockzy** reviews a specimen.

## Why the split is a UI decision

The navigation can rhyme. The report cannot. Each review is written for the thing in front of the expert, so the screen has one job.

- [Banknote](https://trackzio.com/apps/banknotes)
- [Coinzy](https://trackzio.com/apps/coinzy)
- [Antiqzy](https://trackzio.com/apps/antiqzy)
- [Rockzy](https://trackzio.com/apps/rockzy)`,
  },
  {
    slug: "one-pattern-eight-products",
    title: "One pattern, eight products",
    excerpt:
      "Camera, result, and a human review. The pattern holds. The content changes with the object in the frame.",
    cover: "/apps/plantzy-logo.png",
    isBlogOfTheDay: false,
    publishedAt: new Date("2026-10-06T10:00:00.000Z"),
    views: 86,
    body: `I design UI and flows for a family of consumer apps. The pattern is camera, result, and a human review when the model should not be the last word. The content of that pattern changes with the object.

## What each result has to answer

- **Coinzy** answers what the coin is, with both faces, then an expert review.
- **Banknote** answers what the note is, including what to look for on the bill.
- **Habiteazy** is the habit product: habits, progress, and reminders.
- **Insecto** answers what the insect is and whether it is a problem.
- **Rockzy** answers what the mineral is, and what the person should know about it.
- **Plantzy** answers what the plant is and how to care for it.
- **Antiqzy** answers what the object is.
- **Shroomzy** answers what the mushroom is and whether it is toxic.

## What stays the same

The first session teaches the photograph. The result is specific. Expert review, when it exists, is a deeper shade of the same product, not a second brand.

- [Coinzy](https://trackzio.com/apps/coinzy)
- [Insecto](https://trackzio.com/apps/insecto)
- [Plantzy](https://trackzio.com/apps/plantzy)
- [Shroomzy](https://trackzio.com/apps/shroomzy)`,
  },
  {
    slug: "the-next-action-has-to-be-obvious",
    title: "The next action has to be obvious",
    excerpt:
      "A UI/UX audit of India’s 112 journey, then a redesign of SOS, location, and response for people who are not browsing.",
    cover: "/blog/emergency.jpg",
    isBlogOfTheDay: false,
    publishedAt: new Date("2026-09-24T10:00:00.000Z"),
    views: 117,
    body: `Emergency software fails in a specific way. The screen is not ugly. The next action is late. I audited India’s 112 journey and redesigned the flows people use when they are not exploring an app.

## The audit

Ten or more screens, across onboarding, the emergency trigger, alerts, and the states after someone asks for help. That set was about 90% of the core journey.

Twelve usability issues were hiding the next action. The redesign resolved 65% of the high-friction interactions.

## What changed

Six primary flows were redrawn: the SOS trigger, location confirmation, and response navigation. Confusion in those paths dropped by about 35%.

The delivery was an interactive prototype of 50 or more screens, so a full scenario could be walked without another round of still frames. Review settled into two structured passes, and rework time fell by about 30%.

## What I kept for later work

A camera screen and an expert handoff fail the same way when the correct action is present and hard to see. On 112 that action is “send help.” On a coin identifier it is “flip the coin.” The design job is to make that action the only thing the screen is doing.`,
  },
  {
    slug: "a-social-app-as-a-system",
    title: "A social app as a system",
    excerpt:
      "Genuinest, specified in Figma as a system: onboarding, feed, reels, profile, messaging, and settings.",
    cover: null,
    isBlogOfTheDay: false,
    publishedAt: new Date("2026-09-16T10:00:00.000Z"),
    views: 79,
    body: `Genuinest is an iOS social product. I led UI/UX from research through a reusable system, so the team was extending components rather than redrawing screens.

## The problem

A social app fails as a pile of screens. Onboarding, the feed, reels, profile, messaging, and settings have to share type, spacing, and states, or the product feels like five apps.

## The process

I compared 5+ social products before the system was drawn, looking at how people discover a post, leave a conversation, and find their way back.

Wireframes came before high fidelity. The prototype had to carry a full session: arrive, browse, watch, message, and change a setting.

## What I delivered

50+ high-fidelity screens and a Figma component set the team can extend. The system covers onboarding, home feed, reels, profile, messaging, and settings.`,
  },
  {
    slug: "a-listening-session-not-a-screen",
    title: "A listening session, not a screen",
    excerpt:
      "Home, discovery, playlists, and the player, drawn as one component set for the time someone is actually listening.",
    cover: "/blog/music.jpg",
    isBlogOfTheDay: false,
    publishedAt: new Date("2026-09-08T10:00:00.000Z"),
    views: 73,
    body: `The music prototype is a listening session. Home, discovery, playlists, and the player have to feel like one place, because people move between them without deciding to “open a new screen.”

## The problem

Seven or more screens were competing. Genre, playlist, and the player each had their own hierarchy, so the session broke every time the view changed.

## What changed

Eight sections were restructured, with section clarity up about 40%. The set includes 12 genre cards, 30+ components, and 10+ micro-interactions for play, pause, and moving through a queue.

## What I delivered

A Figma file for the whole session, plus a frame of the selected screens, so the component set and the flow can be reviewed together.`,
  },
  {
    slug: "camera-guidance-is-the-interface",
    title: "Camera guidance is the interface",
    excerpt:
      "On an identification product, the frame is the UI. Guidance, crop, and the next photograph do more work than the chrome around them.",
    cover: "/apps/coinzy-shot.png",
    isBlogOfTheDay: false,
    publishedAt: new Date("2026-08-28T10:00:00.000Z"),
    views: 68,
    body: `For Banknote and Coinzy, the camera is not a utility behind a button. It is the product. I designed the guidance as the interface.

## What the frame has to do

People need to know what to include, when the crop is good enough, and what the next photograph is. That instruction belongs inside the frame: a helper line, a crop, and a clear next step.

Gallery and capture sit with that guidance. They do not replace it.

## What changes with the object

A bill is one photograph of a rectangle that may be folded. A coin is two photographs and a flip. The chrome can rhyme. The instruction in the frame cannot, or people follow the wrong lesson.

## What I specify

The empty state, the aiming state, a good crop, a bad crop, and the handoff to the result. If those states are missing, the high-fidelity home screen does not matter.`,
  },
  {
    slug: "colour-stays-in-the-product",
    title: "Colour stays in the product",
    excerpt:
      "Expert review should feel more trusted without becoming a second brand. A deeper shade does that. A new hue does not.",
    cover: "/apps/antiqzy-logo.png",
    isBlogOfTheDay: false,
    publishedAt: new Date("2026-08-18T10:00:00.000Z"),
    views: 54,
    body: `A family of apps can share a way of working and still look like themselves. I use colour to mark a workflow people return to, not to invent a new product inside the old one.

## Give a feature its own shade when

- It is a new workflow, or a place people return to.
- It needs to be recognised quickly, or it should feel more trusted.
- A darker shade fits review. A lighter shade fits a guide.

## Keep the primary colour when

- The screen is a dialog, an empty state, or a small change.
- The feature continues the same flow.
- The shade would otherwise repaint the global navigation.

The shade belongs on that feature’s header, icon, and buttons. Expert review stays in the product’s colour family.`,
  },
  {
    slug: "when-the-question-is-risk",
    title: "When the question is risk, not value",
    excerpt:
      "Insecto is not an appraisal. The person is usually asking whether something in the house or the garden is a problem.",
    cover: "/apps/insecto-logo.png",
    isBlogOfTheDay: false,
    publishedAt: new Date("2026-08-08T10:00:00.000Z"),
    views: 49,
    body: `Most identification products answer “what is this worth looking up?” Insecto often answers a different question: is this a problem?

## The problem

Someone found an insect at home, in a garden, or they want the species confirmed. A value-style report, with the language of an appraisal, answers a question they did not ask.

## The flows

I designed three paths.

- Safety, for a risk at home.
- The garden, for a plant or crop the person is trying to protect.
- Species confirmation, when the name is the point.

The result only fills the path that applies. Expert review, when a person takes over, stays in Insecto’s colour. It does not become a second brand.

- [Insecto](https://trackzio.com/apps/insecto)`,
  },
];

const client = new MongoClient(env.MONGODB_URI, { serverSelectionTimeoutMS: 20000 });
await client.connect();
const db = client.db(env.MONGODB_DB || "nikita_nautya");
const blogs = db.collection("blogs");
const now = new Date();
const keep = posts.map((post) => post.slug);

const stale = await blogs.find({ slug: { $nin: keep } }).project({ _id: 1, slug: 1 }).toArray();
const staleIds = stale.map((doc) => doc._id);
if (staleIds.length) {
  await db.collection("comments").deleteMany({ blogId: { $in: staleIds } });
  await db.collection("likes").deleteMany({ blogId: { $in: staleIds } });
  await blogs.deleteMany({ _id: { $in: staleIds } });
}
console.log("removed", stale.map((doc) => doc.slug).join(", ") || "none");

for (const post of posts) {
  await blogs.updateOne(
    { slug: post.slug },
    {
      $set: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        body: post.body,
        coverImage: post.cover,
        coverThumb: post.cover,
        published: true,
        status: "approved",
        isBlogOfTheDay: post.isBlogOfTheDay,
        authorId: null,
        authorName: "Nikita Nautiyal",
        authorEmail: "nikdesigncraft@gmail.com",
        updatedAt: now,
        publishedAt: post.publishedAt,
      },
      $setOnInsert: {
        views: post.views,
        likesCount: 0,
        commentsCount: 0,
        createdAt: post.publishedAt,
      },
    },
    { upsert: true },
  );
  console.log(post.slug);
}

console.log("approved", await blogs.countDocuments({ status: "approved" }));
await client.close();
