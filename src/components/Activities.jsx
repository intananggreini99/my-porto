import data from "../data/portfolio";
import { asset, cn } from "../lib/utils";
import { Icon, Reveal, SectionHeader } from "./ui";

const IMG = "assets/img/activities/";

export default function Activities({ onOpen }) {
  const open = (a) => {
    const items = a.images.map((im) => ({ src: asset(`${IMG}${im.src}.webp`), caption: im.caption, photo: true }));
    onOpen(items, Math.max(0, a.images.findIndex((im) => im.src === a.cover)));
  };

  return (
    <section id="activities" aria-labelledby="activities-title" className="pt-24 xl:pt-30">
      <SectionHeader id="activities-title" eyebrow="Activities" lines={["Beyond the Code,", "Leading and"]} accent="Guiding" />
      <ul className="mt-14 grid gap-x-6 gap-y-10 md:grid-cols-2 md:gap-y-8">
        {data.activities.map((a, i) => {
          const featured = i === 0;
          const cover = a.images.find((im) => im.src === a.cover);
          return (
            <Reveal as="li" key={a.id} className={cn(featured && "md:col-span-2")}>
              <article className="group relative flex flex-col rounded-card has-[.stretched:focus-visible]:outline-2 has-[.stretched:focus-visible]:outline-offset-8 has-[.stretched:focus-visible]:outline-blue-400">
                <div className={cn("relative aspect-[4/3] overflow-hidden rounded-card bg-surface-strong", featured && "md:aspect-[16/8]")}>
                  <img
                    src={asset(`${IMG}${a.cover}-thumb.webp`)}
                    alt={cover?.caption || a.title}
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.035]"
                  />
                  <span className="absolute right-3 bottom-3 inline-flex items-center gap-2 rounded-full bg-scrim px-3.5 py-2 text-sm font-semibold text-white md:right-3.5 md:bottom-3.5">
                    <Icon id="i-images" />{a.images.length} photos
                  </span>
                </div>
                <p className="mt-4 flex flex-wrap justify-between gap-x-3 gap-y-1 text-[15px] text-muted md:mt-[18px]">
                  <span className="font-semibold text-blue-400">{a.category}</span>
                  <span className="inline-flex items-center gap-2"><Icon id="i-calendar" />{a.period}</span>
                </p>
                <h3 className="mt-2.5 text-[22px] leading-snug font-semibold md:text-2xl">
                  <button type="button" className="stretched text-left" aria-haspopup="dialog" onClick={() => open(a)}>{a.title}</button>
                </h3>
                <p className="mt-2 text-[15.5px] leading-[1.65] text-muted">{a.text}</p>
              </article>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
