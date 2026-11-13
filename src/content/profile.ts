import type { Profile, Statement, AboutContent } from '@/types/content';

/** Identity & positioning. Source of truth: the owner's resume (Nov 2026). */
export const profile: Profile = {
  name: 'NGUYEN DAT THANH',
  namePlaceholder: 'Your Name',
  title: 'Backend Engineer | Node.js · TypeScript · System Architecture',
  titleLines: ['Backend Engineer', 'Node.js · TypeScript · System Architecture'],
  positioning:
    'A backend engineer designing RESTful APIs, optimizing enterprise databases, securing systems with RBAC and SSO, and keeping production stable through careful troubleshooting and root cause analysis.',
  location: 'Ho Chi Minh City, Vietnam',
  careerDirection: ['Backend Engineering', 'Platform Engineering', 'Solution Architecture'],
  languages: [
    { name: 'Vietnamese', level: 'Native' },
    { name: 'English', level: 'Intermediate' },
  ],
};

export const statement: Statement = {
  lead: 'Most of the work that keeps software dependable happens beneath the interface — in the APIs, the data, and the decisions about structure.',
  body: 'I am a backend engineer at Hanbiro VN, working on enterprise CRM and automotive retail platforms for Korean clients. Day to day, that means building APIs, modernizing legacy systems, and keeping production stable — and explaining what went wrong, and why, when it is not.',
  focusAreas: [
    'Designing RESTful APIs and service architecture',
    'Modernizing legacy PHP / AngularJS platforms',
    'Database optimization and production-safe data operations',
    'Access control with RBAC and SSO',
    'Observability with Prometheus and Grafana',
    'Incident response and root cause analysis',
  ],
};

export const about: AboutContent = {
  heading: 'How things work, underneath.',
  paragraphs: [
    'What interests me most in software is what happens after a button is pressed. How a request moves through a system — where it is validated, how data is shaped and stored, what happens when something fails — is the part of the work that holds my attention.',
    'Most of my work is on enterprise platforms for Korean automotive clients, across both backend and frontend. Production work has taught me to value maintainable code, careful changes to live data, and clear written explanations — I write incident reports in both Vietnamese and English for Korean stakeholders. I also use AI tools such as Claude Code in day-to-day operations work.',
    'I am now extending my backend practice toward platform engineering and solution architecture: infrastructure, observability, and system design. I treat this as a long, deliberate path of learning, with the goal of eventually working as a Solution Architect.',
  ],
  principles: ['End-to-end ownership', 'Maintainable code', 'Production safety', 'Practical solutions'],
  exploring: ['Platform engineering', 'System design', 'Observability', 'Solution architecture'],
};
