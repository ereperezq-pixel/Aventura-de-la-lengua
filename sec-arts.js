/* Arts: Colorea tus premios. Cada premio ganado de la Galería se puede guardar como imagen y se acompaña de un texto
   listo para pegar en Grok, que lo convierte en un dibujo para colorear por números. El dibujo resultante se sube a la carpeta
   arts/ con el nombre del premio (p. ej. arts/dragon-obrero.png) y la app lo muestra y lo imprime en A4.
   Lee window.NUBLO_COLLECTIONS, así que los premios nuevos aparecen solos. */
(function () {
  const $ = id => document.getElementById(id);
  registrarSeccion({
    antes: '.academy-card[onclick*="openChickGallery"]',
    tarjeta: `      <div class="academy-card arts-entry" onclick="app.openArts()">
        <div class="academy-icon">🎨</div><div><div class="dr-eyebrow le-eyebrow">Arts</div><h3>Colorea tus premios</h3><p>Convierte tus premios en dibujos con números para imprimir y colorear.</p></div>
      </div>`,
    pantallas: `    <!-- ===== ARTS: COLOREA TUS PREMIOS ===== -->
    <div id="screen-arts-menu" class="hidden">
      <button class="back-academy" onclick="app.goToAcademyMenu()">🦉 Volver a la Academia del Búho</button>
      <div class="dr-eyebrow le-eyebrow">Arts</div>
      <h1 style="font-size:1.7rem;margin:2px 0 4px;color:#4338CA;">🎨 Colorea tus premios</h1>
      <p style="color:#64748B;font-size:.95rem;margin-bottom:6px;">Elige un premio que hayas ganado.</p>
      <div id="arts-grid"></div>
    </div>
    <div id="screen-arts-view" class="hidden">
      <div style="display:flex;justify-content:flex-start;margin-bottom:6px;"><button class="btn btn-back" onclick="app.openArts()">⬅️ Mis premios</button></div>
      <h1 id="arts-title" style="font-size:1.45rem;margin:4px 0 8px;color:#4338CA;"></h1>
      <div class="arts-prize"><img id="arts-prize-img" alt=""></div>
      <div id="arts-have" class="hidden">
        <div id="arts-sheet" class="arts-sheet"></div>
        <button class="btn btn-primary arts-btn" onclick="app.artsPrint()">🖨️ Imprimir (A4)</button>
        <button class="btn btn-primary arts-btn" onclick="app.artsSavePng()">📥 Guardar como imagen</button>
        <button id="arts-done-btn" class="btn btn-back arts-btn" onclick="app.artsToggleDone()"></button>
      </div>
      <div class="arts-grok">
        <b id="arts-grok-title">✨ Crea el dibujo con Grok</b>
        <p id="arts-nodraw">Este premio aún no tiene dibujo para colorear. 1. Guarda la imagen del premio. 2. Copia el texto. 3. En Grok, adjunta la imagen y pega el texto. 4. Guarda lo que te devuelva y súbelo al repositorio, en la carpeta <i>arts</i>, con el nombre <b id="arts-grok-file"></b></p>
        <button class="btn btn-primary arts-btn" onclick="app.artsGrokImage()">🖼️ Guardar imagen del premio</button>
        <button id="arts-grok-copy" class="btn btn-primary arts-btn" onclick="app.artsGrokCopy()">📋 Copiar texto para Grok</button>
        <textarea id="arts-grok-text" class="arts-grok-text" readonly rows="12"></textarea>
      </div>
    </div>`
  });
  const KEY = 'owl_academy_arts_v1';
  const FONT = 'Arial, Helvetica, sans-serif';
  const esc = t => String(t).replace(/[&<>]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[m]));
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || { done: {} }; } catch (e) { return { done: {} }; } };
  const save = d => { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {} };
  let cur = null, token = 0;
  const hideAll = () => {
    document.querySelectorAll('[id^="screen-"]').forEach(el => el.classList.add('hidden'));
    document.body.classList.remove('santa-theme', 'letter-theme', 'chick-theme', 'dragon-theme');
    window.scrollTo({ top: 0 });
  };
  // ---------- dibujo propio: si existe arts/<nombre-del-premio>.png (o .jpg), se usa en lugar de la conversión automática ----------
  const slug = s => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const miss = new Set();
  function customSvg(im, title) {
    const S = Math.min(1, 1600 / Math.max(im.naturalWidth, im.naturalHeight)), cw = Math.max(1, Math.round(im.naturalWidth * S)), ch = Math.max(1, Math.round(im.naturalHeight * S));
    const cv = document.createElement('canvas'); cv.width = cw; cv.height = ch; const cx = cv.getContext('2d', { willReadFrequently: true });
    cx.fillStyle = '#fff'; cx.fillRect(0, 0, cw, ch); cx.drawImage(im, 0, 0, cw, ch);
    const d = cx.getImageData(0, 0, cw, ch).data, col = new Int32Array(cw), row = new Int32Array(ch);
    for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) { const i = (y * cw + x) * 4; if (d[i] * 0.3 + d[i + 1] * 0.59 + d[i + 2] * 0.11 < 215) { col[x]++; row[y]++; } }
    let x0 = 0, x1 = cw - 1, y0 = 0, y1 = ch - 1;
    while (x0 < cw - 1 && col[x0] < 4) x0++; while (x1 > x0 && col[x1] < 4) x1--; while (y0 < ch - 1 && row[y0] < 4) y0++; while (y1 > y0 && row[y1] < 4) y1--;
    const m = Math.round(0.02 * Math.max(x1 - x0, y1 - y0)); x0 = Math.max(0, x0 - m); y0 = Math.max(0, y0 - m); x1 = Math.min(cw - 1, x1 + m); y1 = Math.min(ch - 1, y1 + m);
    const bw = x1 - x0 + 1, bh = y1 - y0 + 1, out = document.createElement('canvas'); out.width = bw; out.height = bh;
    const oc = out.getContext('2d'); oc.fillStyle = '#fff'; oc.fillRect(0, 0, bw, bh); oc.drawImage(cv, x0, y0, bw, bh, 0, 0, bw, bh);
    { const id = oc.getImageData(0, 0, bw, bh), q = id.data; for (let i = 0; i < q.length; i += 4) { if (q[i] * 0.3 + q[i + 1] * 0.59 + q[i + 2] * 0.11 > 226) { q[i] = q[i + 1] = q[i + 2] = 255; } } oc.putImageData(id, 0, 0); }   // fondo gris/ruido -> blanco
    const sc = Math.min(880 / bw, 1180 / bh), w2 = bw * sc, h2 = bh * sc;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1414" width="1000" height="1414" preserveAspectRatio="xMidYMid meet"><rect width="1000" height="1414" fill="#fff"/>` +
      `<text x="500" y="78" font-size="56" text-anchor="middle" font-family="${FONT}" font-weight="700" fill="#4338CA">${esc(title)}</text>` +
      `<image href="${out.toDataURL('image/jpeg', 0.92)}" x="${(500 - w2 / 2).toFixed(1)}" y="${(140 + (1180 - h2) / 2).toFixed(1)}" width="${w2.toFixed(1)}" height="${h2.toFixed(1)}" preserveAspectRatio="xMidYMid meet"/>` +
      `<text x="60" y="1375" font-size="28" font-family="${FONT}" fill="#334155">Nombre: ____________________________</text>` +
      `<text x="940" y="1375" font-size="22" text-anchor="end" font-family="${FONT}" fill="#94A3B8">El Mundo de Nublo · Arts v11</text></svg>`;
    return { custom: true, svg, zones: 0, used: [] };
  }
  function loadCustom(name, done) {
    const sl = slug(name), exts = ['png', 'jpg'];
    if (miss.has(sl)) return done(null);
    const next = k => {
      if (k >= exts.length) { miss.add(sl); return done(null); }
      const im = new Image(); im.onload = () => { let r = null; try { r = customSvg(im, name); } catch (e) {} done(r); }; im.onerror = () => next(k + 1); im.src = 'arts/' + sl + '.' + exts[k];
    };
    next(0);
  }

  // ---------- ayuda para hacer el dibujo con Grok ----------
  const grokText = name => [
    'TAREA: convierte la imagen adjunta (' + name + ') en una página de "colorear por números" en blanco y negro, lista para imprimir en una hoja A4 vertical. Es un calco FIEL de la imagen, no una reinterpretación.',
    '',
    'REGLA PRINCIPAL: NO INVENTES NADA. El dibujo debe ser IGUAL que la imagen adjunta. No añadas, quites, cambies ni "mejores" ningún elemento. No cambies la forma, la postura, las proporciones, la expresión ni la cara. Si dudas, copia exactamente lo que ves en la imagen.',
    '',
    'CÓMO HACERLO:',
    '1. Antes de dibujar, analiza la imagen y haz una lista mental de TODOS sus elementos (cabeza, cuerpo, alas o brazos, patas o pies, cola, ojos, pico u hocico, boca, ropa, capa, casco, herramientas, accesorios, símbolos, letras y detalles), con su forma, posición, tamaño y orientación exactos. Después dibuja exactamente esa lista, ni más ni menos.',
    '2. Mantén idéntico: la silueta completa, la postura y la inclinación del cuerpo, la posición y la forma de cada extremidad, la forma y el tamaño de los ojos (y hacia dónde miran), la forma del pico y de la boca (abierta o cerrada, igual que en la imagen), las cejas o antifaces, y cualquier símbolo o letra del pecho o del casco.',
    '3. No cambies el tamaño relativo de ninguna parte (por ejemplo, ojos más grandes, cabeza más grande, patas más largas). No cambies el número de dedos, plumas, púas o detalles.',
    '4. No añadas nada que no esté en la imagen: ni mejillas, ni sonrisas distintas, ni dientes, ni lengua, ni cejas, ni brillos, ni sombras, ni decoraciones, ni fondo, ni suelo, ni nubes, ni estrellas.',
    '5. Quita solo el fondo (círculo, cielo, color de fondo, marcos): dibuja únicamente el personaje, sobre fondo blanco liso. Quita también las sombras y los degradados.',
    '',
    'ESTILO DEL DIBUJO:',
    '- Solo líneas negras de grosor uniforme, limpias y continuas, sobre fondo blanco. SIN colores, SIN relleno, SIN grises, SIN sombreado. Todas las zonas deben quedar en blanco, listas para colorear.',
    '- Las zonas deben ser cerradas y bien separadas por líneas. Divide el dibujo en las zonas de color que se ven en la imagen original (por ejemplo: cuerpo, antifaz, capa, alas, pico, patas, ojos, símbolo del pecho). No inventes zonas nuevas ni unas dos zonas de color distinto.',
    '',
    'NÚMEROS:',
    '- Cada zona lleva UN solo número, en negro, bien legible, centrado dentro de la zona. Zonas muy grandes pueden llevar el número repetido una o dos veces, pero no pongas varios números juntos en una zona pequeña (una pata o un ojo llevan un único número).',
    '- Los números dentro de un ojo, un detalle pequeño o una zona oscura deben ser legibles (no se pueden solapar con otros números ni con las líneas).',
    '- El mismo color lleva siempre el mismo número en todo el dibujo.',
    '- Usa como máximo 9 colores. Elige los colores REALES de la imagen original (agrupa los tonos parecidos en uno solo: por ejemplo todos los amarillos, o todos los rojos, en un único color).',
    '',
    'LEYENDA:',
    '- Debajo del dibujo, completa y dentro de los márgenes de la hoja, pon la leyenda: un cuadradito de ese color + el número + el nombre del color en español (Amarillo, Rojo, Naranja, Blanco, Negro, Rosa, Verde, Azul, Marrón, Gris...). El cuadradito de la leyenda sí va coloreado con su color real; todo lo demás es blanco y negro.',
    '',
    'FORMATO: hoja A4 vertical, personaje centrado y lo más grande posible, con márgenes blancos, sin título, sin marcos y sin textos extra.',
    '',
    'COMPRUEBA ANTES DE ENTREGAR: el dibujo es idéntico a la imagen adjunta (misma cara, mismos ojos, mismo pico, misma postura, mismos accesorios), no hay ningún elemento nuevo, no hay colores en el dibujo (solo en la leyenda) y cada zona tiene su número. Si algo no coincide con la imagen original, corrígelo antes de entregar.'
  ].join('\n');
  function updateGrok() {
    const ta = $('arts-grok-text'); if (ta) ta.value = grokText(cur.name);
    const f = $('arts-grok-file'); if (f) f.textContent = slug(cur.name) + '.png';
  }
  app.artsGrokCopy = function () {
    const txt = grokText(cur.name), b = $('arts-grok-copy'), ok = () => { if (b) { const o = '📋 Copiar texto para Grok'; b.textContent = '✅ ¡Copiado!'; setTimeout(() => { b.textContent = o; }, 1800); } };
    const fallback = () => { const ta = $('arts-grok-text'); try { ta.removeAttribute('readonly'); ta.focus(); ta.select(); ta.setSelectionRange(0, 99999); document.execCommand('copy'); ta.setAttribute('readonly', ''); ok(); } catch (e) {} };
    try { if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(ok, fallback); else fallback(); } catch (e) { fallback(); }
  };
  app.artsGrokImage = function () {
    const im = new Image();
    im.onload = () => {
      const S = 900 / Math.max(im.naturalWidth || 150, im.naturalHeight || 150), w = Math.round((im.naturalWidth || 150) * S), h = Math.round((im.naturalHeight || 150) * S);
      const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, w, h); x.drawImage(im, 0, 0, w, h);
      c.toBlob(b => {
        if (!b) return; const file = new File([b], 'premio-' + slug(cur.name) + '.png', { type: 'image/png' });
        try { if (navigator.canShare && navigator.canShare({ files: [file] })) { navigator.share({ files: [file] }).catch(() => {}); return; } } catch (e) {}
        const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = file.name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 200);
      }, 'image/png');
    };
    im.src = cur.src;
  };
  const SKIP = [];
  const cols = () => Object.entries(window.NUBLO_COLLECTIONS || {}).filter(([id, c]) => !SKIP.includes(id) && c && c.items && c.have && c.have.length);
  function renderMenu() {
    const d = load(); let h = '', total = 0;
    cols().forEach(([id, c]) => {
      h += `<h2 class="arts-h2">${c.title}</h2><div class="arts-grid">`;
      [...new Set(c.have)].sort((a, b) => a - b).forEach(i => {
        total++; const nm = (c.names && c.names[i]) || 'Premio', ok = d.done[id + ':' + i];
        h += `<button class="arts-card${ok ? ' done' : ''}" onclick="app.artsOpen('${id}',${i})"><img src="${c.items[i]}" alt=""><span class="arts-name">${nm}</span>${ok ? '<span class="arts-badge">✅ Coloreado</span>' : ''}</button>`;
      });
      h += '</div>';
    });
    $('arts-grid').innerHTML = total ? h : '<div class="feedback-box" style="margin-top:12px;">🏅 Todavía no tienes premios para colorear. ¡Juega en las aventuras y gana premios para tu galería!</div>';
  }
  app.openArts = function () {
    hideAll(); $('screen-arts-menu').classList.remove('hidden'); renderMenu();
    app.currentSectionKey = null; if (app.updateSharedRewards) app.updateSharedRewards();
  };
  app.openArts = function () {
    hideAll(); $('screen-arts-menu').classList.remove('hidden'); renderMenu();
    app.currentSectionKey = null; if (app.updateSharedRewards) app.updateSharedRewards();
  };
  function refreshButtons() {
    const ok = load().done[cur.col + ':' + cur.i], b = $('arts-done-btn');
    b.textContent = ok ? '✅ ¡Ya lo he coloreado! (toca para quitar)' : '🎨 ¡Ya lo he coloreado!';
    b.classList.toggle('on', !!ok);
  }
  app.artsOpen = function (col, i) {
    const c = window.NUBLO_COLLECTIONS[col], my = ++token;
    cur = { col, i, src: c.items[i], name: (c.names && c.names[i]) || 'Mi premio', r: null };
    hideAll(); $('screen-arts-view').classList.remove('hidden'); $('arts-title').textContent = '🎨 ' + cur.name;
    $('arts-prize-img').src = cur.src; $('arts-have').classList.add('hidden'); $('arts-nodraw').classList.remove('hidden'); $('arts-grok-title').textContent = '✨ Crea el dibujo con Grok';
    updateGrok();
    loadCustom(cur.name, r => {
      if (my !== token || !r) return;
      cur.r = r; $('arts-sheet').innerHTML = r.svg; $('arts-have').classList.remove('hidden'); $('arts-nodraw').classList.add('hidden');
      $('arts-grok-title').textContent = '✨ ¿Quieres rehacer el dibujo con Grok?'; refreshButtons();
    });
  };
  app.artsToggleDone = function () {
    const d = load(), k = cur.col + ':' + cur.i; if (d.done[k]) delete d.done[k]; else d.done[k] = Date.now();
    save(d); refreshButtons();
    if (d.done[k] && window.confetti) { try { window.confetti({ particleCount: 90, spread: 70, origin: { y: 0.7 } }); } catch (e) {} }
  };
  const plain = () => cur.r.svg;
  // Imprimir (o guardar como PDF desde el diálogo de impresión del móvil)
  app.artsPreparePrint = function () {
    let el = $('arts-print'); if (!el) { el = document.createElement('div'); el.id = 'arts-print'; document.body.appendChild(el); }
    el.innerHTML = plain(); document.body.classList.add('arts-printing');
  };
  app.artsPrint = function () {
    if (!cur || !cur.r) return; app.artsPreparePrint();
    const end = () => document.body.classList.remove('arts-printing');
    window.addEventListener('afterprint', end, { once: true });
    setTimeout(() => { try { window.print(); } catch (e) { end(); } }, 80);
  };
  // Guardar como imagen PNG de tamaño A4
  app.artsSavePng = function () {
    if (!cur || !cur.r) return;
    const img = new Image(), url = URL.createObjectURL(new Blob([plain()], { type: 'image/svg+xml;charset=utf-8' }));
    img.onload = () => {
      const c = document.createElement('canvas'); c.width = 2100; c.height = 2970; c.getContext('2d').drawImage(img, 0, 0, 2100, 2970); URL.revokeObjectURL(url);
      c.toBlob(b => { const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = 'colorear-' + cur.col + '-' + cur.i + '.png'; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1500); }, 'image/png');
    };
    img.onerror = () => { URL.revokeObjectURL(url); alert('No se pudo crear la imagen. Prueba con «Imprimir».'); };
    img.src = url;
  };
  // al volver a la Academia se ocultan las pantallas de Arts
  const orig = app.goToAcademyMenu.bind(app);
  app.goToAcademyMenu = function () {
    ['screen-arts-menu', 'screen-arts-view'].forEach(id => { const e = $(id); if (e) e.classList.add('hidden'); });
    return orig.apply(app, arguments);
  };
})();
