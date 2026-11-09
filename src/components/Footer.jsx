import profile from "../data/profile";
import { cn, prefersReducedMotion } from "../lib/utils";
import { Icon, Logo } from "./ui";

export function Footer() {
  return (
    <footer className="mt-24 flex flex-col items-start gap-4 border-t border-blue-400/20 pt-7 text-[15px] text-muted sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
      <Logo markClassName="h-[30px] md:h-[30px] translate-y-0 md:translate-y-0" />
      <p>&copy; {new Date().getFullYear()} {profile.name}. {profile.footerPlace}.</p>
    </footer>
  );
}

const R = 26;
const LEN = 2 * Math.PI * R;

export function BackToTop({ visible, progress }) {
  return (
    <button
      type="button"
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" })}
      className={cn(
        "no-print fixed right-4 bottom-[calc(84px+env(safe-area-inset-bottom))] z-[80] grid size-[50px] place-items-center rounded-full bg-gray-900 text-[22px] text-blue-400 transition duration-300 ease-soft md:right-6 xl:right-7 xl:bottom-7 xl:size-14",
        visible ? "visible translate-y-0 opacity-100" : "invisible translate-y-3 opacity-0",
      )}
    >
      <svg viewBox="0 0 56 56" aria-hidden="true" className="ring-progress absolute inset-0 size-full -rotate-90">
        <circle cx="28" cy="28" r={R} stroke="var(--color-line)" />
        <circle cx="28" cy="28" r={R} stroke="var(--color-blue-400)" strokeLinecap="round" strokeDasharray={LEN} strokeDashoffset={LEN * (1 - progress)} />
      </svg>
      <Icon id="i-arrow-up" />
    </button>
  );
}
