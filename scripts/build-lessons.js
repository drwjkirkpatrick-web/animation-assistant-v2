// scripts/build-lessons.js
// Parses all 58 lesson markdown files from ~/projects/animation-assistant/lessons/
// and writes structured JSON to src/data/lessons.json for static consumption.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_LESSONS_DIR = path.resolve(
  process.env.HOME || '/home/walker',
  'projects/animation-assistant/lessons'
);
const OUTPUT_DIR = path.resolve(__dirname, '..', 'src', 'data');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'lessons.json');

// Tier definitions based on module groups
const TIERS = {
  beginner: { range: [1, 10], name: 'Beginner', label: 'Creator', ages: '10–12', emoji: '🌱', color: 'foam', desc: 'Core assistant modules — persona, tools, principles, first projects' },
  intermediate: { range: [11, 20], name: 'Intermediate', label: 'Builder', ages: '12–14', emoji: '🔧', color: 'glow', desc: 'Extended modules — challenges, references, showcases, glossary' },
  advanced: { range: [21, 30], name: 'Advanced', label: 'Developer', ages: '14–16', emoji: '🎨', color: 'coral', desc: 'Gap-fill pass 1 — rigging, compositing, portfolio, styles' },
  expert: { range: [31, 40], name: 'Expert', label: 'Maker', ages: '15–17', emoji: '🏆', color: 'reef', desc: 'Gap-fill pass 2 — facial animation, effects, timing, accessibility' },
  capstone: { range: [41, 58], name: 'Capstone', label: 'Oceanographer', ages: '16–17', emoji: '🌊', color: 'surf', desc: 'Real-world motion — rotoscoping, physics, stop motion, photogrammetry' },
};

// Emoji map for ocean animals
const ANIMAL_EMOJIS = {
  'bottlenose dolphin': '🐬',
  'dolphin': '🐬',
  'octopus': '🐙',
  'jellyfish': '🪼',
  'green sea turtle': '🐢',
  'sea turtle': '🐢',
  'turtle': '🐢',
  'clownfish': '🐠',
  'anemonefish': '🐠',
  'whale shark': '🦈',
  'parrotfish': '🐡',
  'humpback whale': '🐋',
  'whale': '🐋',
  'manta ray': '🌊',
  'ray': '🌊',
  'coral reef ecosystem': '🪸',
  'coral reef': '🪸',
  'coral': '🪸',
};

function getTier(number) {
  for (const [key, tier] of Object.entries(TIERS)) {
    if (number >= tier.range[0] && number <= tier.range[1]) {
      return key;
    }
  }
  return 'capstone';
}

function findEmoji(animalName) {
  const lower = animalName.toLowerCase();
  for (const [key, emoji] of Object.entries(ANIMAL_EMOJIS)) {
    if (lower.includes(key)) return emoji;
  }
  return '🐠';
}

function extractField(raw, fieldName) {
  // Match **FieldName:** value
  const re = new RegExp('\\*\\*' + fieldName + ':\\*\\*\\s*(.+?)\\s*(?:\\n|$)', 'm');
  const m = raw.match(re);
  if (m) return m[1].replace(/`/g, '').trim();
  return '';
}

function extractSection(raw, startHeading, endHeading) {
  const startIdx = raw.indexOf('## ' + startHeading);
  if (startIdx === -1) return '';
  const afterStart = raw.slice(startIdx + startHeading.length + 3);
  const endIdx = afterStart.search(new RegExp('\\n## (?:' + endHeading + ')|\\n---'));
  const section = endIdx === -1 ? afterStart : afterStart.slice(0, endIdx);
  return section.trim();
}

function parseLesson(filePath, number) {
  const raw = fs.readFileSync(filePath, 'utf-8');

  // Extract title from first H1
  const titleMatch = raw.match(/^#\s+Lesson Plan\s+\d+:\s*(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : `Lesson ${number}`;

  // Extract metadata fields
  const moduleRef = extractField(raw, 'Module Reference');
  const duration = extractField(raw, 'Duration');
  const ageGroup = extractField(raw, 'Age Group');
  const codingTool = extractField(raw, 'Animation Tool') || extractField(raw, 'Coding Tool');

  // Extract Animal info
  const animalMatch = raw.match(/\*\*Animal:\*\*\s*(.+?)(?:\n|$)/m);
  let animalName = 'Ocean Creature';
  let animalSwahili = '';
  let animalScientific = '';

  if (animalMatch) {
    const line = animalMatch[1].trim();
    // Try to extract name before parentheses
    const nameMatch = line.match(/^([^(—]+?)(?:\s*\(|\s*—|$)/);
    if (nameMatch) {
      animalName = nameMatch[1].trim();
    }
    // Extract Swahili name
    const swahiliMatch = line.match(/(?:Swahili:|\*\*)([A-Za-z\s'\-]+)(?:\*\*|\)|in Swahili|$)/);
    if (swahiliMatch) {
      animalSwahili = swahiliMatch[1].trim();
    }
    // Extract scientific name from parentheses
    const sciMatch = line.match(/\(([A-Za-z\s]+)\)/);
    if (sciMatch) {
      animalScientific = sciMatch[1].trim();
    }
  }

  const emoji = findEmoji(animalName);

  // Extract Key Inquiry Question
  const inquiryMatch = raw.match(/## Key Inquiry Question\s*\n+>\s*(.+?)(?:\n\s*\n|\n---)/s);
  const inquiryQuestion = inquiryMatch ? inquiryMatch[1].replace(/\n>\s*/g, ' ').trim() : '';

  // Extract Learning Outcomes
  const outcomesSection = extractSection(raw, 'Learning Outcomes', 'Key Inquiry Question');
  const outcomes = [];
  if (outcomesSection) {
    const lines = outcomesSection.split('\n');
    for (const line of lines) {
      const m = line.match(/^\d+\.\s+(.+)/);
      if (m) outcomes.push(m[1].trim());
    }
  }

  // Extract resources
  const resourcesSection = extractSection(raw, 'Resources', 'Local Context');
  const resources = [];
  if (resourcesSection) {
    for (const line of resourcesSection.split('\n')) {
      const m = line.match(/^-\s+(.+)/);
      if (m) resources.push(m[1].trim());
    }
  }

  // Extract local context / animal info
  const contextSection = extractSection(raw, 'Local Context: Kenyan Ocean Animal', 'Lesson Development');
  let animalHabitat = '';
  let animalWhy = '';
  let conservationNote = '';
  if (contextSection) {
    const habMatch = contextSection.match(/\*\*Habitat:\*\*\s*(.+?)(?:\n\s*\n|\n\*\*|\n$)/s);
    animalHabitat = habMatch ? habMatch[1].replace(/\*\*/g, '').trim() : '';
    const whyMatch = contextSection.match(/\*\*Why this animal\?\*\*\s*(.+?)(?:\n\s*\n|\n\*\*|\n$)/s);
    animalWhy = whyMatch ? whyMatch[1].replace(/\*\*/g, '').trim() : '';
    const consMatch = contextSection.match(/\*\*Conservation note:\*\*\s*(.+?)(?:\n\s*\n|\n---|\n$)/s);
    conservationNote = consMatch ? consMatch[1].replace(/\*\*/g, '').trim() : '';
  }

  // Extract extended activity
  const extendedSection = extractSection(raw, 'Extended Activity', 'Differentiation');
  const extendedActivity = extendedSection ? extendedSection.trim() : '';

  // Check for assessment, differentiation, teacher reflection sections
  const hasAssessment = /## Assessment/.test(raw);
  const hasDifferentiation = /## Differentiation/.test(raw);
  const hasTeacherReflection = /## Teacher Reflection/.test(raw);

  // Slug from filename
  const fileName = path.basename(filePath, '.md');
  const slug = fileName; // e.g., lesson-01-system-persona

  return {
    number,
    slug,
    title,
    moduleRef,
    duration,
    ageGroup,
    codingTool,
    tier: getTier(number),
    animal: {
      name: animalName,
      swahili: animalSwahili,
      scientific: animalScientific,
      emoji,
      habitat: animalHabitat,
      why: animalWhy,
      conservation: conservationNote,
    },
    learningOutcomes: outcomes,
    inquiryQuestion,
    resources,
    extendedActivity,
    hasAssessment,
    hasDifferentiation,
    hasTeacherReflection,
    content: raw, // full markdown for rendering on lesson page
  };
}

function buildAnimalsData(lessons) {
  const animalMap = {};
  for (const lesson of lessons) {
    const key = `${lesson.animal.name}|${lesson.animal.swahili}`;
    if (!animalMap[key]) {
      animalMap[key] = {
        name: lesson.animal.name,
        swahili: lesson.animal.swahili,
        emoji: lesson.animal.emoji,
        lessons: [],
        conservation: lesson.animal.conservation,
        habitat: lesson.animal.habitat,
      };
    }
    animalMap[key].lessons.push({
      number: lesson.number,
      title: lesson.title,
      tier: lesson.tier,
      slug: lesson.slug,
    });
    if (lesson.animal.conservation && lesson.animal.conservation.length > (animalMap[key].conservation || '').length) {
      animalMap[key].conservation = lesson.animal.conservation;
    }
    if (lesson.animal.habitat && lesson.animal.habitat.length > (animalMap[key].habitat || '').length) {
      animalMap[key].habitat = lesson.animal.habitat;
    }
  }
  return Object.values(animalMap).sort((a, b) => a.name.localeCompare(b.name));
}

function main() {
  console.log('🌊 Animation Assistant — Building lesson data...');

  if (!fs.existsSync(SOURCE_LESSONS_DIR)) {
    console.log(`   ⚠ Source lessons not found at ${SOURCE_LESSONS_DIR}`);
    console.log(`   Using committed src/data/lessons.json instead.`);
    if (fs.existsSync(OUTPUT_FILE)) {
      console.log('   ✅ lessons.json already present — skipping rebuild.');
      return;
    }
    console.error(`❌ No source lessons and no pre-built lessons.json. Cannot proceed.`);
    process.exit(1);
  }

  const files = fs.readdirSync(SOURCE_LESSONS_DIR)
    .filter(f => /^lesson-\d+-.*\.md$/.test(f))
    .sort();

  console.log(`   Found ${files.length} lesson files`);

  const lessons = [];
  for (const file of files) {
    const match = file.match(/^lesson-(\d+)-/);
    if (!match) continue;
    const number = parseInt(match[1], 10);
    const lesson = parseLesson(path.join(SOURCE_LESSONS_DIR, file), number);
    lessons.push(lesson);
    console.log(`   ✓ Lesson ${String(number).padStart(2, '0')}: ${lesson.title} — ${lesson.animal.emoji} ${lesson.animal.name}`);
  }

  const animals = buildAnimalsData(lessons);
  const tiers = TIERS;

  const data = {
    lessons,
    animals,
    tiers,
    generatedAt: new Date().toISOString(),
    totalLessons: lessons.length,
    totalAnimals: animals.length,
  };

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2));

  console.log(`\n✅ Built ${lessons.length} lessons, ${animals.length} unique animals`);
  console.log(`   Output: ${OUTPUT_FILE}`);
}

main();
