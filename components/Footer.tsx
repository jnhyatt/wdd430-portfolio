export default function Footer() {
  return (
    <footer className="mt-12 bg-gray-800 py-6 text-gray-300">
      <div className="container mx-auto px-4 text-center text-sm">
        <p>
          Copyright &copy; {new Date().getFullYear()} | Josh Hyatt | All rights
          reserved
        </p>
      </div>
    </footer>
  );
}
