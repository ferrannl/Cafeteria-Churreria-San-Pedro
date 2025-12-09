document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('languageSelect');
  const langBlocks = document.querySelectorAll('.lang');
  const navEn = document.querySelector('.nav-en');
  const navEs = document.querySelector('.nav-es');
  const navDe = document.querySelector('.nav-de');
  const gate = document.getElementById('langGate');
  const gateButtons = document.querySelectorAll('.btn-lang');

  function updateLanguage(lang) {
    langBlocks.forEach(block => {
      block.classList.toggle('lang--active', block.dataset.lang === lang);
    });

    if (navEn && navEs && navDe) {
      navEn.style.display = (lang === 'en') ? 'flex' : 'none';
      navEs.style.display = (lang === 'es') ? 'flex' : 'none';
      navDe.style.display = (lang === 'de') ? 'flex' : 'none';
    }

    if (select) {
      select.value = lang;
    }

    try {
      localStorage.setItem('sanpedro_lang', lang);
    } catch (e) {
      // ignore
    }
  }

  // Top-right selector
  if (select) {
    select.addEventListener('change', e => {
      updateLanguage(e.target.value);
    });
  }

  // Language gate buttons
  gateButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang') || 'es';
      updateLanguage(lang);
      if (gate) {
        gate.classList.add('lang-gate-hidden');
      }
    });
  });

  // Image modal for menu picture
  const menuImages = document.querySelectorAll('.menu-image');
  const imageModal = document.getElementById('imageModal');
  const imageModalImg = document.getElementById('imageModalImg');

  function closeImageModal() {
    if (!imageModal || !imageModalImg) return;
    imageModal.classList.remove('image-modal--active');
    imageModal.setAttribute('aria-hidden', 'true');
    imageModalImg.src = '';
    imageModalImg.alt = '';
  }

  if (imageModal && imageModalImg && menuImages.length) {
    menuImages.forEach(img => {
      img.addEventListener('click', () => {
        const fullSrc = img.dataset.full || img.src;
        imageModalImg.src = fullSrc;
        imageModalImg.alt = img.alt || '';
        imageModal.classList.add('image-modal--active');
        imageModal.setAttribute('aria-hidden', 'false');
      });
    });

    // Click background OR image to close
    imageModal.addEventListener('click', e => {
      if (e.target === imageModal || e.target === imageModalImg) {
        closeImageModal();
      }
    });
  }

  // ESC key: close modal, then language gate (fallback to Spanish)
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (imageModal && imageModal.classList.contains('image-modal--active')) {
        closeImageModal();
        return;
      }
      if (gate && !gate.classList.contains('lang-gate-hidden')) {
        gate.classList.add('lang-gate-hidden');
        updateLanguage('es');
      }
    }
  });

  // Initial language from localStorage or default to ES
  let initialLang = 'es';
  try {
    const stored = localStorage.getItem('sanpedro_lang');
    if (stored === 'en' || stored === 'es' || stored === 'de') {
      initialLang = stored;
      if (gate) {
        gate.classList.add('lang-gate-hidden');
      }
    }
  } catch (e) {
    // ignore
  }

  updateLanguage(initialLang);
});
