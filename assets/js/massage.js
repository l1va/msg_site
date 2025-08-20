
async function renderMassage(){
  const params = new URLSearchParams(location.search);
  const id = params.get('type') || 'classic';
  const lang = localStorage.getItem('lang') || 'en';
  const list = await fetch('assets/data/massages.json').then(r=>r.json()).catch(()=>[]);
  const item = list.find(m => m.id===id) || list[0];
  if(!item) return;
  document.title = `Massage Propaganda — ${lang==='cz' ? item.name_cz : item.name_en}`;

  const wrap = document.querySelector('#massage');
  wrap.innerHTML = `
    <div class="container section">
      <div class="grid cols-2">
        <div><img src="${item.image}" alt="${item.name_en}"></div>
        <div>
          <h1 style="margin-top:0">${lang==='cz' ? item.name_cz : item.name_en}</h1>
          <p class="muted">${lang==='cz' ? item.description_cz : item.description_en}</p>
          <div class="price">${(lang==='cz'?'od':'from')} <strong>${item.from_price_czk} CZK</strong></div>
          <div style="display:flex; gap:12px; margin:16px 0">
            <a class="btn primary book-now" href="#" data-i18n="bookNow">Book now</a>
          </div>
          <div class="badge"><span aria-hidden="true">★</span> Google 4.9</div>
          <div style="margin-top:24px">
            <a href="toppings.html" class="btn ghost">+ Toppings</a>
          </div>
        </div>
      </div>
    </div>
  `;
}
document.addEventListener('DOMContentLoaded', renderMassage);
