import Link from 'next/link';

const TIER_CLASSES = {
  beginner: 'bg-ocean-foam/15 text-ocean-foam',
  intermediate: 'bg-ocean-glow/15 text-ocean-glow',
  advanced: 'bg-coral/15 text-coral',
  expert: 'bg-reef-green/15 text-reef-green',
  capstone: 'bg-ocean-surf/15 text-ocean-glow',
};

export default function LessonCard({ lesson }) {
  const tierClass = TIER_CLASSES[lesson.tier] || TIER_CLASSES.beginner;
  return (
    <Link href={`/lessons/${lesson.slug}/`} className="group block">
      <div className="card group-hover:-translate-y-1 transition-transform h-full flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <span className="text-4xl">{lesson.animal.emoji}</span>
          <span className={`badge ${tierClass}`}>#{String(lesson.number).padStart(2, '0')}</span>
        </div>
        <h3 className="text-lg font-bold text-sea-text mb-1 group-hover:text-ocean-glow transition-colors">
          {lesson.title}
        </h3>
        <p className="text-sm text-sea-muted mb-3">
          {lesson.animal.name} <span className="text-ocean-foam">({lesson.animal.swahili || '—'})</span>
        </p>
        <div className="mt-auto flex flex-wrap gap-2 text-xs">
          {lesson.duration && (
            <span className="badge bg-ocean-surf/10 text-ocean-glow">⏱ {lesson.duration}</span>
          )}
          {lesson.ageGroup && (
            <span className="badge bg-sand/10 text-sand">👦 {lesson.ageGroup}</span>
          )}
          {lesson.codingTool && (
            <span className="badge bg-reef-green/10 text-reef-green">💻 {lesson.codingTool}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
