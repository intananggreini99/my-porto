import profile from "../data/profile";
import { cn } from "../lib/utils";
import { cardClass, Chip, IconTile, Reveal, SectionHeader, Socials } from "./ui";

function Timeline({ items, tone }) {
  return (
    <Reveal as="ol" className={cardClass}>
      {items.map((it, i) => (
        <li key={it.title} className={cn(i > 0 && "mt-7 border-t border-line pt-7")}>
          <p className={cn("text-[15px] font-semibold", tone === "gold" ? "text-gold-400" : "text-blue-400")}>{it.when}</p>
          <h4 className="mt-2 text-xl leading-snug font-semibold md:text-[22px]">{it.title}</h4>
          <p className="mt-2 text-[15px] text-muted">{it.where}</p>
          {it.note && <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{it.note}</p>}
        </li>
      ))}
    </Reveal>
  );
}

export default function About() {
  const s = profile.socials;
  return (
    <section id="about" aria-labelledby="about-title" className="pt-24 xl:pt-30">
      <SectionHeader id="about-title" size="sub" lines={["About"]} accent="Me" />

      <Reveal className={cn(cardClass, "mt-10 bg-linear-160 from-gray-300/10 to-white/[0.03]")}>
        <h3 className="text-[26px] leading-tight font-semibold md:text-[30px]">{profile.name}</h3>
        {profile.bio.map((p, i) => (
          <p key={i} className={cn("leading-[1.75] text-muted", i === 0 ? "mt-3.5" : "mt-3")}>{p}</p>
        ))}
      </Reveal>

      <ul className="mt-6 grid gap-6 md:grid-cols-2">
        {profile.focus.map((f, i) => {
          const gold = i % 2 === 1;
          return (
            <Reveal
              as="li"
              key={f.title}
              className={cn(
                cardClass,
                "flex items-start gap-4 bg-linear-160 to-white/[0.035] md:gap-[18px]",
                gold ? "from-gold-400/15" : "from-blue-600/20",
              )}
            >
              <IconTile icon={f.icon} tone={gold ? "gold" : "blue"} />
              <div>
                <h3 className="text-xl leading-tight font-semibold">{f.title}</h3>
                <p className="mt-2.5 text-[15px] leading-[1.7] text-muted">{f.text}</p>
              </div>
            </Reveal>
          );
        })}
      </ul>

      <div className="mt-16 grid items-start gap-6 md:grid-cols-2">
        <div className="grid gap-6">
          <Reveal as="h3" className="text-[28px] leading-tight font-semibold md:text-[34px]">Experience</Reveal>
          <Timeline items={profile.experience} tone="blue" />
          <Reveal className={cn(cardClass, "bg-linear-160 from-gold-400/15 to-white/[0.035] text-center")}>
            <h3 className="text-2xl font-semibold">Stay connected</h3>
            <Socials items={[s.linkedin, s.github, s.instagram, s.whatsapp, s.tableau]} className="mt-4 gap-2 sm:gap-2.5" linkClassName="size-11 sm:size-12" />
          </Reveal>
        </div>
        <div className="grid gap-6">
          <Reveal as="h3" className="text-[28px] leading-tight font-semibold md:text-[34px]">Education</Reveal>
          <Timeline items={profile.education} tone="gold" />
          <Reveal className={cn(cardClass, "bg-linear-160 from-blue-600/20 to-white/[0.035]")}>
            <h3 className="text-2xl font-semibold">Languages</h3>
            <ul className="mt-3.5 flex flex-wrap gap-2">
              {profile.languages.map((l) => (
                <Chip as="li" key={l} className="border-blue-400/30 bg-blue-600/20">{l}</Chip>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
