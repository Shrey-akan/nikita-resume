import { useRouterState } from "@tanstack/react-router";
import { useEffect, useLayoutEffect, useRef } from "react";

export function SiteMotion() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const dot = useRef<HTMLSpanElement>(null);
  const ring = useRef<HTMLSpanElement>(null);
  const progress = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const root = document.documentElement;
    root.classList.add("bubble-pointer");
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;
    let rx = x;
    let ry = y;
    let hovering = false;
    let visible = false;
    let frame = 0;

    const place = (node: HTMLSpanElement | null, px: number, py: number, scale: number) => {
      if (!node) return;
      node.style.transform = `translate3d(${px}px, ${py}px, 0) translate(-50%, -50%) scale(${scale})`;
      node.style.opacity = visible ? "1" : "0";
    };

    const tick = () => {
      cx += (x - cx) * 0.38;
      cy += (y - cy) * 0.38;
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      place(dot.current, cx, cy, hovering ? 0.55 : 1);
      place(ring.current, rx, ry, hovering ? 1.7 : 1);
      frame = window.requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      visible = true;
      const target = event.target instanceof Element ? event.target : null;
      hovering = Boolean(target?.closest("a, button, input, textarea, select, summary, [role='button']"));
    };

    const onLeave = () => {
      visible = false;
    };

    const onDown = (event: PointerEvent) => {
      for (let i = 0; i < 5; i += 1) {
        const burst = document.createElement("span");
        burst.className = "pointer-burst";
        const angle = (Math.PI * 2 * i) / 5 + Math.random() * 0.4;
        const dist = 16 + Math.random() * 22;
        burst.style.left = `${event.clientX}px`;
        burst.style.top = `${event.clientY}px`;
        burst.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
        burst.style.setProperty("--dy", `${Math.sin(angle) * dist}px`);
        document.body.appendChild(burst);
        burst.addEventListener("animationend", () => burst.remove(), { once: true });
      }
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    document.addEventListener("pointerleave", onLeave);
    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
      root.classList.remove("bubble-pointer");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const field = document.querySelector<HTMLElement>(".bubble-field");
    if (!field || reduce) return;

    let frame = 0;
    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const shift = Math.min(window.scrollY * 0.12, 90);
        field.style.transform = `translate3d(0, ${-shift}px, 0)`;
        const height = document.documentElement.scrollHeight - window.innerHeight;
        const amount = height > 0 ? window.scrollY / height : 0;
        if (progress.current) progress.current.style.transform = `scaleX(${amount})`;
        document.querySelectorAll<HTMLElement>(".scroll-shot").forEach((shot) => {
          const rect = shot.getBoundingClientRect();
          const delta = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
          shot.style.setProperty("--drift", `${Math.max(-16, Math.min(16, delta * -24))}px`);
        });
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      field.style.transform = "";
    };
  }, []);

  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    const pieces = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll]"));
    const blocks = Array.from(document.querySelectorAll<HTMLElement>("main section, main article")).filter(
      (node) => !node.querySelector("[data-scroll], .stagger") && !node.closest("[data-scroll]"),
    );
    if (reduce) {
      root.classList.remove("motion-on");
      [...pieces, ...blocks].forEach((node) => node.classList.remove("will-reveal", "is-in"));
      return;
    }

    root.classList.add("motion-on");
    const seen = [...pieces, ...blocks];
    seen.forEach((node, index) => {
      if (!node.hasAttribute("data-scroll")) {
        node.classList.add("will-reveal");
        node.style.transitionDelay = `${(index % 4) * 70}ms`;
      }
      const rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
        node.classList.add("is-in");
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );

    seen.forEach((node) => observer.observe(node));
    return () => {
      observer.disconnect();
      root.classList.remove("motion-on");
    };
  }, [pathname]);

  return (
    <>
      <span ref={progress} className="scroll-progress" aria-hidden />
      <span ref={ring} className="pointer-bubble pointer-bubble-ring" aria-hidden />
      <span ref={dot} className="pointer-bubble pointer-bubble-dot" aria-hidden />
    </>
  );
}
