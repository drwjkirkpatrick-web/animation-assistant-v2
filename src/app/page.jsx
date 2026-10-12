import Link from 'next/link';
import PageShell from '@/components/PageShell';
import LessonCard from '@/components/LessonCard';
import { getAllLessons, getTiers, getFeaturedLessons, getAnimals } from '@/lib/data-client';

export default function HomePage() {
  const lessons = getAllLessons();
  const tiers = getTiers();
  const featured = getFeaturedLessons();
  const animals = getAnimals();

  const marineBigFive = [
    { emoji: '🐢', name: 'Green Sea Turtle', swahili: 'Kasa', principle: 'Weight shift, heavy vs light, quadruped locomotion' },
    { emoji: '🐬', name: 'Bottlenose Dolphin', swahili: 'Pomboo', principle: 'Arcs, anticipation, breaching (jump physics)' },
    { emoji: '🦈', name: 'Whale Shark', swahili: 'Papa Shinga', principle: 'Scale through timing, massive weight, slow momentum' },
    { emoji: '🐙', name: 'Octopus', swahili: 'Pweza', principle: 'Secondary motion (8 tentacles = complex trailing)' },
    { emoji: '🪼', name: 'Jellyfish', swahili: '—', principle: 'Squash & stretch (pulsing bell), secondary motion (tentacle delay)' },
  ];

  return (
    <PageShell>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-ocean-deep via-ocean-mid to-ocean-surf text-white">
        <div className="absolute inset-0 opacity-10 text-8xl flex items-center justify-center select-none pointer-events-none">
          🐢🐬🦈🐙🪼
        </div>
        <div className="container-x relative py-20 md:py-28 text-center">
          <p className="text-5xl md:text-7xl mb-4 animate-float">🌊</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Animation Assistant
          </h1>
          <p className="text-xl md:text-2xl mb-2 font-medium drop-shadow">
            Teaching Kids to Animate with Kenya&apos;s Ocean
          </p>
          <p className="text-base md:text-lg mb-8 text-white/90 max-w-2xl mx-auto">
            58 animation lessons for students aged 10–17. Every lesson features a real
            Kenyan marine animal — from Pomboo the Dolphin to Kasa the Turtle.
            Aligned to Kenya CBE curriculum and Raspberry Pi Foundation standards.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/lessons/" className="btn-primary">
              📚 Explore 58 Lessons
            </Link>
          </div>
        </div>
        {/* Wavy bottom */}
        <div className="h-8 bg-ocean-deep" style={{ clipPath: 'polygon(0 50%, 100% 0, 100% 100%, 0 100%)' }} />
      </section>

      {/* Stats Bar */}
      <section className="bg-ocean-deep py-8">
        <div className="container-x grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="card !shadow-none bg-ocean-mid/40">
            <p className="text-4xl font-bold text-ocean-glow">58</p>
            <p className="text-sm text-sea-muted">Lesson Plans</p>
          </div>
          <div className="card !shadow-none bg-ocean-mid/40">
            <p className="text-4xl font-bold text-ocean-foam">{animals.length}</p>
            <p className="text-sm text-sea-muted">Ocean Species</p>
          </div>
          <div className="card !shadow-none bg-ocean-mid/40">
            <p className="text-4xl font-bold text-coral">5</p>
            <p className="text-sm text-sea-muted">Skill Tiers</p>
          </div>
          <div className="card !shadow-none bg-ocean-mid/40">
            <p className="text-4xl font-bold text-reef-green">10–17</p>
            <p className="text-sm text-sea-muted">Age Range</p>
          </div>
        </div>
      </section>

      {/* Tier Overview */}
      <section className="py-16 bg-gradient-to-b from-ocean-deep to-ocean-mid">
        <div className="container-x">
          <h2 className="text-3xl font-bold text-center text-white mb-2">
            🎯 Five Tiers of Adventure
          </h2>
          <p className="text-center text-sea-muted mb-10 max-w-2xl mx-auto">
            From first principles to photogrammetry — every kid starts
            somewhere and grows at their own pace.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {Object.entries(tiers).map(([key, tier]) => {
              const count = lessons.filter((l) => l.tier === key).length;
              return (
                <Link key={key} href={`/lessons/?tier=${key}`} className="card text-center group hover:-translate-y-1 transition-transform">
                  <p className="text-5xl mb-3">{tier.emoji}</p>
                  <h3 className="text-xl font-bold text-sea-text mb-1">{tier.name}</h3>
                  <p className="text-ocean-glow font-semibold mb-2">{tier.label}</p>
                  <p className="text-xs text-sea-muted mb-3">Ages {tier.ages} · {count} lessons</p>
                  <p className="text-sm text-sea-muted">{tier.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Marine Big Five */}
      <section className="py-16 bg-gradient-to-b from-ocean-mid to-ocean-surf">
        <div className="container-x">
          <h2 className="text-3xl font-bold text-center text-white mb-2">
            Why Kenya&apos;s Ocean Animals?
          </h2>
          <p className="text-center text-sea-text/80 mb-10 max-w-2xl mx-auto">
            Every lesson plan uses at least one animal from Kenya&apos;s Marine Big Five or reef ecosystem as the
            animation subject. This isn&apos;t decoration — it&apos;s pedagogy.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {marineBigFive.map((a, i) => (
              <div key={i} className="card text-center group hover:scale-105 transition-transform">
                <span className="text-5xl mb-2 block">{a.emoji}</span>
                <span className="text-base font-bold text-white">{a.name}</span>
                <span className="text-sm text-ocean-foam block">{a.swahili}</span>
                <p className="text-sm text-sea-text/70 mt-2">{a.principle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Lessons */}
      <section className="py-16 bg-gradient-to-b from-ocean-surf to-ocean-mid">
        <div className="container-x">
          <h2 className="text-3xl font-bold text-center text-white mb-2">
            ⭐ Featured Lessons
          </h2>
          <p className="text-center text-sea-text/80 mb-10">
            One lesson from each tier to get you started.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {featured.map((lesson) => (
              <LessonCard key={lesson.slug} lesson={lesson} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/lessons/" className="btn-primary">
              See All 58 Lessons →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-ocean-mid to-ocean-surf text-white text-center">
        <div className="container-x">
          <p className="text-5xl mb-4">🌊</p>
          <h2 className="text-3xl font-bold mb-4">The Ocean Is Our Classroom</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-white/90">
            From Watamu to Lamu, from Mombasa to Diani — every animal is a
            character waiting to be animated. Start your ocean animation journey today.
          </p>
          <Link href="/lessons/" className="btn-primary">
            Start Your Journey →
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
