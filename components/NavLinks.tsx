"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavLinksProps {
  links: { label: string; url: string }[];
}

export function NavLinks({ links }: NavLinksProps) {
  const path = usePathname();
  return (
    <nav>
      <ul className="flex gap-6">
        {links.map((l) => (
          <NavLink
            key={l.url}
            href={l.url}
            label={l.label}
            active={path === l.url}
          />
        ))}
      </ul>
    </nav>
  );
}

interface NavLinkProps {
  label: string;
  href: string;
  active: boolean;
}

function NavLink({ label, href, active }: NavLinkProps) {
  return (
    <li>
      <Link
        href={href}
        className={clsx(
          "transition-colors hover:text-blue-200",
          active && "font-bold underline",
        )}
      >
        {label}
      </Link>
    </li>
  );
}
