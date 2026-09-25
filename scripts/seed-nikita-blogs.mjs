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
    slug: "banknote-camera-onboarding-and-expert",
    title: "Designing Banknote AI: onboarding, free scan, and expert",
    excerpt:
      "The PRD and Figma UI for Banknote Identification AI — onboarding, a free scan, bottom navigation, the camera flow, and expert evaluation on mobile and web.",
    cover: "/blog/banknote.jpg",
    isBlogOfTheDay: true,
    publishedAt: new Date("2026-09-20T10:00:00.000Z"),
    views: 86,
    body: `Banknote Identification AI asks a person to point a camera at a note and understand what they are holding. The design work was a PRD and a Figma UI for the experiments that sit around that moment.

## The journeys

- Onboarding that explains the scan before it asks for an account.
- A free scan so the first identification is not locked behind a paywall.
- Bottom navigation that keeps scan, collection, and expert one tap apart.
- A camera flow with gallery, capture, and guidance in the frame.
- Expert evaluation when the scan is not enough and a person should review the note.

The same structure was designed for the mobile app and the web app, so the journey does not change when the surface does.

## See the product

- [Banknote on Trackzio](https://trackzio.com/apps/banknotes)
- [App Store](https://apps.apple.com/us/app/banknote-identification-ai/id6747063766)
- [Google Play](https://play.google.com/store/apps/details?id=com.trackzio.banknote)

The cover is a live App Store screenshot of the camera screen.`,
  },
  {
    slug: "coinzy-same-flows-different-object",
    title: "Coinzy uses the same flows, built for a coin",
    excerpt:
      "Onboarding, free scan, bottom navigation, camera, and expert — redesigned for Coinzy on mobile and web, with heads and tails in the capture step.",
    cover: "/blog/coinzy.jpg",
    isBlogOfTheDay: false,
    publishedAt: new Date("2026-09-12T10:00:00.000Z"),
    views: 64,
    body: `Coinzy identifies coins the way Banknote identifies notes. The product decision was to keep the journey shared and change only what the object demands.

## What stayed the same

Onboarding, the free scan, bottom navigation, the camera flow, and expert evaluation. Both apps, and both the mobile build and the web app, follow that sequence.

## What changed

A coin has two faces. The camera step has to show heads and tails, and the framing has to stay steady while someone flips the coin. Expert review then picks up the cases a scan cannot settle.

## See the product

- [Coinzy on Trackzio](https://trackzio.com/apps/coinzy)
- [App Store](https://apps.apple.com/us/app/coinzy-coin-ai-identification/id6752857760)
- [Google Play](https://play.google.com/store/apps/details?id=com.coinzy.trackzio)

The cover is a live App Store screenshot of the Coinzy camera, with heads and tails in frame.`,
  },
  {
    slug: "112-emergency-clarity-under-stress",
    title: "112 Emergency: clarity when people are in a hurry",
    excerpt:
      "A product audit of India’s 112 app across onboarding, the emergency trigger, alerts, and what happens after someone asks for help.",
    cover: "/blog/emergency.jpg",
    isBlogOfTheDay: false,
    publishedAt: new Date("2026-08-28T10:00:00.000Z"),
    views: 71,
    body: `Emergency apps fail when the next step is hard to see. The 112 case study was a product audit of the government journey in India, then a redesign of the flows people actually use.

## What the audit covered

Ten or more screens across onboarding, the emergency trigger, alerts, and post-action states. That set covered about 90% of the core journey.

Twelve usability issues were slowing people down or hiding the next action. The redesign resolved 65% of the high-friction interactions.

## The flows that changed

Six primary flows were redrawn: the SOS trigger, location confirmation, and response navigation. Flow clarity improved, and confusion in those paths dropped by about 35%.

The delivery was an interactive prototype of 50+ screens, so a full scenario could be walked without another round of static frames. Reviews settled into two structured passes, and rework time fell by about 30%.`,
  },
  {
    slug: "music-app-from-discovery-to-playback",
    title: "A music app that starts with discovery, not a library",
    excerpt:
      "Home, discovery, playlists, and the player — with genre cards, a component library, and micro-interactions that carry someone into playback.",
    cover: "/blog/music.jpg",
    isBlogOfTheDay: false,
    publishedAt: new Date("2026-08-04T10:00:00.000Z"),
    views: 48,
    body: `The music prototype covers home, discovery, playlists, and the player. The problem was not a missing screen. It was that the first useful action was hard to find.

## Structure

Content hierarchy was rebuilt across eight major sections. Clarity and discoverability improved by about 40%.

Twelve genre-based discovery cards made the first tap more relevant, by about 35% in the tests we ran against the earlier layout.

## System

Thirty or more reusable components kept the screens consistent. Ten or more micro-interactions carried the flow from a card into playback, so the prototype behaved like the app instead of a stack of still frames.`,
  },
  {
    slug: "smoothie-carousel-faster-decisions",
    title: "A smoothie carousel built to make the choice faster",
    excerpt:
      "Four variants, six layout studies, and twelve interaction states in one reusable carousel.",
    cover: "/blog/smoothie.jpg",
    isBlogOfTheDay: false,
    publishedAt: new Date("2026-07-18T10:00:00.000Z"),
    views: 39,
    body: `The brief was a single carousel for four smoothie variants. The question was which layout made the choice obvious without sending someone to another screen.

## What was explored

Six layout variations, looking at hierarchy and how someone moves between variants. Twelve or more interaction states covered selection, transitions, and feedback, so the prototype did not jump from one still to the next.

Decision friction dropped by about 30%. The carousel was built as a reusable component, not a one-off screen, and the finished prototype improved flow efficiency by about 25%.`,
  },
];

const client = new MongoClient(env.MONGODB_URI, { serverSelectionTimeoutMS: 20000 });
await client.connect();
const db = client.db(env.MONGODB_DB || "nikita_nautya");
const blogs = db.collection("blogs");
const now = new Date();

await blogs.updateMany(
  { slug: { $nin: posts.map((post) => post.slug) } },
  { $set: { isBlogOfTheDay: false } },
);

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

console.log("db", env.MONGODB_DB);
console.log("count", await blogs.countDocuments({ status: "approved" }));
await client.close();
