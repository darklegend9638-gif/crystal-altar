/* 23_fx.js — эффекты редких выпадений и обучение
   (вынесено из index.html без изменений; порядок подключения — по номеру файла) */

/* ── скрипт #25 (id=fxjs) ── */
try{
(function(){"use strict";
var RMq=matchMedia("(prefers-reduced-motion:reduce)").matches,L=null,tmr=0,tmr2=0,act=0;
var tier=function(e){return e>=14?13:Math.max(0,Math.min(13,e|0))};
var rnd=function(a,b){return a+Math.random()*(b-a)};
var col=function(e){try{return RA(e).c}catch(x){return"#fff"}};
function layer(){var o=$("orb");if(!o)return null;if(!L||L.parentNode!==o){L=document.createElement("div");L.id="fxl";o.appendChild(L)}return L}
function add(h,el,kf,opt){if(h.childElementCount>120)return;h.appendChild(el);var a;try{a=el.animate(kf,opt)}catch(x){el.remove();return}a.onfinish=a.oncancel=function(){el.remove()}}
function dot(c,s,glyph){var i=document.createElement("i");i.className="fxp";
 if(glyph){i.textContent="✦";i.style.cssText="font-size:"+(s*2.2)+"px;color:"+c+";text-shadow:0 0 8px "+c}
 else i.style.cssText="width:"+s+"px;height:"+s+"px;border-radius:50%;background:"+c+";box-shadow:0 0 "+(s*2)+"px "+c;
 return i}
function stop(){act=0;clearTimeout(tmr);clearTimeout(tmr2)}
function clr(){stop();if(L)L.textContent=""}
var rmap=(function(){var m=null,mw=-1;return function(it){var w=(typeof S!=="undefined"&&S.w)||0;if(!m||mw!==w){mw=w;m={};R.forEach(function(r,i){r.items.forEach(function(x){m[x]=i})})}return m[it]!=null?m[it]:14}})();

/* --- накопление энергии --- */
window.__fxCharge=function(o,D,cnt,best){
 clr();var fs=$("fxs");if(fs)fs.innerHTML="";
 o.classList.remove("rx-sec","rx-cel","rx-tra");delete o.dataset.rf;o.style.setProperty("--rc","#8fb4ff");
 if(RMq)return;
 var h=layer();if(!h)return;act=1;
 var c=col(best),n=cnt>1?24:14;
 for(var k=0;k<n;k++){
  var a=rnd(0,6.283),r=rnd(115,175),x=Math.cos(a)*r,y=Math.sin(a)*r,s=rnd(3,6.5),dl=rnd(0,D*.55),du=Math.max(250,D-dl-40);
  add(h,dot(Math.random()<.6?c:"#fff",s,false),[
   {transform:"translate(-50%,-50%) translate("+x+"px,"+y+"px) scale(1)",opacity:0},
   {opacity:1,offset:.25},
   {transform:"translate(-50%,-50%) translate(0px,0px) scale(.3)",opacity:.9}
  ],{duration:du,delay:dl,easing:"cubic-bezier(.45,0,.85,.5)",fill:"both"});
 }
 /* крутящиеся предметы, замедляются к концу */
 var pool=ALL.map(function(z){return z.t.split(" ")[0]}),em=$("em"),t0=performance.now();
 (function step(){if(!act)return;em.textContent=pool[Math.random()*pool.length|0];
  var p=Math.min(1,(performance.now()-t0)/D);tmr=setTimeout(step,40+p*p*150)})();
 /* подсказка цветом редкости ближе к финалу */
 tmr2=setTimeout(function(){if(act)o.style.setProperty("--rc",c)},D*.55);
};

/* --- взрыв при выпадении --- */
window.__fxReveal=function(o,e){
 stop();if(RMq)return;
 var h=layer();if(!h)return;h.textContent="";
 var pw=$("pwrap");if(pw&&pw.classList.contains("open"))return;
 var t=tier(e),c=col(e),k,w=1+(t>=3)+(t>=6)+(t>=9);
 for(k=0;k<w;k++){var b=document.createElement("b");b.className="fxw";b.style.borderColor=c;b.style.boxShadow="0 0 16px "+c+",inset 0 0 14px "+c;
  add(h,b,[{transform:"scale(.5)",opacity:.95},{transform:"scale(2.7)",opacity:0}],{duration:620+k*140,delay:k*110,easing:"cubic-bezier(.1,.6,.3,1)",fill:"both"})}
 if(t>=5){var rays=1;
  for(k=0;k<rays;k++){var r=document.createElement("b");r.className="fxr";
   r.style.background="repeating-conic-gradient(from 0deg,"+(k?"#fff":c)+" 0 3.5deg,transparent 3.5deg 12deg)";
   var deg=(t>=9?90:55)*(k?-1:1);
   add(h,r,[{transform:"rotate(0deg) scale(.4)",opacity:0},{opacity:.85,offset:.3},{transform:"rotate("+deg+"deg) scale(1.25)",opacity:0}],{duration:1000+t*40,easing:"ease-out",fill:"both"})}}
 var n=Math.min(30,8+t*2);
 for(k=0;k<n;k++){
  var a=(k/n)*6.283+rnd(-.2,.2),d=rnd(75,120+t*9),big=t>=5&&Math.random()<.3,s=big?rnd(7,11):rnd(3,7),
   x=Math.cos(a)*d,y=Math.sin(a)*d;
  add(h,dot(Math.random()<.25?"#fff":c,s,big),[
   {transform:"translate(-50%,-50%) translate(0px,0px) scale(1)",opacity:1},
   {transform:"translate(-50%,-50%) translate("+x*.85+"px,"+y*.85+"px) scale(1)",opacity:1,offset:.55},
   {transform:"translate(-50%,-50%) translate("+x+"px,"+(y+22)+"px) scale(.2)",opacity:0}
  ],{duration:rnd(650,1100),easing:"cubic-bezier(.12,.7,.3,1)",fill:"both"});
 }
 if(t>=6){var m=$("orb").closest(".stage")||document.querySelector("main");if(m){var A=Math.min(8,2+(t-5)*.9);
  try{m.animate([{transform:"translate(0,0)"},{transform:"translate("+(-A)+"px,"+A*.6+"px)"},{transform:"translate("+A+"px,"+(-A*.5)+"px)"},{transform:"translate("+(-A*.6)+"px,"+A*.4+"px)"},{transform:"translate("+A*.4+"px,0)"},{transform:"translate(0,0)"}],{duration:420,easing:"ease-out"})}catch(x){}}}
 if(t>=3){var nm=$("nm");try{nm.animate([{transform:"scale(1.3)"},{transform:"scale(1)"}],{duration:520,easing:"cubic-bezier(.2,1.5,.4,1)"})}catch(x){}}
};

/* --- лента результатов для x10: редкие выпадают последними --- */
window.__fxStrip=function(items){
 var h=$("fxs");if(!h)return;
 if(!items||items.length<2){h.innerHTML="";return}
 h.classList.add("rsv");
 var a=items.map(function(it){return{e:it.split(" ")[0],r:rmap(it)}}).sort(function(x,y){return x.r-y.r});
 h.innerHTML=a.map(function(x,k){return'<span class="fxc'+(tier(x.r)>=5?" hi":"")+'" style="--c:'+col(x.r)+";--d:"+(k*60)+'ms">'+x.e+"</span>"}).join("");
};
window.__fxClear=function(){clr();var s=$("fxs");if(s)s.innerHTML=""};

/* --- коллекция: Открыто / Закрыто --- */
var K="colTab";
try{var v=localStorage.getItem(K);if(v==="c"||v==="o")window.__colTab=v}catch(x){}
window.__colTab=window.__colTab||"o";
window.__colReset=function(){window.__colTab="o";try{localStorage.setItem(K,"o")}catch(x){}};
window.__colTabs=function(){
 var o=$("ctO"),c=$("ctC"),inf=$("colinfo");if(!o||!c)return;
 var all=ALL.slice(),have=0,pcs=0;
 all.forEach(function(z){var n=S.found[z.t]||0;if(n){have++;pcs+=n}});
 var miss=all.length-have,tab=window.__colTab;
 var a=L2("Открыто","Opened")+" · "+have,b=L2("Закрыто","Locked")+" · "+miss;
 if(o.textContent!==a)o.textContent=a;if(c.textContent!==b)c.textContent=b;
 o.classList.toggle("on",tab==="o");c.classList.toggle("on",tab==="c");
 var t=tab==="o"?L2("Всего выбито: ","Total pulled: ")+fmt(pcs)+L2(" шт. · уникальных: "," pcs · unique: ")+have:L2("Ещё не найдено: ","Not found yet: ")+miss;
 if(inf&&inf.textContent!==t)inf.textContent=t;
};
$("coltabs").onclick=function(e){var b=e.target.closest("[data-ct]");if(!b)return;var v=b.dataset.ct;if(v===window.__colTab)return;
 window.__colTab=v;try{localStorage.setItem(K,v)}catch(x){}render()};
try{render()}catch(x){}
})();
}catch(e){try{console.error("[23_fx.js #25]",e)}catch(_){}}
