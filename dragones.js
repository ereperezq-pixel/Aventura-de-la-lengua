/* Dragones: quizzes (animales, Reino Animal), mundo que nos rodea, premios */
    (function () {
    // ---------- Dragón Obrero (imagen aportada por el usuario) con la colita animada ----------
    const DRAGON_IMG = IMG.dragon;
    function dragonSvg(anim) {
      const css = anim ? `<style>
        .sway{transform-origin:150px 380px;animation:sway .46s ease-in-out infinite alternate}
        .tail{transform-origin:224px 298px;animation:wag .46s ease-in-out infinite alternate}
        .shad{transform-origin:196px 346px;animation:shad .46s ease-in-out infinite alternate}
        @keyframes wag{from{transform:rotate(-8deg)}to{transform:rotate(8deg)}}
        @keyframes sway{from{transform:skewX(1.6deg) translateX(-1.5px)}to{transform:skewX(-1.6deg) translateX(1.5px)}}
        @keyframes shad{from{transform:scaleX(.96)}to{transform:scaleX(1.04)}}
      </style>` : '';
      const poly = 'M222,262 L250,240 L264,222 L310,214 L330,214 L330,345 L222,345 Z';
      return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 400 400">${css}
        <defs>
          <image id="d" width="302" height="382" xlink:href="${DRAGON_IMG}"/>
          <mask id="mb" maskUnits="userSpaceOnUse" x="-50" y="-50" width="450" height="500"><rect x="-50" y="-50" width="450" height="500" fill="#fff"/><path d="${poly}" fill="#000"/><circle cx="224" cy="298" r="44" fill="#fff"/></mask>
          <mask id="mt" maskUnits="userSpaceOnUse" x="-50" y="-50" width="450" height="500"><path d="${poly}" fill="#fff"/><circle cx="224" cy="298" r="30" fill="#000"/></mask>
        </defs>
        <circle cx="200" cy="200" r="198" fill="#DDD6FE"/>
        <ellipse class="shad" cx="196" cy="346" rx="92" ry="9" fill="#5B21B6" opacity=".18"/>
        <svg x="66" y="12" width="265.76" height="336.16" viewBox="0 0 302 382" overflow="visible">
          <g class="sway"><g class="body"><use xlink:href="#d" mask="url(#mb)"/></g><g class="tail"><use xlink:href="#d" mask="url(#mt)"/></g></g>
        </svg>
      </svg>`;
    }

    // ---------- Dragón Científico con la colita animada ----------
    const SCI_IMG = IMG.cientifico;
    function sciSvg(anim) {
      const css = anim ? `<style>
        .sway{transform-origin:128px 363px;animation:sway .46s ease-in-out infinite alternate}
        .tail{transform-origin:205px 286px;animation:wag .46s ease-in-out infinite alternate}
        .shad{transform-origin:200px 349px;animation:shad .46s ease-in-out infinite alternate}
        @keyframes wag{from{transform:rotate(-9deg)}to{transform:rotate(9deg)}}
        @keyframes sway{from{transform:skewX(1.6deg) translateX(-1.5px)}to{transform:skewX(-1.6deg) translateX(1.5px)}}
        @keyframes shad{from{transform:scaleX(.96)}to{transform:scaleX(1.04)}}
      </style>` : '';
      const poly = 'M216,210 L262,206 L262,314 L211,314 L207,296 L206,266 L214,252 L214,226 Z';
      return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 400 400">${css}
        <defs>
          <image id="d" width="256" height="363" xlink:href="${SCI_IMG}"/>
          <mask id="mb" maskUnits="userSpaceOnUse" x="-40" y="-40" width="340" height="440"><rect x="-40" y="-40" width="340" height="440" fill="#fff"/><path d="${poly}" fill="#000"/><circle cx="205" cy="286" r="30" fill="#fff"/></mask>
          <mask id="mt" maskUnits="userSpaceOnUse" x="-40" y="-40" width="340" height="440"><path d="${poly}" fill="#fff"/><circle cx="205" cy="286" r="18" fill="#000"/></mask>
        </defs>
        <circle cx="200" cy="200" r="198" fill="#DDD6FE"/>
        <ellipse class="shad" cx="200" cy="349" rx="90" ry="9" fill="#5B21B6" opacity=".18"/>
        <svg x="83.5" y="22" width="233" height="330" viewBox="0 0 256 363" overflow="visible">
          <g class="sway"><g class="body"><use xlink:href="#d" mask="url(#mb)"/></g><g class="tail"><use xlink:href="#d" mask="url(#mt)"/></g></g>
        </svg>
      </svg>`;
    }
    const svgUri = s => 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(s.replace(/\s+/g, ' ').replace(/> </g, '><'));
    // Colección de premios: Obrero (con colita animada) + 15 dragones de profesiones.
    const PROF = IMG.profesiones;
    const DRAGONS = [svgUri(dragonSvg(false)), ...PROF];
    const DRAGONS_ANIM = [svgUri(dragonSvg(true))];
    DRAGONS_ANIM[DRAGONS.length - 1] = svgUri(sciSvg(true));   // el Científico (último de la lista) también mueve la colita
    const DRAGON_NAMES = ['Dragón Obrero', 'Dragón Doctor', 'Dragón Astronauta', 'Dragón Constructor', 'Dragón Profesor', 'Dragón Policía', 'Dragón Bombero', 'Dragón Cocinero', 'Dragón Granjero', 'Dragón Arquitecto', 'Dragón Mecánico', 'Dragón Informático', 'Dragón Veterinario', 'Dragón Pintor', 'Dragón Piloto', 'Dragón Científico'];

    // ---------- Esqueleto (SVG propio, vista de frente) ----------
    const SK_OL = '#7C5A2B', SK_BG = '#1E1B4B';
    const mx = x => 320 - x;
    // Hueso largo con "bultos" en los extremos
    function seg(x1, y1, x2, y2, w) {
      const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), px = -dy / L, py = dx / L, o = w * .52, kr = w * .66;
      const ends = [[x1, y1], [x2, y2]];
      let a = `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${SK_OL}" stroke-width="${w + 4}" stroke-linecap="round"/>`;
      let b = `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="currentColor" stroke-width="${w}" stroke-linecap="round"/>`;
      ends.forEach(([x, y]) => [-1, 1].forEach(s => {
        const cx = (x + px * o * s).toFixed(1), cy = (y + py * o * s).toFixed(1);
        a += `<circle cx="${cx}" cy="${cy}" r="${(kr + 2).toFixed(1)}" fill="${SK_OL}"/>`;
        b += `<circle cx="${cx}" cy="${cy}" r="${kr.toFixed(1)}" fill="currentColor"/>`;
      }));
      return a + b;
    }
    const hit = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="rgba(0,0,0,.001)"/>`;
    const BONES = [
      { id: 'craneo', name: 'el cráneo', short: 'Cráneo', info: 'Está en la cabeza y protege el cerebro.',
        draw: () => `<ellipse cx="160" cy="50" rx="38" ry="40" fill="${SK_OL}"/><path d="M135,76 Q135,108 160,110 Q185,108 185,76 Z" fill="${SK_OL}"/>
          <ellipse cx="160" cy="50" rx="35" ry="37" fill="currentColor"/><path d="M138,76 Q138,104 160,106 Q182,104 182,76 Z" fill="currentColor"/>
          <ellipse cx="146" cy="58" rx="9" ry="10" fill="${SK_BG}"/><ellipse cx="174" cy="58" rx="9" ry="10" fill="${SK_BG}"/>
          <path d="M160,68 l-5,11 h10 Z" fill="${SK_BG}"/>
          <path d="M146,92 h28 M150,88 v10 M156,88 v12 M162,88 v12 M168,88 v12 M174,88 v10" stroke="${SK_OL}" stroke-width="2" stroke-linecap="round"/>${hit(122, 8, 76, 104)}` },
      { id: 'columna', name: 'la columna vertebral', short: 'Columna vertebral', info: 'Recorre la espalda desde el cuello hasta la cadera. Está formada por muchas vértebras y sostiene el cuerpo.',
        draw: () => { let s = ''; for (let i = 0; i < 17; i++) { const y = 110 + i * 11.2, w = 14 + i * .6; s += `<rect x="${160 - w / 2 - 2}" y="${y - 2}" width="${w + 4}" height="13" rx="5" fill="${SK_OL}"/>`; }
          for (let i = 0; i < 17; i++) { const y = 110 + i * 11.2, w = 14 + i * .6; s += `<rect x="${160 - w / 2}" y="${y}" width="${w}" height="9" rx="4" fill="currentColor"/>`; }
          return s + hit(146, 106, 28, 200); } },
      { id: 'costillas', name: 'las costillas', short: 'Costillas', info: 'Forman la jaula del pecho y protegen el corazón y los pulmones.',
        draw: () => { let s = ''; for (let i = 0; i < 6; i++) { const y = 142 + i * 15, k = 1 - i * .045; [1, -1].forEach(sd => {
            const X = x => 160 + (x - 160) * sd * k * (sd === 1 ? 1 : 1), d = `M${160 + 4 * (-sd) * -1},${y} Q${160 - 66 * sd * k},${y - 2} ${160 - 58 * sd * k},${y + 22} Q${160 - 46 * sd * k},${y + 34} ${160 - 8 * sd},${y + 22}`;
            s += `<path d="${d}" fill="none" stroke="${SK_OL}" stroke-width="9" stroke-linecap="round"/>`; }); }
          for (let i = 0; i < 6; i++) { const y = 142 + i * 15, k = 1 - i * .045; [1, -1].forEach(sd => {
            const d = `M${160 + 4 * sd},${y} Q${160 + 66 * sd * k},${y - 2} ${160 + 58 * sd * k},${y + 22} Q${160 + 46 * sd * k},${y + 34} ${160 + 8 * sd},${y + 22}`;
            s += `<path d="${d}" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>`; }); }
          return s + hit(96, 140, 128, 90); } },
      { id: 'esternon', name: 'el esternón', short: 'Esternón', info: 'Está en el centro del pecho. Es el hueso al que se unen las costillas por delante.',
        draw: () => `<rect x="150" y="132" width="20" height="66" rx="9" fill="${SK_OL}"/><path d="M153,196 L160,214 L167,196 Z" fill="${SK_OL}"/><rect x="153" y="135" width="14" height="60" rx="7" fill="currentColor"/><path d="M155,194 L160,209 L165,194 Z" fill="currentColor"/>${hit(146, 128, 28, 90)}` },
      { id: 'clavicula', name: 'la clavícula', short: 'Clavícula', pair: true, info: 'Está justo debajo del cuello, uniendo el pecho con el hombro.',
        draw: sd => { const f = x => sd ? mx(x) : x; return seg(f(152), 132, f(116), 126, 6) + `<line x1="${f(152)}" y1="132" x2="${f(116)}" y2="126" stroke="rgba(0,0,0,.001)" stroke-width="22"/>`; } },
      { id: 'humero', name: 'el húmero', short: 'Húmero', pair: true, info: 'Es el hueso del brazo, entre el hombro y el codo.',
        draw: sd => { const f = x => sd ? mx(x) : x; return seg(f(112), 132, f(96), 204, 10) + `<line x1="${f(112)}" y1="132" x2="${f(96)}" y2="204" stroke="rgba(0,0,0,.001)" stroke-width="26"/>`; } },
      { id: 'radio', name: 'el radio', short: 'Radio', pair: true, info: 'Es uno de los dos huesos del antebrazo, entre el codo y la muñeca. Está del lado del dedo pulgar.',
        draw: sd => { const f = x => sd ? mx(x) : x; return seg(f(88), 214, f(76), 276, 6) + `<line x1="${f(88)}" y1="214" x2="${f(76)}" y2="276" stroke="rgba(0,0,0,.001)" stroke-width="20"/>`; } },
      { id: 'cubito', name: 'el cúbito', short: 'Cúbito', pair: true, info: 'Es el otro hueso del antebrazo, entre el codo y la muñeca. Está del lado del dedo meñique.',
        draw: sd => { const f = x => sd ? mx(x) : x; return seg(f(106), 214, f(97), 276, 6) + `<line x1="${f(106)}" y1="214" x2="${f(97)}" y2="276" stroke="rgba(0,0,0,.001)" stroke-width="20"/>`; } },
      { id: 'pelvis', name: 'la pelvis (la cadera)', short: 'Pelvis', info: 'Está entre la columna y las piernas. Sostiene el cuerpo cuando te sientas.',
        draw: () => { const p = 'M160,300 C140,288 110,290 102,306 C96,322 108,338 126,344 C140,348 152,344 160,334 C168,344 180,348 194,344 C212,338 224,322 218,306 C210,290 180,288 160,300 Z';
          return `<path d="${p}" fill="currentColor" stroke="${SK_OL}" stroke-width="4" stroke-linejoin="round"/><ellipse cx="134" cy="326" rx="8" ry="10" fill="${SK_BG}"/><ellipse cx="186" cy="326" rx="8" ry="10" fill="${SK_BG}"/><path d="M148,302 L160,336 L172,302 Z" fill="currentColor" stroke="${SK_OL}" stroke-width="3" stroke-linejoin="round"/>${hit(98, 288, 124, 62)}`; } },
      { id: 'femur', name: 'el fémur', short: 'Fémur', pair: true, info: 'Es el hueso del muslo y el más largo y fuerte del cuerpo.',
        draw: sd => { const f = x => sd ? mx(x) : x; return seg(f(126), 340, f(134), 450, 12) + `<circle cx="${f(139)}" cy="336" r="10" fill="${SK_OL}"/><circle cx="${f(139)}" cy="336" r="8" fill="currentColor"/><line x1="${f(126)}" y1="340" x2="${f(134)}" y2="450" stroke="rgba(0,0,0,.001)" stroke-width="30"/>`; } },
      { id: 'rotula', name: 'la rótula', short: 'Rótula', pair: true, info: 'Es el huesecillo redondo que protege la rodilla.',
        draw: sd => { const f = x => sd ? mx(x) : x; return `<circle cx="${f(135)}" cy="462" r="12" fill="${SK_OL}"/><circle cx="${f(135)}" cy="462" r="9.5" fill="currentColor"/><circle cx="${f(135)}" cy="462" r="20" fill="rgba(0,0,0,.001)"/>`; } },
      { id: 'tibia', name: 'la tibia', short: 'Tibia', pair: true, info: 'Es el hueso grueso de la parte delantera de la pierna, entre la rodilla y el tobillo.',
        draw: sd => { const f = x => sd ? mx(x) : x; return seg(f(137), 478, f(139), 566, 10) + `<line x1="${f(137)}" y1="478" x2="${f(139)}" y2="566" stroke="rgba(0,0,0,.001)" stroke-width="22"/>`; } },
      { id: 'perone', name: 'el peroné', short: 'Peroné', pair: true, info: 'Es el hueso fino de la pierna, al lado de la tibia.',
        draw: sd => { const f = x => sd ? mx(x) : x; return seg(f(120), 478, f(121), 562, 6) + `<line x1="${f(120)}" y1="478" x2="${f(121)}" y2="562" stroke="rgba(0,0,0,.001)" stroke-width="18"/>`; } }
    ];
    const BONE_BY_ID = Object.fromEntries(BONES.map(b => [b.id, b]));
    // Adornos que no se pueden tocar: manos y pies
    function skelDecor() {
      let s = '';
      [0, 1].forEach(sd => { const f = x => sd ? mx(x) : x;
        s += `<ellipse cx="${f(86)}" cy="286" rx="14" ry="9" fill="${SK_OL}"/><ellipse cx="${f(86)}" cy="286" rx="12" ry="7" fill="#F1E6C8"/>`;
        [-12, -6, 0, 6, 12].forEach((dx, i) => { const len = [16, 22, 24, 21, 15][i]; s += seg(f(86 + dx), 290, f(86 + dx * 1.35), 290 + len, 3.5).replace(/currentColor/g, '#F1E6C8'); });
        s += `<ellipse cx="${f(138)}" cy="574" rx="17" ry="8" fill="${SK_OL}"/><ellipse cx="${f(138)}" cy="574" rx="15" ry="6" fill="#F1E6C8"/>`;
        [-10, -5, 0, 5, 10].forEach(dx => { s += seg(f(138 + dx), 578, f(138 + dx * 1.2), 590, 3).replace(/currentColor/g, '#F1E6C8'); });
      });
      return s;
    }
    // candidatos: ids que se resaltan; el resto se dibuja primero y atenuado
    function skeletonSvg(candIds) {
      const draws = (b, cand) => {
        const parts = b.pair ? [0, 1].map(sd => `<g class="bone${cand ? ' cand' : ''}" data-b="${b.id}" data-side="${sd}">${b.draw(sd)}</g>`).join('')
          : `<g class="bone${cand ? ' cand' : ''}" data-b="${b.id}">${b.draw()}</g>`;
        return parts;
      };
      const base = BONES.filter(b => !candIds.includes(b.id)).map(b => draws(b, false)).join('');
      const top = BONES.filter(b => candIds.includes(b.id)).map(b => draws(b, true)).join('');
      return `<svg id="dr-skel" class="dr-skel-svg" viewBox="0 0 320 600" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Esqueleto humano">
        <defs><radialGradient id="drglow" cx="50%" cy="45%" r="55%"><stop offset="0" stop-color="#7C3AED" stop-opacity=".55"/><stop offset="1" stop-color="#1E1B4B" stop-opacity="0"/></radialGradient></defs>
        <ellipse cx="160" cy="300" rx="150" ry="290" fill="url(#drglow)"/>
        <g class="skel-decor">${skelDecor()}</g>
        <g class="skel-base">${base}</g>
        <g class="skel-top">${top}</g>
      </svg>`;
    }

    // ---------- Cuerpo humano con músculos (SVG propio, vista de frente) ----------
    const MU_OL = '#7F1D1D', SKIN = '#E9B994', SKIN_OL = '#B9825C';
    const mhit = d => `<path d="${d}" fill="rgba(0,0,0,.001)" stroke="rgba(0,0,0,.001)" stroke-width="14" stroke-linejoin="round"/>`;
    function mus(d, extra) {   // forma muscular: relleno, contorno y brillo
      return `<path d="${d}" fill="currentColor" stroke="${MU_OL}" stroke-width="2.6" stroke-linejoin="round"/>${extra || ''}${mhit(d)}`;
    }
    const fib = (d) => `<path d="${d}" fill="none" stroke="${MU_OL}" stroke-width="1.4" stroke-linecap="round" opacity=".45"/>`;
    // Los pares se dibujan a la izquierda y se reflejan: f(x)=320-x
    const MUSCLES = [
      { id: 'trapecio', name: 'el trapecio', pair: true, info: 'Es el músculo que va del cuello a los hombros. Lo usas para subir los hombros.',
        draw: sd => { const f = x => sd ? mx(x) : x; const d = `M${f(152)},96 Q${f(136)},112 ${f(110)},122 L${f(118)},136 Q${f(138)},124 ${f(154)},120 Z`; return mus(d, fib(`M${f(148)},104 Q${f(134)},118 ${f(116)},128`)); } },
      { id: 'deltoides', name: 'el deltoides', pair: true, info: 'Es el músculo redondo del hombro. Sirve para levantar el brazo.',
        draw: sd => { const f = x => sd ? mx(x) : x; const d = `M${f(118)},128 Q${f(96)},124 ${f(88)},146 Q${f(86)},166 ${f(100)},170 Q${f(112)},158 ${f(120)},140 Z`; return mus(d, fib(`M${f(112)},134 Q${f(100)},148 ${f(98)},164`)); } },
      { id: 'pectoral', name: 'el pectoral', pair: true, info: 'Es el músculo grande del pecho. Lo usas para empujar y abrazar.',
        draw: sd => { const f = x => sd ? mx(x) : x; const d = `M${f(158)},138 Q${f(136)},130 ${f(120)},142 Q${f(118)},172 ${f(138)},184 Q${f(152)},188 ${f(158)},182 Z`; return mus(d, fib(`M${f(154)},146 Q${f(136)},148 ${f(124)},152 M${f(154)},160 Q${f(138)},162 ${f(126)},166`)); } },
      { id: 'biceps', name: 'el bíceps', pair: true, info: 'Está en la parte de delante del brazo. Se hincha cuando doblas el codo.',
        draw: sd => { const f = x => sd ? mx(x) : x; const d = `M${f(102)},170 Q${f(88)},176 ${f(88)},196 Q${f(92)},212 ${f(100)},210 Q${f(110)},200 ${f(112)},180 Q${f(112)},170 ${f(102)},170 Z`; return mus(d, fib(`M${f(100)},176 Q${f(96)},192 ${f(98)},206`)); } },
      { id: 'antebrazo', name: 'los músculos del antebrazo', short: 'Antebrazo', pair: true, info: 'Están entre el codo y la muñeca. Los usas para mover la mano y los dedos.',
        draw: sd => { const f = x => sd ? mx(x) : x; const d = `M${f(98)},216 Q${f(84)},224 ${f(80)},250 Q${f(78)},268 ${f(82)},274 Q${f(92)},276 ${f(94)},262 Q${f(100)},240 ${f(104)},222 Z`; return mus(d, fib(`M${f(92)},224 Q${f(86)},246 ${f(86)},268`)); } },
      { id: 'abdominales', name: 'los abdominales', info: 'Están en la barriga. Mantienen el cuerpo recto y te ayudan a doblarte.',
        draw: () => { let s = ''; [0, 1, 2].forEach(r => { [-1, 1].forEach(sd => { const x = sd < 0 ? 140 : 162, y = 192 + r * 30; s += `<rect x="${x}" y="${y}" width="18" height="26" rx="8" fill="currentColor" stroke="${MU_OL}" stroke-width="2.6"/>`; }); }); return s + `<rect x="136" y="188" width="48" height="96" fill="rgba(0,0,0,.001)"/>`; } },
      { id: 'oblicuos', name: 'los oblicuos', pair: true, info: 'Están a los lados de la barriga. Los usas para girar y doblar el cuerpo hacia un lado.',
        draw: sd => { const f = x => sd ? mx(x) : x; const d = `M${f(136)},190 Q${f(120)},200 ${f(120)},236 Q${f(120)},266 ${f(126)},288 L${f(136)},284 Q${f(132)},250 ${f(136)},190 Z`; return mus(d, fib(`M${f(132)},204 L${f(124)},222 M${f(132)},228 L${f(124)},246`)); } },
      { id: 'cuadriceps', name: 'el cuádriceps', pair: true, info: 'Es el músculo grande de la parte de delante del muslo. Lo usas para correr, saltar y dar patadas.',
        draw: sd => { const f = x => sd ? mx(x) : x; const d = `M${f(138)},350 C${f(116)},376 ${f(112)},424 ${f(128)},454 C${f(142)},458 ${f(154)},446 ${f(154)},410 C${f(154)},384 ${f(152)},362 ${f(138)},350 Z`; return mus(d, fib(`M${f(138)},366 Q${f(128)},410 ${f(134)},448 M${f(146)},372 Q${f(144)},410 ${f(146)},444`)); } },
      { id: 'tibial', name: 'el tibial', short: 'Tibial', pair: true, info: 'Es el músculo de la parte de delante de la espinilla. Lo usas para levantar la punta del pie.',
        draw: sd => { const f = x => sd ? mx(x) : x; const d = `M${f(138)},476 Q${f(130)},520 ${f(138)},560 Q${f(148)},520 ${f(146)},476 Q${f(142)},470 ${f(138)},476 Z`; return mus(d); } },
      { id: 'gemelos', name: 'los gemelos', pair: true, info: 'Están en la pantorrilla, en la parte de atrás de la pierna. Los usas para andar de puntillas.',
        draw: sd => { const f = x => sd ? mx(x) : x; const d = `M${f(124)},478 Q${f(108)},508 ${f(120)},548 Q${f(128)},552 ${f(131)},540 Q${f(134)},508 ${f(132)},484 Z`; return mus(d, fib(`M${f(122)},490 Q${f(118)},516 ${f(124)},540`)); } }
    ];
    const MUSC_BY_ID = Object.fromEntries(MUSCLES.map(b => [b.id, b]));
    // Cuerpo (no se toca): cabeza, piel, pantalón corto, manos y pies
    function bodyDecor() {
      const L = (x1, y1, x2, y2, w, c) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>`;
      let s = '';
      const limbs = (c, extra) => { let t = ''; [0, 1].forEach(sd => { const f = x => sd ? mx(x) : x;
        t += L(f(108), 140, f(95), 206, 30 + extra, c) + L(f(92), 214, f(80), 276, 24 + extra, c) + L(f(135), 350, f(135), 456, 46 + extra, c) + L(f(138), 470, f(138), 566, 32 + extra, c); }); return t; };
      s += limbs(SKIN_OL, 4) + L(160, 100, 160, 124, 36, SKIN_OL);
      s += `<path d="M112,126 Q160,114 208,126 L206,200 Q202,262 198,298 L210,352 L110,352 L122,298 Q118,262 114,200 Z" fill="${SKIN}" stroke="${SKIN_OL}" stroke-width="4" stroke-linejoin="round"/>`;
      s += limbs(SKIN, 0) + L(160, 100, 160, 124, 32, SKIN);
      [0, 1].forEach(sd => { const f = x => sd ? mx(x) : x;
        s += `<ellipse cx="${f(80)}" cy="288" rx="13" ry="12" fill="${SKIN}" stroke="${SKIN_OL}" stroke-width="3"/>`;
        s += `<ellipse cx="${f(140)}" cy="574" rx="20" ry="9" fill="${SKIN}" stroke="${SKIN_OL}" stroke-width="3"/>`; });
      s += `<ellipse cx="160" cy="52" rx="36" ry="40" fill="${SKIN}" stroke="${SKIN_OL}" stroke-width="4"/>`;
      s += `<path d="M124,46 Q126,12 160,12 Q194,12 196,46 Q182,30 160,30 Q138,30 124,46 Z" fill="#5B3A1E"/>`;
      s += `<circle cx="146" cy="56" r="4.5" fill="#2B1B0E"/><circle cx="174" cy="56" r="4.5" fill="#2B1B0E"/><path d="M146,76 Q160,88 174,76" fill="none" stroke="#9A3B3B" stroke-width="3.5" stroke-linecap="round"/><ellipse cx="136" cy="68" rx="6" ry="4" fill="#F4A3A3" opacity=".6"/><ellipse cx="184" cy="68" rx="6" ry="4" fill="#F4A3A3" opacity=".6"/>`;
      s += `<path d="M112,296 L208,296 L212,356 L164,356 L160,332 L156,356 L108,356 Z" fill="#38BDF8" stroke="#0369A1" stroke-width="3" stroke-linejoin="round"/>`;
      return s;
    }
    function muscleSvg(candIds) {
      const draws = (b, cand) => b.pair ? [0, 1].map(sd => `<g class="bone${cand ? ' cand' : ''}" data-b="${b.id}" data-side="${sd}">${b.draw(sd)}</g>`).join('')
        : `<g class="bone${cand ? ' cand' : ''}" data-b="${b.id}">${b.draw()}</g>`;
      const base = MUSCLES.filter(b => !candIds.includes(b.id)).map(b => draws(b, false)).join('');
      const top = MUSCLES.filter(b => candIds.includes(b.id)).map(b => draws(b, true)).join('');
      return `<svg id="dr-skel" class="dr-skel-svg musc" viewBox="0 0 320 600" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cuerpo humano con músculos">
        <defs><radialGradient id="drglow2" cx="50%" cy="45%" r="55%"><stop offset="0" stop-color="#7C3AED" stop-opacity=".55"/><stop offset="1" stop-color="#1E1B4B" stop-opacity="0"/></radialGradient></defs>
        <ellipse cx="160" cy="300" rx="150" ry="290" fill="url(#drglow2)"/>
        <g class="skel-decor">${bodyDecor()}</g>
        <g class="skel-base">${base}</g>
        <g class="skel-top">${top}</g>
      </svg>`;
    }

    // ---------- Vertebrados e invertebrados ----------
    const VX = 'Es un vertebrado: tiene esqueleto con huesos y columna vertebral.', IX = 'Es un invertebrado: no tiene columna vertebral ni huesos.';
    const ANIMALS = [
      { id: 'perro', e: '🐶', name: 'el perro', v: true, info: `${VX} Es un mamífero: tiene pelo y las crías toman leche de su mamá.` },
      { id: 'gato', e: '🐱', name: 'el gato', v: true, info: `${VX} Es un mamífero: tiene pelo y las crías toman leche de su mamá.` },
      { id: 'elefante', e: '🐘', name: 'el elefante', v: true, info: `${VX} Es un mamífero, ¡y el animal terrestre más grande!` },
      { id: 'delfin', e: '🐬', name: 'el delfín', v: true, info: `${VX} Vive en el mar, pero es un mamífero: respira aire y las crías toman leche.` },
      { id: 'caballo', e: '🐴', name: 'el caballo', v: true, info: `${VX} Es un mamífero con cuatro patas fuertes para correr.` },
      { id: 'leon', e: '🦁', name: 'el león', v: true, info: `${VX} Es un mamífero: tiene pelo y es un gran cazador.` },
      { id: 'pez', e: '🐟', name: 'el pez', v: true, info: `${VX} Es un pez: vive en el agua, respira por branquias y tiene escamas.` },
      { id: 'tiburon', e: '🦈', name: 'el tiburón', v: true, info: `${VX} Es un pez: respira por branquias y vive en el mar.` },
      { id: 'rana', e: '🐸', name: 'la rana', v: true, info: `${VX} Es un anfibio: de pequeña vive en el agua y de mayor también en tierra.` },
      { id: 'serpiente', e: '🐍', name: 'la serpiente', v: true, info: `${VX} Es un reptil: tiene la piel con escamas. ¡Y muchísimas vértebras!` },
      { id: 'tortuga', e: '🐢', name: 'la tortuga', v: true, info: `${VX} Es un reptil: su caparazón protege su esqueleto.` },
      { id: 'cocodrilo', e: '🐊', name: 'el cocodrilo', v: true, info: `${VX} Es un reptil: tiene la piel con escamas y pone huevos.` },
      { id: 'pajaro', e: '🐦', name: 'el pájaro', v: true, info: `${VX} Es un ave: tiene plumas, pico y pone huevos.` },
      { id: 'pinguino', e: '🐧', name: 'el pingüino', v: true, info: `${VX} Es un ave: tiene plumas y pone huevos, aunque no vuele.` },
      { id: 'oruga', e: '🐛', name: 'la oruga', v: false, info: `${IX} Es una larva de insecto: ¡se convertirá en mariposa!` },
      { id: 'mariposa', e: '🦋', name: 'la mariposa', v: false, info: `${IX} Es un insecto: tiene seis patas y alas.` },
      { id: 'abeja', e: '🐝', name: 'la abeja', v: false, info: `${IX} Es un insecto: tiene seis patas, alas y hace miel.` },
      { id: 'mariquita', e: '🐞', name: 'la mariquita', v: false, info: `${IX} Es un insecto con seis patas y el cuerpo protegido por una cubierta dura.` },
      { id: 'hormiga', e: '🐜', name: 'la hormiga', v: false, info: `${IX} Es un insecto: tiene seis patas y vive en hormigueros.` },
      { id: 'grillo', e: '🦗', name: 'el grillo', v: false, info: `${IX} Es un insecto con seis patas. ¡Canta frotando sus alas!` },
      { id: 'mosquito', e: '🦟', name: 'el mosquito', v: false, info: `${IX} Es un insecto: tiene seis patas y dos alas.` },
      { id: 'arana', e: '🕷️', name: 'la araña', v: false, info: `${IX} Es un arácnido: tiene ocho patas (no es un insecto).` },
      { id: 'escorpion', e: '🦂', name: 'el escorpión', v: false, info: `${IX} Es un arácnido: tiene ocho patas y pinzas.` },
      { id: 'caracol', e: '🐌', name: 'el caracol', v: false, info: `${IX} Es un molusco: tiene el cuerpo blando y una concha.` },
      { id: 'pulpo', e: '🐙', name: 'el pulpo', v: false, info: `${IX} Es un molusco: tiene el cuerpo blando y ocho tentáculos. ¡Aunque es muy listo, no tiene huesos!` },
      { id: 'calamar', e: '🦑', name: 'el calamar', v: false, info: `${IX} Es un molusco: tiene el cuerpo blando y tentáculos.` },
      { id: 'cangrejo', e: '🦀', name: 'el cangrejo', v: false, info: `${IX} Es un crustáceo: su caparazón duro está por fuera del cuerpo y no tiene huesos por dentro.` },
      { id: 'langosta', e: '🦞', name: 'la langosta', v: false, info: `${IX} Es un crustáceo: tiene un caparazón duro por fuera y pinzas.` }
    ];
    const ANIMAL_BY_ID = Object.fromEntries(ANIMALS.map(a => [a.id, a]));
    const vertOrder = () => shuffle([...shuffle(ANIMALS.filter(a => a.v)).slice(0, 5), ...shuffle(ANIMALS.filter(a => !a.v)).slice(0, 5)]).map(a => a.id);

    // ---------- Quiz de vertebrados e invertebrados (3º de Primaria) ----------
    // [pregunta, respuesta correcta, incorrecta 1, incorrecta 2, explicación]
    const QUIZ = [
      ['¿Qué tienen los animales vertebrados en la espalda?', 'Una columna vertebral', 'Un caparazón blando', 'Unas antenas', 'La columna vertebral está formada por piezas llamadas vértebras.'],
      ['¿Qué animal es invertebrado?', 'La mariposa', 'El perro', 'La gallina', 'La mariposa no tiene huesos ni columna vertebral.'],
      ['¿Qué animal es vertebrado?', 'El gato', 'El caracol', 'La abeja', 'El gato tiene esqueleto con huesos y columna vertebral.'],
      ['Los invertebrados son animales que…', 'no tienen columna vertebral', 'viven siempre en el agua', 'tienen plumas', 'Invertebrado significa "sin vértebras".'],
      ['¿Cuál de estos grupos es de animales vertebrados?', 'Peces, aves y reptiles', 'Insectos, arañas y caracoles', 'Pulpos, cangrejos y medusas', 'Los vertebrados son: mamíferos, aves, reptiles, anfibios y peces.'],
      ['¿Qué tienen en común todos los mamíferos?', 'Las crías toman la leche de su mamá', 'Ponen huevos', 'Tienen plumas', 'Mamar viene de "mamas", donde la mamá produce la leche.'],
      ['¿Qué cubre el cuerpo de la mayoría de los mamíferos?', 'Pelo', 'Plumas', 'Escamas', 'El pelo los ayuda a mantener el calor.'],
      ['¿Cuál de estos animales es un mamífero?', 'El delfín', 'El tiburón', 'El cocodrilo', 'Aunque vive en el mar, el delfín respira aire y da leche a sus crías.'],
      ['¿Cómo respira una ballena?', 'Con pulmones, sube a la superficie', 'Con branquias', 'Por la piel', 'La ballena es un mamífero: necesita sacar la cabeza para respirar aire.'],
      ['¿Cómo nacen la mayoría de los mamíferos?', 'Del vientre de su mamá', 'De un huevo', 'De una larva', 'Los animales que nacen del vientre de su madre se llaman vivíparos.'],
      ['¿Cuál es el único mamífero que sabe volar?', 'El murciélago', 'El búho', 'La mariposa', 'El murciélago no es un ave: tiene pelo y da leche a sus crías.'],
      ['¿Qué cubre el cuerpo de las aves?', 'Plumas', 'Escamas', 'Pelo', 'Las plumas las protegen del frío y les ayudan a volar.'],
      ['¿Cómo nacen las aves?', 'De huevos', 'Del vientre de su mamá', 'De una oruga', 'Los animales que nacen de huevos se llaman ovíparos.'],
      ['¿Qué ave no puede volar y es muy buena nadadora?', 'El pingüino', 'La gaviota', 'El águila', 'El pingüino usa sus alas como aletas para nadar.'],
      ['¿Qué tienen las aves en lugar de dientes?', 'Un pico', 'Unas pinzas', 'Una trompa', 'Cada ave tiene un pico adecuado a lo que come.'],
      ['¿Qué ave caza de noche y duerme de día?', 'El búho', 'La golondrina', 'La gallina', 'El búho es un ave nocturna, ¡como nuestro Búho Nublo!'],
      ['¿Cómo es la piel de los reptiles?', 'Seca y con escamas', 'Húmeda y suave', 'Con mucho pelo', 'Las escamas protegen el cuerpo de serpientes, lagartos y tortugas.'],
      ['¿Cuál de estos animales es un reptil?', 'La tortuga', 'La rana', 'El delfín', 'La tortuga tiene escamas y pone huevos.'],
      ['¿Qué reptil no tiene patas y se arrastra?', 'La serpiente', 'El lagarto', 'El cocodrilo', 'La serpiente se desplaza reptando por el suelo.'],
      ['¿Cómo nacen casi todos los reptiles?', 'De huevos', 'Del vientre de su mamá', 'De un renacuajo', 'Son ovíparos: ponen huevos, casi siempre en tierra.'],
      ['¿Por qué las lagartijas toman el sol?', 'Para calentar su cuerpo', 'Para beber agua', 'Para esconderse de otros animales', 'Los reptiles necesitan el calor del sol para tener energía.'],
      ['¿Cuál de estos animales es un anfibio?', 'La rana', 'El lagarto', 'El pez payaso', 'Los anfibios viven parte de su vida en el agua y parte en tierra.'],
      ['¿Cómo es la piel de los anfibios?', 'Húmeda y sin escamas', 'Con plumas', 'Con pelo', 'Los anfibios necesitan tener la piel siempre húmeda.'],
      ['¿En qué se convierte un renacuajo cuando crece?', 'En una rana', 'En un pez', 'En una serpiente', 'El renacuajo cambia de forma: le salen patas y pierde la cola.'],
      ['¿Dónde ponen sus huevos las ranas?', 'En el agua', 'En un nido de ramas', 'Bajo la tierra seca', 'De los huevos de rana nacen los renacuajos.'],
      ['¿Cómo respiran los peces?', 'Con branquias', 'Con pulmones', 'Con trompa', 'Las branquias sacan el oxígeno que hay en el agua.'],
      ['¿Qué cubre el cuerpo de la mayoría de los peces?', 'Escamas', 'Plumas', 'Pelo', 'Las escamas son como pequeñas placas que protegen al pez.'],
      ['¿Qué usan los peces para nadar?', 'Las aletas', 'Las alas', 'Las patas', 'Con las aletas y la cola se mueven y cambian de dirección.'],
      ['El tiburón es…', 'un pez', 'un mamífero', 'un molusco', 'El tiburón respira por branquias, como los demás peces.'],
      ['¿Cuántas patas tiene un insecto?', 'Seis', 'Cuatro', 'Ocho', 'Todos los insectos tienen seis patas.'],
      ['¿Cuántas patas tiene una araña?', 'Ocho', 'Seis', 'Diez', 'Por eso la araña no es un insecto: es un arácnido.'],
      ['¿Cuál de estos animales NO es un insecto?', 'El escorpión', 'La hormiga', 'El mosquito', 'El escorpión tiene ocho patas: es un arácnido.'],
      ['¿En cuántas partes se divide el cuerpo de un insecto?', 'En tres: cabeza, tórax y abdomen', 'En dos: cabeza y cola', 'No tiene partes', 'Las patas y las alas salen del tórax.'],
      ['¿Para qué sirven las antenas de un insecto?', 'Para tocar y oler', 'Para volar', 'Para comer', 'Con las antenas los insectos notan lo que hay a su alrededor.'],
      ['¿Cómo se llama el cambio de una oruga a una mariposa?', 'Metamorfosis', 'Hibernación', 'Migración', 'En la metamorfosis, el animal cambia mucho de forma al crecer.'],
      ['¿Cuántas alas tiene una mariposa?', 'Cuatro', 'Dos', 'Seis', 'Las mariposas tienen dos pares de alas.'],
      ['¿Dónde viven las abejas?', 'En una colmena', 'En un hormiguero', 'En una madriguera', 'En la colmena trabajan juntas y fabrican la miel.'],
      ['¿Qué animal fabrica la miel?', 'La abeja', 'La hormiga', 'La mariquita', 'Las abejas hacen la miel con el néctar de las flores.'],
      ['¿Qué tienen los moluscos?', 'El cuerpo blando', 'Un esqueleto de huesos', 'Plumas', 'Muchos moluscos, como el caracol, tienen una concha que los protege.'],
      ['¿Cuál de estos animales es un molusco?', 'El caracol', 'La lombriz', 'La estrella de mar', 'El caracol tiene el cuerpo blando y una concha.'],
      ['¿Cuántos brazos tiene un pulpo?', 'Ocho', 'Seis', 'Diez', 'Es un invertebrado muy listo, ¡y no tiene ningún hueso!'],
      ['¿Cuál de estos animales es un crustáceo?', 'El cangrejo', 'El caracol', 'La medusa', 'El cangrejo tiene un caparazón duro por fuera.'],
      ['¿Dónde tiene el cangrejo su esqueleto duro?', 'Por fuera del cuerpo', 'Por dentro del cuerpo', 'No tiene nada duro', 'Es el caparazón: un esqueleto exterior que lo protege.'],
      ['¿Qué animal es un gusano que vive bajo la tierra?', 'La lombriz de tierra', 'La serpiente', 'El lagarto', 'La lombriz es un invertebrado de cuerpo largo y blando.'],
      ['¿Qué animal marino no tiene huesos y tiene tentáculos?', 'La medusa', 'La tortuga marina', 'El delfín', 'La medusa es un invertebrado casi transparente.'],
      ['La estrella de mar es…', 'un invertebrado', 'un pez', 'una planta', 'No tiene huesos: es un invertebrado marino con forma de estrella.'],
      ['¿Qué come un animal herbívoro?', 'Plantas', 'Carne', 'Solo insectos', 'Herbívoro significa "que come hierbas y plantas".'],
      ['¿Cuál de estos animales es herbívoro?', 'La vaca', 'El león', 'El tiburón', 'La vaca come hierba, heno y otras plantas.'],
      ['¿Cuál de estos animales es carnívoro?', 'El lobo', 'El conejo', 'El caballo', 'Los carnívoros comen otros animales.'],
      ['¿Qué come un animal omnívoro?', 'De todo: plantas y carne', 'Solo plantas', 'Solo carne', 'Las personas y los osos somos omnívoros.'],
      ['¿Cuál de estos animales es ovíparo?', 'La gallina', 'La vaca', 'El conejo', 'La gallina pone huevos, de los que salen los pollitos.'],
      ['¿Cómo nace un delfín?', 'Del vientre de su mamá', 'De un huevo', 'De una larva', 'Es un mamífero vivíparo, como el perro o la vaca.'],
      ['¿Cuál es el animal terrestre más grande?', 'El elefante', 'El oso', 'El caballo', 'El elefante es un mamífero vertebrado enorme.'],
      ['¿Qué animal es el más grande del mundo?', 'La ballena azul', 'El elefante', 'El tiburón blanco', 'La ballena azul es un mamífero que vive en el mar.'],
      ['¿Qué hacen algunos animales, como el oso, durante el invierno?', 'Hibernar: dormir mucho tiempo', 'Mudar las plumas', 'Hacer la metamorfosis', 'Al hibernar gastan poca energía mientras no hay comida.'],
      ['Las golondrinas viajan a lugares más cálidos en invierno. ¿Cómo se llama ese viaje?', 'Migración', 'Metamorfosis', 'Hibernación', 'Migrar es viajar de un lugar a otro según la estación.'],
      ['¿Para qué sirve el camuflaje de algunos animales?', 'Para esconderse', 'Para volar', 'Para dormir', 'Se parecen a su entorno, así los depredadores no los ven.'],
      ['¿Cuál de estos animales es un ovíparo?', 'La tortuga', 'El perro', 'El gato', 'La tortuga pone huevos en la arena.'],
      ['¿Qué animal NO es un vertebrado?', 'El pulpo', 'La serpiente', 'El pingüino', 'El pulpo es un molusco y no tiene columna vertebral.']
    ];
    // ---------- El Reino Animal: 100 preguntas basadas en la guía de estudio (10 niveles de 10) ----------
    // [pregunta, correcta, incorrecta 1, incorrecta 2, explicación]
    const REINO_LEVELS = [
      'Las funciones vitales', 'Vertebrados e invertebrados', 'Los grupos de invertebrados', 'Los moluscos', 'Los insectos',
      'Mamíferos y aves', 'Reptiles, anfibios y peces', 'La importancia de los animales', 'Compara y descubre', 'El gran reto del Reino Animal'
    ];
    const REINO = [
      // ===== Nivel 1 · Las funciones vitales =====
      ['¿Cuáles son las tres funciones vitales de los animales?', 'Nutrición, relación y reproducción', 'Nutrición, movimiento y descanso', 'Alimentación, juego y reproducción', 'Los animales realizan tres funciones vitales para sobrevivir: nutrición, relación y reproducción.'],
      ['¿Para qué sirve la función de nutrición?', 'Para obtener energía y materiales para crecer', 'Para recibir información del entorno', 'Para tener crías parecidas a sus padres', 'La nutrición permite obtener energía y materiales para crecer.'],
      ['¿Cómo se llaman los animales que comen plantas?', 'Herbívoros', 'Carnívoros', 'Omnívoros', 'Los herbívoros comen plantas.'],
      ['¿Cómo se llaman los animales que comen otros animales?', 'Carnívoros', 'Herbívoros', 'Omnívoros', 'Los carnívoros comen otros animales.'],
      ['¿Qué comen los omnívoros?', 'Plantas y animales', 'Solo plantas', 'Solo otros animales', 'Los omnívoros comen plantas y animales.'],
      ['¿Cómo toman el aire los animales de respiración pulmonar?', 'Con los pulmones', 'Con las branquias', 'Con las antenas', 'En la respiración pulmonar, los animales toman aire por los pulmones.'],
      ['¿Qué toman los animales de respiración branquial?', 'El oxígeno disuelto en el agua, con las branquias', 'El aire con los pulmones', 'El vapor de agua con las antenas', 'En la respiración branquial se toma el oxígeno disuelto en el agua por las branquias.'],
      ['¿Qué órganos usan los animales para captar información del entorno?', 'Los órganos de los sentidos', 'Los pulmones', 'Las branquias', 'La función de relación recibe información del entorno a través de los órganos de los sentidos.'],
      ['¿Qué interpreta la información de los sentidos y elabora una respuesta?', 'El cerebro', 'Los pulmones', 'La piel', 'El cerebro interpreta la información y elabora una respuesta adecuada, por ejemplo huir del peligro.'],
      ['¿Cómo se llaman los animales que nacen de un huevo?', 'Ovíparos', 'Vivíparos', 'Herbívoros', 'Los ovíparos nacen a partir de un huevo.'],
      // ===== Nivel 2 · Vertebrados e invertebrados =====
      ['¿Qué tienen en el interior del cuerpo los animales vertebrados?', 'Un esqueleto de huesos con columna vertebral', 'Una concha blanda', 'Una armadura de piezas articuladas', 'Los vertebrados poseen un esqueleto interno formado por huesos, con una columna vertebral.'],
      ['¿Qué animales no tienen esqueleto interno de huesos?', 'Los invertebrados', 'Los vertebrados', 'Los mamíferos', 'Los invertebrados no poseen esqueleto interno de huesos.'],
      ['¿Cómo nacen los animales vivíparos?', 'Crecen dentro del vientre de la madre y nacen directamente de ella', 'Nacen de un huevo', 'Primero son orugas y luego se transforman', 'Los vivíparos crecen dentro del vientre materno y nacen directamente de la madre.'],
      ['¿En qué tres partes se compone el cuerpo de un vertebrado?', 'Cabeza, tronco y cola', 'Cabeza, tórax y abdomen', 'Cabeza, alas y aletas', 'El cuerpo de los vertebrados se compone de cabeza, tronco y cola.'],
      ['¿Qué parte del cuerpo de un vertebrado alberga el cráneo y la boca?', 'La cabeza', 'El tronco', 'La cola', 'La cabeza alberga el cráneo y la boca.'],
      ['¿Dónde nacen las extremidades (patas, alas o aletas) de un vertebrado?', 'En el tronco', 'En la cabeza', 'En la cola', 'En el tronco nacen las extremidades: patas, alas o aletas.'],
      ['¿Cuál es el grupo de animales más abundante de la Tierra?', 'Los invertebrados', 'Los vertebrados', 'Los mamíferos', 'Los invertebrados constituyen el grupo más abundante de la Tierra.'],
      ['¿Cuáles son los cinco grupos de animales vertebrados?', 'Mamíferos, aves, reptiles, anfibios y peces', 'Mamíferos, insectos, reptiles, moluscos y peces', 'Aves, peces, medusas, anfibios y reptiles', 'Los vertebrados son mamíferos, aves, reptiles, anfibios y peces.'],
      ['¿Cuáles son los seis grupos principales de invertebrados?', 'Artrópodos, moluscos, esponjas, gusanos, medusas y equinodermos', 'Artrópodos, anfibios, esponjas, aves, medusas y peces', 'Moluscos, reptiles, gusanos, mamíferos, medusas y equinodermos', 'Los grupos principales de invertebrados son artrópodos, moluscos, esponjas, gusanos, medusas y equinodermos.'],
      ['¿Para qué sirve la función de reproducción?', 'Para tener crías parecidas a sus padres', 'Para captar estímulos del entorno', 'Para obtener energía', 'La reproducción permite tener crías semejantes a los progenitores.'],
      // ===== Nivel 3 · Los grupos de invertebrados =====
      ['¿Qué invertebrados tienen el cuerpo protegido por una armadura de piezas articuladas y patas rígidas?', 'Los artrópodos', 'Los moluscos', 'Las medusas', 'Los artrópodos tienen una armadura de piezas articuladas y patas rígidas.'],
      ['¿Cuál es el grupo más numeroso de los artrópodos?', 'Los insectos', 'Los gusanos', 'Las esponjas', 'El grupo más numeroso de los artrópodos son los insectos.'],
      ['¿Qué invertebrados viven fijos al fondo marino y no se desplazan?', 'Las esponjas', 'Las medusas', 'Los equinodermos', 'Las esponjas viven fijas al fondo marino y no se desplazan.'],
      ['¿Qué invertebrados tienen el cuerpo blando y alargado, sin patas ni caparazón?', 'Los gusanos', 'Los artrópodos', 'Los moluscos', 'Los gusanos tienen el cuerpo blando y alargado, y no tienen patas ni caparazón.'],
      ['¿Qué forma tiene el cuerpo de una medusa?', 'De paraguas', 'De estrella', 'De espiral', 'Las medusas tienen el cuerpo transparente en forma de paraguas.'],
      ['¿Qué tienen las medusas en su cuerpo transparente?', 'Tentáculos urticantes', 'Una armadura de piezas', 'Dos conchas', 'Las medusas tienen tentáculos urticantes.'],
      ['¿Dónde viven las medusas?', 'En el mar', 'En la tierra seca', 'Bajo el suelo', 'Las medusas viven en el mar.'],
      ['¿Qué tienen los equinodermos bajo la piel?', 'Un esqueleto interno de placas duras', 'Una concha en espiral', 'Una armadura de piezas articuladas', 'Los equinodermos tienen un esqueleto interno formado por placas duras bajo la piel, a menudo con espinas.'],
      ['¿Cuál de estos animales es un equinodermo?', 'La estrella de mar', 'La medusa', 'La esponja', 'La estrella de mar y el erizo de mar son equinodermos.'],
      ['¿Qué invertebrados tienen el cuerpo blando e irregular?', 'Las esponjas', 'Los artrópodos', 'Los equinodermos', 'Las esponjas tienen el cuerpo blando e irregular.'],
      // ===== Nivel 4 · Los moluscos =====
      ['¿Cómo es el cuerpo de los moluscos?', 'Blando', 'Duro y articulado', 'Transparente y en forma de paraguas', 'Los moluscos tienen el cuerpo blando.'],
      ['¿Cómo se reproducen los moluscos?', 'Son ovíparos', 'Son vivíparos', 'Nacen ya adultos, sin larva', 'Los moluscos son ovíparos.'],
      ['¿Qué nace del huevo de un molusco?', 'Una larva que sufre cambios', 'Un animal igual que el adulto', 'Un renacuajo con cola', 'Del huevo nace una larva que sufre cambios, como en la sepia o el caracol.'],
      ['¿Cómo se llaman los moluscos que tienen dos conchas?', 'Bivalvos', 'Gasterópodos', 'Cefalópodos', 'Los bivalvos tienen el cuerpo protegido por dos conchas, llamadas valvas.'],
      ['¿Dónde viven los bivalvos?', 'Todos viven en el agua', 'Todos viven en la tierra', 'Todos viven en los árboles', 'Los bivalvos son todos acuáticos.'],
      ['¿Cuál de estos animales es un bivalvo?', 'La almeja', 'El caracol', 'El pulpo', 'Los mejillones, almejas, ostras y coquinas son bivalvos.'],
      ['¿Qué tipo de concha tienen los gasterópodos?', 'Una concha en espiral', 'Dos conchas', 'Una concha interna', 'Los gasterópodos se protegen con una concha en espiral.'],
      ['¿Qué gasterópodo no tiene concha?', 'La babosa', 'El mejillón', 'La sepia', 'Las babosas son gasterópodos que no presentan concha.'],
      ['¿Qué tienen los cefalópodos alrededor de la boca para cazar?', 'Tentáculos con ventosas', 'Dos valvas', 'Una concha en espiral', 'Los cefalópodos tienen tentáculos con ventosas rodeando la boca para cazar.'],
      ['¿Qué cefalópodo no tiene concha?', 'El pulpo', 'El calamar', 'La sepia', 'El calamar y la sepia tienen una concha interna; el pulpo no tiene concha.'],
      // ===== Nivel 5 · Los insectos =====
      ['¿Qué proceso de transformación sufre la larva de un insecto hasta ser adulto?', 'La metamorfosis', 'La hibernación', 'La migración', 'La larva sufre un proceso de transformación llamado metamorfosis.'],
      ['Al nacer, la larva de un insecto también se llama…', 'Oruga', 'Renacuajo', 'Alevín', 'Al nacer, la larva (u oruga) sufre metamorfosis hasta convertirse en adulto.'],
      ['¿Cómo se reproducen los insectos?', 'Son ovíparos', 'Son vivíparos', 'Se dividen en dos', 'Los insectos son invertebrados ovíparos.'],
      ['¿En cuántas partes se divide el cuerpo adulto de un insecto?', 'En tres', 'En dos', 'En cinco', 'El cuerpo adulto de un insecto se divide en tres partes.'],
      ['¿Cuáles son las tres partes del cuerpo de un insecto?', 'Cabeza, tórax y abdomen', 'Cabeza, tronco y cola', 'Cabeza, cola y alas', 'El cuerpo de un insecto se divide en cabeza, tórax y abdomen.'],
      ['¿Cuántas patas articuladas tiene un insecto?', 'Seis', 'Cuatro', 'Ocho', 'Los insectos tienen 6 patas articuladas.'],
      ['¿Cuántas antenas tiene un insecto?', 'Dos', 'Cuatro', 'Seis', 'Los insectos tienen 2 antenas.'],
      ['¿Qué cubre las cuatro alas grandes de las mariposas?', 'Escamas de colores', 'Plumas', 'Pelo', 'Las mariposas tienen 4 alas grandes recubiertas de escamas de colores.'],
      ['¿Para qué usan las moscas y los mosquitos los balancines?', 'Para mantener el equilibrio', 'Para atrapar comida', 'Para respirar', 'Las moscas y mosquitos tienen 2 alas y 2 pequeñas estructuras, los balancines, para mantener el equilibrio.'],
      ['¿Cómo se llaman las alas exteriores duras de los escarabajos?', 'Élitros', 'Balancines', 'Valvas', 'Los escarabajos tienen 2 alas exteriores duras, los élitros, que protegen otras 2 alas finas de vuelo.'],
      // ===== Nivel 6 · Mamíferos y aves =====
      ['¿Qué cubre la piel de los mamíferos?', 'Pelo', 'Plumas', 'Escamas', 'Los mamíferos tienen la piel con pelo.'],
      ['¿Cómo respiran los mamíferos?', 'Por pulmones', 'Por branquias', 'Por la piel húmeda', 'Los mamíferos tienen respiración pulmonar.'],
      ['¿Cómo nacen los mamíferos?', 'Son vivíparos', 'Son ovíparos', 'Salen de un huevo', 'Los mamíferos son vivíparos: crecen en el vientre materno.'],
      ['¿De qué se alimentan al nacer las crías de los mamíferos?', 'De la leche de las mamas', 'De insectos', 'De plantas', 'Al nacer, los mamíferos se alimentan de la leche de las mamas.'],
      ['¿Cuál de estos animales es un mamífero volador?', 'El murciélago', 'La mariposa', 'El ánade', 'Entre los mamíferos hay voladores, como los murciélagos.'],
      ['¿Qué mamífero es acuático?', 'El delfín', 'El murciélago', 'El tiburón', 'Los delfines son mamíferos acuáticos.'],
      ['¿Cómo se llaman los mamíferos que tienen pezuñas?', 'Ungulados', 'Primates', 'Carnívoros', 'Los ungulados son los mamíferos con pezuñas.'],
      ['¿Qué cubre el cuerpo de las aves?', 'Plumas', 'Pelo', 'Escamas', 'Las aves tienen el cuerpo con plumas.'],
      ['¿Cómo se reproducen las aves?', 'Son ovíparas', 'Son vivíparas', 'Sufren metamorfosis', 'Las aves son ovíparas y cuidan de sus huevos y polluelos.'],
      ['¿Qué son las extremidades superiores de las aves?', 'Alas', 'Aletas', 'Pezuñas', 'En las aves, las extremidades superiores son alas.'],
      // ===== Nivel 7 · Reptiles, anfibios y peces =====
      ['¿Qué cubre la piel de los reptiles?', 'Escamas', 'Pelo', 'Plumas', 'Los reptiles tienen la piel con escamas.'],
      ['¿Qué reptiles no tienen patas y se desplazan reptando?', 'Las serpientes', 'Los lagartos', 'Los cocodrilos', 'Los reptiles tienen 4 patas, excepto las serpientes, que reptan.'],
      ['¿Cuál de estos animales es un reptil?', 'La tortuga', 'La rana', 'El delfín', 'Los lagartos, las tortugas y los cocodrilos son reptiles.'],
      ['¿Cómo respiran los reptiles?', 'Por pulmones', 'Por branquias', 'Primero por branquias y luego por pulmones', 'Los reptiles tienen respiración pulmonar.'],
      ['¿Cómo es la piel de los anfibios?', 'Desnuda y húmeda', 'Con escamas', 'Con pelo', 'Los anfibios tienen la piel desnuda y húmeda.'],
      ['¿Cómo se llaman las crías de los anfibios?', 'Renacuajos', 'Alevines', 'Polluelos', 'Las crías de los anfibios son los renacuajos y viven en el agua.'],
      ['¿Cómo respiran los renacuajos?', 'Por branquias', 'Por pulmones', 'Por las patas', 'Los renacuajos respiran por branquias; los adultos, por pulmones.'],
      ['¿Cuál de estos anfibios tiene cola de adulto?', 'La salamandra', 'La rana', 'El sapo', 'Las salamandras conservan la cola; las ranas y los sapos no tienen cola.'],
      ['¿Cómo respiran los peces?', 'Por branquias', 'Por pulmones', 'Por la piel, sin ningún órgano', 'Los peces tienen respiración branquial.'],
      ['¿Cómo se llaman las crías de los peces?', 'Alevines', 'Renacuajos', 'Polluelos', 'Las crías de los peces son los alevines.'],
      // ===== Nivel 8 · La importancia de los animales =====
      ['¿Qué hacen las abejas por las plantas?', 'Transportan el polen y permiten que se reproduzcan', 'Les dan agua', 'Las abonan con sus restos', 'Insectos como las abejas permiten que las plantas se reproduzcan al transportar polen.'],
      ['¿Cómo se llama el proceso por el que los insectos transportan el polen entre las plantas?', 'Polinización', 'Metamorfosis', 'Respiración', 'La polinización permite que las plantas se reproduzcan.'],
      ['¿Qué animales consumen restos orgánicos y mantienen limpio el medio?', 'Los carroñeros', 'Los herbívoros', 'Los vivíparos', 'Los carroñeros consumen restos orgánicos y mantienen limpio el entorno.'],
      ['¿Cuáles son ejemplos de animales carroñeros?', 'Los buitres y las hienas', 'Las abejas y las mariposas', 'Los delfines y los tiburones', 'Los buitres y las hienas son carroñeros.'],
      ['¿Qué hacen las lombrices de tierra por el suelo?', 'Lo enriquecen', 'Lo polinizan', 'Lo dejan sin nutrientes', 'Las lombrices de tierra enriquecen el suelo.'],
      ['¿Qué alimentos nos proporcionan los animales?', 'Carne, leche, huevos y miel', 'Solo carne', 'Lana, seda y cuero', 'Los animales nos proporcionan alimentos directa e indirectamente: carne, leche, huevos y miel.'],
      ['¿Qué materias primas para tejidos nos dan los animales?', 'Lana y seda', 'Carne y leche', 'Miel y huevos', 'Los animales suministran materias primas textiles, como la lana y la seda.'],
      ['Además de alimentos y materias primas, ¿qué más nos dan los animales?', 'Compañía (mascotas) y ayuda en labores ganaderas o de defensa', 'Herramientas para escribir', 'Predicciones del tiempo', 'Los animales brindan compañía y auxilio en labores ganaderas o de defensa.'],
      ['¿En qué labores nos auxilian los animales?', 'Ganaderas y de defensa', 'De escritura y matemáticas', 'De construcción de casas', 'Los animales nos auxilian en labores ganaderas o de defensa.'],
      ['¿Cuál de estas es una importancia de los animales en la naturaleza?', 'La polinización', 'La metamorfosis', 'La respiración branquial', 'En la naturaleza, los animales intervienen en la polinización y en la limpieza del entorno.'],
      // ===== Nivel 9 · Compara y descubre =====
      ['¿Qué tienen en común los mamíferos, las aves y los reptiles?', 'Respiran por pulmones', 'Todos son vivíparos', 'Tienen la piel desnuda y húmeda', 'Mamíferos, aves y reptiles tienen respiración pulmonar.'],
      ['¿Qué tienen en común las aves, los reptiles, los anfibios y los peces?', 'Todos son ovíparos', 'Todos son vivíparos', 'Todos tienen pelo', 'Aves, reptiles, anfibios y peces son ovíparos.'],
      ['¿Cuál es el único grupo de vertebrados vivíparos?', 'Los mamíferos', 'Los reptiles', 'Las aves', 'Los mamíferos son vivíparos; aves, reptiles, anfibios y peces son ovíparos.'],
      ['¿Qué grupo de vertebrados sufre metamorfosis?', 'Los anfibios', 'Los peces', 'Los reptiles', 'Los anfibios son ovíparos y sufren metamorfosis.'],
      ['¿Qué dos grupos de vertebrados tienen la piel con escamas?', 'Reptiles y peces', 'Mamíferos y aves', 'Anfibios y aves', 'Los reptiles y los peces tienen la piel con escamas.'],
      ['¿Qué grupo de vertebrados puede tener el esqueleto óseo o cartilaginoso?', 'Los peces', 'Las aves', 'Los anfibios', 'El esqueleto de los peces puede ser óseo (huesos) o cartilaginoso (cartílago flexible).'],
      ['¿Qué animal tiene un esqueleto cartilaginoso?', 'El tiburón', 'El delfín', 'La salamandra', 'Las rayas y los tiburones tienen esqueleto cartilaginoso.'],
      ['Los insectos pertenecen al grupo de los…', 'Artrópodos', 'Moluscos', 'Equinodermos', 'Los insectos son los artrópodos más numerosos.'],
      ['¿Cómo son las alas de una mariposa?', 'Cuatro alas grandes con escamas de colores', 'Dos alas duras', 'Dos alas y dos balancines', 'Las mariposas tienen 4 alas grandes recubiertas de escamas de colores.'],
      ['¿Cuál es la diferencia entre ovíparos y vivíparos?', 'Los ovíparos nacen de un huevo y los vivíparos nacen directamente de la madre', 'Los ovíparos comen plantas y los vivíparos carne', 'Los ovíparos respiran por branquias y los vivíparos por pulmones', 'Ovíparos: nacen de un huevo. Vivíparos: crecen dentro del vientre materno y nacen directamente de ella.'],
      // ===== Nivel 10 · El gran reto del Reino Animal =====
      ['Un animal tiene la piel desnuda y húmeda, y de cría respira por branquias. ¿Qué es?', 'Un anfibio', 'Un reptil', 'Un pez', 'Los anfibios tienen la piel desnuda y húmeda; los renacuajos respiran por branquias y los adultos por pulmones.'],
      ['Un animal tiene pelo, nace del vientre de su madre y toma leche de las mamas. ¿Qué es?', 'Un mamífero', 'Un ave', 'Un reptil', 'Los mamíferos tienen pelo, son vivíparos y se alimentan de la leche de las mamas.'],
      ['Un animal tiene el cuerpo blando, una concha en espiral y la cabeza con tentáculos. ¿Qué es?', 'Un gasterópodo', 'Un bivalvo', 'Un cefalópodo', 'Los gasterópodos se protegen con una concha en espiral y tienen cabeza con tentáculos.'],
      ['Un animal marino tiene tentáculos con ventosas alrededor de la boca y no tiene concha. ¿Qué es?', 'Un pulpo', 'Un calamar', 'Una sepia', 'El calamar y la sepia tienen concha interna; el pulpo no tiene concha.'],
      ['Un animal tiene el cuerpo dividido en cabeza, tórax y abdomen, seis patas y dos antenas. ¿Qué es?', 'Un insecto', 'Un molusco', 'Un vertebrado', 'Estas son las características del cuerpo de un insecto.'],
      ['Un animal tiene plumas, pico duro y cuida de sus polluelos. ¿Qué es?', 'Un ave', 'Un reptil', 'Un mamífero', 'Las aves tienen plumas y pico duro, y cuidan de sus huevos y polluelos.'],
      ['Un animal tiene esqueleto de huesos, cuatro patas, piel con escamas, pone huevos y es carnívoro terrestre. ¿Qué es?', 'Un reptil', 'Un anfibio', 'Un mamífero', 'La mayoría de los reptiles son carnívoros terrestres, ovíparos, con escamas y 4 patas.'],
      ['Un animal tiene el cuerpo transparente en forma de paraguas y tentáculos urticantes. ¿Qué es?', 'Una medusa', 'Una esponja', 'Un gusano', 'Así son las medusas, invertebrados que viven en el mar.'],
      ['Un animal respira con branquias, tiene aletas y la piel con escamas. ¿Qué es?', 'Un pez', 'Un anfibio', 'Un reptil', 'Los peces tienen escamas, respiración branquial y se desplazan con aletas.'],
      ['¿Qué pasaría si desaparecieran las abejas?', 'Muchas plantas tendrían problemas para reproducirse, porque nadie transportaría su polen', 'Los suelos perderían nutrientes', 'Los carroñeros se quedarían sin comida', 'Las abejas permiten que las plantas se reproduzcan al transportar el polen (polinización).']
    ];
    const REINO_START = QUIZ.length;
    REINO.forEach(q => QUIZ.push(q));   // las preguntas del Reino Animal también salen en el Quiz de los Animales
    const QUIZ_KEY = 'owl_academy_vert_quiz';
    let quizState = { correct: 0, seen: [] };
    try {
      const v = JSON.parse(localStorage.getItem(QUIZ_KEY) || 'null');
      if (v && Number.isInteger(v.correct) && Array.isArray(v.seen)) quizState = { correct: v.correct, seen: v.seen.filter(n => Number.isInteger(n) && n >= 0 && n < QUIZ.length) };
    } catch (e) {}
    const saveQuiz = () => { try { localStorage.setItem(QUIZ_KEY, JSON.stringify(quizState)); } catch (e) {} };
    // 10 preguntas por ronda: primero las que aún no han salido; cuando se acaban, se vuelve a empezar
    function quizOrder() {
      // 7 preguntas de la guía del Reino Animal + 3 curiosidades de animales de «El mundo que nos rodea»
      const ids = [...QUIZ.keys()].filter(i => i >= REINO_START && i < REINO_START + REINO.length);
      let pool = shuffle(ids.filter(i => !quizState.seen.includes(i)));
      if (pool.length < 7) {   // se acabaron las nuevas: se vuelve a empezar con las de la guía
        quizState.seen = quizState.seen.filter(i => i < REINO_START || i >= REINO_START + REINO.length);
        pool = [...pool, ...shuffle(ids.filter(i => !pool.includes(i)))];
      }
      const extra = shuffle([...Array(QUIZ.length - EXTRA_START).keys()].map(k => EXTRA_START + k)).slice(0, 3);
      return shuffle([...pool.slice(0, 7), ...extra]);
    }

    // ---------- El mundo que nos rodea: quiz de curiosidades (3º de Primaria) ----------
    // [pregunta, respuesta correcta, incorrecta 1, incorrecta 2, explicación]
    const WORLD = [
      // --- Animales ---
      ['¿Cuál es el animal terrestre más grande?', 'El elefante africano', 'La jirafa', 'El rinoceronte', 'Un elefante africano puede pesar más de 6.000 kilos.'],
      ['¿Cuál es el animal más alto del mundo?', 'La jirafa', 'El elefante', 'El avestruz', 'Una jirafa puede medir casi 6 metros de altura.'],
      ['¿Qué animal corre más rápido en tierra?', 'El guepardo', 'El león', 'El caballo', 'El guepardo puede superar los 100 kilómetros por hora en carreras cortas.'],
      ['¿Cuántas patas tiene una araña?', 'Ocho', 'Seis', 'Diez', 'Las arañas tienen 8 patas. Por eso no son insectos: los insectos tienen 6.'],
      ['¿Cuántas patas tiene un insecto?', 'Seis', 'Cuatro', 'Ocho', 'Todos los insectos tienen 6 patas.'],
      ['¿Cuál es el animal más grande que existe en el planeta?', 'La ballena azul', 'El elefante', 'El tiburón blanco', 'La ballena azul es mayor que cualquier dinosaurio.'],
      ['¿Qué animal duerme colgado boca abajo?', 'El murciélago', 'El loro', 'El búho', 'Los murciélagos cuelgan de sus patas para descansar en las cuevas.'],
      ['¿Qué come casi todo el día el oso panda?', 'Bambú', 'Pescado', 'Zanahorias', 'Un panda puede comer más de 10 kilos de bambú al día.'],
      ['¿Qué guarda el camello en su joroba?', 'Grasa', 'Agua', 'Arena', 'La grasa le sirve de reserva de energía en el desierto.'],
      ['¿Qué animal puede cambiar de color?', 'El camaleón', 'El elefante', 'La vaca', 'El camaleón cambia de color según su estado de ánimo y la temperatura.'],
      ['¿Cómo se llama la cría de la cabra?', 'Cabrito', 'Cordero', 'Ternero', 'La cría de la oveja es el cordero y la de la vaca, el ternero.'],
      ['¿Cómo se llama la cría de la rana?', 'Renacuajo', 'Polluelo', 'Cachorro', 'El renacuajo vive en el agua y le salen las patas al crecer.'],
      ['¿Cómo se llama la cría del caballo?', 'Potro', 'Ternero', 'Cabrito', 'Una potra o un potro son los hijos de la yegua.'],
      ['¿Dónde viven los leones?', 'En la sabana africana', 'En el Polo Norte', 'En el fondo del mar', 'Los leones viven en praderas con pocos árboles llamadas sabana.'],
      ['¿Para qué usa el elefante su trompa?', 'Para beber, oler y coger cosas', 'Solo para hacer ruido', 'Para volar', 'La trompa del elefante es nariz y mano a la vez.'],
      ['¿Cuántos corazones tiene un pulpo?', 'Tres', 'Uno', 'Ocho', 'El pulpo tiene tres corazones y su sangre es azul.'],
      ['¿Qué animal vive en el Polo Norte?', 'El oso polar', 'El pingüino', 'El canguro', 'Los pingüinos viven en el sur del planeta, no en el Polo Norte.'],
      ['¿Qué ave no puede volar pero nada muy bien?', 'El pingüino', 'La paloma', 'El águila', 'Las alas del pingüino son como aletas para nadar.'],
      ['¿Qué ave no vuela pero corre muy rápido?', 'El avestruz', 'El pato', 'El flamenco', 'El avestruz es la ave más grande y puede correr a unos 70 km/h.'],
      ['¿Por qué son rosas los flamencos?', 'Por lo que comen', 'Porque se pintan', 'Porque nacen rosas', 'Comen gambas y algas pequeñas que les dan ese color.'],
      ['¿Qué insecto fabrica miel?', 'La abeja', 'La hormiga', 'La mariposa', 'Las abejas hacen la miel con el néctar de las flores.'],
      ['¿Cómo se llama la casa de las abejas?', 'Colmena', 'Madriguera', 'Hormiguero', 'En una colmena viven miles de abejas juntas.'],
      ['¿Qué forma tienen las celdas de un panal de abejas?', 'Hexágonos', 'Círculos', 'Cuadrados', 'Los hexágonos encajan sin dejar huecos y ahorran cera.'],
      ['¿Qué animal marino tiene ocho brazos?', 'El pulpo', 'El delfín', 'El tiburón', 'El pulpo tiene ocho brazos con ventosas.'],
      ['¿Cuál es el único mamífero que puede volar?', 'El murciélago', 'El loro', 'La ardilla', 'Los murciélagos son mamíferos con alas de piel.'],
      ['¿Cuántas horas al día duerme un koala?', 'Unas 20 horas', 'Unas 2 horas', 'Unas 8 horas', 'Las hojas de eucalipto le dan poca energía, así que duerme casi todo el día.'],
      ['¿Cuál es el felino más grande del mundo?', 'El tigre', 'El león', 'El gato montés', 'El tigre es el felino más grande y es el único con rayas.'],
      ['¿En qué países vive el lince ibérico?', 'En España y Portugal', 'En Egipto', 'En Canadá', 'El lince ibérico vive en la península ibérica y estuvo en peligro de extinción.'],
      ['Un animal que come tanto carne como plantas es…', 'Omnívoro', 'Herbívoro', 'Carnívoro', 'El oso y las personas somos omnívoros.'],
      ['¿Qué animal construye diques con troncos en los ríos?', 'El castor', 'El pato', 'La nutria', 'El castor corta árboles con sus dientes fuertes.'],
      ['¿Qué animal puede esconder la cabeza dentro de su caparazón?', 'La tortuga', 'El cangrejo', 'La rana', 'La tortuga mete la cabeza y las patas dentro para protegerse.'],
      ['¿Cuántos años puede vivir una tortuga gigante?', 'Más de 100 años', 'Unos 10 años', 'Unos 25 años', 'Las tortugas gigantes están entre los animales que más viven.'],
      ['¿Qué insecto brilla en la oscuridad?', 'La luciérnaga', 'La mariquita', 'El saltamontes', 'La luciérnaga produce luz en su cuerpo para comunicarse.'],
      ['¿Qué animal es muy lento y vive colgado de los árboles?', 'El perezoso', 'La liebre', 'El delfín', 'El perezoso se mueve tan despacio que le crecen algas en el pelo.'],
      ['¿Qué animal produce la seda?', 'El gusano de seda', 'La abeja', 'La hormiga', 'Con el capullo del gusano de seda se hace un hilo muy fino.'],
      ['¿De qué animal sacamos la lana?', 'De la oveja', 'De la vaca', 'De la gallina', 'La lana de la oveja se esquila y se usa para hacer ropa.'],
      ['¿En qué se convierte una oruga?', 'En una mariposa', 'En un escarabajo', 'En una hormiga', 'La oruga se encierra en una crisálida y sale convertida en mariposa.'],
      ['¿Qué animal puede volver a hacerse crecer la cola?', 'La lagartija', 'El perro', 'El gato', 'La lagartija suelta la cola para escapar y le vuelve a crecer.'],
      ['¿Qué ave simboliza la paz?', 'La paloma blanca', 'El águila', 'El búho', 'La paloma con una rama de olivo es símbolo de paz.'],
      // --- Ríos, mares y geografía ---
      ['¿Cuál es el río más largo de la península ibérica?', 'El Tajo', 'El Guadalquivir', 'El Segura', 'El Tajo nace en Teruel y desemboca en Lisboa.'],
      ['¿Qué río pasa por la ciudad de Sevilla?', 'El Guadalquivir', 'El Ebro', 'El Duero', 'El Guadalquivir es el río más importante de Andalucía.'],
      ['¿Qué río pasa por Zaragoza?', 'El Ebro', 'El Tajo', 'El Segura', 'El Ebro es el río más caudaloso de España.'],
      ['¿Qué río pasa por Madrid?', 'El Manzanares', 'El Ebro', 'El Duero', 'El Manzanares es un río pequeño que cruza la capital.'],
      ['¿Qué río pasa por París?', 'El Sena', 'El Támesis', 'El Nilo', 'El Sena cruza París y desemboca en el mar.'],
      ['¿Qué río pasa por Londres?', 'El Támesis', 'El Sena', 'El Ebro', 'El Támesis es el río más famoso de Inglaterra.'],
      ['¿Qué río pasa por Egipto y es famoso por las pirámides?', 'El Nilo', 'El Amazonas', 'El Tajo', 'El Nilo es uno de los ríos más largos del mundo.'],
      ['¿Cuál es el río con más agua del mundo?', 'El Amazonas', 'El Ebro', 'El Támesis', 'El Amazonas recorre la selva de Sudamérica y lleva muchísima agua.'],
      ['¿Cuál es el océano más grande?', 'El Pacífico', 'El Atlántico', 'El Índico', 'El océano Pacífico ocupa casi un tercio de la Tierra.'],
      ['¿Cuántos océanos hay en la Tierra?', 'Cinco', 'Tres', 'Siete', 'Son el Pacífico, el Atlántico, el Índico, el Ártico y el Antártico.'],
      ['¿En qué continente está Egipto?', 'En África', 'En Asia', 'En Europa', 'Egipto está en el norte de África.'],
      ['¿Cuál es la montaña más alta de España?', 'El Teide', 'El Mulhacén', 'El Aneto', 'El Teide es un volcán de la isla de Tenerife, con 3.715 metros.'],
      ['¿Cuál es la montaña más alta del mundo?', 'El Everest', 'El Teide', 'El Mont Blanc', 'El Everest está en el Himalaya y mide casi 8.850 metros.'],
      ['¿Qué mar baña la costa este de España?', 'El mar Mediterráneo', 'El mar Negro', 'El mar Rojo', 'El Mediterráneo baña Cataluña, Valencia, Murcia y Andalucía.'],
      ['¿Cómo se llama el mar del norte de España?', 'El mar Cantábrico', 'El mar Mediterráneo', 'El mar Muerto', 'Baña Galicia, Asturias, Cantabria y el País Vasco.'],
      ['¿Cuántas comunidades autónomas tiene España?', '17', '10', '25', 'Además hay dos ciudades autónomas: Ceuta y Melilla.'],
      ['¿Cómo se llaman las islas de España que están en el océano Atlántico?', 'Las Islas Canarias', 'Las Islas Baleares', 'Las Islas Cíes', 'Las Canarias están frente a la costa de África.'],
      ['¿Cuál es la isla más grande de las Islas Baleares?', 'Mallorca', 'Ibiza', 'Menorca', 'Mallorca es la mayor de las Baleares.'],
      ['¿Qué es una isla?', 'Tierra rodeada de agua por todas partes', 'Un río muy ancho', 'Una montaña muy alta', 'Una isla puede ser enorme, como Groenlandia, o muy pequeña.'],
      ['¿Qué es una península?', 'Tierra rodeada de agua casi por todas partes', 'Una isla muy pequeña', 'Un lago grande', 'España y Portugal forman la península ibérica.'],
      ['¿Cuál es el país más grande del mundo?', 'Rusia', 'España', 'Brasil', 'Rusia ocupa una parte de Europa y otra de Asia.'],
      ['¿Cuál es el desierto cálido más grande del mundo?', 'El Sáhara', 'El Gobi', 'El Atacama', 'El Sáhara está en el norte de África.'],
      ['¿En qué continente está el Polo Sur?', 'En la Antártida', 'En África', 'En Australia', 'La Antártida está cubierta de hielo casi todo el año.'],
      ['¿Cuál es la capital de Francia?', 'París', 'Roma', 'Madrid', 'París es famosa por la Torre Eiffel.'],
      ['¿Cuál es la capital de Italia?', 'Roma', 'París', 'Lisboa', 'En Roma está el Coliseo.'],
      ['¿Cuál es la capital de Portugal?', 'Lisboa', 'Madrid', 'Roma', 'Lisboa está junto al río Tajo, que viene de España.'],
      ['¿Cuál es la capital de Reino Unido?', 'Londres', 'París', 'Berlín', 'En Londres está el Big Ben.'],
      ['¿Qué país tiene forma de bota?', 'Italia', 'Portugal', 'Grecia', 'Si miras Italia en el mapa, parece una bota.'],
      ['¿Qué país es famoso por sus molinos y sus campos de tulipanes?', 'Países Bajos', 'Egipto', 'Australia', 'También se llama Holanda y tiene muchas bicicletas.'],
      ['¿Qué idioma se habla en Brasil?', 'Portugués', 'Español', 'Inglés', 'Brasil fue colonia de Portugal.'],
      // --- Plantas ---
      ['¿Qué necesitan las plantas para fabricar su alimento?', 'Luz del sol, agua y aire', 'Solo tierra', 'Solo música', 'Las hojas fabrican el alimento de la planta con la luz del sol.'],
      ['¿Cómo se llama el proceso por el que las plantas fabrican su alimento?', 'Fotosíntesis', 'Digestión', 'Evaporación', 'Foto significa "luz": las plantas se alimentan gracias a la luz.'],
      ['¿Qué gas sueltan las plantas que nosotros necesitamos para respirar?', 'Oxígeno', 'Humo', 'Helio', 'Las plantas limpian el aire y nos regalan oxígeno.'],
      ['¿Qué parte de la planta la sujeta a la tierra y absorbe el agua?', 'La raíz', 'La hoja', 'La flor', 'Las raíces también absorben sales minerales del suelo.'],
      ['¿Qué parte de la planta se convierte en fruto?', 'La flor', 'La raíz', 'El tallo', 'Cuando la flor se poliniza, se forma el fruto con las semillas.'],
      ['¿Qué hay dentro de un fruto?', 'Las semillas', 'Las raíces', 'El tronco', 'De las semillas pueden nacer nuevas plantas.'],
      ['¿Qué árbol da bellotas?', 'La encina', 'El pino', 'El olivo', 'Las encinas y los robles dan bellotas, la comida de los cerdos ibéricos.'],
      ['¿Qué árbol da aceitunas?', 'El olivo', 'El naranjo', 'El almendro', 'De las aceitunas se saca el aceite de oliva.'],
      ['¿Qué árbol da piñones?', 'El pino piñonero', 'El olivo', 'El abeto', 'Los piñones están dentro de las piñas.'],
      ['¿Qué fruto da la vid?', 'La uva', 'La aceituna', 'La manzana', 'Con las uvas se hace el zumo, el vino y las pasas.'],
      ['¿Qué parte de la planta es la zanahoria?', 'La raíz', 'La hoja', 'El fruto', 'La zanahoria es una raíz que crece bajo la tierra.'],
      ['¿Qué parte de la planta comemos en la lechuga?', 'Las hojas', 'Las raíces', 'Las flores', 'Comemos sus hojas verdes.'],
      ['El tomate, ¿qué es?', 'Un fruto', 'Una raíz', 'Una hoja', 'El tomate tiene semillas dentro, por eso es un fruto.'],
      ['¿De qué planta se saca el chocolate?', 'Del cacao', 'Del trigo', 'De la caña', 'Las semillas del cacao se tuestan y se muelen para hacer chocolate.'],
      ['¿De qué planta se saca el azúcar?', 'De la caña de azúcar', 'Del maíz', 'Del trigo', 'También se saca azúcar de la remolacha.'],
      ['¿Qué planta guarda agua en su tallo para vivir en el desierto?', 'El cactus', 'El helecho', 'El girasol', 'Las espinas del cactus son sus hojas transformadas.'],
      ['¿Qué planta atrapa insectos?', 'La dionea', 'El cactus', 'La rosa', 'La dionea cierra sus hojas como una trampa.'],
      ['¿Qué árbol es de los más altos del mundo, con más de 100 metros?', 'La secuoya', 'El pino', 'El olivo', 'Las secuoyas viven en California y pueden vivir miles de años.'],
      ['¿Qué hacen los árboles de hoja caduca en otoño?', 'Pierden las hojas', 'Les salen flores', 'Se hacen más pequeños', 'Se preparan para el invierno sin hojas.'],
      ['¿Cuál de estos árboles mantiene sus hojas todo el año?', 'El pino', 'El chopo', 'El castaño', 'Los pinos son de hoja perenne: siempre verdes.'],
      ['¿Qué hacen las abejas en las flores?', 'Recogen néctar y polen', 'Las pintan', 'Duermen', 'Al viajar de flor en flor ayudan a que haya frutos.'],
      ['¿Hacia dónde gira el girasol?', 'Hacia la luz del sol', 'Hacia la sombra', 'Hacia el norte siempre', 'Las flores jóvenes siguen al sol durante el día.'],
      // --- Lugares y monumentos ---
      ['¿En qué país está la Torre Eiffel?', 'En Francia', 'En Italia', 'En España', 'La Torre Eiffel está en París.'],
      ['¿En qué país está la Gran Muralla?', 'En China', 'En Japón', 'En Egipto', 'La Gran Muralla china mide miles de kilómetros.'],
      ['¿En qué país están las pirámides de Giza?', 'En Egipto', 'En México', 'En Grecia', 'Las pirámides de Giza tienen más de 4.000 años.'],
      ['¿En qué ciudad está el Coliseo?', 'En Roma', 'En Atenas', 'En París', 'En el Coliseo romano luchaban los gladiadores.'],
      ['¿Qué país regaló la Estatua de la Libertad a Estados Unidos?', 'Francia', 'España', 'Alemania', 'Está en Nueva York.'],
      ['¿En qué ciudad está la Sagrada Familia?', 'En Barcelona', 'En Sevilla', 'En Madrid', 'La diseñó el arquitecto Antoni Gaudí.'],
      ['¿En qué ciudad española está la Alhambra?', 'En Granada', 'En Burgos', 'En Valencia', 'La Alhambra es un palacio y fortaleza árabe.'],
      ['¿Quién construyó el acueducto de Segovia?', 'Los romanos', 'Los dinosaurios', 'Los vikingos', 'Lo hicieron hace unos 2.000 años para llevar agua a la ciudad.'],
      ['¿En qué país están las ruinas de Machu Picchu?', 'En Perú', 'En España', 'En Egipto', 'Es una ciudad inca en lo alto de los Andes.'],
      ['¿En qué ciudad está el Big Ben?', 'En Londres', 'En París', 'En Madrid', 'El Big Ben es la campana de una torre con un gran reloj.'],
      ['¿En qué país está el Taj Mahal?', 'En la India', 'En Egipto', 'En México', 'El Taj Mahal es un palacio de mármol blanco.'],
      ['¿A qué ciudad llega el Camino de Santiago?', 'A Santiago de Compostela', 'A Valencia', 'A Toledo', 'Santiago de Compostela está en Galicia.'],
      ['¿En qué isla está el Parque Nacional del Teide?', 'En Tenerife', 'En Mallorca', 'En Ibiza', 'El Teide es un volcán que se ve desde muy lejos.'],
      ['¿En qué ciudad está el Museo del Prado?', 'En Madrid', 'En Barcelona', 'En Bilbao', 'En el Prado se guardan cuadros de Velázquez y Goya.'],
      ['¿En qué país está el monte Fuji?', 'En Japón', 'En Egipto', 'En Perú', 'El Fuji es un volcán nevado, símbolo de Japón.'],
      ['¿Qué ciudad italiana tiene una torre inclinada famosa?', 'Pisa', 'Roma', 'Venecia', 'La torre de Pisa se inclina porque el suelo cedió.'],
      ['¿Qué ciudad italiana tiene calles de agua llamadas canales?', 'Venecia', 'Roma', 'Milán', 'En Venecia se viaja en barcos llamados góndolas.'],
      ['¿Dónde está la Gran Barrera de Coral?', 'En Australia', 'En España', 'En Canadá', 'Es el arrecife de coral más grande del mundo.'],
      ['¿En qué país viven los canguros?', 'En Australia', 'En Brasil', 'En Marruecos', 'Los canguros llevan a sus crías en una bolsa.'],
      ['¿En qué país viven los pandas gigantes?', 'En China', 'En Kenia', 'En Argentina', 'Los pandas viven en los bosques de bambú de China.'],
      ['¿En qué ciudad española está la Mezquita-Catedral?', 'En Córdoba', 'En Salamanca', 'En Oviedo', 'Tiene un famoso bosque de columnas con arcos rojos y blancos.'],
      // --- La Tierra, el cielo y el planeta ---
      ['¿Cuál es el planeta más grande del Sistema Solar?', 'Júpiter', 'Marte', 'La Tierra', 'Júpiter es tan grande que cabrían más de mil Tierras dentro.'],
      ['¿Cuál es el planeta más cercano al Sol?', 'Mercurio', 'Marte', 'Neptuno', 'Mercurio es pequeño y muy caliente de día.'],
      ['¿Qué planeta se conoce como el planeta rojo?', 'Marte', 'Venus', 'Saturno', 'Marte es rojizo por el óxido de su suelo.'],
      ['¿Qué planeta tiene unos anillos muy famosos?', 'Saturno', 'Marte', 'Mercurio', 'Los anillos de Saturno son de hielo y roca.'],
      ['¿Qué es el Sol?', 'Una estrella', 'Un planeta', 'Un satélite', 'El Sol es la estrella más cercana a la Tierra.'],
      ['¿Cuántos planetas tiene el Sistema Solar?', 'Ocho', 'Nueve', 'Cinco', 'Son Mercurio, Venus, Tierra, Marte, Júpiter, Saturno, Urano y Neptuno.'],
      ['¿Qué es la Luna?', 'El satélite natural de la Tierra', 'Una estrella', 'Un planeta', 'La Luna da vueltas alrededor de la Tierra.'],
      ['¿Cuánto tarda la Tierra en dar una vuelta al Sol?', 'Un año', 'Un día', 'Un mes', 'Son 365 días y unas 6 horas, por eso hay un año bisiesto cada cuatro años.'],
      ['¿Cuánto tarda la Tierra en girar sobre sí misma?', 'Un día', 'Un año', 'Una semana', 'Por eso hay día y noche: unas 24 horas.'],
      ['¿Quién fue la primera persona que pisó la Luna?', 'Neil Armstrong', 'Cristóbal Colón', 'Yuri Gagarin', 'Fue en el año 1969.'],
      ['¿Cuántos colores tiene el arcoíris?', 'Siete', 'Cinco', 'Diez', 'Rojo, naranja, amarillo, verde, azul, añil y violeta.'],
      ['¿Qué cubre la mayor parte de la superficie de la Tierra?', 'El agua', 'La arena', 'El hielo', 'Los océanos cubren más de dos tercios del planeta.'],
      ['¿Qué pasa cuando el sol calienta el agua del mar?', 'Se evapora y sube al cielo', 'Se convierte en piedra', 'Se vuelve dulce', 'El vapor forma las nubes y después llueve: es el ciclo del agua.'],
      ['¿Cómo se llama el agua cuando está congelada?', 'Hielo', 'Vapor', 'Niebla', 'El agua se congela a 0 grados.'],
      ['¿A cuántos grados hierve el agua?', 'A 100 grados', 'A 50 grados', 'A 0 grados', 'A 100 grados el agua hierve y se convierte en vapor.'],
      ['¿Qué aparato sirve para medir la temperatura?', 'El termómetro', 'El reloj', 'La brújula', 'La brújula, en cambio, señala el norte.'],
      ['¿Qué energía producen los molinos modernos llamados aerogeneradores?', 'Energía del viento (eólica)', 'Energía del sol', 'Energía del agua', 'La energía eólica es limpia y no se acaba.'],
      ['¿Qué energía producen las placas de los tejados que miran al sol?', 'Energía solar', 'Energía eólica', 'Energía del carbón', 'Las placas solares convierten la luz en electricidad.'],
      ['¿De qué color es el contenedor del papel y el cartón?', 'Azul', 'Amarillo', 'Verde', 'El amarillo es para envases y el verde para el vidrio.'],
      ['¿De qué color es el contenedor del vidrio?', 'Verde', 'Azul', 'Amarillo', 'Las botellas y los tarros de cristal van al contenedor verde.'],
      ['¿A qué contenedor van las latas y las botellas de plástico?', 'Al amarillo', 'Al azul', 'Al verde', 'Los envases de plástico, latas y briks van al contenedor amarillo.'],
      ['¿Qué es un volcán?', 'Una montaña por donde sale lava', 'Un río subterráneo', 'Una nube grande', 'La lava es roca derretida que sale del interior de la Tierra.'],
      ['¿Qué es un terremoto?', 'Un temblor del suelo', 'Una tormenta de viento', 'Una ola gigante', 'El suelo se mueve porque las placas de la Tierra chocan.'],
      ['¿Qué estación del año viene después del invierno?', 'La primavera', 'El verano', 'El otoño', 'Las estaciones son primavera, verano, otoño e invierno.'],
      // --- Curiosidades ---
      ['¿Cuántos días tiene un año bisiesto?', '366 días', '365 días', '360 días', 'El día extra es el 29 de febrero.'],
      ['¿Cada cuántos años hay un año bisiesto?', 'Cada cuatro años', 'Cada dos años', 'Cada diez años', 'Así se ajusta el calendario con lo que tarda la Tierra en dar la vuelta al Sol.'],
      ['¿Qué alimento fabrican las abejas y puede conservarse durante miles de años?', 'La miel', 'El queso', 'El pan', 'Se han encontrado tarros de miel de Egipto que aún se podían comer.'],
      ['¿Qué hacen los osos pardos durante el invierno?', 'Duermen mucho tiempo (hibernan)', 'Nadan en el mar', 'Vuelan al sur', 'Hibernar es dormir mucho para ahorrar energía cuando hace frío.'],
      ['¿Qué fruta tiene las semillas por fuera?', 'La fresa', 'La manzana', 'La naranja', 'Los puntitos de la fresa son los verdaderos frutos pequeñitos.'],
      ['¿Qué animal puede dormir de pie?', 'El caballo', 'El gato', 'El delfín', 'Los caballos tienen unos músculos que les ayudan a no caerse.'],
      ['¿Qué animal tiene una lengua muy larga y azulada que usa para alcanzar las hojas?', 'La jirafa', 'El cerdo', 'La cebra', 'La lengua de la jirafa mide unos 45 centímetros.'],
      ['¿De qué se alimentan las ballenas azules, las más grandes del mundo?', 'De bichitos muy pequeños llamados krill', 'De tiburones', 'De plantas', 'Pueden tragar millones de krill cada día.'],
      ['¿Cuál es el órgano que usan los peces para respirar en el agua?', 'Las branquias', 'Los pulmones', 'La nariz', 'Las branquias sacan el oxígeno que hay en el agua.'],
      ['¿Qué animal es el mayor de los reptiles?', 'El cocodrilo marino', 'La tortuga', 'El lagarto', 'El cocodrilo marino puede medir más de 5 metros.'],
      ['¿Qué hacen las hormigas para avisarse de dónde hay comida?', 'Dejan un rastro con olor', 'Silban', 'Dibujan en el suelo', 'Las demás hormigas siguen ese rastro hasta la comida.'],
      ['¿Por qué se oye el trueno después de ver el relámpago?', 'Porque la luz viaja más rápido que el sonido', 'Porque el trueno va más rápido', 'Porque el cielo está lejos', 'La luz llega casi al instante y el sonido tarda más.'],
      ['¿Qué animal vive en la sabana y tiene una melena?', 'El león macho', 'La cebra', 'El elefante', 'Solo los leones machos tienen melena.'],
      ['¿Qué pasa con el agua del mar cuando se evapora?', 'La sal se queda', 'Se lleva la sal', 'Se vuelve azul', 'Por eso se hacen salinas: el agua se evapora y queda la sal.']
    ];
    const EXTRA_START = QUIZ.length;   // curiosidades de animales de «El mundo que nos rodea» que amplían el Quiz de los Animales
    WORLD.slice(0, 39).forEach(q => QUIZ.push(q));
    const WORLD_KEY = 'owl_academy_world_quiz';
    let worldState = { correct: 0, seen: [] };
    try {
      const v = JSON.parse(localStorage.getItem(WORLD_KEY) || 'null');
      if (v && Number.isInteger(v.correct) && Array.isArray(v.seen)) worldState = { correct: v.correct, seen: v.seen.filter(n => Number.isInteger(n) && n >= 0 && n < WORLD.length) };
    } catch (e) {}
    const saveWorld = () => { try { localStorage.setItem(WORLD_KEY, JSON.stringify(worldState)); } catch (e) {} };
    function worldOrder() {
      let pool = shuffle([...WORLD.keys()].filter(i => !worldState.seen.includes(i)));
      if (pool.length >= 10) return pool.slice(0, 10);
      const rest = shuffle([...WORLD.keys()].filter(i => !pool.includes(i)));
      worldState.seen = [];
      return [...pool, ...rest].slice(0, 10);
    }

    // ---------- El Valle de los Dragones (Conocimiento del Medio) ----------
    const $ = id => document.getElementById(id);
    const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
    const shuffle = arr => { const r = [...arr]; for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; };
    const MATES = { radio: 'cubito', cubito: 'radio', tibia: 'perone', perone: 'tibia',
      abdominales: 'oblicuos', oblicuos: 'abdominales', tibial: 'gemelos', gemelos: 'tibial', trapecio: 'deltoides', deltoides: 'trapecio', biceps: 'antebrazo', antebrazo: 'biceps' };
    const KINDS = {
      bone: { list: BONES, by: BONE_BY_ID, svg: skeletonSvg, icon: '🦴', noun: 'hueso', plural: 'huesos', title: '🦴 ¿Dónde está el hueso?', inst: 'Toca el hueso que se llama:', end: '🐉🏆🦴', wise: '¡Dragón sabio de los huesos!' },
      musc: { list: MUSCLES, by: MUSC_BY_ID, svg: muscleSvg, icon: '💪', noun: 'músculo', plural: 'músculos', title: '💪 ¿Dónde está el músculo?', inst: 'Toca el músculo que se llama:', end: '🐉🏆💪', wise: '¡Dragón sabio de los músculos!' }
    };
    KINDS.vert = { list: ANIMALS, by: ANIMAL_BY_ID, plural: 'animales', title: '🐾 ¿Vertebrado o invertebrado?', inst: 'Mira el animal y elige:', end: '🐉🏆🐾', wise: '¡Dragón sabio de los animales!' };
    KINDS.quiz = { plural: 'preguntas', title: '🧠 Quiz de los animales', inst: '', end: '🐉🏆🧠', wise: '¡Dragón sabio de los animales!' };
    KINDS.world = { plural: 'preguntas', title: '🌍 ¡Explora el mundo!', inst: '', end: '🐉🏆🌍', wise: '¡Dragón explorador del mundo!' };
    const K = () => KINDS[app.dr.kind || 'bone'];
    const isQ = k => k === 'quiz' || k === 'world';
    const QS = () => app.dr.kind === 'world' ? WORLD : QUIZ;
    const QST = () => app.dr.kind === 'world' ? worldState : quizState;
    const QSAVE = () => app.dr.kind === 'world' ? saveWorld() : saveQuiz();
    const TOTAL = 10;
    const PRAISE = ['¡Roarrr! ¡Muy bien!', '¡Dragón sabio! ¡Correcto!', '¡Eres un dragón muy sabio!', '¡Fuego de alegría! ¡Perfecto!'];

    // Colección de premios para la galería de la Academia
    const DRAGON_KEY = 'owl_academy_dragon_prizes';
    let dragonHave = [];
    try { const v = JSON.parse(localStorage.getItem(DRAGON_KEY) || '[]'); if (Array.isArray(v)) dragonHave = v.filter(n => Number.isInteger(n) && n >= 0 && n < DRAGONS.length); } catch (e) {}
    if (window.NUBLO_COLLECTIONS) {
      window.NUBLO_COLLECTIONS.dragons = { title: '🐉 Dragones del Valle', items: DRAGONS, anim: DRAGONS_ANIM, names: DRAGON_NAMES, key: DRAGON_KEY, cols: 4, have: dragonHave };
    }

    document.querySelectorAll('img[data-dragon]').forEach(img => {
      const i = Number(img.dataset.dragon) % DRAGONS.length;
      img.src = img.classList.contains('ck-mascot') ? DRAGONS_ANIM[DRAGONS.length - 1] : DRAGONS[i];   // el dragón de la mascota mueve la colita
    });

    function showOnly(id) {
      document.querySelectorAll('[id^="screen-"]').forEach(el => el.classList.add('hidden'));
      $(id).classList.remove('hidden');
      document.body.classList.remove('santa-theme', 'letter-theme', 'chick-theme', 'dragon-theme');
      document.body.classList.add('dragon-theme');
      window.scrollTo({ top: 0 });
    }
    const stopVoice = () => { try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) {} };

    function dropDragons(n = 2) {
      for (let k = 0; k < n; k++) window.setTimeout(() => {
        const img = document.createElement('img');
        img.className = 'ck-drop'; img.alt = 'Dragoncito celebrando';
        img.src = DRAGONS[rnd(0, DRAGONS.length - 1)];
        img.style.left = (4 + Math.random() * 74) + 'vw';
        document.body.appendChild(img);
        img.addEventListener('animationend', () => img.remove(), { once: true });
      }, k * 420);
    }
    function dropSparks() {
      ['🔥', '⭐', '💎', '🐉', '✨'].slice(0, 2 + rnd(0, 3)).forEach((sym, i) => {
        const el = document.createElement('div'); el.className = 'garland-drop'; el.textContent = sym;
        el.style.left = (8 + Math.random() * 82) + 'vw'; el.style.animationDelay = (i * .12) + 's';
        document.body.appendChild(el); el.addEventListener('animationend', () => el.remove(), { once: true });
      });
    }
    function mood(happy) {
      const m = $('dr-mascot'); if (!m) return;
      m.classList.remove('ck-celebrate', 'ck-sad'); void m.offsetWidth;
      m.classList.add(happy ? 'ck-celebrate' : 'ck-sad');
      window.setTimeout(() => m.classList.remove('ck-celebrate', 'ck-sad'), 2200);
      if (happy) {
        dropDragons(2); dropSparks();
        if (typeof confetti === 'function') confetti({ particleCount: 90, spread: 75, origin: { y: .55 }, colors: ['#8B5CF6', '#2DD4BF', '#F59E0B', '#F472B6', '#38BDF8'] });
      }
    }

    Object.assign(app, {
      dr: {},
      enterDragonAdventure() { app.currentSectionKey = null; app.openDragonMenu(); },
      openDragonMenu() { stopVoice(); showOnly('screen-dr-menu'); $('dr-soon-note').classList.add('hidden'); app.updateSharedRewards(); },
      showDragonSoon() { const n = $('dr-soon-note'); n.classList.remove('hidden'); n.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); },
      openVertMenu() { stopVoice(); showOnly('screen-dr-vert-menu'); app.updateSharedRewards(); },
      startVertGame() { app.startBoneGame('vert'); },
      startQuizGame() { app.startBoneGame('quiz'); },
      startWorldGame() { app.startBoneGame('world'); },
      openWorldMenu() { stopVoice(); showOnly('screen-dr-world-menu'); app.updateSharedRewards(); },
      loadQuizRound() {
        const d = app.dr, Q = QS()[d.target];
        if (!QST().seen.includes(d.target)) { QST().seen.push(d.target); QSAVE(); }
        $('dr-counter').textContent = `Pregunta ${d.i + 1} de ${d.total}`;
        $('dr-progress').style.width = `${(d.i / d.total) * 100}%`;
        { const k = d.dragons[d.i % DRAGONS.length]; $('dr-mascot').src = DRAGONS_ANIM[k] || DRAGONS[k]; }
        const fb = $('dr-feedback'); fb.className = 'hidden feedback-box'; fb.innerHTML = '';
        ['dr-next', 'dr-again'].forEach(id => $(id).classList.add('hidden'));
        $('dr-title').textContent = K().title; $('dr-instruction').textContent = '';
        $('dr-name-row').classList.add('hidden'); $('dr-skel-card').classList.add('hidden');
        $('dr-quiz-card').classList.remove('hidden');
        $('dr-quiz-q').textContent = Q[0];
        $('dr-quiz-meter').textContent = `🐉 Aciertos en esta ronda: ${d.score} · con 8 de 10 ganas un dragoncito`;
        const opts = shuffle([0, 1, 2]);
        $('dr-quiz-opts').innerHTML = opts.map(o => `<button class="dr-q-btn" data-o="${o}">${Q[o + 1]}</button>`).join('');
        $('dr-quiz-opts').querySelectorAll('.dr-q-btn').forEach(b => b.addEventListener('click', () => app.quizAnswer(Number(b.dataset.o))));
        window.setTimeout(() => app.speakBone(), 250);
      },
      quizAnswer(o) {
        const d = app.dr; if (d.answered) return; d.answered = true;
        const Q = QS()[d.target], ok = o === 0;
        $('dr-quiz-opts').querySelectorAll('.dr-q-btn').forEach(b => {
          b.classList.add('done');
          if (b.dataset.o === '0') b.classList.add('right'); else if (Number(b.dataset.o) === o) b.classList.add('wrong');
        });
        const fb = $('dr-feedback'); fb.classList.remove('hidden');
        if (ok) {
          d.score++; QST().correct++; QSAVE(); app.awardSharedReward(1);
          fb.className = 'feedback-box feedback-correct';
          fb.innerHTML = `<div style="font-size:2.2rem;">🐉🎉🔥</div><h3>${PRAISE[rnd(0, PRAISE.length - 1)]}</h3><p style="font-size:.95rem;">${Q[4]}</p>`;
          mood(true);
        } else {
          fb.className = 'feedback-box feedback-wrong';
          fb.innerHTML = `<div style="font-size:2rem;">🐲💡</div><h3>¡Casi, dragoncito! Vamos a aprenderlo</h3><p style="margin-top:6px;">✅ La respuesta correcta es: <b>${Q[1]}</b>.</p><p style="margin-top:6px;">${Q[4]}</p>`;
          mood(false);
        }
        $('dr-quiz-meter').textContent = `🐉 Aciertos en esta ronda: ${d.score} · con 8 de 10 ganas un dragoncito`;
        $('dr-next').textContent = d.i + 1 >= d.total ? 'Ver mi resultado 🏆' : 'Siguiente pregunta ➡️';
        $('dr-next').classList.remove('hidden');
        fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      },
      startMuscleGame() { app.startBoneGame('musc'); },
      restartDragonGame() { app.startBoneGame(app.dr.kind || 'bone'); },

      backFromGame() { const k = app.dr && app.dr.kind; if (k === 'world') app.openWorldMenu(); else app.openDragonMenu(); },

      startBoneGame(kind) {
        kind = kind === 'musc' || kind === 'vert' || kind === 'quiz' || kind === 'world' ? kind : 'bone';
        app.dr = { kind, i: 0, total: TOTAL, score: 0, answered: false, order: kind === 'vert' ? vertOrder() : kind === 'quiz' ? quizOrder() : kind === 'world' ? worldOrder() : shuffle(KINDS[kind].list.map(b => b.id)).slice(0, TOTAL), dragons: shuffle([...Array(DRAGONS.length).keys()]) };
        showOnly('screen-dr-game');
        app.loadBoneRound();
      },

      loadBoneRound() {
        const d = app.dr; d.answered = false;
        d.target = d.order[d.i];
        $('dr-vert-card').classList.add('hidden'); $('dr-quiz-card').classList.add('hidden');
        if (d.kind === 'vert') return app.loadVertRound();
        if (isQ(d.kind)) return app.loadQuizRound();
        // 2 distractores: nunca el "compañero" del hueso (radio/cúbito, tibia/peroné) para no confundir al tocar
        const pool = shuffle(K().list.map(b => b.id).filter(id => id !== d.target && id !== MATES[d.target]));
        const c1 = pool[0], c2 = pool.find(id => id !== c1 && id !== MATES[c1]);
        d.cands = shuffle([d.target, c1, c2]);
        $('dr-counter').textContent = `Reto ${d.i + 1} de ${d.total}`;
        $('dr-progress').style.width = `${(d.i / d.total) * 100}%`;
        { const k = d.dragons[d.i % DRAGONS.length]; $('dr-mascot').src = DRAGONS_ANIM[k] || DRAGONS[k]; }
        { const nm = K().by[d.target].name; $('dr-name').textContent = nm.charAt(0).toUpperCase() + nm.slice(1); }
        const fb = $('dr-feedback'); fb.className = 'hidden feedback-box'; fb.innerHTML = '';
        ['dr-next', 'dr-again'].forEach(id => $(id).classList.add('hidden'));
        $('dr-next').textContent = 'Siguiente reto ➡️';
        $('dr-title').textContent = K().title;
        $('dr-instruction').textContent = K().inst;
        $('dr-name-row').classList.remove('hidden'); $('dr-skel-card').classList.remove('hidden');
        $('dr-skel-wrap').innerHTML = K().svg(d.cands);
        $('dr-skel-wrap').querySelectorAll('.bone.cand').forEach(g => {
          g.addEventListener('click', () => app.boneAnswer(g.dataset.b));
        });
        window.setTimeout(() => app.speakBone(), 250);
      },

      loadVertRound() {
        const d = app.dr, A = ANIMAL_BY_ID[d.target];
        $('dr-counter').textContent = `Reto ${d.i + 1} de ${d.total}`;
        $('dr-progress').style.width = `${(d.i / d.total) * 100}%`;
        { const k = d.dragons[d.i % DRAGONS.length]; $('dr-mascot').src = DRAGONS_ANIM[k] || DRAGONS[k]; }
        $('dr-name').textContent = A.name.charAt(0).toUpperCase() + A.name.slice(1);
        const fb = $('dr-feedback'); fb.className = 'hidden feedback-box'; fb.innerHTML = '';
        ['dr-next', 'dr-again'].forEach(id => $(id).classList.add('hidden'));
        $('dr-title').textContent = K().title; $('dr-instruction').textContent = K().inst;
        $('dr-name-row').classList.remove('hidden'); $('dr-skel-card').classList.add('hidden');
        $('dr-vert-card').classList.remove('hidden');
        $('dr-vert-emoji').textContent = A.e;
        $('dr-vert-card').querySelectorAll('.dr-vert-btn').forEach(b => b.className = 'dr-vert-btn ' + (b.dataset.a === 'v' ? 'v' : 'i'));
        window.setTimeout(() => app.speakBone(), 250);
      },

      vertAnswer(a) {
        const d = app.dr; if (d.answered) return; d.answered = true;
        const A = ANIMAL_BY_ID[d.target], right = A.v ? 'v' : 'i', ok = a === right;
        $('dr-vert-card').querySelectorAll('.dr-vert-btn').forEach(b => {
          b.classList.add('done');
          if (b.dataset.a === right) b.classList.add('right'); else if (b.dataset.a === a) b.classList.add('wrong');
        });
        const fb = $('dr-feedback'); fb.classList.remove('hidden');
        const label = A.v ? 'vertebrado' : 'invertebrado';
        if (ok) {
          d.score++; app.awardSharedReward(1);
          fb.className = 'feedback-box feedback-correct';
          fb.innerHTML = `<div style="font-size:2.2rem;">🐉🎉🔥</div><h3>${PRAISE[rnd(0, PRAISE.length - 1)]}</h3><p>${A.name.charAt(0).toUpperCase() + A.name.slice(1)} es un <b>${label}</b>.</p><p style="font-size:.92rem;margin-top:6px;">${A.info}</p>`;
          mood(true);
        } else {
          fb.className = 'feedback-box feedback-wrong';
          fb.innerHTML = `<div style="font-size:2rem;">🐲💡</div><h3>¡Casi, dragoncito! Vamos a aprenderlo</h3><p style="margin-top:6px;">${A.name.charAt(0).toUpperCase() + A.name.slice(1)} es un <b>${label}</b> (en verde).</p><p style="margin-top:6px;">${A.info}</p>`;
          mood(false);
        }
        $('dr-next').textContent = d.i + 1 >= d.total ? 'Ver mi premio 🏆' : 'Siguiente reto ➡️';
        $('dr-next').classList.remove('hidden');
        fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      },

      speakBone() {
        const d = app.dr; if (!window.speechSynthesis || !d.target) return;
        stopVoice();
        const u = new SpeechSynthesisUtterance(isQ(d.kind) ? QS()[d.target][0] : d.kind === 'vert' ? `${K().by[d.target].name}. ¿Vertebrado o invertebrado?` : `Toca ${K().by[d.target].name}.`); u.lang = 'es-ES'; u.rate = .88;
        window.speechSynthesis.speak(u);
      },

      boneAnswer(id) {
        const d = app.dr; if (d.answered) return; d.answered = true;
        const ok = id === d.target, svg = $('dr-skel');
        svg.classList.add('answered');
        const badge = (g, good) => {
          const b = g.getBBox(), cx = b.x + b.width / 2, cy = b.y + b.height / 2;
          const el = document.createElementNS('http://www.w3.org/2000/svg', 'g');
          el.setAttribute('class', 'dr-badge');
          el.innerHTML = `<circle cx="${cx}" cy="${cy}" r="13" fill="${good ? '#16A34A' : '#DC2626'}" stroke="#fff" stroke-width="3"/><text x="${cx}" y="${cy + 5.5}" text-anchor="middle" font-size="16" font-weight="700" fill="#fff" font-family="Arial">${good ? '✓' : '✕'}</text>`;
          svg.appendChild(el);
        };
        svg.querySelectorAll('.bone').forEach(g => {
          g.classList.remove('cand');
          if (g.dataset.b === d.target) { g.classList.add('right'); badge(g, true); }
          else if (!ok && g.dataset.b === id) { g.classList.add('wrong'); badge(g, false); }
        });
        const T = K().by[d.target], W = K().by[id];
        const fb = $('dr-feedback'); fb.classList.remove('hidden');
        if (ok) {
          d.score++; app.awardSharedReward(1);
          fb.className = 'feedback-box feedback-correct';
          fb.innerHTML = `<div style="font-size:2.2rem;">🐉🎉🔥</div><h3>${PRAISE[rnd(0, PRAISE.length - 1)]}</h3><p>Has tocado <b>${T.name}</b>.</p><p style="font-size:.92rem;margin-top:6px;">${T.info}</p>`;
          mood(true);
        } else {
          fb.className = 'feedback-box feedback-wrong';
          fb.innerHTML = `<div style="font-size:2rem;">🐲💡</div><h3>¡Casi, dragoncito! Vamos a aprenderlo</h3>
            <p style="margin-top:6px;">❌ Has tocado <b>${W.name}</b> (en rojo): ${W.info}</p>
            <p style="margin-top:6px;">✅ <b>${T.name.charAt(0).toUpperCase() + T.name.slice(1)}</b> (en verde): ${T.info}</p>`;
          mood(false);
        }
        $('dr-next').textContent = d.i + 1 >= d.total ? 'Ver mi premio 🏆' : 'Siguiente reto ➡️';
        $('dr-next').classList.remove('hidden');
        fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      },

      nextBone() {
        const d = app.dr; d.i++;
        if (d.i < d.total) { app.loadBoneRound(); return; }
        $('dr-progress').style.width = '100%'; $('dr-counter').textContent = 'Fin';
        $('dr-name-row').classList.add('hidden'); $('dr-skel-card').classList.add('hidden'); $('dr-vert-card').classList.add('hidden'); $('dr-quiz-card').classList.add('hidden');
        $('dr-next').classList.add('hidden'); $('dr-again').classList.remove('hidden');
        $('dr-instruction').textContent = ''; $('dr-title').textContent = '🐉 ¡Fin del reto!';
        const pct = d.score / d.total;
        const title = pct >= .9 ? K().wise : pct >= .6 ? '¡Muy buen trabajo, dragoncito!' : '¡Sigue practicando, dragoncito valiente!';
        const fb = $('dr-feedback'); fb.className = 'feedback-box feedback-correct';
        fb.innerHTML = `<div style="font-size:2.6rem;">${K().end}</div><h3>${title}</h3><p>Has acertado ${d.score} de ${d.total} ${K().plural}.</p><p style="font-size:.92rem;margin-top:6px;">¡Cada acierto te ha dado una estrella! ⭐</p>`;
        if (pct >= .8) fb.innerHTML += app.prizeBoxHtml(app.awardPrize('dragons'), 'dr-prize');
        mood(true); dropDragons(4);
        fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });

    // ---------- El Reino Animal: niveles de 10 preguntas (se juegan con el mismo quiz de siempre) ----------
    const REINO_KEY = 'owl_academy_reino_v1', REINO_NEED = 8;
    let reino = { best: {} };
    try { const v = JSON.parse(localStorage.getItem(REINO_KEY) || 'null'); if (v && v.best && typeof v.best === 'object') reino = { best: v.best }; } catch (e) {}
    const saveReino = () => { try { localStorage.setItem(REINO_KEY, JSON.stringify(reino)); } catch (e) {} };
    const reinoOpen = () => { let n = 1; while (n < REINO_LEVELS.length && (reino.best[n] || 0) >= REINO_NEED) n++; return n; };   // último nivel disponible
    Object.assign(app, {
      openReinoMenu() {
        stopVoice(); showOnly('screen-dr-reino-menu');
        const open = reinoOpen(), done = REINO_LEVELS.filter((_, i) => (reino.best[i + 1] || 0) >= REINO_NEED).length;
        $('rn-sub').textContent = done >= REINO_LEVELS.length ? '🏆 ¡Has superado los 10 niveles! Eres un dragón sabio del Reino Animal.' : `Niveles superados: ${done} de ${REINO_LEVELS.length}. Saca ${REINO_NEED} de 10 para abrir el siguiente.`;
        $('rn-levels').innerHTML = REINO_LEVELS.map((name, i) => {
          const n = i + 1, b = reino.best[n], ok = (b || 0) >= REINO_NEED, lock = n > open;
          return `<button class="rn-lv ${ok ? 'done' : ''} ${lock ? 'lock' : ''}" ${lock ? 'disabled' : `onclick="app.startReinoLevel(${n})"`}><b>${lock ? '🔒' : ok ? '✅' : '🐉'} Nivel ${n}</b><small>${name}</small><small>${lock ? 'Bloqueado' : b != null ? 'Mejor: ' + b + ' de 10' : '¡A jugar!'}</small></button>`;
        }).join('');
        app.updateSharedRewards();
      },
      startReinoLevel(n) {
        if (n < 1 || n > REINO_LEVELS.length || n > reinoOpen()) return app.openReinoMenu();
        const first = REINO_START + (n - 1) * 10;
        app.dr = { kind: 'quiz', reino: n, i: 0, total: 10, score: 0, answered: false, order: shuffle([...Array(10).keys()].map(k => first + k)), dragons: shuffle([...Array(DRAGONS.length).keys()]) };
        showOnly('screen-dr-game'); app.loadBoneRound();
      }
    });
    const reinoMeter = () => { const d = app.dr; if (d && d.reino) { $('dr-counter').textContent = `Nivel ${d.reino} · Pregunta ${Math.min(d.i + 1, d.total)} de ${d.total}`; $('dr-quiz-meter').textContent = `🐉 Aciertos en este nivel: ${d.score} · con ${REINO_NEED} de 10 pasas de nivel`; } };
    ['loadQuizRound', 'quizAnswer'].forEach(name => { const orig = app[name].bind(app); app[name] = function () { const r = orig.apply(app, arguments); reinoMeter(); return r; }; });
    { const orig = app.nextBone.bind(app);
      app.nextBone = function () {
        const d = app.dr, last = !!(d && d.reino && d.i + 1 >= d.total);
        const r = orig();
        if (last) {
          const n = d.reino, score = d.score;
          if (!(reino.best[n] >= score)) { reino.best[n] = score; saveReino(); }
          const pass = score >= REINO_NEED, fb = $('dr-feedback');
          $('dr-title').textContent = `🦁 Fin del nivel ${n}`;
          fb.innerHTML += pass
            ? `<p style="margin-top:8px;"><b>🔓 ¡Nivel ${n} superado!</b> ${n < REINO_LEVELS.length ? `Has abierto el nivel ${n + 1}.` : '¡Has completado los 10 niveles del Reino Animal! 🏆'}</p>`
            : `<p style="margin-top:8px;"><b>Para pasar de nivel necesitas ${REINO_NEED} aciertos.</b> Repasa la guía y vuelve a intentarlo.</p>`;
          fb.innerHTML += `<div class="rn-next">${pass && n < REINO_LEVELS.length ? `<button class="btn btn-primary" onclick="app.startReinoLevel(${n + 1})">Nivel ${n + 1} ➡️</button>` : ''}<button class="btn btn-back" onclick="app.openReinoMenu()">🗺️ Todos los niveles</button></div>`;
          $('dr-again').textContent = 'Repetir este nivel 🔁';
        }
        return r;
      };
    }
    { const orig = app.restartDragonGame.bind(app); app.restartDragonGame = function () { const d = app.dr; return d && d.reino ? app.startReinoLevel(d.reino) : orig(); }; }
    { const orig = app.backFromGame.bind(app); app.backFromGame = function () { const d = app.dr; return d && d.reino ? app.openReinoMenu() : orig(); }; }
    // al jugar el quiz normal, el botón "otra vez" vuelve a su texto de siempre
    { const orig = app.startBoneGame.bind(app); app.startBoneGame = function () { $('dr-again').textContent = 'Jugar otra vez 🔁'; return orig.apply(app, arguments); }; }

    // Al volver a la Academia (función existente) se ocultan también las pantallas de los dragones.
    const academyBeforeDragons = app.goToAcademyMenu.bind(app);
    app.goToAcademyMenu = function () {
      stopVoice();
      document.querySelectorAll('[id^="screen-dr-"]').forEach(el => el.classList.add('hidden'));
      document.body.classList.remove('dragon-theme');
      return academyBeforeDragons();
    };
    })();
  
