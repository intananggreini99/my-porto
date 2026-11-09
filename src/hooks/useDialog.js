import { useEffect, useRef } from "react";

const FOCUSABLE = 'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';

/* Several layers (menu, project, image viewer) can lock the page at once. */
let locks = 0;
const lockBody = () => { if (locks++ === 0) document.body.classList.add("is-locked"); };
const unlockBody = () => { if (--locks <= 0) { locks = 0; document.body.classList.remove("is-locked"); } };

/**
 * Behaviour shared by the menu, the project dialog and the image viewer:
 * locks page scroll, moves focus in, keeps Tab inside, handles keys,
 * and gives focus back to the element that opened it.
 */
export function useDialog(open, { onClose, onKey, initialFocus } = {}) {
  const boxRef = useRef(null);
  const handlers = useRef({ onClose, onKey });
  handlers.current = { onClose, onKey };

  useEffect(() => {
    if (!open) return;
    const returnTo = document.activeElement;
    lockBody();
    const t = setTimeout(() => {
      const box = boxRef.current;
      const target = (initialFocus && box?.querySelector(initialFocus)) || box?.querySelector(FOCUSABLE);
      target?.focus();
    }, 40);

    const onKeyDown = (e) => {
      const box = boxRef.current;
      if (!box) return;
      // only the top-most open layer reacts
      const layers = document.querySelectorAll("[data-layer-open='true']");
      if (layers.length && layers[layers.length - 1] !== box) return;
      if (e.key === "Escape") { e.preventDefault(); handlers.current.onClose?.(); return; }
      handlers.current.onKey?.(e);
      if (e.key !== "Tab") return;
      const items = [...box.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null || el === document.activeElement);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      else if (!box.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKeyDown);
      unlockBody();
      if (returnTo && typeof returnTo.focus === "function") returnTo.focus({ preventScroll: true });
    };
  }, [open, initialFocus]);

  return boxRef;
}
