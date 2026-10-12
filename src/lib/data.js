import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'lessons.json');

let _cache = null;

export function getSiteData() {
  if (_cache) return _cache;
  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  _cache = JSON.parse(raw);
  return _cache;
}

export function getAllLessons() {
  return getSiteData().lessons;
}

export function getLessonBySlug(slug) {
  return getSiteData().lessons.find((l) => l.slug === slug);
}

export function getLessonsByTier(tier) {
  return getSiteData().lessons.filter((l) => l.tier === tier);
}

export function getAnimals() {
  return getSiteData().animals;
}

export function getTiers() {
  return getSiteData().tiers;
}

export function getFeaturedLessons() {
  const lessons = getAllLessons();
  const tiers = getTiers();
  const featured = [];
  for (const tierKey of Object.keys(tiers)) {
    const tierLessons = lessons.filter((l) => l.tier === tierKey);
    if (tierLessons.length > 0) {
      featured.push(tierLessons[0]);
    }
  }
  return featured;
}
