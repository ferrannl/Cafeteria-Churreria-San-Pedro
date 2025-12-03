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

    navEn.style.display = (lang === 'en') ? 'flex' : 'none';
    navEs.style.display = (lang === 'es') ? 'flex' : 'none';
    navDe.style.display = (lang === 'de') ? 'flex' : 'none';

    select.value = lang;

    try {
      localStorage.setItem('sanpedro_lang', lang);
    } catch (e) {}
  }

  select.addEventListener('change', function (e) {
    updateLanguage(e.target.value);
  });

  gateButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      updateLanguage(lang);
      gate.classList.add('lang-gate-hidden');
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !gate.classList.contains('lang-gate-hidden')) {
      gate.classList.add('lang-gate-hidden');
      updateLanguage('en');
    }
  });

  let initialLang = 'en';
  try {
    const stored = localStorage.getItem('sanpedro_lang');
    if (stored === 'en' || stored === 'es' || stored === 'de') {
      initialLang = stored;
      gate.classList.add('lang-gate-hidden');
    }
  } catch (e) {}

  updateLanguage(initialLang);
});
