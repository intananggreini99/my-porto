import { useEffect, useState } from "react";

/** Scroll position facts the chrome needs: header shadow, back-to-top, progress ring, active section. */
export function useScroll(sectionIds) {
  const [state, setState] = useState({ scrolled: false, showTop: false, progress: 0, active: sectionIds[0] });

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const y = window.scrollY;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      // the section whose top has passed 35% of the viewport is the current one
      const line = window.innerHeight * 0.35;
      let active = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - line <= 0) active = id;
      }
      if (window.innerHeight + y >= doc.scrollHeight - 4) active = sectionIds[sectionIds.length - 1];
      setState((prev) => {
        const next = { scrolled: y > 10, showTop: y > 600, progress: max > 0 ? Math.min(1, y / max) : 0, active };
        return prev.scrolled === next.scrolled && prev.showTop === next.showTop && prev.active === next.active &&
          Math.abs(prev.progress - next.progress) < 0.002 ? prev : next;
      });
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(measure); };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [sectionIds]);

  return state;
}
