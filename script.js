document.addEventListener('DOMContentLoaded', function () {
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
    } catch (e) {}
  }

  if (select) {
    select.addEventListener('change', function (e) {
      updateLanguage(e.target.value);
    });
  }

  gateButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang') || 'en';
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

    // Click background to close (not the image itself)
    imageModal.addEventListener('click', (e) => {
      if (e.target === imageModal) {
        closeImageModal();
      }
    });
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      // Close image modal first if open
      if (imageModal && imageModal.classList.contains('image-modal--active')) {
        closeImageModal();
        return;
      }
      // Then close language gate if still visible
      if (gate && !gate.classList.contains('lang-gate-hidden')) {
        gate.classList.add('lang-gate-hidden');
        updateLanguage('en');
      }
    }
  });

  let initialLang = 'en';
  try {
    const stored = localStorage.getItem('sanpedro_lang');
    if (stored === 'en' || stored === 'es' || stored === 'de') {
      initialLang = stored;
      if (gate) {
        gate.classList.add('lang-gate-hidden');
      }
    }
  } catch (e) {}

  updateLanguage(initialLang);
});
