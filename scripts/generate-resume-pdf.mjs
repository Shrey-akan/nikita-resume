import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, "..", "public", "Nikita-Nautiyal-Resume.pdf");
const sys = "/System/Library/Fonts/Supplemental";

const ink = rgb(0.16, 0.1, 0.14);
const rose = rgb(0.62, 0.22, 0.28);
const slate = rgb(0.32, 0.28, 0.3);

async function build() {
  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);
  doc.setTitle("Nikita Nautiyal - UI/UX Designer");
  doc.setAuthor("Nikita Nautiyal");
  const body = await doc.embedFont(readFileSync(existsSync(join(sys, "Arial.ttf")) ? join(sys, "Arial.ttf") : join(sys, "Arial Unicode.ttf")));
  const bold = await doc.embedFont(readFileSync(join(sys, "Arial Bold.ttf")));
  const page = doc.addPage([595.28, 841.89]);
  let y = 800;
  const draw = (text, size, font, color = ink) => {
    page.drawText(text, { x: 48, y, size, font, color });
    y -= size + 8;
  };
  draw("NIKITA NAUTIYAL", 22, bold, rose);
  draw("UI/UX Designer", 12, body, slate);
  draw("nikdesigncraft@gmail.com  |  +91 89687 52908", 10, body, slate);
  y -= 8;
  draw("SUMMARY", 11, bold, rose);
  const summary = [
    "UI/UX designer experienced in user research, structured problem-solving, and",
    "intuitive digital products. Translates user needs into clear flows, scalable systems,",
    "and high-fidelity prototypes through iterative testing.",
  ];
  for (const line of summary) draw(line, 10, body);
  y -= 6;
  draw("EXPERIENCE", 11, bold, rose);
  draw("UI/UX — Banknote AI & Coinzy (mobile and web)", 11, bold);
  const trackzio = [
    "PRD and Figma UI for onboarding, free scan, bottom nav, camera flow, and expert.",
    "Same journeys for Banknote and Coinzy, on the mobile apps and the web app.",
    "Banknote: trackzio.com/apps/banknotes",
    "Coinzy: trackzio.com/apps/coinzy",
  ];
  for (const line of trackzio) draw(line, 10, body);
  y -= 4;
  draw("UI/UX Designer — Genuinest (iOS)", 11, bold);
  const exp = [
    "Designed 50+ high-fidelity screens: onboarding, feed, reels, profile, messaging, settings.",
    "Led research, wireframes, high-fidelity UI, and interaction design.",
    "Competitive analysis across 5+ social platforms. Built a reusable Figma design system.",
  ];
  for (const line of exp) draw(line, 10, body);
  y -= 6;
  draw("SELECTED WORK", 11, bold, rose);
  const work = [
    "112 Emergency (India): audited 10+ screens, found 12 usability issues, redesigned 6 flows.",
    "Music app: 7+ screens, 30+ components, 10+ micro-interactions from discovery to playback.",
    "Smoothie carousel: 6 layouts, 12+ interaction states, reusable decision-making module.",
  ];
  for (const line of work) draw(line, 10, body);
  y -= 6;
  draw("SKILLS", 11, bold, rose);
  draw("Figma, Framer, Illustrator, Photoshop, HTML, CSS, research, flows, prototyping.", 10, body);
  y -= 6;
  draw("EDUCATION", 11, bold, rose);
  draw("Bachelor of CSE, Chandigarh University — CGPA 7.6 / 10", 10, body);
  draw("Class XII, Saint Dominic Savio College — 91%, top 10%", 10, body);
  draw("Class X, Saint Dominic Savio College — 94%, top 5%", 10, body);
  y -= 6;
  draw("CERTIFICATIONS", 11, bold, rose);
  draw("Foundations of User Experience (UX) Design — Google", 10, body);
  draw("Build Wireframes and Low-Fidelity Prototypes — Google", 10, body);
  writeFileSync(outPath, await doc.save());
}

build();
