
document.addEventListener('DOMContentLoaded', async ()=>{
  const lang = localStorage.getItem('lang') || 'en';

  // Massages grid
  const massages = await fetch('assets/data/massages.json').then(r=>r.json()).catch(()=>[]);
  const mg = document.querySelector('#massages-grid');
  massages.forEach(m => {
    const a = document.createElement('a');
    a.href = m.is_toppings ? 'toppings.html' : `massage.html?type=${m.id}`;
    a.className = 'card hover-lift';
    a.innerHTML = `
      <img src="${m.image}" alt="${m.name_en}" loading="lazy">
      <div class="pad">
        <div class="title">${lang==='cz' ? m.name_cz : m.name_en}</div>
        <div class="muted">${(lang==='cz'?'od':'from')} <strong>${m.from_price_czk} CZK</strong></div>
      </div>`;
    mg.appendChild(a);
  });

  // Locations
  const locations = await fetch('assets/data/locations.json').then(r=>r.json()).catch(()=>[]);
  const lg = document.querySelector('#locations-grid');
  locations.forEach(l => {
    const el = document.createElement('div');
    el.className = 'card';
    el.innerHTML = `
      <img src="${l.image}" alt="${l.name}" loading="lazy">
      <div class="pad">
        <div style="display:flex; justify-content:space-between; align-items:center">
          <div>
            <div class="title">${l.name}</div>
            <div class="muted">${l.address}</div>
          </div>
          <div class="badge">★ ${l.google_rating} (${l.reviews_count})</div>
        </div>
        <div style="display:flex; gap:12px; margin-top:12px; align-items:center">
          <a class="btn ghost book-now" href="#" data-i18n="bookNow">Book now</a>
          <a class="map-link" href="${l.maps_link}" target="_blank" rel="noopener">Open in Maps →</a>
          <div style="margin-left:auto; color:var(--muted)"><span data-i18n="from">from</span> <strong>${l.from_price_czk} CZK</strong></div>
        </div>
      </div>`;
    lg.appendChild(el);
  });

  // Gifts
  const gifts = [
    {id:'gift-1600', name: 'Gift 1600 CZK', price:1600, img:'assets/img/gift-1600.svg', badge:'bestChoice'},
    {id:'gift-2500', name: 'Gift 2500 CZK', price:2500, img:'assets/img/gift-2500.svg', badge:'mostPopular'},
    {id:'gift-4000', name: 'Gift 4000 CZK', price:4000, img:'assets/img/gift-4000.svg'},
    {id:'m-3', name: 'Membership 3', price:'from', img:'assets/img/membership-3.svg'},
    {id:'m-5', name: 'Membership 5', price:'from', img:'assets/img/membership-5.svg'}
  ];
  const gg = document.querySelector('#gifts-grid');
  gifts.forEach(g => {
    const a = document.createElement('a');
    a.href = g.id.startsWith('gift') ? 'gift-cards.html' : 'memberships.html';
    a.className = 'card hover-lift';
    a.innerHTML = `
      <img src="${g.img}" alt="${g.name}" loading="lazy">
      <div class="pad">
        <div class="title">${g.name}</div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px">
          <div class="price">${typeof g.price==='number' ? g.price + ' CZK' : (localStorage.getItem('lang')==='cz'?'od':'from') + ' 1200 CZK'}</div>
          ${g.badge? `<span class="badge" data-i18n="${g.badge}">${g.badge==='mostPopular'?'Most popular':'Best choice'}</span>`:''}
        </div>
        <div style="margin-top:12px"><span class="btn ghost" data-i18n="buyNow">${localStorage.getItem('lang')==='cz'?'Koupit nyní':'Buy now'}</span></div>
      </div>`;
    gg.appendChild(a);
  });
});
