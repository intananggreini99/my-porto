import { useDialog } from "../hooks/useDialog";
import { cn, NAV } from "../lib/utils";
import profile from "../data/profile";
import { Button, Icon, Logo, Socials } from "./ui";

/* ---------- Top bar ---------- */
export function Header({ scrolled, menuOpen, onOpenMenu }) {
  return (
    <header
      className={cn(
        "no-print fixed inset-x-0 top-0 z-[100] h-[var(--header-h)] transition-[background-color,box-shadow] duration-300 ease-soft",
        scrolled && "bg-gray-900/85 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-full max-w-[1320px] items-center justify-between gap-4 px-[var(--gutter)] xl:pl-[calc(var(--gutter)+var(--rail-w)+24px)]">
        <Logo />
        <div className="flex items-center gap-2.5 md:gap-5">
          <Button href="#contact" size="sm" className="max-md:hidden">
            Hire me <Icon id="i-mail" />
          </Button>
          <button
            type="button"
            onClick={onOpenMenu}
            aria-label="Open menu"
            aria-controls="offcanvas"
            aria-expanded={menuOpen}
            className="grid size-11 place-items-center rounded-full text-[30px] transition-colors hover:bg-surface"
          >
            <Icon id="i-menu" />
          </button>
        </div>
      </div>
    </header>
  );
}

/* ---------- Side rail: laptops and desktops ---------- */
export function Rail({ active }) {
  return (
    <nav aria-label="Sections" className="no-print fixed top-[calc(var(--header-h)+72px)] left-[max(var(--gutter),calc((100vw-1320px)/2+var(--gutter)))] z-[90] hidden flex-col gap-3 xl:flex">
      {NAV.map((n) => {
        const on = n.id === active;
        return (
          <a
            key={n.id}
            href={`#${n.id}`}
            aria-current={on ? "true" : undefined}
            className={cn(
              "group relative grid size-[var(--rail-w)] place-items-center rounded-tile border text-[26px] transition-colors duration-200",
              on
                ? "border-blue-500 bg-linear-140 from-blue-500 to-blue-700 text-white"
                : "border-line bg-gray-800 text-text hover:border-blue-400",
            )}
          >
            <Icon id={n.icon} />
            <span className="pointer-events-none absolute top-1/2 left-[calc(100%+12px)] -translate-x-1.5 -translate-y-1/2 rounded-tile bg-blue-700 px-3 py-1.5 text-sm font-semibold whitespace-nowrap text-white opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
              {n.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}

/* ---------- Bottom dock: phones and tablets ---------- */
export function Dock({ active }) {
  return (
    <nav
      aria-label="Sections"
      className="no-print fixed bottom-[calc(12px+env(safe-area-inset-bottom))] left-1/2 z-[95] flex w-[calc(100%-24px)] max-w-[440px] -translate-x-1/2 justify-between gap-1 rounded-[14px] border border-line bg-gray-900/85 p-1.5 shadow-[0_10px_30px_rgb(0_0_0/0.25)] backdrop-blur-md xl:hidden"
    >
      {NAV.map((n) => {
        const on = n.id === active;
        return (
          <a
            key={n.id}
            href={`#${n.id}`}
            aria-current={on ? "true" : undefined}
            className={cn(
              "grid h-11 min-w-0 flex-1 place-items-center rounded-[10px] text-[21px] transition-colors xs:h-12 xs:text-[22px]",
              on ? "bg-linear-140 from-blue-500 to-blue-700 text-white" : "text-text hover:bg-surface",
            )}
          >
            <Icon id={n.icon} />
            <span className="sr-only">{n.label}</span>
          </a>
        );
      })}
    </nav>
  );
}

/* ---------- Slide-in menu ---------- */
export function OffCanvas({ open, active, onClose }) {
  const ref = useDialog(open, { onClose, initialFocus: "[data-close]" });
  const s = profile.socials;
  return (
    <>
      <aside
        id="offcanvas"
        ref={ref}
        aria-label="Menu"
        aria-hidden={!open}
        inert={!open}
        data-layer-open={open}
        className={cn(
          "no-print fixed inset-y-0 right-0 z-[200] flex w-full flex-col overflow-y-auto overscroll-contain border-l border-line bg-linear-to-b from-gray-850 to-gray-900 px-6 pt-6 pb-8 transition-transform duration-[400ms] ease-soft sm:w-[420px] sm:px-8 sm:pt-7",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between">
          <Logo onClick={onClose} />
          <button
            type="button"
            data-close
            onClick={onClose}
            aria-label="Close menu"
            className="grid size-11 place-items-center rounded-full border border-line text-[22px] transition-colors hover:border-blue-600 hover:bg-blue-600 hover:text-white"
          >
            <Icon id="i-x" />
          </button>
        </div>
        <nav aria-label="Menu links" className="mt-8">
          {NAV.map((n) => {
            const on = n.id === active;
            return (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={onClose}
                aria-current={on ? "true" : undefined}
                className={cn(
                  "group flex items-center gap-3.5 border-b border-line py-3 text-xl font-medium transition-colors hover:text-blue-400",
                  on && "text-blue-400",
                )}
              >
                <Icon id={n.icon} className={cn("text-xl text-faint transition-colors group-hover:text-blue-400", on && "text-blue-400")} />
                {n.label}
              </a>
            );
          })}
        </nav>
        <Button href="#contact" onClick={onClose} className="mt-7">
          Get in touch <Icon id="i-mail" />
        </Button>
        <div className="mt-7 grid gap-3 text-[15px] text-muted [&_svg]:text-lg [&_svg]:text-blue-400">
          <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-3 break-all hover:text-text">
            <Icon id="i-mail" />{profile.email}
          </a>
          <a href={s.whatsapp.url} target="_blank" rel="noopener" className="inline-flex items-center gap-3 hover:text-text">
            <Icon id="b-whatsapp" />{profile.whatsapp.label}
          </a>
          <span className="inline-flex items-center gap-3"><Icon id="i-map-pin" />{profile.location}</span>
        </div>
        <Socials items={[s.linkedin, s.github, s.instagram]} className="mt-6 justify-start" />
        <p className="mt-auto pt-7 text-[13px] text-faint">&copy; {new Date().getFullYear()} {profile.name}</p>
      </aside>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          "no-print fixed inset-0 z-[190] bg-overlay transition-[opacity,visibility] duration-300",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      />
    </>
  );
}
