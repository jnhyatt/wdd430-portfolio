import Link from "next/link";

export default function ProjectsLayout({ children }: LayoutProps<"/projects">) {
  return (
    <div className="container mx-auto w-200">
      <nav className="mb-6 border-b border-gray-700 pb-4">
        <ul className="flex gap-6">
          <li>
            <Link
              href="/projects"
              className="transition-colors hover:text-blue-400"
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              href="/projects/settings"
              className="transition-colors hover:text-blue-400"
            >
              Settings
            </Link>
          </li>
        </ul>
      </nav>
      {children}
    </div>
  );
}
