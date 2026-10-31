/* 37_nf_live.js — смена «Формата чисел» применяется сразу, без перезахода в игру:
   после выбора формата перерисовываются главный экран, шапка, док прокачек, гача, магазин, профиль, события и открытые окна */
(function(){"use strict";
function call(f){try{f()}catch(e){}}
function refreshAll(){
 call(function(){render()});
 call(function(){setLang(LANG)});               /* перерисовывает профиль, события, топ, настройки и т.д. */
 call(function(){window.gxRender&&window.gxRender()});
 call(function(){window.renderBN&&window.renderBN()});
 call(function(){var s=document.getElementById("shp");if(s&&s.style.display==="block"&&typeof renderShop==="function")renderShop()});
 call(function(){window.dispatchEvent(new Event("ca-nf"))});   /* для любых модулей, которым нужно перерисоваться самим */
 call(function(){window.__profSet&&window.__profSet()});
}
function wrap(){
 var o=window.nfSet;if(typeof o!=="function"||o.__live)return;
 var n=function(m){var r=o.apply(this,arguments);refreshAll();setTimeout(refreshAll,60);return r};
 n.__live=1;window.nfSet=n;try{nfSet=n}catch(e){}}
wrap();
})();
