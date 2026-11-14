/* Arranque: imágenes del HTML y registro de secciones nuevas. Se carga antes que el resto del código. */
(function () {
  function asignarImagenes() { document.querySelectorAll('img[data-img]').forEach(function (i) { i.src = IMG[i.getAttribute('data-img')]; }); }
  asignarImagenes();
  /* Una sección nueva se registra así (ver ARQUITECTURA.txt):
     registrarSeccion({ tarjeta: '<div class="academy-card">…</div>', antes: 'selector de la tarjeta delante de la que va (opcional)', pantallas: '<div id="screen-…">…</div>' }) */
  window.registrarSeccion = function (o) {
    var ref = o.antes ? document.querySelector(o.antes) : null;
    if (o.tarjeta) {
      if (ref) ref.insertAdjacentHTML('beforebegin', o.tarjeta);
      else { var c = document.querySelector('#screen-academy') || document.body; c.insertAdjacentHTML('beforeend', o.tarjeta); }
    }
    if (o.pantallas) {
      var fin = document.getElementById('screen-result');
      if (fin) fin.insertAdjacentHTML('beforebegin', o.pantallas); else document.body.insertAdjacentHTML('beforeend', o.pantallas);
    }
    asignarImagenes();
  };
})();
