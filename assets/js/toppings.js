
async function renderToppings(){
  const lang = localStorage.getItem('lang') || 'en';
  const list = await fetch('assets/data/toppings.json').then(r=>r.json()).catch(()=>[]);
  const grid = document.querySelector('#toppings-grid');
  if(!grid) return;
  grid.innerHTML='';
  list.forEach(t => {
    const el = document.createElement('a');
    el.className = 'card hover-lift';
    el.href = 'index.html';
    el.innerHTML = `
      <div class="pad">
        <div class="title">${lang==='cz' ? t.name_cz : t.name_en}</div>
        <div class="muted" style="margin-top:6px">${lang==='cz' ? t.desc_cz : t.desc_en}</div>
        <div class="price" style="margin-top:12px">${t.price_czk} CZK</div>
        <div style="margin-top:12px"><span class="btn ghost" data-i18n="bookNow">${(lang==='cz'?'Rezervovat':'Book now')}</span></div>
      </div>
    `;
    grid.appendChild(el);
  });
}
document.addEventListener('DOMContentLoaded', renderToppings);
