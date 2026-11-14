/* Aplicación principal (clase OrthoApp) y juegos base */
    // Pegatinas de Papá Noel integradas en el HTML: no necesitan Internet.
    const SANTA_STICKERS = IMG.santa;
    function dropSantaSticker() {
      const img = document.createElement('img');
      img.className = 'santa-drop';
      img.alt = 'Papá Noel celebrando';
      img.src = SANTA_STICKERS[Math.floor(Math.random() * SANTA_STICKERS.length)];
      img.style.left = (4 + Math.random() * 72) + 'vw';
      document.body.appendChild(img);
      img.addEventListener('animationend', () => img.remove(), { once: true });
    }
    function dropLetterShapes() {
      const letters = ['G','J','B','V','A','E','M','S'];
      const colors = ['#F472B6','#60A5FA','#34D399','#FBBF24','#A78BFA','#FB7185','#2DD4BF','#818CF8'];
      const count = 5 + Math.floor(Math.random() * 3);
      for (let i = 0; i < count; i++) {
        const el = document.createElement('div');
        el.className = 'letter-drop';
        el.textContent = letters[Math.floor(Math.random() * letters.length)];
        el.style.background = colors[Math.floor(Math.random() * colors.length)];
        el.style.left = (3 + Math.random() * 88) + 'vw';
        el.style.setProperty('--fall-time', (3.2 + Math.random() * 1.8) + 's');
        el.style.animationDelay = (Math.random() * .65) + 's';
        document.body.appendChild(el);
        el.addEventListener('animationend', () => el.remove(), { once: true });
      }
    }
    function animateSantaMood(isHappy) {
      // Las celebraciones dependen de la aventura activa: Papá Noel solo en su reto;
      // letras redondeadas solo en La Liga de las Letras.
      if (document.body.classList.contains('letter-theme')) {
        if (isHappy) dropLetterShapes();
        else {
          const card = document.querySelector('#screen-game:not(.hidden) .feedback-box, #screen-section-hub:not(.hidden) .feedback-box');
          if (card) { card.classList.remove('letter-pop'); void card.offsetWidth; card.classList.add('letter-pop'); window.setTimeout(() => card.classList.remove('letter-pop'), 600); }
        }
        return;
      }
      if (!document.body.classList.contains('santa-theme')) return;
      document.querySelectorAll('.mascot').forEach(el => {
        el.classList.remove('santa-celebrate','santa-sad');
        void el.offsetWidth;
        el.classList.add(isHappy ? 'santa-celebrate' : 'santa-sad');
        window.setTimeout(() => el.classList.remove('santa-celebrate','santa-sad'), 2400);
      });
      if (isHappy) { dropSantaSticker(); window.setTimeout(dropSantaSticker, 450); }
    }

    function dropGarland() {
      ['🎄','🎀','⭐','🍬'].slice(0,2+Math.floor(Math.random()*3)).forEach((symbol,i)=>{
        const el=document.createElement('div'); el.className='garland-drop'; el.textContent=symbol;
        el.style.left=(8+Math.random()*82)+'vw'; el.style.animationDelay=(i*.12)+'s';
        document.body.appendChild(el); el.addEventListener('animationend',()=>el.remove(),{once:true});
      });
      if(Math.random()<.75){const snow=document.createElement('div');snow.className='snowflake';snow.textContent='❄';snow.style.left=Math.random()*95+'vw';snow.style.fontSize=(16+Math.random()*18)+'px';snow.style.animationDuration=(3+Math.random()*2)+'s';document.body.appendChild(snow);snow.addEventListener('animationend',()=>snow.remove(),{once:true});}
    }

    // ==============================================================
    // BANCO COMPLETO DE PALABRAS: 65 POR MUNDO (325 PALABRAS TOTALES)
    // ==============================================================
    const DATABASE = {
      // 🟢 MUNDO DE LA G (65 palabras)
      G: {
        title: "El Mundo de la G",
        icon: "🟢",
        subtitle: "ga, go, gu / gue, gui / güe, güi",
        words: [
          { id: 'g1', word: 'cigüeña', options: ['cigueña', 'cigüeña', 'cigoña'], rule: '¡Diéresis! Los dos puntitos hacen sonar la "u" en güe y güi.' },
          { id: 'g2', word: 'pingüino', options: ['pinguino', 'pingüino', 'pingino'], rule: 'En "güi" ponemos diéresis para pronunciar la "u".' },
          { id: 'g3', word: 'paragüero', options: ['paraguero', 'paragüero', 'paragero'], rule: 'Como suena la "u", ponemos diéresis: güe.' },
          { id: 'g4', word: 'desagüe', options: ['desague', 'desagüe', 'desage'], rule: 'Al decir "güe", la "ü" lleva siempre sus dos puntitos.' },
          { id: 'g5', word: 'piragüista', options: ['piraguista', 'piragüista', 'piragista'], rule: 'Lleva diéresis porque la "u" tiene su propio sonido.' },
          { id: 'g6', word: 'lengüeta', options: ['lengueta', 'lengüeta', 'lengeta'], rule: '¡No olvides la diéresis en "güe" para que la "u" no sea muda!' },
          { id: 'g7', word: 'vergüenza', options: ['verguenza', 'vergüenza', 'vergonza'], rule: 'Lleva diéresis en la "ü".' },
          { id: 'g8', word: 'antigüedad', options: ['antiguedad', 'antigüedad', 'antigidad'], rule: 'La diéresis le da vida a la "u" en antigüedad.' },
          { id: 'g9', word: 'ungüento', options: ['unguento', 'ungüento', 'ungento'], rule: 'En "güe" pronunciamos la "u" gracias a la diéresis.' },
          { id: 'g10', word: 'pedigüeño', options: ['pedigueño', 'pedigüeño', 'pedigeño'], rule: 'Lleva los dos puntitos mágicos sobre la "u".' },
          { id: 'g11', word: 'agüita', options: ['aguita', 'agüita', 'agita'], rule: 'Como decimos a-güi-ta, la "u" lleva diéresis.' },
          { id: 'g12', word: 'bilingüe', options: ['bilingue', 'bilingüe', 'bilinge'], rule: 'Termina en "güe" con diéresis.' },
          { id: 'g13', word: 'yegüita', options: ['yeguita', 'yegüita', 'yegita'], rule: 'Suena la "u", por tanto lleva diéresis: güi.' },
          { id: 'g14', word: 'zarigüeya', options: ['zarigueya', 'zarigüeya', 'zarigeya'], rule: 'Lleva "güe" con sus dos puntitos.' },
          { id: 'g15', word: 'paragüitas', options: ['paraguitas', 'paragüitas', 'paragitas'], rule: 'En "güi" ponemos la diéresis.' },
          { id: 'g16', word: 'guitarra', options: ['gitarra', 'guitarra', 'güitarra'], rule: 'La "u" es muda: protege a la G para sonar suave.' },
          { id: 'g17', word: 'manguera', options: ['mangera', 'manguera', 'mangüera'], rule: 'Lleva "gue" con "u" mudita para sonar suave.' },
          { id: 'g18', word: 'águila', options: ['ágila', 'águila', 'ágüila'], rule: 'Lleva "gui" con "u" muda para sonar suave.' },
          { id: 'g19', word: 'juguete', options: ['jugete', 'juguete', 'jugüete'], rule: 'Con "gue" para que no suene fuerte como ju-je-te.' },
          { id: 'g20', word: 'guisante', options: ['gisante', 'guisante', 'güisante'], rule: 'Empieza por "gui" suave.' },
          { id: 'g21', word: 'hoguera', options: ['hogera', 'hoguera', 'hogüera'], rule: 'Lleva "gue" para sonar suavecito.' },
          { id: 'g22', word: 'tortuguita', options: ['tortugita', 'tortuguita', 'tortugüita'], rule: 'Lleva "gui" con su "u" muda.' },
          { id: 'g23', word: 'espagueti', options: ['espageti', 'espagueti', 'espagüeti'], rule: 'Lleva "gue" suave.' },
          { id: 'g24', word: 'higuera', options: ['higera', 'higuera', 'higüera'], rule: 'Lleva "gue" con la "u" mudita.' },
          { id: 'g25', word: 'guepardo', options: ['gepardo', 'guepardo', 'güepardo'], rule: 'Comienza con "gue" suave.' },
          { id: 'g26', word: 'guirnalda', options: ['girnalda', 'guirnalda', 'güirnalda'], rule: 'Empieza por "gui".' },
          { id: 'g27', word: 'amiguito', options: ['amigito', 'amiguito', 'amigüito'], rule: 'Lleva "gui" con "u" muda.' },
          { id: 'g28', word: 'guiño', options: ['giño', 'guiño', 'güiño'], rule: 'Lleva "gui" para sonido suave.' },
          { id: 'g29', word: 'guerrero', options: ['gerrero', 'guerrero', 'güerrero'], rule: 'Lleva "gue" con la "u" muda.' },
          { id: 'g30', word: 'guinda', options: ['ginda', 'guinda', 'güinda'], rule: 'Lleva "gui" suave.' },
          { id: 'g31', word: 'merengue', options: ['merenge', 'merengue', 'merengüe'], rule: 'Termina en "gue" suave.' },
          { id: 'g32', word: 'hamburguesa', options: ['hamburgesa', 'hamburguesa', 'hamburgüesa'], rule: 'Lleva "gue" con su "u" muda.' },
          { id: 'g33', word: 'hormiguero', options: ['hormigero', 'hormiguero', 'hormigüero'], rule: 'Lleva "gue" suave.' },
          { id: 'g34', word: 'manguito', options: ['mangito', 'manguito', 'mangüito'], rule: 'Lleva "gui" con "u" mudita.' },
          { id: 'g35', word: 'anguila', options: ['angila', 'anguila', 'angüila'], rule: 'Lleva "gui" suave.' },
          { id: 'g36', word: 'madriguera', options: ['madrigera', 'madriguera', 'madrigüera'], rule: 'Lleva "gue" con la "u" en medio.' },
          { id: 'g37', word: 'seguidor', options: ['segidor', 'seguidor', 'següidor'], rule: 'Lleva "gui" para que suene suave.' },
          { id: 'g38', word: 'guiñol', options: ['giñol', 'guiñol', 'güiñol'], rule: 'Empieza por "gui" suave.' },
          { id: 'g39', word: 'ceguera', options: ['cegera', 'ceguera', 'cegüera'], rule: 'Lleva "gue" con "u" muda.' },
          { id: 'g40', word: 'guiso', options: ['giso', 'guiso', 'güiso'], rule: 'Empieza por "gui" suave.' },
          { id: 'g41', word: 'gorila', options: ['guorila', 'gorila', 'gorrila'], rule: 'Con la "o" la G va directa sin "u": ga, go, gu.' },
          { id: 'g42', word: 'galleta', options: ['gualleta', 'galleta', 'galeta'], rule: 'Con la "a" la G va solita: ga, go, gu.' },
          { id: 'g43', word: 'amigo', options: ['amiguo', 'amigo', 'amigüo'], rule: 'Con la "o" va la G directa.' },
          { id: 'g44', word: 'gusanito', options: ['guosanito', 'gusanito', 'güsanito'], rule: 'Con la "u" la G suena suave por sí sola.' },
          { id: 'g45', word: 'regalo', options: ['regualo', 'regalo', 'regallo'], rule: 'La sílaba "ga" va sin letras en medio.' },
          { id: 'g46', word: 'tortuga', options: ['tortugua', 'tortuga', 'tortugüa'], rule: 'Termina en "ga" directo.' },
          { id: 'g47', word: 'lago', options: ['laguo', 'lago', 'lagüo'], rule: 'La sílaba "go" va directa.' },
          { id: 'g48', word: 'mago', options: ['maguo', 'mago', 'magüo'], rule: 'Con la "o" nunca lleva "u" intermedia.' },
          { id: 'g49', word: 'canguro', options: ['canguoro', 'canguro', 'cangüro'], rule: 'Con la "u" va directa: gu.' },
          { id: 'g50', word: 'gafas', options: ['guafas', 'gafas', 'garras'], rule: 'Empieza por "ga" directo.' },
          { id: 'g51', word: 'gallina', options: ['guallina', 'gallina', 'gayina'], rule: 'Empieza por "ga".' },
          { id: 'g52', word: 'gota', options: ['guota', 'gota', 'gotta'], rule: 'Con la "o" va sola: go.' },
          { id: 'g53', word: 'gusano', options: ['guosano', 'gusano', 'güsano'], rule: 'Empieza por "gu" directo.' },
          { id: 'g54', word: 'figura', options: ['figura', 'figüra', 'figuora'], rule: 'Lleva "gu" directo.' },
          { id: 'g55', word: 'bigote', options: ['biguote', 'bigote', 'bigotte'], rule: 'La sílaba "go" va sola.' },
          { id: 'g56', word: 'abrigo', options: ['abriguo', 'abrigo', 'abrigüo'], rule: 'Termina en "go" directo.' },
          { id: 'g57', word: 'goma', options: ['guoma', 'goma', 'gomma'], rule: 'La sílaba "go" va directa.' },
          { id: 'g58', word: 'garra', options: ['guarra', 'garra', 'gara'], rule: 'Empieza por "ga".' },
          { id: 'g59', word: 'laguna', options: ['lagüna', 'laguna', 'laguona'], rule: 'Lleva "gu" directo.' },
          { id: 'g60', word: 'fuego', options: ['fuego', 'fueguo', 'fuegüo'], rule: 'Termina en "go" directo.' },
          { id: 'g61', word: 'hongo', options: ['honguo', 'hongo', 'hongüo'], rule: 'Con la "o" va la G sola.' },
          { id: 'g62', word: 'garganta', options: ['guarganta', 'garganta', 'garrganta'], rule: 'Empieza por "ga".' },
          { id: 'g63', word: 'aguja', options: ['agüja', 'aguja', 'aguoja'], rule: 'Lleva "gu" directo.' },
          { id: 'g64', word: 'gasolina', options: ['guasolina', 'gasolina', 'gazolina'], rule: 'Empieza por "ga" directo.' },
          { id: 'g65', word: 'golosina', options: ['guolosina', 'golosina', 'gollosina'], rule: 'Empieza por "go" directo.' }
        ]
      },

      // 🟠 REINO DE LA J (65 palabras)
      J: {
        title: "El Reino de la J",
        icon: "🟠",
        subtitle: "ja, jo, ju, palabras en -aje, aje-/eje-",
        words: [
          { id: 'j1', word: 'tijeras', options: ['tigeras', 'tijeras', 'tilleras'], rule: 'El sonido fuerte "je/ji" suele escribirse con J.' },
          { id: 'j2', word: 'jirafa', options: ['girafa', 'jirafa', 'guirafa'], rule: 'Jirafa siempre se escribe con J.' },
          { id: 'j3', word: 'viaje', options: ['viage', 'viaje', 'viaxe'], rule: 'Las palabras terminadas en -aje se escriben con J.' },
          { id: 'j4', word: 'equipaje', options: ['equipage', 'equipaje', 'equipahe'], rule: 'Palabras terminadas en -aje siempre con J.' },
          { id: 'j5', word: 'conejo', options: ['conego', 'conejo', 'coneyo'], rule: 'El sonido fuerte "jo" siempre se escribe con J.' },
          { id: 'j6', word: 'oveja', options: ['ovega', 'oveja', 'obeja'], rule: 'El sonido "ja" siempre se escribe con J.' },
          { id: 'j7', word: 'reloj', options: ['relog', 'reloj', 'reloge'], rule: 'Palabras que acaban en sonido j terminan en J.' },
          { id: 'j8', word: 'cojín', options: ['cogín', 'cojín', 'cojin'], rule: 'Cojín se escribe con J.' },
          { id: 'j9', word: 'naranja', options: ['naranga', 'naranja', 'naranje'], rule: 'Termina en "ja" con J.' },
          { id: 'j10', word: 'ajedrez', options: ['agedrez', 'ajedrez', 'axedrez'], rule: 'Palabras que empiezan por aje- van con J.' },
          { id: 'j11', word: 'dibujo', options: ['dibugo', 'dibujo', 'divujo'], rule: 'La sílaba "jo" siempre va con J.' },
          { id: 'j12', word: 'ejercicio', options: ['egercicio', 'ejercicio', 'ejeccicio'], rule: 'Palabras que empiezan por eje- van con J.' },
          { id: 'j13', word: 'tejer', options: ['teger', 'tejer', 'teyer'], rule: 'Tejer y crujir son excepciones que van con J.' },
          { id: 'j14', word: 'jardín', options: ['gardín', 'jardín', 'llardín'], rule: 'El sonido fuerte "ja" siempre es con J.' },
          { id: 'j15', word: 'bruja', options: ['bruga', 'bruja', 'bruya'], rule: 'Termina en "ja" con J.' },
          { id: 'j16', word: 'mensaje', options: ['mensage', 'mensaje', 'mensahe'], rule: 'Las palabras terminadas en -aje van con J.' },
          { id: 'j17', word: 'paisaje', options: ['paisage', 'paisaje', 'paizaje'], rule: 'Terminación en -aje siempre con J.' },
          { id: 'j18', word: 'garaje', options: ['garage', 'garaje', 'garahe'], rule: 'Terminación en -aje con J.' },
          { id: 'j19', word: 'patinaje', options: ['patinage', 'patinaje', 'patinahe'], rule: 'Terminación en -aje va con J.' },
          { id: 'j20', word: 'maquillaje', options: ['maquillage', 'maquillaje', 'maquillahe'], rule: 'Termina en -aje con J.' },
          { id: 'j21', word: 'salvaje', options: ['salvage', 'salvaje', 'salbaje'], rule: 'Terminación en -aje con J.' },
          { id: 'j22', word: 'oleaje', options: ['oleage', 'oleaje', 'oleahe'], rule: 'Terminación en -aje va con J.' },
          { id: 'j23', word: 'plumaje', options: ['plumage', 'plumaje', 'plumahe'], rule: 'Termina en -aje con J.' },
          { id: 'j24', word: 'lenguaje', options: ['lenguage', 'lenguaje', 'lenguahe'], rule: 'Termina en -aje con J.' },
          { id: 'j25', word: 'rodaje', options: ['rodage', 'rodaje', 'rodahe'], rule: 'Terminación en -aje con J.' },
          { id: 'j26', word: 'ejemplo', options: ['egemplo', 'ejemplo', 'ejemplo'], rule: 'Empieza por eje- con J.' },
          { id: 'j27', word: 'ejército', options: ['egército', 'ejército', 'ejerzito'], rule: 'Empieza por eje- con J.' },
          { id: 'j28', word: 'ajeno', options: ['ageno', 'ajeno', 'aheno'], rule: 'Empieza por aje- con J.' },
          { id: 'j29', word: 'ejecutar', options: ['egecutar', 'ejecutar', 'executar'], rule: 'Empieza por eje- con J.' },
          { id: 'j30', word: 'granjero', options: ['grangero', 'granjero', 'granxero'], rule: 'Terminaciones en -jero/-jera van con J.' },
          { id: 'j31', word: 'cajera', options: ['cagera', 'cajera', 'cahera'], rule: 'Terminación en -jera va con J.' },
          { id: 'j32', word: 'pasajero', options: ['pasagero', 'pasajero', 'pazahero'], rule: 'Terminación en -jero con J.' },
          { id: 'j33', word: 'extranjero', options: ['extrangero', 'extranjero', 'estranjero'], rule: 'Terminación en -jero con J.' },
          { id: 'j34', word: 'cerrajero', options: ['cerragero', 'cerrajero', 'cerrahero'], rule: 'Terminación en -jero con J.' },
          { id: 'j35', word: 'consejero', options: ['consegero', 'consejero', 'conzehero'], rule: 'Terminación en -jero con J.' },
          { id: 'j36', word: 'relojería', options: ['relogería', 'relojería', 'relojerilla'], rule: 'Terminaciones en -jería van con J.' },
          { id: 'j37', word: 'brujería', options: ['brugería', 'brujería', 'brujeria'], rule: 'Terminación en -jería va con J.' },
          { id: 'j38', word: 'ojo', options: ['ogo', 'ojo', 'oyo'], rule: 'La sílaba "jo" siempre se escribe con J.' },
          { id: 'j39', word: 'ceja', options: ['cega', 'ceja', 'seja'], rule: 'La sílaba "ja" va con J.' },
          { id: 'j40', word: 'oreja', options: ['orega', 'oreja', 'oreya'], rule: 'Termina en "ja" con J.' },
          { id: 'j41', word: 'hoja', options: ['hoga', 'hoja', 'oja'], rule: 'Lleva H muda y termina en "ja" con J.' },
          { id: 'j42', word: 'navaja', options: ['navaga', 'navaja', 'nabaja'], rule: 'Termina en "ja" con J.' },
          { id: 'j43', word: 'caja', options: ['caga', 'caja', 'caya'], rule: 'Termina en "ja" con J.' },
          { id: 'j44', word: 'pijama', options: ['pigama', 'pijama', 'piyama'], rule: 'Pijama se escribe con J.' },
          { id: 'j45', word: 'jinete', options: ['ginete', 'jinete', 'llinete'], rule: 'Jinete se escribe con J.' },
          { id: 'j46', word: 'jamón', options: ['gamón', 'jamón', 'yamón'], rule: 'El sonido fuerte "ja" siempre es con J.' },
          { id: 'j47', word: 'jarabe', options: ['garabe', 'jarabe', 'xarabe'], rule: 'Empieza por "ja" con J.' },
          { id: 'j48', word: 'joya', options: ['goya', 'joya', 'jolla'], rule: 'Empieza por "jo" con J.' },
          { id: 'j49', word: 'judía', options: ['gudía', 'judía', 'ludia'], rule: 'Empieza por "ju" con J.' },
          { id: 'j50', word: 'jugo', options: ['gugo', 'jugo', 'judo'], rule: 'Empieza por "ju" con J.' },
          { id: 'j51', word: 'juego', options: ['guego', 'juego', 'luego'], rule: 'Empieza por "ju" con J.' },
          { id: 'j52', word: 'juez', options: ['guez', 'juez', 'jues'], rule: 'Empieza por "ju" con J.' },
          { id: 'j53', word: 'joven', options: ['goven', 'joven', 'hoben'], rule: 'Empieza por "jo" con J.' },
          { id: 'j54', word: 'jersey', options: ['gersey', 'jersey', 'llersey'], rule: 'Jersey se escribe con J.' },
          { id: 'j55', word: 'jabalí', options: ['gabalí', 'jabalí', 'yabalí'], rule: 'Empieza por "ja" con J.' },
          { id: 'j56', word: 'jarrón', options: ['garrón', 'jarrón', 'xarrón'], rule: 'Empieza por "ja" con J.' },
          { id: 'j57', word: 'ajo', options: ['ago', 'ajo', 'ayo'], rule: 'Termina en "jo" con J.' },
          { id: 'j58', word: 'reja', options: ['rega', 'reja', 'reya'], rule: 'Termina en "ja" con J.' },
          { id: 'j59', word: 'espejo', options: ['espego', 'espejo', 'espeyo'], rule: 'Termina en "jo" con J.' },
          { id: 'j60', word: 'viejo', options: ['viego', 'viejo', 'biejo'], rule: 'Termina en "jo" con J.' },
          { id: 'j61', word: 'rojo', options: ['rogo', 'rojo', 'royo'], rule: 'Termina en "jo" con J.' },
          { id: 'j62', word: 'aguja', options: ['aguga', 'aguja', 'aguya'], rule: 'Termina en "ja" con J.' },
          { id: 'j63', word: 'esponja', options: ['esponga', 'esponja', 'esponlla'], rule: 'Termina en "ja" con J.' },
          { id: 'j64', word: 'granja', options: ['granga', 'granja', 'granya'], rule: 'Termina en "ja" con J.' },
          { id: 'j65', word: 'crujir', options: ['crugir', 'crujir', 'cruxir'], rule: 'Crujir es una de las excepciones que van con J.' }
        ]
      },

      // 🔵 CASTILLO DE LA B (65 palabras)
      B: {
        title: "El Castillo de la B",
        icon: "🔵",
        subtitle: "bra, bla, mb antes de p y b, -aba",
        words: [
          { id: 'b1', word: 'brazo', options: ['vrazo', 'brazo', 'blazo'], rule: 'Delante de consonante (como la "r" en bra) siempre va B.' },
          { id: 'b2', word: 'blanco', options: ['vlanco', 'blanco', 'branco'], rule: 'Delante de "l" (bla, ble...) siempre va B.' },
          { id: 'b3', word: 'tambor', options: ['tanbor', 'tambor', 'tamvor'], rule: 'Antes de B y de P siempre se escribe M, ¡nunca N!' },
          { id: 'b4', word: 'bombón', options: ['bonbón', 'bombón', 'bomvón'], rule: 'Siempre se escribe M antes de B.' },
          { id: 'b5', word: 'cantaba', options: ['cantava', 'cantaba', 'cantada'], rule: 'Las terminaciones de pasado en -aba van con B.' },
          { id: 'b6', word: 'jugaba', options: ['jugava', 'jugaba', 'juguaba'], rule: 'Terminación en -aba va con B.' },
          { id: 'b7', word: 'biblioteca', options: ['viblioteca', 'biblioteca', 'bivlioteca'], rule: 'Palabras que empiezan por biblio- van con B.' },
          { id: 'b8', word: 'bruja', options: ['vruja', 'bruja', 'bruxa'], rule: 'Las sílabas con bra, bre, bri, bro, bru van con B.' },
          { id: 'b9', word: 'sombrero', options: ['sonbrero', 'sombrero', 'somvrero'], rule: 'Lleva M antes de B, y "bre" va con B.' },
          { id: 'b10', word: 'barco', options: ['varco', 'barco', 'bacro'], rule: 'Barco se escribe con B.' },
          { id: 'b11', word: 'cable', options: ['cavle', 'cable', 'crable'], rule: 'Las sílabas bla, ble, bli, blo, blu van con B.' },
          { id: 'b12', word: 'balón', options: ['valón', 'balón', 'bolón'], rule: 'Balón se escribe con B.' },
          { id: 'b13', word: 'biberón', options: ['viverón', 'biberón', 'biverón'], rule: 'Biberón lleva las dos con B.' },
          { id: 'b14', word: 'burbuja', options: ['vurbuja', 'burbuja', 'burvuja'], rule: 'Empieza por bur- y va con B.' },
          { id: 'b15', word: 'sombra', options: ['somvra', 'sombra', 'sonbra'], rule: 'Antes de B siempre va M, y "bra" con B.' },
          { id: 'b16', word: 'bombero', options: ['bonbero', 'bombero', 'bomvero'], rule: 'Antes de B siempre se escribe M.' },
          { id: 'b17', word: 'alfombra', options: ['alfonbra', 'alfombra', 'alfomvra'], rule: 'Lleva M antes de B, y "bra" con B.' },
          { id: 'b18', word: 'cambio', options: ['canbio', 'cambio', 'camvio'], rule: 'Siempre se escribe M antes de B.' },
          { id: 'b19', word: 'bambú', options: ['banbú', 'bambú', 'bamvú'], rule: 'Lleva M antes de B.' },
          { id: 'b20', word: 'rumbo', options: ['runbo', 'rumbo', 'rumvo'], rule: 'Siempre M antes de B.' },
          { id: 'b21', word: 'tumba', options: ['tunba', 'tumba', 'tumva'], rule: 'Lleva M antes de B.' },
          { id: 'b22', word: 'siembra', options: ['sienbra', 'siembra', 'siemvra'], rule: 'Lleva M antes de B y "bra" con B.' },
          { id: 'b23', word: 'zumbido', options: ['zunbido', 'zumbido', 'zumvido'], rule: 'Lleva M antes de B.' },
          { id: 'b24', word: 'saltaba', options: ['saltava', 'saltaba', 'saltada'], rule: 'Las terminaciones en -aba van con B.' },
          { id: 'b25', word: 'bailaba', options: ['bailava', 'bailaba', 'bailable'], rule: 'Terminación en -aba con B.' },
          { id: 'b26', word: 'soñaba', options: ['soñava', 'soñaba', 'soñada'], rule: 'Terminación en -aba con B.' },
          { id: 'b27', word: 'caminaba', options: ['caminava', 'caminaba', 'caminada'], rule: 'Terminación en -aba con B.' },
          { id: 'b28', word: 'miraba', options: ['mirava', 'miraba', 'mirada'], rule: 'Terminación en -aba con B.' },
          { id: 'b29', word: 'escuchaba', options: ['escuchava', 'escuchaba', 'escuchada'], rule: 'Terminación en -aba con B.' },
          { id: 'b30', word: 'dibujaba', options: ['dibugaba', 'dibujaba', 'dibujava'], rule: 'Lleva B y terminación en -aba.' },
          { id: 'b31', word: 'estudiaba', options: ['estudiava', 'estudiaba', 'estudiada'], rule: 'Terminación en -aba con B.' },
          { id: 'b32', word: 'hablaba', options: ['hablava', 'hablaba', 'ablaba'], rule: 'Lleva H, sílaba "bla" y terminación en -aba.' },
          { id: 'b33', word: 'bufanda', options: ['vufanda', 'bufanda', 'bufranda'], rule: 'Las palabras que empiezan por bu- van con B.' },
          { id: 'b34', word: 'buscar', options: ['vuscar', 'buscar', 'buzcar'], rule: 'Palabras que empiezan por bus- van con B.' },
          { id: 'b35', word: 'buzo', options: ['vuzo', 'buzo', 'buso'], rule: 'Empieza por bu- con B.' },
          { id: 'b36', word: 'buzón', options: ['vuzón', 'buzón', 'busón'], rule: 'Empieza por bu- con B.' },
          { id: 'b37', word: 'tabla', options: ['tavla', 'tabla', 'trabla'], rule: 'Sílaba "bla" siempre con B.' },
          { id: 'b38', word: 'pueblo', options: ['puevlo', 'pueblo', 'puelbo'], rule: 'Sílaba "blo" siempre con B.' },
          { id: 'b39', word: 'bloque', options: ['vloque', 'bloque', 'broque'], rule: 'Sílaba "blo" con B.' },
          { id: 'b40', word: 'broma', options: ['vroma', 'broma', 'bloma'], rule: 'Sílaba "bro" siempre con B.' },
          { id: 'b41', word: 'brisa', options: ['vrisa', 'brisa', 'blisa'], rule: 'Sílaba "bri" con B.' },
          { id: 'b42', word: 'blusa', options: ['vlusa', 'blusa', 'brusa'], rule: 'Sílaba "blu" con B.' },
          { id: 'b43', word: 'ombligo', options: ['onbligo', 'ombligo', 'omvligo'], rule: 'Lleva M antes de B y la sílaba "bli".' },
          { id: 'b44', word: 'timbre', options: ['tinbre', 'timbre', 'timvre'], rule: 'Lleva M antes de B y la sílaba "bre".' },
          { id: 'b45', word: 'libreta', options: ['livreta', 'libreta', 'libeta'], rule: 'Sílaba "bre" siempre con B.' },
          { id: 'b46', word: 'sobre', options: ['sovre', 'sobre', 'soble'], rule: 'Sílaba "bre" con B.' },
          { id: 'b47', word: 'botella', options: ['votella', 'botella', 'botela'], rule: 'Botella se escribe con B.' },
          { id: 'b48', word: 'botón', options: ['votón', 'botón', 'botoñ'], rule: 'Botón se escribe con B.' },
          { id: 'b49', word: 'boca', options: ['voca', 'boca', 'boqua'], rule: 'Boca se escribe con B.' },
          { id: 'b50', word: 'bolso', options: ['volso', 'bolso', 'borso'], rule: 'Bolso se escribe con B.' },
          { id: 'b51', word: 'caballo', options: ['cavallo', 'caballo', 'cabayo'], rule: 'Caballo se escribe con B.' },
          { id: 'b52', word: 'abeja', options: ['aveja', 'abeja', 'abega'], rule: 'Abeja se escribe con B y con J.' },
          { id: 'b53', word: 'árbol', options: ['árvol', 'árbol', 'arboll'], rule: 'Árbol se escribe con B y lleva tilde.' },
          { id: 'b54', word: 'bota', options: ['vota', 'bota', 'botta'], rule: 'Bota de calzado se escribe con B.' },
          { id: 'b55', word: 'lobo', options: ['lovo', 'lobo', 'lobbo'], rule: 'Lobo se escribe con B.' },
          { id: 'b56', word: 'cubo', options: ['cuvo', 'cubo', 'qubo'], rule: 'Cubo se escribe con B.' },
          { id: 'b57', word: 'abuelo', options: ['avuelo', 'abuelo', 'abueglo'], rule: 'Abuelo se escribe con B.' },
          { id: 'b58', word: 'nube', options: ['nuve', 'nube', 'nuble'], rule: 'Nube se escribe con B.' },
          { id: 'b59', word: 'abrazo', options: ['avrazo', 'abrazo', 'ablazo'], rule: 'Sílaba "bra" con B.' },
          { id: 'b60', word: 'brújula', options: ['vrújula', 'brújula', 'blújula'], rule: 'Sílaba "bru" con B.' },
          { id: 'b61', word: 'bosque', options: ['vosque', 'bosque', 'bozque'], rule: 'Bosque se escribe con B.' },
          { id: 'b62', word: 'bicho', options: ['vicho', 'bicho', 'bico'], rule: 'Bicho se escribe con B.' },
          { id: 'b63', word: 'billete', options: ['villete', 'billete', 'biliete'], rule: 'Billete se escribe con B.' },
          { id: 'b64', word: 'beso', options: ['veso', 'beso', 'bezo'], rule: 'Beso se escribe con B.' },
          { id: 'b65', word: 'barro', options: ['varro', 'barro', 'baro'], rule: 'Barro se escribe con B.' }
        ]
      },

      // 🟣 GALAXIA DE LA V (65 palabras)
      // 🟡 LA CUEVA DE LA C (65 palabras: ca, co, cu, ce, ci)
      C: {
        title: "La Cueva de la C",
        icon: "🟡",
        subtitle: "ca, co, cu / ce, ci / palabras con C",
        words: [
          { id: 'c1', word: 'casa', options: ['caza', 'casa', 'kasa'], rule: 'Casa se escribe con C.' },
          { id: 'c2', word: 'cama', options: ['kama', 'cama', 'cana'], rule: 'Cama empieza por ca, con C.' },
          { id: 'c3', word: 'camino', options: ['kamino', 'camino', 'cammino'], rule: 'Camino se escribe con C.' },
          { id: 'c4', word: 'caballo', options: ['cavallo', 'caballo', 'cabayo'], rule: 'Caballo se escribe con C.' },
          { id: 'c5', word: 'cabeza', options: ['caveza', 'cabeza', 'cabesa'], rule: 'Cabeza se escribe con C y Z.' },
          { id: 'c6', word: 'cajón', options: ['cagón', 'cajón', 'cajom'], rule: 'Cajón empieza por ca, con C.' },
          { id: 'c7', word: 'calabaza', options: ['calavaza', 'calabaza', 'calabasa'], rule: 'Calabaza se escribe con C.' },
          { id: 'c8', word: 'calle', options: ['caye', 'calle', 'kalle'], rule: 'Calle empieza por ca y lleva LL.' },
          { id: 'c9', word: 'calor', options: ['kalor', 'calor', 'calorr'], rule: 'Calor se escribe con C.' },
          { id: 'c10', word: 'camión', options: ['kamión', 'camión', 'camíon'], rule: 'Camión empieza por ca, con C.' },
          { id: 'c11', word: 'canción', options: ['canzión', 'canción', 'cancíon'], rule: 'Canción lleva C y termina en -ción.' },
          { id: 'c12', word: 'cangrejo', options: ['kangrejo', 'cangrejo', 'cancrejo'], rule: 'Cangrejo se escribe con C.' },
          { id: 'c13', word: 'cantante', options: ['kantante', 'cantante', 'cantamte'], rule: 'Cantante empieza por can, con C.' },
          { id: 'c14', word: 'cantar', options: ['kantar', 'cantar', 'cantarr'], rule: 'Cantar se escribe con C.' },
          { id: 'c15', word: 'caracol', options: ['karacol', 'caracol', 'carakol'], rule: 'Caracol empieza por ca, con C.' },
          { id: 'c16', word: 'caramelo', options: ['karamelo', 'caramelo', 'caramello'], rule: 'Caramelo se escribe con C.' },
          { id: 'c17', word: 'carta', options: ['karta', 'carta', 'cartha'], rule: 'Carta empieza por ca, con C.' },
          { id: 'c18', word: 'castillo', options: ['kastillo', 'castillo', 'castiyo'], rule: 'Castillo se escribe con C.' },
          { id: 'c19', word: 'catorce', options: ['katorce', 'catorce', 'catorse'], rule: 'Catorce se escribe con C.' },
          { id: 'c20', word: 'cebolla', options: ['sevolla', 'cebolla', 'ceboya'], rule: 'Cebolla empieza por ce, con C.' },
          { id: 'c21', word: 'cebra', options: ['sebra', 'cebra', 'zebra'], rule: 'Cebra se escribe con C en español.' },
          { id: 'c22', word: 'ceder', options: ['seder', 'ceder', 'zeder'], rule: 'Ceder empieza por ce, con C.' },
          { id: 'c23', word: 'ceja', options: ['seja', 'ceja', 'zeja'], rule: 'Ceja empieza por ce, con C.' },
          { id: 'c24', word: 'celebrar', options: ['selebrar', 'celebrar', 'zelebrar'], rule: 'Celebrar empieza por ce, con C.' },
          { id: 'c25', word: 'celeste', options: ['seleste', 'celeste', 'zeleste'], rule: 'Celeste empieza por ce, con C.' },
          { id: 'c26', word: 'cena', options: ['sena', 'cena', 'zena'], rule: 'Cena empieza por ce, con C.' },
          { id: 'c27', word: 'ceniza', options: ['seniza', 'ceniza', 'zenisa'], rule: 'Ceniza empieza por ce, con C.' },
          { id: 'c28', word: 'centro', options: ['sentro', 'centro', 'zentro'], rule: 'Centro empieza por ce, con C.' },
          { id: 'c29', word: 'cereza', options: ['sereza', 'cereza', 'ceresa'], rule: 'Cereza empieza por ce, con C.' },
          { id: 'c30', word: 'cero', options: ['sero', 'cero', 'zero'], rule: 'Cero empieza por ce, con C.' },
          { id: 'c31', word: 'cerrar', options: ['serrar', 'cerrar', 'zerrar'], rule: 'Cerrar empieza por ce, con C.' },
          { id: 'c32', word: 'cesta', options: ['sesta', 'cesta', 'zesta'], rule: 'Cesta empieza por ce, con C.' },
          { id: 'c33', word: 'cielo', options: ['sielo', 'cielo', 'zielo'], rule: 'Cielo empieza por cie, con C.' },
          { id: 'c34', word: 'ciencia', options: ['siencia', 'ciencia', 'ziencia'], rule: 'Ciencia empieza por cie, con C.' },
          { id: 'c35', word: 'cien', options: ['sien', 'cien', 'zien'], rule: 'Cien empieza por cie, con C.' },
          { id: 'c36', word: 'cima', options: ['sima', 'cima', 'zima'], rule: 'Cima empieza por ci, con C.' },
          { id: 'c37', word: 'cine', options: ['sine', 'cine', 'zine'], rule: 'Cine empieza por ci, con C.' },
          { id: 'c38', word: 'cinta', options: ['sinta', 'cinta', 'zinta'], rule: 'Cinta empieza por ci, con C.' },
          { id: 'c39', word: 'circo', options: ['sirco', 'circo', 'zirco'], rule: 'Circo empieza por cir, con C.' },
          { id: 'c40', word: 'círculo', options: ['sírculo', 'círculo', 'círcullo'], rule: 'Círculo empieza por cí, con C.' },
          { id: 'c41', word: 'ciruela', options: ['siruela', 'ciruela', 'ziruela'], rule: 'Ciruela empieza por ci, con C.' },
          { id: 'c42', word: 'cisne', options: ['sisne', 'cisne', 'zisne'], rule: 'Cisne empieza por cis, con C.' },
          { id: 'c43', word: 'cita', options: ['sita', 'cita', 'zita'], rule: 'Cita empieza por ci, con C.' },
          { id: 'c44', word: 'ciudad', options: ['siudad', 'ciudad', 'ziudad'], rule: 'Ciudad empieza por ci, con C.' },
          { id: 'c45', word: 'cocina', options: ['kosina', 'cocina', 'cosina'], rule: 'Cocina se escribe con C.' },
          { id: 'c46', word: 'coche', options: ['koche', 'coche', 'cose'], rule: 'Coche empieza por co, con C.' },
          { id: 'c47', word: 'cocodrilo', options: ['kokodrilo', 'cocodrilo', 'cocodrillo'], rule: 'Cocodrilo se escribe con C.' },
          { id: 'c48', word: 'cohete', options: ['kohete', 'cohete', 'coete'], rule: 'Cohete empieza por co, con C.' },
          { id: 'c49', word: 'colegio', options: ['kolegio', 'colegio', 'colegío'], rule: 'Colegio se escribe con C.' },
          { id: 'c50', word: 'colina', options: ['kolina', 'colina', 'collina'], rule: 'Colina empieza por co, con C.' },
          { id: 'c51', word: 'cometa', options: ['kometa', 'cometa', 'cometha'], rule: 'Cometa empieza por co, con C.' },
          { id: 'c52', word: 'comida', options: ['komida', 'comida', 'comidda'], rule: 'Comida se escribe con C.' },
          { id: 'c53', word: 'conejo', options: ['konejo', 'conejo', 'conego'], rule: 'Conejo se escribe con C.' },
          { id: 'c54', word: 'corazón', options: ['korazón', 'corazón', 'corasón'], rule: 'Corazón se escribe con C.' },
          { id: 'c55', word: 'corona', options: ['korona', 'corona', 'corrona'], rule: 'Corona empieza por co, con C.' },
          { id: 'c56', word: 'correr', options: ['korrer', 'correr', 'corer'], rule: 'Correr se escribe con C y RR.' },
          { id: 'c57', word: 'cosa', options: ['koza', 'cosa', 'coza'], rule: 'Cosa empieza por co, con C.' },
          { id: 'c58', word: 'cuchara', options: ['kuchara', 'cuchara', 'cuxara'], rule: 'Cuchara empieza por cu, con C.' },
          { id: 'c59', word: 'cuchillo', options: ['kuchillo', 'cuchillo', 'cuchiyo'], rule: 'Cuchillo empieza por cu, con C.' },
          { id: 'c60', word: 'cuaderno', options: ['quaderno', 'cuaderno', 'kuaderno'], rule: 'Cuaderno empieza por cua, con C.' },
          { id: 'c61', word: 'cuento', options: ['quento', 'cuento', 'kuento'], rule: 'Cuento empieza por cue, con C.' },
          { id: 'c62', word: 'cuerpo', options: ['querpo', 'cuerpo', 'kuerpo'], rule: 'Cuerpo empieza por cue, con C.' },
          { id: 'c63', word: 'cuidado', options: ['quidado', 'cuidado', 'kuidado'], rule: 'Cuidado empieza por cui, con C.' },
          { id: 'c64', word: 'cuna', options: ['kuna', 'cuna', 'cunna'], rule: 'Cuna empieza por cu, con C.' },
          { id: 'c65', word: 'curioso', options: ['kurioso', 'curioso', 'curiozo'], rule: 'Curioso empieza por cu, con C.' }
        ]
      },
      V: {
        title: "La Galaxia de la V",
        icon: "🟣",
        subtitle: "nv, después de ol-, -ave/-eve/-ivo",
        words: [
          { id: 'v1', word: 'viento', options: ['biento', 'viento', 'vientto'], rule: 'Viento se escribe con V.' },
          { id: 'v2', word: 'invierno', options: ['inbierno', 'invierno', 'imbierno'], rule: 'Detrás de N siempre se escribe V (nv).' },
          { id: 'v3', word: 'enviar', options: ['enbiar', 'enviar', 'embiar'], rule: 'Siempre va V después de N: enviar.' },
          { id: 'v4', word: 'nieve', options: ['niebe', 'nieve', 'nibe'], rule: 'Nieve se escribe con V.' },
          { id: 'v5', word: 'ventana', options: ['bentana', 'ventana', 'venttana'], rule: 'Ventana se escribe con V.' },
          { id: 'v6', word: 'olvidar', options: ['olbidar', 'olvidar', 'orvidar'], rule: 'Detrás de la sílaba ol- siempre va V.' },
          { id: 'v7', word: 'invento', options: ['inbento', 'invento', 'imbento'], rule: 'Detrás de N siempre va V.' },
          { id: 'v8', word: 'avión', options: ['abión', 'avión', 'allón'], rule: 'Avión se escribe con V y lleva tilde.' },
          { id: 'v9', word: 'verano', options: ['berano', 'verano', 'verrano'], rule: 'Verano se escribe con V.' },
          { id: 'v10', word: 'lluvia', options: ['llubia', 'lluvia', 'yuvia'], rule: 'Lluvia se escribe con V.' },
          { id: 'v11', word: 'tranvía', options: ['tranbía', 'tranvía', 'tramvía'], rule: 'Detrás de N siempre va V (nv).' },
          { id: 'v12', word: 'envolver', options: ['enbolber', 'envolver', 'embolver'], rule: 'Lleva "nv" y detrás de ol- va V.' },
          { id: 'v13', word: 'convertir', options: ['conbertir', 'convertir', 'comvertir'], rule: 'Detrás de N va V.' },
          { id: 'v14', word: 'convivencia', options: ['conbibencia', 'convivencia', 'comvivencia'], rule: 'Detrás de N va V.' },
          { id: 'v15', word: 'invasión', options: ['inbasión', 'invasión', 'imbasión'], rule: 'Detrás de N va V (nv).' },
          { id: 'v16', word: 'disolver', options: ['disolber', 'disolver', 'dizolver'], rule: 'Detrás de ol- siempre se escribe V.' },
          { id: 'v17', word: 'polvo', options: ['polbo', 'polvo', 'porvo'], rule: 'Detrás de ol- va V.' },
          { id: 'v18', word: 'pólvora', options: ['pólbora', 'pólvora', 'porvora'], rule: 'Detrás de ol- va V.' },
          { id: 'v19', word: 'volver', options: ['bolber', 'volver', 'volber'], rule: 'Detrás de ol- va V.' },
          { id: 'v20', word: 'revolver', options: ['rebolber', 'revolver', 'revolber'], rule: 'Detrás de ol- va V.' },
          { id: 'v21', word: 'envoltorio', options: ['enboltorio', 'envoltorio', 'emboltorio'], rule: 'Lleva "nv" y detrás de ol- va V.' },
          { id: 'v22', word: 'nave', options: ['nabe', 'nave', 'naye'], rule: 'Terminación en -ave se escribe con V.' },
          { id: 'v23', word: 'llave', options: ['llabe', 'llave', 'yave'], rule: 'Palabras terminadas en -ave van con V.' },
          { id: 'v24', word: 'suave', options: ['suabe', 'suave', 'suable'], rule: 'Adjetivos terminados en -ave van con V.' },
          { id: 'v25', word: 'octavo', options: ['octabo', 'octavo', 'otavo'], rule: 'Terminación en -avo va con V.' },
          { id: 'v26', word: 'pavo', options: ['pabo', 'pavo', 'payo'], rule: 'Terminación en -avo va con V.' },
          { id: 'v27', word: 'cueva', options: ['cueba', 'cueva', 'queya'], rule: 'Terminación en -eva va con V.' },
          { id: 'v28', word: 'nueva', options: ['nueba', 'nueva', 'nueba'], rule: 'Adjetivo terminado en -eva con V.' },
          { id: 'v29', word: 'huevo', options: ['huebo', 'huevo', 'gevo'], rule: 'Terminación en -evo va con V.' },
          { id: 'v30', word: 'nuevo', options: ['nuebo', 'nuevo', 'nueyo'], rule: 'Terminación en -evo con V.' },
          { id: 'v31', word: 'creativo', options: ['creatibo', 'creativo', 'creattivo'], rule: 'Adjetivos terminados en -ivo van con V.' },
          { id: 'v32', word: 'activa', options: ['actiba', 'activa', 'ativa'], rule: 'Terminación en -iva con V.' },
          { id: 'v33', word: 'deportivo', options: ['deportibo', 'deportivo', 'deportiwo'], rule: 'Terminación en -ivo va con V.' },
          { id: 'v34', word: 'festivo', options: ['festibo', 'festivo', 'feztivo'], rule: 'Terminación en -ivo con V.' },
          { id: 'v35', word: 'pensativo', options: ['pensatibo', 'pensativo', 'penzativo'], rule: 'Terminación en -ivo va con V.' },
          { id: 'v36', word: 'vaso', options: ['baso', 'vaso', 'vazo'], rule: 'Vaso de beber se escribe con V.' },
          { id: 'v37', word: 'volcán', options: ['bolcán', 'volcán', 'vorcán'], rule: 'Volcán se escribe con V.' },
          { id: 'v38', word: 'vela', options: ['bela', 'vela', 'vella'], rule: 'Vela de barco o de luz va con V.' },
          { id: 'v39', word: 'vaca', options: ['baca', 'vaca', 'vaqua'], rule: 'Vaca animal se escribe con V.' },
          { id: 'v40', word: 'uva', options: ['uba', 'uva', 'uvba'], rule: 'Uva fruta se escribe con V.' },
          { id: 'v41', word: 'vino', options: ['bino', 'vino', 'vinno'], rule: 'Vino se escribe con V.' },
          { id: 'v42', word: 'verde', options: ['berde', 'verde', 'vuerde'], rule: 'Color verde se escribe con V.' },
          { id: 'v43', word: 'voz', options: ['boz', 'voz', 'vos'], rule: 'Voz se escribe con V y termina en Z.' },
          { id: 'v44', word: 'selva', options: ['selba', 'selva', 'serba'], rule: 'Selva se escribe con V.' },
          { id: 'v45', word: 'vivir', options: ['bibir', 'vivir', 'bivir'], rule: 'Vivir lleva las dos con V.' },
          { id: 'v46', word: 'vida', options: ['bida', 'vida', 'vilda'], rule: 'Vida se escribe con V.' },
          { id: 'v47', word: 'curva', options: ['curba', 'curva', 'qurva'], rule: 'Curva se escribe con V.' },
          { id: 'v48', word: 'clavo', options: ['clabo', 'clavo', 'crayo'], rule: 'Clavo termina en -avo con V.' },
          { id: 'v49', word: 'avispa', options: ['abispa', 'avispa', 'avizpa'], rule: 'Avispa se escribe con V.' },
          { id: 'v50', word: 'violín', options: ['biolín', 'violín', 'viollín'], rule: 'Violín se escribe con V.' },
          { id: 'v51', word: 'vestido', options: ['bestido', 'vestido', 'veztido'], rule: 'Vestido se escribe con V.' },
          { id: 'v52', word: 'viernes', options: ['biernes', 'viernes', 'vjernes'], rule: 'Viernes se escribe con V.' },
          { id: 'v53', word: 'vecino', options: ['becino', 'vecino', 'vezino'], rule: 'Vecino se escribe con V y con C.' },
          { id: 'v54', word: 'veloz', options: ['beloz', 'veloz', 'velos'], rule: 'Veloz se escribe con V.' },
          { id: 'v55', word: 'vampiro', options: ['bampiro', 'vampiro', 'vamppiro'], rule: 'Vampiro se escribe con V.' },
          { id: 'v56', word: 'ave', options: ['abe', 'ave', 'aye'], rule: 'Termina en -ave con V.' },
          { id: 'v57', word: 'viajero', options: ['biajero', 'viajero', 'viagero'], rule: 'Viajero se escribe con V y con J.' },
          { id: 'v58', word: 'víbora', options: ['bíbora', 'víbora', 'vívora'], rule: 'Víbora empieza con V y luego lleva B.' },
          { id: 'v59', word: 'velero', options: ['belero', 'velero', 'vellero'], rule: 'Velero se escribe con V.' },
          { id: 'v60', word: 'verdad', options: ['berdad', 'verdad', 'verda'], rule: 'Verdad se escribe con V.' },
          { id: 'v61', word: 'visita', options: ['bisita', 'visita', 'vizita'], rule: 'Visita se escribe con V.' },
          { id: 'v62', word: 'vista', options: ['bista', 'vista', 'vysta'], rule: 'Vista se escribe con V.' },
          { id: 'v63', word: 'venado', options: ['benado', 'venado', 'venao'], rule: 'Venado se escribe con V.' },
          { id: 'v64', word: 'vagón', options: ['bagón', 'vagón', 'baghon'], rule: 'Vagón se escribe con V.' },
          { id: 'v65', word: 'velocidad', options: ['belocidad', 'velocidad', 'velosidad'], rule: 'Velocidad se escribe con V y con C.' }
        ]
      }
    };


    // Oraciones adecuadas para 3.º de Primaria. El sujeto y el predicado
    // se guardan por separado para colorearlos sin cambiar la oración.
    const SUBJECT_SENTENCES = [
      { subject: "El perro", predicate: "ladra.", explanation: "Preguntamos: ¿quién ladra? El perro. Por eso, «El perro» es el sujeto. Lo que hace, «ladra», es el predicado." },
      { subject: "La gata", predicate: "duerme en el sofá.", explanation: "¿Quién duerme en el sofá? La gata. Ese es el sujeto; «duerme en el sofá» cuenta lo que hace y es el predicado." },
      { subject: "Mi hermano", predicate: "juega con la pelota.", explanation: "¿Quién juega con la pelota? Mi hermano. Esa parte es el sujeto. La acción y lo demás forman el predicado." },
      { subject: "Los pájaros", predicate: "cantan en el árbol.", explanation: "¿Quiénes cantan en el árbol? Los pájaros. Ese es el sujeto; «cantan en el árbol» es el predicado." },
      { subject: "La niña", predicate: "lee un cuento.", explanation: "¿Quién lee un cuento? La niña. El sujeto nos dice de quién hablamos y el predicado nos dice qué hace." },
      { subject: "El bebé", predicate: "sonríe a su madre.", explanation: "¿Quién sonríe a su madre? El bebé. «El bebé» es el sujeto y «sonríe a su madre» es el predicado." },
      { subject: "Mi amigo", predicate: "monta en bicicleta.", explanation: "¿Quién monta en bicicleta? Mi amigo. Esa es la parte del sujeto. Lo que hace es el predicado." },
      { subject: "Las flores", predicate: "crecen en el jardín.", explanation: "¿Qué cosas crecen en el jardín? Las flores. Esa parte es el sujeto; lo que se dice de ellas es el predicado." },
      { subject: "El gato negro", predicate: "persigue una mariposa.", explanation: "¿Quién persigue una mariposa? El gato negro. Todo ese grupo es el sujeto; «persigue una mariposa» es el predicado." },
      { subject: "La maestra", predicate: "escribe en la pizarra.", explanation: "¿Quién escribe en la pizarra? La maestra. Ese es el sujeto. La acción y las palabras que la acompañan forman el predicado." },
      { subject: "Mi abuela", predicate: "prepara una tarta.", explanation: "¿Quién prepara una tarta? Mi abuela. «Mi abuela» es el sujeto y «prepara una tarta» es el predicado." },
      { subject: "Los niños", predicate: "corren por el patio.", explanation: "¿Quiénes corren por el patio? Los niños. Ese es el sujeto; «corren por el patio» es el predicado." },
      { subject: "El conejo blanco", predicate: "come una zanahoria.", explanation: "¿Quién come una zanahoria? El conejo blanco. El sujeto puede tener varias palabras. El resto es el predicado." },
      { subject: "Mi prima pequeña", predicate: "dibuja un castillo.", explanation: "¿Quién dibuja un castillo? Mi prima pequeña. Todas esas palabras forman el sujeto; «dibuja un castillo» es el predicado." },
      { subject: "El tren", predicate: "llega a la estación.", explanation: "¿Qué llega a la estación? El tren. Esa parte es el sujeto y lo que se dice del tren es el predicado." },
      { subject: "Las nubes", predicate: "cubren el cielo.", explanation: "¿Qué cubre el cielo? Las nubes. «Las nubes» es el sujeto y «cubren el cielo» es el predicado." },
      { subject: "Mi padre", predicate: "riega las plantas.", explanation: "¿Quién riega las plantas? Mi padre. Esa parte es el sujeto; la acción y lo demás forman el predicado." },
      { subject: "La tortuga", predicate: "camina muy despacio.", explanation: "¿Quién camina muy despacio? La tortuga. Ese es el sujeto. «Camina muy despacio» es el predicado." },
      { subject: "Los peces de colores", predicate: "nadan en la pecera.", explanation: "¿Quiénes nadan en la pecera? Los peces de colores. El sujeto incluye las palabras que dicen cuáles son los peces." },
      { subject: "El jardinero", predicate: "corta el césped.", explanation: "¿Quién corta el césped? El jardinero. «El jardinero» es el sujeto y «corta el césped» es el predicado." },
      { subject: "La luna", predicate: "brilla por la noche.", explanation: "¿Qué brilla por la noche? La luna. Esa es la parte del sujeto; «brilla por la noche» es el predicado." },
      { subject: "Mis primos", predicate: "juegan al escondite.", explanation: "¿Quiénes juegan al escondite? Mis primos. Esa parte es el sujeto; lo que hacen es el predicado." },
      { subject: "El cocinero", predicate: "prepara una sopa caliente.", explanation: "¿Quién prepara una sopa caliente? El cocinero. Ese es el sujeto y «prepara una sopa caliente» es el predicado." },
      { subject: "La niña de la camiseta roja", predicate: "salta a la comba.", explanation: "¿Quién salta a la comba? La niña de la camiseta roja. Todo ese grupo de palabras es el sujeto." },
      { subject: "Los bomberos", predicate: "ayudan a las personas.", explanation: "¿Quiénes ayudan a las personas? Los bomberos. Ese es el sujeto y «ayudan a las personas» es el predicado." },
      { subject: "El cartero", predicate: "reparte las cartas por el barrio.", explanation: "¿Quién reparte las cartas por el barrio? El cartero. Esa parte es el sujeto; el resto es el predicado." },
      { subject: "Mi mejor amiga", predicate: "vive cerca del colegio.", explanation: "¿Quién vive cerca del colegio? Mi mejor amiga. Ese grupo es el sujeto y «vive cerca del colegio» es el predicado." },
      { subject: "Las hormigas pequeñas", predicate: "transportan migas de pan.", explanation: "¿Quiénes transportan migas de pan? Las hormigas pequeñas. Ese es el sujeto; lo que hacen es el predicado." },
      { subject: "El equipo de mi clase", predicate: "ganó el partido.", explanation: "¿Qué equipo ganó el partido? El equipo de mi clase. Esa parte es el sujeto; «ganó el partido» es el predicado." },
      { subject: "La ardilla", predicate: "guarda nueces en el árbol.", explanation: "¿Quién guarda nueces en el árbol? La ardilla. «La ardilla» es el sujeto y «guarda nueces en el árbol» es el predicado." },
      { subject: "Los alumnos de tercero", predicate: "visitan la biblioteca.", explanation: "¿Quiénes visitan la biblioteca? Los alumnos de tercero. Ese grupo es el sujeto; «visitan la biblioteca» es el predicado." },
      { subject: "Mi vecino", predicate: "pasea a su perro cada tarde.", explanation: "¿Quién pasea a su perro cada tarde? Mi vecino. Ese es el sujeto; la acción y cuándo la hace forman el predicado." },
      { subject: "La lluvia", predicate: "moja las calles del pueblo.", explanation: "¿Qué moja las calles del pueblo? La lluvia. «La lluvia» es el sujeto y «moja las calles del pueblo» es el predicado." },
      { subject: "El pequeño dragón", predicate: "echa humo por la nariz.", explanation: "¿Quién echa humo por la nariz? El pequeño dragón. Ese grupo es el sujeto; lo que hace es el predicado." },
      { subject: "Las mariposas", predicate: "revolotean entre las flores.", explanation: "¿Quiénes revolotean entre las flores? Las mariposas. Esa parte es el sujeto; «revolotean entre las flores» es el predicado." },
      { subject: "Mi hermana mayor", predicate: "ordena sus libros en la estantería.", explanation: "¿Quién ordena sus libros en la estantería? Mi hermana mayor. Todo ese grupo es el sujeto." },
      { subject: "El autobús escolar", predicate: "recoge a los niños por la mañana.", explanation: "¿Qué recoge a los niños por la mañana? El autobús escolar. Ese es el sujeto; el resto de la oración es el predicado." },
      { subject: "Los patos del estanque", predicate: "nadan juntos por el agua.", explanation: "¿Quiénes nadan juntos por el agua? Los patos del estanque. Ese grupo es el sujeto; «nadan juntos por el agua» es el predicado." },
      { subject: "La científica", predicate: "observa una estrella con su telescopio.", explanation: "¿Quién observa una estrella con su telescopio? La científica. Esa parte es el sujeto y lo que hace es el predicado." },
      { subject: "El viento fuerte", predicate: "mueve las ramas de los árboles.", explanation: "¿Qué mueve las ramas de los árboles? El viento fuerte. Ese es el sujeto; «mueve las ramas de los árboles» es el predicado." }
    ];

    const LETTER_NAMES = {
      'a': 'a', 'b': 'be', 'c': 'ce', 'd': 'de', 'e': 'e', 'f': 'efe',
      'g': 'ge', 'h': 'hache', 'i': 'i', 'j': 'jota', 'k': 'ka', 'l': 'ele',
      'm': 'eme', 'n': 'ene', 'ñ': 'eñe', 'o': 'o', 'p': 'pe', 'q': 'cu',
      'r': 'erre', 's': 'ese', 't': 'te', 'u': 'u', 'ü': 'u con diéresis',
      'v': 'uve', 'w': 'uve doble', 'x': 'equis', 'y': 'i griega', 'z': 'zeta',
      'á': 'a con tilde', 'é': 'e con tilde', 'í': 'i con tilde', 'ó': 'o con tilde', 'ú': 'u con tilde'
    };

    // --- CONTROLADOR PRINCIPAL ---
    // 40 pares sencillos de sinónimos y antónimos, adaptados a 3.º de Primaria.
    const SYNONYM_PAIRS = [
      {word:'contento',syn:'alegre',ant:'triste'}, {word:'grande',syn:'enorme',ant:'pequeño'},
      {word:'rápido',syn:'veloz',ant:'lento'}, {word:'bonito',syn:'hermoso',ant:'feo'},
      {word:'fácil',syn:'sencillo',ant:'difícil'}, {word:'empezar',syn:'comenzar',ant:'terminar'},
      {word:'hablar',syn:'conversar',ant:'callar'}, {word:'mirar',syn:'observar',ant:'ignorar'},
      {word:'frío',syn:'helado',ant:'caliente'}, {word:'limpio',syn:'aseado',ant:'sucio'},
      {word:'fuerte',syn:'robusto',ant:'débil'}, {word:'valiente',syn:'atrevido',ant:'cobarde'},
      {word:'inteligente',syn:'listo',ant:'tonto'}, {word:'oscuro',syn:'sombrío',ant:'claro'},
      {word:'cerca',syn:'próximo',ant:'lejos'}, {word:'lleno',syn:'completo',ant:'vacío'},
      {word:'dulce',syn:'azucarado',ant:'amargo'}, {word:'gritar',syn:'chillar',ant:'susurrar'},
      {word:'trabajar',syn:'laborar',ant:'descansar'}, {word:'cuidar',syn:'proteger',ant:'descuidar'},
      {word:'ayudar',syn:'apoyar',ant:'perjudicar'}, {word:'pequeño',syn:'diminuto',ant:'grande'},
      {word:'alto',syn:'elevado',ant:'bajo'}, {word:'ancho',syn:'amplio',ant:'estrecho'},
      {word:'duro',syn:'rígido',ant:'blando'}, {word:'blando',syn:'suave',ant:'duro'},
      {word:'nuevo',syn:'reciente',ant:'viejo'}, {word:'viejo',syn:'antiguo',ant:'nuevo'},
      {word:'enfadado',syn:'furioso',ant:'tranquilo'}, {word:'tranquilo',syn:'calmado',ant:'nervioso'},
      {word:'reír',syn:'sonreír',ant:'llorar'}, {word:'llorar',syn:'sollozar',ant:'reír'},
      {word:'sano',syn:'saludable',ant:'enfermo'}, {word:'enfermo',syn:'indispuesto',ant:'sano'},
      {word:'seco',syn:'árido',ant:'mojado'}, {word:'mojado',syn:'empapado',ant:'seco'},
      {word:'abrir',syn:'destapar',ant:'cerrar'}, {word:'subir',syn:'ascender',ant:'bajar'},
      {word:'ganar',syn:'vencer',ant:'perder'}, {word:'bonito',syn:'precioso',ant:'horrible'}
    ];
    class OrthoApp {
      constructor() {
        this.currentSectionKey = 'G';
        this.currentMode = 'options';
        this.memoryKey = 'ortho_master_v5_full';
        this.memory = this.loadMemory();
        this.currentSessionWords = [];
        this.currentIndex = 0;
        this.sessionScore = 0;
        this.synth = window.speechSynthesis;
        this.subjectIndex = 0;
        this.subjectOrder = [];
        this.subjectAnswered = false;
        this.synMode = 'options';
        this.synOrder = [];
        this.synIndex = 0;
        this.synScore = 0;
        this.synAnswered = false;
        this.synCurrent = null;
        this.synRelation = 'synonym';
      }

      loadMemory() {
        try { const saved = localStorage.getItem(this.memoryKey); return saved ? JSON.parse(saved) : {}; } catch (e) { return {}; }
      }

      saveMemory() {
        try { localStorage.setItem(this.memoryKey, JSON.stringify(this.memory)); } catch (e) {}
      }

      enterOrthographyAdventure() {
        ['screen-splash','screen-academy','screen-splash','screen-main-menu','screen-orthography-menu','screen-section-hub','screen-result','screen-game','screen-subject-game','screen-syn-hub','screen-syn-game'].forEach(id => document.getElementById(id).classList.add('hidden'));
        document.getElementById('screen-orthography-menu').classList.remove('hidden');
        document.body.classList.remove('santa-theme');
        document.body.classList.add('letter-theme');
        this.currentSectionKey = null;
        this.updateSharedRewards();
      }

      enterSantaAdventure() {
        this.currentSectionKey = null;
        document.getElementById('screen-orthography-menu').classList.add('hidden');
        document.getElementById('screen-academy').classList.add('hidden');
        document.getElementById('screen-main-menu').classList.remove('hidden');
        document.body.classList.add('santa-theme');
        this.updateSharedRewards();
      }

      goToAcademyMenu() {
        this.currentSectionKey = null;
        ['screen-splash','screen-main-menu','screen-orthography-menu','screen-section-hub','screen-result','screen-game','screen-subject-game','screen-syn-hub','screen-syn-game'].forEach(id => document.getElementById(id).classList.add('hidden'));
        document.getElementById('screen-academy').classList.remove('hidden');
        document.getElementById('coming-soon-note').classList.add('hidden');
        document.body.classList.remove('santa-theme','letter-theme');
        this.updateSharedRewards();
      }

      showAdventures() {
        document.getElementById('screen-splash').classList.add('hidden');
        ['screen-splash','screen-main-menu','screen-orthography-menu','screen-section-hub','screen-result','screen-game','screen-subject-game','screen-syn-hub','screen-syn-game'].forEach(id => document.getElementById(id).classList.add('hidden'));
        document.getElementById('screen-academy').classList.remove('hidden');
        document.getElementById('coming-soon-note').classList.add('hidden');
        document.body.classList.remove('santa-theme','letter-theme');
        this.updateSharedRewards();
      }

      showComingSoon() {
        document.getElementById('coming-soon-note').classList.remove('hidden');
        document.getElementById('coming-soon-note').scrollIntoView({behavior:'smooth',block:'nearest'});
      }

      updateSharedRewards() {
        let total = 0;
        try { total = Number(localStorage.getItem('owl_academy_shared_stars') || 0); } catch(e) {}
        document.getElementById('global-stars').textContent = total;
      }

      awardSharedReward(amount=1) {
        let total = 0;
        try { total = Number(localStorage.getItem('owl_academy_shared_stars') || 0); total += amount; localStorage.setItem('owl_academy_shared_stars', String(total)); } catch(e) { total += amount; }
        document.getElementById('global-stars').textContent = total;
        const counter = document.getElementById('global-reward-counter');
        counter.classList.remove('reward-pop'); void counter.offsetWidth; counter.classList.add('reward-pop');
      }

      enterSection(secKey) {
        this.currentSectionKey = secKey;
        document.body.classList.remove('santa-theme');
        document.body.classList.add('letter-theme');
        const sec = DATABASE[secKey];

        document.getElementById('sec-icon').textContent = sec.icon;
        document.getElementById('sec-title').textContent = sec.title;
        document.getElementById('sec-subtitle').textContent = sec.subtitle;

        let green = 0, yellow = 0, red = 0;
        sec.words.forEach(w => {
          const st = this.memory[w.id]?.status;
          if (st === 'green') green++;
          else if (st === 'yellow') yellow++;
          else if (st === 'red') red++;
        });
        document.getElementById('sec-green').textContent = green;
        document.getElementById('sec-yellow').textContent = yellow;
        document.getElementById('sec-red').textContent = red;

        document.getElementById('screen-main-menu').classList.add('hidden');
        document.getElementById('screen-orthography-menu').classList.add('hidden');
        document.getElementById('screen-section-hub').classList.remove('hidden');
      }

      goToMainMenu() {
        ['screen-academy','screen-orthography-menu','screen-section-hub','screen-result','screen-game','screen-subject-game','screen-syn-hub','screen-syn-game'].forEach(id => document.getElementById(id).classList.add('hidden'));
        if (this.currentSectionKey) {
          document.getElementById('screen-orthography-menu').classList.remove('hidden');
        } else {
          document.getElementById('screen-main-menu').classList.remove('hidden');
        }
        if (this.currentSectionKey) { document.body.classList.remove('santa-theme'); document.body.classList.add('letter-theme'); }
        else { document.body.classList.remove('letter-theme'); document.body.classList.add('santa-theme'); }
        this.updateSharedRewards();
      }

      openSynonymsHub() {
        ['screen-main-menu','screen-section-hub','screen-game','screen-result','screen-subject-game','screen-syn-game'].forEach(id => document.getElementById(id).classList.add('hidden'));
        document.getElementById('screen-syn-hub').classList.remove('hidden');
      }

      startSynonymsGame(mode) {
        this.synMode = mode;
        this.synOrder = [...Array(SYNONYM_PAIRS.length).keys()].sort(() => Math.random() - .5).slice(0,10);
        this.synIndex = 0; this.synScore = 0; this.synAnswered = false;
        ['screen-main-menu','screen-section-hub','screen-result','screen-subject-game','screen-syn-hub'].forEach(id => document.getElementById(id).classList.add('hidden'));
        document.getElementById('screen-game').classList.add('hidden');
        document.getElementById('screen-syn-game').classList.remove('hidden');
        this.loadSynChallenge();
      }

      loadSynChallenge() {
        this.synAnswered = false;
        const item = SYNONYM_PAIRS[this.synOrder[this.synIndex]];
        this.synCurrent = item;
        this.synRelation = Math.random() < .5 ? 'synonym' : 'antonym';
        document.getElementById('syn-counter').textContent = `Reto ${this.synIndex+1} de ${this.synOrder.length}`;
        document.getElementById('syn-progress').style.width = `${(this.synIndex/this.synOrder.length)*100}%`;
        document.getElementById('syn-prompt').textContent = item.word;
        document.getElementById('syn-feedback').className = 'hidden feedback-box';
        document.getElementById('syn-feedback').innerHTML = '';
        document.getElementById('syn-next').classList.add('hidden');
        const options = document.getElementById('syn-options'); options.innerHTML='';
        const pairControls = document.getElementById('syn-pair-controls');
        if (this.synMode === 'options') {
          document.getElementById('syn-game-title').textContent = '🎯 Las 3 Opciones';
          document.getElementById('syn-type').textContent = this.synRelation === 'synonym' ? 'BUSCA UN SINÓNIMO' : 'BUSCA UN ANTÓNIMO';
          document.getElementById('syn-instruction').textContent = this.synRelation === 'synonym' ? 'Elige la palabra que significa algo parecido.' : 'Elige la palabra que significa lo contrario.';
          pairControls.classList.add('hidden');
          const correct = this.synRelation === 'synonym' ? item.syn : item.ant;
          const distractors = SYNONYM_PAIRS.filter(p=>p!==item).map(p=>this.synRelation==='synonym'?p.syn:p.ant).sort(()=>Math.random()-.5).slice(0,2);
          [correct,...distractors].sort(()=>Math.random()-.5).forEach(choice=>{
            const b=document.createElement('button'); b.className='syn-choice'; b.textContent=choice; b.onclick=()=>this.answerSynOption(choice,correct); options.appendChild(b);
          });
        } else {
          document.getElementById('syn-game-title').textContent = '🛷 El Trineo de las Parejas';
          const useSyn = Math.random() < .5;
          this.synRelation = useSyn ? 'synonym' : 'antonym';
          document.getElementById('syn-type').textContent = '¿QUÉ TIPO DE PAREJA ES?';
          document.getElementById('syn-instruction').textContent = 'Lee las dos palabras y decide si se parecen o significan lo contrario.';
          document.getElementById('syn-prompt').textContent = `${item.word} + ${useSyn?item.syn:item.ant}`;
          pairControls.classList.remove('hidden');
          options.innerHTML='';
        }
        setTimeout(()=>this.speakSynPrompt(),180);
      }

      speakSynPrompt() {
        if (!this.synCurrent || !this.synth) return;
        this.synth.cancel();
        const text = this.synMode==='pair' ? document.getElementById('syn-prompt').textContent : `${this.synRelation==='synonym'?'Sinónimo':'Antónimo'} de ${this.synCurrent.word}`;
        const u = new SpeechSynthesisUtterance(text); u.lang='es-ES'; u.rate=.85; this.synth.speak(u);
      }

      answerSynOption(choice, correct) {
        if (this.synAnswered) return;
        this.synAnswered = true;
        document.querySelectorAll('#syn-options button').forEach(b=>{b.disabled=true;if(b.textContent===correct)b.style.borderColor='#22c55e';});
        this.showSynFeedback(choice===correct, correct);
      }

      answerSynPair(answer) {
        if (this.synAnswered) return;
        this.synAnswered = true;
        this.showSynFeedback(answer===this.synRelation, this.synRelation==='synonym'?'significan algo parecido':'significan lo contrario');
      }

      showSynFeedback(correct, answer) {
        const box=document.getElementById('syn-feedback'); box.classList.remove('hidden');
        if(correct) {
          this.synScore++;
          this.awardSharedReward(1);
          box.className='feedback-box feedback-correct';
          box.innerHTML='<div style="font-size:2.2rem;">🎅🎉🍬</div><h3>¡Jo, jo, jo! ¡Muy bien!</h3><p>Has encontrado la relación entre las palabras. ¡Guirnaldas para ti!</p>';
          if(typeof confetti==='function') confetti({particleCount:90,spread:75,origin:{y:.55}});
          animateSantaMood(true); dropGarland();
        } else {
          box.className='feedback-box feedback-wrong'; animateSantaMood(false);
          const item=this.synCurrent;
          const rel=this.synRelation==='synonym'?'sinónimos: significan algo parecido':'antónimos: significan lo contrario';
          box.innerHTML=`<div style="font-size:2rem;">🎅💡</div><h3>¡Vamos a aprenderlo!</h3><p>La respuesta era <b>${answer}</b>.</p><p><b>${item.word}</b> y <b>${item.syn}</b> son sinónimos; <b>${item.word}</b> y <b>${item.ant}</b> son antónimos.</p><p>Recuerda: ${rel}.</p>`;
        }
        document.getElementById('syn-next').classList.remove('hidden');
      }

      nextSynChallenge() {
        this.synIndex++;
        if(this.synIndex>=this.synOrder.length) {
          document.getElementById('syn-progress').style.width='100%';
          const box=document.getElementById('syn-feedback'); box.className='feedback-box feedback-correct';
          box.innerHTML=`<div style="font-size:2.4rem;">🎄🏆🎅</div><h3>¡Misión navideña completada!</h3><p>Has acertado ${this.synScore} de ${this.synOrder.length} retos. ¡Cada palabra nueva es un regalo!</p>`;
          document.getElementById('syn-next').textContent='Volver al taller 🎁';
          document.getElementById('syn-next').onclick=()=>{document.getElementById('syn-next').textContent='Siguiente reto ➡️';document.getElementById('syn-next').onclick=()=>this.nextSynChallenge();this.openSynonymsHub();};
          if(typeof confetti==='function') confetti({particleCount:150,spread:100,origin:{y:.5}});
          animateSantaMood(true); return;
        }
        this.loadSynChallenge();
      }


      returnToSectionHub() {
        document.getElementById('screen-result').classList.add('hidden');
        this.enterSection(this.currentSectionKey);
      }

      startGame(mode) {
        this.currentMode = mode;
        const sec = DATABASE[this.currentSectionKey];

        const reds = sec.words.filter(w => this.memory[w.id]?.status === 'red');
        const yellows = sec.words.filter(w => this.memory[w.id]?.status === 'yellow');
        const unpracticed = sec.words.filter(w => !this.memory[w.id]);
        const greens = sec.words.filter(w => this.memory[w.id]?.status === 'green');

        const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

        let selected = [];
        selected.push(...shuffle(reds));
        selected.push(...shuffle(yellows));
        if (selected.length < 10) selected.push(...shuffle(unpracticed));
        if (selected.length < 10) selected.push(...shuffle(greens));

        this.currentSessionWords = shuffle(selected.slice(0, 10));
        this.currentIndex = 0;
        this.sessionScore = 0;

        document.getElementById('screen-section-hub').classList.add('hidden');
        document.getElementById('screen-game').classList.remove('hidden');

        const modeName = (mode === 'options') ? '🎯 3 Opciones' : '🔤 Deletreo';
        document.getElementById('game-tag-info').textContent = `${sec.icon} ${this.currentSectionKey} · ${modeName}`;

        this.loadWord();
      }

      loadWord() {
        const item = this.currentSessionWords[this.currentIndex];
        document.getElementById('word-counter').textContent = `Palabra ${this.currentIndex + 1} de 10`;
        document.getElementById('progress-fill').style.width = `${(this.currentIndex / 10) * 100}%`;

        document.getElementById('phase-write').classList.remove('hidden');
        document.getElementById('phase-options').classList.add('hidden');
        document.getElementById('phase-spelling').classList.add('hidden');
        document.getElementById('phase-feedback').classList.add('hidden');

        setTimeout(() => this.playAudioWord(), 300);
      }

      playAudioWord() {
        const item = this.currentSessionWords[this.currentIndex];
        if (!item) return;
        this.synth.cancel();
        const u = new SpeechSynthesisUtterance(item.word);
        u.lang = 'es-ES';
        u.rate = 0.82;
        this.synth.speak(u);
      }

      readyToCheck() {
        document.getElementById('phase-write').classList.add('hidden');
        if (this.currentMode === 'options') {
          this.revealOptions();
        } else {
          this.startSpellingMode();
        }
      }

      revealOptions() {
        const item = this.currentSessionWords[this.currentIndex];
        const container = document.getElementById('options-container');
        container.innerHTML = '';

        const shuffled = [...item.options].sort(() => Math.random() - 0.5);
        shuffled.forEach(opt => {
          const btn = document.createElement('button');
          btn.className = 'option-btn';
          btn.textContent = opt;
          btn.onclick = () => this.evaluateAnswer(opt === item.word, item);
          container.appendChild(btn);
        });

        document.getElementById('phase-options').classList.remove('hidden');
      }

      startSpellingMode() {
        const item = this.currentSessionWords[this.currentIndex];
        const container = document.getElementById('spelling-tiles');
        container.innerHTML = '';

        for (let char of item.word) {
          const tile = document.createElement('div');
          tile.className = 'letter-tile';
          tile.textContent = char.toUpperCase();
          container.appendChild(tile);
        }

        document.getElementById('phase-spelling').classList.remove('hidden');
        this.spellWordAloud();
      }

      spellWordAloud() {
        const item = this.currentSessionWords[this.currentIndex];
        const tiles = document.querySelectorAll('.letter-tile');
        this.synth.cancel();

        tiles.forEach(t => t.className = 'letter-tile');

        let letters = item.word.toLowerCase().split('');
        let i = 0;

        const speakNextLetter = () => {
          if (i >= letters.length) {
            setTimeout(() => {
              const uEnd = new SpeechSynthesisUtterance(item.word);
              uEnd.lang = 'es-ES';
              this.synth.speak(uEnd);
            }, 300);
            return;
          }

          tiles.forEach((t, idx) => {
            if (idx === i) t.className = 'letter-tile speaking';
            else if (idx < i) t.className = 'letter-tile completed';
          });

          const char = letters[i];
          const spokenName = LETTER_NAMES[char] || char;
          const u = new SpeechSynthesisUtterance(spokenName);
          u.lang = 'es-ES';
          u.rate = 0.9;

          u.onend = () => {
            i++;
            setTimeout(speakNextLetter, 220);
          };

          this.synth.speak(u);
        };

        setTimeout(speakNextLetter, 300);
      }

      evaluateSpelling(isCorrect) {
        this.synth.cancel();
        const item = this.currentSessionWords[this.currentIndex];
        document.getElementById('phase-spelling').classList.add('hidden');
        this.evaluateAnswer(isCorrect, item);
      }

      evaluateAnswer(isCorrect, item) {
        document.getElementById('phase-options').classList.add('hidden');
        const feedbackCard = document.getElementById('feedback-card');
        const emojiEl = document.getElementById('feedback-emoji');
        const titleEl = document.getElementById('feedback-title');
        const descEl = document.getElementById('feedback-desc');

        let wordState = this.memory[item.id] || { status: 'new', streak: 0 };

        if (isCorrect) {
          this.sessionScore++;
          this.awardSharedReward(1);
          confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
          animateSantaMood(true);

          feedbackCard.className = 'feedback-box feedback-correct';
          emojiEl.textContent = '🍬 ¡Excelente!';
          titleEl.textContent = '¡La has escrito perfecta!';
          descEl.textContent = `"${item.word}" está impecable. ¡Gran memoria!`;

          if (wordState.status === 'red') {
            wordState.status = 'yellow';
            wordState.streak = 1;
          } else if (wordState.status === 'yellow') {
            wordState.streak += 1;
            if (wordState.streak >= 3) wordState.status = 'green';
          } else {
            wordState.status = 'green';
          }
        } else {
          feedbackCard.className = 'feedback-box feedback-wrong';
          emojiEl.textContent = '💖 ¡Casi, casi!';
          titleEl.textContent = '¡No te preocupes, así aprendemos!';
          descEl.innerHTML = `La forma correcta es <b>"${item.word}"</b>.<br>${item.rule}<br><i>Rodea la palabra con lápiz verde en tu libreta.</i>`;

          wordState.status = 'red';
          wordState.streak = 0;
        }

        this.memory[item.id] = wordState;
        this.saveMemory();

        document.getElementById('phase-feedback').classList.remove('hidden');
      }

      nextWord() {
        this.currentIndex++;
        if (this.currentIndex < 10 && this.currentIndex < this.currentSessionWords.length) {
          this.loadWord();
        } else {
          this.showFinalScreen();
        }
      }


      startSubjectPredicateGame() {
        this.subjectOrder = [...Array(SUBJECT_SENTENCES.length).keys()];
        // Mezcla las oraciones para que las sesiones no sean siempre iguales.
        this.subjectOrder.sort(() => Math.random() - 0.5);
        this.subjectIndex = 0;
        document.getElementById('screen-main-menu').classList.add('hidden');
        document.getElementById('screen-section-hub').classList.add('hidden');
        document.getElementById('screen-game').classList.add('hidden');
        document.getElementById('screen-result').classList.add('hidden');
        document.getElementById('screen-syn-hub').classList.add('hidden');
        document.getElementById('screen-syn-game').classList.add('hidden');
        document.getElementById('screen-subject-game').classList.remove('hidden');
        this.loadSubjectSentence();
      }

      currentSubjectSentence() {
        return SUBJECT_SENTENCES[this.subjectOrder[this.subjectIndex]];
      }

      loadSubjectSentence() {
        const item = this.currentSubjectSentence();
        this.subjectAnswered = false;
        document.getElementById('subject-counter').textContent = `Oración ${this.subjectIndex + 1} de ${this.subjectOrder.length}`;
        document.getElementById('subject-sentence').textContent = `${item.subject} ${item.predicate}`;
        document.getElementById('subject-before-check').classList.remove('hidden');
        document.getElementById('subject-after-check').classList.add('hidden');
        document.getElementById('subject-colored-sentence').innerHTML = '';
        document.getElementById('subject-feedback').className = 'hidden feedback-box';
        document.getElementById('subject-feedback').textContent = '';
        document.getElementById('subject-next-button').classList.add('hidden');
        document.getElementById('subject-answer-buttons').classList.remove('hidden');
        setTimeout(() => this.playSubjectSentence(), 250);
      }

      playSubjectSentence() {
        const item = this.currentSubjectSentence();
        if (!item || !this.synth) return;
        this.synth.cancel();
        const utterance = new SpeechSynthesisUtterance(`${item.subject} ${item.predicate}`);
        utterance.lang = 'es-ES';
        utterance.rate = 0.82;
        this.synth.speak(utterance);
      }

      checkSubjectSentence() {
        const item = this.currentSubjectSentence();
        const colored = document.getElementById('subject-colored-sentence');
        const subjectSpan = document.createElement('span');
        subjectSpan.textContent = item.subject;
        subjectSpan.style.color = '#E5484D';
        const predicateSpan = document.createElement('span');
        predicateSpan.textContent = ` ${item.predicate}`;
        predicateSpan.style.color = '#38A8E8';
        colored.replaceChildren(subjectSpan, predicateSpan);
        document.getElementById('subject-before-check').classList.add('hidden');
        document.getElementById('subject-after-check').classList.remove('hidden');
        this.subjectAnswered = false;
      }

      answerSubjectCheck(didWell) {
        if (this.subjectAnswered) return;
        this.subjectAnswered = true;
        const feedback = document.getElementById('subject-feedback');
        const buttons = document.getElementById('subject-answer-buttons');
        const item = this.currentSubjectSentence();
        buttons.classList.add('hidden');
        feedback.classList.remove('hidden');

        if (didWell) {
          this.awardSharedReward(1);
          feedback.className = 'feedback-box feedback-correct';
          feedback.innerHTML = '<div style="font-size:2.2rem;">🎉🌈🍬</div><h3>¡Muy bien!</h3><p>¡Has identificado el sujeto y el predicado! ¡Te has ganado unas guirnaldas!</p>';
          if (typeof confetti === 'function') confetti({ particleCount: 100, spread: 75, origin: { y: 0.6 } });
          animateSantaMood(true); dropGarland();
        } else {
          feedback.className = 'feedback-box feedback-wrong';
          animateSantaMood(false);
          feedback.innerHTML = `<div class="mascot mascot-small" role="img" aria-label="Papá Noel, la mascota navideña"></div><h3>¡Vamos a aprenderlo!</h3><p style="margin-top:8px;"><b style="color:#E5484D;">Sujeto:</b> ${item.subject}</p><p><b style="color:#38A8E8;">Predicado:</b> ${item.predicate}</p><p style="margin-top:10px;">${item.explanation}</p>`;
        }
        document.getElementById('subject-next-button').classList.remove('hidden');
      }

      nextSubjectSentence() {
        this.subjectIndex++;
        if (this.subjectIndex >= this.subjectOrder.length) {
          this.subjectIndex = 0;
          this.subjectOrder.sort(() => Math.random() - 0.5);
        }
        this.loadSubjectSentence();
      }

      showFinalScreen() {
        document.getElementById('screen-game').classList.add('hidden');
        document.getElementById('screen-result').classList.remove('hidden');

        let grade = 'NOTABLE';
        let sub = '¡Gran esfuerzo hoy! Cada sesión escribes con más seguridad.';
        let icon = '🎖️';

        if (this.sessionScore === 10) {
          grade = 'SOBRESALIENTE +';
          sub = '¡Impecable! ¡Has acertado todas las palabras!';
          icon = '👑';
          confetti({ particleCount: 150, spread: 90, origin: { y: 0.5 } });
          animateSantaMood(true);
        } else if (this.sessionScore >= 8) {
          grade = 'SOBRESALIENTE';
          sub = '¡Fantástico trabajo! Tu ortografía es estupenda.';
          icon = '🌟';
        } else if (this.sessionScore >= 6) {
          grade = 'NOTABLE +';
          sub = '¡Muy buen entrenamiento! Se nota que practicas con ganas.';
          icon = '🚀';
        }

        document.getElementById('result-trophy').textContent = icon;
        document.getElementById('result-grade').textContent = grade;
        document.getElementById('result-subtitle').textContent = sub;
      }
    }

    const app = new OrthoApp();
    app.updateSharedRewards();
  
