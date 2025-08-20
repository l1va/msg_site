
function initSlider(scope){
  const el = scope.querySelector('.slider');
  if(!el) return;
  const track = el.querySelector('.slider-track');
  const prev = el.querySelector('[data-prev]');
  const next = el.querySelector('[data-next]');
  const step = () => track.clientWidth * 0.8;
  if(prev) prev.addEventListener('click', ()=>{ track.scrollBy({left:-step(), behavior:'smooth'}); });
  if(next) next.addEventListener('click', ()=>{ track.scrollBy({left: step(), behavior:'smooth'}); });
}

document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('[data-slider]').forEach(s => initSlider(s));
});
