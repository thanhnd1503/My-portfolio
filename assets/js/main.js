/**
 * Nguyễn Đạt Thành - Editorial Portfolio Scripts
 * Handles: Bilingual i18n (VI/EN), Theme Toggle, Reading Progress, 
 *          ScrollSpy Section Tracker, Copy Email Toast, and CV Modal.
 */

// =========================================================
// I18N TRANSLATION DICTIONARY
// =========================================================
const i18n = {
  vi: {
    // Navigation
    navOverview: 'Tổng quan',
    navSkills: 'Kỹ năng',
    navCaseStudy: 'Case Study',
    navContact: 'Liên hệ',
    trackerOverview: 'Tổng quan',
    trackerSkills: '01. Kỹ năng',
    trackerCaseStudy: '02. Case Study',
    trackerContact: '03. Liên hệ',

    // Hero Section
    heroLocation: 'TP. Hồ Chí Minh, Việt Nam',
    heroStatusBadge: '● Sẵn sàng cho cơ hội mới',
    heroExperienceBadge: '3 Năm Kinh Nghiệm',
    heroSubtitle: 'Fullstack Software Engineer',
    heroPitch: '“Kiến trúc &amp; phát triển <strong>giải pháp số CRM mới toàn diện</strong> song hành cùng thế mạnh <strong>hiện đại hóa hệ thống cũ (Legacy Modernization)</strong>, tối ưu hóa <strong>MariaDB &amp; NestJS</strong> và tư duy <strong>UI/UX High-Density</strong>.”',
    ctaSkills: 'Xem Kỹ Năng',
    ctaCaseStudy: 'Dự Án Giải Pháp CRM Mới',
    ctaViewCV: 'Xem CV (PDF)',
    ctaCopyEmail: 'Sao chép Email',

    // Section 1: Skills
    skillsSectionHeader: '01 / Kỹ Năng Kỹ Thuật & Stack Chuyên Sâu',
    skillsSectionCore: 'Core Capabilities',
    skill1Title: 'Frontend Engineering',
    skill1Desc: 'Next.js App Router, React Server Components, Tailwind CSS, TanStack Table. Thiết kế giao diện mật độ cao (High-Density UI) và Optimistic UI updates.',
    skill2Title: 'Backend & Architecture',
    skill2Desc: 'NestJS, Node.js, Clean Architecture & DDD. Kiến trúc giải pháp số CRM mới từ đầu lẫn hiện đại hóa hệ thống. Hàng đợi BullMQ, cơ chế Idempotent Webhooks.',
    skill3Title: 'Database & Optimization',
    skill3Desc: 'MariaDB/MySQL: Composite Indexing, JSON storage & query tuning loại bỏ Full Table Scan.',

    // Section 2: Case Study
    csSectionHeader: '02 / Featured Case Study',
    csSectionMarket: 'Thị Trường Ô Tô Hàn Quốc',
    csBadge1: '★ Giải Pháp Số CRM Mới Toàn Diện',
    csBadge2: 'Thay thế nền tảng cũ',
    csDesc: 'Xây dựng nền tảng giải pháp số CRM mới hoàn toàn từ đầu (<code class="font-mono text-xs bg-neutral-200/70 dark:bg-neutral-800 px-1 py-0.5 rounded">Next.js + NestJS + MariaDB</code>), thay thế triệt để hệ thống nguyên khối cũ <code class="font-mono text-xs bg-neutral-200/70 dark:bg-neutral-800 px-1 py-0.5 rounded">Angular + PHP</code> và số hóa 100% nghiệp vụ phân phối xe cho chuỗi đại lý bán lẻ ô tô tại Hàn Quốc.',
    csPoint1Title: '⚡ Tối ưu truy vấn MariaDB & JSON Storage:',
    csPoint1Desc: 'Lập Composite Indexes trên bộ <code class="font-mono text-[10px] bg-neutral-200 dark:bg-neutral-800 px-1 rounded">(status, model_code, created_at)</code>, loại bỏ quét toàn bảng, cắt giảm 85% tải đĩa.',
    csPoint2Title: '🔒 Triệt tiêu tranh chấp cọc xe (Row Lock & ACID):',
    csPoint2Desc: 'Khóa dòng (Row-Level Locking với SELECT FOR UPDATE) và giao dịch ACID độc quyền giữ số VIN khi cọc, triệt tiêu 100% lỗi bán trùng xe giữa các showroom.',
    csPoint3Title: '📦 Xử lý dữ liệu lớn (BullMQ + Node Streams):',
    csPoint3Desc: 'Import/Export 10.000+ bản ghi qua hàng đợi bất đồng bộ và streaming data, loại bỏ hoàn toàn lỗi tràn bộ nhớ (OOM).',
    csPoint4Title: '📊 Tải Dashboard tức thì (Query Optimization):',
    csPoint4Desc: 'Tối ưu hóa câu truy vấn tổng hợp và Composite Index cho báo cáo KPI/doanh thu đại lý, đưa thời gian phản hồi API từ ~4.2s xuống < 60ms.',

    // Section 3: Contact & Footer
    contactSectionTag: '03 / Kết Nối',
    contactTitle: 'Sẵn sàng đồng hành cùng dự án của bạn.',
    contactDesc: 'Trao đổi về cơ hội Fullstack, Modernization hệ thống doanh nghiệp hoặc tư vấn kiến trúc UI/UX & cơ sở dữ liệu.',
    contactSendEmail: 'Gửi Email',
    contactCopyEmail: 'Sao chép Email',
    contactViewPDF: 'Xem / Tải PDF',
    colophon: '© 2026 Nguyễn Đạt Thành. Minimalist & Editorial Portfolio.',
    backToTop: 'Về đầu trang ↑',

    // Toast
    toastCopied: 'Đã sao chép email: ',

    // CV Modal
    cvPreviewTag: 'Curriculum Vitae Preview',
    cvLocation: 'Fullstack Software Engineer • TP. Hồ Chí Minh',
    cvSummaryTitle: 'Tóm Tắt Năng Lực Cốt Lõi',
    cvSummaryText: '3 năm kinh nghiệm thực chiến phát triển các hệ thống web doanh nghiệp quy mô lớn. Chuyên sâu về kiến trúc giải pháp số CRM mới toàn diện từ con số 0 song hành cùng hiện đại hóa hệ thống cũ (Legacy Modernization), tối ưu hóa MariaDB (Composite Indexing, JSON storage) & kiến trúc NestJS, kết hợp tư duy UI/UX High-Density trực quan phục vụ thị trường Hàn Quốc.',
    cvProjectTitle: 'Dự Án Trọng Tâm',
    cvProjectName: 'Automotive Retail CRM & Digital Solution Platform (Hàn Quốc)',
    cvProjectSubtitle: 'Next.js, NestJS, MariaDB, BullMQ — Giải Pháp Số Mới Từ Con Số 0',
    cvProjectDesc: 'Xây dựng giải pháp số CRM mới hoàn toàn từ đầu với Next/Nest để số hóa toàn diện quy trình đại lý và thay thế triệt để hệ thống PHP/Angular cũ. Loại bỏ 100% xung đột giữ cọc qua Row-Level Lock & giao dịch ACID.',
    cvTechStackTitle: 'Tech Stack Phục Vụ Doanh Nghiệp',
    cvTechStack1: '<strong>Frontend:</strong> Next.js (App Router), React, TypeScript, Tailwind CSS, shadcn/ui, Optimistic UI.',
    cvTechStack2: '<strong>Backend:</strong> NestJS, Node.js, Clean Architecture, Domain-Driven Design, BullMQ.',
    cvTechStack3: '<strong>Database & Systems:</strong> MariaDB (Composite Indexing, JSON storage, Query Tuning), Docker.',
    cvCloseBtn: 'Đóng lại',
    cvPrintBtn: 'In hoặc Lưu PDF (Ctrl+P)'
  },
  en: {
    // Navigation
    navOverview: 'Overview',
    navSkills: 'Skills',
    navCaseStudy: 'Case Study',
    navContact: 'Contact',
    trackerOverview: 'Overview',
    trackerSkills: '01. Skills',
    trackerCaseStudy: '02. Case Study',
    trackerContact: '03. Contact',

    // Hero Section
    heroLocation: 'Ho Chi Minh City, Vietnam',
    heroStatusBadge: '● Open for opportunities',
    heroExperienceBadge: '3+ Years Experience',
    heroSubtitle: 'Fullstack Software Engineer',
    heroPitch: '“Architecting &amp; developing <strong>end-to-end digital CRM solutions from scratch</strong> paired with proven expertise in <strong>Legacy Modernization</strong>, high-performance <strong>MariaDB &amp; NestJS</strong>, and intuitive <strong>High-Density UI/UX</strong>.”',
    ctaSkills: 'View Skills',
    ctaCaseStudy: 'Featured CRM Project',
    ctaViewCV: 'View CV (PDF)',
    ctaCopyEmail: 'Copy Email',

    // Section 1: Skills
    skillsSectionHeader: '01 / Technical Proficiency & Core Stack',
    skillsSectionCore: 'Core Capabilities',
    skill1Title: 'Frontend Engineering',
    skill1Desc: 'Next.js App Router, React Server Components, Tailwind CSS, TanStack Table. High-Density UI design and Optimistic UI updates.',
    skill2Title: 'Backend & Architecture',
    skill2Desc: 'NestJS, Node.js, Clean Architecture & DDD. Architecting greenfield CRM solutions alongside legacy modernization. BullMQ queues, Idempotent Webhooks.',
    skill3Title: 'Database & Optimization',
    skill3Desc: 'MariaDB/MySQL: Composite Indexing, JSON storage & query tuning eliminating Full Table Scans.',

    // Section 2: Case Study
    csSectionHeader: '02 / Featured Case Study',
    csSectionMarket: 'South Korean Automotive Market',
    csBadge1: '★ End-to-End Greenfield CRM Solution',
    csBadge2: 'Legacy Platform Replacement',
    csDesc: 'Engineered a brand-new digital CRM platform from scratch (<code class="font-mono text-xs bg-neutral-200/70 dark:bg-neutral-800 px-1 py-0.5 rounded">Next.js + NestJS + MariaDB</code>), completely replacing a legacy monolithic <code class="font-mono text-xs bg-neutral-200/70 dark:bg-neutral-800 px-1 py-0.5 rounded">Angular + PHP</code> system and digitizing 100% vehicle dealership workflows across South Korea.',
    csPoint1Title: '⚡ MariaDB Query Tuning & JSON Storage:',
    csPoint1Desc: 'Designed Composite Indexes on <code class="font-mono text-[10px] bg-neutral-200 dark:bg-neutral-800 px-1 rounded">(status, model_code, created_at)</code>, eliminating full table scans and reducing disk I/O load by 85%.',
    csPoint2Title: '🔒 Zero Deposit Conflicts (Row Lock & ACID):',
    csPoint2Desc: 'Leveraged Row-Level Locking (SELECT FOR UPDATE) and atomic ACID transactions to lock VIN reservations, eliminating 100% cross-dealership double-booking race conditions.',
    csPoint3Title: '📦 High-Throughput Ingestion (BullMQ + Node Streams):',
    csPoint3Desc: 'Streamed 10,000+ batch records via asynchronous background job queues and Node streams, completely eliminating Out-Of-Memory (OOM) crashes.',
    csPoint4Title: '📊 Instant KPI Dashboard Load (Query Optimization):',
    csPoint4Desc: 'Optimized complex aggregation pipelines and composite index coverage for dealership metrics, slashing API response times from ~4.2s to under 60ms.',

    // Section 3: Contact & Footer
    contactSectionTag: '03 / Connect',
    contactTitle: 'Ready to build high-impact systems together.',
    contactDesc: 'Open for Fullstack engineering opportunities, enterprise system modernization, or UI/UX and database performance consulting.',
    contactSendEmail: 'Send Email',
    contactCopyEmail: 'Copy Email',
    contactViewPDF: 'View / Download PDF',
    colophon: '© 2026 Nguyen Dat Thanh. Minimalist & Editorial Portfolio.',
    backToTop: 'Back to top ↑',

    // Toast
    toastCopied: 'Copied email to clipboard: ',

    // CV Modal
    cvPreviewTag: 'Curriculum Vitae Preview',
    cvLocation: 'Fullstack Software Engineer • Ho Chi Minh City',
    cvSummaryTitle: 'Executive Summary',
    cvSummaryText: '3 years of hands-on experience building enterprise-grade web platforms. Specialized in architecting greenfield CRM solutions from scratch alongside legacy modernization, MariaDB optimization (Composite Indexing, JSON storage), NestJS architecture, and high-density UI/UX designed for the South Korean market.',
    cvProjectTitle: 'Featured Project',
    cvProjectName: 'Automotive Retail CRM & Digital Solution Platform (South Korea)',
    cvProjectSubtitle: 'Next.js, NestJS, MariaDB, BullMQ — Greenfield Digital Solution',
    cvProjectDesc: 'Built an end-to-end digital CRM from the ground up with Next/Nest to digitize retail distribution workflows, completely phasing out a legacy PHP/Angular monolith. Eliminated 100% reservation race conditions via Row-Level Locking & ACID transactions.',
    cvTechStackTitle: 'Enterprise Tech Stack',
    cvTechStack1: '<strong>Frontend:</strong> Next.js (App Router), React, TypeScript, Tailwind CSS, shadcn/ui, Optimistic UI.',
    cvTechStack2: '<strong>Backend:</strong> NestJS, Node.js, Clean Architecture, Domain-Driven Design, BullMQ.',
    cvTechStack3: '<strong>Database & Systems:</strong> MariaDB (Composite Indexing, JSON storage, Query Tuning), Docker.',
    cvCloseBtn: 'Close',
    cvPrintBtn: 'Print or Save PDF (Ctrl+P)'
  }
};

let currentLang = 'vi';
let updateScrollSpyLanguage = null;

// =========================================================
// APPLICATION INITIALIZATION
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  initTheme();
  initReadingProgress();
  initScrollSpy();
  initEmailCopy();
  initCvModal();
});

/* ---------------------------------------------------------
 * 0. BILINGUAL LANGUAGE SYSTEM (VI / EN)
 * --------------------------------------------------------- */
function initLanguage() {
  const savedLang = localStorage.getItem('editorial-lang');
  currentLang = savedLang === 'en' ? 'en' : 'vi';

  const langToggleBtn = document.getElementById('lang-toggle');

  setLanguage(currentLang, false);

  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      const nextLang = currentLang === 'vi' ? 'en' : 'vi';
      setLanguage(nextLang, true);
    });
  }
}

function setLanguage(lang, shouldAnimate = true) {
  currentLang = lang;
  localStorage.setItem('editorial-lang', lang);
  document.documentElement.lang = lang;

  const dict = i18n[lang] || i18n.vi;

  // Update text elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) {
      el.textContent = dict[key];
    }
  });

  // Update HTML elements (bold tags, code snippets)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (dict[key] !== undefined) {
      el.innerHTML = dict[key];
    }
  });

  // Update Language Toggle Button States
  const viBtn = document.getElementById('lang-vi-btn');
  const enBtn = document.getElementById('lang-en-btn');

  if (viBtn && enBtn) {
    if (lang === 'vi') {
      viBtn.className = 'font-bold text-neutral-900 dark:text-neutral-100 transition-colors';
      enBtn.className = 'text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 font-normal transition-colors';
    } else {
      viBtn.className = 'text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 font-normal transition-colors';
      enBtn.className = 'font-bold text-neutral-900 dark:text-neutral-100 transition-colors';
    }
  }

  // Update Title Tag
  document.title = lang === 'en' 
    ? 'Nguyen Dat Thanh — Fullstack Software Engineer' 
    : 'Nguyễn Đạt Thành — Fullstack Software Engineer';

  // Synchronize Scrollspy Tracker
  if (updateScrollSpyLanguage) {
    updateScrollSpyLanguage();
  }
}

/* ---------------------------------------------------------
 * 1. THEME SWITCHER (Dark/Light with localStorage persistence)
 * --------------------------------------------------------- */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  const sunIcon = document.getElementById('sun-icon');
  const moonIcon = document.getElementById('moon-icon');

  const savedTheme = localStorage.getItem('editorial-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const isDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);

  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  updateThemeUI(isDark);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentDark = document.documentElement.classList.contains('dark');
      const newDark = !currentDark;
      
      if (newDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('editorial-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('editorial-theme', 'light');
      }
      
      updateThemeUI(newDark);
    });
  }

  function updateThemeUI(dark) {
    if (!sunIcon || !moonIcon) return;
    if (dark) {
      sunIcon.classList.remove('hidden');
      moonIcon.classList.add('hidden');
    } else {
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
    }
  }
}

/* ---------------------------------------------------------
 * 2. READING PROGRESS BAR
 * --------------------------------------------------------- */
function initReadingProgress() {
  const progressBar = document.getElementById('reading-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = Math.min(100, Math.max(0, scrollPercentage)) + '%';
  }, { passive: true });
}

/* ---------------------------------------------------------
 * 2.1 ACTIVE SCROLLSPY & SECTION TRACKER
 * --------------------------------------------------------- */
function initScrollSpy() {
  const trackerText = document.getElementById('tracker-text');
  const navLinks = document.querySelectorAll('[data-nav-id]');
  const contactBtn = document.getElementById('nav-contact-btn');

  function getSections() {
    const dict = i18n[currentLang] || i18n.vi;
    return [
      { id: 'hero', name: dict.trackerOverview },
      { id: 'skills', name: dict.trackerSkills },
      { id: 'case-study', name: dict.trackerCaseStudy },
      { id: 'contact', name: dict.trackerContact }
    ];
  }

  let currentActiveId = '';

  function updateSpy() {
    const sections = getSections();
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Trigger contact if near the bottom
    if (scrollY + windowHeight >= documentHeight - 70) {
      const contactSection = sections.find(s => s.id === 'contact');
      setActive('contact', contactSection ? contactSection.name : 'Contact');
      return;
    }

    // Determine current section based on offset
    let activeSection = sections[0];
    const offsetThreshold = 180;

    for (let i = 0; i < sections.length; i++) {
      const sectionEl = document.getElementById(sections[i].id);
      if (sectionEl) {
        const top = sectionEl.offsetTop - offsetThreshold;
        if (scrollY >= top) {
          activeSection = sections[i];
        }
      }
    }

    setActive(activeSection.id, activeSection.name);
  }

  function setActive(id, name, forceText = false) {
    if (currentActiveId === id && !forceText) return;
    currentActiveId = id;

    // Smooth update of tracker text
    if (trackerText) {
      trackerText.style.opacity = '0.3';
      trackerText.style.transform = 'translateY(-1px)';
      setTimeout(() => {
        trackerText.textContent = name;
        trackerText.style.opacity = '1';
        trackerText.style.transform = 'translateY(0)';
      }, 80);
    }

    // Highlight corresponding nav links
    navLinks.forEach(link => {
      const targetId = link.getAttribute('data-nav-id');
      if (targetId === id) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Highlight contact button when in contact section
    if (contactBtn) {
      if (id === 'contact') {
        contactBtn.classList.add('ring-2', 'ring-editorial-crimson', 'dark:ring-red-400');
      } else {
        contactBtn.classList.remove('ring-2', 'ring-editorial-crimson', 'dark:ring-red-400');
      }
    }
  }

  updateScrollSpyLanguage = () => {
    const sections = getSections();
    const active = sections.find(s => s.id === currentActiveId) || sections[0];
    setActive(active.id, active.name, true);
  };

  window.addEventListener('scroll', updateSpy, { passive: true });
  window.addEventListener('resize', updateSpy, { passive: true });
  updateSpy();
}

/* ---------------------------------------------------------
 * 3. COPY EMAIL TO CLIPBOARD WITH TOAST
 * --------------------------------------------------------- */
function initEmailCopy() {
  const copyBtns = document.querySelectorAll('[data-copy-email]');
  const toast = document.getElementById('email-toast');
  const toastMsg = document.getElementById('toast-message');

  const emailToCopy = 'thanhnd15032002@gmail.com';

  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const prefix = i18n[currentLang]?.toastCopied || 'Đã sao chép email: ';
      navigator.clipboard.writeText(emailToCopy).then(() => {
        showToast(`${prefix}${emailToCopy}`);
      }).catch(() => {
        // Fallback for non-https / older browsers
        const textarea = document.createElement('textarea');
        textarea.value = emailToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`${prefix}${emailToCopy}`);
      });
    });
  });

  let toastTimeout;
  function showToast(message) {
    if (!toast) return;
    if (toastMsg) toastMsg.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }
}

/* ---------------------------------------------------------
 * 4. CV MODAL / PRINT PREVIEW
 * --------------------------------------------------------- */
function initCvModal() {
  const openBtns = document.querySelectorAll('[data-open-cv-modal]');
  const closeBtns = document.querySelectorAll('[data-close-cv-modal]');
  const modal = document.getElementById('cv-modal');
  const printBtn = document.getElementById('modal-print-btn');

  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }

  closeBtns.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}
