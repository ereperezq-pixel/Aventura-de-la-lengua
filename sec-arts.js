/* Arts: Colorea tus premios. Convierte cualquier premio ganado de la Galería en un dibujo para colorear por números
   (A4 para imprimir). Lee las colecciones de window.NUBLO_COLLECTIONS, así que los premios nuevos aparecen solos. */
(function () {
  const $ = id => document.getElementById(id);
  // tarjeta en la Academia (delante de la Galería de premios) y pantallas de la sección
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
      <p style="color:#64748B;font-size:.95rem;margin-bottom:6px;">Elige un premio que hayas ganado: lo convertimos en un dibujo con números para imprimirlo y colorearlo con lápices.</p>
      <div id="arts-grid"></div>
    </div>
    <div id="screen-arts-view" class="hidden">
      <div style="display:flex;justify-content:flex-start;margin-bottom:6px;"><button class="btn btn-back" onclick="app.openArts()">⬅️ Mis premios</button></div>
      <h1 id="arts-title" style="font-size:1.45rem;margin:4px 0 8px;color:#4338CA;"></h1>
      <div class="arts-levels">
        <button id="arts-lv-1" class="arts-lv" onclick="app.artsLevel(1)">⭐ Fácil</button>
        <button id="arts-lv-2" class="arts-lv" onclick="app.artsLevel(2)">⭐⭐ Medio</button>
        <button id="arts-lv-3" class="arts-lv" onclick="app.artsLevel(3)">⭐⭐⭐ Difícil</button>
      </div>
      <div id="arts-sheet" class="arts-sheet"></div>
      <p id="arts-info" class="arts-tip" style="text-align:center;margin:0 0 8px;"></p>
      <button class="btn btn-primary arts-btn" onclick="app.artsPrint()">🖨️ Imprimir (A4)</button>
      <button class="btn btn-primary arts-btn" onclick="app.artsSavePng()">📥 Guardar como imagen</button>
      <button id="arts-sol-btn" class="btn btn-back arts-btn" onclick="app.artsToggleSolution()"></button>
      <button id="arts-done-btn" class="btn btn-back arts-btn" onclick="app.artsToggleDone()"></button>
      <div class="arts-grok">
        <b>✨ Hazlo con Grok (dibujo más bonito)</b>
        <p>1. Guarda la imagen del premio. 2. Copia el texto. 3. En Grok, adjunta la imagen y pega el texto. 4. Guarda lo que te devuelva y súbelo al repositorio en la carpeta <i>arts</i> con el nombre <b id="arts-grok-file"></b></p>
        <button class="btn btn-primary arts-btn" onclick="app.artsGrokImage()">🖼️ Guardar imagen del premio</button>
        <button id="arts-grok-copy" class="btn btn-primary arts-btn" onclick="app.artsGrokCopy()">📋 Copiar texto para Grok</button>
        <textarea id="arts-grok-text" class="arts-grok-text" readonly rows="12"></textarea>
      </div>
      <p class="arts-tip">💡 Colorea cada zona con el color de su número. Las zonas sin número se dejan en blanco. Cuanto más difícil, más zonas pequeñas.</p>
    </div>`
  });
  const KEY = 'owl_academy_arts_v1';

  // Lápices: el número de cada color es siempre el mismo.
  const PAL = [null, ['Amarillo', '#FACC15'], ['Naranja', '#FB923C'], ['Rojo', '#EF4444'], ['Rosa', '#F472B6'], ['Morado', '#A855F7'],
    ['Azul', '#3B82F6'], ['Celeste', '#38BDF8'], ['Verde', '#22C55E'], ['Marrón', '#A16207'], ['Gris', '#9CA3AF'], ['Negro', '#1F2937'],
    ['Verde claro', '#86EFAC'], ['Verde oscuro', '#15803D'], ['Azul oscuro', '#1E40AF'], ['Beige', '#FDE0B6']];
  // Niveles: W = casillas del lado largo, n = número aproximado de trozos
  const LEVELS = { 1: { name: 'Fácil', W: 110, n: 20 }, 2: { name: 'Medio', W: 150, n: 40 }, 3: { name: 'Difícil', W: 200, n: 60 } };

  // ---------- color ----------
  const hex = h => [1, 3, 5].map(i => parseInt(h.substr(i, 2), 16));
  function lab(r, g, b) {
    const f = c => { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
    const R = f(r), G = f(g), B = f(b);
    const X = (R * 0.4124 + G * 0.3576 + B * 0.1805) / 0.95047, Y = R * 0.2126 + G * 0.7152 + B * 0.0722, Z = (R * 0.0193 + G * 0.1192 + B * 0.9505) / 1.08883;
    const h = t => t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116;
    const fx = h(X), fy = h(Y), fz = h(Z);
    return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)];
  }
  const PLAB = PAL.map(p => p ? lab.apply(null, hex(p[1])) : null);
  const d2 = (a, b) => (a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1]) + (a[2] - b[2]) * (a[2] - b[2]);
  function nearest(l, allowed) { let best = 0, bd = 1e9; for (const k of allowed) { const d = d2(l, PLAB[k]); if (d < bd) { bd = d; best = k; } } return best; }

  // k-means sencillo (determinista) sobre colores Lab: devuelve K centros
  function kmeans(pts, K) {
    let seed = 12345; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const N = pts.length, cen = [pts[Math.floor(rnd() * N)].slice()], step = Math.max(1, Math.floor(N / 3000));
    while (cen.length < Math.min(K, N)) {                    // k-means++ sobre una muestra
      let tot = 0; const ds = [];
      for (let i = 0; i < N; i += step) { let m = 1e9; for (const c of cen) { const d = d2(pts[i], c); if (d < m) m = d; } ds.push([i, m]); tot += m; }
      if (tot <= 0) break; let r = rnd() * tot, pick = ds[ds.length - 1][0];
      for (const [i, m] of ds) { r -= m; if (r <= 0) { pick = i; break; } }
      cen.push(pts[pick].slice());
    }
    const as = new Int16Array(N);
    for (let it = 0; it < 8; it++) {
      const sum = cen.map(() => [0, 0, 0, 0]);
      for (let i = 0; i < N; i++) { let b = 0, bd = 1e9; for (let k = 0; k < cen.length; k++) { const d = d2(pts[i], cen[k]); if (d < bd) { bd = d; b = k; } } as[i] = b; const s = sum[b]; s[0] += pts[i][0]; s[1] += pts[i][1]; s[2] += pts[i][2]; s[3]++; }
      cen.forEach((c, k) => { if (sum[k][3]) { c[0] = sum[k][0] / sum[k][3]; c[1] = sum[k][1] / sum[k][3]; c[2] = sum[k][2] / sum[k][3]; } });
    }
    return cen;
  }
  const PL = c => c ? PLAB[c] : [100, 0, 0];

  // ---------- conversión de la imagen en zonas ----------
  function components(L, w, h) {
    const n = w * h, id = new Int32Array(n).fill(-1), st = new Int32Array(n), regs = [];
    for (let s = 0; s < n; s++) {
      if (id[s] >= 0) continue;
      const c = L[s], rid = regs.length; let sp = 0, cnt = 0; st[sp++] = s; id[s] = rid;
      while (sp) {
        const p = st[--sp]; cnt++; const x = p % w;
        if (x > 0 && id[p - 1] < 0 && L[p - 1] === c) { id[p - 1] = rid; st[sp++] = p - 1; }
        if (x < w - 1 && id[p + 1] < 0 && L[p + 1] === c) { id[p + 1] = rid; st[sp++] = p + 1; }
        if (p >= w && id[p - w] < 0 && L[p - w] === c) { id[p - w] = rid; st[sp++] = p - w; }
        if (p < n - w && id[p + w] < 0 && L[p + w] === c) { id[p + w] = rid; st[sp++] = p + w; }
      }
      regs.push({ c, n: cnt, best: s, bd: -1 });
    }
    return { id, regs };
  }
  // distancia (en tercios de casilla) de cada casilla al borde de su zona
  function distance(id, w, h) {
    const n = w * h, d = new Int32Array(n), INF = 1e7;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const p = y * w + x, a = id[p];
      d[p] = (x === 0 || y === 0 || x === w - 1 || y === h - 1 || id[p - 1] !== a || id[p + 1] !== a || id[p - w] !== a || id[p + w] !== a) ? 0 : INF;
    }
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const p = y * w + x; let v = d[p]; if (!v) continue;
      if (x > 0) v = Math.min(v, d[p - 1] + 3);
      if (y > 0) { v = Math.min(v, d[p - w] + 3); if (x > 0) v = Math.min(v, d[p - w - 1] + 4); if (x < w - 1) v = Math.min(v, d[p - w + 1] + 4); }
      d[p] = v;
    }
    for (let y = h - 1; y >= 0; y--) for (let x = w - 1; x >= 0; x--) {
      const p = y * w + x; let v = d[p]; if (!v) continue;
      if (x < w - 1) v = Math.min(v, d[p + 1] + 3);
      if (y < h - 1) { v = Math.min(v, d[p + w] + 3); if (x < w - 1) v = Math.min(v, d[p + w + 1] + 4); if (x > 0) v = Math.min(v, d[p + w - 1] + 4); }
      d[p] = v;
    }
    return d;
  }
  // suaviza bordes: cada casilla toma el color más frecuente de su entorno 3x3
  function smooth(L, w, h) {
    const o = new Uint8Array(L.length), cnt = new Uint8Array(16);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      cnt.fill(0);
      for (let j = -1; j <= 1; j++) for (let i = -1; i <= 1; i++) { const xx = x + i, yy = y + j; if (xx >= 0 && yy >= 0 && xx < w && yy < h) cnt[L[yy * w + xx]]++; }
      let b = L[y * w + x], bc = cnt[b]; for (let k = 0; k < 16; k++) if (cnt[k] > bc) { bc = cnt[k]; b = k; }
      o[y * w + x] = b;
    }
    return o;
  }

  // casillas de fondo conectadas al borde (o a las semillas que se indiquen)
  function flood(bg, w, h, seed) {
    const n = w * h, m = new Uint8Array(n), st = new Int32Array(n); let sp = 0;
    for (let p = 0; p < n; p++) if (bg[p] && seed(p)) { m[p] = 1; st[sp++] = p; }
    while (sp) {
      const p = st[--sp], x = p % w;
      if (x > 0 && bg[p - 1] && !m[p - 1]) { m[p - 1] = 1; st[sp++] = p - 1; }
      if (x < w - 1 && bg[p + 1] && !m[p + 1]) { m[p + 1] = 1; st[sp++] = p + 1; }
      if (p >= w && bg[p - w] && !m[p - w]) { m[p - w] = 1; st[sp++] = p - w; }
      if (p < n - w && bg[p + w] && !m[p + w]) { m[p + w] = 1; st[sp++] = p + w; }
    }
    return m;
  }

  function convert(img, lv) {
    const cfg = LEVELS[lv];
    // se dibuja el premio entero en un lienzo de tamaño conocido (las imágenes vectoriales no admiten bien recortes directos)
    const nw = img.naturalWidth || img.width || 150, nh = img.naturalHeight || img.height || 150, vec = /^data:image\/svg/.test(img.src);
    const bs = (vec ? 600 : Math.min(1000, Math.max(nw, nh))) / Math.max(nw, nh);
    const base = document.createElement('canvas'); base.width = Math.max(1, Math.round(nw * bs)); base.height = Math.max(1, Math.round(nh * bs));
    base.getContext('2d').drawImage(img, 0, 0, base.width, base.height);
    const iw = base.width, ih = base.height;
    const grab = (sx, sy, sw, sh, w, h) => {
      const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
      const c = cv.getContext('2d', { willReadFrequently: true }); c.imageSmoothingQuality = 'medium'; c.drawImage(base, sx, sy, sw, sh, 0, 0, w, h);
      return c.getImageData(0, 0, w, h).data;
    };
    // 1) análisis rápido: colores del fondo (los del borde) y recuadro donde está el dibujo
    const as = 100 / Math.max(iw, ih), aw = Math.max(8, Math.round(iw * as)), ah = Math.max(8, Math.round(ih * as));
    const ap = grab(0, 0, iw, ih, aw, ah), reps = [], bk = new Map(); let nb = 0;
    const isEdge = p => { const x = p % aw, y = (p / aw) | 0; return x < 2 || y < 2 || x >= aw - 2 || y >= ah - 2; };
    const clear = p => ap[p * 4 + 3] < 128;
    // borde del dibujo: el de la imagen, o el que linda con una zona transparente (p. ej. un premio redondo con esquinas vacías)
    const rim = p => isEdge(p) || clear(p - 1) || clear(p + 1) || clear(p - aw) || clear(p + aw);
    for (let p = 0; p < aw * ah; p++) {
      if (!rim(p) || clear(p)) continue;
      const l = lab(ap[p * 4], ap[p * 4 + 1], ap[p * 4 + 2]), k = Math.round(l[0] / 10) + ',' + Math.round(l[1] / 8) + ',' + Math.round(l[2] / 8);
      const e = bk.get(k) || { n: 0, s: [0, 0, 0] }; e.n++; e.s[0] += l[0]; e.s[1] += l[1]; e.s[2] += l[2]; bk.set(k, e); nb++;
    }
    [...bk.values()].filter(e => e.n > nb * 0.06).sort((a, b) => b.n - a.n).slice(0, 3).forEach(e => reps.push([e.s[0] / e.n, e.s[1] / e.n, e.s[2] / e.n]));
    const isBg = (d, i) => {
      if (d[i + 3] < 128) return 1;
      const l = lab(d[i], d[i + 1], d[i + 2]);
      if (l[0] > 82 && Math.hypot(l[1], l[2]) < 10) return 1;
      for (const r of reps) if (d2(l, r) < 900) return 1;
      return 0;
    };
    const bgA = new Uint8Array(aw * ah); for (let p = 0; p < aw * ah; p++) bgA[p] = isBg(ap, p * 4);
    let mA = flood(bgA, aw, ah, isEdge);
    // si al quitar el fondo casi no queda dibujo (fondo del mismo color que el personaje), no se usa el color del fondo
    let fg = 0, solid = 0; for (let p = 0; p < aw * ah; p++) { if (!clear(p)) solid++; if (!mA[p]) fg++; }
    if (reps.length && fg < 0.2 * solid) { reps.length = 0; for (let p = 0; p < aw * ah; p++) bgA[p] = isBg(ap, p * 4); mA = flood(bgA, aw, ah, isEdge); }
    let x0 = aw, y0 = ah, x1 = -1, y1 = -1;
    for (let p = 0; p < aw * ah; p++) if (!mA[p]) { const x = p % aw, y = (p / aw) | 0; if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    let sx = 0, sy = 0, sw = iw, sh = ih;
    if (x1 >= x0 && (x1 - x0 + 1) * (y1 - y0 + 1) > 25) {          // recortar al dibujo (con un margen)
      const pad = 0.04 * Math.max(x1 - x0 + 1, y1 - y0 + 1);
      const ax0 = Math.max(0, x0 - pad), ay0 = Math.max(0, y0 - pad), ax1 = Math.min(aw, x1 + 1 + pad), ay1 = Math.min(ah, y1 + 1 + pad);
      sx = ax0 / aw * iw; sy = ay0 / ah * ih; sw = (ax1 - ax0) / aw * iw; sh = (ay1 - ay0) / ah * ih;
    }
    // 2) la imagen recortada, a la resolución del nivel
    const sc = cfg.W / Math.max(sw, sh), w = Math.max(8, Math.round(sw * sc)), h = Math.max(8, Math.round(sh * sc)), n = w * h;
    const px = grab(sx, sy, sw, sh, w, h), bgF = new Uint8Array(n);
    for (let p = 0; p < n; p++) bgF[p] = isBg(px, p * 4);
    const mF = flood(bgF, w, h, p => {
      const x = p % w, y = (p / w) | 0;
      if (x < 1 || y < 1 || x >= w - 1 || y >= h - 1) return true;
      const ax = Math.min(aw - 1, Math.floor((sx + (x + 0.5) / w * sw) / iw * aw)), ay = Math.min(ah - 1, Math.floor((sy + (y + 0.5) / h * sh) / ih * ah));
      return !!mA[ay * aw + ax];
    });
    const ALL = []; for (let k = 1; k < PAL.length; k++) ALL.push(k);
    // 3) el dibujo sin color se parte en N trozos parecidos (semillas por k-means de posiciones + reparto por cercanía dentro de la figura)
    const fgI = []; for (let i = 0; i < n; i++) if (!mF[i] && px[i * 4 + 3] >= 128) fgI.push(i);
    // se quitan las manchitas sueltas (islas muy pequeñas separadas de la figura)
    { const cm = new Int32Array(n).fill(-1), comps = []; const st = [];
      for (const s0 of fgI) { if (cm[s0] >= 0) continue; const id = comps.length, mem = []; st.length = 0; st.push(s0); cm[s0] = id;
        while (st.length) { const p = st.pop(); mem.push(p); const x = p % w;
          const nb = [x > 0 ? p - 1 : -1, x < w - 1 ? p + 1 : -1, p >= w ? p - w : -1, p < n - w ? p + w : -1];
          for (const q of nb) if (q >= 0 && cm[q] < 0 && !mF[q] && px[q * 4 + 3] >= 128) { cm[q] = id; st.push(q); } }
        comps.push(mem); }
      const big = Math.max(...comps.map(c => c.length)), keep = new Set(); comps.forEach(c => { if (c.length >= 0.04 * big) c.forEach(p => keep.add(p)); });
      for (let k = fgI.length - 1; k >= 0; k--) if (!keep.has(fgI[k])) fgI.splice(k, 1); }
    let NP2 = 0; const NP = Math.max(1, Math.min(cfg.n, fgI.length >> 3));
    const sxs = new Float32Array(NP), sys = new Float32Array(NP);
    { let first = fgI[0]; sxs[0] = first % w; sys[0] = (first / w) | 0;
      const md = new Float32Array(fgI.length).fill(1e9);
      for (let k = 1; k < NP; k++) {
        let bi = 0, bv = -1;
        for (let j = 0; j < fgI.length; j++) { const x = fgI[j] % w, y = (fgI[j] / w) | 0, dd = (x - sxs[k - 1]) ** 2 + (y - sys[k - 1]) ** 2; if (dd < md[j]) md[j] = dd; if (md[j] > bv) { bv = md[j]; bi = j; } }
        sxs[k] = fgI[bi] % w; sys[k] = (fgI[bi] / w) | 0;
      }
      for (let it = 0; it < 12; it++) {
        const ax = new Float32Array(NP), ay = new Float32Array(NP), ac = new Float32Array(NP);
        for (let j = 0; j < fgI.length; j++) { const x = fgI[j] % w, y = (fgI[j] / w) | 0; let b = 0, bd = 1e9; for (let k = 0; k < NP; k++) { const dd = (x - sxs[k]) ** 2 + (y - sys[k]) ** 2; if (dd < bd) { bd = dd; b = k; } } ax[b] += x; ay[b] += y; ac[b]++; }
        for (let k = 0; k < NP; k++) if (ac[k]) { sxs[k] = ax[k] / ac[k]; sys[k] = ay[k] / ac[k]; }
      }
    }
    // reparto tipo "superpíxeles" (SLIC): los trozos son de tamaño parecido pero se pegan a los contornos y cambios de color del dibujo
    const cid = new Uint16Array(n), isFg = new Uint8Array(n), LB = new Float32Array(n * 3); fgI.forEach(i => { isFg[i] = 1; const l = lab(px[i * 4], px[i * 4 + 1], px[i * 4 + 2]); LB[i * 3] = l[0]; LB[i * 3 + 1] = l[1]; LB[i * 3 + 2] = l[2]; });
    { const S = Math.sqrt(fgI.length / NP), mw = (cfg.m || 16) / S, sl0 = new Float64Array(NP), sa0 = new Float64Array(NP), sb0 = new Float64Array(NP);
      const cx = Array.from(sxs), cy = Array.from(sys), cl = new Float64Array(NP), ca = new Float64Array(NP), cb = new Float64Array(NP);
      for (let k = 0; k < NP; k++) { let bi = fgI[0], bd = 1e9; for (const i of fgI) { const dd = ((i % w) - cx[k]) ** 2 + (((i / w) | 0) - cy[k]) ** 2; if (dd < bd) { bd = dd; bi = i; } } cx[k] = bi % w; cy[k] = (bi / w) | 0; cl[k] = LB[bi * 3]; ca[k] = LB[bi * 3 + 1]; cb[k] = LB[bi * 3 + 2]; }
      for (let it = 0; it < 10; it++) {
        const sx2 = new Float64Array(NP), sy2 = new Float64Array(NP), sL = new Float64Array(NP), sA = new Float64Array(NP), sB = new Float64Array(NP), sN = new Float64Array(NP);
        for (const i of fgI) {
          const x = i % w, y = (i / w) | 0; let b = 0, bd = 1e18;
          for (let k = 0; k < NP; k++) { const dx = x - cx[k], dy = y - cy[k]; if (dx * dx + dy * dy > 9 * S * S) continue; const dl = LB[i * 3] - cl[k], da = LB[i * 3 + 1] - ca[k], db = LB[i * 3 + 2] - cb[k], dd = dl * dl + da * da + db * db + mw * mw * (dx * dx + dy * dy); if (dd < bd) { bd = dd; b = k; } }
          if (bd >= 1e18) { for (let k = 0; k < NP; k++) { const dd = (x - cx[k]) ** 2 + (y - cy[k]) ** 2; if (dd < bd) { bd = dd; b = k; } } }
          cid[i] = b + 1; sx2[b] += x; sy2[b] += y; sL[b] += LB[i * 3]; sA[b] += LB[i * 3 + 1]; sB[b] += LB[i * 3 + 2]; sN[b]++;
        }
        for (let k = 0; k < NP; k++) if (sN[k]) { cx[k] = sx2[k] / sN[k]; cy[k] = sy2[k] / sN[k]; cl[k] = sL[k] / sN[k]; ca[k] = sA[k] / sN[k]; cb[k] = sB[k] / sN[k]; }
      }
    }
    // cada trozo debe ser de una sola pieza: los fragmentos sueltos o diminutos se pegan al vecino con el que más borde comparten
    for (let round = 0; round < 6; round++) {
      const comp = new Int32Array(n).fill(-1), sizes = [], owner = [], st = [];
      for (const s0 of fgI) { if (comp[s0] >= 0) continue; const id = sizes.length; let cnt = 0; st.length = 0; st.push(s0); comp[s0] = id;
        while (st.length) { const p = st.pop(); cnt++; const x = p % w, c = cid[p];
          if (x > 0 && comp[p - 1] < 0 && cid[p - 1] === c) { comp[p - 1] = id; st.push(p - 1); } if (x < w - 1 && comp[p + 1] < 0 && cid[p + 1] === c) { comp[p + 1] = id; st.push(p + 1); }
          if (p >= w && comp[p - w] < 0 && cid[p - w] === c) { comp[p - w] = id; st.push(p - w); } if (p < n - w && comp[p + w] < 0 && cid[p + w] === c) { comp[p + w] = id; st.push(p + w); } }
        sizes.push(cnt); owner.push(cid[s0]); }
      const bigOf = new Map(); sizes.forEach((sz, i) => { const o = owner[i]; if (!bigOf.has(o) || sz > sizes[bigOf.get(o)]) bigOf.set(o, i); });
      const minSz = Math.max(4, 0.4 * fgI.length / NP), bad = []; sizes.forEach((sz, i) => { if (bigOf.get(owner[i]) !== i || sz < minSz) bad.push(i); });
      if (!bad.length) break;
      const badSet = new Set(bad), touch = bad.map(() => new Map()), bi2 = new Map(bad.map((b, j) => [b, j]));
      for (const p of fgI) { const a = comp[p]; if (!badSet.has(a)) continue; const j = bi2.get(a), x = p % w;
        const nb = [x > 0 ? p - 1 : -1, x < w - 1 ? p + 1 : -1, p >= w ? p - w : -1, p < n - w ? p + w : -1];
        for (const q of nb) if (q >= 0 && isFg[q] && comp[q] !== a) touch[j].set(comp[q], (touch[j].get(comp[q]) || 0) + 1); }
      const newOwner = new Map();
      bad.sort((p, q) => sizes[p] - sizes[q]);
      bad.forEach(a => { const j = bi2.get(a); let bc = -1, bv = 0; touch[j].forEach((v, c) => { if (v > bv && !(badSet.has(c) && sizes[c] <= sizes[a] && c !== a && false)) { bv = v; bc = c; } }); if (bc >= 0) newOwner.set(a, owner[bc]); });
      for (const p of fgI) { const a = comp[p]; if (newOwner.has(a)) cid[p] = newOwner.get(a); }
    }
    // trozos demasiado estrechos para escribir un número: se pegan al vecino con el que más borde comparten
    { const cellMm0 = Math.min(900 / w, 950 / h) * 0.21, rmin = 2.6 / cellMm0;
      for (let round = 0; round < 4; round++) {
        const dist = distance(cid, w, h), bd = new Map(), cnt = new Map();
        for (const i of fgI) { const c = cid[i]; cnt.set(c, (cnt.get(c) || 0) + 1); if (dist[i] > (bd.get(c) || 0)) bd.set(c, dist[i]); }
        const small = [...bd.keys()].filter(c => bd.get(c) / 3 + 0.5 < rmin);
        if (!small.length) break;
        const touch = new Map(); small.forEach(c => touch.set(c, new Map()));
        for (const p of fgI) { const c = cid[p]; if (!touch.has(c)) continue; const x = p % w;
          for (const q of [x > 0 ? p - 1 : -1, x < w - 1 ? p + 1 : -1, p >= w ? p - w : -1, p < n - w ? p + w : -1]) if (q >= 0 && isFg[q] && cid[q] !== c) { const tm = touch.get(c); tm.set(cid[q], (tm.get(cid[q]) || 0) + 1); } }
        const par = new Map(); const find = c => { while (par.has(c) && par.get(c) !== c) c = par.get(c); return c; };
        small.sort((p, q) => cnt.get(p) - cnt.get(q)).forEach(c => { let bc = -1, bv = 0; touch.get(c).forEach((v, k) => { if (v > bv) { bv = v; bc = k; } }); if (bc >= 0 && find(bc) !== c) par.set(c, find(bc)); });
        for (const i of fgI) cid[i] = find(cid[i]);
      } }
    // numeración consecutiva de los trozos
    { const mp = new Map(); for (const i of fgI) { if (!mp.has(cid[i])) mp.set(cid[i], mp.size + 1); cid[i] = mp.get(cid[i]); } NP2 = mp.size; }
    // color de cada trozo: el medio de la imagen original bajo él -> lápiz más parecido
    const sl = new Float64Array(NP + 1), sa = new Float64Array(NP + 1), sb = new Float64Array(NP + 1), sn = new Float64Array(NP + 1);
    for (const i of fgI) { const c = cid[i]; if (!c) continue; const l = lab(px[i * 4], px[i * 4 + 1], px[i * 4 + 2]); sl[c] += l[0]; sa[c] += l[1]; sb[c] += l[2]; sn[c]++; }
    const pen = new Uint8Array(NP + 1);
    for (let c = 1; c <= NP; c++) pen[c] = sn[c] ? nearest([sl[c] / sn[c], sa[c] / sn[c], sb[c] / sn[c]], ALL) : 1;
    const s = Math.min(900 / w, 950 / h), cellMm = s * 0.21;
    const dist = distance(cid, w, h), best = new Int32Array(NP + 1).fill(-1), bdv = new Int32Array(NP + 1).fill(-1);
    for (const i of fgI) { const c = cid[i]; if (c && dist[i] > bdv[c]) { bdv[c] = dist[i]; best[c] = i; } }
    const used = new Set(), labels = [], capCells = 7 / cellMm;
    for (let c = 1; c <= NP; c++) {
      if (best[c] < 0) continue; used.add(pen[c]);
      const rad = bdv[c] / 3 + 0.5, fs = Math.max(2, Math.min(rad * 1.5, capCells)) / (pen[c] > 9 ? 1.3 : 1);
      labels.push([(best[c] % w) + 0.5, Math.floor(best[c] / w) + 0.5, Math.round(fs * 10) / 10, pen[c]]);
    }
    // malla fina: bordes suaves (cada casilla se divide F x F; luego moda para redondear)
    const F = Math.max(3, Math.min(6, Math.ceil(cellMm / 0.4))), fw = w * F, fh = h * F, FID = new Uint16Array(fw * fh);
    for (let fy = 0; fy < fh; fy++) { const yy = Math.min(h - 1, (fy / F) | 0); for (let fx = 0; fx < fw; fx++) FID[fy * fw + fx] = cid[yy * w + Math.min(w - 1, (fx / F) | 0)]; }
    { let A = FID, B = new Uint16Array(fw * fh); const cnt = new Uint16Array(NP + 1), R = Math.max(2, Math.round(F * 0.8));
      for (let pass = 0; pass < 2; pass++) {
        for (let y = 0; y < fh; y++) for (let x = 0; x < fw; x++) {
          const y0 = Math.max(0, y - R), y1 = Math.min(fh - 1, y + R), x0 = Math.max(0, x - R), x1 = Math.min(fw - 1, x + R), seen = [];
          for (let yy = y0; yy <= y1; yy++) { const o = yy * fw; for (let xx = x0; xx <= x1; xx++) { const v = A[o + xx]; if (!cnt[v]) seen.push(v); cnt[v]++; } }
          let bi = A[y * fw + x], bc = cnt[bi]; for (const v of seen) { if (cnt[v] > bc) { bc = cnt[v]; bi = v; } cnt[v] = 0; }
          B[y * fw + x] = bi;
        }
        const tmp = A; A = B; B = tmp;
      }
      if (A !== FID) FID.set(A); }
    const FL = new Uint8Array(fw * fh); for (let i = 0; i < fw * fh; i++) FL[i] = pen[FID[i]];
    let d = '';
    for (let y = 1; y < fh; y++) { let x = 0; while (x < fw) { if (FID[y * fw + x] !== FID[(y - 1) * fw + x]) { let e = x; while (e < fw && FID[y * fw + e] !== FID[(y - 1) * fw + e]) e++; d += `M${x} ${y}h${e - x}`; x = e; } else x++; } }
    for (let x = 1; x < fw; x++) { let y = 0; while (y < fh) { if (FID[y * fw + x] !== FID[y * fw + x - 1]) { let e = y; while (e < fh && FID[e * fw + x] !== FID[e * fw + x - 1]) e++; d += `M${x} ${y}v${e - y}`; y = e; } else y++; } }
    // vista previa coloreada
    const pv = document.createElement('canvas'); pv.width = fw; pv.height = fh; const pc = pv.getContext('2d'), im = pc.createImageData(fw, fh);
    for (let i = 0; i < fw * fh; i++) { const c = FL[i] ? hex(PAL[FL[i]][1]) : [255, 255, 255]; im.data[i * 4] = c[0]; im.data[i * 4 + 1] = c[1]; im.data[i * 4 + 2] = c[2]; im.data[i * 4 + 3] = 255; }
    pc.putImageData(im, 0, 0);
    return { F, w, h, s, cellMm, d, labels, used: [...used].sort((a, b) => a - b), zones: labels.length, preview: pv.toDataURL('image/png') };
  }

  // ---------- hoja A4 (proporción 1000 x 1414) ----------
  const FONT = 'Arial, Helvetica, sans-serif';
  const esc = t => String(t).replace(/[&<>]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[m]));
  function pageSvg(r, title, solution) {
    if (r.svg) return r.svg;
    const ox = 500 - r.w * r.s / 2, oy = 140 + (950 - r.h * r.s) / 2, sw = Math.round(Math.max(0.12, 0.35 / r.cellMm) * 100) / 100;
    let g = '';
    if (solution) g += `<image href="${r.preview}" x="0" y="0" width="${r.w}" height="${r.h}" preserveAspectRatio="none" style="image-rendering:pixelated"/>`;
    g += `<g transform="scale(${(1 / r.F).toFixed(4)})"><path d="${r.d}" fill="none" stroke="#222" stroke-width="${Math.round(sw * r.F * 100) / 100}" stroke-linecap="square"/></g>`;
    r.labels.forEach(l => { g += `<text x="${l[0]}" y="${l[1]}" font-size="${l[2]}" text-anchor="middle" dominant-baseline="central" font-family="${FONT}" font-weight="700" fill="#1f2937"${solution ? ` stroke="#fff" stroke-width="${Math.round(l[2] * 8) / 100}" paint-order="stroke"` : ''}>${l[3]}</text>`; });
    let leg = ''; const perRow = 4, cw = 240, x0 = 500 - (Math.min(r.used.length, perRow) * cw) / 2;
    r.used.forEach((c, i) => {
      const row = Math.floor(i / perRow), k = i % perRow, x = x0 + k * cw, y = 1112 + row * 76;
      leg += `<rect x="${x}" y="${y}" width="56" height="56" rx="10" fill="${PAL[c][1]}" stroke="#222" stroke-width="2.5"/>` +
        `<text x="${x + 28}" y="${y + 29}" font-size="${c > 9 ? 28 : 34}" text-anchor="middle" dominant-baseline="central" font-family="${FONT}" font-weight="700" fill="#111" stroke="#fff" stroke-width="4" paint-order="stroke">${c}</text>` +
        `<text x="${x + 64}" y="${y + 29}" font-size="24" dominant-baseline="central" font-family="${FONT}" fill="#222">${PAL[c][0]}</text>`;
    });
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1414" width="1000" height="1414" preserveAspectRatio="xMidYMid meet">` +
      `<rect width="1000" height="1414" fill="#fff"/>` +
      `<text x="500" y="78" font-size="56" text-anchor="middle" font-family="${FONT}" font-weight="700" fill="#4338CA">${esc(title)}</text>` +
      `<text x="500" y="122" font-size="24" text-anchor="middle" font-family="${FONT}" fill="#475569">Colorea cada zona con el color de su número. Sin número: en blanco.</text>` +
      `<g transform="translate(${ox.toFixed(1)} ${oy.toFixed(1)}) scale(${r.s.toFixed(4)})">${g}</g>${leg}` +
      `<text x="60" y="1375" font-size="28" font-family="${FONT}" fill="#334155">Nombre: ____________________________</text>` +
      `<text x="940" y="1375" font-size="22" text-anchor="end" font-family="${FONT}" fill="#94A3B8">El Mundo de Nublo · Arts v10</text></svg>`;
  }

  // ---------- progreso ----------
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || { done: {} }; } catch (e) { return { done: {} }; } };
  const save = d => { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {} };

  // ---------- pantallas ----------
  let cur = null, level = 1, showSolution = false, token = 0; const cache = new Map();
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
      `<text x="940" y="1375" font-size="22" text-anchor="end" font-family="${FONT}" fill="#94A3B8">El Mundo de Nublo · Arts v10</text></svg>`;
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
  // (los Papá Noel tienen el fondo del mismo color que el traje y no se convierten bien: se dejan fuera)
  const SKIP = ['santa'];
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
  function refreshButtons() {
    [1, 2, 3].forEach(k => $('arts-lv-' + k).classList.toggle('on', k === level));
    const ok = load().done[cur.col + ':' + cur.i];
    $('arts-sol-btn').textContent = showSolution ? '🙈 Ocultar cómo queda' : '👀 Ver cómo queda coloreado';
    $('arts-done-btn').textContent = ok ? '✅ ¡Ya lo he coloreado! (toca para quitar)' : '🎨 ¡Ya lo he coloreado!';
    $('arts-done-btn').classList.toggle('on', !!ok);
  }
  function render() {
    const my = ++token, key = cur.col + ':' + cur.i + ':' + level;
    refreshButtons();
    const show = r => { if (my !== token) return; cur.r = r; $('arts-sheet').innerHTML = pageSvg(r, cur.name, showSolution); $('arts-info').textContent = r.custom ? '✨ Dibujo especial' : r.zones + ' zonas · ' + r.used.length + ' colores'; };
    if (cache.has(key)) return show(cache.get(key));
    $('arts-sheet').innerHTML = '<p class="arts-wait">⏳ Preparando tu dibujo…</p>'; $('arts-info').textContent = ''; cur.r = null;
    loadCustom(cur.name, rc => { if (my !== token) return; if (rc) { cache.set(key, rc); return show(rc); } auto(); });
    function auto() {
    const img = new Image();
    img.onload = () => setTimeout(() => {
      try { const r = convert(img, level); cache.set(key, r); show(r); }
      catch (e) { if (my === token) $('arts-sheet').innerHTML = '<p class="arts-wait">😕 No he podido preparar este dibujo.</p>'; }
    }, 30);
    img.onerror = () => { if (my === token) $('arts-sheet').innerHTML = '<p class="arts-wait">😕 No he podido abrir la imagen.</p>'; };
    img.src = cur.src;
    }
  }
  app.artsOpen = function (col, i) {
    const c = window.NUBLO_COLLECTIONS[col];
    cur = { col, i, src: c.items[i], name: (c.names && c.names[i]) || 'Mi premio' }; showSolution = false;
    hideAll(); $('screen-arts-view').classList.remove('hidden'); $('arts-title').textContent = '🎨 ' + cur.name; updateGrok(); render();
  };
  app.artsLevel = function (k) { level = k; showSolution = false; render(); };
  app.artsToggleSolution = function () { showSolution = !showSolution; render(); };
  app.artsToggleDone = function () {
    const d = load(), k = cur.col + ':' + cur.i; if (d.done[k]) delete d.done[k]; else d.done[k] = Date.now();
    save(d); refreshButtons();
    if (d.done[k] && window.confetti) { try { window.confetti({ particleCount: 90, spread: 70, origin: { y: 0.7 } }); } catch (e) {} }
  };
  const plain = () => pageSvg(cur.r, cur.name, false);
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
  window.ARTS_DEBUG = { convert, pageSvg, LEVELS };
})();
