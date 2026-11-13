import type { ExperienceEntry, EducationEntry } from '@/types/content';

/** Source of truth: the owner's resume (Nov 2026). */
export const experience: readonly ExperienceEntry[] = [
  {
    id: 'hanbiro-vn',
    role: 'Full-Stack / Backend Engineer',
    organization: 'Hanbiro VN',
    period: { start: 'Dec 2023', end: 'present' },
    focus:
      'Backend feature development, legacy modernization and production operations for enterprise CRM and automotive retail platforms serving Korean clients — Kolon Mobility Group, BMW Dongsung and National Motors.',
    responsibilities: [
      'Developed many new features, taking full ownership of each from start to finish.',
      'Modernized a legacy PHP / AngularJS dealer management system into a decoupled NestJS, TypeScript and React architecture.',
      'Built RESTful APIs, custom middleware, JWT-based RBAC authentication and scheduled jobs with NestJS and TypeORM on MariaDB / MySQL.',
      'Integrated third-party BMW dealer systems (WDMS) through REST APIs, with asynchronous queue processing and scheduled data synchronization.',
      'Ran deployments on Rocky Linux with PM2 behind an Apache reverse proxy, keeping staging and production separate; added Prometheus metrics and Grafana dashboards for API latency, throughput and error rates.',
      'Led production incident response and root cause analysis using application logs, database audit logs and MySQL binlog forensics.',
      'Carried out production-safe database work — EXPLAIN analysis, index tuning, collation alignment and batched execution — without service disruption.',
      'Wrote bilingual (Vietnamese – English) technical reports on impact, root causes and fixes for Korean stakeholders and management.',
      'Worked with Korean product teams to turn automotive workflows — car sales, trade-ins and leasing — into backend APIs and user interfaces.',
    ],
    technologies: ['Node.js', 'TypeScript', 'NestJS', 'Express.js', 'React', 'Next.js', 'MariaDB / MySQL', 'TypeORM', 'Rocky Linux', 'PM2', 'Prometheus', 'Grafana'],
  },
];

export const education: readonly EducationEntry[] = [
  {
    id: 'codegym-saigon',
    institution: 'CodeGym Saigon',
    programme: 'Java Bootcamp',
    period: '2022 – 2023',
    status: 'Programming fundamentals, web development, databases and object-oriented programming',
    credentialAwarded: false,
  },
  {
    id: 'fpt-university',
    institution: 'FPT University',
    programme: 'Software Engineering',
    period: '2020 – 2022',
    status: 'Undergraduate studies in information technology — completed core coursework',
    credentialAwarded: false,
  },
];
