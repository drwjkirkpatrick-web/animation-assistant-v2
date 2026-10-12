'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import PageShell from '@/components/PageShell';
import LessonCard from '@/components/LessonCard';
import { getAllLessons, getTiers } from '@/lib/data-client';

function LessonsContent() {
  const lessons = getAllLessons();
  const tiers = getTiers();
  const searchParams = useSearchParams();
  const selectedTier = searchParams.get('tier') && tiers[searchParams.get('tier')] ? searchParams.get('tier') : 'all';

  const filtered = selectedTier === 'all'
    ? lessons
    : lessons.filter((l) => l.tier === selectedTier);

  return (
    <PageShell>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-ocean-mid to-ocean-surf text-white py-12">
        <div className="container-x text-center">
          <p className="text-5xl mb-3">📚</p>
          <h1 className="text-4xl font-bold mb-2">All 58 Lessons</h1>
          <p className="text-lg text-white/90">
            Filter by tier and explore every animation adventure.
          </p>
        </div>
      </section>

      {/* Tier Filter */}
      <section className="sticky top-16 z-40 bg-ocean-deep border-b border-ocean-surf/20 shadow-sm py-4">
        <div className="container-x flex flex-wrap justify-center gap-2">
          <Link
            href="/lessons/"
            className={`badge px-4 py-2 text-sm transition-colors ${
              selectedTier === 'all'
                ? 'bg-ocean-foam text-ocean-deep'
                : 'bg-ocean-mid text-sea-text hover:bg-ocean-surf'
            }`}
          >
            All ({lessons.length})
          </Link>
          {Object.entries(tiers).map(([key, tier]) => {
            const count = lessons.filter((l) => l.tier === key).length;
            const isActive = selectedTier === key;
            return (
              <Link
                key={key}
                href={`/lessons/?tier=${key}`}
                className={`badge px-4 py-2 text-sm transition-colors ${
                  isActive
                    ? 'bg-ocean-foam text-ocean-deep'
                    : 'bg-ocean-mid text-sea-text hover:bg-ocean-surf'
                }`}
              >
                {tier.emoji} {tier.name} ({count})
              </Link>
            );
          })}
        </div>
      </section>

      {/* Lessons Grid */}
      <section className="py-12 bg-gradient-to-b from-ocean-deep to-ocean-mid">
        <div className="container-x">
          {selectedTier !== 'all' && (
            <div className="mb-6 text-center">
              <p className="text-lg text-sea-muted">
                Showing <span className="font-bold text-white">{filtered.length}</span> lessons
                for <span className="font-bold text-ocean-glow">{tiers[selectedTier].emoji} {tiers[selectedTier].name}</span> tier
                (Ages {tiers[selectedTier].ages}, {tiers[selectedTier].label})
              </p>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((lesson) => (
              <LessonCard key={lesson.slug} lesson={lesson} />
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

export default function LessonsPage() {
  return (
    <Suspense fallback={<div className="container-x py-20 text-center text-sea-muted">Loading lessons…</div>}>
      <LessonsContent />
    </Suspense>
  );
}
