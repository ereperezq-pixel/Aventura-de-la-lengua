/* El Cuaderno ABN */
    (function () {
      // ---------- El Cuaderno ABN: sumas y restas por el método ABN (Corral Matemático) ----------
      const $ = id => document.getElementById(id);
      const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
      const shuffle = arr => { const r = [...arr]; for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; };
      const CHICKS = () => (window.NUBLO_COLLECTIONS && window.NUBLO_COLLECTIONS.chicks) ? window.NUBLO_COLLECTIONS.chicks.items : [];
      const PER_LEVEL = 12, ROUND = 10, NEED = 8;

      // ----- generador de operaciones (fijo y ordenado de fácil a difícil) -----
      const dg = (n, p) => Math.floor(n / p) % 10;
      function seeded(seed) { let s = seed >>> 0; return () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
      // versión simple y fiable: ¿hay que "pedir prestado" en alguna cifra?
      function borrows(a, b) { let br = 0; for (const p of [1, 10, 100, 1000]) { if ((dg(a, p) - br) < dg(b, p)) br = 1; else br = 0; if (br && Math.floor(a / p) === 0) return true; if (br) return true; } return false; }
      function carries(a, b) { let c = 0; for (const p of [1, 10, 100]) { if (dg(a, p) + dg(b, p) + c >= 10) return true; c = 0; } return false; }
      const GEN = {
        sum: [
          r => { for (;;) { const a = r(11, 88), b = r(1, 9); if (a % 10 + b < 10) return [a, b]; } },
          r => { for (;;) { const a = r(12, 91), b = r(2, 9); if (a % 10 + b >= 10 && a + b <= 99) return [a, b]; } },
          r => { for (;;) { const a = r(11, 69), b = 10 * r(1, 8); if (a + b <= 99 && a % 10 !== 0) return [a, b]; } },
          r => { for (;;) { const a = r(11, 88), b = r(11, 88); if (a % 10 + b % 10 < 10 && a + b <= 99 && b % 10 !== 0) return [a, b]; } },
          r => { for (;;) { const a = r(11, 88), b = r(11, 88); if (a % 10 + b % 10 >= 10 && a + b <= 99) return [a, b]; } },
          r => { for (;;) { const a = r(25, 97), b = r(25, 97); if (a + b >= 100 && b % 10 !== 0) return [a, b]; } },
          r => { for (;;) { const a = r(101, 899), b = r(11, 89); if (!carries(a, b) && a % 10 + b % 10 > 0 && b % 10 !== 0 && a % 100 > 9) return [a, b]; } },
          r => { for (;;) { const a = r(120, 899), b = r(21, 99); if (carries(a, b) && a + b < 1000) return [a, b]; } },
          r => { for (;;) { const a = r(101, 799), b = r(101, 798); if (!carries(a, b) && a + b < 1000 && a % 10 && b % 10 && dg(a, 10) && dg(b, 10)) return [a, b]; } },
          r => { for (;;) { const a = r(151, 899), b = r(151, 848); if (carries(a, b) && a + b < 1000 && a % 10 && b % 10) return [a, b]; } }
        ],
        res: [
          r => { for (;;) { const a = r(12, 99), b = r(1, 9); if (a % 10 >= b && a % 10 !== b) return [a, b]; } },
          r => { for (;;) { const a = r(21, 98), b = r(2, 9); if (a % 10 < b) return [a, b]; } },
          r => { for (;;) { const a = r(31, 99), b = 10 * r(1, 8); if (b < a && a % 10 !== 0 && a - b >= 5) return [a, b]; } },
          r => { for (;;) { const a = r(24, 99), b = r(11, 89); if (a % 10 >= b % 10 && b % 10 !== 0 && a - b >= 1 && dg(a, 10) > dg(b, 10)) return [a, b]; } },
          r => { for (;;) { const a = r(32, 99), b = r(11, 89); if (a % 10 < b % 10 && dg(a, 10) > dg(b, 10) && a - b >= 1) return [a, b]; } },
          r => { for (;;) { const a = r(101, 199), b = r(11, 99); if (a - b > 0 && a - b < 100 && a % 10 !== 0) return [a, b]; } },
          r => { for (;;) { const a = r(201, 899), b = r(11, 89); if (a % 10 >= b % 10 && dg(a, 10) >= dg(b, 10) && b % 10 !== 0) return [a, b]; } },
          r => { for (;;) { const a = r(201, 899), b = r(21, 99); if (borrows(a, b) && b % 10 !== 0) return [a, b]; } },
          r => { for (;;) { const a = r(301, 999), b = r(101, 898); if (a > b && a % 10 >= b % 10 && dg(a, 10) >= dg(b, 10) && dg(a, 100) > dg(b, 100) && b % 10 !== 0) return [a, b]; } },
          r => { for (;;) { const a = r(301, 999), b = r(101, 898); if (a - b >= 5 && borrows(a, b) && b % 10 !== 0 && dg(b, 10) !== 0) return [a, b]; } }
        ]
      };
      const POOLS = { sum: [], res: [] };
      ['sum', 'res'].forEach(mode => GEN[mode].forEach((gen, li) => {
        const rand = seeded(1000 * (mode === 'sum' ? 1 : 2) + li * 37 + 11), r = (a, b) => a + Math.floor(rand() * (b - a + 1)), seen = new Set(), pool = [];
        let guard = 0;
        while (pool.length < PER_LEVEL && guard++ < 5000) { const [a, b] = gen(r); const k = a + '_' + b; if (seen.has(k)) continue; seen.add(k); pool.push({ a, b }); }
        POOLS[mode].push(pool);
      }));
      const LV_TXT = {
        sum: ['2 cifras + 1 cifra', '2 cifras + 1 cifra (pasando de decena)', '2 cifras + decenas justas', '2 cifras + 2 cifras (fácil)', '2 cifras + 2 cifras (pasando de decena)', '2 cifras + 2 cifras (llegando a 100 o más)', '3 cifras + 2 cifras (fácil)', '3 cifras + 2 cifras (pasando de decena)', '3 cifras + 3 cifras (fácil)', '3 cifras + 3 cifras (reto final)'],
        res: ['2 cifras − 1 cifra', '2 cifras − 1 cifra (pidiendo prestado)', '2 cifras − decenas justas', '2 cifras − 2 cifras (fácil)', '2 cifras − 2 cifras (pidiendo prestado)', 'Pasando de 100 a menos de 100', '3 cifras − 2 cifras (fácil)', '3 cifras − 2 cifras (pidiendo prestado)', '3 cifras − 3 cifras (fácil)', '3 cifras − 3 cifras (reto final)']
      };

      // ----- partida guardada -----
      const KEY = 'owl_academy_abn_v1';
      let st = { sum: { unlocked: 1, stars: {}, seen: {} }, res: { unlocked: 1, stars: {}, seen: {} } };
      try { const v = JSON.parse(localStorage.getItem(KEY) || 'null'); if (v && v.sum && v.res) st = v; } catch (e) {}
      const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };

      // ----- cálculo de la rejilla ABN -----
      const chunks = n => [1000, 100, 10, 1].map(p => Math.floor(n / p) % 10 * p).filter(x => x > 0);
      function rowsFor(mode, a, b) {
        let cum = 0;
        return chunks(b).map(ch => { cum += ch; return mode === 'sum' ? { c1: ch, c2: b - cum, c3: a + cum } : { c1: ch, c2: a - cum, c3: b - cum }; });
      }
      const result = (mode, a, b) => mode === 'sum' ? a + b : a - b;
      function gridHtml(mode, a, b) {
        const rows = rowsFor(mode, a, b); while (rows.length < 2) rows.push(null);
        const heads = mode === 'sum' ? ['SUMAMOS', 'QUEDA 1º', 'RESULTADO'] : ['QUITAMOS', 'QUEDA 1º', 'QUEDA 2º'];
        const body = rows.map((r, i) => {
          const op = i === 0 ? a : i === 1 ? (mode === 'sum' ? '+ ' : '− ') + b : '';
          if (!r) return `<tr><td class="abn-op">${op}</td><td class="abn-empty"></td><td class="abn-empty"></td><td class="abn-empty"></td></tr>`;
          const last = i === rows.filter(Boolean).length - 1;
          const fin = last && mode === 'res' ? 'abn-in abn-final' : 'abn-in';
          const finS = last && mode === 'sum' ? 'abn-in abn-final' : 'abn-in';
          const c2 = last && mode === 'res' ? `<span>${r.c2}</span>` : r.c2, c3 = last && mode === 'sum' ? `<span>${r.c3}</span>` : r.c3;
          return `<tr><td class="abn-op">${op}</td><td class="abn-in">${r.c1}</td><td class="${fin}">${c2}</td><td class="${finS}">${c3}</td></tr>`;
        }).join('');
        return `<div class="abn-gridwrap"><table class="abn-grid"><thead><tr><th class="abn-h0"></th>${heads.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${body}</tbody></table></div>`;
      }
      const PLACE = { 1: 'unidades', 10: 'decenas', 100: 'centenas', 1000: 'millares' };
      const NEXTP = { 1: 'decenas', 10: 'centenas', 100: 'millares' };
      function explainHtml(mode, a, b) {
        const rows = rowsFor(mode, a, b), r = result(mode, a, b), sum = mode === 'sum';
        let cur = a; const steps = [], tips = [];
        rows.forEach((w, i) => {
          const place = w.c1 >= 1000 ? 1000 : w.c1 >= 100 ? 100 : w.c1 >= 10 ? 10 : 1;
          const next = sum ? cur + w.c1 : cur - w.c1, rem = w.c2 !== undefined ? (sum ? w.c2 : w.c3) : 0;
          if (sum) {
            steps.push(`<li>${i + 1}️⃣ ${w.c1 === b ? `Sumamos <b>${b}</b> al ${cur}` : `Cogemos <b>${w.c1}</b> del ${b} y se los sumamos a ${cur}`}: ${cur} + ${w.c1} = <b>${next}</b>. ${rem > 0 ? `Del ${b} nos quedan <b>${rem}</b>.` : 'Ya no nos queda nada por sumar.'}</li>`);
            if (dg(cur, place) + dg(w.c1, place) >= 10 && NEXTP[place]) tips.push(`En el paso ${i + 1}, las ${PLACE[place]} suman ${dg(cur, place)} + ${dg(w.c1, place)} = ${dg(cur, place) + dg(w.c1, place)}: ¡más de 9! Se forma una ${NEXTP[place].slice(0, -1)} más y el número sigue creciendo con normalidad: ${cur} + ${w.c1} = ${next}.`);
          } else {
            steps.push(`<li>${i + 1}️⃣ Quitamos <b>${w.c1}</b> al ${i === 0 ? a : cur} y también al ${b}: ${cur} − ${w.c1} = <b>${next}</b>. ${rem > 0 ? `Del ${b} nos quedan <b>${rem}</b> por quitar.` : 'Ya hemos quitado todo el segundo número.'}</li>`);
            if (dg(cur, place) < dg(w.c1, place) && NEXTP[place]) tips.push(`En el paso ${i + 1} no se puede quitar ${dg(w.c1, place)} ${PLACE[place]} a ${dg(cur, place)}: hay que romper una ${NEXTP[place].slice(0, -1)}. Ejemplo: ${cur} − ${w.c1} lo calculas quitando primero hasta la ${NEXTP[place].slice(0, -1)} redonda y después lo que falta.`);
          }
          cur = next;
        });
        const head = sum ? `Con el método ABN pasamos el segundo número (${b}) al primero (${a}) por partes, y apuntamos lo que nos queda.` : `Con el método ABN quitamos el segundo número (${b}) al primero (${a}) por partes, y apuntamos lo que nos queda de cada uno.`;
        return `<div class="abn-sol"><h3>🐥 Así se hace paso a paso</h3><p style="font-size:.9rem;color:#78716C;">${head}</p><ol class="abn-steps">${steps.join('')}</ol>${tips.length ? `<ul class="abn-steps">${tips.map(t => `<li>💡 ${t}</li>`).join('')}</ul>` : ''}<div class="abn-total">${a} ${sum ? '+' : '−'} ${b} = ${r}</div></div>`;
      }

      // ----- voz (número en palabras) -----
      const U = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve', 'veinte', 'veintiuno', 'veintidós', 'veintitrés', 'veinticuatro', 'veinticinco', 'veintiséis', 'veintisiete', 'veintiocho', 'veintinueve'];
      const TE = ['', '', '', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'], CE = ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];
      function words(n) {
        if (n < 30) return U[n];
        if (n < 100) return TE[Math.floor(n / 10)] + (n % 10 ? ' y ' + U[n % 10] : '');
        if (n === 100) return 'cien';
        return CE[Math.floor(n / 100)] + (n % 100 ? ' ' + words(n % 100) : '');
      }

      // ----- pantallas -----
      const SCREENS = ['screen-abn-menu', 'screen-abn-game'];
      function showOnly(id) {
        document.querySelectorAll('[id^="screen-"]').forEach(el => el.classList.add('hidden'));
        $(id).classList.remove('hidden');
        document.body.classList.remove('santa-theme', 'letter-theme', 'chick-theme', 'dragon-theme'); document.body.classList.add('chick-theme');
        window.scrollTo({ top: 0 });
      }
      const stopVoice = () => { try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) {} };
      function dropChicks(n = 2) {
        const items = CHICKS(); if (!items.length) return;
        for (let k = 0; k < n; k++) window.setTimeout(() => {
          const img = document.createElement('img'); img.className = 'ck-drop'; img.alt = 'Pollito celebrando';
          img.src = items[rnd(0, items.length - 1)]; img.style.left = (4 + Math.random() * 74) + 'vw';
          document.body.appendChild(img); img.addEventListener('animationend', () => img.remove(), { once: true });
        }, k * 420);
      }
      function mood(happy) {
        const m = $('abn-mascot'); if (!m) return;
        m.classList.remove('ck-celebrate', 'ck-sad'); void m.offsetWidth; m.classList.add(happy ? 'ck-celebrate' : 'ck-sad');
        window.setTimeout(() => m.classList.remove('ck-celebrate', 'ck-sad'), 2200);
        if (happy) { dropChicks(2); if (typeof confetti === 'function') confetti({ particleCount: 80, spread: 70, origin: { y: .55 }, colors: ['#FBBF24', '#F59E0B', '#34D399', '#60A5FA', '#F472B6'] }); }
      }
      function renderLevels() {
        ['sum', 'res'].forEach(mode => {
          const box = $('abn-lv-' + mode); box.innerHTML = '';
          for (let i = 0; i < 10; i++) {
            const lv = i + 1, open = lv <= st[mode].unlocked, sc = st[mode].stars[lv];
            const b = document.createElement('button'); b.className = 'abn-lv' + (sc >= NEED ? ' abn-done' : '') + (open ? '' : ' abn-locked');
            b.innerHTML = `<b>${open ? '' : '🔒 '}Nivel ${lv}</b><small>${LV_TXT[mode][i]}</small><span class="abn-star">${sc !== undefined ? `⭐ ${sc}/${ROUND}` : ''}</span>`;
            b.onclick = () => { if (open) app.startAbn(mode, lv); else app.abnLockedMsg(mode, lv); }; box.appendChild(b);
          }
        });
      }
      function pickRound(mode, lv) {
        const pool = POOLS[mode][lv - 1], seen = (st[mode].seen[lv] = st[mode].seen[lv] || []);
        let fresh = shuffle(pool.map((_, i) => i).filter(i => !seen.includes(i)));
        let pick;
        if (fresh.length >= ROUND) pick = fresh.slice(0, ROUND);
        else { const rest = shuffle(pool.map((_, i) => i).filter(i => !fresh.includes(i))); pick = [...fresh, ...rest].slice(0, ROUND); st[mode].seen[lv] = []; }
        return shuffle(pick).map(i => pool[i]);
      }

      Object.assign(app, {
        abn: {},
        openAbnMenu() {
          stopVoice(); showOnly('screen-abn-menu'); renderLevels(); app.updateSharedRewards(); $('abn-lock-note').classList.add('hidden');
          const ex = $('abn-example-body');
          if (ex && !ex.innerHTML) ex.innerHTML = `<p>Suma: 45 + 23 → pasamos el 23 al 45 por partes (primero 20, luego 3):</p>${gridHtml('sum', 45, 23)}<p>Resta: 68 − 24 → quitamos el 24 por partes (primero 20, luego 4):</p>${gridHtml('res', 68, 24)}`;
          const img = document.querySelector('#screen-abn-menu img[data-chick]'); if (img && !img.src && CHICKS()[5]) img.src = CHICKS()[5];
        },
        abnLockedMsg(mode, lv) {
          const n = $('abn-lock-note'); if (!n) return;
          n.innerHTML = `🔒 El <b>nivel ${lv}</b> se abre al superar el nivel ${lv - 1} con ${NEED} aciertos o más. ¡Tú puedes! 🐥`;
          n.classList.remove('hidden'); n.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        },
        abnTeacher() {
          const box = $('abn-key-box'); box.classList.toggle('hidden'); const i = $('abn-key-input'); if (!box.classList.contains('hidden')) i.focus();
        },
        abnTryKey() {
          const i = $('abn-key-input'), m = $('abn-key-msg');
          if (i.value.trim() === '4321') { st.sum.unlocked = 10; st.res.unlocked = 10; save(); renderLevels(); m.textContent = '🔓 ¡Todos los niveles abiertos!'; i.value = ''; }
          else m.textContent = 'Esa clave no es correcta.';
        },
        startAbn(mode, lv) {
          app.abn = { mode, lv, ops: pickRound(mode, lv), i: 0, score: 0 };
          showOnly('screen-abn-game'); app.loadAbn();
        },
        loadAbn() {
          const d = app.abn, op = d.ops[d.i]; d.answered = false; d.shown = false;
          const items = CHICKS(); if (items.length) $('abn-mascot').src = items[rnd(0, items.length - 1)];
          $('abn-counter').textContent = `Operación ${d.i + 1} de ${ROUND}`;
          $('abn-progress').style.width = `${(d.i / ROUND) * 100}%`;
          $('abn-title').textContent = `${d.mode === 'sum' ? '➕ Suma' : '➖ Resta'} ABN · Nivel ${d.lv}`;
          $('abn-q').textContent = `${op.a} ${d.mode === 'sum' ? '+' : '−'} ${op.b} = ?`;
          $('abn-hint').textContent = '✍️ Resuélvela en tu cuaderno con el método ABN y, cuando termines, pulsa Ver solución.';
          $('abn-solve').classList.remove('hidden'); $('abn-solution').classList.add('hidden'); $('abn-solution').innerHTML = '';
          $('abn-self').classList.add('hidden'); $('abn-next').classList.add('hidden'); $('abn-end').classList.add('hidden');
          const fb = $('abn-feedback'); fb.className = 'hidden feedback-box'; fb.innerHTML = '';
        },
        abnSpeak() {
          const d = app.abn; if (!window.speechSynthesis || !d.ops) return; const op = d.ops[d.i]; stopVoice();
          const u = new SpeechSynthesisUtterance(`${words(op.a)} ${d.mode === 'sum' ? 'más' : 'menos'} ${words(op.b)}`); u.lang = 'es-ES'; u.rate = .88; window.speechSynthesis.speak(u);
        },
        abnShow() {
          const d = app.abn, op = d.ops[d.i]; if (d.shown) return; d.shown = true;
          $('abn-solve').classList.add('hidden');
          const sol = $('abn-solution'); sol.innerHTML = `<h3 style="color:#92400E;font-size:1.1rem;margin:10px 0 0;">La rejilla del pollito</h3>${gridHtml(d.mode, op.a, op.b)}<div class="abn-total" style="text-align:center;">${op.a} ${d.mode === 'sum' ? '+' : '−'} ${op.b} = ${result(d.mode, op.a, op.b)}</div>`;
          sol.classList.remove('hidden'); $('abn-self').classList.remove('hidden');
          sol.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        },
        abnAnswer(ok) {
          const d = app.abn; if (d.answered) return; d.answered = true; const op = d.ops[d.i];
          $('abn-self').classList.add('hidden');
          const fb = $('abn-feedback'); fb.classList.remove('hidden');
          if (ok) {
            d.score++; app.awardSharedReward(1);
            const P = ['¡Pío pío! ¡Muy bien!', '¡Genial, campeón o campeona!', '¡Eres un crack del ABN!', '¡Perfecto! ¡Qué bien lo haces!'];
            fb.className = 'feedback-box feedback-correct';
            fb.innerHTML = `<div style="font-size:2.2rem;">🐥🎉🌟</div><h3>${P[rnd(0, P.length - 1)]}</h3><p>${op.a} ${d.mode === 'sum' ? '+' : '−'} ${op.b} = <b>${result(d.mode, op.a, op.b)}</b></p>`;
            mood(true);
          } else {
            fb.className = 'feedback-box feedback-wrong';
            fb.innerHTML = `<div style="font-size:2rem;">🐣💡</div><h3>¡No pasa nada! Vamos a repasarlo</h3>${explainHtml(d.mode, op.a, op.b)}`;
            mood(false);
          }
          $('abn-next').textContent = d.i + 1 >= ROUND ? 'Ver mi resultado 🏆' : 'Siguiente ➡️';
          $('abn-next').classList.remove('hidden'); fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        },
        nextAbn() {
          const d = app.abn; d.i++;
          if (d.i < ROUND) { app.loadAbn(); return; }
          const S = st[d.mode]; stopVoice();
          // las operaciones de esta ronda cuentan como vistas
          const pool = POOLS[d.mode][d.lv - 1]; S.seen[d.lv] = [...new Set([...(S.seen[d.lv] || []), ...d.ops.map(o => pool.findIndex(p => p.a === o.a && p.b === o.b))])];
          S.stars[d.lv] = Math.max(S.stars[d.lv] || 0, d.score);
          let extra = '';
          const pass = d.score >= NEED;
          if (pass && d.lv === S.unlocked && S.unlocked < 10) { S.unlocked++; extra = `<p style="margin-top:6px;">🔓 ¡Has abierto el <b>nivel ${S.unlocked}</b>!</p>`; }
          if (pass && d.lv === 10) extra = '<p style="margin-top:6px;">🏆 ¡Has completado todos los niveles de ' + (d.mode === 'sum' ? 'sumas' : 'restas') + '!</p>';
          save();
          $('abn-progress').style.width = '100%'; $('abn-counter').textContent = 'Fin';
          ['abn-solve', 'abn-solution', 'abn-self', 'abn-next'].forEach(id => $(id).classList.add('hidden'));
          $('abn-title').textContent = '🐥 ¡Fin del nivel!';
          $('abn-q').textContent = `${d.score} de ${ROUND}`;
          $('abn-hint').textContent = pass ? '¡Nivel superado!' : 'Con 8 aciertos o más superas el nivel. ¡Inténtalo otra vez!';
          const fb = $('abn-feedback'); fb.className = 'feedback-box ' + (pass ? 'feedback-correct' : 'feedback-wrong');
          fb.innerHTML = `<div style="font-size:2.6rem;">${pass ? '🐥🏆🎉' : '🐣💪'}</div><h3>${pass ? '¡Muy bien, nivel superado!' : '¡Sigue practicando, pollito valiente!'}</h3><p>Has acertado ${d.score} de ${ROUND} operaciones.</p>${extra}<p style="font-size:.92rem;margin-top:6px;">¡Cada acierto te ha dado una estrella! ⭐</p>`;
          if (pass) fb.innerHTML += app.prizeBoxHtml(app.awardPrize('chicks'));
          $('abn-up').classList.toggle('hidden', !(pass && d.lv < 10));
          $('abn-end').classList.remove('hidden'); fb.classList.remove('hidden');
          mood(pass); if (pass) dropChicks(4);
          fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        },
        abnNextLevel() { const d = app.abn; app.startAbn(d.mode, Math.min(10, d.lv + 1)); },
        abnRepeat() { const d = app.abn; app.startAbn(d.mode, d.lv); }
      });

      // Al volver a la Academia se ocultan también estas pantallas (la función existente no cambia)
      const prevAcademy = app.goToAcademyMenu.bind(app);
      app.goToAcademyMenu = function () { stopVoice(); SCREENS.forEach(id => $(id).classList.add('hidden')); return prevAcademy(); };
    })();
  
