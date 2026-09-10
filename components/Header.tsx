import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-blue-950 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <div id="header-title" className="text-2xl font-bold">
          Josh Hyatt
        </div>
        <nav>
          <ul className="flex gap-6">
            <li>
              <Link href="/" className="transition-colors hover:text-blue-200">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="transition-colors hover:text-blue-200"
              >
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
