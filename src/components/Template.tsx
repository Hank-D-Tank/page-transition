"use client"

import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";

export const Heading = ({ children }: { children: ReactNode }) => {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!headingRef.current) return;

    const words = new SplitText(headingRef.current, {
      type: "lines",
      mask: "lines",
    });

    gsap.fromTo(
      words.lines,
      { yPercent: 120, opacity: 0, ease: "power2.inOut"},
      {
        yPercent: 0,
        opacity: 1,
        stagger: 0.2,
        ease: "power2.inOut",
        duration: 0.8, 
      }
    );
  }, []);

  return (
    <h1 ref={headingRef} className="font-display text-6xl md:text-7xl font-extrabold tracking-tight text-center">
      {children}
    </h1>
  );
};

export const SubHeading = ({ children }: { children: ReactNode }) => {
  const subHeadingRef = useRef<HTMLParagraphElement>(null);
  
  useEffect(() => {

    if (!subHeadingRef.current) return;

    gsap.fromTo(subHeadingRef.current, 
        {
            opacity: 0,
            ease: "power2.inOut"
        },
        {
            opacity: 1,
            ease: "power2.inOut",
            duration: 0.8
        }
    )
  }, [])

  return (
    <p ref={subHeadingRef} className="mt-8 text-xl text-foreground/70">
      {children}
    </p>
  );
};

const Template = ({ children }: { children: ReactNode }) => {
  return (
    <div className="absolute inset-0 h-screen flex flex-col">
      <main className="flex-1 flex justify-center items-center px-6">
        <div className="max-w-2xl mx-auto text-center">{children}</div>
      </main>
    </div>
  );
};

export default Template;
