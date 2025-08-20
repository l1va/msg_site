
// Utility: fetch JSON with fallback
async function getJSON(url, fallback = null){
  try{ const r = await fetch(url); return await r.json(); }
  catch(e){ console.warn('JSON load failed', url, e); return fallback; }
}

// Language i18n
const I18N = {
  en: {
    googleRating: "Google rating",
    locations: "Locations",
    memberships: "Memberships",
    giftCards: "Gift Cards",
    collabs: "Collabs",
    bookNow: "Book now",
    buyMembership: "Buy membership",
    heroTitle: "Modern massage by modern people.",
    heroSub: "Premium recovery in the heart of Prague.",
    massageTypes: "Massage types",
    membershipTeaser: "Save up to 20% + get special perks.",
    exploreMemberships: "Explore memberships",
    whatPatientsSay: "What patients say about us",
    ourGiftBestsellers: "Our gift bestsellers",
    mostPopular: "Most popular",
    bestChoice: "Best choice",
    closingHook: "Massage is not a luxury. It’s recovery.",
    from: "from",
    buyNow: "Buy now",
    googleReviews: "Google reviews"
  },
  cz: {
    googleRating: "Hodnocení Google",
    locations: "Lokace",
    memberships: "Členství",
    giftCards: "Dárkové karty",
    collabs: "Kolaborace",
    bookNow: "Rezervovat",
    buyMembership: "Koupit členství",
    heroTitle: "Moderní masáž pro moderní lidi.",
    heroSub: "Prémiová regenerace v srdci Prahy.",
    massageTypes: "Typy masáží",
    membershipTeaser: "Ušetřete až 20 % + speciální výhody.",
    exploreMemberships: "Prozkoumat členství",
    whatPatientsSay: "Co o nás říkají klienti",
    ourGiftBestsellers: "Naše dárkové bestsellery",
    mostPopular: "Nejoblíbenější",
    bestChoice: "Nejlepší volba",
    closingHook: "Masáž není luxus. Je to regenerace.",
    from: "od",
    buyNow: "Koupit nyní",
    googleReviews: "Recenze Google"
  }
};

function setLang(lang){
  localStorage.setItem('lang', lang);
  document.documentElement.classList.toggle('lang-en', lang==='en');
  document.documentElement.classList.toggle('lang-cz', lang==='cz');
  // Update texts
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const k = el.getAttribute('data-i18n');
    el.textContent = I18N[lang][k] || el.textContent;
  });
  // Update placeholders where needed
}

function initLang(){
  const lang = localStorage.getItem('lang') || 'en';
  setLang(lang);
  const enBtn = document.querySelector('[data-lang="en"]');
  const czBtn = document.querySelector('[data-lang="cz"]');
  if(enBtn && czBtn){
    enBtn.classList.toggle('active', lang==='en');
    czBtn.classList.toggle('active', lang==='cz');
    enBtn.addEventListener('click', ()=>{ setLang('en'); enBtn.classList.add('active'); czBtn.classList.remove('active'); });
    czBtn.addEventListener('click', ()=>{ setLang('cz'); czBtn.classList.add('active'); enBtn.classList.remove('active'); });
  }
}

// Micro animations on scroll
function initScrollAnims(){
  const els = document.querySelectorAll('[data-animate]');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
  }, {threshold: 0.1});
  els.forEach(el => io.observe(el));
}

// Load rating for microbar
async function initRating(){
  const data = await getJSON('/assets/data/rating.json');
  if(!data) return;
  const wrap = document.querySelector('.microbar .rating');
  if(!wrap) return;
  wrap.innerHTML = `
    <span data-i18n="googleRating">${I18N[(localStorage.getItem('lang')||'en')].googleRating}</span>
    <span class="stars" aria-hidden="true">★★★★★</span>
    <strong>${data.google_rating.toFixed(1)}</strong>
    <span>(${data.reviews_count} ${I18N[(localStorage.getItem('lang')||'en')].googleReviews})</span>
  `;
}

// Attach book links
async function initBooking(){
  const cfg = await getJSON('/assets/data/config.json');
  if(!cfg) return;
  document.querySelectorAll('a.book-now, .book-now a, .book-now').forEach(a => {
    if(a.tagName === 'A'){
      a.href = cfg.booking.fresha_base_url;
      a.target = '_blank';
      a.rel = 'noopener';
    }else if(a.querySelector('a')){
      const link = a.querySelector('a');
      link.href = cfg.booking.fresha_base_url;
      link.target = '_blank';
      link.rel = 'noopener';
    }
  });
  document.querySelectorAll('a.gift-link').forEach(a => {
    a.href = cfg.booking.giftcard_url;
    a.target = '_blank';
    a.rel = 'noopener';
  });
}

// Header mobile toggle (simple)
function initMobileNav(){
  const toggle = document.querySelector('[data-nav-toggle]');
  if(!toggle) return;
  const target = document.querySelector('[data-nav]');
  toggle.addEventListener('click', ()=>{
    target.classList.toggle('open');
  });
}

// Slight parallax on hero title
function initHeroMotion(){
  const title = document.querySelector('.hero .h1');
  if(!title) return;
  let rAF = null;
  function onMove(e){
    const {clientX:x, clientY:y} = e.touches ? e.touches[0] : e;
    const rect = title.getBoundingClientRect();
    const dx = (x - (rect.left + rect.width/2)) / rect.width;
    const dy = (y - (rect.top + rect.height/2)) / rect.height;
    cancelAnimationFrame(rAF);
    rAF = requestAnimationFrame(()=>{
      title.style.transform = `translate3d(${dx*6}px, ${dy*6}px, 0)`;
    });
  }
  function reset(){ title.style.transform = 'none'; }
  window.addEventListener('mousemove', onMove);
  window.addEventListener('touchmove', onMove);
  window.addEventListener('mouseleave', reset);
}

document.addEventListener('DOMContentLoaded', ()=>{
  initLang();
  initScrollAnims();
  initRating();
  initBooking();
  initMobileNav();
  initHeroMotion();
});
