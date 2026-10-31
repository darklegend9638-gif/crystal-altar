/* 36_hud_fit.js — числа в шапке (тикеты / монеты) всегда помещаются в рамку:
   шрифт уменьшается, пока текст не влезет (работает для форматов 1M, «1 миллион» и 1.000.000) */
(function(){"use strict";
var BASE=0,MIN=8,busy=false;
function spans(){return[document.getElementById("hudG"),document.getElementById("hudC")].filter(Boolean)}
function over(a){for(var i=0;i<a.length;i++)if(a[i].scrollWidth>a[i].clientWidth+0.5)return true;return false}
function fit(){
 if(busy)return;var a=spans();if(!a.length)return;busy=true;
 try{
  if(!BASE){var h=document.getElementById("hud");BASE=parseFloat(getComputedStyle(h).fontSize)||14}
  var s=BASE;a.forEach(function(e){e.style.fontSize=s+"px"});
  while(s>MIN&&over(a)){s-=.5;a.forEach(function(e){e.style.fontSize=s+"px"})}
 }catch(e){}
 busy=false}
function init(){
 var a=spans();if(!a.length)return setTimeout(init,300);
 var mo=new MutationObserver(function(){fit()});
 a.forEach(function(e){mo.observe(e,{childList:true,characterData:true,subtree:true})});
 window.addEventListener("resize",fit);window.addEventListener("orientationchange",fit);
 setInterval(fit,1500);fit()}
init();
})();
