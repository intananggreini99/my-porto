import data from "../data/portfolio";
import { cn } from "../lib/utils";
import { cardClass, Icon, IconTile, Reveal, SectionHeader } from "./ui";

export default function Credentials() {
  const n = data.achievements.length;
  return (
    <section id="credentials" aria-labelledby="credentials-title" className="pt-24 xl:pt-30">
      <SectionHeader id="credentials-title" eyebrow="Credentials" lines={["Certified Skills,", "Strong Academic"]} accent="Record" />
      <ul className="mt-14 grid gap-6 md:grid-cols-2">
        {data.achievements.map((a, i) => {
          const gold = a.tone === "gold";
          return (
            <Reveal
              as="li"
              key={a.title}
              className={cn(
                cardClass,
                "flex flex-col bg-linear-160 to-white/[0.035]",
                gold ? "border-gold-400/25 from-gold-400/15" : "border-blue-400/25 from-blue-600/20",
                n % 2 === 1 && i === n - 1 && "md:col-span-2",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <span className={cn("inline-flex items-center gap-2 text-[15px] font-semibold", gold ? "text-gold-400" : "text-blue-400")}>
                  <Icon id={a.icon} className="text-lg" />{a.tag}
                </span>
                <span className={cn("font-accent text-[22px] leading-none font-semibold italic", gold ? "text-gold-400" : "text-blue-200")}>{a.year}</span>
              </div>
              <p className="mt-[18px] leading-[1.7] text-muted">{a.text}</p>
              <div className="mt-auto flex items-center gap-3.5 pt-[22px]">
                <IconTile icon={a.icon} tone={gold ? "gold" : "blue"} className="size-12 rounded-full" />
                <div className="min-w-0">
                  <h3 className="text-lg leading-snug font-semibold md:text-[19px]">{a.title}</h3>
                  <span className="mt-0.5 block text-sm text-muted">{a.org}</span>
                </div>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
