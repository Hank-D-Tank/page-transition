"use client";

import { usePageTransition } from "./TransitionProvider";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const { navigateTo } = usePageTransition();

  return (
    <nav className="py-6 z-10">
      <ul className="flex justify-center gap-8 px-8 py-3">
        {navLinks.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              onClick={(e) => {
                e.preventDefault();
                navigateTo(href);
              }}
              className="text-foreground/80 font-medium px-3 py-1 rounded"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
