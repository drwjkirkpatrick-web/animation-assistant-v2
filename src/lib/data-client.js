// Client-safe data access — imports the pre-built JSON directly.
// The build-lessons.js script generates src/data/lessons.json before build.
import lessonData from '@/data/lessons.json';

const { lessons, animals, tiers } = lessonData;

export function getAllLessons() {
  return lessons;
}

export function getLessonBySlug(slug) {
  return lessons.find((l) => l.slug === slug);
}

export function getLessonsByTier(tier) {
  return lessons.filter((l) => l.tier === tier);
}

export function getAnimals() {
  return animals;
}

export function getTiers() {
  return tiers;
}

export function getFeaturedLessons() {
  const featured = [];
  for (const tierKey of Object.keys(tiers)) {
    const tierLessons = lessons.filter((l) => l.tier === tierKey);
    if (tierLessons.length > 0) {
      featured.push(tierLessons[0]);
    }
  }
  return featured;
}
