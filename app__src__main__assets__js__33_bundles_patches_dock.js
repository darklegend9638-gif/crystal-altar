/* 33_bundles_patches_dock.js — наборы, баффы питомцев, патчи интерфейса, док
   (вынесено из index.html без изменений; порядок подключения — по номеру файла) */

/* ── скрипт #52 (id=bundles-js) ── */
try{
(function(){"use strict";

var BN=[
{k:"start",e:"🎁",ru:["Стартовый набор","Золотой пасс + Пасс удачи + Пасс билетов"],en:["Starter Bundle","Golden + Luck + Ticket passes"],p:["coin","luck","daily"],off:.15},
{k:"fight",e:"⚔️",ru:["Набор бойца","Пасс силы + Пасс мастера + Двойная гача"],en:["Fighter Bundle","Power + Master passes + Dual Gacha"],p:["dmg","disc","dual"],off:.2},
{k:"all",e:"👑",ru:["Всё включено","Все геймпассы со скидкой"],en:["All-In Bundle","Every game pass at a discount"],p:["vip","dmg","coin","luck","disc","dual","daily"],off:.3}];
var gp=function(k){return GP_LIST.find(function(g){return g.k===k})};
function quote(b){var base=0;b.p.forEach(function(k){var g=gp(k);if(g&&!gpHas(k))base+=g.price});return{base:base,price:base?pr({price:Math.ceil(base*(1-b.off))}):0}}
window.renderBN=function(){var el=document.getElementById("bnl");if(!el)return;
document.getElementById("shbsub").textContent=L2("Наборы геймпассов дешевле, чем по отдельности. Уже купленные пассы не оплачиваются повторно.","Pass bundles cost less than buying separately. Passes you already own are not charged again.");
setH(el,BN.map(function(b){var q=quote(b),done=!q.base,can=(S.gem||0)>=q.price;
var names=b.p.map(function(k){var g=gp(k);return(gpHas(k)?"✓ ":"")+g.e+" "+L2(g.ru[0],g.en[0])}).join(" · ");
return '<div class="glass ti"><div class="ic">'+b.e+'</div><div class="tx"><b>'+esc(L2(b.ru[0],b.en[0]))+'<span class="bnoff" style="display:inline">−'+Math.round(b.off*100)+'%</span></b><span>'+esc(names)+'</span>'+(done?'':'<span><s class="bnold">💎 '+fmt(q.base)+'</s></span>')+'</div><button data-bn="'+b.k+'" '+(done||!can?"disabled":"")+'>'+(done?L2("Куплено","Owned"):"💎 "+fmt(q.price))+'</button></div>'}).join(""))};
document.getElementById("sh_b").addEventListener("click",function(e){var x=e.target.closest("[data-bn]");if(!x||x.disabled||!ready||busy)return;
var b=BN.find(function(z){return z.k===x.dataset.bn});if(!b)return;var q=quote(b);if(!q.base)return;
if((S.gem||0)<q.price)return toast(L2("Не хватает тикетов","Not enough tickets"),"err");
S.gem-=q.price;b.p.forEach(function(k){(S.gp||(S.gp={}))[k]=1});
render();save();pushSoon();renderShop();window.gpChanged&&window.gpChanged(1);
toast(L2("Куплен бандл: ","Bundle bought: ")+L2(b.ru[0],b.en[0]),"ok")});
try{renderBN()}catch(e){}
})();
}catch(e){try{console.error("[33_bundles_patches_dock.js #52]",e)}catch(_){}}

/* ── скрипт #53 (id=petbuff-js) ── */
try{
(function(){"use strict";
/* Бафф питомцев: за каждого питомца мира (редкость r) +0.04 уровня удачи и +1% урона за (r+1); яйца-питомцы (S.pt) считаются так же */
function sumR(){var t=0;try{if(S.wp&&typeof S.wp==="object")for(var w in S.wp){var a=S.wp[w];if(Array.isArray(a))a.forEach(function(o,r){if(o)t+=r+1})}
(S.pt||[]).forEach(function(id){var q=PETS.find(function(o){return o.id===id});if(q)t+=q.r+1})}catch(e){}return t}
window.petLuck=function(){return sumR()*.04};
window.petDmg=function(){return 1+sumR()*.01};
window.cpDmg=function(){return(gpHas("dmg")?2:1)*petDmg()};
/* Подарок при первом входе: Nika (Астрал, 3 мир) + 💎 тикеты + монеты */
var GIFT_GEM=100,GIFT_COINS=100000;
var t=setInterval(function(){if(typeof ready==="undefined"||!ready||typeof S==="undefined"||!S||S.wgift)return;
clearInterval(t);
if(!S.wp||typeof S.wp!=="object"||Array.isArray(S.wp))S.wp={};
var a=S.wp[2];if(!Array.isArray(a)||a.length!==9)a=S.wp[2]=[0,0,0,0,0,0,0,0,0];a[8]=1;
S.gem=(S.gem||0)+GIFT_GEM;S.coins=(S.coins||0)+GIFT_COINS;S.wgift=1;
try{render()}catch(e){}save();pushSoon();
toast("🎁 "+L2("Подарок: питомец Nika (Астрал, 3 мир), ","Gift: Nika pet (Astral, World 3), ")+"💎"+GIFT_GEM+" · 🪙"+fmt(GIFT_COINS),"ok")},500);
})();
}catch(e){try{console.error("[33_bundles_patches_dock.js #53]",e)}catch(_){}}

/* ── скрипт #54 (id=patch-v3-js) ── */
try{
(function(){
var CAP=999e33;
function deep(o,d){if(!o||typeof o!=="object"||d>6)return;for(var k in o){var v=o[k];if(typeof v==="number"){if(v!==v)o[k]=0;else if(v>CAP)o[k]=CAP}else if(v&&typeof v==="object")deep(v,d+1)}}
window.capAll=function(){try{if(S.tok&&typeof S.tok==="object")for(var _k in S.tok){var _a=S.tok[_k];if(Array.isArray(_a)&&_a[1]>0){_a[0]=(+_a[0]||0)+_a[1];_a[1]=0}}deep(S,0);
 if(!(S.coins<=CAP))S.coins=S.coins>CAP?CAP:0;if(!(S.gem<=CAP))S.gem=S.gem>CAP?CAP:0;
 if(S.tok&&typeof S.tok==="object")for(var k in S.tok){var a=S.tok[k];if(Array.isArray(a))for(var i=0;i<a.length;i++)if(!(a[i]<=CAP))a[i]=a[i]>CAP?CAP:0}
 if(S.dtw&&typeof S.dtw==="object")for(var k in S.dtw)if(!(S.dtw[k]<=CAP))S.dtw[k]=S.dtw[k]>CAP?CAP:0;
 if(S.wd&&typeof S.wd==="object")for(var k in S.wd){var d=S.wd[k];if(d&&!(d.coins<=CAP))d.coins=d.coins>CAP?CAP:0}
}catch(e){}};
setInterval(capAll,500);
/* no scrolling under open menus */
var OVS="#pwrap,#vp,#reg,.confirm-modal,#updM,#selPop";
function vis(el){try{var s=getComputedStyle(el);return s.display!=="none"&&s.visibility!=="hidden"&&+s.opacity>0.01&&s.pointerEvents!=="none"}catch(e){return false}}
function openOvs(){var l=document.querySelectorAll(OVS),r=[];for(var i=0;i<l.length;i++)if(vis(l[i]))r.push(l[i]);return r}
function openOv(){var r=openOvs();return r.length?r[0]:null}
function inAny(r,sc){for(var i=0;i<r.length;i++)if(r[i].contains(sc))return true;return false}
function sync(){var o=!!openOv();document.documentElement.classList.toggle("pl",o);document.body.classList.toggle("pl",o)}
setInterval(sync,150);sync();
var sy=0;
document.addEventListener("touchstart",function(e){sy=e.touches[0].clientY},{passive:true});
document.addEventListener("touchmove",function(e){
 var ovs=openOvs();if(!ovs.length)return;
 var el=e.target,sc=null;
 while(el&&el!==document.body){if(el.nodeType===1&&el.scrollHeight>el.clientHeight+1){var oy=getComputedStyle(el).overflowY;if(oy==="auto"||oy==="scroll"){sc=el;break}}el=el.parentNode}
 if(!sc||!inAny(ovs,sc)){e.preventDefault();return}
 var dy=e.touches[0].clientY-sy;
 if((sc.scrollTop<=0&&dy>0)||(sc.scrollTop+sc.clientHeight>=sc.scrollHeight-1&&dy<0))e.preventDefault();
},{passive:false});
document.addEventListener("wheel",function(e){var ovs=openOvs();if(!ovs.length)return;var el=e.target,sc=null;while(el&&el!==document.body){if(el.nodeType===1&&el.scrollHeight>el.clientHeight+1){var oy=getComputedStyle(el).overflowY;if(oy==="auto"||oy==="scroll"){sc=el;break}}el=el.parentNode}if(!sc||!inAny(ovs,sc))e.preventDefault()},{passive:false});
/* admin: gacha / dungeon tokens */
try{
 var sel=document.getElementById("a_tw");
 if(sel)sel.innerHTML=WORLDS.map(function(w,i){return '<option value="'+i+'">'+w.ic+' '+(w.ru||w.en)+'</option>'}).join("");
 function amt(){var i=document.getElementById("a_tk"),v=Math.floor(+i.value||0);if(v>CAP){i.value=CAP;v=CAP}return Math.min(CAP,Math.max(0,v))}
 function apply(sign){var w=+sel.value,ty=document.getElementById("a_tt").value,n=amt()*sign;
  adm(function(o){
   if(ty==="g0"){var g=0;if(!o.tok||typeof o.tok!=="object"||Array.isArray(o.tok))o.tok={};var a=o.tok[w];if(!Array.isArray(a)||a.length!==2)a=o.tok[w]=[0,0];a[g]=Math.min(CAP,Math.max(0,(+a[g]||0)+n))}
   else if(ty==="dt"){if(!o.dtw||typeof o.dtw!=="object"){o.dtw={};if(o.dt)o.dtw[0]=+o.dt||0}o.dtw[w]=Math.min(CAP,Math.max(0,(+o.dtw[w]||0)+n))}
   else{if(!o.dkey||typeof o.dkey!=="object")o.dkey={};o.dkey[w]=Math.min(99,Math.max(0,(+o.dkey[w]||0)+n))}
  });}
 document.getElementById("a_tkgive").onclick=function(){apply(1)};
 document.getElementById("a_tktake").onclick=function(){apply(-1)};
}catch(e){}
})();
}catch(e){try{console.error("[33_bundles_patches_dock.js #54]",e)}catch(_){}}

/* ── скрипт #55 (id=ca-layout-js) ── */
try{
(function(){"use strict";
const $=id=>document.getElementById(id),main=document.querySelector("main"),stage=main.querySelector(".stage");
/* HUD: тикеты · монеты */
const hud=document.createElement("div");hud.id="hud";
hud.innerHTML='<span class="hi"><svg class="ico"><use href="#i-gem"/></svg><span id="hudG">0</span></span><span class="hi"><svg class="ico"><use href="#i-coin"/></svg><span id="hudC">0</span></span>';
document.body.appendChild(hud);
/* быстрые кнопки: миры · мобы · гачи · апгрейды · обмен */
const q=document.createElement("div");q.id="qrow";
["wdb","mobb","gxb","upgBtn"].forEach(i=>{const b=$(i);b&&q.appendChild(b)});
const fb=document.createElement("button");fb.className="alt";fb.id="sheetB";fb.textContent="💱 Обмен";q.appendChild(fb);
main.insertBefore(q,stage);
const sh=document.createElement("div");sh.id="sheet";
const x=document.createElement("button");x.id="sheetX";x.className="alt";x.textContent="✕";
[...main.children].forEach(n=>{if(n.tagName==="H2"||["xch"].includes(n.id))sh.appendChild(n)});
document.body.append(sh,x);x.style.display="none";
fb.onclick=()=>{sh.classList.add("show");x.style.display="";try{render()}catch(e){}};
x.onclick=()=>{sh.classList.remove("show");x.style.display="none"};
/* третья прокачка: ДРОП — доп. выпадения токенов за ролл */
const MAXDR=50,dr=()=>Math.max(0,Math.min(MAXDR,S.dr|0));
const drCost=()=>{let d=1;try{d=(ev().disc||1)*rbDisc()}catch(e){}return Math.floor(1500*Math.pow(1.7,dr())*d)};
const od=window.tokDrop;if(od)window.tokDrop=function(t){od(t);const d=dr(),n=Math.floor(d/5)+(Math.random()<(d%5)/5?1:0);for(let i=0;i<n;i++)od(t)};
function drBuy(){if(busy||!ready)return;if(dr()>=MAXDR)return toast(L2("Дроп уже максимальный","Drop is already maxed"),"err");
 const c=drCost();if(S.coins<c)return toast(L2("Не хватает монет","Not enough coins"),"err");
 S.coins-=c;S.dr=dr()+1;render();save();try{pushSoon()}catch(e){}toast(L2("Дроп повышен: ур. ","Drop upgraded: lv ")+S.dr,"ok")}
/* нижний док: Удача · Доход · Дроп */
const dock=document.createElement("div");dock.id="dock";
const WT=[[["Чакра","🌀"],["Рамен","🍜"],["Свиток","📜"]],[["Ки","⚡"],["Зени","💴"],["Шары","🐉"]],[["Хаки","👁️"],["Берри","🪙"],["Сундук","🧰"]],[["Клинки","⚔️"],["Паёк","🍞"],["Трофей","🏆"]],[["Уровень","🌑"],["Золото","💰"],["Лут","🎒"]],[["Дыхание","🌊"],["Йены","💴"],["Маска","👺"]],[["Мана","🔮"],["Золото","💰"],["Гримуар","📖"]]];
const defs=[["luck","Удача","🍀","#34d058",()=>$("luck").click(),()=>({l:S.luck|0,c:luckCost(),mx:S.luck>=MAXLUCK,ok:!$("luck").disabled,s:Math.floor(S.luck/10)})],
 ["inc","Доход","💰","#4da3ff",()=>$("inc").click(),()=>({l:S.inc|0,c:incCost(),mx:S.inc>=MAXINC,ok:!$("inc").disabled,s:Math.floor(S.inc/3)})],
 ["drop","Дроп","🎁","#b46cff",drBuy,()=>({l:dr(),c:drCost(),mx:dr()>=MAXDR,ok:!busy&&S.coins>=drCost(),s:Math.floor(dr()/10)})]];
defs.forEach(d=>{const c=document.createElement("div");c.className="uc";c.id="uc_"+d[0];c.style.setProperty("--ac",d[3]);
 c.innerHTML='<h5>'+d[1]+'</h5><div class="lv"></div><div class="ic">'+d[2]+'</div><div class="st"></div><div class="go"></div>';
 c.onclick=d[4];dock.appendChild(c)});
document.body.appendChild(dock);
function draw(){try{$("hudG").textContent=$("gems").textContent;$("hudC").textContent=$("coins").textContent;
 const wt=WT[S.w|0]||WT[0];defs.forEach((d,k)=>{const v=d[5](),c=$("uc_"+d[0]),s=Math.min(5,v.s);c.querySelector("h5").textContent=L2(d[1],["Luck","Income","Drop"][k]);c.querySelector(".ic").textContent=d[2];c.className="uc"+(v.ok?"":" no")+(v.mx?" mx":"");
  c.querySelector(".lv").textContent=v.l;c.querySelector(".st").innerHTML="<b>"+"★".repeat(s)+"</b>"+"★".repeat(5-s);
  c.querySelector(".go").innerHTML=v.mx?"MAX":fmt(v.c)+' <svg class="ico"><use href="#i-coin"/></svg>'})}catch(e){}}
const _r=render;render=function(){const r=_r.apply(this,arguments);draw();return r};
setInterval(draw,500);draw();
/* пока открыто любое меню/окно — док прокачек скрыт */
const open=()=>{const pw=$("pwrap"),mb=$("menuBtn"),up=$("upgPanel"),rg=$("reg");
 return !!((pw&&pw.classList.contains("open"))||(mb&&mb.classList.contains("open"))||sh.classList.contains("show")||(up&&up.classList.contains("show"))||(rg&&rg.style.display==="flex")||document.querySelector(".confirm-modal.show"))};
setInterval(()=>{dock.style.display=open()?"none":""},150);
/* регистрация: закрываемое окно входа (необязательно) */

})();
}catch(e){try{console.error("[33_bundles_patches_dock.js #55]",e)}catch(_){}}

/* ── скрипт #56 (id=item-badges-js) ── */
try{
(function(){"use strict";
var RC=[["#b7bfd0","#5b6478"],["#5eea8a","#1c8a45"],["#4da3ff","#1a4fb0"],["#b46cff","#5a1fa8"],["#ffb82e","#b05a00"],["#ff4d6d","#9a0f2c"],["#ff7ad9","#a01a7a"],["#ffe98a","#d09a1a"],["#56e0ff","#2a56e6"]];
var old=window.__eyeCard;if(typeof old!=="function")return;
window.__eyeCard=function(t,i,c){
 var h=old.apply(this,arguments);
 if(!c||typeof i!=="number"||h.indexOf('<img')>-1)return h;
 var ti=Math.min(i,8),p=RC[ti],em=String(t).split(" ")[0];
 return h.replace(/<div class="e">[\s\S]*?<\/div>/,'<div class="e"><span class="ib s'+ti+'" style="--a:'+p[0]+';--b:'+p[1]+'"><i></i><b>'+em+'</b></span></div>');
};
try{typeof render==="function"&&render()}catch(e){}
})();
}catch(e){try{console.error("[33_bundles_patches_dock.js #56]",e)}catch(_){}}

/* ── скрипт #57 (id=gx-new) ── */
try{
(function(){"use strict";
var T=["Ninja Ranks","Cosmic Ranks","Pirate Ranks","Wall Ranks","Dungeon Ranks","Blossom Ranks","Magic Ranks"];
var N=[["Novice Pupil","Shadow Scout","Forest Warden","Fire Adept","Silent Blade","Scroll Keeper","Clan Lord","Fox Spirit","Moon Sage"],["Asteroid","Comet","Ringed Planet","Mini Sun","Galaxy Phoenix","Black Hole","Void Shade","Archangel of Light","World Maker"],["Parrot Cabin Boy","Helmsman","Map Hunter","Corsair Captain","Kraken Tamer","Admiral of the Deep","Shark King","Storm Lord","Treasure Keeper"],["Mason","Tower Archer","Wall Guard","Outpost Knight","Eagle Commander","Werewolf","Fortress Lord","Giant Guardian","All-Seeing King"],["Candle Wisp","Cave Bat","Bone Warrior","Spider Queen","Lord of Night","Shadow Tyrant","Abyss Demon","Prisoner of Eternity","Dungeon Sovereign"],["Wind Chime","Lantern Bearer","Puppeteer","Kitsune Mask","Blossom Guardian","Blade Master","Waterfall Spirit","Fire Crane","Dawn Emperor"],["Mushroom Healer","Mage Apprentice","Spell Scribe","Sorcerer","Dragon Caller","Seer","Fairy Queen","Crystal Keeper","Archmage of the Cosmos"]];
var E=[["🥢","🌀","🍃","🔥","🎴","🐍","🏯","🦊","🌕"],["🪨","☄️","🪐","🌞","🦅","🕳️","🎭","😇","✨"],["🦜","🧭","🗺️","🏴‍☠️","🐙","⚓","🦈","🌊","💎"],["🧱","🏹","🛡️","⚔️","🦅","🐺","🏰","🐲","👁️"],["🕯️","🦇","💀","🕸️","🧛","🌑","👹","⛓️","🌌"],["🎐","🏮","🎎","🦊","🌸","🗡️","🌊","🔥","☀️"],["🍄","🪄","📜","🧙","🐉","🔮","🧚","💠","🌟"]];
var RC=[["#b7bfd0","#5b6478"],["#5eea8a","#1c8a45"],["#4da3ff","#1a4fb0"],["#b46cff","#5a1fa8"],["#ffb82e","#b05a00"],["#ff4d6d","#9a0f2c"],["#ff7ad9","#a01a7a"],["#ffe98a","#d09a1a"],["#56e0ff","#2a56e6"]];
window.__GXN=N;window.__gxTitle=function(w){return T[w]||"Gacha"};
var cache={};
window.__gxIcon=function(w,i){w|=0;i|=0;var k=w+"_"+i;if(cache[k])return cache[k];
 var p=RC[Math.min(i,8)],em=E[w]&&E[w][i]||"❔",id="g"+k;
 var svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><defs><radialGradient id="'+id+'" cx=".35" cy=".28" r=".95"><stop offset="0" stop-color="'+p[0]+'"/><stop offset=".6" stop-color="'+p[1]+'"/><stop offset="1" stop-color="#08060f"/></radialGradient></defs><circle cx="64" cy="64" r="60" fill="url(#'+id+')" stroke="'+p[0]+'" stroke-width="4"/><circle cx="64" cy="64" r="50" fill="rgba(0,0,0,.28)"/><text x="64" y="64" font-size="62" text-anchor="middle" dominant-baseline="central">'+em+'</text></svg>';
 return cache[k]="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(svg)};
try{window.gxRender&&window.gxRender()}catch(e){}try{typeof render==="function"&&render()}catch(e){}
})();
}catch(e){try{console.error("[33_bundles_patches_dock.js #57]",e)}catch(_){}}

/* ── скрипт #58 (id=dock-toggle) ── */
try{
(function(){
var K="dock-min",min=0;try{min=localStorage.getItem(K)==="1"}catch(e){}
function go(){var d=document.getElementById("dock");if(!d){return setTimeout(go,200)}
var b=document.createElement("button");b.id="dockArr";b.type="button";b.setAttribute("aria-label","toggle upgrades");
b.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>';
document.body.appendChild(b);
function apply(){d.classList.toggle("dmin",!!min);b.classList.toggle("dmin",!!min);document.body.classList.toggle("dockmin",!!min)}
b.onclick=function(e){e.stopPropagation();min=!min;try{localStorage.setItem(K,min?"1":"0")}catch(x){}apply()};
apply();
setInterval(function(){var h=d.offsetHeight;if(h)document.documentElement.style.setProperty("--dh",h+"px");b.style.display=getComputedStyle(d).display==="none"?"none":""},150)}
go()})();
}catch(e){try{console.error("[33_bundles_patches_dock.js #58]",e)}catch(_){}}

/* ── скрипт #59 (id=upg-close) ── */
try{
(function(){function p(){return document.getElementById("upgPanel")}
document.addEventListener("click",function(e){var q=p();if(!q||!q.classList.contains("show"))return;
if(e.target.closest("#upgX")){q.classList.remove("show");e.stopPropagation();return}
if(!e.target.closest("#upgPanel")&&!e.target.closest("#upgBtn")){q.classList.remove("show");e.stopPropagation();e.preventDefault()}},true)})();
}catch(e){try{console.error("[33_bundles_patches_dock.js #59]",e)}catch(_){}}

/* ── скрипт #60 (id=dock-sfx) ── */
try{
document.addEventListener("pointerdown",function(e){var c=e.target&&e.target.closest&&e.target.closest(".uc");if(!c)return;(c.classList.contains("no")||c.classList.contains("mx"))?(window.__sfxErr&&window.__sfxErr()):(window.__sfxPop&&window.__sfxPop())},true);
}catch(e){try{console.error("[33_bundles_patches_dock.js #60]",e)}catch(_){}}

/* ── скрипт #61 (id=sheet-skin-js) ── */
try{
(function(){function go(){var sh=document.getElementById("sheet");if(!sh||!document.getElementById("sheetX"))return setTimeout(go,200);
if(document.getElementById("sheetBox"))return;
var box=document.createElement("div");box.id="sheetBox";
var x=document.createElement("button");x.type="button";x.className="alt sx2";x.setAttribute("aria-label","close");
x.innerHTML='<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>';
x.onclick=function(){var o=document.getElementById("sheetX");o&&o.onclick&&o.onclick()};
var t=document.createElement("b");t.className="hd";t.textContent="💱 Обмен";
box.appendChild(x);box.appendChild(t);
while(sh.firstChild)box.appendChild(sh.firstChild);
sh.appendChild(box);
sh.addEventListener("click",function(e){if(e.target===sh){var o=document.getElementById("sheetX");o&&o.onclick&&o.onclick()}})}
go()})();
}catch(e){try{console.error("[33_bundles_patches_dock.js #61]",e)}catch(_){}}
