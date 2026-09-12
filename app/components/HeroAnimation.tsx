"use client";

import { useEffect, useRef } from "react";
import type { AnimationItem } from "lottie-web";

export default function HeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animItem: AnimationItem | null = null;
    let isMounted = true;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const prefersReducedMotion = mediaQuery.matches;

    import("lottie-web/build/player/lottie_light")
      .then((lottieModule) => {
        if (!isMounted || !containerRef.current) return;

        const lottie = lottieModule.default || lottieModule;

        animItem = lottie.loadAnimation({
          container: containerRef.current,
          renderer: "svg",
          loop: !prefersReducedMotion,
          autoplay: !prefersReducedMotion,
          path: "/animations/hero.json",
          rendererSettings: {
            preserveAspectRatio: "xMidYMid meet",
            className: "w-full h-full",
          },
        });

        if (prefersReducedMotion && animItem) {
          animItem.goToAndStop(0, true);
        }
      })
      .catch((err) => {
        console.error("Failed to load Lottie animation:", err);
      });

    const handleMotionChange = (e: MediaQueryListEvent) => {
      if (!animItem) return;
      if (e.matches) {
        animItem.pause();
        animItem.goToAndStop(0, true);
      } else {
        animItem.play();
      }
    };

    mediaQuery.addEventListener("change", handleMotionChange);

    return () => {
      isMounted = false;
      mediaQuery.removeEventListener("change", handleMotionChange);
      if (animItem) {
        animItem.destroy();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="flex h-full w-full max-h-[460px] max-w-[460px] items-center justify-center pointer-events-none select-none"
    />
  );
}
