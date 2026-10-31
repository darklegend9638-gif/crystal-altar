/* 21_world_pets.js — питомцы миров
   (вынесено из index.html без изменений; порядок подключения — по номеру файла) */

/* ── скрипт #20 ── */
try{
/* ===== ПИТОМЦЫ МИРОВ + кнопки Гача 1 / Гача 2 / Петы в карточках миров ===== */
(function(){"use strict";
const $$=id=>document.getElementById(id);
const PI=[1,2,4,8,15,30,60,120,250];
const price=(w,r)=>Math.floor(100*Math.pow(3,r)*(WORLDS[w].cm||1)),inc=(w,r)=>PI[r]*(WORLDS[w].vm||1);
const P=[["🐸 Gamakichi", "🐕 Akamaru", "🐶 Pakkun", "🐌 Katsuyu", "🐍 Aoda", "🐸 Gamabunta", "🐍 Manda", "🦊 Kurama", "🌕 Juubi"], ["🐵 Bubbles", "🐱 Puar", "🐷 Oolong", "🐢 Turtle Hermit", "🐲 Porunga", "🦍 Great Ape", "🐉 Shenron", "🌟 Super Saiyan", "🔥 Ultra Instinct"], ["🦌 Chopper", "🐈 Carrot", "🐻 Bepo", "⛈️ Zeus", "🐉 Momonosuke", "🐲 Kaido Dragon", "🦅 Phoenix Marco", "🦁 Sunny Lion", "☀️ Nika"], ["🐴 Scout Horse", "🕊️ Wall Pigeon", "🧣 Mikasa", "📘 Armin", "⚔️ Levi", "👁️ Eren", "🦍 Beast Titan", "🛡️ Colossal Titan", "🌌 Founding Titan"], ["🐜 Ant Soldier", "🐺 Fang Wolf", "🦅 Kaisel", "🛡️ Tank", "🪲 Beru", "⚔️ Igris", "🗡️ Shadow Monarch", "👑 Ant King", "🌑 Monarch of Shadows"], ["🐦 Kasugai Crow", "🐗 Inosuke", "🐭 Chuntaro", "⚡ Zenitsu", "🌸 Nezuko", "🔥 Rengoku", "🌊 Tanjiro", "👹 Muzan", "☀️ Yoriichi"], ["🐦 Nero", "💧 Noelle", "🌪️ Yuno", "🔥 Mereoleona", "⚔️ Asta", "🌑 Yami", "😈 Liebe", "👑 Julius", "🍀 Five-Leaf Clover"]];
const pet=(w,r)=>(P[w]||P[0])[r];
let ew=0;const AU={};
const own=w=>{if(!S.wp||typeof S.wp!=="object"||Array.isArray(S.wp))S.wp={};let a=S.wp[w];if(!Array.isArray(a)||a.length!==9){a=[0,0,0,0,0,0,0,0,0];S.wp[w]=a}return a};
window.wpInc=()=>{try{let t=0;for(let w=0;w<WORLDS.length;w++)own(w).forEach((o,r)=>{if(o)t+=inc(w,r)});return t}catch(e){return 0}};
const st=document.createElement("style");
st.textContent=`#wdlist .wbr{display:flex;gap:5px;margin-top:6px;flex-wrap:wrap}#wdlist .wbr button{padding:3px 9px;font-size:11px;border-radius:8px;min-height:0}
#wpp .wpe{display:flex;gap:12px;align-items:center;margin-bottom:10px}#wpp .wpem{font-size:44px;filter:drop-shadow(0 4px 10px rgba(0,0,0,.4))}#wpp .wps{color:var(--mute);font-size:12px;margin-top:3px}#wpp .wpm{margin:8px 0;padding:8px 10px;border-radius:12px;background:rgba(255,255,255,.07);font:700 12px var(--fb)}#wpp .wph{display:flex;gap:8px;margin:10px 0}#wpp .wph button{flex:1;font:800 13px var(--fh);padding:11px 6px;border-radius:14px}#wpp .wpg2{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}#wpp .wpt2{display:flex;flex-direction:column;align-items:center;gap:2px;padding:10px 4px 8px;border-radius:14px;border:2px solid var(--c);background:rgba(255,255,255,.05);text-align:center;min-width:0}#wpp .wpt2.no{opacity:.6}#wpp .wpt2.hit{animation:gxh .6s}#wpp .wpt2 .e{font-size:26px}#wpp .wpt2 .n{font:800 10px var(--fh);line-height:1.2;word-break:break-word}#wpp .wpt2 .c{font:800 11px var(--fb);color:var(--c)}#wpp .wpt2 .i{font-size:10px;color:var(--mute)}#wpp .wpg{display:grid;grid-template-columns:repeat(auto-fill,minmax(46px,1fr));gap:5px}#wpp .wpt{position:relative;aspect-ratio:1;width:100%;border-radius:8px;border:2px solid #2bd23a;background:#11361f;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0;color:#fff;font:800 9px var(--fb)}#wpp .wpt.no{border-color:#333;background:#101512;opacity:.65}#wpp .wpt .e{font-size:18px;line-height:1.1}#wpp .wpt .k{position:absolute;right:-4px;top:-5px;width:15px;height:15px;border-radius:50%;background:#ff3d9a;font-size:10px;line-height:15px;text-align:center;border:1px solid #fff;font-style:normal}`;
document.head.appendChild(st);
window.wpRow0=0;window.wpRow=wid=>`<div class="wbr"><button class="alt" data-wo="g0" data-wid="${wid}">🎴 ${(window.__gxTitle?__gxTitle(wid):"Gacha")}</button><button class="alt" data-wo="p" data-wid="${wid}">🥚 ${L2("Яйцо","Egg")}</button>${wid===0?window.wpUp():wid===2&&window.wpUp2?window.wpUp2():wid===4&&window.wpUp4?window.wpUp4():""}</div>`;
let lastR=-1,lastMsg="";
const eggCost=n=>Math.ceil(10*n*(gpHas("vip")?.7:1)),pf=q=>q>=1?+q.toFixed(2):+q.toPrecision(3),pn=q=>q.slice(q.indexOf(" ")+1);
function ui(){const box=$$("wpin");if(!box)return;const w=ew,o=own(w),n=o.reduce((a,b)=>a+b,0),wt=weights().slice(0,9),t=wt.reduce((a,b)=>a+b,0);
$$("wpt").textContent="🥚 "+WORLDS[w].ic+" "+L2(WORLDS[w].ru,WORLDS[w].en)+" · "+n+"/9";
setH(box,`<div class="wpe"><div class="wpem">🥚</div><div><b>${L2("Яйцо","Egg")} · ${esc(L2(WORLDS[w].ru,WORLDS[w].en))}</b><div class="wps">${L2("Яйцо можно крутить из любого мира, авто-ролл работает в фоне. Шансы растут с удачей. Доход питомцев со всех миров суммируется.","An anime pet of this world hatches. Odds match the items and grow with luck.")}</div></div></div>
${lastMsg?`<div class="wpm">${esc(lastMsg)}</div>`:""}
<div class="wph"><button data-h="1">🥚 x1 · ${fmt(eggCost(1))} 🪙</button><button data-h="10">🥚 x10 · ${fmt(eggCost(10))} 🪙</button></div>
<div class="wph"><button data-au="1" class="${AU[w]?"":"alt"}">🔁 ${L2("Авто-ролл","Auto roll")}: ${AU[w]?L2("вкл","on"):L2("выкл","off")}</button></div>
<div class="wpg2">${[0,1,2,3,4,5,6,7,8].map(r=>{const p=pet(w,r);return `<div class="wpt2${o[r]?"":" no"}${lastR===r?" hit":""}" style="--c:${R[r].c}"><span class="e">${p.split(" ")[0]}</span><span class="n">${esc(pn(p))}</span><span class="c">${pf(wt[r]/t*100)}%</span><span class="i">${o[r]?"+"+fmt(inc(w,r))+L2("/с","/s"):"—"}</span></div>`}).join("")}</div>`)}
function doHatch(w,n,quiet){const o=own(w),c=eggCost(n);if(S.coins<c){if(!quiet)toast(L2("Не хватает монет","Not enough coins"),"err");return false}
S.coins-=c;const wt=weights().slice(0,9),t=wt.reduce((a,b)=>a+b,0),nw=[];let dup=0,top=0;
for(let k=0;k<n;k++){let x=Math.random()*t,r=0;for(;r<8&&x>=wt[r];r++)x-=wt[r];if(r>top)top=r;if(o[r])dup++;else{o[r]=1;nw.push(r)}}
if(w===ew){lastR=top;lastMsg=(nw.length?L2("Новые: ","New: ")+nw.map(r=>pet(w,r)).join(", "):"")+(dup?(nw.length?" · ":"")+L2("Дубликатов: ","Duplicates: ")+dup:"")}
try{render()}catch(x){}save();pushSoon();if(w===ew)ui();return true}
function hatch(n){doHatch(ew,n,false)}
setInterval(()=>{if(!ready)return;for(const k in AU){if(!AU[k])continue;const w=+k;if(own(w).every(x=>x)){AU[k]=false;if(w===ew)ui();continue}
const nn=S.coins>=eggCost(10)?10:S.coins>=eggCost(1)?1:0;if(nn)doHatch(w,nn,true)}},500);
$$("wpin").onclick=e=>{const b=e.target.closest("button");if(!b)return;if(b.dataset.h)hatch(+b.dataset.h);else if(b.dataset.au){if(own(ew).every(x=>x))return toast(L2("Все питомцы этого мира уже собраны","All pets of this world are collected"),"ok");AU[ew]=!AU[ew];ui()}};
window.wpUp=()=>{try{return `<button class="alt" data-wo="up" data-wid="0">⚡ ${L2("Прокачка","Upgrades")} · 🍀 ${LK(S.luck)} · 💰 ${fmtInc(incAt(S.inc))} · 🔄 ${rbN()}/${RB_MAX}</button>`}catch(e){return""}};
window.wpAct=(k,wid)=>{if(k==="up"){window.upOpen&&window.upOpen();return}if(k==="cu"){window.cuBuy();return}if(k==="sk"){window.skOpen&&window.skOpen();return}if(k==="lk"||k==="ic"||k==="rb"){if(k==="rb"&&(S.w|0)!==0)return;
 if(k==="rb"){const b=$$("rbBtn");if(!b||b.disabled)return toast(L2("Требования перерождения не выполнены","Rebirth requirements not met"),"err");b.click();if(typeof rbArm!=="undefined"&&rbArm)toast(L2("Нажми ещё раз — прогресс сбросится","Tap again — progress will reset"),"info");return}
 const b=$$(k==="lk"?"luck":"inc");if(b&&!b.disabled)b.click();return}
if(k!=="p"&&window.gxOpen)return gxOpen(0,wid);
if(k==="p"){ew=wid;$$("wpp").style.display="block";ui();openPanel("wpp")}else if(window.gxOpen)gxOpen(0)};
try{render()}catch(e){}
})();
}catch(e){try{console.error("[21_world_pets.js #20]",e)}catch(_){}}
