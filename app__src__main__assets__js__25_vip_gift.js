/* 25_vip_gift.js — VIP-подарки и список
   (вынесено из index.html без изменений; порядок подключения — по номеру файла) */

/* ── скрипт #28 (id=vip-gift-js) ── */
try{
(function(){"use strict";
const T=(a,b)=>L2(a,b);
Object.assign(SRVX,{"Нельзя дарить себе":"You can't gift to yourself","У игрока уже есть этот пасс":"The player already owns this pass","Неизвестный пасс":"Unknown pass"});
document.body.insertAdjacentHTML("beforeend",'<div id="giftModal" class="confirm-modal"><div class="modal-box" style="text-align:left;max-width:380px"><div class="modal-title" id="gf_t" style="text-align:center"></div><div id="gf_body"></div><div class="modal-actions" style="margin-top:12px"><button class="alt" id="gf_x"></button></div></div></div>');
let gP=null,gTo="",gBusy=0,gOwn=null;
const gm=()=>$("giftModal"),close=()=>{gm().classList.remove("show");gP=null;gTo="";gBusy=0;gOwn=null};
function gname(g){return T(g.ru[0],g.en[0])}
function gHas(nick,p){const k=String(nick||"").toLowerCase();if(!k||!gP)return false;if(gOwn&&gOwn.has(k))return true;if(gP.k==="vip"){if(window.VIPS&&window.VIPS[k])return true;if(p&&(p.vip===true||p.vip===1||p.vip==="1"||p.vip==="t"||p.vip==="true"))return true}return false}
function drawList(q){
  q=String(q||"").trim().toLowerCase();
  const me0=me&&me.nick?me.nick.toLowerCase():"";
  const arr=(typeof TP!=="undefined"&&Array.isArray(TP)?TP:[]).filter(p=>p&&p.nick&&p.nick.toLowerCase()!==me0&&(!q||p.nick.toLowerCase().includes(q))).slice(0,100);
  $("gf_list").innerHTML=ppList(arr,{has:p=>gHas(p.nick,p),attr:"data-n"});
  try{avWatch($("gf_list"))}catch(e){}
}
function stepList(){
  const p=pr({price:gP.price});
  $("gf_t").innerHTML=gP.e+" "+esc(gname(gP))+" · "+IC("gem")+fmt(p);
  $("gf_body").innerHTML=`<div style="color:var(--mute);font-size:13px;margin-bottom:8px">${T("Кому подарить?","Who gets the gift?")}</div><input id="gf_q" style="width:100%;margin-bottom:10px" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${T("Поиск игрока","Search player")}"><div id="gf_list" class="sp-list" style="max-height:42vh;overflow:auto;display:flex;flex-direction:column;gap:6px"></div><button class="alt" id="gf_hist" style="width:100%;margin-top:10px">📜 ${T("История подарков","Gift history")}</button>`;
  $("gf_x").textContent=T("Отмена","Cancel");
  drawList("");
  const q=$("gf_q");q.oninput=()=>drawList(q.value);
  $("gf_list").onclick=e=>{const f=e.target.closest("[data-fav]");if(f){e.stopPropagation();ppToggleFav(f.dataset.fav);drawList($("gf_q")?$("gf_q").value:"");return}const b=e.target.closest("[data-n]");b&&stepConfirm(b.dataset.n)};
  $("gf_hist").onclick=()=>{close();window.gHistOpen&&window.gHistOpen()};
}
function stepConfirm(nick){
  if(gHas(nick)){toast(T("\u0423 \u0438\u0433\u0440\u043e\u043a\u0430 \u0443\u0436\u0435 \u0435\u0441\u0442\u044c \u044d\u0442\u043e\u0442 \u043f\u0430\u0441\u0441","The player already owns this pass"),"err");return}
  gTo=nick;const p=pr({price:gP.price});
  $("gf_t").textContent=T("Подтверди подарок","Confirm the gift");
  $("gf_body").innerHTML=`<div style="text-align:center;font-size:15px;line-height:1.7"><div style="font-size:40px">${gP.e}</div><b>${esc(gname(gP))}</b><br>${T("для","for")} <b style="display:inline-flex;align-items:center;gap:6px">${avW(nick,(TP.find(x=>x&&x.nick===nick)||{}).avatar)} ${esc(nick)}</b><br>${IC("gem")}<b>${fmt(p)}</b></div>${gMsgInput("gf_msg")}<div class="row" style="margin-top:10px"><button class="alt" id="gf_back">${T("Назад","Back")}</button><button id="gf_ok">🎁 ${T("Подарить","Gift")}</button></div>`;
  $("gf_back").onclick=stepList;$("gf_ok").onclick=send;try{avWatch($("gf_body"))}catch(e){}
}
async function send(){
  if(gBusy||!gP||!gTo)return;
  if(!TOKEN||!me||!ready){toast(tr("tlogin"),"err");return}
  const g=gP,to=gTo,p=pr({price:g.price}),msg=($("gf_msg")||{}).value||"";
  if((S.gem||0)<p){toast(T("Не хватает тикетов","Not enough tickets"),"err");return}
  gBusy=1;const ok=$("gf_ok");ok&&(ok.disabled=!0);
  let r={error:"?"};
  await serial(async()=>{
    await trFlush();
    r=await rpc("g2_gift_pass",{p_token:TOKEN,p_to:to,p_pass:g.k});
    if(r.error)return;
    const d=r.data||{};
    /* сервер вернул остаток тикетов и новую версию — ставим сразу, без двойного списания */
    if(d.gem!=null&&isFinite(+d.gem)){S.gem=Math.max(0,Math.floor(+d.gem));_pg=S.gem}
    else{S.gem=Math.max(0,(S.gem||0)-p)}
    if(d.v!=null)S._v=d.v;
    dirty=!0;render();pushSoon();
  });
  gBusy=0;ok&&(ok.disabled=!1);
  if(r.error){if(/\u0443\u0436\u0435 \u0435\u0441\u0442\u044c/.test(r.error)){(gOwn=gOwn||new Set).add(String(to).toLowerCase());stepList()}toast(/Could not find|schema cache/i.test(r.error)?T("Подарки ещё не включены на сервере","Gifts are not enabled on the server yet"):srv(r.error),"err");return}
  if(g.k==="vip"){window.VIPS=window.VIPS||{};window.VIPS[String(to).toLowerCase()]=1}
  close();toast(T("Подарено: ","Gifted: ")+gname(g)+" → "+to,"ok");gNote(to,"pass",msg);
  window.gpChanged&&window.gpChanged(1);
}
window.gpGift=function(k,again){
  if(!TOKEN||!me)return toast(tr("tlogin"),"err");
  const g=GP_LIST.find(x=>x.k===k);if(!g)return;
  gP=g;gTo="";stepList();gm().classList.add("show");if(again)stepConfirm(again);
  gOwn=null;try{rpc("g2_pass_owners",{p_token:TOKEN,p_pass:g.k}).then(r=>{if(r&&r.error&&/Could not find|schema cache/i.test(r.error)){console.warn("g2_pass_owners не найдена: выполни sql/14_pass_owners.sql");try{isOwner&&toast("SQL 14_pass_owners.sql не выполнен — блокировка подарка не работает","err")}catch(e){}return}if(gP!==g||!r||r.error||!Array.isArray(r.data))return;gOwn=new Set(r.data.map(n=>String(n).toLowerCase()));if(!gTo&&$("gf_list"))drawList($("gf_q")?$("gf_q").value:"")})}catch(e){}
  try{(typeof TP==="undefined"||!TP.length)&&loadPlayers().then(()=>{gP&&!gTo&&$("gf_list")&&drawList($("gf_q")?$("gf_q").value:"")})}catch(e){}
};
$("gf_x").onclick=close;gm().onclick=e=>{e.target===gm()&&close()};
addEventListener("keydown",e=>{e.key==="Escape"&&gm().classList.contains("show")&&close()});
/* единая точка «пассы поменялись»: сразу обновляем магазин, топ, списки и VIP-тег */
window.gpChanged=function(srvSync){
  try{if(me&&me.nick){window.VIPS=window.VIPS||{};const k=String(me.nick).toLowerCase();if(gpHas("vip"))window.VIPS[k]=1;else delete window.VIPS[k]}}catch(e){}
  try{const sp=$("shp");sp&&sp.style.display==="block"&&renderShop()}catch(e){}
  try{typeof TOPD!=="undefined"&&TOPD&&typeof drawTop==="function"&&drawTop()}catch(e){}
  try{typeof drawPl==="function"&&drawPl()}catch(e){}
  try{gP&&!gTo&&$("gf_list")&&drawList($("gf_q")?$("gf_q").value:"")}catch(e){}
  try{typeof drBtn==="function"&&drBtn()}catch(e){}
  try{typeof renderProf==="function"&&me&&renderProf()}catch(e){}
  if(srvSync)setTimeout(()=>{window.vipLoad&&window.vipLoad(1)},1500);
};
try{const _ad=adopt;adopt=function(){const r=_ad.apply(this,arguments);setTimeout(()=>{window.gpChanged&&window.gpChanged()},0);return r}}catch(e){}
/* входящие подарки (как g2_claim для монет) */
let gcOff=0,gcBusy=0;
async function gcClaim(){
  if(!TOKEN||!ready||gcBusy||document.hidden||Date.now()<gcOff)return;gcBusy=1;
  try{await serial(async()=>{
    const r=await rpc("g2_gift_claim",{p_token:TOKEN});
    if(r.error){/Could not find|schema cache/i.test(r.error)&&(gcOff=Date.now()+6e5);return}
    const list=(r.data&&Array.isArray(r.data.gifts)?r.data.gifts:[]);let ch=0;
    list.forEach(x=>{if(x&&x.pass==="bp"){try{window.bpGrantPremium&&window.bpGrantPremium()}catch(e){}ch=1;toast("🎁 "+T("Вам подарили: ","You received: ")+T("Премиум батлпасс","Premium battle pass")+(x.from?" ("+x.from+")":""),"ok");return}const g=GP_LIST.find(q=>q.k===(x&&x.pass));if(!g)return;(S.gp||(S.gp={}))[g.k]=1;ch=1;
      toast("🎁 "+T("Вам подарили: ","You received: ")+gname(g)+(x.from?" ("+x.from+")":""),"ok")});
    if(ch){if(r.data&&r.data.v!=null)S._v=r.data.v;dirty=!0;render();save();pushSoon();window.gpChanged&&window.gpChanged(1)}
  })}finally{gcBusy=0}
}
window.gcClaim=gcClaim;let _gt=0;setInterval(()=>{if(Date.now()<(window.__cool||0))return;if(window.__rtOn&&++_gt%4)return;gcClaim()},2500);setTimeout(gcClaim,1500);
document.addEventListener("visibilitychange",()=>{document.hidden||gcClaim()});
})();
}catch(e){try{console.error("[25_vip_gift.js #28]",e)}catch(_){}}

/* ── скрипт #29 (id=vip-list-js) ── */
try{
(function(){"use strict";
window.VIPS=window.VIPS||{};var off=0,at=0,busy=0;
window.vipLoad=async function(force){
  var hot=0;try{hot=document.getElementById("topp").style.display==="block"||document.getElementById("shp").style.display==="block"||document.getElementById("giftModal").classList.contains("show")}catch(e){}
  if(busy||Date.now()<off||(!force&&Date.now()-at<(hot?6000:25000)))return;
  if(Date.now()-at<1200)return;
  busy=1;
  try{
    var r=await rpc("g2_vip_list",{});
    if(r.error){if(/Could not find|schema cache/i.test(String(r.error)))off=Date.now()+6e5;return}
    var a=Array.isArray(r.data)?r.data:[],m={},sig="";
    a.forEach(function(n){if(n){m[String(n).toLowerCase()]=1}});
    sig=Object.keys(m).sort().join(",");
    var old=Object.keys(window.VIPS).sort().join(",");
    window.VIPS=m;at=Date.now();
    if(sig!==old){try{if(typeof TOPD!=="undefined"&&TOPD&&typeof drawTop==="function")drawTop()}catch(e){}try{typeof drawPl==="function"&&drawPl()}catch(e){}}
  }finally{busy=0}
};
setTimeout(function(){window.vipLoad(1)},1500);
setInterval(function(){document.hidden||window.vipLoad()},1000);
document.addEventListener("visibilitychange",function(){document.hidden||window.vipLoad()});
var tb=document.getElementById("topBtn");tb&&tb.addEventListener("click",function(){window.vipLoad(1)});
/* вспышка редкости: после окончания (или отмены при display:none) снимаем .go,
   иначе при закрытии меню анимация запускается снова */
var f=document.getElementById("flash");
if(f){["animationend","animationcancel"].forEach(function(ev){f.addEventListener(ev,function(){f.classList.remove("go")})})}
})();
}catch(e){try{console.error("[25_vip_gift.js #29]",e)}catch(_){}}
