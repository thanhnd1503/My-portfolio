import type { Project } from '@/types/content';

/**
 * Project images live in public/projects/<slug>/ as pre-optimised WebP files
 * (served as-is). UI screenshots use `fit: 'contain'` so they are shown whole,
 * and all client data in them is blurred before export.
 */

/**
 * Source of truth: the owner's resume (Nov 2026). Only resume facts are used;
 * the resume gives no per-project dates, so `period` is null and the client is
 * shown instead.
 * TODO(owner): add per-project dates if wanted.
 */
export const projects: readonly Project[] = [
  {
    slug: 'kmg-automotive-ecosystem',
    index: '01',
    title: 'KMG Automotive Ecosystem',
    period: null,
    client: 'Kolon Mobility Group',
    context: 'professional',
    summary:
      'Kolon Mobility Group’s certified used-car e-commerce platform and its connected trade-in, rent and CRM modules, built with NestJS, Express.js, Next.js and MariaDB.',
    role: 'Full-Stack / Backend Engineer',
    stack: ['NestJS', 'Express.js', 'Next.js (App Router)', 'MariaDB'],
    highlights: ['E-commerce', 'Trade-in', 'Rent', 'CRM'],
    sections: [
      {
        title: 'Platforms',
        items: [
          'Co-developed the E-commerce platform for certified used cars — vehicle listings, vehicle detail pages and photo galleries — alongside the Trade-in (used-car purchase), Rent and CRM modules, using NestJS, Express.js, Next.js (App Router) and MariaDB.',
        ],
      },
      {
        title: 'Collaboration',
        items: [
          'Worked closely with Korean product teams to turn automotive workflows — end-to-end car sales, trade-ins and leasing — into backend APIs and user interfaces.',
        ],
      },
    ],
    cover: {
      src: '/projects/kmg-automotive-ecosystem/cover.webp',
      alt: 'Kolon certified used-car e-commerce site: vehicle listing cards and promotion banners; listing data blurred',
      width: 1904,
      height: 955,
      fit: 'contain',
    },
    architecture: {
      intro: 'One ecosystem led by the used-car e-commerce platform, with several products sharing a common stack.',
      layers: [
        { id: 'products', title: 'Products', items: ['E-commerce', 'Trade-in', 'Rent', 'CRM'] },
        { id: 'interface', title: 'Interface', items: ['Next.js (App Router)'] },
        { id: 'application', title: 'Application & APIs', items: ['NestJS', 'Express.js'] },
        { id: 'data', title: 'Data', items: ['MariaDB'] },
      ],
      migration: null,
      disclaimer: 'Simplified overview grouped by layer — not a complete system diagram.',
    },
    // Real screenshots, shown whole (fit: 'contain'); all data is blurred — only the UI is visible.
    gallery: [
      {
        image: {
          src: '/projects/kmg-automotive-ecosystem/product-detail.webp',
          alt: 'Vehicle detail page of the used-car e-commerce site: photo gallery, inspection summary and price panel; vehicle data blurred',
          width: 1899,
          height: 959,
          fit: 'contain',
        },
        caption: 'E-commerce — vehicle detail page with photo gallery, history summary and purchase panel. Data blurred.',
        layout: 'wide',
      },
      {
        image: {
          src: '/projects/kmg-automotive-ecosystem/photo-viewer.webp',
          alt: 'Full-screen vehicle photo viewer with thumbnail strip; licence plates blurred',
          width: 1911,
          height: 959,
          fit: 'contain',
        },
        caption: 'E-commerce — full-screen vehicle photo viewer. Licence plates blurred.',
        layout: 'wide',
      },
      {
        image: {
          src: '/projects/kmg-automotive-ecosystem/settlement.webp',
          alt: 'Back-office vehicle settlement screen: contract list with payment details panel; all data blurred',
          width: 1917,
          height: 946,
          fit: 'contain',
        },
        caption: 'Back office — vehicle settlement and payment tracking. All data blurred.',
        layout: 'wide',
      },
    ],
    url: null,
  },
  {
    slug: 'bmw-national-motors-crm',
    index: '02',
    title: 'BMW Dongsung & National Motors CRM',
    period: null,
    client: 'BMW Dongsung · National Motors',
    context: 'professional',
    summary:
      'Enterprise CRM for automotive dealers — customers, car sales, contracts and financial accounting — integrated with BMW dealer systems.',
    role: 'Full-Stack / Backend Engineer',
    stack: ['RESTful APIs', 'WDMS integration', 'Async queues', 'Scheduled jobs', 'RBAC', 'MySQL'],
    highlights: ['CRM modules', 'Third-party integration', 'Incident response & RCA', 'Production-safe data work'],
    sections: [
      {
        title: 'CRM modules',
        items: [
          'Maintained and extended CRM modules for customer management, car sales, contracts, financial accounting and multi-tier branch / team data scoping (RBAC).',
        ],
      },
      {
        title: 'Integration',
        items: [
          'Integrated third-party BMW dealer management systems (WDMS) via REST APIs, with asynchronous queue processing and scheduled jobs for data synchronization and automated compliance handling.',
        ],
      },
      {
        title: 'Incident response',
        items: [
          'Led production incident response and root cause analysis, investigating data discrepancies with Linux application logs, database audit logs and MySQL binlog forensics.',
          'Wrote bilingual (Vietnamese – English) reports on impact, root causes and fixes for Korean stakeholders and management.',
        ],
      },
      {
        title: 'Database operations',
        items: [
          'Ran production-safe database operations: optimized SQL with EXPLAIN analysis, index tuning, collation alignment and batched execution to verify data integrity without service disruption.',
        ],
      },
    ],
    cover: {
      src: '/projects/bmw-national-motors-crm/cover.webp',
      alt: 'National Motors sales CRM: completed quotes and orders list; all data blurred',
      width: 1911,
      height: 956,
      fit: 'contain',
    },
    architecture: {
      intro: 'The parts of the CRM I work on, grouped by concern.',
      layers: [
        { id: 'domain', title: 'Business domains', items: ['Customer management', 'Car sales', 'Contracts', 'Financial accounting'] },
        { id: 'access', title: 'Access control', items: ['RBAC', 'Branch / team data scoping'] },
        { id: 'integration', title: 'Integration', items: ['BMW WDMS (REST)', 'Async queue processing', 'Scheduled sync jobs'] },
        { id: 'data', title: 'Data', items: ['MySQL', 'EXPLAIN & index tuning', 'Batched execution'] },
        { id: 'operations', title: 'Operations', items: ['Application logs', 'DB audit logs', 'Binlog forensics', 'Root cause analysis'] },
      ],
      migration: null,
      disclaimer: 'Simplified overview grouped by concern — not a complete system diagram.',
    },
    // Real screenshots, shown whole (fit: 'contain'); all data is blurred — only the UI is visible.
    gallery: [
      {
        image: {
          src: '/projects/bmw-national-motors-crm/order-detail.webp',
          alt: 'CRM order detail: sales and pricing fields, customer panel, workflow actions and assigned rep; all data blurred',
          width: 1918,
          height: 952,
          fit: 'contain',
        },
        caption: 'Order detail — pricing, customer information, approval and contract actions. All data blurred.',
        layout: 'wide',
      },
      {
        image: {
          src: '/projects/bmw-national-motors-crm/permission.webp',
          alt: 'CRM permission settings: per-team workflow permissions and change log; names and dates blurred',
          width: 1920,
          height: 955,
          fit: 'contain',
        },
        caption: 'Permission settings — workflow permissions per team, with an audit log of changes. Names blurred.',
        layout: 'wide',
      },
    ],
    url: null,
  },
  {
    slug: 'bmw-dongsung-dms',
    index: '03',
    title: 'BMW Dongsung DMS Renewal',
    period: null,
    client: 'BMW Dongsung',
    context: 'professional',
    summary:
      'Renewal of a dealer management system: a legacy PHP / AngularJS monolith rebuilt as a decoupled NestJS, TypeScript and React platform.',
    role: 'Full-Stack / Backend Engineer',
    stack: [
      'NestJS',
      'TypeScript',
      'React (Ant Design)',
      'TypeORM',
      'MariaDB / MySQL',
      'JWT · RBAC',
      'Rocky Linux',
      'PM2',
      'Apache',
      'Prometheus',
      'Grafana',
    ],
    highlights: ['Legacy modernization', 'API & access control', 'Deployment & operations', 'Observability'],
    sections: [
      {
        title: 'Modernization',
        items: [
          'Modernized the legacy monolithic platform (PHP / AngularJS) into a decoupled architecture using NestJS, TypeScript and React (Ant Design).',
        ],
      },
      {
        title: 'Backend',
        items: [
          'Built RESTful APIs, custom middleware, JWT-based RBAC authentication and automated cron jobs with NestJS and TypeORM on MariaDB / MySQL.',
        ],
      },
      {
        title: 'Operations',
        items: [
          'Managed deployments and stability on Rocky Linux using PM2 (with pm2-logrotate) behind an Apache reverse proxy, with strict separation between staging and production.',
        ],
      },
      {
        title: 'Observability & security',
        items: [
          'Integrated Prometheus metrics into the NestJS services and built Grafana dashboards for API latency, throughput and error rates.',
          'Restricted sensitive endpoints by IP.',
        ],
      },
    ],
    cover: {
      src: '/projects/bmw-dongsung-dms/cover.webp',
      alt: 'BMW Dongsung DMS stock management screen with the automatic allocation confirmation dialog open; all data blurred',
      width: 1918,
      height: 948,
      fit: 'contain',
    },
    architecture: {
      intro:
        'The renewed platform, grouped by layer. It replaces a legacy PHP / AngularJS monolith with decoupled NestJS services and a React interface.',
      layers: [
        { id: 'interface', title: 'Interface', items: ['React', 'Ant Design'] },
        { id: 'application', title: 'Application & APIs', items: ['NestJS', 'TypeScript', 'RESTful APIs', 'Custom middleware', 'Cron jobs'] },
        { id: 'access', title: 'Identity & access', items: ['JWT authentication', 'RBAC', 'IP-restricted endpoints'] },
        { id: 'data', title: 'Data', items: ['TypeORM', 'MariaDB / MySQL'] },
        { id: 'runtime', title: 'Runtime & delivery', items: ['Rocky Linux', 'PM2 + pm2-logrotate', 'Apache reverse proxy', 'Staging / production separation'] },
        { id: 'observability', title: 'Observability', items: ['Prometheus metrics', 'Grafana dashboards', 'Latency · throughput · error rates'] },
      ],
      migration: {
        from: ['PHP', 'AngularJS'],
        to: ['NestJS', 'TypeScript', 'React'],
        description: 'A legacy monolith rebuilt as a decoupled backend and frontend.',
      },
      disclaimer: 'Simplified overview grouped by layer — not a complete system diagram.',
    },
    // Real screenshots, shown whole (fit: 'contain'); all data is blurred — only the UI is visible.
    gallery: [
      {
        image: {
          src: '/projects/bmw-dongsung-dms/dashboard.webp',
          alt: 'BMW Dongsung DMS sales dashboard with monthly targets, contracts and deliveries by branch; all figures blurred',
          width: 1922,
          height: 948,
          fit: 'contain',
        },
        caption: 'Sales dashboard — monthly targets, contracts and deliveries by branch. All data blurred.',
        layout: 'wide',
      },
      {
        image: {
          src: '/projects/bmw-dongsung-dms/rbac.webp',
          alt: 'BMW Dongsung DMS permission screen: user groups and per-menu create, read, update and delete permissions; group and user names blurred',
          width: 1909,
          height: 952,
          fit: 'contain',
        },
        caption: 'Role-based access control — CRUD permissions per menu, assigned to user groups. Group and user names blurred.',
        layout: 'wide',
      },
    ],
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
