/* Aviso discreto si algo falla */
    // Aviso discreto si algo falla al cargar o al jugar (toca el aviso para cerrarlo)
    window.addEventListener('error', function (e) {
      try {
        if (!e.message) return;
        var d = document.getElementById('nb-err');
        if (!d) { d = document.createElement('div'); d.id = 'nb-err'; d.style.cssText = 'position:fixed;left:8px;right:8px;bottom:8px;z-index:2147483647;background:#7F1D1D;color:#fff;padding:10px 12px;border-radius:12px;font:12px/1.3 system-ui,sans-serif;box-shadow:0 4px 14px rgba(0,0,0,.4)'; d.onclick = function () { d.remove(); }; document.body.appendChild(d); }
        d.textContent = '⚠️ Error: ' + e.message + ' (línea ' + e.lineno + ') · toca para cerrar';
      } catch (x) {}
    });
  
