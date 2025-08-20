
function calcDiscount(qty){
  if(qty>=10) return 0.20;
  if(qty>=5) return 0.15;
  if(qty>=3) return 0.10;
  return 0.00;
}
function formatCZK(n){ return new Intl.NumberFormat('cs-CZ',{style:'currency',currency:'CZK', maximumFractionDigits:0}).format(n); }

function updateCalc(){
  const base = Number(document.querySelector('#base-price').value || 1200);
  const qty = Number(document.querySelector('#qty').value || 5);
  const discount = calcDiscount(qty);
  const full = base * qty;
  const member = Math.round(full * (1 - discount));
  document.querySelector('#qty-out').textContent = qty;
  document.querySelector('#discount-out').textContent = Math.round(discount*100) + '%';
  document.querySelector('#full-out').textContent = formatCZK(full);
  document.querySelector('#member-out').textContent = formatCZK(member);
  document.querySelector('#save-out').textContent = formatCZK(full-member);
}
document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('#base-price, #qty').forEach(el => el.addEventListener('input', updateCalc));
  updateCalc();
});
