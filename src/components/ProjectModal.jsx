import { useEffect, useState } from "react";
import { useDialog } from "../hooks/useDialog";
import { asset, cn } from "../lib/utils";
import { Button, Chip, Icon } from "./ui";

const IMG = "assets/img/projects/";

export default function ProjectModal({ project, onClose, onZoom, zoomOpen }) {
  const open = Boolean(project);
  const [index, setIndex] = useState(0);
  useEffect(() => { setIndex(0); }, [project]);

  const images = project
    ? project.images.map((im) => ({ src: asset(`${IMG}${im.src}.webp`), thumb: asset(`${IMG}${im.src}-thumb.webp`), caption: im.caption }))
    : [];
  const step = (d) => setIndex((i) => (i + d + images.length) % images.length);

  const ref = useDialog(open, {
    onClose,
    initialFocus: "[data-close]",
    onKey: (e) => {
      if (images.length < 2) return;
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    },
  });

  if (!project) return null;
  const im = images[index];

  return (
    <div className="fixed inset-0 z-[250]" aria-hidden={zoomOpen || undefined}>
      <div className="absolute inset-0 animate-fade bg-overlay" onClick={onClose} aria-hidden="true" />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        data-layer-open="true"
        className="relative z-10 h-dvh w-full animate-rise overflow-x-hidden overflow-y-auto overscroll-contain bg-gray-850 md:mx-auto md:my-6 md:h-auto md:max-h-[calc(100dvh-48px)] md:w-[min(1040px,calc(100%-32px))] md:rounded-card md:border md:border-line"
      >
        <div className="sticky top-0 z-20 flex items-start justify-between gap-4 border-b border-line bg-gray-850 px-[18px] py-4 md:px-7 md:py-6">
          <div className="min-w-0">
            <h2 id="modal-title" className="text-2xl leading-tight font-semibold md:text-[30px]">{project.title}</h2>
            <p className="mt-1 font-semibold text-blue-400">{project.subtitle}</p>
          </div>
          <button
            type="button"
            data-close
            onClick={onClose}
            aria-label="Close project details"
            className="grid size-11 flex-none place-items-center rounded-full border border-line text-[22px] transition-colors hover:border-blue-600 hover:bg-blue-600 hover:text-white"
          >
            <Icon id="i-x" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-7 p-[18px] pb-10 md:p-7">
          <div className="min-w-0">
            <button
              type="button"
              onClick={(e) => onZoom(images, index, e.currentTarget)}
              aria-label="Open image full screen"
              className="relative block w-full overflow-hidden rounded-card border border-line bg-surface-strong"
            >
              <img src={im.src} alt={im.caption} className="mx-auto max-h-[52dvh] w-full object-contain md:max-h-[62vh]" />
              <span className="absolute top-2.5 right-2.5 inline-flex items-center gap-2 rounded-full bg-scrim px-3 py-1.5 text-sm font-semibold text-white md:top-3 md:right-3 md:px-3.5 md:py-2">
                <Icon id="i-maximize-2" />Full screen
              </span>
            </button>
            <p className="mt-2.5 text-sm text-muted" aria-live="polite">
              {images.length > 1 && <span className="mr-2 tabular-nums text-faint">{index + 1}/{images.length}</span>}
              {im.caption}
            </p>
            {images.length > 1 && (
              <ul aria-label="Project images" className="thin-scroll mt-3.5 flex gap-2.5 overflow-x-auto pb-1.5">
                {images.map((t, k) => (
                  <li key={t.thumb} className="flex-none">
                  <button
                    type="button"
                    aria-label={`Show image ${k + 1}: ${t.caption}`}
                    aria-current={k === index}
                    onClick={() => setIndex(k)}
                    className={cn(
                      "block aspect-[16/10] w-24 overflow-hidden rounded-tile border-2 bg-[#F5F7F7] transition md:w-28",
                      k === index ? "border-blue-400 opacity-100" : "border-transparent opacity-70 hover:border-blue-400 hover:opacity-100",
                    )}
                  >
                    <img src={t.thumb} alt="" loading="lazy" className="size-full object-cover object-top" />
                  </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {project.highlights?.length > 0 && (
            <div className="grid grid-cols-1 gap-3 xs:grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
              {project.highlights.map((h, k) => (
                <div
                  key={h.label}
                  className={cn(
                    "rounded-card border border-line bg-linear-160 to-white/[0.035] p-4 md:p-[18px]",
                    k % 2 === 0 ? "from-blue-600/20" : "from-gold-400/15",
                  )}
                >
                  <b className={cn("block text-[28px] leading-none font-semibold md:text-[30px]", k % 2 === 0 ? "text-blue-400" : "text-gold-400")}>{h.value}</b>
                  <span className="mt-2 block text-sm leading-snug text-muted">{h.label}</span>
                </div>
              ))}
            </div>
          )}

          <div className="grid gap-7 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
            <div className="grid gap-3.5">
              {project.description.map((d, k) => <p key={k} className="leading-[1.75] text-muted">{d}</p>)}
            </div>
            <aside className="grid content-start gap-5">
              <div>
                <h3 className="mb-2.5 text-sm font-semibold text-faint">Project</h3>
                <p className="font-semibold">{project.type}</p>
                {project.role && <p className="mt-1 text-muted">{project.role}</p>}
              </div>
              <div>
                <h3 className="mb-2.5 text-sm font-semibold text-faint">Tech stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((s) => <Chip key={s} className="bg-gray-500/15 text-[13px]">{s}</Chip>)}
                </div>
              </div>
              {project.links?.length > 0 && (
                <div>
                  <h3 className="mb-2.5 text-sm font-semibold text-faint">Links</h3>
                  <div className="flex flex-wrap gap-2.5">
                    {project.links.map((l) => (
                      <Button key={l.url} href={l.url} target="_blank" rel="noopener" size="sm" variant={l.icon === "b-github" ? "gold" : "ghost"}>
                        <Icon id={l.icon} />{l.label}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
