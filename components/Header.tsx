import { NavLinks } from "./NavLinks";

const links = [
  { label: "Home", url: "/" },
  { label: "About", url: "/about" },
  { label: "Projects", url: "/projects" },
];

export default function Header() {
  return (
    <header className="bg-blue-950 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <div id="header-title" className="text-2xl font-bold">
          Josh Hyatt
        </div>
        <NavLinks links={links} />
      </div>
    </header>
  );
}
