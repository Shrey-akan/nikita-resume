export const headerLinks = [
  { to: "/projects", label: "Case studies" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Journal" },
  { to: "/contact", label: "Contact" },
] as const;

export const profileLinks = [
  { to: "/about", label: "About", hint: "Profile, education, and writing" },
  { to: "/experience", label: "Experience", hint: "Product design roles" },
  { to: "/projects", label: "Case studies", hint: "Selected product work" },
  { to: "/skills", label: "Skills", hint: "Research, UI, and tools" },
] as const;
