/* 29_skilltree.js — древо навыков (мир 5)
   (вынесено из index.html без изменений; порядок подключения — по номеру файла) */

/* ── скрипт #41 (id=skilltree) ── */
try{
/* ===================== ДРЕВО НАВЫКОВ (мир 5 · Solo Leveling) ===================== */
(function(){"use strict";
const $=id=>document.getElementById(id),WID=4;
const css=document.createElement("style");
css.textContent=`
#skp .sk-top{display:flex;align-items:center;gap:12px;margin-top:10px;padding:12px 14px;border-radius:16px}
#skp .sk-pts{flex:none;text-align:center;min-width:64px}
#skp .sk-pts b{display:block;font:900 26px var(--fh);color:#5cffb0;line-height:1}
#skp .sk-pts small{font-size:11px;color:var(--mute);font-weight:700}
#skp .sk-xp{flex:1;min-width:0}
#skp .sk-xp .t{font:800 14px var(--fh)}
#skp .sk-bar{height:10px;border-radius:8px;background:rgba(255,255,255,.14);overflow:hidden;margin:6px 0 4px}
#skp .sk-bar i{display:block;height:100%;border-radius:8px;background:linear-gradient(90deg,#5cffb0,#38bdf8)}
#skp .sk-xp .s{font-size:11.5px;color:var(--mute)}
#skp .sk-leg{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:14px;text-align:center;font:800 11.5px var(--fh)}
#skp .sk-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px 8px;margin:10px 0 12px;padding-top:4px}
#skp .sk-wide{grid-column:1/5}
#skp button.sk-n{position:relative;display:flex!important;flex-direction:column;align-items:center;justify-content:center;gap:1px;width:100%;aspect-ratio:1/1;min-height:0!important;padding:2px!important;border-radius:16px!important;background:rgba(255,255,255,.05)!important;border:2px solid color-mix(in srgb,var(--bc) 40%,transparent)!important;color:#fff!important;box-shadow:none!important;font-family:var(--fh)!important;overflow:visible!important}
#skp button.sk-n i{font-style:normal;font-size:27px;line-height:1.1}
#skp button.sk-n b{font:800 11px var(--fh);color:var(--mute)}
#skp button.sk-n.sk-wide{aspect-ratio:auto;flex-direction:row;gap:10px;padding:10px 12px!important;justify-content:center}
#skp button.sk-n.sk-wide b{font-size:13px}
#skp button.sk-n.sk-wide em{font:800 14px var(--fh);font-style:normal}
#skp button.sk-n.lock{opacity:.42;filter:grayscale(.85);border-style:dashed!important}
#skp button.sk-n.can{border-color:var(--bc)!important;box-shadow:0 0 16px -2px var(--bc)!important;animation:skpulse 1.8s ease-in-out infinite}
#skp button.sk-n.have{background:color-mix(in srgb,var(--bc) 22%,rgba(255,255,255,.04))!important;border-color:var(--bc)!important}
#skp button.sk-n.have b{color:#fff}
#skp button.sk-n.max{border-color:#ffd86b!important;background:color-mix(in srgb,#ffd86b 20%,rgba(255,255,255,.04))!important}
#skp button.sk-n.max b{color:#ffd86b}
#skp button.sk-n.sel{outline:3px solid rgba(255,255,255,.85);outline-offset:2px}
#skp button.sk-n::before,#skp button.sk-n.dn::after{content:"";position:absolute;left:50%;width:3px;height:18px;margin-left:-1.5px;border-radius:2px;background:rgba(255,255,255,.16)}
#skp button.sk-n::before{top:-20px}
#skp button.sk-n.dn::after{bottom:-20px}
#skp button.sk-n.up::before,#skp button.sk-n.dn.have::after{background:var(--bc)}
#skp button.sk-n.root::before,#skp button.sk-n.sk-wide::before{display:none}
@keyframes skpulse{0%,100%{transform:scale(1)}50%{transform:scale(1.045)}}
#skp .sk-det{padding:14px;border-radius:16px;margin-top:6px}
#skp .sk-det h4{margin:0 0 4px;font:900 17px var(--fh)}
#skp .sk-det p{margin:4px 0;font-size:13px;line-height:1.45;color:var(--mute)}
#skp .sk-det p b{color:var(--text,#fff)}
#skp .sk-det .rq{color:#ff8a8a;font-weight:700}
#skp .sk-buy{width:100%;margin-top:10px;padding:14px!important;font:900 16px var(--fb)!important}
#skp .sk-sum{margin-top:12px;padding:12px 14px;border-radius:16px;font-size:13px;line-height:1.6}
#skp .sk-sum b{font:800 13px var(--fh)}
`;
document.head.appendChild(css);

/* ---------- данные ---------- */
const BR={a:{c:"#ff7a3d",e:"🗡️",ru:"Клинок",en:"Blade"},b:{c:"#38bdf8",e:"👥",ru:"Тени",en:"Shadows"},c:{c:"#ffd23f",e:"🍀",ru:"Фортуна",en:"Fortune"},d:{c:"#b987ff",e:"🚪",ru:"Врата",en:"Gates"}};
/* c — база цены (очков): уровень L стоит c*(L+1) */
const N=[
 {id:"r",ic:"🎯",ru:"Пробуждение системы",en:"System Awakening",max:3,c:1,fx:"all",per:.05,req:[],col:"#5cffb0",row:0},
 {id:"a1",br:"a",ic:"🗡️",ru:"Удар кинжала",en:"Dagger Strike",max:5,c:1,fx:"dmg",per:.08,req:[["r",1]],row:1},
 {id:"b1",br:"b",ic:"👤",ru:"Солдат тени",en:"Shadow Soldier",max:5,c:1,fx:"inc",per:.08,req:[["r",1]],row:1},
 {id:"c1",br:"c",ic:"✨",ru:"Шанс охотника",en:"Hunter's Chance",max:4,c:1,fx:"luck",per:1,req:[["r",1]],row:1},
 {id:"d1",br:"d",ic:"🗝️",ru:"Ключ врат",en:"Gate Key",max:5,c:1,fx:"drop",per:.1,req:[["r",1]],row:1},
 {id:"a2",br:"a",ic:"💨",ru:"Проворство",en:"Agility",max:5,c:2,fx:"spd",per:.15,req:[["a1",2]],row:2},
 {id:"b2",br:"b",ic:"💰",ru:"Добыча теней",en:"Shadow Loot",max:5,c:2,fx:"kill",per:.12,req:[["b1",2]],row:2},
 {id:"c2",br:"c",ic:"🎲",ru:"Дар врат",en:"Gate Gift",max:4,c:2,fx:"luck",per:1,req:[["c1",2]],row:2},
 {id:"d2",br:"d",ic:"📖",ru:"Мудрость охотника",en:"Hunter's Wisdom",max:5,c:2,fx:"xp",per:.1,req:[["d1",2]],row:2},
 {id:"a3",br:"a",ic:"⚔️",ru:"Ярость монарха",en:"Monarch's Fury",max:3,c:4,fx:"dmg",per:.2,req:[["a2",2]],row:3},
 {id:"b3",br:"b",ic:"🦅",ru:"Армия теней",en:"Shadow Army",max:3,c:4,fx:"inc",per:.15,req:[["b2",2]],row:3},
 {id:"c3",br:"c",ic:"🌟",ru:"Рука судьбы",en:"Hand of Fate",max:2,c:4,fx:"luck",per:2,req:[["c2",2]],row:3},
 {id:"d3",br:"d",ic:"🌑",ru:"Шаг тени",en:"Shadow Step",max:3,c:4,fx:"spd",per:.25,req:[["d2",2]],row:3},
 {id:"s",ic:"👑",ru:"Трон монарха",en:"Monarch's Throne",max:1,c:20,fx:"sun",per:0,req:[["a3",1],["b3",1],["c3",1],["d3",1]],col:"#ffd86b",row:4}
];
const BY={};N.forEach(n=>BY[n.id]=n);
const cost=(n,l)=>n.id==="s"?20:n.c*(l+1);
const XPK=[1,2,3,5,8,12];            /* опыт за убийство моба по сложности */
const need=l=>12+3*l;                 /* опыта до следующего очка навыков */

/* ---------- состояние (S.sk = {sp, lvl, xp, n:{id:уровень}}) ---------- */
const on=()=>true,here=()=>Array.isArray(S.wu)&&S.wu.includes(WID);
function K(){let k=S.sk;if(!k||typeof k!=="object"||Array.isArray(k))k=S.sk={};
 k.sp=Math.max(0,k.sp|0);k.lvl=Math.max(0,k.lvl|0);k.xp=Math.max(0,+k.xp||0);
 if(!k.n||typeof k.n!=="object"||Array.isArray(k.n))k.n={};return k}
const lv=id=>{const n=BY[id];return n?Math.min(n.max,Math.max(0,K().n[id]|0)):0};
const sun=()=>lv("s")>0;
const reqOk=n=>n.req.every(r=>lv(r[0])>=r[1]);

/* ---------- бонусы ---------- */
const mulDmg=()=>(1+.05*lv("r")+.08*lv("a1")+.2*lv("a3"))*(sun()?1.5:1);
const mulInc=()=>(1+.05*lv("r")+.08*lv("b1")+.15*lv("b3"))*(sun()?1.5:1);
const mulKill=()=>1+.05*lv("r")+.12*lv("b2");
const addLuck=()=>lv("c1")+lv("c2")+2*lv("c3")+(sun()?2:0);
const mulDrop=()=>1+.1*lv("d1")+(sun()?.25:0);
const addSpd=()=>.15*lv("a2")+.25*lv("d3");
const mulXp=()=>1+.1*lv("d2");

/* подключаемся к существующим хукам игры (действуют только в мире 5) */
function hook(name,fn,base){
 const o=window[name];
 const w=function(){const b=o?o.apply(this,arguments):base;return on()?fn(b):b};
 w.raw=o||function(){return base};
 window[name]=w;
}
hook("dgDmg",b=>b*mulDmg(),1);          /* урон за удар */
hook("dgCoin",b=>b*mulInc(),1);         /* пассивный доход */
hook("dgDropCoin",b=>b*mulKill(),1);    /* монеты с убийств мобов */
hook("dgLuck",b=>b+addLuck(),0);        /* уровни удачи */
hook("dgDropMul",b=>b*mulDrop(),1);     /* шанс ключей и токенов */
hook("cpSpd",b=>b+addSpd(),0);          /* ударов в секунду */

/* опыт за убийство мобов (kill() вызывает dgKeyRoll на каждом убийстве) */
let lastT=0;
function gain(t){
 const k=K();k.xp+=(XPK[t]||1)*mulXp();
 let n=0;while(k.xp>=need(k.lvl)&&n<100){k.xp-=need(k.lvl);k.lvl++;k.sp++;n++}
 if(n){lbl();const now=Date.now();
  if(now-lastT>2500){lastT=now;toast("🌳 "+L2("Очко навыков: +","Skill point: +")+n+" · "+L2("доступно","available")+" "+k.sp,"ok")}
  if(open())draw()}
}
const oK=window.dgKeyRoll;
window.dgKeyRoll=function(t){try{if(on())gain(t|0)}catch(e){}return oK?oK.apply(this,arguments):undefined};

/* ---------- интерфейс ---------- */
const T=(a,b)=>L2(a,b);
const fp=x=>"+"+(+(x*100).toFixed(1))+"%";
function fxTxt(n,l){
 const v=n.per*l;
 switch(n.fx){
  case "all":return T(fp(v)+" к урону, доходу и монетам с мобов",fp(v)+" to damage, income and mob coins");
  case "dmg":return T(fp(v)+" урона",fp(v)+" damage");
  case "inc":return T(fp(v)+" пассивного дохода",fp(v)+" passive income");
  case "kill":return T(fp(v)+" монет за убийство мобов",fp(v)+" coins per mob kill");
  case "luck":return T("+"+v+" ур. удачи","+"+v+" luck levels");
  case "drop":return T(fp(v)+" шанса ключей и токенов",fp(v)+" key and token chance");
  case "spd":return T("+"+(+v.toFixed(2))+" удара/с","+"+(+v.toFixed(2))+" hits/s");
  case "xp":return T(fp(v)+" опыта навыков",fp(v)+" skill XP");
  case "sun":return T("×1.5 урона и дохода, +2 удачи, +25% шанса ключей","×1.5 damage and income, +2 luck, +25% key chance");
 }return"";
}
let sel="r",rsT=0;
const p=document.createElement("div");
p.id="skp";p.className="glass stage pbox";p.style.cssText="display:none;text-align:left";
p.innerHTML='<button class="alt pclose" aria-label="Закрыть"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7l10 10M17 7L7 17"/></svg></button> <b class="hd">🌳 <span id="skhd"></span></b><div class="adm-sub" id="sksub"></div><div id="skbody"></div>';
$("pwrap").appendChild(p);
try{p.querySelector(".pclose").onclick=()=>closePanel()}catch(e){}
const open=()=>p.style.display==="block"&&$("pwrap").classList.contains("open");

const mb=$("dgb")||$("mobb");
if(mb)mb.insertAdjacentHTML("afterend",'<button class="alt" id="skb" type="button" style="display:none"><span>🌳 Древо навыков</span></button>');
function lbl(){
 const b=$("skb");if(!b)return;
 const w=here();if(b.style.display!==(w?"":"none"))b.style.display=w?"":"none";
 if(!w)return;
 const sp=K().sp,t="🌳 "+T("Древо навыков","Skill tree")+(sp?" · ✨"+sp:"");
 const s=b.firstElementChild||b;if(s.textContent!==t)s.textContent=t;
}
setInterval(lbl,800);

function nodeH(n){
 const l=lv(n.id),ok=reqOk(n),mx=l>=n.max,sp=K().sp;
 const col=n.br?BR[n.br].c:n.col;
 const wide=n.row===0||n.row===4;
 const cls=["sk-n",wide?"sk-wide":"",n.row===0?"root":"",ok?"up":"lock",l>0?"have":"",mx?"max":"",n.row===3?"dn":"",sel===n.id?"sel":"",(ok&&!mx&&sp>=cost(n,l))?"can":""].filter(Boolean).join(" ");
 const inner=wide?`<i>${n.ic}</i><em>${esc(T(n.ru,n.en))}</em><b>${l}/${n.max}</b>`:`<i>${n.ic}</i><b>${l}/${n.max}</b>`;
 return`<button type="button" class="${cls}" data-sk="${n.id}" style="--bc:${col}" aria-label="${esc(T(n.ru,n.en))}">${inner}</button>`;
}
function reqTxt(n){
 return n.req.filter(r=>lv(r[0])<r[1]).map(r=>{const q=BY[r[0]];return q.ic+" "+T(q.ru,q.en)+" "+T("ур.","lv.")+" "+r[1]}).join(", ");
}
function sumH(){
 const a=[];
 if(mulDmg()>1)a.push("⚔️ "+T("Урон","Damage")+" ×"+(+mulDmg().toFixed(2)));
 if(mulInc()>1)a.push("🪙 "+T("Доход","Income")+" ×"+(+mulInc().toFixed(2)));
 if(mulKill()>1)a.push("👹 "+T("Монеты с мобов","Mob coins")+" ×"+(+mulKill().toFixed(2)));
 if(addLuck()>0)a.push("🍀 "+T("Удача","Luck")+" +"+addLuck());
 if(mulDrop()>1)a.push("🗝️ "+T("Ключи и токены","Keys and tokens")+" ×"+(+mulDrop().toFixed(2)));
 if(addSpd()>0)a.push("⚡ "+T("Скорость","Speed")+" +"+(+addSpd().toFixed(2))+" "+T("уд/с","hits/s"));
 if(mulXp()>1)a.push("📖 "+T("Опыт навыков","Skill XP")+" ×"+(+mulXp().toFixed(2)));
 return a.length?a.join("<br>"):'<span style="color:var(--mute)">'+T("Пока нет активных бонусов — вложи первое очко в 🎯","No active bonuses yet — put your first point into 🎯")+'</span>';
}
function draw(){
 const body=$("skbody");if(!body)return;
 $("skhd").textContent=T("Древо навыков","Skill tree");
 $("sksub").textContent=T("Силы охотника: вкладывай очки в ветви. Очки дают убийства мобов — чем сложнее моб, тем больше опыта. Бонусы действуют во всех мирах. Нажми на навык, затем ещё раз, чтобы улучшить.","Hunter powers: invest points into branches. Points come from mob kills — harder mobs give more XP. Bonuses work in all worlds. Tap a skill, then tap it again to upgrade.");
 if(!here()){setH(body,'<div style="color:var(--mute);margin-top:12px">'+T("Сначала открой мир ","Unlock the world first: ")+"🌑 Solo Leveling</div>");return}
 const k=K(),nd=need(k.lvl),pc=Math.min(100,k.xp/nd*100);
 const n=BY[sel]||BY.r,l=lv(n.id),ok=reqOk(n),mx=l>=n.max,c=cost(n,l),can=ok&&!mx&&k.sp>=c;
 const col=n.br?BR[n.br].c:n.col;
 const legend=Object.keys(BR).map(b=>`<div style="color:${BR[b].c}">${BR[b].e} ${T(BR[b].ru,BR[b].en)}</div>`).join("");
 const byRow=r=>N.filter(x=>x.row===r).map(nodeH).join("");
 let det=`<h4 style="color:${col}">${n.ic} ${esc(T(n.ru,n.en))} <span style="font:800 13px var(--fh);color:var(--mute)">· ${T("ур.","lv.")} ${l}/${n.max}</span></h4>`;
 det+=`<p>${n.fx==="sun"?"<b>"+T("Эффект:","Effect:")+"</b> "+fxTxt(n,1):"<b>"+T("За уровень:","Per level:")+"</b> "+fxTxt(n,1)}</p>`;
 if(n.fx!=="sun"){
  det+=`<p><b>${T("Сейчас:","Now:")}</b> ${l?fxTxt(n,l):"—"}</p>`;
  if(!mx)det+=`<p><b>${T("Следующий уровень:","Next level:")}</b> ${fxTxt(n,l+1)}</p>`;
 }
 if(!ok)det+=`<p class="rq">🔒 ${T("Нужно:","Requires:")} ${esc(reqTxt(n))}</p>`;
 det+=`<p style="color:var(--mute);margin-top:8px">${mx?T("Максимальный уровень ✅","Max level ✅"):"👆 "+T("Нажми по навыку ещё раз, чтобы улучшить","Tap the skill again to upgrade")+" · ✨ "+c}</p>`;
 const html=`<div class="glass sk-top"><div class="sk-pts"><b>${k.sp}</b><small>✨ ${T("очков","points")}</small></div><div class="sk-xp"><div class="t">${T("Ранг охотника","Hunter rank")} ${k.lvl}</div><div class="sk-bar"><i style="width:${pc}%"></i></div><div class="s">${T("Опыт","XP")}: ${fmt(k.xp)} / ${nd} · ${T("убийства мобов ⚔️","mob kills ⚔️")}</div></div></div>
 <div class="sk-leg">${legend}</div>
 <div class="sk-grid">${byRow(0)}${byRow(1)}${byRow(2)}${byRow(3)}${byRow(4)}</div>
 <div class="glass sk-det">${det}</div>
 <div class="glass sk-sum"><b>${T("Активные бонусы","Active bonuses")}</b><br>${sumH()}</div>
 <div class="row" style="margin-top:12px"><button class="alt" id="sk_rs" type="button" ${Object.keys(k.n).length?"":"disabled"}>${rsT&&Date.now()-rsT<3500?T("Нажми ещё раз для сброса","Tap again to reset"):T("↺ Сбросить навыки (очки вернутся)","↺ Reset skills (points refunded)")}</button></div>`;
 setH(body,html);
}
function buy(){
 const n=BY[sel];if(!n||!ready||!here())return;
 const l=lv(n.id),k=K();
 if(l>=n.max)return;
 if(!reqOk(n))return toast("🔒 "+T("Сначала открой: ","Unlock first: ")+reqTxt(n),"err");
 const c=cost(n,l);
 if(k.sp<c)return toast(T("Не хватает очков навыков","Not enough skill points"),"err");
 k.sp-=c;k.n[n.id]=l+1;
 try{render()}catch(e){}
 save();try{pushSoon()}catch(e){}
 draw();lbl();
 toast(n.ic+" "+T(n.ru,n.en)+": "+T("ур.","lv.")+" "+(l+1),"ok");
}
function respec(){
 const k=K();if(!ready||!here()||!Object.keys(k.n).length)return;
 const now=Date.now();
 if(!rsT||now-rsT>3500){rsT=now;draw();setTimeout(()=>{if(open())draw()},3600);return}
 rsT=0;k.n={};k.sp=k.lvl;
 try{render()}catch(e){}
 save();try{pushSoon()}catch(e){}
 draw();lbl();toast("↺ "+T("Навыки сброшены, очки возвращены","Skills reset, points refunded"),"ok");
}
p.onclick=e=>{
 const b=e.target.closest("button");if(!b||b.disabled||b.classList.contains("pclose"))return;
 if(b.dataset.sk){if(sel===b.dataset.sk){buy();return}sel=b.dataset.sk;draw();return}
 if(b.id==="sk_buy")buy();else if(b.id==="sk_rs")respec();
};
const sb=$("skb");
const _op=window.openPanel;
window.openPanel=function(e){if(e!=="skp")p.style.display="none";return _op.apply(this,arguments)};
if(sb)sb.onclick=()=>{if(!here())return;p.style.display="block";draw();_op("skp")};
window.wpUp4=()=>{try{return `<button class="alt" data-wo="sk" data-wid="4">🌳 ${L2("Древо навыков","Skill tree")}${window.skSp&&skSp()?" · ✨"+skSp():""}</button>`}catch(e){return""}};window.skOpen=()=>{if(!here())return toast(L2("Сначала открой 5 мир (Соло Левелинг)","Unlock World 5 (Solo Leveling) first"),"err");p.style.display="block";draw();_op("skp")};window.skSp=()=>K().sp;
try{Object.assign(TX,{"🌳 Древо навыков":"🌳 Skill tree"})}catch(e){}
lbl();
})();
}catch(e){try{console.error("[29_skilltree.js #41]",e)}catch(_){}}
