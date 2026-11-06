import type { SkillCategory } from '@/types/content';

/**
 * Skill context is only set where it is supported by the experience/education
 * data. Items left as `null` have not been classified by the owner yet.
 * TODO(owner): classify the `null` items as 'professional' | 'personal' | 'learning'.
 */
export const skillCategories: readonly SkillCategory[] = [
  {
    id: 'backend',
    title: 'Backend Development',
    summary: 'Services, APIs, and the business logic behind enterprise applications.',
    skills: [
      { name: 'Node.js', context: 'professional' },
      { name: 'TypeScript', context: 'professional' },
      { name: 'PHP', context: 'professional' },
      { name: 'RESTful API Design', context: 'professional' },
      { name: 'Java', context: 'training' },
      { name: 'Spring Boot', context: 'training' },
    ],
  },
  {
    id: 'database',
    title: 'Database Engineering',
    summary: 'Relational data modelling, querying, and performance investigation.',
    skills: [
      { name: 'MariaDB', context: 'professional' },
      { name: 'PostgreSQL', context: 'professional' },
      { name: 'SQL', context: 'professional' },
      { name: 'Query Optimization', context: 'professional' },
      { name: 'Database Design', context: null },
    ],
  },
  {
    id: 'infrastructure',
    title: 'Infrastructure & Engineering',
    summary: 'The tooling and cross-cutting concerns that keep systems running.',
    skills: [
      { name: 'Authentication & Authorization', context: 'professional' },
      { name: 'API Integration', context: 'professional' },
      { name: 'Linux', context: null },
      { name: 'Docker', context: null },
      { name: 'Git', context: null },
      { name: 'System Troubleshooting', context: null },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend Development',
    summary: 'Interfaces for business applications, from legacy to modern frameworks.',
    skills: [
      { name: 'AngularJS', context: 'professional' },
      { name: 'React.js', context: null },
      { name: 'Next.js', context: null },
    ],
  },
];

export const skillContextLabels = {
  professional: 'Used professionally',
  training: 'Formal training',
  personal: 'Personal projects',
  learning: 'Currently learning',
} as const;
