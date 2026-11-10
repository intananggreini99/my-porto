import data from "../data/portfolio";
import { cardClass, Icon, Reveal, SectionHeader } from "./ui";
import { cn } from "../lib/utils";

const avatars = [
  { icon: "b-python", color: "text-[#3776AB]" },
  { icon: "b-apacheairflow", color: "text-[#017CEE]" },
  { icon: "b-docker", color: "text-[#2496ED]" },
];

export default function Hero() {
  const count = data.projects.length;
  return (
    <section id="home" aria-labelledby="hero-title" className="scroll-mt-[calc(var(--header-h)+16px)]">
      <SectionHeader id="hero-title" level={1} size="sub" lines={["Hi, I'm Intan, an Applied Data Science"]} accent="student" />

      <Reveal className="mt-10 flex flex-wrap items-center justify-start gap-6 sm:justify-between">
        <a
          href="#projects"
          aria-label="Explore my projects • Data • ML • MLOps •"
          className="group relative grid size-28 flex-none place-items-center rounded-full border border-blue-400/30 bg-blue-900/35 text-blue-200 md:size-[132px]"
        >
          <svg viewBox="0 0 120 120" aria-hidden="true" className="absolute inset-1.5 size-[calc(100%-12px)] animate-spin-slow">
            <defs><path id="badge-circle" d="M60,60 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0" /></defs>
            <text className="fill-current text-[10.6px] font-semibold tracking-[0.22em] uppercase">
              <textPath href="#badge-circle" textLength="292" lengthAdjust="spacing">Explore my projects • Data • ML • MLOps •</textPath>
            </text>
          </svg>
          <span className="grid size-11 place-items-center rounded-full bg-gold-400 text-[22px] text-gray-950 transition-transform duration-300 ease-soft group-hover:rotate-45">
            <Icon id="i-arrow-up-right" />
          </span>
        </a>
        <div className="flex items-center gap-4">
          <div className="flex" aria-hidden="true">
            {avatars.map((a, i) => (
              <span key={a.icon} className={cn("grid size-12 place-items-center rounded-full border-2 border-gray-900 bg-gray-800 text-[22px] shadow-[0_0_0_1px_var(--color-line)] md:size-14 md:text-[26px]", i > 0 && "-ml-3.5", a.color)}>
                <Icon id={a.icon} />
              </span>
            ))}
            <span className="-ml-3.5 grid size-12 place-items-center rounded-full border-2 border-gray-900 bg-gold-400 text-lg font-bold text-gray-950 shadow-[0_0_0_1px_var(--color-line)] md:size-14">
              {count}
            </span>
          </div>
          <p className="leading-snug text-muted">
            <strong className="block font-semibold text-text">{count} projects</strong>in data, ML and BI
          </p>
        </div>
      </Reveal>

      <Reveal
        as="a"
        href="#contact"
        className={cn(
          cardClass,
          "group mt-10 flex flex-col items-center gap-5 border-blue-400/30 bg-linear-135 from-blue-700 via-blue-900 to-blue-950 px-5 py-10 text-center hover:border-gold-400 md:px-8 md:py-14",
        )}
      >
        <span className="text-[clamp(30px,7cqi,64px)] leading-[1.1] font-semibold">Let's Work Together</span>
        <span className="grid size-16 place-items-center rounded-full bg-white/12 text-[26px] transition duration-300 ease-soft group-hover:rotate-45 group-hover:bg-gold-400 group-hover:text-gray-950 md:size-20 md:text-[30px]">
          <Icon id="i-arrow-up-right" />
        </span>
      </Reveal>
    </section>
  );
}
