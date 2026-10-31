/* 26_modals_taps.js — закрытие окон, язык, тапы по фону, счётчики
   (вынесено из index.html без изменений; порядок подключения — по номеру файла) */

/* ── скрипт #30 ── */
try{
(function(){
/* закрытие окон: обычный надёжный клик, без задержек и блокировки кликов */
function cl(e){var t=e.target&&e.target.closest?e.target.closest(".pclose"):null;if(!t)return;
 var w=document.getElementById("pwrap");if(w&&w.classList.contains("open")){try{closePanel()}catch(_){w.classList.remove("open")}}}
document.addEventListener("click",cl,true);
document.addEventListener("touchend",function(e){var t=e.target&&e.target.closest?e.target.closest(".pclose"):null;if(!t)return;e.preventDefault();cl(e)},{capture:true,passive:false});
})();
}catch(e){try{console.error("[26_modals_taps.js #30]",e)}catch(_){}}

/* ── скрипт #31 ── */
try{
(function(){var o=window.setLang;if(typeof o!=="function")return;
window.setLang=function(e){o.apply(this,arguments);try{var b=document.getElementById("frb");if(b){var m=/\(\d+\)\s*$/.exec(b.textContent),suf=m?" "+m[0].trim():"";
b.innerHTML='<svg class="ico"><use href="#i-user"/></svg>'+(e==="en"?"Friends":"Друзья")+suf;b.__h=b.innerHTML}}catch(_){}}})();
}catch(e){try{console.error("[26_modals_taps.js #31]",e)}catch(_){}}

/* ── скрипт #32 ── */
try{
setInterval(function(){try{if(document.hidden)return;var v=fmt(S.coins||0);document.querySelectorAll(".cl-have").forEach(function(e){if(e.textContent!==v)e.textContent=v})}catch(_){}},400)
}catch(e){try{console.error("[26_modals_taps.js #32]",e)}catch(_){}}

/* ── скрипт #33 (id=bdtap) ── */
try{
(function(){var d=null;
function tgt(e){var t=e.target;return t&&(t.id==="pwrap"||(t.classList&&t.classList.contains("confirm-modal")))?t:null}
document.addEventListener("touchstart",function(e){var t=tgt(e),p=e.touches&&e.touches[0];d=t&&p?{t:t,x:p.clientX,y:p.clientY}:null},{passive:true,capture:true});
document.addEventListener("touchmove",function(e){var p=e.touches&&e.touches[0];if(d&&p&&(Math.abs(p.clientX-d.x)>10||Math.abs(p.clientY-d.y)>10))d=null},{passive:true,capture:true});
document.addEventListener("touchend",function(e){var t=tgt(e);if(d&&t&&t===d.t){e.preventDefault();d=null;t.click();return}d=null},{passive:false,capture:true});
})();
}catch(e){try{console.error("[26_modals_taps.js #33]",e)}catch(_){}}

/* ── скрипт #34 (id=fliptap) ── */
try{
(function(){
/* Страховка от «съеденного» первого тапа: после прокрутки окна (инерция), при перерисовке списка
   под пальцем или сбое браузера клик не приходит. Если это был обычный короткий тап и
   нативный click не пришёл — отправляем его сами. Дублей нет: проверяем, был ли click. */
var lastClick=0,tp=null;
var SEL='button,a[href],summary,label,[role=button],[onclick],[data-n],[data-a],[data-c],[data-f],[data-fm],[data-tq],[data-ta],[data-rf],[data-tt],[data-st],[data-ex],[data-tp],[data-tw],[data-rv],[data-up],.ti,.hrow,.chip';
document.addEventListener("click",function(){lastClick=Date.now()},true);
document.addEventListener("touchstart",function(e){
 if(!e.touches||e.touches.length!==1){tp=null;return}
 var t=e.touches[0];tp={x:t.clientX,y:t.clientY,t:Date.now(),el:e.target}
},{passive:true,capture:true});
document.addEventListener("touchmove",function(e){
 var t=e.touches&&e.touches[0];
 if(tp&&t&&(Math.abs(t.clientX-tp.x)>12||Math.abs(t.clientY-tp.y)>12))tp=null
},{passive:true,capture:true});
document.addEventListener("touchcancel",function(){tp=null},{passive:true,capture:true});
function pick(el){
 if(!el||!el.closest)return null;
 var n=el.closest(SEL);if(n)return n;
 /* делегированные обработчики: ищем ближайший предок с курсором-указателем внутри окна */
 if(!el.closest("#pwrap,.confirm-modal,#reg"))return null;
 for(var i=0,x=el;x&&x!==document.body&&i<6;i++,x=x.parentElement){
  try{if(getComputedStyle(x).cursor==="pointer")return x}catch(_){}
 }
 return null
}
document.addEventListener("touchend",function(e){
 var p=tp;tp=null;
 if(!p||Date.now()-p.t>500)return;
 if(p.el&&p.el.closest&&p.el.closest(".pclose"))return;
 if(Date.now()-(window.__pcT||0)<120)return;
 var c=e.changedTouches&&e.changedTouches[0],x=c?c.clientX:p.x,y=c?c.clientY:p.y;
 var t0=Date.now();
 setTimeout(function(){
  if(lastClick>=t0-30)return;              /* нативный клик пришёл — ничего не делаем */
  var el=document.elementFromPoint(x,y)||p.el;
  if(!el||/^(INPUT|SELECT|TEXTAREA)$/.test(el.tagName))return;
  var n=pick(el);
  if(!n||n.disabled||n.getAttribute("aria-disabled")==="true")return;
  n.dispatchEvent(new MouseEvent("click",{bubbles:true,cancelable:true,view:window,clientX:x,clientY:y}))
 },70)
},{passive:true,capture:true});
})();
}catch(e){try{console.error("[26_modals_taps.js #34]",e)}catch(_){}}

/* ── скрипт #35 ── */
try{
(function(){
function mark(e){if(e.target&&e.target.closest&&e.target.closest(".pclose"))window.__pcT=Date.now()}
["touchstart","touchend","pointerdown","pointerup","mousedown","mouseup","click"].forEach(function(n){document.addEventListener(n,mark,true)});
})();
}catch(e){try{console.error("[26_modals_taps.js #35]",e)}catch(_){}}
