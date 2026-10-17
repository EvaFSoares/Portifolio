/* ===== Portfólio · anime.js ===== */
const FOTO_PADRAO = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="#6d2fa3"/>' +
  '<circle cx="100" cy="78" r="38" fill="#d9c2ff"/><path d="M28 200c6-52 38-76 72-76s66 24 72 76z" fill="#d9c2ff"/></svg>');
const foto = document.getElementById('foto');
foto.addEventListener('error', () => { foto.src = FOTO_PADRAO; }, { once: true });

const reduzir = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Nome: quebra em letras para animar */
const nome = document.getElementById('nome');
nome.innerHTML = [...nome.textContent].map(c => `<span>${c === ' ' ? '&nbsp;' : c}</span>`).join('');

/* Entrada da tela inicial (uma sequência só) */
if (!reduzir) {
  anime.timeline({ easing: 'easeOutExpo' })
    .add({ targets: '.foto-wrap', opacity: [0, 1], scale: [0.4, 1], rotate: [-25, 0], duration: 1200 })
    .add({ targets: '#nome span', opacity: [0, 1], translateY: [40, 0], rotate: [12, 0], delay: anime.stagger(55), duration: 800 }, '-=700')
    .add({ targets: '.cargo', opacity: [0, 1], translateY: [16, 0], duration: 600 }, '-=400')
    .add({ targets: '.hero-acoes .btn', opacity: [0, 1], translateY: [20, 0], delay: anime.stagger(120), duration: 700 }, '-=400');

}

/* Ampliar botões e foto ao passar o cursor */
function ampliar(el, escala) {
  el.addEventListener('mouseenter', () => anime({ targets: el, scale: escala, duration: 350, easing: 'easeOutElastic(1, .6)' }));
  el.addEventListener('mouseleave', () => anime({ targets: el, scale: 1, duration: 300, easing: 'easeOutQuad' }));
}
document.querySelectorAll('.btn').forEach(b => ampliar(b, 1.12));
document.querySelectorAll('.contato-item').forEach(b => ampliar(b, 1.06));

/* Céu de pontinhos lilás que flutuam */
const ceu = document.getElementById('ceu');
for (let i = 0; i < 40; i++) {
  const p = document.createElement('i');
  const t = anime.random(3, 8);
  p.style.cssText = `width:${t}px;height:${t}px;left:${anime.random(0, 100)}%;top:${anime.random(0, 100)}%`;
  ceu.appendChild(p);
}
if (!reduzir) {
  anime({
    targets: '.ceu i', opacity: [{ value: 0.15 }, { value: 0.8 }],
    translateY: () => anime.random(-30, 30), translateX: () => anime.random(-20, 20),
    duration: () => anime.random(2500, 6000), delay: () => anime.random(0, 2000),
    direction: 'alternate', loop: true, easing: 'easeInOutSine'
  });
}

/* Rastro de estrelinhas negras no cursor */
if (!reduzir) {
  let ultimo = 0;
  addEventListener('mousemove', e => {
    const agora = performance.now();
    if (agora - ultimo < 20) return;          // mais frequente
    ultimo = agora;
    for (let i = 0; i < 3; i++) {             // 3 estrelas por vez
      const s = document.createElement('span');
      s.className = 'estrela';
      s.textContent = Math.random() > 0.5 ? '★' : '✦';
      s.style.left = e.clientX + anime.random(-10, 10) + 'px';
      s.style.top = e.clientY + anime.random(-10, 10) + 'px';
      s.style.fontSize = anime.random(16, 34) + 'px';
      document.body.appendChild(s);
      anime({
        targets: s,
        translateX: anime.random(-40, 40), translateY: anime.random(10, 60),
        rotate: anime.random(-180, 180), scale: [1, 0], opacity: [1, 0],
        duration: 1100, easing: 'easeOutQuad', complete: () => s.remove()
      });
    }
  });
}
/* Zoom da foto (animação nativa, independente do anime.js) */
(function () {
  const img = document.getElementById('foto');
  const zoom = esc => img.animate(
    { transform: `scale(${esc})` },
    { duration: 350, easing: 'cubic-bezier(.34,1.56,.64,1)', fill: 'forwards' }
  );
  img.addEventListener('mouseenter', () => zoom(1.1));
  img.addEventListener('mouseleave', () => zoom(1));
})();