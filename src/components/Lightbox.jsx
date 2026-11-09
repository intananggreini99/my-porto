import { useEffect, useRef, useState } from "react";
import { useDialog } from "../hooks/useDialog";
import { cn } from "../lib/utils";
import { Icon } from "./ui";

/* Full-screen image viewer: arrows, keyboard and swipe. */
export default function Lightbox({ items, start = 0, onClose }) {
  const open = Boolean(items?.length);
  const [index, setIndex] = useState(start);
  const touchX = useRef(null);
  useEffect(() => { setIndex(start); }, [items, start]);

  const count = items?.length || 0;
  const step = (d) => setIndex((i) => (i + d + count) % count);
  const ref = useDialog(open, {
    onClose,
    initialFocus: "[data-close]",
    onKey: (e) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    },
  });

  // warm up the neighbouring images
  useEffect(() => {
    if (!open || count < 2) return;
    [index + 1, index - 1].forEach((k) => { const n = items[(k + count) % count]; if (n) new Image().src = n.src; });
  }, [open, index, items, count]);

  if (!open) return null;
  const it = items[Math.min(index, count - 1)];
  const nav = "grid size-11 place-items-center rounded-full border border-white/20 text-[22px] text-white transition-colors hover:border-blue-600 hover:bg-blue-600";

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      data-layer-open="true"
      className="fixed inset-0 z-[300] grid h-dvh animate-fade grid-rows-[auto_minmax(0,1fr)_auto] bg-[rgb(10_11_13/0.95)]"
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50 && count > 1) step(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3 text-white md:px-5 md:py-4">
        <span className="tabular-nums text-white/70">{index + 1} / {count}</span>
        <button type="button" data-close onClick={onClose} aria-label="Close image viewer" className={nav}>
          <Icon id="i-x" />
        </button>
      </div>

      <div
        className="relative grid min-h-0 place-items-center px-2 md:px-[72px]"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <img
          key={it.src}
          src={it.src}
          alt={it.caption || ""}
          className={cn("max-h-full max-w-full animate-fade rounded-md object-contain", !it.photo && "bg-white")}
        />
        {count > 1 && (
          <>
            <button type="button" onClick={() => step(-1)} aria-label="Previous image" className={cn(nav, "absolute top-1/2 left-4 -translate-y-1/2 max-md:hidden")}>
              <Icon id="i-chevron-left" />
            </button>
            <button type="button" onClick={() => step(1)} aria-label="Next image" className={cn(nav, "absolute top-1/2 right-4 -translate-y-1/2 max-md:hidden")}>
              <Icon id="i-chevron-right" />
            </button>
          </>
        )}
      </div>

      <div className="px-4 pt-3 pb-[calc(16px+env(safe-area-inset-bottom))] text-center md:px-5 md:pb-5">
        <p className="text-[15px] text-white/80">{it.caption}</p>
        {count > 1 && (
          <div className="mt-3 flex justify-center gap-3 md:hidden">
            <button type="button" onClick={() => step(-1)} aria-label="Previous image" className={nav}><Icon id="i-chevron-left" /></button>
            <button type="button" onClick={() => step(1)} aria-label="Next image" className={nav}><Icon id="i-chevron-right" /></button>
          </div>
        )}
      </div>
    </div>
  );
}
