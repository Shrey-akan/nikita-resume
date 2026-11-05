import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, "..", "public", "Nikita-Nautiyal-Resume.pdf");
const sys = "/System/Library/Fonts/Supplemental";

const ink = rgb(0.16, 0.13, 0.1);
const muted = rgb(0.33, 0.28, 0.24);
const orange = rgb(0.72, 0.32, 0.08);
const cream = rgb(0.98, 0.965, 0.94);
const rule = rgb(0.86, 0.78, 0.7);

const pageWidth = 595.28;
const pageHeight = 841.89;
const left = 48;
const right = 48;
const maxWidth = pageWidth - left - right;

async function build() {
  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);
  doc.setTitle("Nikita Nautiyal - UI/UX Designer");
  doc.setAuthor("Nikita Nautiyal");
  doc.setSubject("UI/UX Designer resume. AI product design, Figma, user research, mobile and web.");
  doc.setKeywords([
    "UI/UX Designer",
    "User Experience",
    "User Interface",
    "Figma",
    "User Research",
    "Wireframing",
    "Prototyping",
    "Design Systems",
    "AI Product Design",
    "Interaction Design",
    "Trackzio",
    "Banknote",
    "Coinzy",
  ]);
  doc.setLanguage("en-US");

  const regular = await doc.embedFont(
    readFileSync(existsSync(join(sys, "Arial.ttf")) ? join(sys, "Arial.ttf") : join(sys, "Arial Unicode.ttf")),
  );
  const bold = await doc.embedFont(readFileSync(join(sys, "Arial Bold.ttf")));
  const page = doc.addPage([pageWidth, pageHeight]);
  page.drawRectangle({ x: 0, y: 0, width: pageWidth, height: pageHeight, color: cream });

  let y = pageHeight - 46;

  const wrap = (text, font, size) => {
    const words = text.split(" ");
    const lines = [];
    let line = "";
    for (const word of words) {
      const next = line ? `${line} ${word}` : word;
      if (font.widthOfTextAtSize(next, size) > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = next;
      }
    }
    if (line) lines.push(line);
    return lines;
  };

  const text = (value, size, font, color = ink, gap = 3) => {
    for (const line of wrap(value, font, size)) {
      page.drawText(line, { x: left, y, size, font, color });
      y -= size + gap;
    }
  };

  const heading = (label) => {
    y -= 7;
    page.drawText(label, { x: left, y, size: 11, font: bold, color: orange });
    y -= 4;
    page.drawRectangle({ x: left, y, width: maxWidth, height: 0.7, color: rule });
    y -= 11;
  };

  const bullet = (value) => {
    const size = 10;
    const indent = 12;
    const lines = [];
    const words = value.split(" ");
    let line = "";
    const width = maxWidth - indent;
    for (const word of words) {
      const next = line ? `${line} ${word}` : word;
      if (regular.widthOfTextAtSize(next, size) > width && line) {
        lines.push(line);
        line = word;
      } else {
        line = next;
      }
    }
    if (line) lines.push(line);
    lines.forEach((line, index) => {
      if (index === 0) page.drawText("-", { x: left, y, size, font: regular, color: ink });
      page.drawText(line, { x: left + indent, y, size, font: regular, color: ink });
      y -= size + 2;
    });
  };

  text("Nikita Nautiyal", 20, bold, ink, 4);
  text("UI/UX Designer, Trackzio", 12, regular, orange, 6);
  text("Email: nikdesigncraft@gmail.com    Phone: +91 89687 52908    Location: India", 10, regular, muted, 2);

  heading("PROFESSIONAL SUMMARY");
  text(
    "UI/UX designer for Trackzio. Banknote and Coinzy each have a camera flow, a result, and an expert review on mobile and web. I also built a few React web apps for trackzio.com, with CRUD and basic OAuth. The same design practice covers Antiqzy, Rockzy, Plantzy, Insecto, Shroomzy, and Habiteazy.",
    10,
    regular,
    ink,
    2,
  );

  heading("PROFESSIONAL EXPERIENCE");
  text("UI/UX Designer, Trackzio, India", 11, bold, ink, 3);
  text("Banknote - AI banknote identification, mobile and web", 10, bold, ink, 3);
  bullet("Problem: a person has to understand a bill from one photograph.");
  bullet("Designed onboarding, camera guidance, the result, and a separate expert review. Delivered a PRD and Figma UI for mobile and web.");
  bullet("The consumer app is public on Google Play and the App Store.");

  y -= 2;
  text("Coinzy - AI coin identification, mobile and web", 10, bold, ink, 3);
  bullet("Problem: a coin has two faces, so one photograph is not an identification.");
  bullet("Designed heads, crop, tails, the result, and an expert review that keeps both photographs.");
  bullet("Delivered a PRD and Figma UI for mobile and web. The consumer app is public on Google Play and the App Store.");

  y -= 2;
  text("Other Trackzio products", 10, bold, ink, 3);
  bullet("Designed UI and flows for Antiqzy, Rockzy, Plantzy, Insecto, Shroomzy, and Habiteazy. Camera, result, and expert review change with the object.");
  bullet("Built a few web apps in React for trackzio.com. Those apps use CRUD and basic OAuth sign-in.");

  heading("SKILLS");
  text(
    "User experience (UX), user interface (UI), React, CRUD, basic OAuth, AI product design, Figma, PRD, wireframing, prototyping, design systems, user research, interaction design, HTML, CSS.",
    10,
    regular,
    ink,
    2,
  );

  heading("PROJECTS");
  text("112 Emergency, India - Product audit and UX redesign", 11, bold, ink, 4);
  bullet("Audited 10+ screens across onboarding, the emergency trigger, alerts, and post-action states, covering about 90% of the core journey.");
  bullet("Found 12 usability issues. Redesigned 6 primary flows: SOS trigger, location confirmation, and response navigation.");
  bullet("Delivered an interactive prototype of 50+ screens. Confusion in the redesigned paths dropped by about 35%, and rework time fell by about 30%.");

  y -= 2;
  text("Genuinest, iOS - UI/UX design", 11, bold, ink, 3);
  bullet("Designed 50+ high-fidelity screens, including onboarding, home feed, reels, profile, messaging, and settings.");
  bullet("Ran user research and competitive analysis across 5+ social platforms.");
  bullet("Built wireframes, interactive prototypes, and a reusable design system in Figma.");

  heading("EDUCATION");
  text("Bachelor of Computer Science and Engineering", 11, bold, ink, 2);
  text("Chandigarh University - CGPA 7.6/10", 10, regular, muted, 5);
  text("Higher Secondary - 91%, top 10%", 11, bold, ink, 2);
  text("Saint Dominic Savio College", 10, regular, muted, 5);
  text("Secondary - 94%, top 5%", 11, bold, ink, 2);
  text("Saint Dominic Savio College", 10, regular, muted, 2);

  heading("CERTIFICATIONS");
  bullet("Foundations of User Experience (UX) Design, Google");
  bullet("Build Wireframes and Low-Fidelity Prototypes, Google");

  if (y < 36) {
    throw new Error(`Resume overflowed the page. Remaining y=${y}`);
  }

  writeFileSync(outPath, await doc.save());
  console.log("wrote", outPath, "y", Math.round(y));
}

build();
