import type { Profile, Statement, AboutContent } from '@/types/content';

/** Identity & positioning. */
export const profile: Profile = {
  name: 'NGUYEN DAT THANH',
  namePlaceholder: 'Your Name',
  title: 'Full-Stack Developer | Backend-focused Software Engineer',
  titleLines: ['Full-Stack Developer', 'Backend-focused Software Engineer'],
  positioning:
    'A software engineer focused on building maintainable backend systems, designing reliable APIs, optimizing databases, and developing enterprise applications.',
  location: 'Ho Chi Minh City, Vietnam',
  careerDirection: ['Backend Engineering', 'Platform Engineering', 'Solution Architecture'],
};

export const statement: Statement = {
  lead: 'Most of the work that keeps software dependable happens beneath the interface — in the APIs, the data, and the decisions about structure.',
  body: 'I am a software engineer with practical experience across full-stack development and a growing focus on backend engineering and system architecture. Day to day, that means building and maintaining enterprise applications and solving the practical problems that come with them.',
  focusAreas: [
    'Building and maintaining enterprise applications',
    'Designing and developing RESTful APIs',
    'Working with relational databases and query optimization',
    'Modernizing legacy applications',
    'Understanding system architecture and maintainability',
    'Solving practical engineering problems',
  ],
};

export const about: AboutContent = {
  heading: 'How things work, underneath.',
  paragraphs: [
    'What interests me most in software is what happens after a button is pressed. How a request moves through a system — where it is validated, how data is shaped and stored, what happens when something fails — is the part of the work that holds my attention.',
    'My work so far has taken me across both backend and frontend development, mostly on enterprise business applications. Working on both sides has made me value clean architecture, code that the next person can maintain, and solutions that fit the actual problem rather than the most interesting one.',
    'Lately my attention has been moving further down the stack: toward infrastructure, distributed systems, system design, and platform engineering. I treat this as a long, deliberate path of learning, with the goal of eventually working as a Solution Architect.',
  ],
  principles: ['Clean architecture', 'Maintainable code', 'Practical solutions'],
  exploring: ['Infrastructure', 'Distributed systems', 'System design', 'Platform engineering'],
};
