/* LISTA DE ARCHIVOS DE LA APP, en el orden en que se cargan. Para añadir algo nuevo basta con subir su archivo y
   añadir su nombre aquí. El service worker (sw.js) lee esta lista, así que también lo guarda para usar sin conexión. */
self.LISTA = {
  estilos: ['nucleo-fuente.css', 'nucleo-estilos.css', 'sec-arts.css'],
  scripts: [
    // contenido (imágenes y datos)
    'nucleo-imagenes.js', 'dat-pegatinas.js', 'dat-reino.js', 'dat-nublo-cap1.js',
    // núcleo
    'nucleo-arranque.js', 'nucleo-app.js', 'nucleo-errores.js',
    // secciones
    'sec-corral.js', 'sec-dragones.js', 'sec-isla.js', 'sec-abn.js', 'sec-nublo.js', 'sec-diplomas.js', 'sec-arts.js',
    // final
    'nucleo-final.js', 'nucleo-pwa.js'
  ]
};
