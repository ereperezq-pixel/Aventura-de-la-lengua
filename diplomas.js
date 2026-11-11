/* Diplomas */
    (function () {
      // ---------- Diplomas: se consiguen al completar una colección de premios (y un Gran Diploma con las tres) ----------
      const COLS = window.NUBLO_COLLECTIONS || {};
      const NAME_KEY = 'owl_academy_student_name', DIP_KEY = 'owl_academy_diplomas';
      const AREAS = {
        chicks: { area: 'Matemáticas', place: 'El Corral Matemático', icon: '🐥', lead: 'Los números están en todas partes: en la ciencia, la arquitectura, la cocina y hasta en el espacio.' },
        santa: { area: 'Lengua', place: 'El Reto de Papá Noel', icon: '🎅', lead: 'Las palabras te ayudarán a contar historias, a enseñar, a convencer y a ser quien tú quieras.' },
        nublo: { area: 'Lengua · Lectura', place: 'Las Aventuras de Nublo', icon: '📚', lead: 'Leer te permite viajar por el mundo y por la historia, y entender todo lo que lees.' },
        dragons: { area: 'Conocimiento del Medio', place: 'El Valle de los Dragones', icon: '🐉', lead: 'Conocer el cuerpo humano y a los animales te acerca a ser médico, veterinaria, científico o exploradora.' }
      };
      const AREA_ORDER = ['chicks', 'santa', 'nublo', 'dragons'];
      const MSG = 'Gracias a todo lo que has aprendido, y a lo que aprenderás en el futuro, podrás elegir la profesión que más te guste: médica, astronauta, cocinero, piloto, artista, científica… Si te esfuerzas y sigues aprendiendo, ¡puedes dedicarte a lo que sueñes!';
      // ===== JUEGOS CON DIPLOMA =====
      // Cada juego tiene su propio diploma: se consigue ganando TODOS los premios (tantos como imágenes tiene su colección) jugando a ese juego.
      // Para un juego nuevo basta con añadir una línea aquí (o llamar a app.registerGame({...})): id, col (colección de premios), name, icon y test()
      // (test devuelve true cuando la pantalla de ese juego está abierta).
      const vis = id => { const e = document.getElementById(id); return !!e && !e.classList.contains('hidden'); };
      const GAMES = [
        { id: 'mult', col: 'chicks', name: 'La Cocina de las Tablas', icon: '🧁', test: () => vis('screen-ck-game') && app.ck && app.ck.mode === 'mult' },
        { id: 'compare', col: 'chicks', name: 'Mayor, menor o igual', icon: '🚀', test: () => vis('screen-ck-game') && app.ck && app.ck.mode === 'compare' },
        { id: 'order', col: 'chicks', name: 'La Carrera de los Pollitos', icon: '🚲', test: () => vis('screen-ck-game') && app.ck && app.ck.mode === 'order' },
        { id: 'abn', col: 'chicks', name: 'El Cuaderno ABN', icon: '📒', test: () => vis('screen-abn-game') },
        { id: 'subject', col: 'santa', name: 'Sujeto y Predicado', icon: '🎅', test: () => vis('screen-subject-game') },
        { id: 'syn', col: 'santa', name: 'Sinónimos y Antónimos', icon: '🔁', test: () => vis('screen-syn-game') },
        { id: 'bone', col: 'dragons', name: 'Los Huesos del Cuerpo', icon: '🦴', test: () => vis('screen-dr-game') && app.dr && app.dr.kind === 'bone' },
        { id: 'musc', col: 'dragons', name: 'Los Músculos del Cuerpo', icon: '💪', test: () => vis('screen-dr-game') && app.dr && app.dr.kind === 'musc' },
        { id: 'vert', col: 'dragons', name: 'Vertebrados e Invertebrados', icon: '🐾', test: () => vis('screen-dr-game') && app.dr && app.dr.kind === 'vert' },
        { id: 'libro', col: 'nublo', need: () => (window.NUBLO_BOOK || []).length, name: 'Las Aventuras de Nublo', icon: '📚', test: () => vis('screen-libro-game') },
        { id: 'world', col: 'dragons', need: 15, name: 'El Gran Safari de las Curiosidades', icon: '🧭', test: () => vis('screen-dr-game') && app.dr && app.dr.kind === 'world' },
        { id: 'quiz', col: 'dragons', name: 'El Quiz de los Animales', icon: '🧠', test: () => vis('screen-dr-game') && app.dr && app.dr.kind === 'quiz' }
      ];
      window.NUBLO_GAMES = GAMES;
      app.registerGame = g => { if (g && g.id && g.col && !GAMES.some(x => x.id === g.id)) GAMES.push(Object.assign({ icon: '🎮', test: () => false }, g)); };
      const GAME_BY_ID = id => GAMES.find(g => g.id === id);
      // Diplomas antiguos por área (ya concedidos antes de existir un diploma por juego): se conservan.
      const LEGACY = ['chicks', 'santa', 'dragons'];
      // ficha de un diploma: juego, diploma antiguo de área o Gran Diploma
      function info(id) {
        if (id === 'all') return { all: true, n: 0 };
        const g = GAME_BY_ID(id);
        if (g) { const A = AREAS[g.col]; return { game: g, col: g.col, area: A.area, icon: g.icon, name: g.name, lead: A.lead, n: (typeof g.need === 'function' ? g.need() : g.need) || COLS[g.col].items.length }; }
        const A = AREAS[id]; return { legacy: true, col: id, area: A.area, icon: A.icon, name: A.place, lead: A.lead, n: COLS[id].items.length };
      }
      const LIGADA_B64 = '';
      const $ = id => document.getElementById(id);
      const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
      const rd = k => { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch (e) { return null; } };
      const wr = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
      let dips = rd(DIP_KEY); if (!dips || typeof dips !== 'object') dips = {};
      const WINS_KEY = 'owl_academy_game_wins';
      let wins = rd(WINS_KEY); if (!wins || typeof wins !== 'object') wins = {};
      const nWins = id => wins[id] || 0;
      const isDone = id => id === 'all' ? GAMES.every(g => dips[g.id]) : GAME_BY_ID(id) ? nWins(id) >= info(id).n : !!dips[id];
      const today = () => new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
      let timers = [];
      const clearTimers = () => { timers.forEach(t => { clearInterval(t); clearTimeout(t); }); timers = []; document.querySelectorAll('.dp-fall').forEach(e => e.remove()); };

      function wrapText(t, n) {
        const out = []; let cur = '';
        t.split(' ').forEach(w => { if ((cur + ' ' + w).trim().length > n) { out.push(cur); cur = w; } else cur = (cur + ' ' + w).trim(); });
        if (cur) out.push(cur); return out;
      }
      function certSvg(id, name) {
        const I = info(id), all = !!I.all;
        const owl = (document.querySelector('#screen-academy .owl-mascot') || {}).src || '';
        const fs = Math.max(34, Math.min(70, Math.floor(560 / Math.max(4, name.length * 0.62))));
        const sub = all
          ? ['por haber superado TODOS los juegos de la Academia:', 'Lengua, Matemáticas y Conocimiento del Medio,', 'y haber ganado todos sus premios.']
          : I.legacy ? wrapText(`por haber superado los retos de ${I.area} y haber conseguido los ${I.n} premios de ${I.name}.`, 46)
          : wrapText(`por haber superado los retos de «${I.name}» (${I.area}) y haber ganado sus ${I.n} premios.`, 46);
        const lead = wrapText((all ? '' : I.lead + ' ') + MSG, 70);
        let y = 672; const leadTxt = lead.map((l, i) => `<text x="400" y="${y + i * 28}" text-anchor="middle" font-size="17" fill="#374151">${esc(l)}</text>`).join('');
        return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="dp-svg" viewBox="0 0 800 1100" font-family="Ligada, 'Fredoka', cursive">
          <rect width="800" height="1100" fill="#FFFBEB"/>
          <rect x="24" y="24" width="752" height="1052" rx="22" fill="none" stroke="#4338CA" stroke-width="10"/>
          <rect x="42" y="42" width="716" height="1016" rx="14" fill="none" stroke="#D4A017" stroke-width="4"/>
          <text x="70" y="96" font-size="34" fill="#D4A017">✦</text><text x="730" y="96" font-size="34" fill="#D4A017" text-anchor="end">✦</text>
          
          ${owl ? `<image x="320" y="62" width="160" height="160" preserveAspectRatio="xMidYMid meet" xlink:href="${owl}" href="${owl}"/>` : ''}
          <text x="400" y="250" text-anchor="middle" font-size="26" letter-spacing="1" fill="#4338CA">Academia del Búho Nublo</text>
          <text x="400" y="340" text-anchor="middle" font-size="${all ? 66 : 84}" letter-spacing="2" fill="#B45309">${all ? 'Gran Diploma' : 'Diploma'}</text>
          <line x1="190" y1="372" x2="610" y2="372" stroke="#D4A017" stroke-width="3"/>
          <text x="400" y="426" text-anchor="middle" font-size="22" fill="#6B7280">se otorga con mucho orgullo a</text>
          <text x="400" y="${500 + (70 - fs) / 4}" text-anchor="middle" font-size="${fs}" font-weight="700" fill="#4338CA">${esc(name)}</text>
          <line x1="150" y1="522" x2="650" y2="522" stroke="#A5B4FC" stroke-width="2"/>
          ${sub.map((l, i) => `<text x="400" y="${566 + i * 32}" text-anchor="middle" font-size="21" fill="#111827">${esc(l)}</text>`).join('')}
          ${leadTxt}
          ${medal(id)}
          <text x="400" y="996" text-anchor="middle" font-size="19" fill="#6B7280">¡Lo conseguiste!</text>
          <text x="130" y="1008" text-anchor="middle" font-size="16" fill="#111827">${esc(today_for(id))}</text><line x1="60" y1="1016" x2="200" y2="1016" stroke="#6B7280" stroke-width="2"/><text x="130" y="1038" text-anchor="middle" font-size="15" fill="#6B7280">Fecha</text>
          <text x="655" y="1008" text-anchor="middle" font-size="21" fill="#4338CA">El Búho Nublo</text><line x1="585" y1="1016" x2="725" y2="1016" stroke="#6B7280" stroke-width="2"/><text x="655" y="1038" text-anchor="middle" font-size="15" fill="#6B7280">Director de la Academia</text>
        </svg>`;
      }
      // ----- premio elegido para el diploma (imagen de la galería de premios) -----
      const pickOf = id => { const d = dips[id], k = d && d.pick; if (k && COLS[k.c] && COLS[k.c].items[k.i]) return k; return null; };
      function medal(id) {
        const I = info(id), pk = pickOf(id), src = pk && COLS[pk.c].items[pk.i];
        if (!src) return `<circle cx="400" cy="898" r="58" fill="#FDE68A" stroke="#D4A017" stroke-width="6"/><circle cx="400" cy="898" r="47" fill="none" stroke="#D4A017" stroke-width="2" stroke-dasharray="4 5"/><text x="400" y="916" text-anchor="middle" font-size="48">${I.all ? '🏆' : I.icon}</text>`;
        return `<defs><clipPath id="dp-clip"><circle cx="400" cy="906" r="66"/></clipPath></defs><circle cx="400" cy="906" r="72" fill="#FDE68A" stroke="#D4A017" stroke-width="6"/><image x="334" y="840" width="132" height="132" preserveAspectRatio="xMidYMid slice" clip-path="url(#dp-clip)" xlink:href="${src}" href="${src}"/><circle cx="400" cy="906" r="66" fill="none" stroke="#D4A017" stroke-width="2"/>`;
      }
      // premios que se pueden elegir: los ganados de la colección del juego (todas las colecciones en el Gran Diploma)
      function choices(id) {
        const I = info(id), cols = I.all ? AREA_ORDER : [I.col], out = [];
        cols.forEach(c => { const C = COLS[c]; if (!C) return; const have = (C.have || []).slice().sort((a, b) => a - b); (have.length ? have : C.items.map((_, i) => i)).forEach(i => out.push({ c, i })); });
        return out;
      }
      const today_for = id => (dips[id] && dips[id].date) || today();

      // ----- ventana (overlay) -----
      function overlay() {
        let o = $('dp-overlay');
        if (!o) { o = document.createElement('div'); o.id = 'dp-overlay'; o.className = 'dp-overlay'; document.body.appendChild(o); }
        o.classList.add('dp-open'); return o;
      }
      function closeAll() {
        clearTimers(); const o = $('dp-overlay'); if (o) { o.classList.remove('dp-open'); o.innerHTML = ''; }
        // si ya están los tres diplomas, llega el Gran Diploma
        if (GAMES.every(g => dips[g.id]) && !dips.all) window.setTimeout(() => app.startDiploma('all'), 400);
        if ($('screen-ck-gallery') && !$('screen-ck-gallery').classList.contains('hidden')) app.renderChickGallery();
      }
      function party(id) {
        const I = info(id), all = !!I.all, c = all ? null : COLS[I.col];
        const o = overlay(); clearTimers();
        o.innerHTML = `<div class="dp-card dp-party">
          <div class="dp-big">🎉🏆🎉</div>
          <h2>${all ? '¡¡HAS COMPLETADO TODA LA ACADEMIA!!' : '¡¡LO HAS CONSEGUIDO!!'}</h2>
          <p>${all ? 'Has superado todos los juegos de Lengua, Matemáticas y Conocimiento del Medio.' : `Has ganado <b>todos los premios</b> de <b>${I.name}</b>.`}</p>
          ${all ? '' : `<div class="dp-pics">${c.items.slice(0, 6).map(s => `<img src="${s}" alt="">`).join('')}</div>`}
          <p class="dp-sub">¡Te has ganado un diploma muy especial!</p>
          <button class="btn btn-primary" id="dp-go">🎓 ¡Quiero mi diploma!</button>
        </div>`;
        $('dp-go').onclick = () => nameStep(id);
        // fiesta: confeti sin parar durante unos segundos y lluvia de premios
        const items = all ? AREA_ORDER.flatMap(k => COLS[k].items) : c.items;
        const burst = () => { if (typeof confetti === 'function') { confetti({ particleCount: 70, angle: 60, spread: 70, origin: { x: 0, y: .7 } }); confetti({ particleCount: 70, angle: 120, spread: 70, origin: { x: 1, y: .7 } }); confetti({ particleCount: 40, spread: 100, origin: { x: .5, y: .3 } }); } };
        burst(); let n = 0; timers.push(setInterval(() => { burst(); if (++n > 9) clearInterval(timers[0]); }, 500));
        const drop = () => { const im = document.createElement('img'); im.className = 'dp-fall'; im.src = items[Math.floor(Math.random() * items.length)]; im.style.left = (2 + Math.random() * 82) + 'vw'; im.style.animationDuration = (3 + Math.random() * 2.5) + 's'; document.body.appendChild(im); im.addEventListener('animationend', () => im.remove(), { once: true }); };
        let k = 0; timers.push(setInterval(() => { drop(); if (++k > 22) clearInterval(timers[1]); }, 260));
      }
      function nameStep(id) {
        clearTimers(); const o = overlay(); let saved = ''; try { saved = localStorage.getItem(NAME_KEY) || ''; } catch (e) {}
        const opts = choices(id); let sel = pickOf(id) || opts[0] || null;
        const same = (x, y) => x && y && x.c === y.c && x.i === y.i;
        o.innerHTML = `<div class="dp-card">
          <div class="dp-big">✍️</div><h2>¿Cómo te llamas?</h2><p>Escribe tu nombre para que aparezca en tu diploma.</p>
          <input id="dp-name" class="dp-input" maxlength="28" autocomplete="off" placeholder="Tu nombre" value="${esc(saved)}">
          <div id="dp-err" class="dp-err"></div>
          ${opts.length ? `<p class="dp-sub">⭐ Elige el premio que saldrá en tu diploma</p><div class="dp-pick" id="dp-pick">${opts.map((q, n) => `<button type="button" class="dp-pk${same(q, sel) ? ' dp-on' : ''}" data-n="${n}" aria-label="${esc((COLS[q.c].names || [])[q.i] || 'Premio')}"><img src="${COLS[q.c].items[q.i]}" alt=""></button>`).join('')}</div><div class="dp-pkname" id="dp-pkname"></div>` : ''}
          <button class="btn btn-primary" id="dp-make">🎓 Crear mi diploma</button>
        </div>`;
        const nm = () => { const e = $('dp-pkname'); if (e) e.textContent = sel ? ((COLS[sel.c].names || [])[sel.i] || '') : ''; }; nm();
        const pk = $('dp-pick');
        if (pk) pk.onclick = e => { const b = e.target.closest('.dp-pk'); if (!b) return; sel = opts[Number(b.dataset.n)]; pk.querySelectorAll('.dp-pk').forEach(x => x.classList.toggle('dp-on', x === b)); nm(); };
        const inp = $('dp-name'), go = () => {
          const v = inp.value.trim().replace(/\s+/g, ' ');
          if (!v) { $('dp-err').textContent = 'Escribe tu nombre para continuar 🙂'; inp.focus(); return; }
          try { localStorage.setItem(NAME_KEY, v); } catch (e) {}
          dips[id] = { name: v, date: (dips[id] && dips[id].date) || today(), pick: sel }; wr(DIP_KEY, dips);
          view(id);
        };
        $('dp-make').onclick = go; inp.addEventListener('keydown', e => { if (e.key === 'Enter') go(); }); window.setTimeout(() => inp.focus(), 60);
      }
      function view(id, fromGallery) {
        clearTimers(); const o = overlay(), d = dips[id];
        o.innerHTML = `<div class="dp-card dp-view">
          <button class="dp-x" id="dp-x" aria-label="Cerrar">✕</button>
          <div class="dp-paper">${certSvg(id, d.name)}</div>
          <div class="dp-actions">
            <button class="btn btn-green" id="dp-save">📥 Guardar imagen</button>
            <button class="btn btn-primary" id="dp-print">🖨️ Imprimir</button>
            <button class="btn btn-back" id="dp-rename">✏️ Cambiar nombre</button>
            <button class="btn btn-back" id="dp-close">Seguir jugando ➡️</button>
          </div></div>`;
        $('dp-x').onclick = $('dp-close').onclick = closeAll;
        $('dp-rename').onclick = () => nameStep(id);
        $('dp-print').onclick = () => window.print();
        $('dp-save').onclick = () => savePng(id, d.name);
        if (!fromGallery && typeof confetti === 'function') confetti({ particleCount: 120, spread: 90, origin: { y: .4 } });
      }
      function savePng(id, name) {
        const svg = $('dp-svg'); if (!svg) return;
        // la letra ligada se incrusta en la imagen para que el PNG se vea igual en cualquier dispositivo
        let ff = ''; try { for (const sh of document.styleSheets) for (const r of sh.cssRules) if (r.type === 5 && /Ligada/.test(r.style.fontFamily)) ff = r.cssText; } catch (e) {}
        const xml = new XMLSerializer().serializeToString(svg).replace('<svg ', '<svg width="1600" height="2200" ').replace(/(<svg[^>]*>)/, `$1<defs><style>${ff}</style></defs>`);
        const img = new Image();
        img.onload = () => {
          const cv = document.createElement('canvas'); cv.width = 1600; cv.height = 2200; cv.getContext('2d').drawImage(img, 0, 0, 1600, 2200);
          cv.toBlob(b => { if (!b) return; const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = `Diploma-${id}-${name.replace(/[^\wáéíóúüñÁÉÍÓÚÜÑ-]+/g, '_')}.png`; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); }, 'image/png');
        };
        img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(xml);
      }

      app.startDiploma = function (id) { if (!isDone(id)) return; if (dips[id]) view(id, true); else party(id); };
      app.openDiploma = function (id) { if (dips[id]) view(id, true); else if (isDone(id)) party(id); };

      // Cada premio ganado se apunta al juego que está abierto en ese momento (sin tocar el código de los juegos)
      const origAward = app.awardPrize.bind(app);
      app.awardPrize = function (colId) {
        const pz = origAward(colId);
        const g = GAMES.find(x => x.col === colId && x.test());
        if (g) {
          wins[g.id] = nWins(g.id) + 1; wr(WINS_KEY, wins);
          if (isDone(g.id) && !dips[g.id]) window.setTimeout(() => party(g.id), 2800);
        }
        return pz;
      };

      // Sección "Mis diplomas" en la Galería de Premios: un diploma por juego
      const origRender = app.renderChickGallery.bind(app);
      app.renderChickGallery = function () {
        const r = origRender();
        const wrap = $('ck-gallery'); if (!wrap) return r;
        const h = document.createElement('h3'); h.className = 'ck-col-title'; h.innerHTML = '🎓 Mis diplomas';
        const box = document.createElement('div'); box.className = 'dp-list';
        const item = (id, title, state, ico, cls, onclick) => {
          const b = document.createElement('button'); b.className = 'dp-item ' + cls;
          b.innerHTML = `<span class="dp-ico">${ico}</span><span><b>${title}</b><br><small>${state}</small></span>`; b.onclick = onclick; box.appendChild(b);
        };
        AREA_ORDER.forEach(col => {
          const games = GAMES.filter(g => g.col === col); if (!games.length) return;
          const sh = document.createElement('div'); sh.className = 'dp-area'; sh.textContent = `${AREAS[col].icon} ${AREAS[col].area}`; box.appendChild(sh);
          games.forEach(g => {
            const has = !!dips[g.id], done = isDone(g.id), n = info(g.id).n, w = Math.min(nWins(g.id), n);
            const state = has ? `Para ${dips[g.id].name} · ¡Tócalo para verlo!` : done ? '¡Ya lo has ganado! Toca para pedirlo 🎉' : `Premios ganados en este juego: ${w} de ${n}`;
            item(g.id, g.name, state, has || done ? g.icon : '🔒', has ? 'dp-has' : done ? 'dp-ready' : 'dp-locked', () => { if (has || done) app.openDiploma(g.id); else $('ck-gallery-info').textContent = `Gana los ${n} premios jugando a «${g.name}» para conseguir este diploma (llevas ${w}).`; });
          });
        });
        LEGACY.filter(id => dips[id]).forEach(id => item(id, `Diploma de ${AREAS[id].area} (anterior)`, `Para ${dips[id].name} · ¡Tócalo para verlo!`, AREAS[id].icon, 'dp-has', () => app.openDiploma(id)));
        const hasAll = !!dips.all, doneAll = isDone('all'), got = GAMES.filter(g => dips[g.id]).length;
        item('all', 'Gran Diploma de la Academia', hasAll ? `Para ${dips.all.name} · ¡Tócalo para verlo!` : doneAll ? '¡Ya lo has ganado! Toca para pedirlo 🎉' : `Consigue el diploma de todos los juegos (${got} de ${GAMES.length})`,
          hasAll || doneAll ? '🏆' : '🔒', hasAll ? 'dp-has' : doneAll ? 'dp-ready' : 'dp-locked', () => { if (hasAll || doneAll) app.openDiploma('all'); else $('ck-gallery-info').textContent = `Consigue el diploma de los ${GAMES.length} juegos para ganar el Gran Diploma (llevas ${got}).`; });
        wrap.prepend(h, box);
        return r;
      };
    })();
  
