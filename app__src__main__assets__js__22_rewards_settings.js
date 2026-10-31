/* 22_rewards_settings.js — награды, блокировка прокрутки, настройки, анимация редких выпадений
   (вынесено из index.html без изменений; порядок подключения — по номеру файла) */

/* ── скрипт #21 ── */
try{
/* ===== НАГРАДЫ: ежедневка, задания, оффлайн-доход, престиж ===== */
(function(){"use strict";
const day=()=>new Date().toISOString().slice(0,10);
const yest=()=>new Date(Date.now()-864e5).toISOString().slice(0,10);
const TK=[{n:30,ru:"Сделай 30 роллов",en:"Make 30 rolls",k:3},{n:120,ru:"Сделай 120 роллов",en:"Make 120 rolls",k:6},{n:3,ru:"Найди 3 новых предмета",en:"Find 3 new items",k:5,f:1}];
const cnt=()=>Object.keys(S.found).filter(k=>S.found[k]).length;
const pm=()=>1+.1*(S.pr||0);
window.prMul=pm;
function tasks(){if(!S.tk||S.tk.d!==day())S.tk={d:day(),r:S.rolls,f:cnt(),c:[0,0,0]};return S.tk}
const prog=(t,i)=>Math.min(TK[i].n,TK[i].f?cnt()-t.f:S.rolls-t.r);
const reward=m=>Math.max(100,Math.floor(incNow()*m));
function dailyOk(){return !S.dl||S.dl.d!==day()}
function claimDaily(){
  if(!ready||busy||!dailyOk())return;
  const s=(S.dl&&S.dl.d===yest())?Math.min(7,(S.dl.s||0)+1):1;
  const c=reward(300*s);S.coins+=c;if(s===7)S.gem=(S.gem||0)+1;
  S.dl={d:day(),s:s===7?0:s};
  toast(L2("Награда дня: +","Daily reward: +")+fmt(c)+" 🪙"+(s===7?" +1 💎":""),"ok");
  render();save();pushSoon();draw()}
function claimTask(i){
  const t=tasks();if(!ready||t.c[i]||prog(t,i)<TK[i].n)return;
  t.c[i]=1;const c=reward(200*TK[i].k);S.coins+=c;if(i===1)S.gem=(S.gem||0)+1;
  toast("+"+fmt(c)+" 🪙"+(i===1?" +1 💎":""),"ok");render();save();pushSoon();draw()}
const prOk=()=>(S.w|0)===0&&S.luck>=RBLUCK&&S.inc>=MAXINC;
function prestige(){
  if(!ready||busy||!prOk())return;
  if(!confirm(L2("Перерождение сбросит монеты, удачу и доход этого мира. Навсегда +10% к доходу. Продолжить?","Rebirth resets this world's coins, luck and income. Permanent +10% income. Continue?")))return;
  S.pr=(S.pr||0)+1;S.coins=30;S.luck=0;S.inc=0;S.pl=S.pm=S.ps=0;
  toast(L2("Перерождение! Бонус к доходу: +","Rebirth! Income bonus: +")+S.pr*10+"%","ok");render();save();pushSoon();draw()}
function draw(){
  const b=$("rwlist");if(!b||$("rwp").style.display!=="block")return;
  const t=tasks(),d=S.dl&&S.dl.d===yest()?S.dl.s||0:(S.dl&&S.dl.d===day()?S.dl.s||0:0);
  let h=`<div class="glass ti"><div class="ic" style="font-size:26px">🎁</div><div class="tx"><b>${L2("Награда дня","Daily reward")}</b><span>${L2("Серия: ","Streak: ")}${S.dl?S.dl.s||0:0}/7 · ${L2("на 7-й день +1 💎","day 7 gives +1 💎")}</span></div><button data-d="1" ${dailyOk()?"":"disabled"}>${dailyOk()?L2("Забрать","Claim"):"✓"}</button></div>`;
  h+=TK.map((k,i)=>{const p=prog(t,i),ok=p>=k.n;return`<div class="glass ti"><div class="ic" style="font-size:22px">📋</div><div class="tx"><b>${L2(k.ru,k.en)}</b><span>${p}/${k.n}</span></div><button data-t="${i}" ${t.c[i]||!ok?"disabled":""}>${t.c[i]?"✓":L2("Забрать","Claim")}</button></div>`}).join("");
  h+=`<div class="glass ti"><div class="ic" style="font-size:26px">♻️</div><div class="tx"><b>${L2("Перерождение","Rebirth")} ×${S.pr||0}</b><span>${L2("Нужно: удача и доход на максимуме. Даёт +10% к доходу навсегда. Сейчас: +","Needs max luck and income. +10% income forever. Now: +")}${(S.pr||0)*10}%</span></div><button data-p="1" ${prOk()?"":"disabled"}>${L2("Родиться","Rebirth")}</button></div>`;
  setH($("rwlist"),h)}
function build(){
  const wp=$("wdp"),wb=$("wdb");if(!wp||!wb||$("rwp"))return;
  const p=document.createElement("div");p.id="rwp";p.className=wp.className;p.style.cssText="display:none;text-align:left";
  p.innerHTML='<b class="hd">🎁 '+L2("Награды","Rewards")+'</b><div id="rwlist" style="margin-top:10px"></div>';
  const x=wp.querySelector(".pclose").cloneNode(true);x.onclick=()=>closePanel();p.prepend(x);
  wp.after(p);p.onclick=e=>{const b=e.target.closest("button[data-d],button[data-t],button[data-p]");if(!b||b.disabled)return;
    if(b.dataset.d)claimDaily();else if(b.dataset.t)claimTask(+b.dataset.t);else prestige()};
  /* кнопка «Награды» удалена */
  const o=closePanel;}
build();
setInterval(()=>{if(!document.hidden)draw()},1500);
/* оффлайн-доход: до 4 часов, пока игры не было */
let off=0;const iv=setInterval(()=>{if(!ready)return;clearInterval(iv);
  const lt=+S.lt||0,sec=lt?Math.min(14400,(Date.now()-lt)/1e3):0;
  if(sec>120){const c=Math.floor(incB(incAt(S.inc)+petInc())*sec*.5);if(c>0){S.coins+=c;save();pushSoon();render();toast(L2("Пока вас не было: +","While away: +")+fmt(c)+" 🪙","ok")}}
  off=1;S.lt=Date.now()},500);
setInterval(()=>{if(ready&&off){S.lt=Date.now();dirty=!0}},5000);
})();
}catch(e){try{console.error("[22_rewards_settings.js #21]",e)}catch(_){}}

/* ── скрипт #22 ── */
try{
/* блокировка прокрутки страницы, пока открыто любое подтверждение (сброс всех, удаление аккаунта и т.д.) */
(function(){
  const H=document.documentElement;
  const mods=()=>Array.prototype.slice.call(document.querySelectorAll(".confirm-modal"));
  let _sy=0,_was=false;
  const upd=()=>{const on=mods().some(m=>m.classList.contains("show"));if(on===_was){H.classList.toggle("mlock",on);return}
    if(on)_sy=window.pageYOffset||H.scrollTop||document.body.scrollTop||0;
    _was=on;H.classList.toggle("mlock",on);
    const y=_sy,r=()=>{try{window.scrollTo(0,y)}catch(e){}};r();requestAnimationFrame(r);setTimeout(r,60)};
  const mo=new MutationObserver(upd);
  /* следим за ВСЕМИ окнами, включая созданные позже (подарки, история подарков), и подстраховываемся таймером */
  const seen=new WeakSet(),obs=()=>mods().forEach(m=>{if(!seen.has(m)){seen.add(m);mo.observe(m,{attributes:true,attributeFilter:["class","style"]})}});
  obs();new MutationObserver(()=>{obs();upd()}).observe(document.body,{childList:true});
  setInterval(()=>{obs();upd()},600);
  /* внутри окна можно листать любой список, который реально прокручивается (список выбора, титулы и т.д.) */
  const sc=t=>{for(let n=t;n&&n!==document.body&&n!==H;n=n.parentElement){if(n.classList&&n.classList.contains("confirm-modal"))return!1;const o=getComputedStyle(n).overflowY;if((o==="auto"||o==="scroll")&&n.scrollHeight>n.clientHeight+1)return!0}return!1};
  const stop=e=>{if(!H.classList.contains("mlock"))return;const t=e.target&&e.target.closest?e.target:null;
    if(t&&(t.closest(".confirm-modal textarea,.confirm-modal [data-scroll]")||(t.closest(".confirm-modal")&&sc(t))))return;e.preventDefault()};
  document.addEventListener("touchmove",stop,{passive:!1});
  document.addEventListener("wheel",stop,{passive:!1});
  document.addEventListener("keydown",e=>{if(H.classList.contains("mlock")&&[" ","PageDown","PageUp","ArrowDown","ArrowUp","Home","End"].indexOf(e.key)>=0&&!/^(INPUT|TEXTAREA)$/.test((e.target||{}).tagName||""))e.preventDefault()},!0);
  upd();
})();
}catch(e){try{console.error("[22_rewards_settings.js #22]",e)}catch(_){}}

/* ── скрипт #23 ── */
try{
/* ===== ДОП. ВОЗМОЖНОСТИ: альбом, темы, экономия батареи, резервная копия ===== */
(function(){"use strict";
const g=id=>document.getElementById(id),H=document.documentElement;
const ld=k=>{try{return localStorage.getItem("ca-"+k)}catch(e){return null}},sv=(k,v)=>{try{localStorage.setItem("ca-"+k,v)}catch(e){}};
const css=document.createElement("style");
css.textContent='html[data-theme=neon]{--bg:#07020f;--bg2:#160828;--line:rgba(255,80,255,.35);--btn1:#ff2bd6;--btn2:#7c4dff;--inp:#0d0418}html[data-theme=light]{color-scheme:light;--bg:#eef3fb;--bg2:#fff;--glass:rgba(255,255,255,.72);--line:rgba(15,25,60,.12);--text:#0d1630;--mute:#5a6585;--inp:#f6f8fd}html.eco *{animation:none!important;transition:none!important}html.eco canvas{display:none!important}#s_ext .xr{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0}#s_ext .xr button{flex:1 1 auto;padding:9px 10px}#s_ext textarea{width:100%;min-height:70px;background:var(--inp);color:var(--text);border:1px solid var(--line);border-radius:10px;padding:8px;font-size:12px;box-sizing:border-box}';
document.head.appendChild(css);
H.setAttribute("data-theme","dark");try{localStorage.removeItem("ca-theme")}catch(e){}
if(ld("eco")==="1")H.classList.add("eco");
function sett(){
  const eco=H.classList.contains("eco"),cur=H.getAttribute("data-theme")||"dark",nm=window.nfMode?window.nfMode():"short";
  return `<div style="font-weight:700;margin-top:6px">🔋 ${L2("Экономия батареи","Battery saver")}</div><div class="xr"><button class="${eco?"":"alt"}" data-x="eco">${eco?L2("Включена","On"):L2("Выключена","Off")}</button></div><div style="color:var(--mute);font-size:12px">${L2("Отключает анимации и фон со звёздами.","Turns off animations and the star background.")}</div>`+
   `<div style="font-weight:700;margin-top:14px">🔢 ${L2("Формат чисел","Number format")}</div><div class="xr"><button class="${nm==="short"?"":"alt"}" data-x="nf:short">1M</button><button class="${nm==="words"?"":"alt"}" data-x="nf:words">${L2("1 миллион","1 million")}</button><button class="${nm==="full"?"":"alt"}" data-x="nf:full">${L2("1.000.000","1,000,000")}</button></div><div style="color:var(--mute);font-size:12px">${L2("Как показывать монеты и другие большие числа.","How to show coins and other big numbers.")}</div>`}
function profSet(){const e=g("s_ext");if(!e)return;e.innerHTML=sett()}
window.__profSet=profSet;
function draw(){profSet()}
function act(d){
  const a=d.split(":");
  if(a[0]==="lang"){setLang(LANG==="en"?"ru":"en");profSet()}
  else if(a[0]==="th"){}
  else if(a[0]==="eco"){H.classList.toggle("eco");sv("eco",H.classList.contains("eco")?"1":"0");draw()}
  else if(a[0]==="nf"){window.nfSet&&window.nfSet(a[1]);try{render()}catch(e){}profSet()}
}
{const se=g("s_ext");if(se){se.onclick=e=>{const b=e.target.closest("[data-x]");if(b)act(b.dataset.x)};profSet()}}

})();
}catch(e){try{console.error("[22_rewards_settings.js #23]",e)}catch(_){}}

/* ── скрипт #24 ── */
try{
/* ===== АНИМАЦИЯ РЕДКИХ ВЫПАДЕНИЙ И ОБУЧЕНИЕ ===== */
(function(){"use strict";
const ld=k=>{try{return localStorage.getItem("ca-"+k)}catch(e){return null}},sv=(k,v)=>{try{localStorage.setItem("ca-"+k,v)}catch(e){}};
const css=document.createElement("style");
css.textContent='#rareFx{position:fixed;inset:0;z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:center;pointer-events:none;background:radial-gradient(circle,rgba(255,255,255,.35),rgba(0,0,0,.6));animation:rfx 2.2s ease-out forwards}#rareFx b{font:800 34px var(--fh);text-shadow:0 0 24px currentColor}#rareFx span{font-size:56px}@keyframes rfx{0%{opacity:0;transform:scale(.6)}15%{opacity:1;transform:scale(1.08)}80%{opacity:1}100%{opacity:0;transform:scale(1.2)}}';

document.head.appendChild(css);
function fx(r){try{navigator.vibrate&&navigator.vibrate(120)}catch(e){}}
let lr=null,lb=null;const ix=n=>R.findIndex(r=>r.n===n),HI=Math.min(ix("Primordial"),ix("Omnipotent"),ix("Absolute"));
setInterval(()=>{if(typeof ready==="undefined"||!ready)return;
  if(lr===null){lr=S.rolls;lb=S.best;return}
  lr=S.rolls;
  if(S.best>lb&&HI>=0&&S.best>=HI&&R[S.best])fx(R[S.best]);lb=S.best},700);
})();
}catch(e){try{console.error("[22_rewards_settings.js #24]",e)}catch(_){}}
