/* 17_daily_gamepasses.js — дневные награды (тикеты) и геймпассы
   (вынесено из index.html без изменений; порядок подключения — по номеру файла) */

/* ── скрипт #16 ── */
/* ===== ДНЕВНЫЕ НАГРАДЫ (тикеты) + ГЕЙМПАССЫ ===== */
const DR_TICKETS=[2,2,3,3,4,5,10];
const GP_LIST=[
 {k:"vip",e:"👑",price:600,ac:"#ffb02e",ru:["VIP-пасс","Тег VIP в топе · доход ×1.25 · +1 уровень удачи · награды дня +50% · скидка 10% в магазине · гача −30%"],en:["VIP Pass","VIP tag in the leaderboard · income ×1.25 · +1 luck level · daily rewards +50% · 10% shop discount · gacha −30%"]},
 {k:"dmg",e:"⚔️",price:350,ru:["Пасс силы","Урон ×2 в мобах и данжах"],en:["Power Pass","Damage ×2 in mobs and dungeons"]},
 {k:"coin",e:"💰",price:300,ru:["Золотой пасс","Монеты ×2 с роллов и дохода"],en:["Golden Pass","Coins ×2 from rolls and income"]},
 {k:"luck",e:"🍀",price:200,ru:["Пасс удачи","+3 уровня удачи навсегда"],en:["Luck Pass","+3 luck levels forever"]},
 {k:"disc",e:"⚡",price:250,ru:["Пасс мастера","Прокачка удачи и дохода −15%"],en:["Master Pass","Luck and income upgrades −15%"]},
 {k:"dual",e:"🎰",price:400,ac:"#38bdf8",ru:["Двойная гача","Крути и авто-роллей сразу 2 гачи одновременно"],en:["Dual Gacha","Roll and auto-roll both gachas at the same time"]},
 {k:"daily",e:"🎫",price:120,ru:["Пасс билетов","Ежедневные награды ×2"],en:["Ticket Pass","Daily rewards ×2"]}
];
/* время для ежедневной награды — серверное (RPC g2_now, запасной вариант — заголовок Date), смена даты на телефоне не влияет */
const drNow=()=>{if(!TOKEN)return Date.now();if(window.__srvBase!=null)return Math.floor(window.__srvBase+performance.now());return((window.__srvMiss||0)>=3&&(window.__srvNo||0)>=2)?Date.now():null};
async function srvSync(){if(!TOKEN)return;try{const t0=performance.now(),r=await rpc("g2_now",{}),t1=performance.now();if(!r.error&&r.data!=null){const ms=+(typeof r.data==="object"?(r.data.ms||r.data.now||r.data.t):r.data);if(ms>1e12){window.__srvBase=ms-(t0+t1)/2;window.__srvNo=0;return}}window.__srvNo=(window.__srvNo||0)+1}catch(e){window.__srvNo=(window.__srvNo||0)+1}}
setTimeout(srvSync,300);setInterval(()=>{document.hidden||srvSync()},6e4);document.addEventListener("visibilitychange",()=>{document.hidden||srvSync()});
const DR_CD=864e5;
function drState(){
  const r=S.dr&&typeof S.dr==="object"?S.dr:{t:0,s:0},s=Math.max(0,Math.min(7,Math.floor(+r.s)||0)),now=drNow();
  let t=+r.t||0;if(!t&&r.l){const q=Date.parse(r.l+"T00:00:00+03:00");q>0&&(t=q)}
  if(now==null)return{claimed:true,done:s,pos:Math.max(0,s-1),nosync:true,sec:0};
  if(t){const el=now-t;
   if(el<DR_CD)return{claimed:true,done:s,pos:Math.max(0,s-1),sec:Math.ceil((DR_CD-el)/1e3)};
   if(el<2*DR_CD&&s>0&&s<7)return{claimed:false,done:s,pos:s,sec:0}}
  return{claimed:false,done:0,pos:0,sec:0};
}
const drAmt=i=>Math.max(1,Math.round(DR_TICKETS[i]*(gpHas("daily")?2:1)*(gpHas("vip")?1.5:1)*clanGem()));
let _drSig="";
function drRender(){
  const st=drState(),sec=st.sec;
  $("drhd").innerHTML='<svg class="ico"><use href="#i-ticket"/></svg>'+L2("Ежедневная награда","Daily reward");
  $("drsub").textContent=L2("Серия: ","Streak: ")+st.done+"/7"+(st.claimed?" · "+L2("следующая через ","next in ")+fmtT(sec):" · "+L2("пропуск дня сбрасывает серию","skipping a day resets the streak"));
  const html=DR_TICKETS.map((_,i)=>{const done=i<st.done,cur=!st.claimed&&i===st.pos;
    return `<div class="glass ti ${done?"off":""}" ${cur?'style="border-color:var(--c4)"':""}><div class="ic">${done?"✅":i===6?"🎁":"🎫"}</div><div class="tx"><b>${L2("День ","Day ")}${i+1}</b><span>💎 +${drAmt(i)}${gpHas("daily")?" · ×2":""}</span></div></div>`}).join("");
  if(html!==_drSig){_drSig=html;$("drlist").innerHTML=html}
  const b=$("drgo");b.disabled=st.claimed;b.textContent=st.nosync?L2("Синхронизация времени…","Syncing time…"):st.claimed?L2("Получено сегодня","Claimed today"):L2("Забрать","Claim")+" · 💎 "+drAmt(st.pos);
}
function drClaim(){
  if(!ready||busy)return;const st=drState();if(st.claimed)return;
  const n=drAmt(st.pos);const _n=drNow();if(_n==null)return;S.dr={t:_n,s:st.pos+1};S.gem=(S.gem||0)+n;
  render();save();pushSoon();_drSig="";drRender();drBtn();
  toast(L2("Дневная награда: +","Daily reward: +")+n+" 💎","ok");
}
function drBtn(){
  let n=0;try{if(ready)n=drState().claimed?0:1}catch(e){}
  {const h='<svg class="ico"><use href="#i-ticket"/></svg>'+L2("Ежедневная награда","Daily reward")+(n?" (1)":""),el=$("drb");if(el.__h!==h){el.__h=h;el.innerHTML=h}}
}
$("drb").onclick=()=>{_drSig="";drRender();openPanel("drp")};
$("drgo").onclick=drClaim;
setInterval(()=>{if(document.hidden)return;try{drBtn();if($("drp").style.display==="block")drRender()}catch(e){}},500);
setTimeout(()=>{try{drBtn()}catch(e){}},0);
/* геймпассы в магазине */
function renderGP(){
  const el=$("gpl");if(!el)return;
  $("shgsub").textContent=L2("Постоянные усиления — покупаются один раз за тикеты. Можно подарить другу.","Permanent boosts — buy once with tickets. You can gift them to a friend.");
  setH(el,GP_LIST.map(g=>{const own=gpHas(g.k),p=pr({price:g.price}),can=(S.gem||0)>=p;
    return `<div class="glass ti${g.k==="vip"?" vipcard":""}"${g.ac?` style="--ac:${g.ac}"`:""}><div class="ic">${g.e}</div><div class="tx"><b>${esc(L2(g.ru[0],g.en[0]))}</b><span>${esc(L2(g.ru[1],g.en[1]))}</span></div><div class="gpb"><button data-gp="${g.k}" class="${own?"own":""}" ${own||!can?"disabled":""}>${own?L2("Куплен","Owned"):"💎 "+fmt(p)}</button><button data-gift="${g.k}" class="gift" ${can?"":"disabled"}>🎁 ${L2("Подарить","Gift")}</button></div></div>`}).join(""));
}
$("shp").addEventListener("click",e=>{
  const gb=e.target.closest("[data-gift]");
  if(gb){if(!gb.disabled&&ready&&!busy&&window.gpGift)window.gpGift(gb.dataset.gift);return}
  const b=e.target.closest("[data-gp]");if(!b||b.disabled||!ready||busy)return;
  const g=GP_LIST.find(x=>x.k===b.dataset.gp);if(!g||gpHas(g.k))return;
  const p=pr({price:g.price});if((S.gem||0)<p)return toast(L2("Не хватает тикетов","Not enough tickets"),"err");
  S.gem-=p;(S.gp||(S.gp={}))[g.k]=1;render();save();pushSoon();renderShop();window.gpChanged&&window.gpChanged(1);
  toast(L2("Куплен геймпасс: ","Game pass bought: ")+L2(g.ru[0],g.en[0]),"ok");
});
/* настройки в профиле: звук, музыка, выход */
Object.assign(TX,{"Звук":"Sound","Профиль и настройки":"Profile & settings"});
(function(){
  const sync=()=>{$("s_sfx").innerHTML=$("sfxb").innerHTML;$("s_mus").innerHTML=$("musicb").innerHTML;try{window.__profSet&&window.__profSet()}catch(e){}};
  $("s_sfx").onclick=()=>{$("sfxb").click();setTimeout(sync,0)};
  $("s_mus").onclick=()=>{$("musicb").click();setTimeout(sync,0)};
  $("s_out").onclick=()=>{closePanel();$("out").click()};
  const o=$("setb").onclick;$("setb").onclick=function(){const r=o&&o.apply(this,arguments);sync();return r};
  sync();applyStatic();
})();
