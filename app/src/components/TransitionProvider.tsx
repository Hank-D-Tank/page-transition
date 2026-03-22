"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import gsap from "gsap";

const TransitionContext = createContext<{ navigateTo: (href: string) => void; }>({ navigateTo: () => {}});

export const usePageTransition = () => useContext(TransitionContext);

export default function TransitionProvider({
  children,
  column = 6,
}: {
  children: ReactNode;
  column?: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isTransitioning = useRef(false);

  useEffect(() => {
    if (!isTransitioning.current) return;

    const cols = colRefs.current;
    gsap.to(cols, {
      y: "-100%",
      duration: 0.5,
      ease: "power3.inOut",
      stagger: 0.05,
      onComplete: () => {
        isTransitioning.current = false;
      },
    });
  }, [pathname]);

  const navigateTo = useCallback(
    (href: string) => {
      if (isTransitioning.current) return;
      if (pathname === href) return;

      isTransitioning.current = true;
      const cols = colRefs.current;
      gsap.set(cols, { y: "100%" });

      gsap.to(cols, {
        y: "0%",
        duration: 0.5,
        ease: "power3.inOut",
        stagger: 0.05,
        onComplete: () => {
          router.push(href);
        },
      });
    },
    [router, pathname]
  );

  return (
    <TransitionContext.Provider value={{ navigateTo }}>
      {children}
      <div className="w-screen h-screen fixed inset-0 z-50 flex pointer-events-none">
        {Array.from({ length: column }).map((_, idx) => (
          <div
            key={idx}
            ref={(el) => {
              colRefs.current[idx] = el;
            }}
            className="w-full h-full bg-indigo-400"
            style={{ transform: "translateY(100%)" }}
          />
        ))}
      </div>
    </TransitionContext.Provider>
  );
}
