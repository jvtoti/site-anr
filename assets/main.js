// menu mobile
document.querySelectorAll('.burger').forEach(b => b.addEventListener('click', () => {
  const n = document.querySelector('.nav'); n.classList.toggle('open');
  b.setAttribute('aria-expanded', n.classList.contains('open'));
}));

// carrossel: setas + arrastar
document.querySelectorAll('[data-track]').forEach(wrap => {
  const t = wrap.querySelector('.track');
  wrap.querySelectorAll('[data-dir]').forEach(btn => btn.addEventListener('click', () =>
    t.scrollBy({ left: +btn.dataset.dir * (t.querySelector('.card').offsetWidth + 18), behavior: 'smooth' })));
  let down = false, x0 = 0, s0 = 0, moved = false;
  t.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; down = true; moved = false; x0 = e.clientX; s0 = t.scrollLeft; });
  window.addEventListener('pointermove', e => { if (!down) return; const dx = e.clientX - x0; if (Math.abs(dx) > 4) { moved = true; t.classList.add('drag'); } t.scrollLeft = s0 - dx; });
  window.addEventListener('pointerup', () => { down = false; t.classList.remove('drag'); });
  t.addEventListener('click', e => { if (moved) { e.preventDefault(); moved = false; } }, true);
  t.addEventListener('dragstart', e => e.preventDefault());
});

// revelar ao rolar
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
document.querySelectorAll('.rv').forEach(el => io.observe(el));

// formulário de contato -> abre o WhatsApp com a mensagem pronta
const f = document.querySelector('#form-contato');
if (f) f.addEventListener('submit', e => {
  e.preventDefault();
  const d = new FormData(f);
  const msg = `Olá, ANR Advogados! Meu nome é ${d.get('nome')}.\nAssunto: ${d.get('assunto')}\nWhatsApp: ${d.get('whats')}` + (d.get('caso') ? `\n\n${d.get('caso')}` : '');
  window.open(`https://wa.me/${f.dataset.wa}?text=${encodeURIComponent(msg)}`, '_blank');
  f.querySelector('.ok').style.display = 'block';
  f.reset();
});
