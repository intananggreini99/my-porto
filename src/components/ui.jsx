import { useEffect, useRef, useState } from "react";
import { cn, prefersReducedMotion } from "../lib/utils";

/* ---------- Icon from the inline sprite ---------- */
export function Icon({ id, className }) {
  return (
    <svg className={cn("inline-block size-[1em] shrink-0 align-middle", className)} aria-hidden="true" focusable="false">
      <use href={`#${id}`} />
    </svg>
  );
}

/* ---------- INTAN wordmark (the rose stands in for the "I") ---------- */
export function Logo({ className, markClassName, ...rest }) {
  return (
    <a href="#home" className={cn("inline-flex items-center rounded-md leading-none", className)} {...rest}>
      <svg
        viewBox="0 0 3441 978"
        aria-hidden="true"
        focusable="false"
        className={cn(
          "block h-8 w-auto -translate-y-0.5 overflow-visible drop-shadow-[0_2px_8px_rgb(37_99_235/0.18)] md:h-[38px] md:-translate-y-[3px]",
          markClassName,
        )}
        style={{ aspectRatio: "3441 / 978" }}
      >
        <use href="#i-logo" />
      </svg>
      <span className="sr-only">Intan</span>
    </a>
  );
}

/* ---------- Buttons ---------- */
const btnBase =
  "inline-flex items-center justify-center gap-2.5 rounded-full border font-semibold uppercase tracking-[0.01em] transition duration-200 ease-soft active:translate-y-px [&_svg]:text-lg";
const btnVariants = {
  gold: "border-gold-400 bg-linear-120 from-gold-300 via-gold-400 to-gold-600 text-gray-950 hover:border-gold-300 hover:bg-gold-300 hover:bg-none",
  ghost: "border-blue-400/35 bg-blue-600/15 text-blue-200 hover:border-blue-400 hover:bg-blue-600/30",
};
const btnSizes = { md: "min-h-[52px] px-6 text-base", sm: "min-h-11 px-5 text-[15px]" };

export function Button({ as: Tag = "a", variant = "gold", size = "md", className, children, ...rest }) {
  return (
    <Tag className={cn(btnBase, btnVariants[variant], btnSizes[size], className)} {...rest}>
      {children}
    </Tag>
  );
}

/* ---------- Surfaces ---------- */
export const cardClass = "rounded-card border border-line bg-surface p-6 md:p-8";

export function Chip({ className, children, as: Tag = "span" }) {
  return (
    <Tag className={cn("inline-flex items-center rounded-full border border-line bg-surface-strong px-3 py-1.5 text-sm leading-tight font-medium text-text", className)}>
      {children}
    </Tag>
  );
}

export function IconTile({ icon, tone = "blue", className }) {
  return (
    <span
      className={cn(
        "grid size-[52px] flex-none place-items-center rounded-tile text-2xl",
        tone === "gold" ? "bg-gold-400/15 text-gold-400" : "bg-blue-400/15 text-blue-400",
        className,
      )}
    >
      <Icon id={icon} />
    </span>
  );
}

export function Socials({ items, className, linkClassName }) {
  return (
    <ul className={cn("flex flex-wrap justify-center gap-2.5", className)}>
      {items.map((s) => (
        <li key={s.label}>
          <a
            href={s.url}
            {...(s.url.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener" })}
            aria-label={s.label}
            className={cn(
              "grid size-11 place-items-center rounded-full border border-line text-lg transition-colors hover:border-blue-600 hover:bg-blue-600 hover:text-white",
              linkClassName,
            )}
          >
            <Icon id={s.icon} />
          </a>
        </li>
      ))}
    </ul>
  );
}

/* ---------- Reveal on scroll ---------- */
export function useInView({ once = true, rootMargin = "0px 0px -8% 0px", threshold = 0.08 } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) { setInView(true); return; }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); if (once) io.disconnect(); }
    }, { rootMargin, threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [once, rootMargin, threshold]);
  return [ref, inView];
}

export function Reveal({ as: Tag = "div", className, children, ref: outerRef, ...rest }) {
  const [ref, inView] = useInView();
  const setRef = (node) => {
    ref.current = node;
    if (typeof outerRef === "function") outerRef(node);
    else if (outerRef) outerRef.current = node;
  };
  return (
    <Tag
      ref={setRef}
      className={cn(
        "transition-[opacity,translate] duration-700 ease-soft motion-reduce:transition-none",
        inView ? "translate-y-0 opacity-100" : "translate-y-7 opacity-0",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ---------- Section heading: eyebrow + three-line display title ---------- */
export function SectionHeader({ id, eyebrow, lines, accent, level = 2 }) {
  const H = `h${level}`;
  return (
    <>
      <Reveal as="p" className="inline-flex items-center gap-2.5 text-lg font-medium text-blue-200 md:text-xl">
        <Icon id="i-rose" className="h-7 w-[30px]" />
        {eyebrow}
      </Reveal>
      <Reveal
        as={H}
        id={id}
        className="mt-4 text-[clamp(30px,8.6cqi,80px)] leading-[1.06] font-semibold tracking-[-0.01em] md:leading-[1.04]"
      >
        <span className="block">{lines[0]}</span>
        <span className="block pl-[0.4em] md:pl-[0.8em]">{lines[1]}</span>
        <span className="block pl-[0.4em] md:pl-[0.8em]">
          <span className="accent">{accent}</span>
        </span>
      </Reveal>
    </>
  );
}
