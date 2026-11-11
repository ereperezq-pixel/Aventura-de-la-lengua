/* El Libro de Nublo: preguntas de cada aventura y premios */
    (function () {
      // ---------- El Libro de Nublo: comprensión lectora de los capítulos impresos ----------
      // Para añadir un capítulo: agrega un objeto a BOOK (con sus 10 preguntas) y su imagen de premio a STICKERS.
      // pregunta: { t: 'directa' | 'inferencia', q, ok (respuesta correcta), bad: [error 1, error 2], why }
      const STICKERS = window.PEGATINAS;
      const NAMES = ['Nublo en Egipto'];
      const BOOK = [
        { id: 'egipto', n: 1, title: 'El misterio del Ojo de Horus', place: 'Egipto', icon: '🏺', prize: 0, qs: [
          // ---- 8 de comprensión directa ----
          { t: 'directa', q: '¿Cómo se llamaba la escuela donde estudiaba Nublo?', ok: 'La Academia del Búho', bad: ['La Academia de los Faraones', 'La Escuela del Nilo'], why: 'Nublo era alumno de la Academia del Búho, una escuela donde se estudiaban los secretos de la naturaleza y las antiguas civilizaciones.' },
          { t: 'directa', q: '¿Qué poder tenía Coral, la garza azul?', ok: 'Podía mover el agua con sus plumas', bad: ['Podía crear cristales de hielo', 'Podía invocar llamas sin quemarse'], why: 'Coral movía el agua con sus plumas. Brasa invocaba llamas y Nieva creaba cristales de hielo.' },
          { t: 'directa', q: '¿Qué símbolo había grabado en la pequeña puerta de madera?', ok: 'Un búho con las alas extendidas y una estrella en el centro', bad: ['Un dragón soplando una llama', 'Un ojo dentro de un triángulo'], why: 'La puerta no tenía cerradura ni pomo: solo un búho con las alas extendidas y una estrella en el centro.' },
          { t: 'directa', q: '¿Qué dejaban las crecidas del Nilo sobre las orillas?', ok: 'Una capa de limo oscuro y fértil', bad: ['Una capa de arena blanca', 'Una capa de sal'], why: 'El limo oscuro enriquecía el suelo y ayudaba a producir alimentos.' },
          { t: 'directa', q: '¿Con qué estaban construidas las casas de la aldea?', ok: 'Con adobe: barro mezclado con paja y secado al sol', bad: ['Con piedra tallada y cemento', 'Con troncos de palmera y hojas'], why: 'El adobe es barro mezclado con paja, moldeado y secado al sol.' },
          { t: 'directa', q: '¿Cómo se llamaba el anciano barquero que ayudó a los amigos?', ok: 'Hori', bad: ['Kay', 'Umbra'], why: 'Hori era un barquero que llevaba muchos años navegando entre distintas poblaciones. Kay era el escriba y Umbra, el ladrón.' },
          { t: 'directa', q: '¿Cómo se fabricaba el papiro?', ok: 'Cortando en tiras los tallos de una planta y prensándolas unas junto a otras', bad: ['Moldeando arcilla húmeda y dejándola secar', 'Tejiendo lino en un telar'], why: 'Se cortaban los tallos de la planta en tiras, se colocaban juntas y se prensaban para formar una superficie donde escribir.' },
          { t: 'directa', q: '¿De qué materiales estaba hecho el Ojo de Horus?', ok: 'De oro y lapislázuli', bad: ['De plata y marfil', 'De bronce y cristal'], why: 'El amuleto estaba fabricado con oro y lapislázuli, una piedra azul.' },
          // ---- 6 de inferencia ----
          { t: 'inferencia', q: 'Al llegar a Egipto, la ropa de los amigos había cambiado. ¿Por qué crees que el libro hizo eso?', ok: 'Para que pasaran desapercibidos entre la gente de la época', bad: ['Porque hacía mucho calor', 'Porque el faraón se lo había ordenado'], why: 'Coral lo dijo: el libro los había preparado para pasar desapercibidos, es decir, para no llamar la atención.' },
          { t: 'inferencia', q: 'Hori dijo: «Debéis aprender a mirar más allá de sus templos». ¿Qué quería enseñarles?', ok: 'Que la verdadera vida de Egipto también está en sus aldeas, talleres y campos', bad: ['Que los templos no tenían ninguna importancia', 'Que debían dejar de viajar y quedarse en la aldea'], why: 'Hori quería que conocieran a las personas corrientes: campesinos, artesanos y escribas, no solo faraones y templos.' },
          { t: 'inferencia', q: '¿Por qué eran tan necesarios los escribas en Egipto?', ok: 'Porque escribir era muy difícil de aprender y servía para registrar cosechas, almacenes y órdenes', bad: ['Porque a todos los egipcios les encantaba leer libros', 'Porque eran los únicos que sabían jugar al senet'], why: 'No todo el mundo sabía leer y escribir, y aprender llevaba mucho tiempo. Los escribas anotaban cosechas, tributos y órdenes del gobierno.' },
          { t: 'inferencia', q: 'En la cámara del tesoro había cofres y joyas, pero solo faltaba el Ojo de Horus. ¿Qué indica eso?', ok: 'Que el ladrón buscaba justamente ese objeto', bad: ['Que el ladrón tuvo prisa y cogió lo primero que vio', 'Que los guardianes habían escondido las demás joyas'], why: 'Nublo pensó que quien lo hizo «sabía exactamente lo que buscaba». No fue un robo al azar.' },
          { t: 'inferencia', q: 'Umbra dijo: «No lo he robado por su oro». ¿Qué quiso decir?', ok: 'Que el amuleto le interesaba por lo que representa y no por el valor del material', bad: ['Que el amuleto no era de oro de verdad', 'Que él no había robado el amuleto'], why: 'Umbra explicó que hay objetos cuyo valor no puede medirse por el material del que están hechos.' },
          { t: 'inferencia', q: '¿Qué pista llevó a Nublo a pensar que el robo era solo una parte de algo mucho más grande?', ok: 'La tablilla de arcilla con el mismo símbolo que llevaba Umbra, que venía de otra tierra', bad: ['Una carta que el faraón había encontrado', 'Que los guardianes habían visto a Umbra salir del palacio'], why: 'La tablilla venía de Mesopotamia y llevaba el símbolo de Umbra. Nublo dedujo que reunía objetos de distintas civilizaciones.' },
          // ---- 6 de descripción: imaginar personajes y lugares ----
          { t: 'descripcion', q: '¿Cómo iba vestido Nublo en el antiguo Egipto?', ok: 'Con una túnica de lino blanco, un cinturón de cuero y un collar ancho de colores', bad: ['Con una capa de piel y un casco de bronce', 'Con una túnica roja y sandalias doradas'], why: 'Vestía una túnica de lino blanco, un cinturón de cuero y un collar ancho de colores, con los ojos maquillados de oscuro.' },
          { t: 'descripcion', q: '¿Cómo era el río Nilo cuando los amigos abrieron los ojos?', ok: 'Majestuoso y tan ancho que parecía un mar tranquilo', bad: ['Estrecho y rodeado de montañas nevadas', 'Seco y lleno de piedras'], why: 'A su alrededor había palmeras, campos cultivados y pequeñas embarcaciones.' },
          { t: 'descripcion', q: '¿A qué olía la cámara del tesoro?', ok: 'A madera, aceites y piedra caliente', bad: ['A incienso y flores de loto', 'A pan recién hecho y especias'], why: 'La cámara tenía cofres, joyas, estatuillas y objetos ceremoniales, y olía a madera, aceites y piedra caliente.' },
          { t: 'descripcion', q: '¿Cómo era el aspecto de Tutankamón cuando lo vieron en la sala?', ok: 'Un joven faraón serio, cuyo rostro aún conservaba rasgos de muchacho', bad: ['Un anciano de barba larga y gesto severo', 'Un niño muy pequeño que jugaba y reía'], why: 'Tutankamón parecía serio, aunque su rostro conservaba todavía los rasgos de un muchacho.' },
          { t: 'descripcion', q: '¿Cómo era la ropa de Umbra, el hombre de la máscara?', ok: 'Una capa de viaje del color de la arena por fuera y negra por dentro', bad: ['Una capa roja con capucha dorada', 'Una túnica blanca con un cinturón azul'], why: 'Llevaba una capa color arena por fuera y negra por dentro, y su rostro estaba cubierto por una máscara metálica oscura.' },
          { t: 'descripcion', q: '¿Qué rasgos se veían de la cara de Umbra?', ok: 'Ojos grises casi plateados y una cicatriz estrecha sobre la ceja izquierda', bad: ['Ojos verdes y una cicatriz en la mejilla derecha', 'Ojos negros y un lunar en la frente'], why: 'Solo se veían sus ojos, grises y casi plateados, y una cicatriz estrecha sobre la ceja izquierda. El resto lo tapaba la máscara.' }
        ] }
      ];
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
  
