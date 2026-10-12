import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import PageShell from '@/components/PageShell';
import { getAllLessons, getLessonBySlug, getTiers } from '@/lib/data';

export function generateStaticParams() {
  return getAllLessons().map((lesson) => ({
    slug: lesson.slug,
  }));
}

export function generateMetadata({ params }) {
  const lesson = getLessonBySlug(params.slug);
  if (!lesson) return { title: 'Lesson Not Found — Animation Assistant' };
  return {
    title: `Lesson ${String(lesson.number).padStart(2, '0')}: ${lesson.title} — Animation Assistant`,
    description: `${lesson.animal.emoji} ${lesson.title} — ${lesson.animal.name} (${lesson.animal.swahili}). ${lesson.duration}, ages ${lesson.ageGroup}.`,
  };
}

export default function LessonPage({ params }) {
  const lesson = getLessonBySlug(params.slug);
  if (!lesson) notFound();

  const tiers = getTiers();
  const tier = tiers[lesson.tier];

  // Find prev/next lessons
  const allLessons = getAllLessons();
  const currentIndex = allLessons.findIndex((l) => l.slug === lesson.slug);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  return (
    <PageShell>
      {/* Lesson Hero */}
      <section className="bg-gradient-to-br from-ocean-deep to-ocean-surf text-white py-10">
        <div className="container-x">
          <Link href="/lessons/" className="inline-flex items-center gap-1 text-white/80 hover:text-white text-sm mb-4">
            ← Back to All Lessons
          </Link>
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="text-7xl md:text-8xl flex-shrink-0">{lesson.animal.emoji}</div>
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="badge bg-white/20 text-white backdrop-blur-sm">
                  Lesson {String(lesson.number).padStart(2, '0')}
                </span>
                <span className="badge bg-white/20 text-white backdrop-blur-sm">
                  {tier.emoji} {tier.name} ({tier.label})
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">{lesson.title}</h1>
              <div className="flex flex-wrap gap-3 text-sm">
                {lesson.duration && <span className="bg-white/15 px-3 py-1 rounded-full">⏱ {lesson.duration}</span>}
                {lesson.ageGroup && <span className="bg-white/15 px-3 py-1 rounded-full">👦 Ages {lesson.ageGroup}</span>}
                {lesson.codingTool && <span className="bg-white/15 px-3 py-1 rounded-full">💻 {lesson.codingTool}</span>}
                {lesson.moduleRef && <span className="bg-white/15 px-3 py-1 rounded-full">📂 {lesson.moduleRef}</span>}
              </div>
            </div>
          </div>
        </div>
      </section>

      <article className="container-x py-10 max-w-4xl">
        {/* Animal Spotlight */}
        <div className="card bg-ocean-surf/5 border-l-4 border-ocean-foam mb-8">
          <h2 className="text-xl font-bold text-ocean-foam mb-2 flex items-center gap-2">
            <span className="text-3xl">{lesson.animal.emoji}</span>
            {lesson.animal.name} ({lesson.animal.swahili || '—'})
          </h2>
          {lesson.animal.habitat && (
            <p className="text-sm text-sea-muted mb-2">
              <strong>📍 Habitat:</strong> {lesson.animal.habitat}
            </p>
          )}
          {lesson.animal.conservation && (
            <p className="text-sm text-sea-muted">
              <strong>🌿 Conservation:</strong> {lesson.animal.conservation}
            </p>
          )}
        </div>

        {/* Learning Outcomes */}
        {lesson.learningOutcomes.length > 0 && (
          <div className="card bg-ocean-glow/5 border-l-4 border-ocean-glow mb-8">
            <h2 className="text-lg font-bold text-ocean-glow mb-3">🎯 Learning Outcomes</h2>
            <ol className="list-decimal list-inside space-y-2 text-sea-text">
              {lesson.learningOutcomes.map((outcome, i) => (
                <li key={i} className="leading-relaxed">{outcome}</li>
              ))}
            </ol>
          </div>
        )}

        {/* Key Inquiry Question */}
        {lesson.inquiryQuestion && (
          <div className="card bg-coral/5 border-l-4 border-coral mb-8">
            <h2 className="text-lg font-bold text-coral mb-2">❓ Key Inquiry Question</h2>
            <blockquote className="italic text-sea-muted leading-relaxed">
              {lesson.inquiryQuestion}
            </blockquote>
          </div>
        )}

        {/* Full Lesson Content (Markdown) */}
        <div className="card mb-8">
          <div className="prose-ocean max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {lesson.content}
            </ReactMarkdown>
          </div>
        </div>

        {/* Resources */}
        {lesson.resources.length > 0 && (
          <div className="card bg-reef-green/5 border-l-4 border-reef-green mb-8">
            <h2 className="text-lg font-bold text-reef-green mb-3">📋 Resources</h2>
            <ul className="space-y-1 text-sea-text">
              {lesson.resources.map((resource, i) => (
                <li key={i} className="text-sm leading-relaxed">• {resource}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Extended Activity */}
        {lesson.extendedActivity && (
          <div className="card bg-ocean-foam/5 border-l-4 border-ocean-foam mb-8">
            <h2 className="text-lg font-bold text-ocean-foam mb-3">🚀 Extended Activity</h2>
            <div className="prose-ocean max-w-none text-sm">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {lesson.extendedActivity}
              </ReactMarkdown>
            </div>
          </div>
        )}

        {/* Prev/Next Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-10">
          {prevLesson ? (
            <Link href={`/lessons/${prevLesson.slug}/`} className="card flex-1 group hover:bg-ocean-mid/80">
              <span className="text-xs text-sea-muted">← Previous Lesson</span>
              <p className="font-bold text-sea-text group-hover:text-ocean-glow text-sm mt-1">
                {prevLesson.animal.emoji} {prevLesson.title}
              </p>
            </Link>
          ) : <div className="flex-1" />}
          {nextLesson ? (
            <Link href={`/lessons/${nextLesson.slug}/`} className="card flex-1 group hover:bg-ocean-mid/80 text-right">
              <span className="text-xs text-sea-muted">Next Lesson →</span>
              <p className="font-bold text-sea-text group-hover:text-ocean-glow text-sm mt-1">
                {nextLesson.title} {nextLesson.animal.emoji}
              </p>
            </Link>
          ) : <div className="flex-1" />}
        </div>
      </article>
    </PageShell>
  );
}
