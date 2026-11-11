/* La Isla de las Palabras */
    (function () {
      // La Isla de las Palabras: pantalla nueva que agrupa La Liga de las Letras y El Reto de Papá Noel (funciones originales sin tocar)
      const hub = () => document.getElementById('screen-lengua');
      app.openLengua = function () {
        document.querySelectorAll('[id^="screen-"]').forEach(el => el.classList.add('hidden'));
        hub().classList.remove('hidden');
        document.body.classList.remove('santa-theme', 'letter-theme', 'chick-theme', 'dragon-theme');
        app.currentSectionKey = null; app.updateSharedRewards(); window.scrollTo({ top: 0 });
      };
      ['enterOrthographyAdventure', 'enterSantaAdventure', 'goToAcademyMenu'].forEach(name => {
        const orig = app[name].bind(app);
        app[name] = function () { hub().classList.add('hidden'); return orig.apply(app, arguments); };
      });
    })();
  
