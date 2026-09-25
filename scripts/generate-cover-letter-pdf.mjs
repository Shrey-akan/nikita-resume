import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, "..", "public", "Nikita-Nautiyal-Cover-Letter.pdf");
const sys = "/System/Library/Fonts/Supplemental";

async function build() {
  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);
  doc.setTitle("Nikita Nautiyal - Cover Letter");
  doc.setAuthor("Nikita Nautiyal");
  const body = await doc.embedFont(readFileSync(join(sys, "Arial.ttf")));
  const bold = await doc.embedFont(readFileSync(join(sys, "Arial Bold.ttf")));
  const page = doc.addPage([595.28, 841.89]);
  const lines = [
    ["NIKITA NAUTIYAL", 18, bold, rgb(0.62, 0.22, 0.28)],
    ["UI/UX Designer", 11, body, rgb(0.32, 0.28, 0.3)],
    ["nikdesigncraft@gmail.com  |  +91 89687 52908", 10, body, rgb(0.32, 0.28, 0.3)],
    ["", 10, body, rgb(0, 0, 0)],
    ["Hello,", 11, body, rgb(0.16, 0.1, 0.14)],
    ["", 8, body, rgb(0, 0, 0)],
    ["I design digital products by starting with how people actually move through them.", 11, body, rgb(0.16, 0.1, 0.14)],
    ["I wrote the PRD and designed Figma UI for Banknote AI and Coinzy: onboarding,", 11, body, rgb(0.16, 0.1, 0.14)],
    ["free scan, bottom navigation, camera flow, and expert, on mobile and web.", 11, body, rgb(0.16, 0.1, 0.14)],
    ["At Genuinest I led UI/UX for an iOS social app, from research and wireframes", 11, body, rgb(0.16, 0.1, 0.14)],
    ["to 50+ high-fidelity screens and a reusable Figma system.", 11, body, rgb(0.16, 0.1, 0.14)],
    ["", 8, body, rgb(0, 0, 0)],
    ["Case studies include India’s 112 emergency app, a music streaming prototype,", 11, body, rgb(0.16, 0.1, 0.14)],
    ["and an interaction-heavy carousel built as a reusable component.", 11, body, rgb(0.16, 0.1, 0.14)],
    ["", 8, body, rgb(0, 0, 0)],
    ["I would welcome a conversation about product design roles.", 11, body, rgb(0.16, 0.1, 0.14)],
    ["", 8, body, rgb(0, 0, 0)],
    ["Nikita Nautiyal", 12, bold, rgb(0.16, 0.1, 0.14)],
  ];
  let y = 760;
  for (const [text, size, font, color] of lines) {
    if (text) page.drawText(text, { x: 56, y, size, font, color });
    y -= size + 10;
  }
  writeFileSync(outPath, await doc.save());
}

build();
