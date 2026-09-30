/* =============================================
   GOD OF WAR — ARQUIVO DE KRATOS
   JavaScript Remasterizado
   ============================================= */

// ============================================
//  INTRO ANIMATION
// ============================================
const intro        = document.getElementById('intro');
const introLogo    = document.getElementById('introLogo');
const introOmega   = document.getElementById('introOmega');
const introOf      = document.getElementById('introOf');
const introGod     = document.getElementById('introGod');
const introWar     = document.getElementById('introWar');
const introFlash   = document.getElementById('introFlash');
const canvas       = document.getElementById('introCanvas');
const ctx          = canvas.getContext('2d');

function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const fireParticles = [];
function spawnFireParticle() {
  const cx = canvas.width / 2, cy = canvas.height / 2;
  fireParticles.push({
    x: cx + (Math.random() - 0.5) * 120, y: cy + (Math.random() - 0.5) * 80,
    vx: (Math.random() - 0.5) * 1.5, vy: -(Math.random() * 2 + 0.5),
    life: 1, decay: Math.random() * 0.015 + 0.008,
    size: Math.random() * 6 + 2, hue: Math.random() * 30 + 10,
  });
}

let fireActive = false, fireAnimId;
function drawFire() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (fireActive) for (let i = 0; i < 4; i++) spawnFireParticle();
  fireParticles.forEach((p, i) => {
    p.x += p.vx; p.y += p.vy; p.life -= p.decay; p.vx += (Math.random() - 0.5) * 0.1;
    if (p.life <= 0) { fireParticles.splice(i, 1); return; }
    ctx.save(); ctx.globalAlpha = p.life * 0.7;
    const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
    g.addColorStop(0, `hsla(${p.hue + 20},100%,80%,1)`);
    g.addColorStop(0.4, `hsla(${p.hue},100%,50%,0.8)`);
    g.addColorStop(1, `hsla(${p.hue - 10},90%,30%,0)`);
    ctx.fillStyle = g; ctx.beginPath();
    ctx.arc(p.x, p.y, p.size * (1 + (1 - p.life) * 0.5), 0, Math.PI * 2); ctx.fill(); ctx.restore();
  });
  fireAnimId = requestAnimationFrame(drawFire);
}
drawFire();

function wait(ms) { return new Promise(r => setTimeout(r, ms)); }
function setStyle(el, s) { Object.assign(el.style, s); }

async function runIntro() {
  document.body.style.overflow = 'hidden';
  await wait(400);
  fireActive = true;
  setStyle(introLogo, { opacity: '1' });
  setStyle(introOmega, { transition: 'opacity 0.8s ease, transform 1s cubic-bezier(0.34,1.56,0.64,1)', opacity: '1', transform: 'scale(1)' });
  await wait(900);
  setStyle(introGod, { transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.34,1.56,0.64,1)', opacity: '1', transform: 'translateX(0)' });
  setStyle(introWar, { transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.34,1.56,0.64,1)', opacity: '1', transform: 'translateX(0)' });
  introGod.style.transform = 'translateX(-8px)'; introWar.style.transform = 'translateX(8px)';
  await wait(100); introGod.style.transform = 'translateX(0)'; introWar.style.transform = 'translateX(0)';
  await wait(700);
  setStyle(introOf, { transition: 'opacity 0.5s ease, transform 0.5s ease', opacity: '1', transform: 'translate(-50%,-50%) scale(1)' });
  await wait(1200);
  introOmega.style.transition = 'text-shadow 0.3s';
  let chromaStep = 0;
  const chromaInterval = setInterval(() => {
    chromaStep++;
    const sp = chromaStep * 5;
    introOmega.style.textShadow = `${sp}px 0 rgba(0,255,255,0.5), -${sp}px 0 rgba(255,0,50,0.5), 0 0 60px rgba(200,57,43,0.8)`;
    introGod.style.textShadow = `${sp}px 0 rgba(0,255,255,0.3), -${sp}px 0 rgba(255,0,50,0.3)`;
    introWar.style.textShadow = `${sp}px 0 rgba(0,255,255,0.3), -${sp}px 0 rgba(255,0,50,0.3)`;
    if (chromaStep >= 8) clearInterval(chromaInterval);
  }, 60);
  await wait(600);
  setStyle(introLogo, { transition: 'transform 0.7s ease-in, opacity 0.3s ease-in', transform: 'scale(3)', opacity: '0' });
  await wait(200);
  setStyle(introFlash, { transition: 'opacity 0.25s ease', opacity: '1' });
  await wait(300);
  setStyle(intro, { transition: 'opacity 0.4s ease', opacity: '0' });
  await wait(450);
  fireActive = false; cancelAnimationFrame(fireAnimId); ctx.clearRect(0, 0, canvas.width, canvas.height);
  intro.style.display = 'none';
  document.body.style.overflow = '';
  document.body.style.opacity = '0'; document.body.style.transform = 'scale(1.08)'; document.body.style.transition = 'none';
  await wait(50);
  document.body.style.transition = 'opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.25,1,0.5,1)';
  document.body.style.opacity = '1'; document.body.style.transform = 'scale(1)';
  await wait(900);
  document.body.style.transition = ''; document.body.style.transform = ''; document.body.style.opacity = '';
}

window.addEventListener('load', () => {
  setStyle(introGod, { opacity: '0', transform: 'translateX(-60px)' });
  setStyle(introWar, { opacity: '0', transform: 'translateX(60px)' });
  setStyle(introOf,  { opacity: '0', transform: 'translate(-50%,-50%) scale(0.5)' });
  runIntro();
  buildTimelines();
});

if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

// ============================================
//  CURSOR
// ============================================
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

const isTouchDevice = window.matchMedia('(hover: none)').matches;
if (!isTouchDevice) {
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
  });
  function trackRing() {
    rx += (mx - rx) * 0.14; ry += (my - ry) * 0.14;
    cursorRing.style.left = rx + 'px'; cursorRing.style.top = ry + 'px';
    requestAnimationFrame(trackRing);
  }
  trackRing();
  document.querySelectorAll('a, button, .gow-entry, .fact-block, .sec-weapon-card, .dyn-char-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(2)'; cursor.style.background = 'var(--gold)';
      cursorRing.style.width = '48px'; cursorRing.style.height = '48px'; cursorRing.style.borderColor = 'var(--red)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)'; cursor.style.background = 'var(--red)';
      cursorRing.style.width = '32px'; cursorRing.style.height = '32px'; cursorRing.style.borderColor = 'var(--gold)';
    });
  });
}

// ============================================
//  CINZAS
// ============================================
const ashContainer = document.getElementById('ashParticles');
for (let i = 0; i < 30; i++) {
  const p = document.createElement('div'); p.className = 'ash-p';
  const size = Math.random() * 4 + 1, drift = (Math.random() - 0.5) * 120;
  p.style.cssText = `left:${Math.random() * 100}%;width:${size}px;height:${size}px;animation-duration:${Math.random() * 14 + 10}s;animation-delay:-${Math.random() * 20}s;--drift:${drift}px;opacity:${Math.random() * 0.3 + 0.05};`;
  ashContainer.appendChild(p);
}

// ============================================
//  NAVBAR
// ============================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => { navbar.classList.toggle('scrolled', window.scrollY > 60); }, { passive: true });

const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ============================================
//  REVEAL ON SCROLL
// ============================================
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ============================================
//  SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  });
});

// ============================================
//  PARALLAX HERO
// ============================================
const heroBg = document.querySelector('.hero-bg');
if (heroBg) {
  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) heroBg.style.transform = `translateY(${window.scrollY * 0.28}px)`;
  }, { passive: true });
}

// ============================================
//  FOOTER DATE
// ============================================
const footerDate = document.getElementById('footerDate');
if (footerDate) footerDate.textContent = new Date().toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase();

// ============================================
//  OMEGA GLITCH
// ============================================
const heroOmega = document.querySelector('.ht-omega');
if (heroOmega) {
  setInterval(() => {
    if (Math.random() > 0.88) {
      heroOmega.style.textShadow = `${(Math.random()*8-4)}px 0 rgba(0,200,255,0.6),${(Math.random()*8-4)}px 0 rgba(255,0,50,0.6),0 0 50px rgba(200,57,43,0.8)`;
      heroOmega.style.transform = `translateX(${(Math.random()*6-3)}px)`;
      setTimeout(() => {
        heroOmega.style.textShadow = '0 0 30px rgba(200,57,43,0.7),0 0 80px rgba(200,57,43,0.3),3px 3px 0 var(--red-dark)';
        heroOmega.style.transform = '';
      }, 100);
    }
  }, 3500);
}

// ============================================
//  COUNTER ANIMADO
// ============================================
function animateCount(el, target, dur = 2000) {
  const start = performance.now();
  if (isNaN(target)) return;
  const suffix = el.textContent.replace(/[0-9.]+/, '');
  function update(now) {
    const p = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(target * ease) + (suffix || '');
    if (p < 1) requestAnimationFrame(update);
    else el.textContent = target + (suffix || '');
  }
  requestAnimationFrame(update);
}
document.querySelectorAll('.fact-block').forEach(el => {
  new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const numEl = e.target.querySelector('.fact-num-big, .fact-num-med');
        if (numEl && !numEl.dataset.done) {
          numEl.dataset.done = '1';
          const n = parseFloat(numEl.textContent.replace(/[^0-9.]/g, ''));
          if (!isNaN(n)) animateCount(numEl, n);
        }
      }
    });
  }, { threshold: 0.5 }).observe(el);
});

// ============================================
//  HISTÓRA BG: TRANSIÇÃO GREGA <-> NÓRDICA
// ============================================
const greekBg  = document.querySelector('.greek-bg-layer');
const nordicBg = document.querySelector('.nordic-bg-layer');
const greekTimeline  = document.getElementById('timelineGreek');
const nordicTimeline = document.getElementById('timelineNordic');
const nordicEraSection = document.getElementById('historia-nordica');

if (greekBg && nordicBg) {
  const bgObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.target === nordicTimeline || entry.target === nordicEraSection) {
        if (entry.isIntersecting) {
          greekBg.classList.remove('active');
          nordicBg.classList.add('active');
        } else {
          // Se voltou para zona grega
          const nordicRect = nordicTimeline ? nordicTimeline.getBoundingClientRect() : null;
          if (nordicRect && nordicRect.top > window.innerHeight) {
            greekBg.classList.add('active');
            nordicBg.classList.remove('active');
          }
        }
      }
    });
  }, { threshold: 0.05, rootMargin: '-10% 0px -10% 0px' });

  if (nordicTimeline) bgObserver.observe(nordicTimeline);
  if (nordicEraSection) bgObserver.observe(nordicEraSection);
}

// ============================================
//  DADOS COMPLETOS DA LINHA DO TEMPO
// ============================================

const TIMELINE_GREEK = [
  {
    badge: 'Ω',
    isOrigin: true,
    tag: '✦ QUANDO TUDO COMEÇOU ✦',
    title: 'O Pacto de Sangue com Ares',
    summary: 'Antes que as fundações do Olimpo tremessem sob seus pés, Kratos era a personificação da disciplina espartana — um general implacável que moldava o mapa da Grécia com bronze e sangue.',
    phases: [
      { numeral: 'I', title: 'O General Implacável', text: 'Kratos liderava exércitos com uma disciplina de ferro. Sua ascensão foi meteórica, movida por uma ambição cega que o tornava tão temido por inimigos quanto respeitado por seus homens.' },
      { numeral: 'II', title: 'O Declínio em Solo Bárbaro', text: 'A glória espartana encontrou seu limite frente ao rei bárbaro Alrik. Com seu exército destruído, Kratos clamou: "Ares! Destrua meus inimigos, e minha vida será sua!" O céu se partiu em carmesim. O Deus da Guerra aceitou a barganha.' },
      { numeral: 'III', title: 'As Lâminas do Caos', text: 'Ares não apenas dizimou o exército bárbaro, mas fundiu a servidão na carne de Kratos. As Lâminas do Caos foram presas a seus antebraços por correntes incandescentes, queimando pele e osso. Kratos deixou de ser homem para ser cão de caça de um deus.' },
      { numeral: 'IV', title: 'A Única Âncora', text: 'Lisandra e Calíope — esposa e filha — eram sua única razão de humanidade. Elas eram paz em uma vida dedicada à morte. Ares via esse amor como fraqueza que impedia Kratos de se tornar o guerreiro perfeito.' },
      { numeral: 'V', title: 'A Noite em que o Mundo Ficou Cinza', text: 'Sob as ordens de Ares, Kratos invadiu um templo da deusa Atena em frenesi de sangue. Quando a névoa baixou, aos seus pés jaziam Lisandra e Calíope. Ares havia secretamente transportado sua família para a armadilha final.' },
      { numeral: 'VI', title: 'A Maldição Eterna', text: 'A Oráculo sobrevivente lançou sua punição: as cinzas de sua esposa e filha foram fundidas à sua pele para sempre, tornando-a pálida como a lua. Assim nasceu o Fantasma de Esparta — condenado a carregar o peso de seus pecados na própria carne.' },
    ]
  },
  {
    badge: 'I',
    tag: 'ASCENSION',
    title: 'God of War: Ascension',
    summary: 'Movido por remorso corrosivo, Kratos rompeu seu juramento de sangue com Ares — o ato supremo de heresia. As Fúrias não tardaram a caçá-lo.',
    phases: [
      { numeral: 'I', title: 'O Juramento Quebrado', text: 'O sangue de sua família ainda estava quente quando Kratos rompeu o pacto com Ares. Para zelar pelos pactos entre mortais e deuses existem as Fúrias — Megaera, Tisiphone e Alecto — que não tardaram a caçar o traidor.' },
      { numeral: 'II', title: 'O Cárcere do Hecatônquiro', text: 'Capturado e levado à Prisão dos Condenados — estrutura colossal construída sobre o corpo de Aegaeon — Kratos foi submetido a seis meses de suplício. As Fúrias usavam ilusões sádicas para forçá-lo a retornar ao serviço de Ares.' },
      { numeral: 'III', title: 'O Aliado Inesperado', text: 'Orkos, filho de Ares e Alecto, revelou a Kratos a verdade: ele estava preso em ilusões tecidas pelas Fúrias. Para rompê-las, Kratos deveria recuperar os Olhos da Verdade na colossal Estátua de Apolo, em Delos.' },
      { numeral: 'IV', title: 'O Fim das Irmãs', text: 'Munido dos Olhos da Verdade, Kratos retornou ao covil das Fúrias. Alecto se transformou em criatura marinha titânica. Kratos executou as três irmãs, destruindo o domínio delas sobre sua mente e o mundo.' },
      { numeral: 'V', title: 'O Sacrifício do Guardião', text: 'Orkos revelou que o vínculo com Ares só seria extinto com sua própria morte. Em um ato de honra, pediu que Kratos o matasse. Com o coração pesado, Kratos desferiu o golpe de misericórdia. O laço com Ares foi cortado — mas as memórias se abriram.' },
      { numeral: 'VI', title: 'O Início da Servidão ao Olimpo', text: 'Livre do juramento mas escravo de pesadelos, Kratos incendiou sua casa e partiu. Ele se entregou ao serviço dos outros deuses com uma única esperança: de que um dia apagassem de sua mente o horror do que havia se tornado.' },
    ]
  },
  {
    badge: 'II',
    tag: 'CHAINS OF OLYMPUS',
    title: 'God of War: Chains of Olympus',
    summary: 'Quase uma década de servidão ao Olimpo. Quando o sol foi arrancado do firmamento por Morfeu, e a melodia da flauta de Calíope ecoou das brumas, Kratos desceu ao reino dos mortos.',
    phases: [
      { numeral: 'I', title: 'O Sol Roubado', text: 'Morfeu envolveu o mundo em pesadelos eternos ao capturar Helios. Atraído pela melodia de uma flauta que não deveria existir naquele plano, Kratos foi arrastado para os confins do submundo.' },
      { numeral: 'II', title: 'A Humilhação de Charonte', text: 'Kratos enfrentou Charonte, o Barqueiro, sendo humilhado e lançado ao abismo do Tártaro. De onde escalou com a Manopla de Zeus, forjada em puro ódio, para executar o barqueiro e invadir o Jardim do Elísio.' },
      { numeral: 'III', title: 'O Reencontro Proibido', text: 'No coração do paraíso, Kratos encontrou Calíope. A paz que nunca existiu em vida se materializou por um instante. Mas Perséfone exigiu um preço: a renúncia absoluta de toda sua força e armas.' },
      { numeral: 'IV', title: 'A Armadilha de Perséfone', text: 'Perséfone, em aliança com o Titã Atlas, planejava destruir o Pilar do Mundo e toda existência — incluindo a alma de Calíope. Confrontado com o fim de tudo, Kratos foi forçado ao ato mais vil: empurrou sua própria filha para recuperar seu poder.' },
      { numeral: 'V', title: 'Atlas Acorrentado e a Luz Devolvida', text: 'Kratos acorrentou Atlas ao peso da terra e executou Perséfone em um embate que estremeceu os pilares da criação. O sol retornou ao firmamento — mas a escuridão interna de Kratos jamais se dissiparia.' },
      { numeral: 'VI', title: 'O Preço da Vitória', text: 'Os deuses lhe devolveram a vida e as armas — mas deixaram intacta a única coisa que ele desejava destruir: a memória de ter tido sua paz nos braços e ser forçado a assassiná-la para que o mundo pudesse continuar girando.' },
    ]
  },
  {
    badge: 'III',
    tag: 'GOD OF WAR (2005)',
    title: 'God of War 1',
    summary: 'Dez anos de servidão chegam ao limite. Kratos aceita a missão impossível de matar Ares — o deus que destruiu sua vida.',
    phases: [
      { numeral: 'I', title: 'O Servo Quebrado', text: 'A Hidra estraçalhada. Os inocentes abandonados. Ao errar a chave da garganta do capitão, Kratos prova que a erosão de sua humanidade está completa. Ele não é mais general — é um condenado que busca, em cada gota de sangue, moeda de troca para o silêncio.' },
      { numeral: 'II', title: 'A Missão Impossível', text: 'Atena propõe o deicídio: Ares sitiava Atenas com exércitos de monstros. Para erguê-la contra um Deus, Kratos precisaria da Caixa de Pandora, guardada no Templo sobre o corpo do Titã Cronos.' },
      { numeral: 'III', title: 'A Escalada de Cronos', text: 'Kratos escalou o corpo colossal do Titã por três dias, enfrentando um labirinto de armadilhas e horrores mecânicos. No epicentro, reivindicou a Caixa de Pandora — a única arma capaz de matar um imortal.' },
      { numeral: 'IV', title: 'A Morte e a Fuga do Tártaro', text: 'Ares, com precisão impossível, lançou uma estaca que traversou o peito de Kratos. Mas o ódio era uma força mais antiga que o próprio Hades. Kratos escalou os pilares de ossos e retornou ao mundo dos vivos.' },
      { numeral: 'V', title: 'O Deicídio', text: 'Ao abrir a Caixa de Pandora, Kratos transmutou-se, elevando-se à estatura de um titã. O duelo com Ares estremeceu as fundações da Grécia. Entre manipulações mentais e choques de aço divino, Kratos ergueu seu golpe final. O Deus da Guerra caiu.' },
      { numeral: 'VI', title: 'A Promessa Quebrada dos Deuses', text: 'Atena revelou a semântica perversa do Olimpo: os deuses perdoaram seus pecados, mas jamais prometeram o esquecimento. Destruído, Kratos lançou-se no abismo — e foi resgatado pelos deuses para um destino ainda mais cruel: o trono do próprio Ares.' },
    ]
  },
  {
    badge: 'IV',
    tag: 'GHOST OF SPARTA',
    title: 'God of War: Ghost of Sparta',
    summary: 'Deus da Guerra atormentado por visões de um irmão que acreditava morto. A jornada ao submundo revela que os próprios deuses manipularam sua infância.',
    phases: [
      { numeral: 'I', title: 'As Visões que Perturbam o Deus', text: 'Sentado no trono de Ares, Kratos descobriu que a divindade era uma prisão dourada. Visões de sua mãe Callisto e de seu irmão Deimos o assombram. Ignorando Atena, navega até Atlântida, que submerge sob o peso de sua fúria.' },
      { numeral: 'II', title: 'O Segredo de Callisto', text: 'No Templo de Poseidon, Kratos encontrou sua mãe consumida por uma maldição divina. Antes de se transformar em besta, ela sussurrou a verdade: Deimos estava vivo, torturado no Domínio da Morte. Kratos foi forçado a assassinar a própria mãe.' },
      { numeral: 'III', title: 'A Profecia e a Cicatriz', text: 'Kratos relembrou o dia em que o Oráculo profetizou a queda do Olimpo. Ares e Atena sequestraram Deimos por suas marcas de nascença. Kratos, incapaz de impedir o rapto, tatuou o próprio corpo em homenagem ao irmão perdido.' },
      { numeral: 'IV', title: 'Nos Domínios de Thanatos', text: 'Kratos infiltrou-se no Domínio da Morte, governado por Thanatos. O reencontro foi banhado em fel: Deimos, consumido por décadas de tortura, atacou Kratos furiosamente. A luta entre irmãos foi interrompida pela intervenção do próprio Thanatos.' },
      { numeral: 'V', title: 'O Sacrifício de Deimos', text: 'O vínculo de sangue superou o rancor. Unidos, os irmãos lutaram. Mas Deimos sacrificou sua vida para proteger Kratos. O Fantasma de Esparta desmembrou Thanatos em um acesso de fúria absoluta — e carregou o irmão até seu último repouso.' },
      { numeral: 'VI', title: 'A Recusa', text: 'Atena ofereceu a divindade plena e o apagamento das memórias. Mas Kratos, forjado no ódio puro contra a manipulação dos deuses, recusou. As cinzas em sua pele tornaram-se o estandarte de uma guerra iminente contra o próprio Olimpo.' },
    ]
  },
  {
    badge: 'V',
    tag: 'GOD OF WAR II',
    title: 'God of War 2',
    summary: 'Traído e morto por Zeus, Kratos se recusa a aceitar o fim. Resgatado pelos Titãs, parte para alterar o próprio Destino.',
    phases: [
      { numeral: 'I', title: 'A Hubris do Deus da Guerra', text: 'Kratos transformou sua dor em cruzada de expansão espartana, desafiando todos os outros deuses. Zeus não suportava mais a presença do filho bastardo que ameaçava o equilíbrio do Olimpo.' },
      { numeral: 'II', title: 'A Traição de Zeus', text: 'Zeus drenou os poderes de Kratos para a Lâmina do Olimpo sob o pretexto de derrotar o Colosso de Rodes. Mortal pela primeira vez em anos, Kratos foi executado pelo próprio pai — sentenciado ao esquecimento eterno.' },
      { numeral: 'III', title: 'O Resgate de Gaia', text: 'Enquanto sua alma era arrastada para o abismo, Gaia a resgatou. A Mãe Terra revelou que o único caminho para a vingança era alterar o Destino, forçando as Irmãs do Destino a retroceder o tempo até o momento da traição.' },
      { numeral: 'IV', title: 'A Odisseia da Vingança', text: 'Kratos iniciou uma jornada brutal através do Mar em Fúria. De Teseu a Perseu, todos que se colocaram em seu caminho foram massacrados por um homem que nada mais tinha a perder, exceto a própria vida.' },
      { numeral: 'V', title: 'O Tear do Destino', text: 'Ao alcançar o Templo das Irmãs do Destino, Kratos assassinou as senhoras do tempo e assumiu o controle do Tear. Voltou ao instante exato em que Zeus o matou — e o confronto que se seguiu estremeceu os céus.' },
      { numeral: 'VI', title: 'O Sacrifício de Atena e o Exército dos Titãs', text: 'Atena se sacrificou para salvar Zeus, revelando que Kratos era seu filho. Sem mais mentores, sem mais restrições, Kratos usou o Tear para resgatar os Titãs do passado. A cena final é o prólogo do apocalipse: Kratos liderando gigantes contra o Olimpo.' },
    ]
  },
  {
    badge: 'VI',
    tag: 'GOD OF WAR III',
    title: 'God of War 3',
    summary: 'O fim não começou com um sussurro, mas com o rugido dos Titãs escalando o Olimpo. Kratos inicia a chacina sistemática do panteão grego.',
    phases: [
      { numeral: 'I', title: 'A Traição de Gaia', text: 'Ao ser derrubado do Olimpo pela própria Gaia — que o via como peão descartável — Kratos caiu novamente no Hades. Ele iniciou uma chacina mecânica e sistemática contra o panteão grego, transformando a realidade em cenário pós-apocalíptico.' },
      { numeral: 'II', title: 'O Colapso do Mundo', text: 'Cada deus morto cobrava seu preço da criação. A morte de Poseidon inundou as cidades; a de Hélios apagou o sol; a de Hermes trouxe pragas. Kratos não estava matando divindades — estava desmantelando a realidade.' },
      { numeral: 'III', title: 'Pandora e a Centelha Humana', text: 'No centro da tempestade surgiu Pandora, criança-artefato que despertou em Kratos os resquícios de humanidade que ele acreditava ter incinerado. Ela era a chave para apagar a Chama do Olimpo e abrir a Caixa uma última vez.' },
      { numeral: 'IV', title: 'O Confronto Final com Zeus', text: 'O combate entre pai e filho estilhaçou o Monte Olimpo. Zeus usou cada fragmento de poder divino. No abismo da própria mente de Kratos, ele foi confrontado por seus pecados — e encontrou o que os deuses tentaram esconder: a Esperança.' },
      { numeral: 'V', title: 'A Esperança Libertada', text: 'Munido da Esperança, Kratos silenciou Zeus, encerrando o reinado dos olímpicos. Atena reapareceu exigindo o poder da Esperança para governar a humanidade. Mas Kratos negou — e a liberou para todos os seres, com o último golpe da Lâmina do Olimpo em si mesmo.' },
      { numeral: 'VI', title: 'O Fim e o Recomeço', text: 'Kratos caiu sobre o símbolo de Fênix, deixando um rastro de sangue ao precipício. Seu corpo desapareceu. Para o Fantasma de Esparta que destruiu o mundo, o fim era apenas um novo começo envolto em mistério — e uma nova era estava por vir.' },
    ]
  },
];

const TIMELINE_NORDIC = [
  {
    badge: 'VII',
    tag: 'GOD OF WAR (2018)',
    title: 'God of War 2018',
    summary: 'Décadas após o colapso do Olimpo. Kratos vive como mortal em Midgard, pai de Atreus. Após a morte de Faye, eles partem para o pico mais alto dos Nove Reinos.',
    phases: [
      { numeral: 'I', title: 'O Homem nas Florestas do Norte', text: 'Kratos vive nas florestas geladas de Midgard, suprimindo sua natureza divina. Com a morte de sua esposa Faye — uma gigante —, ele e seu filho Atreus partem para espalhar suas cinzas no pico mais alto dos Nove Reinos.' },
      { numeral: 'II', title: 'Baldur e o Mistério', text: 'Baldur, filho imortal de Freya, aparece na porta de Kratos procurando alguém. Sua imunidade a qualquer dano o torna imprevisível. A jornada de pai e filho começa marcada por perseguição e segredos não revelados.' },
      { numeral: 'III', title: 'Os Anões e o Machado', text: 'Brok e Sindri, anões artesãos que forjaram o próprio Mjolnir, tornam-se aliados improváveis. O Machado Leviatã — presente de Faye para Kratos — revela sua origem: forjado com o mesmo metal do martelo de Thor.' },
      { numeral: 'IV', title: 'Mimir e os Nove Reinos', text: 'Kratos liberta Mimir — o homem mais sábio dos Nove Reinos, preso numa árvore por Odin. A única forma de libertá-lo: decepar sua cabeça e ressuscitá-la. O conselheiro incansável revela os segredos dos reinos enquanto a jornada avança.' },
      { numeral: 'V', title: 'A Verdade sobre Atreus', text: 'Atreus adoece gravemente. Kratos é forçado a revelar sua natureza divina ao filho. Mas a revelação desperta arrogância perigosa em Atreus — que descobre ser Loki, filho de uma gigante, destinado a um papel central no Ragnarök.' },
      { numeral: 'VI', title: 'O Topo e o Retorno', text: 'As cinzas de Faye são espalhadas em Jötunheim. Lá, pinturas proféticas mostram toda a jornada já como prevista pelos gigantes. Faye sabia de tudo. De volta a Midgard, Kratos e Atreus vencem Baldur — e o Fimbulwinter começa: o inverno que precede o fim.' },
    ]
  },
  {
    badge: 'VIII',
    tag: 'GOD OF WAR RAGNARÖK',
    title: 'God of War Ragnarök',
    summary: 'O Fimbulwinter chegou. Pai e filho devem decidir entre o destino escrito pelos gigantes ou trilhar seu próprio caminho enquanto o fim do mundo se aproxima.',
    phases: [
      { numeral: 'I', title: 'O Inverno do Fim', text: 'Três anos de Fimbulwinter. Thor aparece na porta de Kratos em nome de Odin. O confronto é brutal e serve de probing: Odin quer negociar. Kratos recusa — e a guerra contra Asgard se torna inevitável.' },
      { numeral: 'II', title: 'Atreus e a Profecia', text: 'Impaciente, Atreus parte sozinho para descobrir sua profecia como Loki. Infiltrado em Asgard disfarçado, ele encontra Tyr — que revela ser o próprio Odin disfarçado. A manipulação era total desde o começo.' },
      { numeral: 'III', title: 'A Redenção de Thor', text: 'Thor, corroído pela culpa de matar os próprios filhos por ordem de Odin, começa a questionar tudo. No momento em que escolhe ser melhor — recusando-se a obedecer Odin —, é assassinado pelo próprio pai. Sua tentativa de redenção é interrompida no auge.' },
      { numeral: 'IV', title: 'O Plano de Freya', text: 'Freya, consumida pelo ódio após a morte de Baldur, escolhe unir forças com Kratos após aceitar o perdão. Juntos, formam a aliança que tornará possível a invasão de Asgard — o coração do poder de Odin.' },
      { numeral: 'V', title: 'O Ragnarök e a Escolha', text: 'A grande batalha de Ragnarök é desencadeada pelos próprios heróis. Kratos confronta Odin no último ato. A realização: Ragnarök não precisava ser uma destruição total — era uma oportunidade de mudança. Atreus parte para sua própria jornada como Loki.' },
      { numeral: 'VI', title: 'Um Novo Começo', text: 'Kratos sobrevive. Pela primeira vez em sua existência, ele não é mais carrasco nem servo — é símbolo de algo além da destruição. As pinturas dos gigantes mostravam um deus da guerra sendo venerado, não temido. O ciclo de violência foi quebrado.' },
    ]
  },
];

// ============================================
//  BUILDER DE TIMELINE
// ============================================
function buildCard(entry, isNordic) {
  const borderClass = isNordic ? '' : (entry.isOrigin ? 'gow-origin' : '');
  const badgeNordic = isNordic ? 'nordic-badge-entry' : '';
  const tagNordic   = isNordic ? 'nordic' : '';

  const phasesHtml = entry.phases.map(ph => `
    <div class="phase-item">
      <div class="phase-numeral">${ph.numeral}</div>
      <div>
        <h4 class="phase-title">${ph.title}</h4>
        <p class="phase-text">${ph.text}</p>
      </div>
    </div>
    <div class="phase-divider"></div>
  `).join('');

  return `
    <div class="gow-entry reveal ${borderClass}" tabindex="0" role="button" aria-expanded="false">
      <div class="gow-entry-badge ${badgeNordic}">${entry.badge}</div>
      <div class="gow-entry-content">
        <div class="gow-entry-meta"><span class="gow-game-tag ${tagNordic}">${entry.tag}</span></div>
        <h3 class="gow-entry-title">${entry.title}</h3>
        <p class="entry-summary">${entry.summary}</p>
        <div class="phases-container">${phasesHtml}</div>
        <div class="expand-hint"></div>
      </div>
    </div>
  `;
}

function buildTimelines() {
  const greek  = document.getElementById('timelineGreek');
  const nordic = document.getElementById('timelineNordic');

  if (greek)  greek.innerHTML  = TIMELINE_GREEK.map(e => buildCard(e, false)).join('');
  if (nordic) nordic.innerHTML = TIMELINE_NORDIC.map(e => buildCard(e, true)).join('');

  // Re-observe reveals after dynamic build
  document.querySelectorAll('.gow-entry.reveal').forEach(el => revealObserver.observe(el));

  // Attach expand
  setupTimelineExpansion();
}

// ============================================
//  EXPANSÃO DAS TIMELINES
// ============================================
function setupTimelineExpansion() {
  document.querySelectorAll('.gow-entry').forEach(entry => {
    const open = () => {
      const isExpanded = entry.classList.contains('expanded');
      entry.classList.toggle('expanded');
      entry.setAttribute('aria-expanded', !isExpanded);
      if (!isExpanded) {
        setTimeout(() => entry.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 320);
      }
    };
    entry.addEventListener('click', open);
    entry.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  });
}

// ============================================
//  DADOS DOS PERSONAGENS
// ============================================
const GAME_CHARS = {

  ascension: {
    label: 'GOD OF WAR: ASCENSION',
    era: 'greek',
    chars: [
      { icon:'⚔️', av:'av-hero',    role:'PROTAGONISTA',   name:'Kratos',     img:'profile/kratos_5.png',   desc:'General espartano que rompeu o pacto com Ares. Caçado pelas Fúrias, luta para manter sua sanidade e provar que sua vontade é mais forte do que qualquer corrente.', stats:[{l:'FORÇA',v:100},{l:'RAIVA',v:95}] },
      { icon:'🔥', av:'av-villain', role:'DEUS DA GUERRA',  name:'Ares',       img:'profile/ares_1.png',     desc:'Manipulou Kratos para cometer o pior crime concebível. Seu plano vai além da guerra: quer derrubar Zeus e conquistar o Olimpo com seu exército forjado em traição.', stats:[{l:'PODER',v:92},{l:'MANIPULAÇÃO',v:98}] },
      { icon:'🐍', av:'av-villain', role:'FÚRIA – CAÇADORA',name:'Megaera',    img:'profile/megaera.png',    desc:'A mais brutal das Fúrias. Especialista em pragas e vermes parasitas, usa seu corpo como arma viva para punir os que ousam quebrar juramentos sagrados.', stats:[{l:'AGRESSIVIDADE',v:90},{l:'PODER',v:85}] },
      { icon:'🌙', av:'av-villain', role:'FÚRIA – ILUSIONISTA',name:'Tisiphone',img:'profile/tisiphone.png', desc:'Mestra das ilusões, capaz de recriar memórias dolorosas com perfeição assustadora. Usa a mente de Kratos como campo de batalha, distorcendo passado e presente.', stats:[{l:'ILUSÃO',v:95},{l:'CRUELDADE',v:88}] },
      { icon:'⛓️', av:'av-villain', role:'FÚRIA – LÍDER',   name:'Alecto',     img:'profile/alecto.png',     desc:'Rainha das Fúrias e guardiã suprema dos juramentos. A mais poderosa das três irmãs, capaz de se transformar em criatura marinha colossal para arrastar Kratos ao fundo do oceano.', stats:[{l:'PODER',v:98},{l:'VONTADE',v:100}] },
      { icon:'🗡️', av:'av-ally',   role:'ALIADO – GUARDIÃO',name:'Orkos',     img:'profile/orkos.png',      desc:'Filho de Ares e Alecto que traiu a própria família. Guia Kratos até os Olhos da Verdade e, por fim, pede a própria morte para libertar ambos do pacto que os acorrentava.', stats:[{l:'HONRA',v:95},{l:'CORAGEM',v:90}] },
    ]
  },

  chains: {
    label: 'GOD OF WAR: CHAINS OF OLYMPUS',
    era: 'greek',
    chars: [
      { icon:'⚔️', av:'av-hero',    role:'PROTAGONISTA',       name:'Kratos',    img:'profile/kratos_4.png',    desc:'Cumpre ordens dos deuses com a esperança de que apaguem seus pesadelos. Cada batalha é mais um degrau numa escada que parece não ter fim.', stats:[{l:'FORÇA',v:100},{l:'DETERMINAÇÃO',v:98}] },
      { icon:'🌅', av:'av-ally',    role:'DEUS DO SOL',        name:'Helios',    img:'profile/helio.png',       desc:'O titã que carrega o sol foi capturado por Morfeu. Com ele preso, o mundo mergulhou em escuridão eterna — Kratos deve resgatá-lo antes que tudo seja consumido.', stats:[{l:'PODER SOLAR',v:88},{l:'IMPORTÂNCIA',v:95}] },
      { icon:'💤', av:'av-villain', role:'DEUS DOS SONHOS',    name:'Morfeu',    img:'profile/morfeu.png',      desc:'Aproveitando a ausência de Helios, mergulhou os deuses do Olimpo em sono profundo para agir sem oposição. Trabalha nas sombras, nunca confrontando Kratos diretamente.', stats:[{l:'ASTÚCIA',v:85},{l:'PODER',v:80}] },
      { icon:'🌺', av:'av-villain', role:'ANTAGONISTA PRINCIPAL',name:'Perséfone',img:'profile/persefone.png', desc:'Presa em eterno casamento com Hades, planejou durante séculos a destruição de toda criação como forma de escapar. Sua raiva é legítima — mas seu método, apocalíptico.', stats:[{l:'PODER MÁGICO',v:92},{l:'RESSENTIMENTO',v:100}] },
      { icon:'🌸', av:'av-special', role:'FILHA DE KRATOS',    name:'Calliope',  img:'profile/calliope.png',    desc:'A filha amada que morreu jovem. Sua memória é o que ainda mantém a centelha de humanidade viva em Kratos. Vê-la uma última vez custa um preço imenso.', stats:[{l:'INOCÊNCIA',v:100},{l:'IMPORTÂNCIA',v:100}] },
    ]
  },

  gow1: {
    label: 'GOD OF WAR I',
    era: 'greek',
    chars: [
      { icon:'⚔️', av:'av-hero',    role:'PROTAGONISTA',      name:'Kratos',  img:'profile/kratos_2.png',  desc:'Dez anos de pesadelos chegam ao limite. Aceita matar Ares não por glória, mas pela única promessa que ainda faz sentido: apagar a memória de sua família morta.', stats:[{l:'FORÇA',v:100},{l:'FÚRIA',v:100}] },
      { icon:'🔥', av:'av-villain', role:'ANTAGONISTA FINAL',  name:'Ares',   img:'profile/ares_2.png',    desc:'Sitiou Atenas com exércitos de monstros enquanto desafiava Zeus. Acreditava ter criado a arma perfeita em Kratos — não calculou que a arma se voltaria contra ele.', stats:[{l:'PODER',v:96},{l:'ARROGÂNCIA',v:99}] },
      { icon:'⚡', av:'av-ally',    role:'REI DOS DEUSES',     name:'Zeus',   img:'profile/zeus_1.png',    desc:'Aparece como aliado, oferecendo auxílio na busca pela Caixa de Pandora. Seu verdadeiro papel na saga ainda está por ser revelado — mas o medo já governa suas ações.', stats:[{l:'PODER',v:100},{l:'MISTÉRIO',v:98}] },
      { icon:'🦅', av:'av-ally',    role:'DEUSA DA SABEDORIA', name:'Atena',  img:'profile/atena_1.png',   desc:'Protetora de Atenas e mentora de Kratos. Concede o poder para usar a Caixa de Pandora e orienta cada passo — mas sua agenda pessoal vai além da proteção da cidade.', stats:[{l:'SABEDORIA',v:98},{l:'MANIPULAÇÃO',v:85}] },
      { icon:'📜', av:'av-ally',    role:'ORÁCULO DE ATENAS',  name:'Oráculo',img:'profile/oraculo.png',   desc:'Vidente guardiã da cidade que guia Kratos até o templo de Pandora. Seu sacrifício final mostra que Kratos deixa um rastro de destruição até naqueles que o ajudam.', stats:[{l:'VISÃO',v:95},{l:'SACRIFÍCIO',v:100}] },
      { icon:'📦', av:'av-special', role:'CHAVE DA ESPERANÇA', name:'Pandora',img:'profile/pandora_1.png', desc:'O que está dentro da caixa vai além de males. A Esperança, a força mais poderosa da criação, foi trancafiada para não desequilibrar os planos dos deuses.', stats:[{l:'ESPERANÇA',v:100},{l:'PODER LATENTE',v:100}] },
    ]
  },

  ghost: {
    label: 'GOD OF WAR: GHOST OF SPARTA',
    era: 'greek',
    chars: [
      { icon:'⚔️', av:'av-hero',    role:'PROTAGONISTA',     name:'Kratos', img:'profile/kratos_3.png', desc:'Deus da Guerra atormentado por visões de um irmão que acreditava morto. A jornada revela que os próprios deuses manipularam sua infância para se protegerem da profecia.', stats:[{l:'FORÇA',v:100},{l:'DETERMINAÇÃO',v:98}] },
      { icon:'👊', av:'av-special', role:'IRMÃO DE KRATOS',  name:'Deimos', img:'profile/deimos.png',   desc:'Capturado pelos deuses ainda criança por ostentar a marca do Escolhido. Passou décadas sendo torturado por Thanatos. Seu reencontro com Kratos é trágico e violentamente breve.', stats:[{l:'COMBATE',v:90},{l:'RESSENTIMENTO',v:88}] },
      { icon:'👩', av:'av-ally',    role:'MÃE DE KRATOS',   name:'Calisto', img:'profile/calisto.png',  desc:'A mortal que uniu-se a Zeus e gerou dois filhos semidivinos. Amaldiçoada para jamais revelar a identidade do pai, carregou o segredo até o fim — e ele mudou tudo.', stats:[{l:'FORÇA DE VONTADE',v:92},{l:'SEGREDO',v:100}] },
      { icon:'💀', av:'av-villain', role:'DEUS DA MORTE',    name:'Thanatos',img:'profile/thanatos.png', desc:'O senhor primordial da morte que capturou Deimos séculos atrás para garantir que a profecia nunca se cumprisse. Sua derrota vem a um custo devastador.', stats:[{l:'PODER',v:95},{l:'CRUELDADE',v:90}] },
      { icon:'🦁', av:'av-villain', role:'FILHA DE THANATOS',name:'Erinys',  img:'profile/erinys.png',  desc:'A poderosa filha do Deus da Morte. Ataca Kratos furiosamente quando o espartano ameaça o plano de seu pai, demonstrando que a morte nas terras de Thanatos tem sua própria dinastia.', stats:[{l:'VELOCIDADE',v:90},{l:'PODER',v:85}] },
    ]
  },

  gow2: {
    label: 'GOD OF WAR II',
    era: 'greek',
    chars: [
      { icon:'⚔️', av:'av-hero',    role:'PROTAGONISTA',          name:'Kratos', img:'profile/kratos_1.jpg', desc:'Traído e morto por Zeus, recusa-se a aceitar o fim. Resgatado por Gaia, embarca numa viagem pelo tempo para confrontar as Irmãs do Destino e reescrever o momento de sua morte.', stats:[{l:'FORÇA',v:100},{l:'RAIVA',v:100}] },
      { icon:'⚡', av:'av-villain', role:'ANTAGONISTA PRINCIPAL',   name:'Zeus',   img:'profile/zeus_2.png',  desc:'O rei dos olimpianos finalmente mostra suas cartas. Movido pelo terror da profecia, age preventivamente e condena Kratos à morte. O ciclo de filhos matando pais começa de novo.', stats:[{l:'PODER',v:100},{l:'MEDO',v:95}] },
      { icon:'🌍', av:'av-ally',    role:'TITÃ DA TERRA',          name:'Gaia',   img:'profile/gaia.png',    desc:'A Mãe Terra ressuscita Kratos para seus próprios propósitos. Nutre a raiva do espartano como combustível para a vingança dos Titãs — mas seus motivos raramente coincidem com os de Kratos.', stats:[{l:'PODER',v:98},{l:'MANIPULAÇÃO',v:90}] },
      { icon:'✂️', av:'av-villain', role:'IRMÃ DO DESTINO',        name:'Átropos', img:'profile/atropos.png', desc:'A cortadora dos fios da vida. Junto com as irmãs, tece e termina o ciclo de cada ser do cosmos. Seu domínio sobre o passado a torna um dos oponentes mais perigosos da saga.', stats:[{l:'DOMÍNIO DO TEMPO',v:95},{l:'PODER',v:88}] },
      { icon:'🕸️', av:'av-villain', role:'IRMÃ DO DESTINO',        name:'Cloto',   img:'profile/cloto.png',   desc:'A fiandeira primordial, a mais poderosa das Parcas. Tecer, medir, cortar: as três leis do cosmos que Kratos deve subverter para alterar seu destino no Espelho do Tempo.', stats:[{l:'CONTROLE DO DESTINO',v:100},{l:'PODER',v:95}] },
      { icon:'🦅', av:'av-ally',    role:'DEUSA – SACRIFÍCIO',     name:'Atena',   img:'profile/atena_2.png', desc:'Interfere no confronto final entre Kratos e Zeus, sacrificando-se acidentalmente. Sua morte não é o fim — ela retorna transformada, com uma agenda ainda mais obscura.', stats:[{l:'SABEDORIA',v:98},{l:'AMBIGUIDADE',v:96}] },
    ]
  },

  gow3: {
    label: 'GOD OF WAR III',
    era: 'greek',
    chars: [
      { icon:'⚔️', av:'av-hero',    role:'PROTAGONISTA',      name:'Kratos',   img:'profile/kratos_6.png',  desc:'O destruidor do Olimpo. Escala o Monte sagrado sobre os Titãs e abate imortais com brutalidade crescente. Dentro de si, uma chama que não é raiva — é a Esperança que ainda arde.', stats:[{l:'FORÇA',v:100},{l:'DETERMINAÇÃO',v:100}] },
      { icon:'⚡', av:'av-villain', role:'CHEFE FINAL',        name:'Zeus',     img:'profile/zeus_3.png',    desc:'O combate final entre pai e filho estilhaça o Olimpo. Zeus usa cada fragmento de poder divino. Mas o medo, que moldou cada decisão errada de sua existência, o condena.', stats:[{l:'PODER',v:100},{l:'MEDO',v:100}] },
      { icon:'🔱', av:'av-villain', role:'DEUS DOS MARES',     name:'Posêidon', img:'profile/poseidon.png',  desc:'O primeiro a cair. Sua morte é um prenúncio: sem seu guardião, os oceanos inundam o mundo. Cada deus morto cobra seu preço da própria criação.', stats:[{l:'PODER AQUÁTICO',v:95},{l:'ORGULHO',v:90}] },
      { icon:'💀', av:'av-villain', role:'DEUS DO SUBMUNDO',   name:'Hades',    img:'profile/hades.png',     desc:'Senhor da morte que guarda as almas do Tártaro — incluindo a família de Kratos. Sua derrota enfraquece a barreira entre vivos e mortos e liberta tudo que devia ficar contido.', stats:[{l:'DOMÍNIO DA MORTE',v:95},{l:'PODER',v:92}] },
      { icon:'🌺', av:'av-ally',    role:'CHAVE VIVA',         name:'Pandora',  img:'profile/pandora_2.png', desc:'Criada por Hefesto como a única chave capaz de abrir a caixa. Sua coragem infantil envergonha deuses. Seu sacrifício revela que o verdadeiro conteúdo da caixa sempre esteve em Kratos.', stats:[{l:'CORAGEM',v:100},{l:'INOCÊNCIA',v:100}] },
      { icon:'🔨', av:'av-ally',    role:'DEUS DA FORJA',      name:'Hefesto',  img:'profile/hefesto.png',   desc:'Exilado do Olimpo para proteger Pandora dos planos de Zeus. Oscila entre aliado e obstáculo. Seu fim é um dos mais trágicos do jogo.', stats:[{l:'HABILIDADE',v:98},{l:'AMOR PATERNAL',v:100}] },
    ]
  },

  gow2018: {
    label: 'GOD OF WAR (2018)',
    era: 'nordic',
    chars: [
      { icon:'🪓', av:'av-nordic-hero',    role:'PROTAGONISTA',      name:'Kratos',      img:'profile_ragnarok/kratos_ragnarok_1.jpeg', desc:'Décadas após o colapso do Olimpo, vive como mortal em Midgard. Suprime sua natureza divina — mas ser pai exige mais força do que qualquer batalha.', stats:[{l:'FORÇA',v:100},{l:'SABEDORIA',v:78}] },
      { icon:'🏹', av:'av-nordic-hero',    role:'CO-PROTAGONISTA',   name:'Atreus',      img:'profile_ragnarok/atreus_1.jpeg',          desc:'Filho de Kratos e Faye. Curioso, empático e impulsivo — tudo que o pai não é. Seus poderes rúnicos e habilidades com o arco complementam a brutalidade do pai. Seu verdadeiro nome é Loki.', stats:[{l:'INTELIGÊNCIA',v:92},{l:'PODER RÚNICO',v:85}] },
      { icon:'⚡', av:'av-nordic-villain', role:'ANTAGONISTA',        name:'Baldur',      img:'profile_ragnarok/baldur.png',             desc:'Filho imortal de Freya, amaldiçoado para nunca sentir nada. Sua obsessão por sentir qualquer coisa o torna imprevisível, volátil e profundamente trágico.', stats:[{l:'IMORTALIDADE',v:100},{l:'BRUTALIDADE',v:92}] },
      { icon:'🌿', av:'av-nordic-ally',    role:'ALIADA / MÃE',      name:'Freya',       img:'profile_ragnarok/freya.png',              desc:'Rainha dos Vanir exilada nas florestas de Midgard. Sua sabedoria e magia curam Kratos e Atreus. Seu amor por Baldur é uma bomba de tempo que detonará no pior momento.', stats:[{l:'MAGIA',v:95},{l:'AMOR MATERNAL',v:100}] },
      { icon:'🐍', av:'av-nordic-special', role:'A SERPENTE MUNDIAL', name:'Jörmungandr', img:'profile_ragnarok/Jörmungandr.png',        desc:'Criatura tão vasta que seu corpo circunda o mundo. Fala uma língua ancestral que Atreus compreende — porque, paradoxalmente, o próprio Atreus é seu ancestral através de um paradoxo temporal.', stats:[{l:'TAMANHO',v:100},{l:'PODER',v:99}] },
      { icon:'👻', av:'av-nordic-ally',    role:'ALIADO – CONSELHEIRO',name:'Mimir',      img:'profile_ragnarok/mimir.png',              desc:'O homem mais inteligente dos Nove Reinos, preso numa árvore por Odin. Kratos o liberta da única forma possível. Sua cabeça falante torna-se narrador, historiador e alívio cômico da jornada.', stats:[{l:'CONHECIMENTO',v:100},{l:'HUMOR',v:97}] },
    ]
  },

  ragnarok: {
    label: 'GOD OF WAR: RAGNARÖK',
    era: 'nordic',
    chars: [
      { icon:'🪓', av:'av-nordic-hero',    role:'PROTAGONISTA',           name:'Kratos',   img:'profile_ragnarok/kratos_ragnarok_2.png', desc:'O Fantasma de Esparta que aprendeu a ser mais. Não luta mais por vingança — luta para proteger seu filho e, pela primeira vez, para ser símbolo de algo além de destruição.', stats:[{l:'FORÇA',v:100},{l:'SABEDORIA',v:92}] },
      { icon:'🏹', av:'av-nordic-hero',    role:'LOKI – AGENTE DO DESTINO',name:'Atreus',  img:'profile_ragnarok/atreus_2.png',          desc:'Impaciente com a cautela do pai, infiltra-se em Asgard disfarçado. O que encontra muda sua compreensão do Ragnarök — e do papel que cada um deve desempenhar.', stats:[{l:'ASTÚCIA',v:96},{l:'PODER RÚNICO',v:94}] },
      { icon:'👁️', av:'av-nordic-villain', role:'ANTAGONISTA PRINCIPAL',   name:'Odin',    img:'profile_ragnarok/odin.png',              desc:'O Allfather. Manipulador brilhante e paranoico supremo, destruiu mundos inteiros em busca do segredo do Ragnarök. É o vilão mais inteligente e complexo de toda a saga.', stats:[{l:'ASTÚCIA',v:100},{l:'PODER',v:97}] },
      { icon:'⚡', av:'av-nordic-villain', role:'DEUS DO TROVÃO',          name:'Thor',    img:'profile_ragnarok/thor.png',              desc:'Brutal, alcoólatra e corroído pela culpa de matar os próprios filhos por ordem de Odin. Seu arco de redenção: no momento em que escolhe ser melhor, paga com a vida.', stats:[{l:'FORÇA BRUTA',v:100},{l:'MJÖLNIR',v:100}] },
      { icon:'⚔️', av:'av-nordic-special', role:'DEUS DA GUERRA NÓRDICO',  name:'Tyr',     img:'profile_ragnarok/brok.png',              desc:'Único deus de guerra que os gigantes veneravam como símbolo de paz. Sua verdadeira identidade esconde uma reviravolta que poucos viram vir.', stats:[{l:'MISTÉRIO',v:100},{l:'PODER',v:88}] },
      { icon:'🌿', av:'av-nordic-ally',    role:'ALIADA – REDENÇÃO',       name:'Freya',   img:'profile_ragnarok/freya.png',             desc:'Consumida pelo ódio após a morte de Baldur, jurou matar Kratos. Seu arco de luto, raiva e perdão ao longo de Ragnarök é um dos mais nuançados da história dos videogames.', stats:[{l:'MAGIA',v:98},{l:'CORAGEM',v:95}] },
      { icon:'🐺', av:'av-nordic-ally',    role:'O GRANDE LOBO',           name:'Fenrir',  img:'profile_ragnarok/fenrir.png',            desc:'O lobo lendário criado por Atreus a partir de fragmentos de si mesmo enviados ao passado. A conexão entre os dois revela que Atreus sempre soube, em algum nível, o que estava fazendo.', stats:[{l:'FORÇA',v:90},{l:'LEALDADE',v:100}] },
      { icon:'🔨', av:'av-nordic-ally',    role:'FERREIRO ANÃO',           name:'Brok',    img:'profile_ragnarok/brok.png',              desc:'Um dos anões que forjaram o Machado Leviatã. Brusco, irreverente e leal, Brok é o coração cômico e humano da saga nórdica — cujo fim é um dos mais impactantes de Ragnarök.', stats:[{l:'HABILIDADE',v:96},{l:'CORAGEM',v:85}] },
      { icon:'🔧', av:'av-nordic-ally',    role:'FERREIRO ANÃO',           name:'Sindri',  img:'profile_ragnarok/sindri.png',            desc:'Irmão de Brok e co-forjador do Machado Leviatã. Mais refinado e ansioso que o irmão. Sua jornada pessoal em Ragnarök é marcada por uma perda que o transforma completamente.', stats:[{l:'HABILIDADE',v:97},{l:'PRECISÃO',v:99}] },
      { icon:'🌈', av:'av-nordic-villain', role:'DEUS DA VIGILÂNCIA',      name:'Heimdall',img:'profile_ragnarok/heimdall.png',          desc:'O deus mais arrogante e irritante de Asgard. Sua capacidade de prever movimentos o torna quase intocável — até que Kratos encontra a maneira de surpreendê-lo.', stats:[{l:'PREVISÃO',v:98},{l:'ARROGÂNCIA',v:100}] },
    ]
  },

};

// ============================================
//  SISTEMA DE PERSONAGENS
// ============================================
let openEra = null;

function toggleSubGames(era) {
  const isGrega = era === 'grega';
  const thisId  = isGrega ? 'subGamesGrega'   : 'subGamesNordica';
  const otherId = isGrega ? 'subGamesNordica' : 'subGamesGrega';
  const thisAr  = isGrega ? 'arrowGrega'      : 'arrowNordica';
  const otherAr = isGrega ? 'arrowNordica'    : 'arrowGrega';
  const thisBt  = isGrega ? 'btnEraGrega'     : 'btnEraNordica';
  const otherBt = isGrega ? 'btnEraNordica'   : 'btnEraGrega';

  const thisRow  = document.getElementById(thisId);
  const otherRow = document.getElementById(otherId);
  const isOpen   = thisRow.classList.contains('visible');

  otherRow.classList.remove('visible');
  document.getElementById(otherAr).classList.remove('open');
  document.getElementById(otherBt).classList.remove('active');

  if (isOpen) {
    thisRow.classList.remove('visible');
    document.getElementById(thisAr).classList.remove('open');
    document.getElementById(thisBt).classList.remove('active');
    openEra = null;
    clearCharsDisplay();
  } else {
    thisRow.classList.add('visible');
    document.getElementById(thisAr).classList.add('open');
    document.getElementById(thisBt).classList.add('active');
    openEra = era;
    clearActiveSubBtn();
    clearCharsDisplay();
  }
}

function clearActiveSubBtn() {
  document.querySelectorAll('.sub-btn').forEach(b => b.classList.remove('active'));
}
function clearCharsDisplay() {
  const title = document.getElementById('charsDisplayTitle');
  const grid  = document.getElementById('charsGrid');
  title.classList.remove('visible'); title.textContent = ''; grid.innerHTML = '';
}

function loadChars(gameKey, btnEl) {
  const data = GAME_CHARS[gameKey];
  if (!data) return;
  clearActiveSubBtn();
  if (btnEl) btnEl.classList.add('active');

  const titleEl  = document.getElementById('charsDisplayTitle');
  const gridEl   = document.getElementById('charsGrid');
  const isNordic = data.era === 'nordic';

  titleEl.classList.remove('visible');
  gridEl.style.opacity = '0';
  gridEl.style.transition = 'opacity 0.3s ease';

  setTimeout(() => {
    titleEl.textContent = data.label;
    gridEl.innerHTML = '';
    const cardClass = isNordic ? 'nordic-dyn' : 'greek-dyn';

    data.chars.forEach((char, i) => {
      const card = document.createElement('div');
      card.className = `dyn-char-card ${cardClass}`;
      card.style.animationDelay = `${i * 70}ms`;

      const roleClass = char.av.includes('hero') ? 'role-hero'
                      : char.av.includes('villain') ? 'role-villain'
                      : char.av.includes('ally') ? 'role-ally' : 'role-special';

      const avatarInner = char.img
        ? `<img src="${char.img}" class="dyn-avatar-img" alt="${char.name}" loading="lazy" onerror="this.style.display='none'">`
        : `<span class="dyn-avatar-icon">${char.icon}</span>`;

      card.innerHTML = `
        <span class="card-corner corner-tl">✦</span>
        <span class="card-corner corner-tr">✦</span>
        <span class="card-corner corner-bl">◆</span>
        <span class="card-corner corner-br">◆</span>
        <div class="dyn-avatar ${char.av}">${avatarInner}</div>
        <div class="dyn-char-body">
          <span class="dyn-char-role ${roleClass}">${char.role}</span>
          <h3 class="dyn-char-name">${char.name}</h3>
          <div class="dyn-char-divider"></div>
          <p class="dyn-char-desc">${char.desc}</p>
        </div>
      `;
      gridEl.appendChild(card);
    });

    gridEl.style.opacity = '1';
    titleEl.classList.add('visible');

    if (!isTouchDevice) {
      gridEl.querySelectorAll('.dyn-char-card').forEach(el => {
        el.addEventListener('mouseenter', () => { cursor.style.transform = 'translate(-50%,-50%) scale(2)'; cursor.style.background = 'var(--gold)'; });
        el.addEventListener('mouseleave', () => { cursor.style.transform = 'translate(-50%,-50%) scale(1)'; cursor.style.background = 'var(--red)'; });
      });
    }

    setTimeout(() => {
      document.getElementById('charsDisplayArea').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);
  }, 300);
}

// ============================================
//  CONSOLE MESSAGE
// ============================================
console.log(
  '%cΩ GOD OF WAR — ARQUIVO DE KRATOS\n%c"De onde sou é uma terra que você nunca irá conhecer."\n%c— Kratos',
  'color:#c0392b;font-size:1.3rem;font-weight:bold;font-family:serif;',
  'color:#c9a84c;font-size:0.9rem;font-family:serif;',
  'color:#888;font-size:0.8rem;font-family:monospace;'
);
