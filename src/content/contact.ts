import type { ContactContent } from '@/types/content';

/**
 * Links with `value: null` render as non-interactive placeholders.
 */
export const contact: ContactContent = {
  heading: 'Let’s talk about what sits beneath the interface.',
  body: 'I am open to conversations about backend engineering, system design, and building maintainable software.',
  links: [
    { kind: 'email', label: 'Email', value: 'thanhnd15032002@gmail.com', placeholder: '[EMAIL]' },
    { kind: 'github', label: 'GitHub', value: 'https://github.com/thanhnd1503', placeholder: '[GITHUB_URL]' },
    {
      kind: 'linkedin',
      label: 'LinkedIn',
      value: 'https://www.linkedin.com/in/th%C3%A0nh-nguy%E1%BB%85n-%C4%91%E1%BA%A1t-5bb8ba259/',
      placeholder: '[LINKEDIN_URL]',
    },
    { kind: 'portfolio', label: 'Portfolio', value: 'https://thanhnd1503.github.io/My-portfolio/', placeholder: '[PORTFOLIO_URL]' },
  ],
};
