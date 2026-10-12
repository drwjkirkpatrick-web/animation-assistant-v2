import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-ink text-sea-text mt-16 border-t border-ocean-surf/20">
      <div className="container-x py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <span className="text-2xl">🌊</span> Animation Assistant
            </h3>
            <p className="text-sea-muted text-sm leading-relaxed">
              Teaching kids to animate with Kenya&apos;s ocean. 58 lessons, 30+ species,
              one ocean classroom.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-3">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/lessons/" className="hover:text-ocean-glow transition-colors">All 58 Lessons</Link></li>
              <li><Link href="/" className="hover:text-ocean-glow transition-colors">Home</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Aligned To</h4>
            <ul className="space-y-2 text-sm text-sea-muted">
              <li>🇰🇪 Kenya CBE Curriculum</li>
              <li>🥧 Raspberry Pi Foundation Standards</li>
              <li>🎓 Ages 10–17 · 5 Tiers</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-ink-soft mt-8 pt-6 text-center text-sm text-sea-muted">
          <p>Built for the kids of Kenya&apos;s coast and beyond. MIT License. 🌊</p>
        </div>
      </div>
    </footer>
  );
}
