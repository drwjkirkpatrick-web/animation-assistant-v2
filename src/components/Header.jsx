import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-ink text-sea-text sticky top-0 z-50 shadow-lg border-b border-ocean-surf/30">
      <nav className="container-x flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg hover:text-ocean-glow transition-colors">
          <span className="text-2xl">🌊</span>
          <span className="hidden sm:inline">Animation Assistant</span>
        </Link>
        <ul className="flex items-center gap-1 sm:gap-4 text-sm sm:text-base">
          <li>
            <Link href="/" className="px-3 py-2 rounded-full hover:bg-ink-soft transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link href="/lessons/" className="px-3 py-2 rounded-full hover:bg-ink-soft transition-colors">
              Lessons
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
