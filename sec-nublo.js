/* El Libro de Nublo: preguntas de cada aventura y premios */
    (function () {
      // ---------- El Libro de Nublo: comprensión lectora de los capítulos impresos ----------
      // Para añadir una aventura: crea dat-nublo-capN.js (copia el de la aventura 1), añade su pegatina a dat-pegatinas.js y su nombre de archivo a lista.js.
      // pregunta: { t: 'directa' | 'inferencia', q, ok (respuesta correcta), bad: [error 1, error 2], why }
      const STICKERS = window.PEGATINAS;
      const CAPS = (window.NUBLO_CAPS || []).slice().sort((a, b) => a.n - b.n);
      const NAMES = []; CAPS.forEach(c => { NAMES[c.prize] = c.nombre || c.title; });
      const BOOK = CAPS;   // las aventuras están en dat-nublo-capN.js
      window.NUBLO_BOOK = BOOK;
      // ---- colección de premios: una pegatina por capítulo ----
      const KEY = 'owl_academy_nublo_prizes', PROG = 'owl_academy_nublo_book';
      const COL = { title: '📚 Aventuras de Nublo', items: STICKERS, names: NAMES, key: KEY, cols: 4, have: [] };
      try { const v = JSON.parse(localStorage.getItem(KEY) || '[]'); if (Array.isArray(v)) COL.have = v.filter(n => Number.isInteger(n) && n >= 0 && n < STICKERS.length); } catch (e) {}
      if (window.NUBLO_COLLECTIONS) window.NUBLO_COLLECTIONS.nublo = COL;
      let prog = {}; try { prog = JSON.parse(localStorage.getItem(PROG) || '{}') || {}; } catch (e) {}
      const savep = () => { try { localStorage.setItem(PROG, JSON.stringify(prog)); } catch (e) {} };
      const $ = id => document.getElementById(id);
      const shuffle = a => { const r = [...a]; for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; };
      const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
      function showOnly(id) {
        document.querySelectorAll('[id^="screen-"]').forEach(el => el.classList.add('hidden'));
        $(id).classList.remove('hidden');
        document.body.classList.remove('santa-theme', 'letter-theme', 'chick-theme', 'dragon-theme'); document.body.classList.add('letter-theme');
        window.scrollTo({ top: 0 });
      }
      let G = null;   // partida en curso
      Object.assign(app, {
        openLibro() {
          showOnly('screen-libro-menu');
          const owl = document.querySelector('#screen-academy .owl-mascot'), im = $('lb-owl'); if (owl && im && !im.src) im.src = owl.src;
          $('lb-chapters').innerHTML = BOOK.map((c, i) => {
            const p = prog[c.id] || {}, won = COL.have.includes(c.prize);
            const st = p.best != null ? `Tu mejor resultado: ${p.best} de ${c.qs.length}${won ? ' · 🏅 ¡Premio conseguido!' : ''}` : 'Lee el capítulo y toca para responder';
            return `<button class="lb-ch" onclick="app.startLibro(${i})"><img src="${STICKERS[c.prize]}" alt="" class="${won ? '' : 'lb-lock'}"><span><b>Capítulo ${c.n} · ${esc(c.place)}</b><small>${esc(c.title)}</small><small>${st}</small></span></button>`;
          }).join('');
          app.updateSharedRewards();
        },
        startLibro(i) {
          const c = BOOK[i];
          G = { i, c, k: 0, ans: c.qs.map(() => -1), opts: c.qs.map(q => shuffle([{ t: q.ok, ok: true }, { t: q.bad[0] }, { t: q.bad[1] }])) };
          showOnly('screen-libro-game'); app.renderLibroQ();
        },
        renderLibroQ() {
          const { c, k } = G, q = c.qs[k], n = c.qs.length;
          $('lb-counter').textContent = `Pregunta ${k + 1} de ${n}`; $('lb-progress').style.width = `${(k / n) * 100}%`;
          const L = ['A', 'B', 'C'];
          $('lb-body').innerHTML = `<div class="lb-q"><span class="lb-kind ${q.t === 'inferencia' ? 'inf' : q.t === 'descripcion' ? 'des' : ''}">${q.t === 'inferencia' ? '🧠 Piensa y deduce' : q.t === 'descripcion' ? '🎨 Imagina la escena' : '🔎 Pregunta del cuento'}</span><div class="lb-qt">${esc(q.q)}</div>
            ${G.opts[k].map((o, j) => `<button class="lb-opt ${G.ans[k] === j ? 'sel' : ''}" data-j="${j}"><span class="lb-l">${L[j]}</span>${esc(o.t)}</button>`).join('')}</div>
            <div class="lb-nav">${k > 0 ? '<button class="btn btn-back" id="lb-prev">⬅️ Atrás</button>' : ''}<button class="btn btn-primary" id="lb-next" ${G.ans[k] < 0 ? 'disabled style="opacity:.5"' : ''}>${k + 1 >= n ? 'Terminar y revisar 🏁' : 'Siguiente ➡️'}</button></div>`;
          $('lb-body').querySelectorAll('.lb-opt').forEach(b => b.onclick = () => { G.ans[k] = Number(b.dataset.j); app.renderLibroQ(); });
          if ($('lb-prev')) $('lb-prev').onclick = () => { G.k--; app.renderLibroQ(); };
          $('lb-next').onclick = () => { if (G.ans[k] < 0) return; if (k + 1 >= n) app.finishLibro(); else { G.k++; app.renderLibroQ(); window.scrollTo({ top: 0 }); } };
        },
        finishLibro() {
          const { c } = G, n = c.qs.length;
          const good = c.qs.map((q, k) => G.opts[k][G.ans[k]] && G.opts[k][G.ans[k]].ok);
          const score = good.filter(Boolean).length, pass = score / n >= .8;
          const p = prog[c.id] || (prog[c.id] = {}); if (p.best == null || score > p.best) p.best = score; savep();
          $('lb-counter').textContent = 'Resultado'; $('lb-progress').style.width = '100%';
          let prizeHtml = '';
          if (pass) {
            if (!COL.have.includes(c.prize)) {
              let pz = app.awardPrize('nublo');                       // también lo cuenta el diploma del juego
              if (pz.isNew && pz.idx !== c.prize && !COL.have.includes(c.prize)) {   // el premio es el del capítulo, no uno al azar
                COL.have = COL.have.filter(x => x !== pz.idx).concat(c.prize); try { localStorage.setItem(KEY, JSON.stringify(COL.have)); } catch (e) {}
                pz = { colId: 'nublo', idx: c.prize, isNew: true, complete: false };
              }
              prizeHtml = `<div class="lb-prize">${app.prizeBoxHtml(pz)}</div>`;
              if (typeof confetti === 'function') confetti({ particleCount: 140, spread: 90, origin: { y: .45 } });
            } else prizeHtml = `<div class="feedback-box feedback-correct" style="margin:8px 0;">🏅 ¡Muy bien otra vez! Este premio ya está en tu galería.</div>`;
          }
          $('lb-body').innerHTML = `<div class="lb-score"><div class="big">${score}/${n}</div><h2 style="margin:4px 0;">${pass ? '¡Eres un gran lector o lectora! 🦉🎉' : '¡Casi! Vuelve a leer el cuento 📖'}</h2>
            <p style="color:#64748B;">${pass ? 'Has superado el 80 % de aciertos.' : `Necesitas ${Math.ceil(n * .8)} aciertos para ganar el premio. Lee con calma y vuelve a intentarlo.`}</p></div>${prizeHtml}
            <h3 style="margin:14px 0 8px;">Vamos a revisar tus respuestas</h3>
            ${c.qs.map((q, k) => `<div class="lb-rev ${good[k] ? 'ok' : 'ko'}"><div class="t">${good[k] ? '✅' : '❌'} ${k + 1}. ${esc(q.q)}</div>
              ${good[k] ? '' : `<div class="a">Tu respuesta: ${esc(G.opts[k][G.ans[k]].t)}</div>`}<div class="a">✔️ Respuesta correcta: <b>${esc(q.ok)}</b></div><div class="w">💡 ${esc(q.why)}</div></div>`).join('')}
            <div class="lb-nav"><button class="btn btn-back" onclick="app.openLibro()">📚 Capítulos</button><button class="btn btn-primary" onclick="app.startLibro(${G.i})">🔁 Repetir</button></div>`;
          window.scrollTo({ top: 0 });
        }
      });
    })();
  
