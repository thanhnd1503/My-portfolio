/**
 * Nguyễn Đạt Thành - Editorial Portfolio Scripts
 * Handles: Theme Toggle, Reading Progress, Copy Email Toast,
 *          Interactive High-Density Table Demo, and CV Modal.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initReadingProgress();
  initScrollSpy();
  initEmailCopy();
  initCarInventoryDemo();
  initCvModal();
});

/* ---------------------------------------------------------
 * 1. THEME SWITCHER (Dark/Light with localStorage persistence)
 * --------------------------------------------------------- */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  const sunIcon = document.getElementById('sun-icon');
  const moonIcon = document.getElementById('moon-icon');
  const themeLabel = document.getElementById('theme-label');

  // Check saved theme or system preference
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
      if (themeLabel) themeLabel.textContent = 'Giao diện sáng';
    } else {
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
      if (themeLabel) themeLabel.textContent = 'Giao diện tối';
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

  const sections = [
    { id: 'hero', name: 'Tổng quan' },
    { id: 'skills', name: '01. Kỹ năng' },
    { id: 'case-study', name: '02. Case Study' },
    { id: 'contact', name: '03. Liên hệ' }
  ];

  let currentActiveId = '';

  function updateSpy() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Trigger contact if near the bottom
    if (scrollY + windowHeight >= documentHeight - 70) {
      setActive('contact', '03. Liên hệ');
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

  function setActive(id, name) {
    if (currentActiveId === id) return;
    currentActiveId = id;

    // Smooth update of tracker text
    if (trackerText) {
      trackerText.style.opacity = '0.3';
      trackerText.style.transform = 'translateY(-1px)';
      setTimeout(() => {
        trackerText.textContent = name;
        trackerText.style.opacity = '1';
        trackerText.style.transform = 'translateY(0)';
      }, 100);
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

  const emailToCopy = 'thanhnd15032002@gmail.com'; // Profile email

  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText(emailToCopy).then(() => {
        showToast(`Đã sao chép email: ${emailToCopy}`);
      }).catch(() => {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = emailToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`Đã sao chép email: ${emailToCopy}`);
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
 * 4. INTERACTIVE HIGH-DENSITY DATA TABLE DEMO (AUTOMOTIVE CRM)
 * --------------------------------------------------------- */
function initCarInventoryDemo() {
  const tableBody = document.getElementById('demo-inventory-body');
  const searchInput = document.getElementById('demo-search');
  const statusFilterBtns = document.querySelectorAll('[data-status-filter]');
  const liveCountBadge = document.getElementById('demo-active-count');
  const toastAction = document.getElementById('demo-action-feedback');

  if (!tableBody) return;

  // Mock initial vehicles in Korean Market format (VIN, Model, KRW price, options, status)
  let inventory = [
    {
      vin: 'KMHFH41BBMA192834',
      model: 'Hyundai Grandeur 2.5 Calligraphy',
      year: 2024,
      fuel: 'Gasoline',
      price: 43200000, // KRW
      options: ['Heads-up Display', 'Bose Sound', 'Nappa Leather'],
      status: 'AVAILABLE', // AVAILABLE, RESERVED, SOLD
      lockExpires: null
    },
    {
      vin: 'KNALU41FEMA384729',
      model: 'Kia EV9 Earth 4WD 6-Seat',
      year: 2024,
      fuel: 'EV',
      price: 84500000,
      options: ['Dual Sunroof', 'Highway Driving Assist 2', 'Relaxation Comfort'],
      status: 'AVAILABLE',
      lockExpires: null
    },
    {
      vin: 'KMHGN42EEMA592019',
      model: 'Genesis GV80 3.5T AWD Signature',
      year: 2023,
      fuel: 'Gasoline',
      price: 78900000,
      options: ['Lexicon Audio', 'Electronic LSD', '22-inch Wheels'],
      status: 'RESERVED',
      lockExpires: '09:42 (Locked)'
    },
    {
      vin: 'KMHEC41DEMA773194',
      model: 'Hyundai Ioniq 6 Long Range Exclusive',
      year: 2024,
      fuel: 'EV',
      price: 52600000,
      options: ['Digital Side Mirrors', 'Vehicle-to-Load (V2L)'],
      status: 'AVAILABLE',
      lockExpires: null
    },
    {
      vin: 'KNALK42CEMA482103',
      model: 'Kia Carnival 3.5 Signature Limousine',
      year: 2023,
      fuel: 'Gasoline',
      price: 47800000,
      options: ['Smart Power Sliding Door', 'Rear Seat Entertainment'],
      status: 'SOLD',
      lockExpires: null
    }
  ];

  let currentFilter = 'ALL';
  let searchTerm = '';

  function formatKRW(val) {
    return '₩ ' + val.toLocaleString('ko-KR');
  }

  function renderTable() {
    tableBody.innerHTML = '';
    
    const filtered = inventory.filter(item => {
      const matchStatus = currentFilter === 'ALL' || item.status === currentFilter;
      const matchSearch = item.model.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.vin.toLowerCase().includes(searchTerm.toLowerCase());
      return matchStatus && matchSearch;
    });

    if (liveCountBadge) {
      liveCountBadge.textContent = `${filtered.length} / ${inventory.length} xe`;
    }

    if (filtered.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="6" class="py-8 text-center text-neutral-500 font-mono-tech text-xs">
            Không tìm thấy phương tiện phù hợp với bộ lọc.
          </td>
        </tr>
      `;
      return;
    }

    filtered.forEach(item => {
      const tr = document.createElement('tr');
      tr.className = 'border-b border-hairline hover:bg-neutral-100/40 dark:hover:bg-neutral-800/30 transition-colors text-xs';

      let statusBadge = '';
      if (item.status === 'AVAILABLE') {
        statusBadge = '<span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono-tech font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">● SẴN SÀNG</span>';
      } else if (item.status === 'RESERVED') {
        statusBadge = `<span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono-tech font-medium bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">⏳ ĐÃ KHÓA CỌC</span>`;
      } else {
        statusBadge = '<span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono-tech font-medium bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-400">✓ ĐÃ BÁN</span>';
      }

      let actionButton = '';
      if (item.status === 'AVAILABLE') {
        actionButton = `
          <button data-vin-action="${item.vin}" class="px-2.5 py-1 text-[11px] font-mono-tech bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-white text-white dark:text-neutral-950 rounded cursor-pointer transition-all active:scale-95">
            Khóa Cọc (Lock)
          </button>
        `;
      } else if (item.status === 'RESERVED') {
        actionButton = `
          <button data-vin-release="${item.vin}" class="px-2 py-1 text-[11px] font-mono-tech border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-200/50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded cursor-pointer transition-all">
            Hủy khóa
          </button>
        `;
      } else {
        actionButton = `<span class="text-neutral-400 dark:text-neutral-600 font-mono-tech text-[11px]">Đã chốt</span>`;
      }

      tr.innerHTML = `
        <td class="py-2 px-3 font-mono text-neutral-600 dark:text-neutral-400 select-all text-[11px]">${item.vin}</td>
        <td class="py-2 px-3 font-medium text-neutral-900 dark:text-neutral-100 text-xs">
          ${item.model}
          <div class="text-[10px] text-neutral-500 font-mono mt-0.5">
            ${item.year} • ${item.fuel} • <span class="text-neutral-600 dark:text-neutral-300">${item.options[0]}</span>
          </div>
        </td>
        <td class="py-2 px-3 font-mono text-right font-semibold text-neutral-900 dark:text-neutral-100 text-xs">${formatKRW(item.price)}</td>
        <td class="py-2 px-3">${statusBadge}</td>
        <td class="py-2 px-3 text-right">${actionButton}</td>
      `;

      tableBody.appendChild(tr);
    });

    attachActionListeners();
  }

  function attachActionListeners() {
    // Optimistic UI Lock demo
    document.querySelectorAll('[data-vin-action]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const vin = e.currentTarget.getAttribute('data-vin-action');
        const target = inventory.find(x => x.vin === vin);
        if (!target) return;

        // Optimistic update immediately
        target.status = 'RESERVED';
        target.lockExpires = 'Row Lock Active (TTL 15m)';
        renderTable();

        showFeedback(`⚡ Row-Level Lock (ACID): Đã khóa độc quyền số VIN ${vin.slice(-6)} (Tránh xung đột 100%)`);
      });
    });

    document.querySelectorAll('[data-vin-release]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const vin = e.currentTarget.getAttribute('data-vin-release');
        const target = inventory.find(x => x.vin === vin);
        if (!target) return;

        target.status = 'AVAILABLE';
        target.lockExpires = null;
        renderTable();

        showFeedback(`Đã giải phóng khóa cho VIN ${vin.slice(-6)}`);
      });
    });
  }

  function showFeedback(msg) {
    if (!toastAction) return;
    toastAction.textContent = msg;
    toastAction.classList.remove('opacity-0');
    toastAction.classList.add('opacity-100');
    setTimeout(() => {
      toastAction.classList.remove('opacity-100');
      toastAction.classList.add('opacity-0');
    }, 4000);
  }

  // Filter tab buttons
  statusFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      statusFilterBtns.forEach(b => {
        b.classList.remove('bg-neutral-900', 'text-white', 'dark:bg-neutral-100', 'dark:text-neutral-950');
        b.classList.add('text-neutral-600', 'dark:text-neutral-400');
      });
      btn.classList.add('bg-neutral-900', 'text-white', 'dark:bg-neutral-100', 'dark:text-neutral-950');
      btn.classList.remove('text-neutral-600', 'dark:text-neutral-400');

      currentFilter = btn.getAttribute('data-status-filter');
      renderTable();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.trim();
      renderTable();
    });
  }

  // Initial render
  renderTable();
}

/* ---------------------------------------------------------
 * 5. CV MODAL / PRINT PREVIEW
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
