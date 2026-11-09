import data from "../data/portfolio";
import { cn } from "../lib/utils";
import { Icon, Reveal, SectionHeader } from "./ui";

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="pt-24 xl:pt-30">
      <SectionHeader id="skills-title" eyebrow="My skills" lines={["The Tools Behind", "Every Data"]} accent="Pipeline" />

      <Reveal as="ul" aria-label="Core tools" className="mt-14 grid grid-cols-2 gap-x-[18px] border-t border-line sm:grid-cols-3 sm:gap-x-7 2xl:grid-cols-4">
        {data.tools.map((t, i) => (
          <li
            key={t.name}
            title={t.note}
            style={{ "--brand": t.color }}
            className="group flex min-w-0 items-center gap-3 border-b border-line px-0.5 py-4 text-[15px] font-medium sm:text-base"
          >
            <Icon
              id={t.icon}
              className={cn("text-xl transition-colors duration-200 group-hover:text-(--brand)", i % 2 === 0 ? "text-blue-400" : "text-gray-300")}
            />
            <span className="truncate">{t.name}</span>
          </li>
        ))}
      </Reveal>

      <Reveal as="h3" className="mt-14 text-[22px] leading-snug font-semibold">Full toolbox</Reveal>
      <Reveal as="dl" className="mt-4 border-t border-line">
        {data.toolbox.map((g, i) => (
          <div
            key={g.title}
            className={cn(
              "grid gap-1.5 border-b border-line px-3.5 py-4 md:grid-cols-[minmax(0,250px)_minmax(0,1fr)] md:gap-x-8 md:py-[18px]",
              i % 2 === 0 && "bg-linear-to-r from-blue-600/[0.07] to-transparent to-70%",
            )}
          >
            <dt className="text-[17px] leading-snug font-semibold">
              {g.title}
              {g.level && <span className="mt-0.5 block text-[13px] font-semibold text-gold-400">{g.level}</span>}
            </dt>
            <dd className="leading-relaxed text-muted">{g.items.join(", ")}</dd>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
