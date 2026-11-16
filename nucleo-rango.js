/* Estrellas y rangos de Nublo.
   - Rango: según las estrellas GANADAS EN TOTAL (aunque luego se gasten). Estudiante hasta 299; después sube un rango cada 200.
   - Tope diario: como máximo TOPE estrellas por juego y día (así no sirve repetir el mismo juego sin parar).
   - Bonus: BONUS estrellas extra la primera vez que se gana una estrella en un juego distinto ese día.
   Para cambiar los números basta con editar las constantes de abajo. */
(function () {
  const TOPE = 20, BONUS = 3;
  const RANGOS = [
    { min: 0, key: 'Estudiante', name: 'Nublo Estudiante' },
    { min: 300, key: 'Graduado', name: 'Nublo Graduado' },
    { min: 500, key: 'Doctorado', name: 'Nublo Doctorado' },
    { min: 700, key: 'Sabio', name: 'Nublo Sabio' },
    { min: 900, key: 'Genio', name: 'Nublo Genio' }
  ];
  const TOTAL_KEY = 'owl_academy_stars_total', RANK_KEY = 'owl_academy_rank_seen', DAY_KEY = 'owl_academy_stars_day';
  const rd = k => { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } };
  const wr = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  const shared = () => { try { return Number(localStorage.getItem('owl_academy_shared_stars') || 0); } catch (e) { return 0; } };
  const today = () => { const d = new Date(); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); };

  // total ganado: la primera vez parte de las estrellas que ya tenía
  let total = rd(TOTAL_KEY); if (typeof total !== 'number' || isNaN(total)) { total = shared(); wr(TOTAL_KEY, total); }
  const rankIndex = n => { let r = 0; RANGOS.forEach((x, i) => { if (n >= x.min) r = i; }); return r; };

  // ----- imagen del búho y cartel de rango -----
  function paint() {
    const i = rankIndex(total), R = RANGOS[i], src = (window.RANGOS_IMG || {})[R.key];
    if (src) document.querySelectorAll('img.owl-mascot, img[data-same-owl]').forEach(im => { if (im.src !== src) im.src = src; });
    let box = document.getElementById('rango-box');
    if (!box) {
      const owl = document.querySelector('img.owl-mascot[data-img="owl"]'); if (!owl) return;
      owl.insertAdjacentHTML('afterend', '<div id="rango-box" style="text-align:center;margin:-2px 0 8px;"></div>'); box = document.getElementById('rango-box');
    }
    const nx = RANGOS[i + 1];
    box.innerHTML = `<div style="font-weight:800;color:#4338CA;font-size:1.1rem;">${R.name}</div>` +
      `<div style="font-size:.85rem;color:#64748B;">${nx ? `⭐ ${total} estrellas ganadas · te faltan ${nx.min - total} para ser ${nx.name}` : `⭐ ${total} estrellas ganadas · ¡el rango más alto!`}</div>`;
  }
  function toast(html, ms) {
    let t = document.getElementById('rango-toast');
    if (!t) { t = document.createElement('div'); t.id = 'rango-toast'; t.style.cssText = 'position:fixed;left:50%;bottom:22px;transform:translateX(-50%);max-width:88vw;background:#4338CA;color:#fff;padding:10px 16px;border-radius:16px;font-weight:700;font-size:.95rem;box-shadow:0 6px 18px rgba(0,0,0,.25);z-index:99999;text-align:center;transition:opacity .3s;'; document.body.appendChild(t); }
    t.innerHTML = html; t.style.opacity = '1'; clearTimeout(t._h); t._h = setTimeout(() => { t.style.opacity = '0'; }, ms || 2600);
  }
  function levelUp(i) {
    const R = RANGOS[i], src = (window.RANGOS_IMG || {})[R.key] || '';
    const o = document.createElement('div'); o.style.cssText = 'position:fixed;inset:0;background:rgba(30,27,75,.72);z-index:100000;display:flex;align-items:center;justify-content:center;padding:16px;';
    o.innerHTML = `<div style="background:#fff;border-radius:24px;padding:20px 18px;max-width:340px;width:100%;text-align:center;border:4px solid #FCD34D;"><div style="font-size:2rem;">🎉🌟🎉</div><h2 style="color:#4338CA;margin:6px 0;">¡Nublo ha subido de nivel!</h2><img src="${src}" alt="${R.name}" style="max-width:70%;max-height:220px;object-fit:contain;"><h3 style="color:#B45309;margin:6px 0 12px;">${R.name}</h3><button class="btn btn-primary" id="rango-ok">¡Genial!</button></div>`;
    document.body.appendChild(o); o.querySelector('#rango-ok').onclick = () => o.remove();
    if (typeof confetti === 'function') { try { confetti({ particleCount: 160, spread: 90, origin: { y: .5 }, zIndex: 100001 }); } catch (e) {} }
  }

  // ----- reparto de estrellas: tope diario por juego + bonus por juego nuevo -----
  const vis = id => { const e = document.getElementById(id); return !!e && !e.classList.contains('hidden'); };
  function gameKey() {
    const g = (window.NUBLO_GAMES || []).find(x => { try { return x.test(); } catch (e) { return false; } });
    if (g) return g.id;
    const s = [...document.querySelectorAll('[id^="screen-"]')].find(e => !e.classList.contains('hidden'));
    return s ? s.id : 'otro';
  }
  const orig = app.awardSharedReward.bind(app);
  app.awardSharedReward = function (amount) {
    amount = amount === undefined ? 1 : amount;
    const key = gameKey(); let day = rd(DAY_KEY); if (!day || day.date !== today()) day = { date: today(), per: {} };
    const n = day.per[key] || 0;
    if (n >= TOPE) { toast('🌙 Hoy ya has ganado todas las estrellas de este juego. ¡Prueba otro juego o vuelve mañana!', 3200); return; }
    let give = Math.min(amount, TOPE - n), bonus = 0;
    if (!(key in day.per) && BONUS) bonus = BONUS;
    day.per[key] = n + give; wr(DAY_KEY, day);
    orig(give + bonus);
    const before = rankIndex(total); total += give + bonus; wr(TOTAL_KEY, total);
    if (bonus) toast('✨ ¡+' + BONUS + ' estrellas por jugar a un juego nuevo hoy!', 2600);
    const after = rankIndex(total); paint();
    if (after > before) { wr(RANK_KEY, after); window.setTimeout(() => levelUp(after), 900); }
  };
  app.rangoPintar = paint;

  // al arrancar: poner la imagen del rango (sin celebración) y recordar el rango visto
  paint(); const seen = rd(RANK_KEY); if (typeof seen !== 'number') wr(RANK_KEY, rankIndex(total));
  // al volver a la Academia se refresca el cartel
  const back = app.goToAcademyMenu && app.goToAcademyMenu.bind(app);
  if (back) app.goToAcademyMenu = function () { const r = back.apply(app, arguments); paint(); return r; };
})();
