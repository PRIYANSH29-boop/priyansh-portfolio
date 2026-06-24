// Single source of truth for identity + links.
export const site = {
  name: "Priyansh",
  fullName: "Priyansh Patel",
  role: "ML / AI Engineer",
  // One honest line about what you build.
  tagline: "I build machine-learning systems for finance and fraud.",
  location: "London, UK",
  email: "priyansh2005p@gmail.com",
  github: "https://github.com/PRIYANSH29-boop",
  linkedin: "https://www.linkedin.com/in/priyansh-patel-64ba742ba/",
  resumeUrl: "/Priyansh-CV.pdf",
} as const;

export const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
] as const;
