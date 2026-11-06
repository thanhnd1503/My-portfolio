/**
 * Content models for the portfolio.
 *
 * Rule: any field whose real value has not been provided by the owner is typed
 * as `T | null` (or an empty array) instead of being filled with invented data.
 * Presentation components must render `null` fields as omitted or as an
 * explicit placeholder, never as fabricated content.
 */

/** A value that may still be awaiting the owner's input. */
export type Pending<T> = T | null;

/** A period such as "Dec 2023 – Present". */
export interface Period {
  start: string;
  end: string | 'present';
}

export interface Profile {
  /** Preferred display name. `null` renders the placeholder label. */
  name: Pending<string>;
  /** Shown wherever `name` is still null. */
  namePlaceholder: string;
  title: string;
  /** Short split title used in the hero (e.g. two lines). */
  titleLines: readonly string[];
  positioning: string;
  location: string;
  concept: string;
  /** Concept split into display lines for the hero headline. */
  conceptLines: readonly string[];
  careerDirection: readonly string[];
}

export interface Statement {
  /** Large statement copy. Rendered as a single heading. */
  lead: string;
  /** Supporting paragraph under the statement. */
  body: string;
  /** Areas of practical focus. */
  focusAreas: readonly string[];
}

/**
 * How a technology has been used. Kept deliberately honest:
 * - professional: used in paid, production work (supported by the experience data)
 * - training:     learned through formal training (e.g. bootcamp)
 * - personal:     used in personal projects
 * - learning:     currently being learned
 * `null` = not yet classified by the owner; rendered without a label.
 */
export type SkillContext = 'professional' | 'training' | 'personal' | 'learning';

export interface Skill {
  name: string;
  context: Pending<SkillContext>;
}

export interface SkillCategory {
  id: string;
  title: string;
  summary: string;
  skills: readonly Skill[];
}

export interface ExperienceEntry {
  id: string;
  role: string;
  /** Employer name. `null` until the owner chooses to publish it. */
  organization: Pending<string>;
  period: Period;
  focus: string;
  responsibilities: readonly string[];
  technologies: readonly string[];
}

export interface EducationEntry {
  id: string;
  institution: string;
  programme: string;
  /** Plain-language status, e.g. "Completed" or "Studied for about two years". */
  status: string;
  /** Explicitly whether a credential was awarded. Never inferred. */
  credentialAwarded: boolean;
}

/** Whether a project was professional work or a personal/learning project. */
export type ProjectContext = 'professional' | 'personal';

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** true = generated stand-in (public/projects/*.svg). Replace with a real image. */
  placeholder?: boolean;
}

export interface GalleryItem {
  image: ProjectImage;
  caption: string;
  /** wide = full row; half = shares a row with the next half item (from tablet up). */
  layout: 'wide' | 'half';
}

export interface ArchitectureLayer {
  id: string;
  title: string;
  items: readonly string[];
}

export interface ArchitectureMigration {
  from: readonly string[];
  to: readonly string[];
  description: string;
}

/**
 * A simplified, verified overview of the technical landscape, grouped by layer.
 * Deliberately not a topology: it does not claim how components connect.
 */
export interface ArchitectureShowcase {
  intro: string;
  layers: readonly ArchitectureLayer[];
  migration: Pending<ArchitectureMigration>;
  disclaimer: string;
}

export interface ProjectSection {
  title: string;
  items: readonly string[];
}

export interface Project {
  slug: string;
  index: string;
  title: string;
  period: Period;
  context: Pending<ProjectContext>;
  /** One-line description used on cards. */
  summary: string;
  /** Owner-provided role on the project, if any. */
  role: Pending<string>;
  /** Verified technologies only. Empty = not yet provided. */
  stack: readonly string[];
  /** Verified focus areas / highlights. Empty = not yet provided. */
  highlights: readonly string[];
  /** Additional verified detail sections for the case page. */
  sections: readonly ProjectSection[];
  cover: Pending<ProjectImage>;
  /** Verified technical overview for the case page. `null` = section omitted. */
  architecture: Pending<ArchitectureShowcase>;
  /** Case page images. Empty = section omitted. */
  gallery: readonly GalleryItem[];
  /** Public URL of the live project, if the owner wants to share one. */
  url: Pending<string>;
}

export interface AboutContent {
  heading: string;
  paragraphs: readonly string[];
  principles: readonly string[];
  exploring: readonly string[];
}

export type ContactKind = 'email' | 'github' | 'linkedin' | 'portfolio';

export interface ContactLink {
  kind: ContactKind;
  label: string;
  /** Raw value (email address or URL). `null` renders the placeholder. */
  value: Pending<string>;
  placeholder: string;
}

export interface ContactContent {
  heading: string;
  body: string;
  links: readonly ContactLink[];
}

export interface NavItem {
  label: string;
  href: string;
}
