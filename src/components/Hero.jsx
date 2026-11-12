import data from "../data/portfolio";
import { Icon, Reveal, SectionHeader } from "./ui";
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

      {/* One row at every width; on phones the project count text sits under the avatars so both fit. */}
      <Reveal className="mt-10 flex items-center justify-between gap-4 sm:gap-6">
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
        <div className="flex flex-col items-start gap-2.5 sm:flex-row sm:items-center sm:gap-4">
          <div className="flex" aria-hidden="true">
            {avatars.map((a, i) => (
              <span key={a.icon} className={cn("grid size-11 place-items-center rounded-full border-2 border-gray-900 bg-gray-800 text-xl shadow-[0_0_0_1px_var(--color-line)] sm:size-12 sm:text-[22px] md:size-14 md:text-[26px]", i > 0 && "-ml-3 sm:-ml-3.5", a.color)}>
                <Icon id={a.icon} />
              </span>
            ))}
            <span className="-ml-3 grid size-11 place-items-center rounded-full border-2 border-gray-900 bg-gold-400 text-lg font-bold text-gray-950 shadow-[0_0_0_1px_var(--color-line)] sm:-ml-3.5 sm:size-12 md:size-14">
              {count}
            </span>
          </div>
          <p className="text-[15px] leading-snug text-muted sm:text-base">
            <strong className="block font-semibold text-text">{count} projects</strong>in data, ML and BI
          </p>
        </div>
      </Reveal>
    </section>
  );
}
