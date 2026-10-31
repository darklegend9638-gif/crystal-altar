/* 18_worlds.js — миры
   (вынесено из index.html без изменений; порядок подключения — по номеру файла) */

/* ── скрипт #17 ── */
try{
/* ===================== МИРЫ ===================== */
(function(){
"use strict";
/* vm — множитель наград и дохода, cm — множитель цен апгрейдов, cost — цена портала (монеты) */
window.WORLD_ORB=["🍥","🐉","🏴\u200d☠️","🧱","🌑","👹","🍀"];
/* Данные миров: vm — множитель наград/дохода, cm — множитель цен апгрейдов, cost — цена портала; items/enn — 9 редкостей (ru с эмодзи / en) */
const WORLDS=[
{id:0,ic:"🍥",ru:"Наруто",en:"Naruto",dru:"Naruto",den:"Naruto",vm:1,cm:1,cost:0,
 items:[["🥢 Новичок-ученик"],["🌀 Тень-разведчик"],["🍃 Лесной страж"],["🔥 Мастер огня"],["🎴 Тихий клинок"],["🐍 Хранитель свитков"],["🏯 Владыка клана"],["🦊 Дух лисы"],["🌕 Лунный Мудрец"]],
 enn:[["Novice Pupil"],["Shadow Scout"],["Forest Warden"],["Fire Adept"],["Silent Blade"],["Scroll Keeper"],["Clan Lord"],["Fox Spirit"],["Moon Sage"]]},
{id:1,ic:"🐉",ru:"Драгон Бол",en:"Dragon Ball",dru:"Dragon Ball",den:"Dragon Ball",vm:3,cm:4,cost:20000,
 items:[["🪨 Астероид"],["☄️ Комета"],["🪐 Кольцевая планета"],["🌞 Малое солнце"],["🦅 Феникс Галактики"],["🕳️ Чёрная дыра"],["🎭 Тень Пустоты"],["😇 Архангел Света"],["✨ Создатель Миров"]],
 enn:[["Asteroid"],["Comet"],["Ringed Planet"],["Mini Sun"],["Galaxy Phoenix"],["Black Hole"],["Void Shade"],["Archangel of Light"],["World Maker"]]},
{id:2,ic:"🏴‍☠️",ru:"Ван Пис",en:"One Piece",dru:"One Piece",den:"One Piece",vm:10,cm:20,cost:1000000,
 items:[["🦜 Юнга с попугаем"],["🧭 Штурман"],["🗺️ Охотник за картами"],["🏴‍☠️ Капитан-корсар"],["🐙 Укротитель кракена"],["⚓ Адмирал глубин"],["🦈 Король акул"],["🌊 Повелитель штормов"],["💎 Хранитель Сокровищ"]],
 enn:[["Parrot Cabin Boy"],["Helmsman"],["Map Hunter"],["Corsair Captain"],["Kraken Tamer"],["Admiral of the Deep"],["Shark King"],["Storm Lord"],["Treasure Keeper"]]},
{id:3,ic:"🧱",ru:"Атака Титанов",en:"Attack on Titan",dru:"Attack on Titan",den:"Attack on Titan",vm:40,cm:100,cost:50000000,
 items:[["🧱 Каменщик"],["🏹 Лучник башни"],["🛡️ Страж стены"],["⚔️ Рыцарь заставы"],["🦅 Орлиный командор"],["🐺 Волк-оборотень"],["🏰 Лорд крепости"],["🐲 Страж-великан"],["👁️ Всевидящий Король"]],
 enn:[["Mason"],["Tower Archer"],["Wall Guard"],["Outpost Knight"],["Eagle Commander"],["Werewolf"],["Fortress Lord"],["Giant Guardian"],["All-Seeing King"]]},
{id:4,ic:"🌑",ru:"Соло Левелинг",en:"Solo Leveling",dru:"Solo Leveling",den:"Solo Leveling",vm:150,cm:600,cost:3000000000,
 items:[["🕯️ Свечной дух"],["🦇 Пещерный нетопырь"],["💀 Костяной воин"],["🕸️ Паучья королева"],["🧛 Лорд ночи"],["🌑 Теневой тиран"],["👹 Демон бездны"],["⛓️ Узник вечности"],["🌌 Владыка Подземелья"]],
 enn:[["Candle Wisp"],["Cave Bat"],["Bone Warrior"],["Spider Queen"],["Lord of Night"],["Shadow Tyrant"],["Abyss Demon"],["Prisoner of Eternity"],["Dungeon Sovereign"]]},
{id:5,ic:"👹",ru:"Демон Слейер",en:"Demon Slayer",dru:"Demon Slayer",den:"Demon Slayer",vm:600,cm:3000,cost:200000000000,
 items:[["🎐 Ветряной колокольчик"],["🏮 Фонарщик"],["🎎 Кукольник"],["🦊 Маска-кицунэ"],["🌸 Страж цветения"],["🗡️ Мастер клинка"],["🌊 Дух водопада"],["🔥 Огненный журавль"],["☀️ Рассветный Император"]],
 enn:[["Wind Chime"],["Lantern Bearer"],["Puppeteer"],["Kitsune Mask"],["Blossom Guardian"],["Blade Master"],["Waterfall Spirit"],["Fire Crane"],["Dawn Emperor"]]},
{id:6,ic:"🍀",ru:"Тёмный Клевер",en:"Black Clover",dru:"Black Clover",den:"Black Clover",vm:3000,cm:20000,cost:10000000000000,
 items:[["🍄 Грибной знахарь"],["🪄 Ученик мага"],["📜 Писарь заклинаний"],["🧙 Чародей"],["🐉 Заклинатель драконов"],["🔮 Провидец"],["🧚 Королева фей"],["💠 Хранитель Кристалла"],["🌟 Архимаг Вселенной"]],
 enn:[["Mushroom Healer"],["Mage Apprentice"],["Spell Scribe"],["Sorcerer"],["Dragon Caller"],["Seer"],["Fairy Queen"],["Crystal Keeper"],["Archmage of the Cosmos"]]}];
window.WORLDS=WORLDS;
const PW=["best","pl","pm","ps"],DEF={coins:30,luck:0,inc:0,best:-1,pl:0,pm:0,ps:0};
WORLDS.forEach(w=>w.items.forEach((r,i)=>r.forEach((n,j)=>{IT[n]=w.enn[i][j];ITR[n]=i})));
const names=id=>{const a=[];WORLDS[id].items.forEach(r=>r.forEach(n=>a.push(n)));return a};
const W=()=>WORLDS[S.w]||WORLDS[0];
window.wVm=()=>W().vm;
window.wCm=()=>W().cm;
/* ЦЕНА РОЛЛА ПО МИРАМ (множитель к 10 монетам за ролл) — меняйте здесь */
const GM=[1,3,8,25,80,250,800];
/* МОНЕТА КАЖДОГО МИРА — эмодзи по номеру мира (0 = обычная монета) */
const WCE=["🪙","❄️","🔥","🐚","🍄","💾","🪐"];
const WCS=[null, "<defs><linearGradient id=\"wc1\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#e6f8ff\"/><stop offset=\".5\" stop-color=\"#7fd0ff\"/><stop offset=\"1\" stop-color=\"#2f7dff\"/></linearGradient></defs><circle cx=\"12\" cy=\"12\" r=\"10.5\" fill=\"url(#wc1)\" stroke=\"#d9f3ff\" stroke-width=\"1\"/><g stroke=\"#fff\" stroke-width=\"1.8\" stroke-linecap=\"round\" fill=\"none\"><path d=\"M12 4.5v15M5.5 8.25l13 7.5M18.5 8.25l-13 7.5\"/><path d=\"M9.8 5.8L12 7.6l2.2-1.8M9.8 18.2L12 16.4l2.2 1.8\" stroke-width=\"1.2\"/></g>", "<defs><linearGradient id=\"wc2\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#ffd24a\"/><stop offset=\".55\" stop-color=\"#ff7a1a\"/><stop offset=\"1\" stop-color=\"#e02a1a\"/></linearGradient></defs><circle cx=\"12\" cy=\"12\" r=\"10.5\" fill=\"#2a0f12\" stroke=\"#ff8a3a\" stroke-width=\"1\"/><path d=\"M12.4 3.8c.4 2.6-1 3.8-2.4 5.3-1.4 1.5-2.6 3-2.6 5.3a4.9 4.9 0 0 0 9.8 0c0-2-.9-3.4-1.9-4.6-.2 1.2-.7 1.9-1.3 2.3.5-2.6-.1-6-1.6-8.3z\" fill=\"url(#wc2)\"/><path d=\"M12 13.2c-.9 1-1.7 1.7-1.7 2.9a1.7 1.7 0 0 0 3.4 0c0-1.2-.8-1.9-1.7-2.9z\" fill=\"#fff3b0\"/>", "<defs><linearGradient id=\"wc3\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#ffe3ef\"/><stop offset=\".55\" stop-color=\"#ff9ec4\"/><stop offset=\"1\" stop-color=\"#d9578e\"/></linearGradient></defs><circle cx=\"12\" cy=\"12\" r=\"10.5\" fill=\"#0f3a52\" stroke=\"#6fd3e8\" stroke-width=\"1\"/><path d=\"M12 5.2c-4.2 0-7 3.3-7 7.2 0 1.6.5 2.8 1.3 3.7h11.4c.8-.9 1.3-2.1 1.3-3.7 0-3.9-2.8-7.2-7-7.2z\" fill=\"url(#wc3)\"/><path d=\"M12 6v10M8.6 7.2l1.2 9M15.4 7.2l-1.2 9M6.4 10.2l2.6 6M17.6 10.2l-2.6 6\" stroke=\"#fff\" stroke-opacity=\".75\" stroke-width=\".9\" fill=\"none\" stroke-linecap=\"round\"/><path d=\"M9.5 16.1h5l-.6 2.2h-3.8z\" fill=\"#ffd0e2\"/>", "<defs><linearGradient id=\"wc4\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#ff6a5c\"/><stop offset=\"1\" stop-color=\"#c2271f\"/></linearGradient></defs><circle cx=\"12\" cy=\"12\" r=\"10.5\" fill=\"#173a1c\" stroke=\"#7bd36a\" stroke-width=\"1\"/><path d=\"M10 13h4l.7 5.2a1 1 0 0 1-1 1.1h-3.4a1 1 0 0 1-1-1.1z\" fill=\"#f6e7c8\"/><path d=\"M4.6 12.6C4.6 8 8 4.8 12 4.8s7.4 3.2 7.4 7.8c0 .5-.4.8-.9.8H5.5c-.5 0-.9-.3-.9-.8z\" fill=\"url(#wc4)\"/><g fill=\"#fff\"><circle cx=\"8.6\" cy=\"9.6\" r=\"1.3\"/><circle cx=\"13\" cy=\"8\" r=\"1.5\"/><circle cx=\"16.2\" cy=\"10.6\" r=\"1.1\"/><circle cx=\"11.2\" cy=\"11.4\" r=\".9\"/></g>", "<defs><linearGradient id=\"wc5\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#5fe0ff\"/><stop offset=\"1\" stop-color=\"#2a56e6\"/></linearGradient></defs><circle cx=\"12\" cy=\"12\" r=\"10.5\" fill=\"#0c1230\" stroke=\"#4fd6ff\" stroke-width=\"1\"/><path d=\"M6 5.5h9.6L18.5 8.4V17a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 17V7A1.5 1.5 0 0 1 6 5.5z\" fill=\"url(#wc5)\"/><rect x=\"8\" y=\"5.5\" width=\"6.6\" height=\"3.6\" rx=\".6\" fill=\"#e9f7ff\"/><rect x=\"12.2\" y=\"6.2\" width=\"1.4\" height=\"2.2\" fill=\"#2a56e6\"/><rect x=\"7.6\" y=\"12.2\" width=\"8.8\" height=\"6.3\" rx=\".8\" fill=\"#eaf6ff\"/><path d=\"M9 14.2h6M9 16.2h4\" stroke=\"#2a56e6\" stroke-width=\".9\" stroke-linecap=\"round\"/>", "<defs><radialGradient id=\"wc6\" cx=\".35\" cy=\".3\" r=\".9\"><stop offset=\"0\" stop-color=\"#e2c8ff\"/><stop offset=\".55\" stop-color=\"#8b5cf6\"/><stop offset=\"1\" stop-color=\"#3a1b8c\"/></radialGradient></defs><circle cx=\"12\" cy=\"12\" r=\"10.5\" fill=\"#0d0a24\" stroke=\"#a98bff\" stroke-width=\"1\"/><path d=\"M4.2 15.2c-1-2 2.4-5 7-6.7 4.4-1.6 8.5-1.6 9.4-.1\" fill=\"none\" stroke=\"#ffd36e\" stroke-width=\"1.5\" stroke-linecap=\"round\" opacity=\".9\"/><circle cx=\"12\" cy=\"12\" r=\"5.2\" fill=\"url(#wc6)\"/><path d=\"M19.8 9.5c.4 1.7-2.4 4.2-7 5.9-4.4 1.6-8.1 1.6-8.7.2\" fill=\"none\" stroke=\"#ffd36e\" stroke-width=\"1.5\" stroke-linecap=\"round\"/>"];window.WCS=WCS;
let _cs0=null;
window.wCe=id=>WCE[0];
window.__coinSym=function(){const sy=document.getElementById("i-coin");if(!sy)return;if(_cs0===null){_cs0=sy.innerHTML;window.__cs0=_cs0}const w=S.w||0;if(sy.getAttribute("data-w")===String(w))return;sy.setAttribute("data-w",String(w));
 sy.innerHTML=_cs0};
window.wGm=id=>GM[id==null?(S.w||0):id]||GM[GM.length-1];

function norm(){
  if(!Array.isArray(S.wu))S.wu=[0];
  if(!S.wu.includes(0))S.wu.unshift(0);
  if(!S.wd||typeof S.wd!=="object"||Array.isArray(S.wd))S.wd={};
  if(!S.ky||typeof S.ky!=="object"||Array.isArray(S.ky))S.ky={};
  if(!S.mk||typeof S.mk!=="object"||Array.isArray(S.mk))S.mk={};
  S.w=+S.w||0;
  if(!WORLDS[S.w])S.w=0;
  if(!S.wu.includes(S.w))S.wu.push(S.w);
  if(!S._gc){S._gc=1;let mc=+S.coins||0;for(const k in S.wd){const d=S.wd[k];if(d&&typeof d.coins==="number")mc=Math.max(mc,d.coins)}S.coins=mc}
  if(!S._gl){S._gl=1;let ml=+S.luck||0,mi=+S.inc||0;
    for(const k in S.wd){const d=S.wd[k];if(d){ml=Math.max(ml,+d.luck||0);mi=Math.max(mi,+d.inc||0)}}
    S.luck=Math.min(MAXLUCK,ml);S.inc=Math.min(MAXINC,mi);
    try{if(S.dupw&&typeof S.dupw==="object"){const g=S.dupw[0]||(S.dupw[0]={});for(const k in S.dupw){if(k==="0")continue;const d=S.dupw[k];for(const u in d)g[u]=Math.max(g[u]|0,d[u]|0)}}}catch(e){}
  }
  try{if(S.found&&typeof S.found==="object"){const _all=new Set();WORLDS.forEach(w=>w.items.forEach(r=>r.forEach(n=>_all.add(n))));let _n=0;
    for(const k in S.found){if(_all.has(k)||(k in IT))continue;const c=+S.found[k]||0;if(c>1)_n+=c-1;delete S.found[k]}
    if(_n>0){const g=_n*250;S.coins=(+S.coins||0)+g;try{dirty=true}catch(e){}setTimeout(()=>{try{toast("Exclusive удалены: повторки обменяны на +"+fmt(g)+" 🪙","ok")}catch(e){}},2000)}}}catch(e){}
}
window.applyWorld=function(){
  norm();
  const w=W();try{window.__coinSym()}catch(e){}
  R.forEach((r,i)=>{if(r.v0==null)r.v0=r.v;r.items=w.items[i];r.v=r.v0*w.vm});
  ALL.length=0;R.forEach((e,t)=>e.items.forEach(n=>ALL.push({i:t,t:n})));
  try{const o=document.getElementById("orb");if(o){o.dataset.w=S.w||0;const em=document.getElementById("em"),O=window.WORLD_ORB;if(em&&!o.dataset.rf&&O&&O.indexOf(em.textContent)>=0)em.textContent=O[S.w||0]}}catch(e){}
};
function stash(){
  const d={},own=new Set(names(S.w));
  PW.forEach(k=>d[k]=S[k]);
  d.found={};
  for(const k in S.found)if(own.has(k)){d.found[k]=S.found[k]}
  S.wd[S.w]=d;
}
function enter(id){
  if(busy||!ready||id===S.w||!S.wu.includes(id))return;
  stash();
  const own=new Set(names(S.w));
  for(const k of own)delete S.found[k];
  const d=S.wd[id]||{};
  PW.forEach(k=>{S[k]=typeof d[k]==="number"?d[k]:DEF[k]});
  Object.assign(S.found,d.found||{});
  S.w=id;
  window.applyWorld();
  try{resetOrb()}catch(e){}
  render();save();pushSoon();draw();
  try{document.querySelectorAll("#toasts .toast").forEach(t=>t.remove())}catch(x){}toast(L2("Вы в мире: ","You entered: ")+L2(W().ru,W().en),"ok");
}
function unlock(id){
  const w=WORLDS[id];
  if(busy||!ready||S.wu.includes(id))return;
  const need=window.KEYS_NEED||6,have=window.keysOf?keysOf(id-1):0;
  if(have<need)return toast(L2("Не хватает ключей: убивай мобов в предыдущем мире","Not enough keys: kill mobs in the previous world"),"err");
  S.wu.push(id);
  render();save();pushSoon();draw();
  toast(L2("Мир открыт: ","World unlocked: ")+L2(w.ru,w.en),"ok");
}
const stat=id=>{
  let d;
  if(id===S.w){d={found:{}};const own=new Set(names(id));for(const k in S.found)if(own.has(k))d.found[k]=1}
  else d=S.wd[id]||{};
  const _own=new Set(names(id));
  return{coins:S.coins,luck:S.luck||0,inc:S.inc||0,got:Object.keys(d.found||{}).filter(k=>d.found[k]&&_own.has(k)).length};
};
let wLock=0;
const wSym=id=>false?`<svg class="ico ei" viewBox="0 0 24 24" aria-hidden="true">${window.WCS[id]}</svg>`:`<svg class="ico ei" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-coin0"/></svg>`;
function wCool(){}
function draw(){
  const c0=$("wdchip");if(c0){const h=`${W().ic} <b>${esc(L2(W().ru,W().en))}</b>`;setH(c0,h)}
  const box=$("wdlist");if(!box)return;
  const wp=$("wdp");if(wp&&wp.style.display!=="block")return;
  
  const _h=WORLDS.map(w=>{
    const open=S.wu.includes(w.id),here=w.id===S.w,st=stat(w.id);
    const lk=wLock?" disabled":"";
    const btn=here?`<button disabled>${L2("Вы здесь","You are here")}</button>`
      :open?`<button data-wenter="${w.id}"${lk}>${L2("Войти","Enter")}</button>`
      :`<button data-wbuy="${w.id}" ${(window.keysOf?keysOf(w.id-1):0)<(window.KEYS_NEED||6)||wLock?"disabled":""}>🗝️ ${window.keysOf?keysOf(w.id-1):0}/${window.KEYS_NEED||6}</button>`;
    const info=open?`<span>${wSym(w.id)} ${fmt(st.coins)} · ${L2("Удача","Luck")} ${st.luck} · ${L2("Доход","Income")} ${st.inc}/${MAXINC} · ${L2("Коллекция","Collection")} ${st.got}/${names(w.id).length}</span>`
      :`<span>${L2("Закрыт. Нужны ключи — их дают мобы предыдущего мира (⚔️ Мобы)","Locked. Keys are needed — mobs of the previous world drop them (⚔️ Mobs)")}</span>`;
    if(!open)return `<div class="glass ti"><div class="ic" style="font-size:26px">?</div><div class="tx"><b>?</b></div>${btn}</div>`;
    return `<div class="glass ti" style="${here?"border-color:var(--hot)":""}"><div class="ic" style="font-size:26px">${w.ic}</div><div class="tx"><b>${esc(L2(w.ru,w.en))}</b><span>${esc(L2(w.dru,w.den))}</span><span>${L2("Награды","Rewards")} ×${w.vm} · ${L2("цены апгрейдов","upgrade prices")} ×${w.cm} · ${L2("цена ролла","roll price")} ×${window.wGm(w.id)} · ${L2("монета","coin")} ${wSym(w.id)}</span>${info}${window.wpRow?wpRow(w.id):""}</div>${btn}</div>`;
  }).join("");
  setH(box,_h)
}
const _r=render;render=function(){const r=_r.apply(this,arguments);try{draw()}catch(e){}
  try{const h=(S.w|0)!==0,l=$("luck"),rb=$("rbBox");
    if(l&&l.parentElement)l.parentElement.style.display="";
    if(rb)rb.style.display=h?"none":"";}catch(e){}
  return r};
$("wdb").onclick=()=>{const pw=$("wdp");pw.style.display="block";draw();openPanel("wdp")};
$("wdlist").onclick=e=>{const b=e.target.closest("button");if(!b||b.disabled||wLock)return;if(b.dataset.wo!=null){window.wpAct&&wpAct(b.dataset.wo,+b.dataset.wid);return}if(b.dataset.wenter){wCool();enter(+b.dataset.wenter)}else if(b.dataset.wbuy){wCool();unlock(+b.dataset.wbuy)}};
Object.assign(TX,{"Миры":"Worlds","Выбери мир: у каждого свои монеты, предметы, удача и доход":"Pick a world: each has its own coins, items, luck and income"});
window.applyWorld();
try{render();applyStatic();draw()}catch(e){}
})();
}catch(e){try{console.error("[18_worlds.js #17]",e)}catch(_){}}
