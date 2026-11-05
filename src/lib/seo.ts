export const SEO_KEYWORDS = [
  "Nikita Nautiyal",
  "product designer",
  "associate product designer",
  "UI/UX designer",
  "UI UX designer Bengaluru",
  "product designer India",
  "Figma",
  "wireframing",
  "prototyping",
  "journey mapping",
  "responsive design",
  "React.js",
  "mobile app design",
  "portfolio",
].join(", ");

export function seoMeta(title: string, description: string) {
  return [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: SEO_KEYWORDS },
    { name: "robots", content: "index, follow" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];
}

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nikita Nautiyal",
  jobTitle: "Associate Product Designer",
  description:
    "UI/UX product designer in Bengaluru. Mobile and web design, Figma wireframes, prototyping, and React.js handovers.",
  email: "nikitaofficial300@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressCountry: "IN",
  },
  sameAs: ["https://www.linkedin.com/in/nikitades"],
  knowsAbout: [
    "UI/UX design",
    "Product design",
    "Figma",
    "Wireframing",
    "Prototyping",
    "Journey mapping",
    "Responsive design",
    "React.js",
  ],
};
