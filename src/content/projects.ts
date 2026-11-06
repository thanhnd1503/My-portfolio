import type { GalleryItem, Project, ProjectImage } from '@/types/content';

/**
 * Placeholder images live in public/projects/<slug>/. To use a real image,
 * drop the file in that folder (any format), update `src`, `width`, `height`
 * and `alt`, and remove `placeholder: true`.
 */
function placeholder(slug: string, file: string, title: string, width: number, height: number): ProjectImage {
  return {
    src: `/projects/${slug}/${file}.svg`,
    alt: `Placeholder image for ${title} — to be replaced with a project screenshot`,
    width,
    height,
    placeholder: true,
  };
}

function placeholderGallery(
  slug: string,
  title: string,
  items: readonly { file: string; layout: GalleryItem['layout'] }[],
): GalleryItem[] {
  return items.map(({ file, layout }) => ({
    image: placeholder(slug, file, title, layout === 'wide' ? 1600 : 1200, layout === 'wide' ? 900 : 1200),
    caption: 'Placeholder — replace with a project screenshot and caption.',
    layout,
  }));
}

/**
 * Only verified details are listed. Empty arrays / `null` fields are omitted
 * by the UI rather than filled with invented content.
 * TODO(owner): add role, stack, highlights, context and architecture for projects 02 and 03,
 * and replace all placeholder images.
 */
export const projects: readonly Project[] = [
  {
    slug: 'enterprise-crm',
    index: '01',
    title: 'Enterprise CRM',
    period: { start: 'Dec 2023', end: 'present' },
    context: 'professional',
    summary:
      'An enterprise CRM system supporting business workflows, sales management, and application approval processes.',
    role: 'Full-Stack Developer',
    stack: [
      'Node.js',
      'TypeScript',
      'PHP',
      'AngularJS',
      'MariaDB / PostgreSQL',
      'Authentication & SSO',
      'RBAC',
      'RESTful APIs',
    ],
    highlights: ['Backend development', 'System integration', 'Database operations', 'Legacy modernization'],
    sections: [
      {
        title: 'Backend & integration',
        items: [
          'Building and maintaining RESTful APIs for CRM business workflows.',
          'Implementing authentication, Single Sign-On (SSO), and Role-Based Access Control (RBAC).',
        ],
      },
      {
        title: 'Data',
        items: ['Working with MariaDB and PostgreSQL, including investigating and optimizing database queries.'],
      },
      {
        title: 'Modernization',
        items: ['Participating in the migration of PHP and AngularJS components toward Node.js-based services.'],
      },
      {
        title: 'Business features',
        items: ['Developing features for sales management and application approval workflows.'],
      },
    ],
    cover: placeholder('enterprise-crm', 'cover', 'Enterprise CRM', 1600, 1000),
    architecture: {
      intro:
        'The technologies I work with on this system, grouped by the layer they belong to. The system is in an ongoing transition from legacy PHP and AngularJS toward Node.js-based services.',
      layers: [
        { id: 'domain', title: 'Business domains', items: ['Sales management', 'Application approval workflows', 'Business workflows'] },
        { id: 'interface', title: 'Interface', items: ['AngularJS'] },
        { id: 'application', title: 'Application & APIs', items: ['RESTful APIs', 'Node.js / TypeScript services', 'PHP (legacy)'] },
        { id: 'access', title: 'Identity & access', items: ['Authentication', 'Single Sign-On (SSO)', 'Role-Based Access Control (RBAC)'] },
        { id: 'data', title: 'Data', items: ['MariaDB', 'PostgreSQL', 'Query investigation & optimization'] },
      ],
      migration: {
        from: ['PHP', 'AngularJS'],
        to: ['Node.js-based services'],
        description: 'Participating in the gradual migration of legacy parts of the application toward Node.js-based services.',
      },
      disclaimer: 'Simplified overview grouped by layer — not a complete system diagram.',
    },
    gallery: placeholderGallery('enterprise-crm', 'Enterprise CRM', [
      { file: 'gallery-1', layout: 'wide' },
      { file: 'gallery-2', layout: 'half' },
      { file: 'gallery-3', layout: 'half' },
    ]),
    url: null,
  },
  {
    slug: 'car-rental-platform',
    index: '02',
    title: 'Car Rental Platform',
    period: { start: 'Dec 2023', end: 'present' },
    context: null,
    summary: 'A car rental application involving full-stack development and business application workflows.',
    role: null,
    stack: [],
    highlights: ['Full-stack development', 'Business application workflows'],
    sections: [],
    cover: placeholder('car-rental-platform', 'cover', 'Car Rental Platform', 1600, 1000),
    architecture: null,
    gallery: placeholderGallery('car-rental-platform', 'Car Rental Platform', [
      { file: 'gallery-1', layout: 'half' },
      { file: 'gallery-2', layout: 'half' },
    ]),
    url: null,
  },
  {
    slug: 'kmg-kolon-homepage',
    index: '03',
    title: 'KMG Kolon Homepage',
    period: { start: '2024', end: 'present' },
    context: null,
    summary: 'A corporate website project involving web development and maintenance.',
    role: null,
    stack: [],
    highlights: ['Web development', 'Maintenance'],
    sections: [],
    cover: placeholder('kmg-kolon-homepage', 'cover', 'KMG Kolon Homepage', 1600, 1000),
    architecture: null,
    gallery: placeholderGallery('kmg-kolon-homepage', 'KMG Kolon Homepage', [
      { file: 'gallery-1', layout: 'wide' },
      { file: 'gallery-2', layout: 'half' },
    ]),
    url: null,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Previous / next project, wrapping around. `null` when there is only one project. */
export function getAdjacentProjects(slug: string): { previous: Project; next: Project } | null {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1 || projects.length < 2) return null;
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  return previous && next ? { previous, next } : null;
}
