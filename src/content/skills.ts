import type { SkillCategory } from '@/types/content';

/**
 * Categories follow the owner's resume (Nov 2026).
 * `professional` is set where the resume's experience section shows the
 * technology in use, or where the owner confirmed it (Git, Claude Code).
 * Items left as `null` are listed without a label; AngularJS, PostgreSQL and
 * Prometheus & Grafana are intentionally unlabelled (owner's choice).
 */
export const skillCategories: readonly SkillCategory[] = [
  {
    id: 'languages',
    title: 'Languages & Runtimes',
    summary: 'The languages most of the day is spent in.',
    skills: [
      { name: 'Node.js', context: 'professional' },
      { name: 'TypeScript', context: 'professional' },
      { name: 'PHP', context: 'professional' },
      { name: 'SQL', context: 'professional' },
      { name: 'JavaScript (ES6+)', context: null },
      { name: 'HTML5 / SCSS', context: null },
    ],
  },
  {
    id: 'frameworks',
    title: 'Frameworks & Libraries',
    summary: 'Service frameworks on the backend, React-based interfaces on the front.',
    skills: [
      { name: 'NestJS', context: 'professional' },
      { name: 'Express.js', context: 'professional' },
      { name: 'React', context: 'professional' },
      { name: 'Next.js (App Router)', context: 'professional' },
      { name: 'CodeIgniter', context: null },
      { name: 'AngularJS', context: null },
    ],
  },
  {
    id: 'databases',
    title: 'Databases & Caching',
    summary: 'Relational data, query tuning, caching and search.',
    skills: [
      { name: 'MySQL', context: 'professional' },
      { name: 'MariaDB', context: 'professional' },
      { name: 'TypeORM', context: 'professional' },
      { name: 'Redis', context: null },
      { name: 'Elasticsearch', context: null },
      { name: 'Drizzle ORM', context: null },
      { name: 'PostgreSQL', context: null },
    ],
  },
  {
    id: 'architecture',
    title: 'Architecture & Security',
    summary: 'How services are shaped, and who is allowed to do what.',
    skills: [
      { name: 'RESTful APIs', context: 'professional' },
      { name: 'RBAC & SSO Authentication', context: 'professional' },
      { name: 'System Design', context: null },
      { name: 'Data Modeling', context: null },
      { name: 'Performance Optimization', context: null },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps & Observability',
    summary: 'Running services in production and seeing what they do.',
    skills: [
      { name: 'Linux', context: 'professional' },
      { name: 'PM2', context: 'professional' },
      { name: 'Apache (Reverse Proxy)', context: 'professional' },
      { name: 'Git', context: 'professional' },
      { name: 'Docker', context: null },
      { name: 'Nginx', context: null },
      { name: 'Prometheus & Grafana', context: null },
    ],
  },
  {
    id: 'operations',
    title: 'Operations & AI Tools',
    summary: 'Investigating incidents and changing live data safely.',
    skills: [
      { name: 'Root Cause Analysis', context: 'professional' },
      { name: 'DB Audit Logs', context: 'professional' },
      { name: 'EXPLAIN Query Tuning', context: 'professional' },
      { name: 'Production Troubleshooting', context: 'professional' },
      { name: 'Claude Code (AI Ops)', context: 'professional' },
    ],
  },
];

export const skillContextLabels = {
  professional: 'Used professionally',
  training: 'Formal training',
  personal: 'Personal projects',
  learning: 'Currently learning',
} as const;
