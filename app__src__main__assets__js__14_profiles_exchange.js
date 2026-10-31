/* 14_profiles_exchange.js — просмотр игроков
   (вынесено из index.html без изменений; порядок подключения — по номеру файла) */

/* ── скрипт #11 ── */
try{
(function(){
const box=document.createElement("div");box.id="vp";box.innerHTML='<div class="vb" id="vpb"></div>';document.body.appendChild(box);
const vb=box.querySelector("#vpb");let seq=0,LST=[],lstAt=0,q="";
const close=()=>{box.classList.remove("open");seq++};
box.addEventListener("click",e=>{if(e.target===box||e.target.closest("[data-vc]"))close()});
addEventListener("keydown",e=>{if(e.key==="Escape"&&box.classList.contains("open"))close()});
const nf=v=>fmt(Math.floor(+v||0));
async function loadList(){
  if(Date.now()-lstAt<3e4&&LST.length)return;
  const r=await rpc("g2_top",{p_token:TOKEN,p_limit:500});
  if(r.error||!r.data)return;
  LST=(r.data.top||[]).map(x=>Object.assign({},x)).sort((a,b)=>(+b.coins||0)-(+a.coins||0));
  lstAt=Date.now();
}
function drawList(){
  const f=q.trim().toLowerCase();
  const arr=LST.map((x,i)=>Object.assign({_r:i+1},x)).filter(x=>!f||String(x.nick).toLowerCase().includes(f)).slice(0,60);
  const l=vb.querySelector("#vl");if(!l)return;
  l.innerHTML=arr.length?arr.map(x=>'<button class="alt vi'+(x._r<=3?' r'+x._r:'')+'" data-pn="'+esc(x.nick)+'"><em class="rk" style="font-style:normal">'+(x._r<=3?['🥇','🥈','🥉'][x._r-1]:'#'+x._r)+'</em>'+avW(x.nick,x.avatar)+'<b>'+esc(x.nick)+(window.frIsFriend&&window.frIsFriend(x.nick)?' 🤝':'')+'</b><span>'+IC("coin")+nf(x.coins)+'</span></button>').join(""):'<div style="color:var(--mute);padding:8px">'+L2("Никого не найдено","Nobody found")+'</div>';
  avWatch(l);
}
function showList(){
  seq++;
  vb.innerHTML='<button class="alt vx" data-vc="1" aria-label="Close"><svg viewBox="0 0 24 24"><path d="M7 7l10 10M17 7L7 17"/></svg></button><h3>'+L2("Профили игроков","Player profiles")+'</h3><div class="vr" style="margin-bottom:12px">'+L2("Найди игрока по нику","Find a player by nickname")+'</div>'+
   '<input class="vsr" id="vq" type="text" maxlength="24" autocomplete="off" placeholder="'+L2("Ник игрока…","Nickname…")+'" value="'+esc(q)+'"><div class="vl" id="vl"></div>'+
   '<button class="alt" data-vc="1">'+L2("Закрыть","Close")+'</button>';
  vb.querySelector("#vq").oninput=e=>{q=e.target.value;drawList()};
  vb.querySelector("#vl").onclick=e=>{const t=e.target.closest("[data-pn]");t&&showProfile(t.dataset.pn)};
  drawList();
}
function stats(d){
  const lv=(v,m)=>v==null||isNaN(+v)?null:(m?nf(v)+" / "+nf(m):nf(v));
  const best=d.best==null||isNaN(+d.best)?null:((typeof R!=="undefined"&&R[+d.best]&&R[+d.best].n)||String(d.best));
  const pets=Array.isArray(d.pt)?d.pt.length:(d.pt==null||isNaN(+d.pt)?null:+d.pt);
  return [
   ["🏆 "+L2("Место (монеты)","Rank (coins)"),d._r?"#"+d._r:null],
   ["🔄 "+L2("Перерождения","Rebirths"),d.rb==null||isNaN(+d.rb)?null:String(+d.rb)],
   ["🪙 "+L2("Монеты","Coins"),d.coins==null?null:nf(d.coins)],
   ["💎 "+L2("Тикеты","Tickets"),(d.gem??d.gems)==null?null:nf(d.gem??d.gems)],
   ["🎲 "+L2("Роллы","Rolls"),d.rolls==null?null:nf(d.rolls)],
   ["🍀 "+L2("Уровень удачи","Luck level"),lv(d.luck,0)],
   ["💰 "+L2("Уровень дохода","Income level"),lv(d.inc,typeof MAXINC!=="undefined"?MAXINC:0)],
   ["⭐ "+L2("Лучшая редкость","Best rarity"),best],
   ["🐾 "+L2("Питомцы","Pets"),pets==null?null:String(pets)],
   ["📚 "+L2("Предметов найдено","Items found"),d.found&&typeof d.found==="object"?nf(Object.keys(d.found).length):null],
   ["🛡️ "+L2("Клан","Clan"),d.clan?String(d.clan.name||d.clan):null]
  ];
}
function drawProfile(d,loading){
  const st=stats(d),miss=st.some(x=>x[1]==null&&/Раз|Брос|Rolls|удач|Luck|доход|Income|редк|rarity|Пит|Pets/.test(x[0]));
  vb.innerHTML='<button class="alt vx" data-vc="1" aria-label="Close"><svg viewBox="0 0 24 24"><path d="M7 7l10 10M17 7L7 17"/></svg></button><div class="vav" id="vav">'+avH(avN(d.nick,d.avatar))+'</div><h3>'+esc(d.nick)+'</h3>'+
   '<div class="vr">'+(me&&d.nick===me.nick?L2("Это ты","This is you"):L2("Профиль игрока","Player profile"))+'</div>'+(me&&d.nick!==me.nick&&window.frProfileBtn?window.frProfileBtn(d.nick):'')+
   '<div class="vg">'+st.filter(x=>x[1]!=null||/Брос|Rolls|удач|Luck|доход|Income/.test(x[0])).map(x=>'<div class="vs"><small>'+EI(x[0])+'</small>'+(x[1]==null?'<b class="na">—</b>':'<b>'+esc(x[1])+'</b>')+'</div>').join("")+'</div>'+
   (loading?'<div class="vn">…</div>':(miss?'<div class="vn">'+L2("Сервер пока не отдаёт эти данные других игроков","The server does not share these stats of other players yet")+'</div>':''))+
   '<button class="alt" data-back="1" style="margin-top:8px">'+L2("← К списку","← Back")+'</button><button class="alt" data-vc="1" style="margin-top:8px">'+L2("Закрыть","Close")+'</button>';
  vb.querySelector("[data-back]").onclick=showList;
  try{window.frProfileBind&&window.frProfileBind(vb,d.nick,()=>drawProfile(d,false))}catch(e){}
  try{if(typeof fApply==="function"&&d.fe)fApply(vb.querySelector("#vav"),d.fe)}catch(e){}
}
async function showProfile(nick){
  let d=Object.assign({},LST.find(x=>x.nick===nick)||{});d.nick=nick;
  const ix=LST.findIndex(x=>x.nick===nick);if(ix>=0)d._r=ix+1;
  if(me&&nick===me.nick)Object.assign(d,{avatar:me.avatar,coins:S.coins,gem:S.gem||0,rolls:S.rolls,best:S.best,luck:S.luck,inc:S.inc,rb:S.rb,pt:S.pt,found:S.found,fe:typeof curFrame==="function"?curFrame():""});
  drawProfile(d,true);
  const my=++seq;
  try{
    const r=await rpc("g2_profile",{p_token:TOKEN,p_nick:nick});
    if(my!==seq)return;
    if(r&&!r.error&&r.data){const x=Array.isArray(r.data)?r.data[0]:r.data;if(x&&typeof x==="object")d=Object.assign(d,x,{nick:nick})}
  }catch(e){}
  if(my===seq)drawProfile(d,false);
}
async function openProfiles(){
  if(!TOKEN||!me)return toast(L2("Сначала войди в аккаунт","Log in first"),"err");
  q="";showList();box.classList.add("open");
  await loadList();try{await window.frLoadPub()}catch(e){}if(box.classList.contains("open")&&vb.querySelector("#vl"))drawList();
}
const pb=document.getElementById("profb");if(pb)pb.addEventListener("click",openProfiles);
window.openPlayerProfile=showProfile;
})();
}catch(e){try{console.error("[14_profiles_exchange.js #11]",e)}catch(_){}}

/* ── скрипт #13 ── */
try{
document.addEventListener("input",function(e){if(e.target&&e.target.id==="cl_amt")window.__clAmt=e.target.value});
}catch(e){try{console.error("[14_profiles_exchange.js #13]",e)}catch(_){}}
