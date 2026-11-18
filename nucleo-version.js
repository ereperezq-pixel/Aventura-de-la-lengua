// VERSIÓN DE LA APP: suma 1 al último número (2.5.0 → 2.5.1) en cada modificación; novedad grande: sube el del medio (2.6.0); cambio enorme: el primero (3.0.0) y entrega SIEMPRE este archivo.
window.APP_VERSION = '2.5.0';
(function(){
  function poner(){
    if(document.getElementById('app-version')) return;
    var b=[].slice.call(document.querySelectorAll('button')).find(function(x){return /Sígueme/.test(x.textContent)});
    if(!b) return;
    var d=document.createElement('div');
    d.id='app-version';
    d.textContent='Versión '+window.APP_VERSION;
    d.style.cssText='margin-top:10px;font-size:.8rem;opacity:.6;text-align:center;';
    b.insertAdjacentElement('afterend',d);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',poner); else poner();
})();
