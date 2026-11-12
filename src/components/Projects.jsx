import { useMemo, useState } from "react";
import data from "../data/portfolio";
import { asset, cn } from "../lib/utils";
import { Chip, Icon, Reveal, SectionHeader } from "./ui";

const catLabel = Object.fromEntries(data.filters.map((f) => [f.id, f.label]));
const IMG = "assets/img/projects/";

function ProjectCard({ p, featured, onOpen }) {
  const cover = p.images[0];
  return (
    <Reveal as="li" className={cn(featured && "md:col-span-2")}>
      <article className="group relative flex flex-col rounded-card has-[.stretched:focus-visible]:outline-2 has-[.stretched:focus-visible]:outline-offset-8 has-[.stretched:focus-visible]:outline-blue-400">
        <div className={cn("relative aspect-[16/10] overflow-hidden rounded-card border border-blue-400/20 bg-[#F5F7F7]", featured && "md:aspect-[16/8.6]")}>
          <img
            src={asset(`${IMG}${cover.src}-thumb.webp`)}
            alt={cover.caption}
            loading="lazy"
            decoding="async"
            style={{ objectPosition: p.coverPosition || "top center" }}
            className="size-full object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.035]"
          />
          <span className="absolute top-3 left-3 flex flex-wrap gap-1.5 md:top-3.5 md:left-3.5">
            {p.categories.map((c) => (
              <Chip key={c} className="border-transparent bg-scrim px-2.5 py-1 text-[13px] text-white">{catLabel[c] || c}</Chip>
            ))}
          </span>
          <span
            aria-hidden="true"
            className="absolute right-3 bottom-3 grid size-11 place-items-center rounded-full bg-linear-120 from-gold-300 via-gold-400 to-gold-600 text-[22px] text-gray-950 transition duration-300 ease-soft md:right-3.5 md:bottom-3.5 md:size-[52px] md:scale-[0.85] md:opacity-0 md:group-focus-within:scale-100 md:group-focus-within:opacity-100 md:group-hover:scale-100 md:group-hover:opacity-100 pointer-coarse:scale-100 pointer-coarse:opacity-100"
          >
            <Icon id="i-arrow-up-right" />
          </span>
        </div>
        <h3 className={cn("mt-4 text-[22px] leading-tight font-semibold md:mt-[18px] md:text-[26px]", featured && "md:text-[30px]")}>
          <button type="button" className="stretched text-left" aria-haspopup="dialog" onClick={(e) => onOpen(p.id, e.currentTarget)}>
            {p.title}
          </button>
        </h3>
        <p className="mt-1 text-[15px] font-semibold text-blue-400">{p.subtitle}</p>
        <p className="mt-2.5 text-[15.5px] leading-[1.65] text-muted">{p.summary}</p>
        <ul className="mt-3.5 flex flex-wrap gap-2">
          {p.stack.slice(0, featured ? 8 : 5).map((s) => (
            <Chip as="li" key={s} className="bg-gray-500/15 px-2.5 py-1 text-[13px]">{s}</Chip>
          ))}
        </ul>
      </article>
    </Reveal>
  );
}

export default function Projects({ onOpen }) {
  const [filter, setFilter] = useState("all");
  const list = useMemo(
    () => data.projects.filter((p) => filter === "all" || p.categories.includes(filter)),
    [filter],
  );
  // first card spans the full width; if that leaves an odd one out, the last spans too
  const lastWide = list.length > 1 && (list.length - 1) % 2 === 1;

  return (
    <section id="projects" aria-labelledby="projects-title" className="pt-24 xl:pt-30">
      <SectionHeader id="projects-title" size="sub" lines={["My Projects"]} accent="Portfolio" />

      <div role="group" aria-label="Filter projects by category" className="-mx-[var(--gutter)] mt-12 flex gap-2.5 overflow-x-auto px-[var(--gutter)] pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [scrollbar-width:none]">
        {data.filters.map((f) => {
          const n = f.id === "all" ? data.projects.length : data.projects.filter((p) => p.categories.includes(f.id)).length;
          const on = f.id === filter;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(f.id)}
              className={cn(
                "min-h-[42px] flex-none rounded-full border px-4 text-[15px] font-semibold whitespace-nowrap transition-colors duration-200 md:px-[18px]",
                on ? "border-blue-500 bg-linear-140 from-blue-500 to-blue-700 text-white" : "border-line bg-gray-800 hover:border-blue-400",
              )}
            >
              {f.label}
              <span className={cn("ml-1.5 tabular-nums", !on && "opacity-70")}>{n}</span>
            </button>
          );
        })}
      </div>

      <ul aria-live="polite" className="mt-7 grid gap-x-6 gap-y-10 md:grid-cols-2 md:gap-y-8">
        {list.map((p, i) => (
          <ProjectCard key={`${filter}-${p.id}`} p={p} featured={i === 0 || (lastWide && i === list.length - 1)} onOpen={onOpen} />
        ))}
      </ul>
    </section>
  );
}
