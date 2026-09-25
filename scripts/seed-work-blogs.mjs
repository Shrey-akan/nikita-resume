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
    slug: "shipping-banknote-ai-one-react-native-codebase",
    title: "Shipping Banknote AI on one React Native codebase",
    excerpt:
      "How we took an AI banknote identifier to Android and iOS without splitting the product into two apps — and what actually broke in production.",
    isBlogOfTheDay: true,
    publishedAt: new Date("2026-08-18T10:00:00.000Z"),
    views: 42,
    body: `The brief was simple on paper: one consumer app that photographs a banknote, identifies it, and shows country, denomination, rarity, and history. The constraint was not. We needed Android and iOS, store billing, push, a live catalogue, and a team that could keep shipping after the first release.

## The problem

A native split would have doubled every feature. Camera crop, model output, collections, marketplace, subscriptions, and expert evaluation all had to stay in lockstep. We also could not wait for two store reviews every time the identification flow changed.

## What I chose

We built Banknote AI as a single React Native / TypeScript app.

- Camera capture and document crop on one identification pipeline.
- Platform billing behind a thin adapter: Google Play Billing on Android, StoreKit on iOS.
- Push through FCM and APNs, same in-app events.
- Node.js APIs, Firebase Auth, Firestore, Cloud Storage, and AWS for the parts that had to live off-device.

The hard part was not “can React Native do this”. It was keeping store-specific behaviour out of the identification core so a model or catalogue change did not become two tickets.

## What broke, and how we resolved it

Billing was the first real fire. A successful purchase on one store did not mean the client and server agreed on entitlements. We moved “has access” to the backend, verified receipts server-side, and treated the store SDK as a payment method, not the source of truth.

The second was identification quality in the wild. Indoor light, cropped corners, worn notes. We tightened the crop step before inference and logged identification success into Firebase so we could see failure modes instead of guessing from store reviews.

## Result

Banknote AI is live on Google Play and the App Store: 40,000+ downloads, 7,000+ daily active users, 4.3+ rating, and a catalogue of 25,000+ notes. The same codebase is what let us keep iterating after launch instead of maintaining two products.`,
  },
  {
    slug: "white-label-experts-platform-without-forking-every-app",
    title: "A white-label Experts platform — without forking every app",
    excerpt:
      "Coinzy and Banknote AI both needed expert evaluation. Forking the stack would have frozen us. Here is how a shared Node.js platform with branded dashboards solved it.",
    isBlogOfTheDay: false,
    publishedAt: new Date("2026-07-02T10:00:00.000Z"),
    views: 31,
    body: `Once Banknote AI had traction, Coinzy needed the same expert loop: a collector pays credits, an expert reviews media, a structured report comes back. The naive path was copy the service, change the logo, ship. That path does not survive a third product.

## The problem

Each app wanted its own admin console, expert workspace, and notifications. The lifecycle was identical: purchase credits, allocate a request, acceptance window, report, PDF, refunds. If we forked, every workflow bug would be fixed twice, then three times.

## What I designed

A white-label Experts platform in Node.js and Express.

- MongoDB for requests, experts, and reports.
- Redis for short-lived queue state.
- Socket.IO for live queue updates.
- AWS S3 for media and generated PDFs.
- Branding and copy through configuration, not code forks.
- One admin console and one expert workspace, deployed per product.

Mobile teams integrate the same APIs. They do not own the evaluation engine.

## What we had to resolve

Allocation was the painful bit. Credits, timeouts, and “who has this request” raced under concurrent experts. We made assignment an atomic step with an acceptance window, and pushed status over the socket so the expert UI did not poll itself into conflicts.

The other issue was rollout. A shared platform is useless if every new app still needs a core engineer. We documented the integration path — credits, media upload, status, report — so Android and React Native teams could attach a new product without forking services.

## Result

Coinzy and Banknote AI run on the same engine, with their own dashboards. Expert evaluation, credits, and reports stay one system. The next identification product does not start from zero.`,
  },
  {
    slug: "firebase-to-bigquery-product-analytics-we-could-trust",
    title: "Firebase events were not a product dashboard. Here’s what we built.",
    excerpt:
      "We had plenty of events and no shared picture of DAU, scan success, or paywall conversion. The fix was a Firebase → BigQuery pipeline and an internal React dashboard.",
    isBlogOfTheDay: false,
    publishedAt: new Date("2026-05-21T10:00:00.000Z"),
    views: 27,
    body: `Ask three people how Banknote was doing and you got three answers: store console, a Firebase chart, a spreadsheet. None of them matched. We needed one place for DAU, identification success, quotas, and whether the paywall actually converted.

## The problem

Firebase is fine for instrumentation. It is not a product room. Funnel questions — install to first scan, D1 / D4 / D7, cohort LTV — died in event dumps. Coinzy and Banknote also needed comparison, not two separate exports.

## What I built

An internal analytics app:

- Daily aggregation from Firebase into BigQuery.
- Node.js API in front of BigQuery, with Redis for hot KPIs.
- MongoDB for cohort LTV that did not belong in a raw event table.
- React UI: ten KPIs, funnels, health, event catalogue, a SQL editor, 30 / 90 / 180-day LTV.
- Role-based access so a person sees the apps they own.
- Docker in production.

## How we resolved the messy data

The first dashboard was wrong. Event names drifted. Some scans never fired “success”. Paywall views and purchases lived on different properties.

We published an event catalogue and treated it as a contract. The pipeline mapped old names forward. Identification success became a defined event, not a guess from session length. That is what made funnels comparable week to week.

## Result

Product and engineering now look at the same ten KPIs for Banknote and Coinzy. When identification success or paywall conversion moves, we see it the next day — not after a store-review spike.`,
  },
  {
    slug: "java-8-to-17-hospital-reporting-without-stopping-month-end",
    title: "Java 8 to 17 in a hospital reporting system — without stopping month-end",
    excerpt:
      "Afford Plan had to keep producing monthly SOC packs while we moved Java 8 and Hibernate 4 to Java 17 and Hibernate 6. The upgrade was the easy part. The queries were not.",
    isBlogOfTheDay: false,
    publishedAt: new Date("2025-09-14T10:00:00.000Z"),
    views: 19,
    body: `At JCentrix I owned Afford Plan: monthly SOC reporting for hospitals, filtered by date, facility, and department. The runtime was Java 8 and Hibernate 4. Security, library support, and operational risk all said move. Finance still needed month-end on the old stack until the new one was proven.

## The problem

A big-bang cutover would have frozen reporting. Hibernate 6 does not behave like 4. APIs that “just returned a list” started lazy-loading, missing constructors, or timing out on a month of facility data.

## How I approached it

We upgraded in place, behind the same reports.

- Java 8 → 17, Hibernate 4.4 → 6.6, MySQL kept as the source of truth.
- Compatibility layer for APIs the UI already called.
- Query work on the monthly packs: the reports that scanned too much data got explicit fetch plans and tighter filters.
- Role-based access so staff and admins did not share one god login.
- Jenkins and GitHub Actions for CI, Docker on AWS for the new runtime.
- QA on the release train, not a single “migration weekend”.

## What we actually resolved

The failures were not compiler errors. They were month-end queries that looked fine in staging with a week of data. We pulled slow queries from production-shaped datasets, reduced N+1 access in Hibernate, and stopped loading full collections when a report only needed aggregates.

API defects after the bump were treated as product bugs, not “framework noise”: same endpoints, corrected behaviour, regression tests before the next hospital cycle.

## Result

Afford Plan kept shipping monthly SOC modules on Java 17 and Hibernate 6. The upgrade did not take reporting offline, and the large monthly datasets got faster instead of becoming the reason to stay on Java 8.`,
  },
];

console.log("Seed skipped. Add journal posts from the admin studio.");
process.exit(0);

const client = new MongoClient(env.MONGODB_URI, { serverSelectionTimeoutMS: 15000 });
await client.connect();
const db = client.db(env.MONGODB_DB || "nikita_nautya");
const blogs = db.collection("blogs");

const dummySlugs = ["hello-from-the-studio"];

await blogs.deleteMany({ slug: { $in: dummySlugs } });
await blogs.updateMany({ slug: { $nin: posts.map((post) => post.slug) } }, { $set: { isBlogOfTheDay: false } });

const now = new Date();
for (const [index, post] of posts.entries()) {
  await blogs.updateOne(
    { slug: post.slug },
    {
      $set: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        body: post.body,
        coverImage: null,
        coverThumb: null,
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
  console.log(`${index + 1}. ${post.slug}`);
}

const remaining = await blogs.find({}).project({ slug: 1, title: 1, isBlogOfTheDay: 1 }).toArray();
console.log("LIVE", remaining.length);
for (const doc of remaining) {
  console.log("-", doc.slug, doc.isBlogOfTheDay ? "(today)" : "");
}

await client.close();
