import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Join class names; later Tailwind utilities win over earlier ones. */
export const cn = (...inputs) => twMerge(clsx(inputs));

/** URL of a file in /public that works from the domain root or a sub-folder. */
export const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Phones and tablets: a mailto: link opens the installed Gmail or Mail app there. */
const isTouchDevice = () =>
  typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

/**
 * Link that opens a new email already addressed to `to`.
 * On a computer it opens Gmail's compose window in a new tab, because mailto:
 * does nothing on PCs with no desktop mail app set up (common on Windows).
 * On a phone it stays mailto:, which opens the mail app.
 */
export function emailLink(to, { subject = "", body = "" } = {}) {
  const enc = encodeURIComponent;
  if (isTouchDevice()) {
    const query = [subject && `subject=${enc(subject)}`, body && `body=${enc(body)}`].filter(Boolean).join("&");
    return `mailto:${to}${query ? `?${query}` : ""}`;
  }
  return (
    `https://mail.google.com/mail/?view=cm&fs=1&to=${enc(to)}` +
    (subject ? `&su=${enc(subject)}` : "") +
    (body ? `&body=${enc(body)}` : "")
  );
}

/** Extra props for an <a>: a web link opens in a new tab, a mailto: link does not. */
export const newTabProps = (href) => (href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener" });

export const NAV = [
  { id: "home", label: "Home", icon: "i-house" },
  { id: "about", label: "About", icon: "i-user" },
  { id: "skills", label: "Skills", icon: "i-code-xml" },
  { id: "projects", label: "Projects", icon: "i-layers" },
  { id: "credentials", label: "Credentials", icon: "i-badge-check" },
  { id: "activities", label: "Activities", icon: "i-images" },
  { id: "contact", label: "Contact", icon: "i-mail" },
];
