import Link from "next/link";
export default function Header() {
  return (
    <header className="border-b bg-white/70 backdrop-blur sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-display text-2xl">Carol Oliva Fotografia</Link>
        <nav className="flex items-center gap-6">
          <Link href="/galleries">Galerias</Link>
          <Link href="/dashboard">Dashboard</Link>
        </nav>
      </div>
    </header>
  );
}
