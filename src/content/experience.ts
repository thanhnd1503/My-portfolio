import type { ExperienceEntry, EducationEntry } from '@/types/content';

/**
 * TODO(owner): set `organization` if you want the employer name shown.
 */
export const experience: readonly ExperienceEntry[] = [
  {
    id: 'full-stack-developer',
    role: 'Full-Stack Developer',
    organization: null,
    period: { start: 'Dec 2023', end: 'present' },
    focus: 'Enterprise CRM, eCommerce and business applications',
    responsibilities: [
      'Developing and maintaining enterprise CRM applications.',
      'Building and maintaining RESTful APIs.',
      'Implementing authentication, Single Sign-On (SSO), and Role-Based Access Control (RBAC).',
      'Working with MariaDB and PostgreSQL, including investigating and optimizing database queries.',
      'Participating in legacy application modernization, including migration from PHP and AngularJS toward Node.js-based services.',
      'Developing features for sales management and application approval workflows.',
    ],
    technologies: ['Node.js', 'TypeScript', 'PHP', 'AngularJS', 'MariaDB', 'PostgreSQL'],
  },
];

export const education: readonly EducationEntry[] = [
  {
    id: 'fpt-university',
    institution: 'FPT University',
    programme: 'Software Engineering',
    status: 'Studied for approximately two years',
    credentialAwarded: false,
  },
  {
    id: 'codegym-saigon',
    institution: 'CodeGym Saigon',
    programme: 'Java Programming Bootcamp',
    status: 'Completed',
    credentialAwarded: false,
  },
];
