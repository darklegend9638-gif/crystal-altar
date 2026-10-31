/* 19_mobs_keys.js — мобы и ключи
   (вынесено из index.html без изменений; порядок подключения — по номеру файла) */

/* ── скрипт #18 ── */
try{
/* ===================== МОБЫ И КЛЮЧИ ===================== */
(function(){
"use strict";
/* КВОТЫ: сколько мобов каждой сложности надо убить, чтобы получить ключ (30, 25, 20, 15, 10, 5).
   Каждая сложность даёт ключ ОДИН раз — потом на ней стоит галочка, но бить можно (монеты). */
const QUOTA=[30,25,20,15,10,5];
/* сколько ключей нужно для портала в следующий мир (6 = по одному с каждой сложности) */
window.KEYS_NEED=6;
const HPM=[1,2.5,6,15,40,120];          /* множитель здоровья по сложности */
const RWM=[2,4,8,16,32,64];             /* награда монетами = доход/с × это число */
const DMG_STEP=.25;                      /* +25% урона за уровень прокачки */
const PET_SPEED=.05;                     /* каждая единица дохода питомцев = +0.05 ударов/с энергии */
const TC=["#6ee08a","#5cb4ff","#b987ff","#ff9a3d","#ff5c7a","#ffd86b"];
const TN=[["Очень лёгкий","Very Easy"],["Лёгкий","Easy"],["Средний","Normal"],["Сложный","Hard"],["Очень сложный","Very Hard"],["Экстрим","Extreme"]];
const MOBS=[[["🗡️", "Sabuze", "Sabuze"], ["🎭", "Tobe", "Tobe"], ["🦈", "Kesame", "Kesame"], ["🔴", "Pano", "Pano"], ["🔥", "Madera", "Madera"], ["🌕", "Kagoye", "Kagoye"]], [["🟢", "Gurdo", "Gurdo"], ["🔵", "Borter", "Borter"], ["🟣", "Giyun", "Giyun"], ["🤖", "Rezome", "Rezome"], ["🐛", "Ceu", "Ceu"], ["🍬", "Boo", "Boo"]], [["⚓", "Marine Soldier", "Marine Soldier"], ["⚡", "Enel", "Enel"], ["✨", "Kizary", "Kizary"], ["🧊", "Aokiri", "Aokiri"], ["🌋", "Akanu", "Akanu"], ["🐉", "Caido", "Caido"]], [["🦷", "Jaw Titan", "Jaw Titan"], ["💎", "Female Titan", "Female Titan"], ["🦍", "Zeke Titan", "Zeke Titan"], ["⚔️", "Attack Titan", "Attack Titan"], ["🔨", "Hammer Titan", "Hammer Titan"], ["🌋", "Colossal Titan", "Colossal Titan"]], [["👺", "Gogun", "Gogun"], ["🗡️", "Keng", "Keng"], ["🕴️", "Gotu", "Gotu"], ["🐲", "Antaro", "Antaro"], ["💀", "Tusko", "Tusko"], ["❄️", "Baruke", "Baruke"]], [["🎾", "Susamaro", "Susamaro"], ["🚂", "Enmo", "Enmo"], ["🔪", "Gyutaru", "Gyutaru"], ["🎀", "Dake", "Dake"], ["😭", "Hantego", "Hantego"], ["❄️", "Dhoma", "Dhoma"]], [["🔥", "Vanice", "Vanice"], ["👑", "Nolel", "Nolel"], ["🦇", "Zagrod", "Zagrod"], ["🛡️", "Liebe", "Liebe"], ["😈", "Zenen", "Zenen"], ["🌑", "Nachet", "Nachet"]]];
{const _o=MOBS.slice(),_n=_o.slice();MOBS.length=0;_n.forEach(x=>MOBS.push(x))}
window.__mobs={MOBS:MOBS,TC:TC,TN:TN};
const st=document.createElement("style");
st.textContent=`
.mob-arena{padding:14px;text-align:center;position:relative;overflow:hidden}
.mob-tier{font:800 13px var(--fh);letter-spacing:.02em;text-transform:uppercase}
.mob-em{font-size:84px;line-height:1.15;margin:6px 0 2px;cursor:pointer;user-select:none;-webkit-user-select:none;touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform .08s}
.mob-em:active{transform:scale(.9)}
.mob-em.hit{animation:mobhit .18s}
.mob-em.die{animation:mobdie .25s}
@keyframes mobhit{0%{transform:translateX(0)}25%{transform:translateX(-7px) rotate(-4deg)}75%{transform:translateX(7px) rotate(4deg)}100%{transform:translateX(0)}}
@keyframes mobdie{0%{transform:scale(1);opacity:1}100%{transform:scale(.3) rotate(25deg);opacity:0}}
.mob-nm{font:800 16px var(--fh);margin-bottom:2px}
.mob-bar{height:12px;border-radius:8px;background:rgba(255,255,255,.14);box-shadow:inset 0 0 0 1px rgba(255,255,255,.12);margin-top:8px;overflow:hidden}
.mob-bar i{display:block;height:100%;border-radius:8px;transition:width .15s linear}
.mob-eng{font-size:12.5px;color:var(--mute);margin-top:4px;line-height:1.5}
.mob-hpt{font-size:12px;color:var(--mute);margin-top:6px}
.mob-prog{font-size:13.5px;font-weight:700;margin-top:6px}
.mob-dmg{position:absolute;left:50%;top:44%;font:900 22px var(--fh);color:#ffd75e;text-shadow:0 2px 8px rgba(0,0,0,.7);pointer-events:none;animation:mobdmg .6s ease-out forwards}
@keyframes mobdmg{0%{opacity:1;transform:translate(-50%,0) scale(.8)}100%{opacity:0;transform:translate(-50%,-60px) scale(1.2)}}
`;
document.head.appendChild(st);

const $$=id=>document.getElementById(id);
let cur=null,tier=0,acc=0,lastPop=0,lastUi=0;
const lastW=()=>S.w>=WORLDS.length-1;
const nextId=()=>S.w+1;
const mobOf=t=>{const w=MOBS[S.w]||MOBS[0];return w[t]};
const hpOf=t=>Math.max(1,Math.ceil(6*(window.wVm?wVm():1)*HPM[t]));
const rwd=t=>Math.max(1,Math.floor(incNow()*RWM[t]));

/* какие ключи уже получены в мире w (6 флажков) */
function kdOf(w){
  if(!S.kd||typeof S.kd!=="object"||Array.isArray(S.kd))S.kd={};
  let a=S.kd[w];
  if(!Array.isArray(a)||a.length!==6){
    const n=(S.ky&&S.ky[w])|0,open=!!(S.wu&&S.wu.includes(w+1));
    a=[0,1,2,3,4,5].map(i=>open||i<n);S.kd[w]=a;
  }
  return a;
}
window.keysOf=w=>kdOf(w).filter(Boolean).length;
const nextOpen=()=>!lastW()&&S.wu.includes(nextId());
const done=t=>kdOf(S.w)[t]||nextOpen();

const mkp=()=>{if(!S.mk||typeof S.mk!=="object"||Array.isArray(S.mk))S.mk={};const w=S.w;if(!Array.isArray(S.mk[w])||S.mk[w].length!==6)S.mk[w]=[0,0,0,0,0,0];return S.mk[w]};

/* ПРОКАЧКА УРОНА (уровень у каждого мира свой, платится монетами этого мира) */
const dLv=()=>{if(!S.du||typeof S.du!=="object"||Array.isArray(S.du))S.du={};return S.du[S.w]|0};
const dCost=()=>Math.floor(150*(window.wCm?wCm():1)*Math.pow(1.5,dLv()));
/* УРОН за удар: множитель мира + ценность найденных предметов этого мира + бонусы удачи/дохода, × прокачка */
function damage(){
  let sum=0;
  try{ALL.forEach(e=>{if(S.found[e.t])sum+=R[e.i].v})}catch(e){}
  const base=(window.wVm?wVm():1)+Math.pow(sum,.8);
  const r=base*(1+.05*((S.luck|0)+(S.inc|0)))*(1+DMG_STEP*dLv())*(window.cpDmg?cpDmg():1)*(window.dgDmg?dgDmg():1);
  return Math.max(1,r>=10?Math.floor(r):Math.round(r*10)/10);
}
/* ЭНЕРГИЯ = урон в секунду, наносится автоматически и быстро. Скорость растёт от питомцев. */
const speed=()=>1+PET_SPEED*(typeof petInc==="function"?petInc():0)+(window.cpSpd?cpSpd():0);
const energy=()=>damage()*speed();

function spawn(){cur={w:S.w,t:tier,max:hpOf(tier),hp:hpOf(tier)}}

function ui(){
  if(!$$("mobp"))return;
  if(!cur||cur.w!==S.w||cur.t!==tier)spawn();
  const m=mobOf(cur.t),c=TC[cur.t],q=QUOTA[cur.t],k=mkp()[cur.t],dn=done(cur.t);
  const em=$$("mobem");if(em.textContent!==m[0])em.textContent=m[0];
  const tt=$$("mobtier");tt.textContent=L2(TN[cur.t][0],TN[cur.t][1])+" · ×"+q+(dn&&!lastW()?" ✅":"");tt.style.color=c;$$("moba").style.setProperty("--tc",c);
  $$("mobnm").textContent=L2(m[1],m[2]);
  $$("mobhp").style.width=Math.max(0,cur.hp/cur.max*100)+"%";
  $$("mobhp").style.background=c;
  $$("mobhpt").textContent="❤️ "+fmt(Math.max(0,Math.ceil(cur.hp)))+" / "+fmt(cur.max);
  let pr;
  if(lastW())pr=L2("Последний мир — мобы дают только монеты","Last world — mobs give coins only");
  else if(dn)pr=L2("✅ Ключ с этой сложности получен — бей за монеты","✅ Key from this tier obtained — fight for coins");
  else pr=L2("До ключа 🗝️: ","To the key 🗝️: ")+k+" / "+q;
  $$("mobprog").textContent=pr;
  const pc=typeof petInc==="function"?petInc():0;
  $$("mobeng").innerHTML="⚔️ "+esc(L2("Урон","Damage"))+": <b>"+fmt(damage())+"</b> ("+esc(L2("ур.","lv."))+" "+dLv()+") · 💥 "+esc(L2("Урон/сек","DPS"))+": <b>"+fmt(energy())+"</b><br>🐾 "+esc(L2("Питомцы ускоряют удары","Pets boost hits"))+": ×"+(+speed().toFixed(2))+(pc?"":" ("+esc(L2("питомцев нет","no pets"))+")");
  const cost=dCost(),bu=$$("mobup");
  bu.textContent="⬆️ "+L2("Прокачать урон","Upgrade damage")+" · +"+Math.round(DMG_STEP*100)+"% · 🪙 "+fmt(cost);
  bu.disabled=S.coins<cost;
  /* подзаголовок */
  const W0=WORLDS[S.w];
  let sub=W0.ic+" "+L2(W0.ru,W0.en)+" · ";
  if(lastW())sub+=L2("ключей больше не нужно","no more keys needed");
  else{const N=WORLDS[nextId()];sub+=L2("ключи для","keys for")+" "+N.ic+" "+L2(N.ru,N.en)+": 🗝️ "+keysOf(S.w)+"/"+window.KEYS_NEED+(nextOpen()?" ✓":"")}
  $$("mobsub").textContent=sub+" · 🔑 "+(window.dkOf?dkOf():0);
  /* список сложностей */
  const h=QUOTA.map((qq,t)=>{
    const mm=mobOf(t),sel=t===tier,kk=mkp()[t],d=done(t);
    const info=lastW()?"":" · "+(d?L2("✅ ключ получен","✅ key obtained"):L2("убито","killed")+" "+kk+"/"+qq+" → 🗝️1");
    return `<div class="glass ti" style="${sel?"border-color:"+TC[t]:""}"><div class="ic" style="font-size:26px">${mm[0]}</div><div class="tx"><b style="color:${TC[t]}">${esc(L2(TN[t][0],TN[t][1]))} ×${qq}${d&&!lastW()?" ✅":""}</b><span>${esc(L2(mm[1],mm[2]))} · ❤️ ${fmt(hpOf(t))} · 🪙 +${fmt(rwd(t))}${info}</span></div><button data-mt="${t}" ${sel?"disabled":""}>${sel?L2("Бьём","Fighting"):L2("Бить","Fight")}</button></div>`;
  }).join("");
  setH($$("mobl"),h);
}

function floatDmg(d){
  const a=$$("moba");if(!a||d<=0)return;
  if(a.querySelectorAll(".mob-dmg").length>6)return;
  const e=document.createElement("div");e.className="mob-dmg";e.textContent="-"+fmt(d);
  e.style.marginLeft=(Math.random()*60-30)+"px";
  a.appendChild(e);setTimeout(()=>e.remove(),650);
}
function shake(cls){const em=$$("mobem");em.classList.remove("hit","die");void em.offsetWidth;em.classList.add(cls)}

function kill(){
  const t=cur.t;
  S.coins+=Math.floor(rwd(t)*(window.dgDropCoin?dgDropCoin():1));
  if(window.dgKeyRoll)dgKeyRoll(t);if(window.tokDrop)tokDrop(t);
  if(!lastW()&&!done(t)){
    const a=mkp();a[t]++;
    if(a[t]>=QUOTA[t]){
      a[t]=QUOTA[t];kdOf(S.w)[t]=true;
      const N=WORLDS[nextId()];
      toast("🗝️ "+L2("Ключ получен! Мир «","Key obtained! World «")+L2(N.ru,N.en)+"»: "+keysOf(S.w)+"/"+window.KEYS_NEED,"ok");
      try{render()}catch(e){}
      pushSoon();
    }
  }
  save();
  shake("die");
  spawn();
  setTimeout(ui,120);
}
/* тап по мобу — удар на полный урон */
function hit(){
  if(!ready)return;
  if(!cur||cur.w!==S.w||cur.t!==tier)spawn();
  const d=damage();
  cur.hp-=d;
  floatDmg(d);
  if(cur.hp<=0){kill();return}
  shake("hit");ui();
}

$$("mobem").onclick=hit;
$$("mobup").onclick=()=>{
  const c=dCost();
  if(!ready||S.coins<c)return toast(L2("Не хватает монет","Not enough coins"),"err");
  S.coins-=c;S.du[S.w]=dLv()+1;
  try{render()}catch(e){}
  save();pushSoon();ui();
  toast("⬆️ "+L2("Урон повышен: ур. ","Damage upgraded: lv. ")+dLv(),"ok");
};
$$("mobl").onclick=e=>{const b=e.target.closest("button");if(!b||b.disabled||b.dataset.mt==null)return;tier=+b.dataset.mt;spawn();ui()};
$$("mobb").onclick=()=>{$$("mobp").style.display="block";ui();openPanel("mobp")};

/* ЭНЕРГИЯ: быстрые авто-удары 10 раз в секунду, пока открыта панель мобов */
setInterval(()=>{
  if(document.hidden||!ready)return;
  const p=$$("mobp");
  if(!p||p.style.display!=="block"||!$$("pwrap").classList.contains("open"))return;
  if(!cur||cur.w!==S.w||cur.t!==tier)spawn();
  const d=(window.enUse?enUse(.1):1)?energy()/10:0,now=Date.now();
  cur.hp-=d;acc+=d;
  if(cur.hp<=0){floatDmg(Math.floor(acc));acc=0;kill();return}
  if(now-lastPop>700){floatDmg(Math.floor(acc));acc=0;lastPop=now;shake("hit")}
  if(now-lastUi>200){lastUi=now;ui()}
},100);
window.__mobs.hpOf=hpOf;window.__mobs.dmg=damage;window.__mobs.eng=energy;window.__mobs.rwd=rwd;
try{Object.assign(TX,{"⚔️ Мобы":"⚔️ Mobs"});applyStatic()}catch(e){}
})();
}catch(e){try{console.error("[19_mobs_keys.js #18]",e)}catch(_){}}
