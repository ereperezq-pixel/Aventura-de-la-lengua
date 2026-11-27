/* Modo competición (Duelo) del Cuaderno ABN: 2 jugadores en una pantalla partida, 10 rondas, baile final con música propia (WebAudio). */
(function () {
  const $ = id => document.getElementById(id);
  const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const NR = 10, KEY = 'owl_academy_duelo_v1';
  const LVL = [{ n: '⭐ Fácil', t: '2 cifras ± 1 cifra' }, { n: '⭐⭐ Medio', t: '2 cifras ± 2 cifras' }, { n: '⭐⭐⭐ Difícil', t: '3 cifras ± 2 cifras' }, { n: '🧑 Adulto', t: '3 cifras ± 3 cifras (ej. 235 + 865)' }];
  const COLS = [['chicks', '🐥'], ['dragons', '🐉'], ['santa', '🎅']];
  const avs = k => { const c = (window.NUBLO_COLLECTIONS || {})[k]; return c && c.items ? c.items : []; };
  const first = () => { for (const [k] of COLS) if (avs(k).length) return [k, 0]; return ['chicks', 0]; };
  const srcOf = a => avs(a[0])[a[1]] || '';
  let D = null, saved = {};
  try { saved = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) {}
  const persist = () => { try { localStorage.setItem(KEY, JSON.stringify({ p: D.p.map(x => ({ name: x.name, av: x.av, lvl: x.lvl })) })); } catch (e) {} };

  // ---------- operaciones ----------
  function makeOp(lvl) {
    const sum = Math.random() < .5; let a, b;
    for (let g = 0; g < 200; g++) {
      if (lvl === 0) { a = sum ? rnd(11, 89) : rnd(12, 99); b = rnd(2, 9); }
      else if (lvl === 1) { a = sum ? rnd(11, 89) : rnd(30, 99); b = rnd(11, 89); }
      else if (lvl === 2) { a = sum ? rnd(101, 899) : rnd(201, 999); b = rnd(11, 99); }
      else { a = sum ? rnd(101, 899) : rnd(301, 999); b = sum ? rnd(101, 899) : rnd(101, 899); }
      if (sum ? a + b <= (lvl === 3 ? 1998 : 999) : a - b >= 1) break;
    }
    return { a, b, sum, r: sum ? a + b : a - b };
  }
  const opTxt = o => `${o.a} ${o.sum ? '+' : '−'} ${o.b}`;

  // ---------- estilos ----------
  const css = document.createElement('style');
  css.textContent = `
  #screen-duelo{max-width:520px;margin:0 auto}
  .du-card{border:3px solid #C4B5FD;border-radius:18px;padding:10px;margin:10px 0;background:#fff}
  .du-card.p1{border-color:#FCA5A5}.du-card input[type=text]{width:100%;box-sizing:border-box;padding:10px;border:3px solid #CBD5E1;border-radius:12px;font-size:1.05rem;font-weight:700;text-align:center}
  .du-tabs button{border:2px solid #CBD5E1;background:#fff;border-radius:10px;font-size:1.3rem;padding:2px 10px;margin:4px 3px}.du-tabs button.on{background:#FDE68A;border-color:#F59E0B}
  .du-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:5px;max-height:170px;overflow-y:auto;padding:3px}
  .du-grid button{border:3px solid transparent;border-radius:12px;background:#F8FAFC;padding:2px}.du-grid button.on{border-color:#F59E0B;background:#FEF3C7}
  .du-grid img{width:100%;aspect-ratio:1;object-fit:contain;display:block}
  .du-lv button{display:block;width:100%;text-align:left;margin:4px 0;padding:8px 10px;border:3px solid #CBD5E1;border-radius:12px;background:#fff;font-size:.95rem}.du-lv button.on{border-color:#7C3AED;background:#EDE9FE}.du-lv small{display:block;color:#64748B}
  .du-board{display:grid;grid-template-columns:1fr 1fr;gap:0;margin-top:8px}
  .du-col{padding:8px 6px;text-align:center;min-height:330px}.du-col.c0{background:#EFF6FF;border-radius:18px 0 0 18px;border:3px solid #93C5FD;border-right-width:2px}.du-col.c1{background:#FEF2F2;border-radius:0 18px 18px 0;border:3px solid #FCA5A5;border-left-width:2px}
  .du-col img.du-av{width:62px;height:62px;object-fit:contain}.du-nm{font-weight:800;font-size:1rem;word-break:break-word}.du-sc{font-size:1.3rem;font-weight:800;margin:2px 0}
  .du-op{font-size:clamp(1.25rem,6vw,1.9rem);font-weight:800;margin:10px 0;white-space:nowrap}.du-res{font-size:1.4rem;font-weight:800;color:#15803D}
  .du-col .btn{width:100%;font-size:.95rem;padding:10px 4px;margin-top:6px}.du-out{color:#B45309;font-weight:700;margin-top:10px}
  #du-end{position:fixed;inset:0;z-index:9000;background:linear-gradient(160deg,#4C1D95,#BE185D 55%,#F59E0B);overflow:hidden;text-align:center;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:14px}
  #du-end h1{color:#fff !important;font-size:1.7rem;margin:6px 0;text-shadow:0 3px 8px rgba(0,0,0,.4)}
  .du-dancers{display:flex;gap:16px;justify-content:center;align-items:flex-end;margin:10px 0}
  .du-dancer img{width:min(46vw,210px);height:min(46vw,210px);object-fit:contain;animation:du-dance .6s ease-in-out infinite;transform-origin:50% 100%;filter:drop-shadow(0 8px 10px rgba(0,0,0,.4))}
  .du-dancer:nth-child(2) img{animation-delay:.3s}.du-dancer b{display:block;font-size:1.2rem;text-shadow:0 2px 6px rgba(0,0,0,.5)}
  @keyframes du-dance{0%{transform:rotate(-10deg) translateY(0) scale(1)}25%{transform:rotate(10deg) translateY(-26px) scale(1.1)}50%{transform:rotate(-10deg) translateY(0) scale(1)}75%{transform:rotate(10deg) translateY(-26px) scale(1.1)}100%{transform:rotate(-10deg) translateY(0) scale(1)}}
  .du-fall{position:fixed;top:-80px;z-index:9100;pointer-events:none;animation:du-fall linear forwards;font-weight:800;text-shadow:0 2px 4px rgba(0,0,0,.35)}
  @keyframes du-fall{to{transform:translateY(115vh) rotate(380deg)}}
  .du-ctl .btn{width:auto;margin:0}.du-ctl{position:relative;z-index:9200;display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-top:10px}`;
  document.head.appendChild(css);

  // ---------- pantalla ----------
  registrarSeccion({ pantallas: '<div id="screen-duelo" class="hidden"></div>' });
  const ab = document.querySelector('#screen-abn-menu .abn-example');
  if (ab && !$('du-open')) ab.insertAdjacentHTML('afterend', '<button id="du-open" class="btn btn-purple" style="margin:4px 0 12px;width:100%;" onclick="app.openDuelo()">⚔️ Modo competición (2 jugadores)</button>');
  function showOnly() {
    document.querySelectorAll('[id^="screen-"]').forEach(el => el.classList.add('hidden')); $('screen-duelo').classList.remove('hidden');
    document.body.classList.remove('santa-theme', 'letter-theme', 'chick-theme', 'dragon-theme'); document.body.classList.add('chick-theme'); window.scrollTo({ top: 0 });
  }
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function renderSetup() {
    const root = $('screen-duelo');
    let h = '<div style="text-align:left;"><button class="btn btn-back" onclick="app.dueloStop();app.openAbnMenu()">⬅️ Volver al cuaderno</button></div><h1 style="font-size:1.5rem;margin:6px 0;">⚔️ Modo competición</h1><p style="color:#64748B;font-size:.9rem;">Cada jugador elige nombre, avatar y nivel. ¡Gana quien consiga más puntos en 10 rondas!</p>';
    D.p.forEach((p, i) => {
      h += `<div class="du-card p${i}"><div style="font-weight:800;margin-bottom:6px;">${i ? '🔴' : '🔵'} Jugador ${i + 1}</div>
      <input type="text" maxlength="14" value="${esc(p.name)}" placeholder="Nombre" oninput="app.dueloName(${i},this.value)">
      <div class="du-tabs" style="text-align:center;">${COLS.filter(c => avs(c[0]).length).map(c => `<button class="${p.tab === c[0] ? 'on' : ''}" onclick="app.dueloTab(${i},'${c[0]}')">${c[1]}</button>`).join('')}</div>
      <div class="du-grid">${avs(p.tab).map((s, k) => `<button class="${p.av[0] === p.tab && p.av[1] === k ? 'on' : ''}" onclick="app.dueloAv(${i},${k})"><img src="${s}" alt=""></button>`).join('')}</div>
      <div class="du-lv" style="margin-top:8px;">${LVL.map((l, k) => `<button class="${p.lvl === k ? 'on' : ''}" onclick="app.dueloLvl(${i},${k})"><b>${l.n}</b><small>${l.t}</small></button>`).join('')}</div></div>`;
    });
    h += '<button class="btn btn-green" style="width:100%;font-size:1.2rem;" onclick="app.dueloStart()">▶️ ¡A competir!</button>';
    root.innerHTML = h;
  }
  const keep = () => { const y = window.scrollY; renderSetup(); window.scrollTo({ top: y }); };

  function newRound() {
    D.ops = D.p.map(p => makeOp(p.lvl)); D.locked = null; D.out = [false, false]; D.done = false; D.msg = '';
  }
  function renderGame() {
    const root = $('screen-duelo');
    let h = `<div style="display:flex;justify-content:space-between;align-items:center;"><button class="btn btn-back" style="font-size:.8rem;" onclick="if(confirm('¿Salir de la partida?')){app.dueloStop();app.openDuelo()}">⬅️ Salir</button><b>Ronda ${D.round + 1} de ${NR}</b></div><div class="du-board">`;
    D.p.forEach((p, i) => {
      const o = D.ops[i]; let body;
      if (D.done) body = `<div class="du-res">= ${o.r}</div>`;
      else if (D.locked === i) body = `<div class="du-res">= ${o.r}</div><div style="font-size:.85rem;font-weight:700;margin-top:4px;">¿Lo dijo bien?</div><button class="btn btn-green" onclick="app.dueloJudge(${i},true)">✅ Bien</button><button class="btn" style="background:#F87171;" onclick="app.dueloJudge(${i},false)">❌ Mal</button>`;
      else if (D.out[i]) body = '<div class="du-out">😅 Fuera en esta ronda</div>';
      else if (D.locked !== null) body = '<button class="btn" disabled style="opacity:.5">⏳ Espera</button>';
      else body = `<button class="btn btn-primary" onclick="app.dueloTap(${i})">✋ ¡Resuelto!</button>`;
      h += `<div class="du-col c${i}"><img class="du-av" src="${srcOf(p.av)}" alt=""><div class="du-nm">${esc(p.name)}</div><div class="du-sc">⭐ ${D.scores[i]}</div><div class="du-op">${opTxt(o)}</div>${body}</div>`;
    });
    h += '</div>';
    if (D.msg) h += `<div class="feedback-box ${D.done && D.msg.indexOf('Punto') >= 0 ? 'feedback-correct' : ''}" style="margin-top:10px;font-weight:800;">${D.msg}</div>`;
    if (D.done) h += `<button class="btn btn-primary" style="width:100%;margin-top:10px;" onclick="app.dueloNext()">${D.round + 1 >= NR ? '🏆 Ver quién gana' : 'Siguiente ronda ➡️'}</button>`;
    root.innerHTML = h;
  }

  // ---------- música original (WebAudio, sin derechos) ----------
  let AC = null, master = null, muted = false;
  function unlockAudio() { try { if (!AC) { AC = new (window.AudioContext || window.webkitAudioContext)(); } if (AC.state === 'suspended') AC.resume(); } catch (e) { AC = null; } }
  const hz = m => 440 * Math.pow(2, (m - 69) / 12);
  function playMusic() {
    if (!AC) return; stopMusic(false);
    master = AC.createGain(); master.gain.value = muted ? 0 : .22; master.connect(AC.destination);
    const bpm = 132, beat = 60 / bpm, t0 = AC.currentTime + .1;
    const mel = [[67, 67, 64, 67, 72, 67, 64, 67], [71, 71, 67, 71, 74, 71, 67, 71], [69, 69, 64, 69, 72, 69, 64, 69], [69, 69, 65, 69, 72, 69, 72, 76]];
    const bass = [[48, 55], [43, 50], [45, 52], [41, 48]];
    const tone = (type, f, t, d, v) => { const o = AC.createOscillator(), g = AC.createGain(); o.type = type; o.frequency.value = f; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + .01); g.gain.exponentialRampToValueAtTime(.001, t + d); o.connect(g); g.connect(master); o.start(t); o.stop(t + d + .02); };
    const kick = t => { const o = AC.createOscillator(), g = AC.createGain(); o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(40, t + .12); g.gain.setValueAtTime(.9, t); g.gain.exponentialRampToValueAtTime(.001, t + .16); o.connect(g); g.connect(master); o.start(t); o.stop(t + .2); };
    const nb = AC.createBuffer(1, AC.sampleRate * .05, AC.sampleRate), nd = nb.getChannelData(0); for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
    const hat = (t, v) => { const s = AC.createBufferSource(), g = AC.createGain(), f = AC.createBiquadFilter(); s.buffer = nb; f.type = 'highpass'; f.frequency.value = 7000; g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(.001, t + .05); s.connect(f); f.connect(g); g.connect(master); s.start(t); };
    const bars = Math.ceil(30 / (4 * beat));
    for (let bar = 0; bar < bars; bar++) {
      const m = mel[bar % 4], b = bass[bar % 4];
      for (let k = 0; k < 8; k++) { const t = t0 + (bar * 4 + k / 2) * beat; tone('square', hz(m[k] + 12 * 0), t, beat * .45, .16); hat(t + beat / 4 * 0, k % 2 ? .35 : .15); }
      for (let q = 0; q < 4; q++) { const t = t0 + (bar * 4 + q) * beat; kick(t); tone('triangle', hz(b[q % 2]), t, beat * .9, .5); }
    }
    master.gain.setValueAtTime(muted ? 0 : .22, t0 + 28.5); master.gain.linearRampToValueAtTime(0, t0 + 30);
  }
  function stopMusic(closeAll) { try { if (master) { master.disconnect(); master = null; } if (closeAll && AC) { AC.close(); AC = null; } } catch (e) {} }

  // ---------- final: baile, lluvia y confeti (30 s) ----------
  let fx = null;
  function stopFx() { if (fx) { clearInterval(fx.i); clearInterval(fx.c); clearInterval(fx.t); fx = null; } stopMusic(true); const e = $('du-end'); if (e) e.remove(); document.querySelectorAll('.du-fall').forEach(n => n.remove()); }
  function finish() {
    stopFx(); unlockAudio();
    const [s0, s1] = D.scores, win = s0 > s1 ? [0] : s1 > s0 ? [1] : [0, 1];
    const all = [].concat(avs('chicks'), avs('dragons'), avs('santa'));
    const title = win.length === 2 ? `🤝 ¡Empate! ${s0} - ${s1}` : `🏆 ¡Gana ${esc(D.p[win[0]].name)}! ${s0} - ${s1}`;
    const e = document.createElement('div'); e.id = 'du-end';
    e.innerHTML = `<h1>${title}</h1><div class="du-dancers">${win.map(i => `<div class="du-dancer"><img src="${srcOf(D.p[i].av)}" alt=""><b>${esc(D.p[i].name)}</b></div>`).join('')}</div><div id="du-time" style="font-weight:800;">🎵 30 s de fiesta</div>
    <div class="du-ctl"><button class="btn" id="du-mute" onclick="app.dueloMute()">${muted ? '🔇 Sin música' : '🔊 Música'}</button><button class="btn btn-green" onclick="app.dueloStop();app.dueloAgain()">🔁 Otra partida</button><button class="btn btn-back" onclick="app.dueloStop();app.openAbnMenu()">⬅️ Salir</button></div>`;
    document.body.appendChild(e); playMusic();
    const emo = ['🎊', '🎉', '🎈', '🎀', '✨', '🌟', '🥳'], cols = ['#FDE68A', '#A7F3D0', '#BFDBFE', '#FBCFE8', '#fff'];
    let left = 30; const tm = setInterval(() => { left--; const t = $('du-time'); if (t) t.textContent = left > 0 ? `🎵 ${left} s de fiesta` : '🎉 ¡Gracias por jugar!'; if (left <= 0) { clearInterval(fx && fx.i); clearInterval(fx && fx.c); clearInterval(tm); } }, 1000);
    const drop = () => {
      const el = document.createElement('div'); el.className = 'du-fall'; const r = Math.random();
      if (r < .4) { el.textContent = rnd(0, 9999) % (Math.random() < .5 ? 10 : 1000); el.style.fontSize = rnd(22, 52) + 'px'; el.style.color = cols[rnd(0, 4)]; }
      else if (r < .65) { el.textContent = emo[rnd(0, emo.length - 1)]; el.style.fontSize = rnd(26, 50) + 'px'; }
      else if (all.length) { const im = document.createElement('img'); im.src = all[rnd(0, all.length - 1)]; im.style.height = rnd(40, 80) + 'px'; el.appendChild(im); }
      el.style.left = rnd(0, 92) + 'vw'; el.style.animationDuration = (rnd(30, 60) / 10) + 's'; document.body.appendChild(el); el.addEventListener('animationend', () => el.remove(), { once: true });
    };
    fx = { i: setInterval(drop, 160), c: setInterval(() => { if (typeof confetti === 'function') { try { confetti({ particleCount: 40, angle: 60, spread: 70, origin: { x: 0, y: .7 }, zIndex: 9300 }); confetti({ particleCount: 40, angle: 120, spread: 70, origin: { x: 1, y: .7 }, zIndex: 9300 }); } catch (e) {} } }, 1400), t: tm };
    setTimeout(() => { if (fx) clearInterval(fx.i); }, 30000);
  }

  Object.assign(app, {
    openDuelo() {
      const f = first(), sp = saved.p || [];
      D = { p: [0, 1].map(i => ({ name: (sp[i] && sp[i].name) || 'Jugador ' + (i + 1), av: (sp[i] && sp[i].av && avs(sp[i].av[0])[sp[i].av[1]]) ? sp[i].av : [f[0], i], lvl: sp[i] && typeof sp[i].lvl === 'number' ? sp[i].lvl : 0, tab: (sp[i] && sp[i].av && sp[i].av[0]) || f[0] })) };
      showOnly(); renderSetup();
    },
    dueloName(i, v) { D.p[i].name = v.trim() || 'Jugador ' + (i + 1); },
    dueloTab(i, t) { D.p[i].tab = t; keep(); },
    dueloAv(i, k) { D.p[i].av = [D.p[i].tab, k]; keep(); },
    dueloLvl(i, l) { D.p[i].lvl = l; keep(); },
    dueloStart() { persist(); unlockAudio(); D.round = 0; D.scores = [0, 0]; newRound(); renderGame(); window.scrollTo({ top: 0 }); },
    dueloTap(i) { if (D.done || D.locked !== null || D.out[i]) return; D.locked = i; renderGame(); },
    dueloJudge(i, ok) {
      if (D.locked !== i || D.done) return;
      if (ok) {
        D.scores[i]++; D.done = true; D.msg = `🎉 ¡Punto para ${esc(D.p[i].name)}!`;
        if (typeof confetti === 'function') { try { confetti({ particleCount: 90, spread: 80, origin: { y: .6 }, zIndex: 9300 }); } catch (e) {} }
      } else {
        D.out[i] = true; D.locked = null;
        if (D.out[0] && D.out[1]) { D.done = true; D.msg = '😅 Nadie acertó. Sin punto.'; }
        else D.msg = `Ahora puede intentarlo ${esc(D.p[1 - i].name)}.`;
      }
      renderGame();
    },
    dueloNext() { D.round++; if (D.round >= NR) { finish(); return; } newRound(); renderGame(); window.scrollTo({ top: 0 }); },
    dueloMute() { muted = !muted; if (master) master.gain.value = muted ? 0 : .22; const b = $('du-mute'); if (b) b.textContent = muted ? '🔇 Sin música' : '🔊 Música'; },
    dueloStop() { stopFx(); },
    dueloAgain() { app.dueloStart(); }
  });
  const prev = app.goToAcademyMenu.bind(app);
  app.goToAcademyMenu = function () { stopFx(); $('screen-duelo').classList.add('hidden'); return prev(); };
})();
