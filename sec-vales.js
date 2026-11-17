/* Vales: la tienda de vales. Cada vale tiene su precio en estrellas (elegir la cena, el postre, la excursión...).
   Los vales canjeados quedan en "Mis vales" hasta que un adulto los marca como usados con la clave.
   Gastar estrellas NO baja el rango de Nublo (el rango cuenta las estrellas ganadas en total).
   Para cambiar los vales o los precios basta con editar la lista VALES de abajo. */
(function () {
  const $ = id => document.getElementById(id);
  const PRECIO = 90;                  // precio por defecto (cada vale lleva su propio "precio" en la lista)
  const ESPERA = 3;                   // para repetir un vale hay que haber canjeado antes al menos ESPERA vales distintos
  const CLAVE = '4321';               // clave de adultos para marcar un vale como usado (la misma que la de los premios)
  const VALES = [
    { id: 'cena', precio: 280, icon: '🍽️', name: 'Elegir la cena', desc: 'Hoy cenamos lo que tú elijas.' },
    { id: 'postre', precio: 120, icon: '🍰', name: 'Elegir el postre', desc: 'El postre del día lo eliges tú.' },
    { id: 'excursion', precio: 700, icon: '🏞️', name: 'Elegir la excursión', desc: 'Una salida o excursión que elijas tú.' },
    { id: 'peli', precio: 220, icon: '🎬', name: 'Elegir la película', desc: 'La película de la noche la eliges tú.' },
    { id: 'tablet', precio: 150, icon: '📱', name: '30 minutos extra de tablet', desc: 'Media hora de juego extra.' },
    { id: 'cuento', precio: 100, icon: '📖', name: 'Un cuento extra', desc: 'Un cuento más antes de dormir.' },
    { id: 'acostarse', precio: 180, icon: '🌙', name: 'Acostarse 30 minutos más tarde', desc: 'Una noche con media hora más.' },
    { id: 'juegos', precio: 350, icon: '🧸', name: 'Tarde de juegos', desc: 'Un rato de juego con papá o mamá, a tu elección.' },
    { id: 'amigo', precio: 450, icon: '👫', name: 'Invitar a un amigo', desc: 'Un amigo o amiga viene a jugar.' },
    { id: 'musica', precio: 90, icon: '🚗', name: 'Elegir la música del coche', desc: 'Tú pones la música en el próximo viaje.' },
    { id: 'helado', precio: 120, icon: '🍦', name: 'Un helado especial', desc: 'Un helado o una merienda especial.' },
    { id: 'mesa', precio: 150, icon: '🎲', name: 'Elegir el juego de mesa', desc: 'Jugamos al juego de mesa que elijas.' }
  ];
  registrarSeccion({
    antes: '.academy-card[onclick*="openChickGallery"]',
    tarjeta: `      <div class="academy-card vales-entry" onclick="app.openVales()">
        <div class="academy-icon">🎟️</div><div><div class="dr-eyebrow le-eyebrow">Vales</div><h3>La tienda de vales</h3><p>Cambia tus estrellas por vales: elegir la cena, el postre, una excursión...</p></div>
      </div>`,
    pantallas: `    <!-- ===== VALES ===== -->
    <div id="screen-vales" class="hidden">
      <button class="back-academy" onclick="app.goToAcademyMenu()">🦉 Volver a la Academia del Búho</button>
      <div class="dr-eyebrow le-eyebrow">Vales</div>
      <h1 style="font-size:1.7rem;margin:2px 0 4px;color:#4338CA;">🎟️ La tienda de vales</h1>
      <div id="vales-saldo" class="vales-saldo"></div>
      <h2 class="vales-h">🎁 Mis vales</h2>
      <div id="vales-mios"></div>
      <h2 class="vales-h">🛍️ Canjea tus estrellas</h2>
      <p style="color:#64748B;font-size:.9rem;margin:-4px 0 8px;">Cada vale tiene su precio: ¡elige bien en qué gastas! Para repetir un vale, antes tienes que canjear 3 vales distintos.</p>
      <div id="vales-tienda"></div>
      <div id="vales-usados-box" class="hidden"><h2 class="vales-h">✅ Vales ya usados</h2><div id="vales-usados"></div></div>
    </div>`
  });
  const st = document.createElement('style');
  st.textContent = '.vales-saldo{background:#FEF3C7;border:2px solid #FCD34D;border-radius:16px;padding:10px 14px;font-weight:800;color:#92400E;font-size:1.1rem;text-align:center;margin:8px 0 6px;}' +
    '.vales-h{font-size:1.2rem;color:#4338CA;margin:16px 0 8px;}' +
    '.vale{display:flex;align-items:center;gap:12px;background:#fff;border:3px dashed #C4B5FD;border-radius:18px;padding:12px;margin-bottom:10px;text-align:left;}' +
    '.vale .vi{font-size:2.2rem;flex:none;}.vale .vt{flex:1;min-width:0;}.vale h3{font-size:1.05rem;margin:0 0 2px;color:#1E1B4B;}.vale p{font-size:.85rem;color:#64748B;margin:0;}' +
    '.vale .vb{flex:none;border:0;border-radius:12px;padding:9px 12px;font-weight:800;font-size:.9rem;color:#fff;background:#F59E0B;cursor:pointer;}.vale .vb:disabled{background:#CBD5E1;color:#64748B;}' +
    '.vale.mio{border-color:#34D399;background:#ECFDF5;}.vale.mio .vb{background:#10B981;}.vale.usado{opacity:.6;border-style:solid;border-color:#CBD5E1;background:#F1F5F9;}' +
    '.vales-modal{position:fixed;inset:0;background:rgba(30,27,75,.65);z-index:100000;display:flex;align-items:center;justify-content:center;padding:16px;}' +
    '.vales-modal>div{background:#fff;border-radius:22px;padding:18px;max-width:340px;width:100%;text-align:center;border:4px solid #FCD34D;}' +
    '.vales-modal input{width:100%;box-sizing:border-box;font-size:1.3rem;text-align:center;padding:8px;border:2px solid #C4B5FD;border-radius:12px;margin:10px 0 4px;}' +
    '.vales-modal .vm-row{display:flex;gap:10px;margin-top:10px;}.vales-modal .vm-row button{flex:1;}';
  document.head.appendChild(st);

  const KEY = 'owl_academy_vales_v1';
  const load = () => { try { const d = JSON.parse(localStorage.getItem(KEY)); return d && Array.isArray(d.mine) ? d : { mine: [] }; } catch (e) { return { mine: [] }; } };
  const save = d => { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {} };
  const stars = () => { try { return Number(localStorage.getItem('owl_academy_shared_stars') || 0); } catch (e) { return 0; } };
  const setStars = n => { try { localStorage.setItem('owl_academy_shared_stars', String(n)); } catch (e) {} if (app.updateSharedRewards) app.updateSharedRewards(); };
  const price = v => v.precio || PRECIO;
  // cuántos canjes de otros vales faltan para poder repetir este (0 = disponible)
  const espera = (id, d) => { let i = -1; d.mine.forEach((x, k) => { if (x.id === id) i = k; }); return i < 0 ? 0 : Math.max(0, ESPERA - (d.mine.length - 1 - i)); };
  const esc = t => String(t).replace(/[&<>"]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));
  const fecha = ts => { const d = new Date(ts); return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear(); };
  const hideAll = () => { document.querySelectorAll('[id^="screen-"]').forEach(e => e.classList.add('hidden')); document.body.classList.remove('santa-theme', 'letter-theme', 'chick-theme', 'dragon-theme'); window.scrollTo({ top: 0 }); };
  function modal(html) {
    const o = document.createElement('div'); o.className = 'vales-modal'; o.innerHTML = '<div>' + html + '</div>'; document.body.appendChild(o);
    o.addEventListener('click', e => { if (e.target === o) o.remove(); }); return o;
  }

  function render() {
    const d = load(), s = stars();
    $('vales-saldo').innerHTML = '⭐ Tienes <b>' + s + '</b> estrellas';
    const sin = d.mine.filter(v => !v.used), usados = d.mine.filter(v => v.used);
    $('vales-mios').innerHTML = sin.length ? sin.map(v => `<div class="vale mio"><div class="vi">${v.icon}</div><div class="vt"><h3>${esc(v.name)}</h3><p>Canjeado el ${fecha(v.ts)}</p></div><button class="vb" onclick="app.valeUsar(${v.n})">Usar</button></div>`).join('')
      : '<p style="color:#64748B;font-size:.95rem;">Aún no tienes vales. ¡Canjea uno con tus estrellas!</p>';
    $('vales-tienda').innerHTML = VALES.slice().sort((a, b) => price(a) - price(b)).map(v => { const p = price(v), w = espera(v.id, d), ok = s >= p && !w;
      const label = w ? '🔒 Elige ' + w + ' vale' + (w > 1 ? 's' : '') + ' más' : (s >= p ? 'Canjear' : 'Faltan ' + (p - s) + ' ⭐');
      return `<div class="vale"><div class="vi">${v.icon}</div><div class="vt"><h3>${esc(v.name)}</h3><p>${esc(v.desc)}</p><p style="color:#B45309;font-weight:800;margin-top:2px;">${p} ⭐</p></div><button class="vb" ${ok ? '' : 'disabled'} onclick="app.valeCanjear('${v.id}')">${label}</button></div>`; }).join('');
    $('vales-usados-box').classList.toggle('hidden', !usados.length);
    $('vales-usados').innerHTML = usados.map(v => `<div class="vale usado"><div class="vi">${v.icon}</div><div class="vt"><h3>${esc(v.name)}</h3><p>Usado el ${fecha(v.used)}</p></div></div>`).join('');
  }
  app.openVales = function () { hideAll(); $('screen-vales').classList.remove('hidden'); render(); app.currentSectionKey = null; if (app.updateSharedRewards) app.updateSharedRewards(); };
  app.valeCanjear = function (id) {
    const v = VALES.find(x => x.id === id); if (!v) return; if (stars() < price(v) || espera(id, load())) return;
    const o = modal(`<div style="font-size:2.4rem;">${v.icon}</div><h2 style="color:#4338CA;margin:6px 0;">${esc(v.name)}</h2><p style="color:#64748B;">¿Quieres cambiar <b>${price(v)} estrellas</b> por este vale?</p><div class="vm-row"><button class="btn btn-back" id="vm-no">Ahora no</button><button class="btn btn-green" id="vm-si">¡Sí, canjear!</button></div>`);
    o.querySelector('#vm-no').onclick = () => o.remove();
    o.querySelector('#vm-si').onclick = () => {
      if (stars() < price(v) || espera(id, load())) { o.remove(); render(); return; }
      setStars(stars() - price(v));
      const d = load(); d.n = (d.n || 0) + 1; d.mine.push({ n: d.n, id: v.id, icon: v.icon, name: v.name, ts: Date.now(), used: null }); save(d);
      o.innerHTML = `<div><div style="font-size:2.4rem;">🎉${v.icon}🎉</div><h2 style="color:#047857;margin:6px 0;">¡Vale conseguido!</h2><p style="color:#334155;">${esc(v.name)}</p><p style="color:#64748B;font-size:.9rem;">Lo encontrarás en “Mis vales”. Cuando lo uses, un adulto lo marcará.</p><button class="btn btn-primary" id="vm-ok">¡Genial!</button></div>`;
      o.querySelector('#vm-ok').onclick = () => o.remove();
      if (typeof confetti === 'function') { try { confetti({ particleCount: 140, spread: 80, origin: { y: .6 }, zIndex: 100001 }); } catch (e) {} }
      render();
    };
  };
  app.valeUsar = function (n) {
    const d = load(), v = d.mine.find(x => x.n === n); if (!v || v.used) return;
    const o = modal(`<div style="font-size:2.2rem;">${v.icon}</div><h2 style="color:#4338CA;margin:6px 0;">${esc(v.name)}</h2><p style="color:#64748B;">Para usar este vale, un adulto escribe la clave.</p><input id="vm-key" type="password" inputmode="numeric" maxlength="8" autocomplete="off" placeholder="Clave"><div id="vm-msg" style="min-height:1.2em;color:#DC2626;font-size:.9rem;"></div><div class="vm-row"><button class="btn btn-back" id="vm-no">Cancelar</button><button class="btn btn-green" id="vm-si">Usar vale</button></div>`);
    const go = () => {
      const k = o.querySelector('#vm-key').value.trim();
      if (k !== CLAVE) { o.querySelector('#vm-msg').textContent = '❌ Clave incorrecta'; o.querySelector('#vm-key').value = ''; return; }
      const dd = load(), vv = dd.mine.find(x => x.n === n); if (vv) { vv.used = Date.now(); save(dd); } o.remove(); render();
    };
    o.querySelector('#vm-no').onclick = () => o.remove(); o.querySelector('#vm-si').onclick = go;
    o.querySelector('#vm-key').addEventListener('keydown', e => { if (e.key === 'Enter') go(); });
  };
  const orig = app.goToAcademyMenu.bind(app);
  app.goToAcademyMenu = function () { const e = $('screen-vales'); if (e) e.classList.add('hidden'); return orig.apply(app, arguments); };
})();
