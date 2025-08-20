
async function renderReviews(){
  const lang = localStorage.getItem('lang') || 'en';
  const list = await fetch('assets/data/reviews.json').then(r=>r.json()).catch(()=>[]);
  const wrap = document.querySelector('#reviews-list');
  if(!wrap) return;
  wrap.innerHTML = '';
  list.forEach(r => {
    const text = lang==='cz' ? r.text_cz : r.text_en;
    const item = document.createElement('div');
    item.className = 'review';
    item.innerHTML = `
      <div style="display:flex; gap:8px; align-items:center; margin-bottom:8px">
        <span style="color:#f0b90b">★★★★★</span>
        <strong>${r.name}</strong>
      </div>
      <div>${text}</div>
    `;
    wrap.appendChild(item);
  });
}
document.addEventListener('DOMContentLoaded', renderReviews);
