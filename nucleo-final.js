/* Mismo búho en todas las pantallas. */
(function(){var f=document.querySelector("img.owl-mascot:not([data-same-owl])");if(!f)return;document.querySelectorAll("img[data-same-owl]").forEach(function(i){i.src=f.src;});})();
