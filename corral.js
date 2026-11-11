/* El Corral Matemático (pollitos) */
    // =====================================================================
    // EL CORRAL MATEMÁTICO (pollitos) · bloque añadido.
    // No modifica el código anterior: solo añade métodos nuevos a `app`
    // y amplía (sin reescribir) la vuelta a la Academia.
    // =====================================================================
    (function () {
      const CHICKS = IMG.pollitos;
      const CK_SCREENS = ['screen-ck-menu', 'screen-ck-numbers', 'screen-ck-game', 'screen-ck-gallery'];
      // Colecciones de la Galería de Premios (se pueden añadir más en el futuro).
      const CHICK_NAMES = ['Pollito Astronauta','DJ Pollito','Pollito Mago','Superpollito','Pollito Pintor','Pollito Jardinero','Pollito Guitarrista','Pollito Cocinero','Pollito Surfista','Pollito Ciclista','Pollito Lector','Pollito Fotógrafo','Pollito Columpiero','Pollito Saltarín','Pollito de los Globos','Pollito Constructor'];
      const SANTA_NAMES = ['Papá Noel Bailarín','Papá Noel Saltarín','Papá Noel Campeón','Papá Noel con Regalo','Papá Noel DJ','Papá Noel Enamorado','Papá Noel Repartidor','Papá Noel Cariñoso','Papá Noel Alegre','Papá Noel Sentado','Papá Noel de las Bolas de Nieve','Papá Noel Hurra','Papá Noel Músico','Papá Noel de la Chimenea','Papá Noel Tímido','Papá Noel Escondido','Papá Noel Dormilón','Papá Noel Travieso'];
      const COLLECTIONS = {
        chicks: { title: '🐥 Pollitos del Corral', items: CHICKS, names: CHICK_NAMES, key: 'owl_academy_chick_prizes', cols: 4 },
        santa:  { title: '🎅 Papás Noel', items: SANTA_STICKERS, names: SANTA_NAMES, key: 'owl_academy_santa_prizes', cols: 6 }
      };
      const UNLOCK_KEY = '4321';   // clave para recuperar premios ya ganados (cambio de móvil, borrado de datos…)
      const loadList = c => { try { const v = JSON.parse(localStorage.getItem(c.key) || '[]'); return Array.isArray(v) ? v.filter(n => Number.isInteger(n) && n >= 0 && n < c.items.length) : []; } catch (e) { return []; } };
      Object.values(COLLECTIONS).forEach(c => { c.have = loadList(c); });
      window.NUBLO_COLLECTIONS = COLLECTIONS;   // las nuevas aventuras añaden aquí sus colecciones de premios
      const totalPrizes = () => Object.values(COLLECTIONS).reduce((s, c) => s + c.have.length, 0);
      const $ = id => document.getElementById(id);
      const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
      const shuffle = arr => { const r = [...arr]; for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; };

      // Fotos de pollitos incrustadas (funcionan sin Internet)
      document.querySelectorAll('img[data-chick]').forEach(img => { img.src = CHICKS[Number(img.dataset.chick)]; });

      // ---- Número → palabras (para la voz) ----
      const U = ['cero','uno','dos','tres','cuatro','cinco','seis','siete','ocho','nueve','diez','once','doce','trece','catorce','quince','dieciséis','diecisiete','dieciocho','diecinueve','veinte','veintiuno','veintidós','veintitrés','veinticuatro','veinticinco','veintiséis','veintisiete','veintiocho','veintinueve'];
      const T = ['','','','treinta','cuarenta','cincuenta','sesenta','setenta','ochenta','noventa'];
      const H = ['','ciento','doscientos','trescientos','cuatrocientos','quinientos','seiscientos','setecientos','ochocientos','novecientos'];
      const below100 = n => n < 30 ? U[n] : T[Math.floor(n / 10)] + (n % 10 ? ' y ' + U[n % 10] : '');
      const below1000 = n => n === 100 ? 'cien' : [H[Math.floor(n / 100)], n % 100 ? below100(n % 100) : ''].filter(Boolean).join(' ');
      function words(n) {
        const m = Math.floor(n / 1000), r = n % 1000;
        let s = m === 1 ? 'mil' : (m > 1 ? U[m] + ' mil' : '');
        if (r) s += (s ? ' ' : '') + below1000(r);
        return s || 'cero';
      }
      const list = a => a.length < 3 ? a.join(' y ') : a.slice(0, -1).join(', ') + ' y ' + a[a.length - 1];
      const NAMES = ['unidades de millar', 'centenas', 'decenas', 'unidades'];
      const SIGN_TEXT = { '>': 'mayor que (>)', '<': 'menor que (<)', '=': 'igual a (=)' };

      // ---- Generadores de números ----
      function comparePair() {
        if (Math.random() < 0.12) { const a = rnd(1000, 9999); return [a, a]; }
        const a = String(rnd(1000, 9999));
        const q = Math.random(), keep = q < .35 ? 0 : q < .65 ? 1 : q < .9 ? 2 : 3;
        let b;
        do { b = a.slice(0, keep); while (b.length < 4) b += rnd(0, 9); } while (b === a || b[0] === '0');
        const p = [Number(a), Number(b)];
        return Math.random() < .5 ? p : [p[1], p[0]];
      }
      function orderSet() {
        const keep = rnd(0, 2);
        let prefix = ''; for (let i = 0; i < keep; i++) prefix += i === 0 ? rnd(1, 9) : rnd(0, 9);
        const s = new Set();
        while (s.size < 4) { let t = prefix; while (t.length < 4) t += rnd(0, 9); if (t[0] !== '0') s.add(Number(t)); }
        return shuffle([...s]);
      }
      function explain(A, B) {
        const a = String(A), b = String(B);
        if (a === b) return 'Las cuatro cifras son iguales, así que los dos números son iguales.';
        let i = 0; while (a[i] === b[i]) i++;
        let t = 'Empezamos por la izquierda. ';
        if (i > 0) t += `Las ${list(NAMES.slice(0, i))} ${i > 1 ? 'son iguales' : 'son iguales'}. `;
        const bigger = a[i] > b[i];
        t += `Miramos las ${NAMES[i]}: ${a[i]} y ${b[i]}. Como ${a[i]} es ${bigger ? 'mayor' : 'menor'} que ${b[i]}, el número ${A} es ${bigger ? 'mayor' : 'menor'} que ${B}.`;
        return t;
      }
      const digitsHtml = (n, hi) => String(n).split('').map((d, i) => i === hi ? `<span class="ck-dd">${d}</span>` : d).join('');


      // ---- Multiplicaciones: método de los pollitos (2 cifras × 1 cifra) ----
      function multPair(used) {
        for (let k = 0; k < 200; k++) {
          const t = rnd(1, 9), u = rnd(1, 9), n = rnd(2, 9);
          const a = t * 10 + u, key = a + 'x' + n;
          // Mitad de los retos sin llevadas en las unidades, mitad con ellas
          const wantCarry = used.size % 2 === 1;
          if (used.has(key) || (u * n >= 10) !== wantCarry) continue;
          used.add(key); return { a, n, t, u };
        }
        const t = rnd(1, 9), u = rnd(1, 9), n = rnd(2, 9); return { a: t * 10 + u, n, t, u };
      }
      const plus = (d, n) => Array(n).fill(d).join(' + ');
      function multSolutionHtml(m) {
        const ts = m.t * m.n, us = m.u * m.n, tv = ts * 10, r = m.a * m.n;
        const rows = d => Array(m.n).fill(`<div class="ck-mrow">${d}</div>`).join('');
        return `<div class="ck-mult-sol">
          <h3>🐥 Así lo hacen los pollitos</h3>
          <p class="ck-mstep">1️⃣ Escribimos cada cifra ${m.n} veces:</p>
          <div class="ck-mult-cols">
            <div class="ck-mcol ck-mt"><b>Decenas</b>${rows(m.t)}<div class="ck-mline"></div><div class="ck-msum">${plus(m.t, m.n)} = <b>${ts}</b> = <b class="ck-m10">${tv}</b></div></div>
            <div class="ck-mcol ck-mu"><b>Unidades</b>${rows(m.u)}<div class="ck-mline"></div><div class="ck-msum">${plus(m.u, m.n)} = <b>${us}</b></div></div>
          </div>
          <p class="ck-mstep">2️⃣ Las decenas suman ${ts}: son ${ts} decenas, es decir, <b>${tv}</b>.</p>
          <p class="ck-mstep">3️⃣ Las unidades suman <b>${us}</b>.</p>
          <p class="ck-mstep">4️⃣ Juntamos: <b>${tv} + ${us} = ${r}</b></p>
          <div class="ck-mult-total">${m.a} × ${m.n} = ${r}</div>
        </div>`;
      }
      function multWhyHtml(m) {
        const ts = m.t * m.n, us = m.u * m.n, tv = ts * 10, r = m.a * m.n;
        const tips = [`Las decenas suman ${ts}, pero cada decena vale 10: son ${ts} decenas = <b>${tv}</b>, no ${ts}.`];
        if (us >= 10) tips.push(`Las unidades suman ${us}. ¡Es normal que pasen de 9! No hay que "llevarse" nada: se suman tal cual, ${tv} + ${us}.`);
        tips.push(`Si te ha salido <b>${ts + us}</b>, seguramente has sumado ${ts} + ${us} sin convertir las decenas en ${tv}.`);
        tips.push(`Para comprobarlo: ${m.n <= 4 ? plus(m.a, m.n) : m.a + ' repetido ' + m.n + ' veces'} = ${r}.`);
        return `<p>El resultado es <b>${r}</b> porque ${tv} + ${us} = ${r}.</p><ul class="ck-why">${tips.map(t => `<li>${t}</li>`).join('')}</ul>`;
      }

      // ---- Celebración y ánimo ----
      function dropChicks(n = 2) {
        for (let k = 0; k < n; k++) window.setTimeout(() => {
          const img = document.createElement('img');
          img.className = 'ck-drop'; img.alt = 'Pollito celebrando';
          img.src = CHICKS[rnd(0, CHICKS.length - 1)];
          img.style.left = (4 + Math.random() * 74) + 'vw';
          document.body.appendChild(img);
          img.addEventListener('animationend', () => img.remove(), { once: true });
        }, k * 420);
      }
      function dropEggs() {
        ['🐥', '🥚', '🌼', '🐣', '🌻'].slice(0, 2 + rnd(0, 3)).forEach((sym, i) => {
          const el = document.createElement('div'); el.className = 'garland-drop'; el.textContent = sym;
          el.style.left = (8 + Math.random() * 82) + 'vw'; el.style.animationDelay = (i * .12) + 's';
          document.body.appendChild(el); el.addEventListener('animationend', () => el.remove(), { once: true });
        });
      }
      function mood(happy) {
        const m = $('ck-mascot'); if (!m) return;
        m.classList.remove('ck-celebrate', 'ck-sad'); void m.offsetWidth;
        m.classList.add(happy ? 'ck-celebrate' : 'ck-sad');
        window.setTimeout(() => m.classList.remove('ck-celebrate', 'ck-sad'), 2200);
        if (happy) {
          dropChicks(2); dropEggs();
          if (typeof confetti === 'function') confetti({ particleCount: 90, spread: 75, origin: { y: .55 }, colors: ['#FACC15', '#FDE047', '#F59E0B', '#84CC16', '#FDBA74'] });
        }
      }
      const PRAISE = ['¡Pío, pío, qué bien!', '¡Súper pollito matemático!', '¡Eso es, campeón del corral!', '¡Pío, pío, pío! ¡Perfecto!'];

      function showOnly(id, theme = 'chick-theme') {
        document.querySelectorAll('[id^="screen-"]').forEach(el => el.classList.add('hidden'));
        $(id).classList.remove('hidden');
        document.body.classList.remove('santa-theme', 'letter-theme', 'chick-theme', 'dragon-theme');
        if (theme) document.body.classList.add(theme);
        window.scrollTo({ top: 0 });
      }
      const stopVoice = () => { try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) {} };

      Object.assign(app, {
        ck: { mode: 'compare' },

        enterChickAdventure() { app.currentSectionKey = null; app.openChickMenu(); },
        openChickMenu() { stopVoice(); showOnly('screen-ck-menu'); app.updateChickPrizeCount(); $('ck-soon-note').classList.add('hidden'); app.updateSharedRewards(); },
        openChickNumbers() { stopVoice(); showOnly('screen-ck-numbers'); app.updateSharedRewards(); },
        showChickSoon() { const n = $('ck-soon-note'); n.classList.remove('hidden'); n.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); },


        // ---- Premios y galería (Academia del Búho) ----
        awardPrize(colId) {
          const c = COLLECTIONS[colId];
          const free = [...Array(c.items.length).keys()].filter(i => !c.have.includes(i));
          if (!free.length) return { colId, idx: rnd(0, c.items.length - 1), isNew: false, complete: true };
          const idx = free[rnd(0, free.length - 1)];
          c.have = [...c.have, idx];
          try { localStorage.setItem(c.key, JSON.stringify(c.have)); } catch (e) {}
          return { colId, idx, isNew: true, complete: c.have.length === c.items.length };
        },
        prizeBoxHtml(pz, extraClass = '') {
          const c = COLLECTIONS[pz.colId];
          return `<div class="ck-prize-box ${extraClass}"><div style="font-size:1.5rem;">🏅 ¡Has ganado un premio! 🏅</div><img src="${c.anim && c.anim[pz.idx] ? c.anim[pz.idx] : c.items[pz.idx]}" alt="${c.names[pz.idx]}"><h3>${c.names[pz.idx]}</h3><p style="font-size:.9rem;">${pz.isNew ? '¡Nuevo en tu Galería de Premios!' : '¡Ya tienes toda esta colección! ¡Eres un campeón!'}${pz.isNew && pz.complete ? ' 🎉 ¡Colección completa!' : ''}</p></div>`;
        },
        updateChickPrizeCount() { const el = $('ck-prize-count'); if (el) el.textContent = `${COLLECTIONS.chicks.have.length}/${CHICKS.length}`; },
        openChickGallery() {
          stopVoice(); showOnly('screen-ck-gallery', null);
          const owl = document.querySelector('#screen-academy .owl-mascot'); const img = $('ck-gallery-owl');
          if (owl && img && !img.src) img.src = owl.src;
          app.renderChickGallery();
          app.updateSharedRewards();
        },

        renderChickGallery() {
          const wrap = $('ck-gallery'); wrap.innerHTML = '';
          $('ck-gallery-info').textContent = 'Toca un premio para verlo en grande.';
          Object.entries(COLLECTIONS).forEach(([colId, c]) => {
            const h = document.createElement('h3'); h.className = 'ck-col-title';
            h.innerHTML = `${c.title} <span class="ck-badge">${c.have.length}/${c.items.length}</span>`;
            const g = document.createElement('div'); g.className = 'ck-gallery'; g.style.gridTemplateColumns = `repeat(${c.cols},1fr)`;
            c.items.forEach((src, i) => {
              const owned = c.have.includes(i);
              const b = document.createElement('button');
              b.className = 'ck-prize' + (owned ? '' : ' ck-locked');
              b.setAttribute('aria-label', owned ? c.names[i] : 'Premio por descubrir');
              b.innerHTML = `<img src="${src}" alt="">`;
              b.onclick = () => app.openPrizeModal(colId, i);
              g.appendChild(b);
            });
            wrap.append(h, g);
          });
          $('ck-gallery-count').textContent = `${totalPrizes()} ${totalPrizes() === 1 ? 'premio ganado' : 'premios ganados'}`;
        },

        // Ver un premio en grande. Ganado: color y animado. Sin ganar: gris y quieto, con opción de clave.
        openPrizeModal(colId, idx) {
          const c = COLLECTIONS[colId]; const owned = c.have.includes(idx);
          const bigSrc = owned && c.anim && c.anim[idx] ? c.anim[idx] : c.items[idx];   // ganado: versión animada si existe
          let m = $('ck-modal');
          if (!m) {
            m = document.createElement('div'); m.id = 'ck-modal'; m.className = 'ck-modal';
            m.addEventListener('click', e => { if (e.target === m) app.closePrizeModal(); });
            document.body.appendChild(m);
          }
          m.innerHTML = `
            <div class="ck-modal-card" role="dialog" aria-modal="true">
              <button class="ck-modal-x" onclick="app.closePrizeModal()" aria-label="Cerrar">✕</button>
              <div class="ck-modal-stage ${owned ? 'ck-owned' : 'ck-gray'}">
                ${owned ? '<span class="ck-spark s1">✨</span><span class="ck-spark s2">⭐</span><span class="ck-spark s3">✨</span><span class="ck-spark s4">⭐</span>' : ''}
                <img src="${bigSrc}" alt="${owned ? c.names[idx] : 'Premio por descubrir'}">
              </div>
              <h3>${owned ? c.names[idx] : '🔒 Premio por descubrir'}</h3>
              <p>${owned ? '¡Este premio ya es tuyo!' : 'Supera un reto con un 80 % de aciertos o más para ganarlo.'}</p>
              ${owned ? '' : `
                <button id="ck-key-open" class="btn btn-green" style="margin-top:6px;" onclick="document.getElementById('ck-key-box').classList.remove('hidden');this.classList.add('hidden');document.getElementById('ck-key-input').focus();">🔑 Desbloquear con clave</button>
                <div id="ck-key-box" class="hidden">
                  <input id="ck-key-input" type="password" inputmode="numeric" maxlength="8" autocomplete="off" placeholder="Escribe la clave">
                  <button class="btn btn-primary" style="margin-top:8px;" onclick="app.tryUnlockPrize('${colId}', ${idx})">Desbloquear</button>
                  <div id="ck-key-msg" class="ck-key-msg"></div>
                </div>`}
            </div>`;
          m.classList.add('ck-open');
          const inp = $('ck-key-input');
          if (inp) inp.addEventListener('keydown', e => { if (e.key === 'Enter') app.tryUnlockPrize(colId, idx); });
        },
        closePrizeModal() { const m = $('ck-modal'); if (m) m.classList.remove('ck-open'); },
        tryUnlockPrize(colId, idx) {
          const inp = $('ck-key-input'); const msg = $('ck-key-msg');
          if (!inp || inp.value.trim() !== UNLOCK_KEY) { msg.textContent = '❌ Clave incorrecta. Inténtalo otra vez.'; inp.value = ''; return; }
          const c = COLLECTIONS[colId];
          if (!c.have.includes(idx)) {
            c.have = [...c.have, idx];
            try { localStorage.setItem(c.key, JSON.stringify(c.have)); } catch (e) {}
          }
          app.renderChickGallery(); app.updateChickPrizeCount();
          app.openPrizeModal(colId, idx);
          if (typeof confetti === 'function') confetti({ particleCount: 110, spread: 80, origin: { y: .5 }, zIndex: 100000 });
        },

        startChickGame(mode) {
          app.ck = { mode, used: new Set(), total: mode === 'order' ? 6 : 10, i: 0, score: 0, answered: false, finished: false, chicks: shuffle([...Array(CHICKS.length).keys()]) };
          showOnly('screen-ck-game');
          const back = $('ck-back');
          if (mode === 'mult') { back.textContent = '⬅️ Volver al corral'; back.onclick = () => app.openChickMenu(); }
          else { back.textContent = '⬅️ Menú de juegos'; back.onclick = () => app.openChickNumbers(); }
          app.loadChickRound();
        },

        loadChickRound() {
          const c = app.ck; c.answered = false;
          $('ck-counter').textContent = `Reto ${c.i + 1} de ${c.total}`;
          $('ck-progress').style.width = `${(c.i / c.total) * 100}%`;
          $('ck-mascot').src = CHICKS[c.chicks[c.i % CHICKS.length]];
          const fb = $('ck-feedback'); fb.className = 'hidden feedback-box'; fb.innerHTML = '';
          ['ck-next', 'ck-again'].forEach(id => $(id).classList.add('hidden'));
          $('ck-next').textContent = 'Siguiente reto ➡️';
          $('ck-mult').classList.add('hidden');
          if (c.mode === 'compare') {
            $('ck-title').textContent = '🎈 Mayor, menor o igual';
            $('ck-instruction').textContent = 'Mira los dos números y elige el signo correcto.';
            $('ck-compare').classList.remove('hidden'); $('ck-order').classList.add('hidden');
            [c.a, c.b] = comparePair();
            $('ck-a').innerHTML = digitsHtml(c.a); $('ck-b').innerHTML = digitsHtml(c.b);
            const slot = $('ck-slot'); slot.textContent = '?'; slot.className = 'ck-slot';
            document.querySelectorAll('.ck-sign').forEach(b => { b.disabled = false; b.className = 'ck-sign'; });
          } else if (c.mode === 'mult') {
            c.m = multPair(c.used);
            $('ck-title').textContent = '🧁 La Cocina de las Tablas';
            $('ck-instruction').textContent = 'Haz esta multiplicación en tu cuaderno.';
            $('ck-compare').classList.add('hidden'); $('ck-order').classList.add('hidden'); $('ck-mult').classList.remove('hidden');
            $('ck-mult-q').textContent = `${c.m.a} × ${c.m.n} = ?`;
            $('ck-mult-solve').classList.remove('hidden'); $('ck-mult-tip').classList.remove('hidden');
            $('ck-mult-solution').classList.add('hidden'); $('ck-mult-solution').innerHTML = '';
            $('ck-mult-self').classList.add('hidden');
          } else {
            c.dir = Math.random() < .5 ? 'desc' : 'asc';
            c.nums = orderSet();
            c.target = [...c.nums].sort((x, y) => c.dir === 'desc' ? y - x : x - y);
            c.placed = 0; c.mistakes = 0;
            $('ck-title').textContent = '🚲 La Carrera de los Pollitos';
            $('ck-instruction').textContent = c.dir === 'desc' ? 'Toca los números empezando por el MÁS GRANDE.' : 'Toca los números empezando por el MÁS PEQUEÑO.';
            $('ck-goal').textContent = c.dir === 'desc' ? '⬇️ De mayor a menor' : '⬆️ De menor a mayor';
            $('ck-compare').classList.add('hidden'); $('ck-order').classList.remove('hidden');
            $('ck-msg').textContent = '';
            $('ck-slots').innerHTML = [0, 1, 2, 3].map(i => {
              const lab = i === 0 ? (c.dir === 'desc' ? 'el mayor' : 'el menor') : i === 3 ? (c.dir === 'desc' ? 'el menor' : 'el mayor') : '';
              return `<div class="ck-slot-row"><span class="ck-slot-n">${i + 1}</span><div class="ck-slot-box" id="ck-box-${i}">?</div><span class="ck-slot-label">${lab}</span></div>`;
            }).join('');
            const pool = $('ck-pool'); pool.innerHTML = '';
            c.nums.forEach(v => {
              const b = document.createElement('button'); b.className = 'ck-tile'; b.textContent = v;
              b.onclick = () => app.ckOrderTap(v, b); pool.appendChild(b);
            });
          }
          window.setTimeout(() => app.speakChick(), 200);
        },

        speakChick() {
          const c = app.ck; if (!window.speechSynthesis) return;
          let text;
          if (c.mode === 'compare') text = `${words(c.a)}. Y ${words(c.b)}.`;
          else if (c.mode === 'mult') text = `${words(c.m.a)} por ${words(c.m.n)}.`;
          else text = c.nums.map(words).join('. ');
          stopVoice();
          const u = new SpeechSynthesisUtterance(text); u.lang = 'es-ES'; u.rate = .85;
          window.speechSynthesis.speak(u);
        },

        ckAnswerCompare(sign) {
          const c = app.ck; if (c.answered) return; c.answered = true;
          const right = c.a > c.b ? '>' : c.a < c.b ? '<' : '=';
          const ok = sign === right;
          document.querySelectorAll('.ck-sign').forEach(b => {
            b.disabled = true;
            if (b.dataset.sign === right) b.classList.add('ck-right');
            else if (b.dataset.sign === sign) b.classList.add('ck-wrong');
          });
          const slot = $('ck-slot'); slot.textContent = right; slot.className = 'ck-slot ' + (ok ? 'ck-ok' : 'ck-bad');
          const a = String(c.a), b = String(c.b); let hi = -1;
          if (a !== b) { hi = 0; while (a[hi] === b[hi]) hi++; }
          $('ck-a').innerHTML = digitsHtml(c.a, hi); $('ck-b').innerHTML = digitsHtml(c.b, hi);
          const fb = $('ck-feedback'); fb.classList.remove('hidden');
          const why = explain(c.a, c.b);
          if (ok) {
            c.score++; app.awardSharedReward(1);
            fb.className = 'feedback-box feedback-correct';
            fb.innerHTML = `<div style="font-size:2.2rem;">🐥🎉🌼</div><h3>${PRAISE[rnd(0, PRAISE.length - 1)]}</h3><p><b>${c.a} ${right} ${c.b}</b></p><p style="font-size:.92rem;margin-top:6px;">${why}</p>`;
            mood(true);
          } else {
            fb.className = 'feedback-box feedback-wrong';
            fb.innerHTML = `<div style="font-size:2rem;">🐣💡</div><h3>¡Casi, pollito! Vamos a aprenderlo</h3><p>La respuesta era <b>${SIGN_TEXT[right]}</b>: <b>${c.a} ${right} ${c.b}</b></p><p style="font-size:.92rem;margin-top:6px;">${why}</p>`;
            mood(false);
          }
          app.ckShowNext();
        },


        ckMultSolve() {
          const c = app.ck; if (c.answered) return;
          $('ck-mult-solve').classList.add('hidden'); $('ck-mult-tip').classList.add('hidden');
          const sol = $('ck-mult-solution'); sol.innerHTML = multSolutionHtml(c.m); sol.classList.remove('hidden');
          $('ck-mult-self').classList.remove('hidden');
          sol.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        },

        ckMultAnswer(ok) {
          const c = app.ck; if (c.answered) return; c.answered = true;
          $('ck-mult-self').classList.add('hidden');
          const m = c.m, r = m.a * m.n;
          $('ck-mult-q').textContent = `${m.a} × ${m.n} = ${r}`;
          const fb = $('ck-feedback'); fb.classList.remove('hidden');
          if (ok) {
            c.score++; app.awardSharedReward(1);
            fb.className = 'feedback-box feedback-correct';
            fb.innerHTML = `<div style="font-size:2.2rem;">🐥🎉🧁</div><h3>${PRAISE[rnd(0, PRAISE.length - 1)]}</h3><p>¡Has hecho bien <b>${m.a} × ${m.n} = ${r}</b>!</p>`;
            mood(true);
          } else {
            fb.className = 'feedback-box feedback-wrong';
            fb.innerHTML = `<div style="font-size:2rem;">🐣💡</div><h3>¡Casi, pollito! Vamos a aprenderlo</h3>${multWhyHtml(m)}`;
            mood(false);
          }
          app.ckShowNext();
          fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        },

        ckOrderTap(v, btn) {
          const c = app.ck; if (c.answered) return;
          if (v === c.target[c.placed]) {
            const box = $('ck-box-' + c.placed); box.textContent = v; box.classList.add('ck-filled');
            btn.classList.add('ck-used'); btn.disabled = true; c.placed++;
            $('ck-msg').textContent = '';
            if (c.placed === 4) app.ckFinishOrder();
          } else {
            c.mistakes++;
            btn.classList.remove('ck-shake'); void btn.offsetWidth; btn.classList.add('ck-shake');
            window.setTimeout(() => btn.classList.remove('ck-shake'), 900);
            $('ck-msg').textContent = c.mistakes >= 2
              ? '🐣 Pista: compara primero las unidades de millar; si son iguales, mira las centenas.'
              : '🐣 Ese todavía no. ¡Mira las cifras de izquierda a derecha!';
          }
        },

        ckFinishOrder() {
          const c = app.ck; c.answered = true;
          const sym = c.dir === 'desc' ? '>' : '<';
          const chain = c.target.join(` ${sym} `);
          const fb = $('ck-feedback'); fb.classList.remove('hidden');
          if (c.mistakes === 0) {
            c.score++; app.awardSharedReward(1);
            fb.className = 'feedback-box feedback-correct';
            fb.innerHTML = `<div style="font-size:2.2rem;">🐥🏁🌼</div><h3>${PRAISE[rnd(0, PRAISE.length - 1)]}</h3><p>¡Orden perfecto, sin fallitos!</p><p><b>${chain}</b></p>`;
            mood(true);
          } else {
            fb.className = 'feedback-box feedback-correct';
            fb.innerHTML = `<div style="font-size:2.2rem;">🐥🏁</div><h3>¡Carrera terminada!</h3><p>Lo has conseguido con ${c.mistakes} fallito${c.mistakes > 1 ? 's' : ''}. ¡La próxima, a por el orden perfecto!</p><p><b>${chain}</b></p>`;
            mood(false);
          }
          app.ckShowNext();
        },

        ckShowNext() {
          const c = app.ck;
          $('ck-next').textContent = c.i + 1 >= c.total ? 'Ver mi premio 🏆' : 'Siguiente reto ➡️';
          $('ck-next').classList.remove('hidden');
        },

        nextChickStep() {
          const c = app.ck;
          c.i++;
          if (c.i < c.total) { app.loadChickRound(); return; }
          // Final de la partida
          $('ck-progress').style.width = '100%';
          $('ck-counter').textContent = 'Fin';
          $('ck-compare').classList.add('hidden'); $('ck-order').classList.add('hidden'); $('ck-mult').classList.add('hidden');
          $('ck-next').classList.add('hidden'); $('ck-again').classList.remove('hidden');
          const pct = c.score / c.total;
          const title = pct >= .9 ? '¡Súper pollito matemático!' : pct >= .6 ? '¡Muy buen trabajo, pollito!' : '¡Sigue practicando, pollito valiente!';
          const unit = c.mode === 'order' ? 'carreras perfectas' : 'retos';
          const fb = $('ck-feedback'); fb.className = 'feedback-box feedback-correct';
          fb.innerHTML = `<div style="font-size:2.6rem;">🐥🏆🌻</div><h3>${title}</h3><p>Has conseguido ${c.score} de ${c.total} ${unit}.</p><p style="font-size:.92rem;margin-top:6px;">¡Cada acierto te ha dado una estrella! ⭐</p>`;
          if (pct >= .8) fb.innerHTML += app.prizeBoxHtml(app.awardPrize('chicks'));
          $('ck-instruction').textContent = '';
          mood(true); dropChicks(4);
        }
      });


      // ---- Premios del Reto de Papá Noel (se enganchan a las funciones existentes sin cambiarlas) ----
      const SANTA_ROUND = 10;   // oraciones por ronda de Sujeto y predicado
      const origStartSubject = app.startSubjectPredicateGame.bind(app);
      app.startSubjectPredicateGame = function () { app.skRound = { n: 0, yes: 0 }; return origStartSubject(); };
      const origAnswerSubject = app.answerSubjectCheck.bind(app);
      app.answerSubjectCheck = function (didWell) {
        const already = app.subjectAnswered;
        const r = origAnswerSubject(didWell);
        if (already) return r;
        const s = app.skRound || (app.skRound = { n: 0, yes: 0 });
        s.n++; if (didWell) s.yes++;
        const fb = document.getElementById('subject-feedback');
        const need = Math.ceil(SANTA_ROUND * .8);
        if (s.n >= SANTA_ROUND) {
          if (s.yes >= need) fb.insertAdjacentHTML('beforeend', app.prizeBoxHtml(app.awardPrize('santa'), 'sp-santa'));
          else fb.insertAdjacentHTML('beforeend', `<div class="ck-prize-box sp-santa"><div style="font-size:1.3rem;">🎅 ¡Ronda terminada!</div><p>Has acertado ${s.yes} de ${SANTA_ROUND}. Con ${need} aciertos ganas un premio: ¡inténtalo otra vez!</p></div>`);
          app.skRound = { n: 0, yes: 0 };
        } else {
          fb.insertAdjacentHTML('beforeend', `<p class="sp-round">🎁 Ronda de premio: ${s.n} de ${SANTA_ROUND} (llevas ${s.yes} aciertos)</p>`);
        }
        return r;
      };
      const origNextSyn = app.nextSynChallenge.bind(app);
      app.nextSynChallenge = function () {
        const r = origNextSyn();
        if (app.synIndex >= app.synOrder.length) {
          const box = document.getElementById('syn-feedback');
          if (app.synScore / app.synOrder.length >= .8) box.insertAdjacentHTML('beforeend', app.prizeBoxHtml(app.awardPrize('santa'), 'sp-santa'));
          else box.insertAdjacentHTML('beforeend', `<p class="sp-round">Con ${Math.ceil(app.synOrder.length * .8)} aciertos ganas un premio para tu galería. ¡Vuelve a intentarlo!</p>`);
        }
        return r;
      };

      // Al volver a la Academia (función existente) también se ocultan las pantallas del corral.
      const originalAcademy = app.goToAcademyMenu.bind(app);
      app.goToAcademyMenu = function () {
        stopVoice(); if (document.getElementById('ck-modal')) document.getElementById('ck-modal').classList.remove('ck-open');
        CK_SCREENS.forEach(id => $(id).classList.add('hidden'));
        document.body.classList.remove('chick-theme');
        return originalAcademy();
      };
    })();
  
