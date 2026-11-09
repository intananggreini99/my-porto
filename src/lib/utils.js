import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Join class names; later Tailwind utilities win over earlier ones. */
export const cn = (...inputs) => twMerge(clsx(inputs));

/** URL of a file in /public that works from the domain root or a sub-folder. */
export const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const NAV = [
  { id: "home", label: "Home", icon: "i-house" },
  { id: "about", label: "About", icon: "i-user" },
  { id: "skills", label: "Skills", icon: "i-code-xml" },
  { id: "projects", label: "Projects", icon: "i-layers" },
  { id: "credentials", label: "Credentials", icon: "i-badge-check" },
  { id: "activities", label: "Activities", icon: "i-images" },
  { id: "contact", label: "Contact", icon: "i-mail" },
];
