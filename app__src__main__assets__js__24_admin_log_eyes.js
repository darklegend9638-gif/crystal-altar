/* 24_admin_log_eyes.js — журнал админа и «глазки» паролей
   (вынесено из index.html без изменений; порядок подключения — по номеру файла) */

/* ── скрипт #26 ── */
try{
(function(){
const AL={edit:["✏️","Правка игрока","Player edit"],self_edit:["🧰","Правка себя","Self edit"],clear:["🧹","Очистка профиля","Profile cleared"],reset_all:["💥","Сброс всем","Reset all"],ban:["🔨","Бан","Ban"],unban:["✅","Разбан","Unban"],make_admin:["🛡️","Выдан админ","Admin granted"],remove_admin:["🚫","Админ снят","Admin removed"],promo_create:["🎟️","Промокод создан","Promo created"],promo_delete:["🗑️","Промокод удалён","Promo deleted"],event_start:["⚡","Ивент запущен","Event started"],event_stop:["⏹️","Ивент остановлен","Event stopped"],event_auto:["🔁","Авто-ивенты","Auto events"]};
let lim=100,busyL=0;
let opened=!1;
async function logLoad(reset){
 const box=document.getElementById("log_list");if(!box||!TOKEN||!isOwner||busyL||!opened)return;
 if(reset===true)lim=100;busyL=1;const keep=box.scrollTop;
 const r=await rpc("g2_mod_log_list",{p_token:TOKEN,p_limit:lim});busyL=0;
 if(r.error){box.innerHTML='<div style="color:var(--c5)">'+esc(srv(String(r.error)))+'</div>';return}
 const a=r.data||[];
 const more=document.getElementById("log_more");if(more)more.style.display=a.length>=lim&&lim<300?"":"none";
 if(!a.length){box.innerHTML='<div style="color:var(--mute)">'+L2("Записей пока нет","No entries yet")+'</div>';return}
 box.innerHTML=a.map(x=>{
  const m=AL[x.action]||["•",x.action,x.action],d=new Date(x.at);
  const t=isNaN(d)?"":d.toLocaleString(LANG==="en"?"en-GB":"ru-RU",{day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"});
  const who=x.target&&x.target!=="*"&&x.target!==x.actor?esc(x.actor)+" → <b>"+esc(x.target)+"</b>":"<b>"+esc(x.actor)+"</b>"+(x.target&&x.target!==x.actor?" · "+esc(x.target):"");
  const dt=[x.detail,x.reason?L2("причина: ","reason: ")+x.reason:""].filter(Boolean).join(" · ");
  return '<div class="glass" style="padding:8px 10px;margin-bottom:6px"><div style="display:flex;justify-content:space-between;gap:8px"><span>'+m[0]+" <b>"+L2(m[1],m[2])+"</b></span><span style=\"color:var(--mute);font-size:12px;flex:none\">"+esc(t)+"</span></div><div style=\"color:var(--mute);margin-top:2px\">"+who+"</div>"+(dt?'<div style="margin-top:2px">'+esc(dt)+"</div>":"")+"</div>";
 }).join("");box.scrollTop=reset===!0?0:keep;
}
window.logLoad=logLoad;
const gid=i=>document.getElementById(i),lb=()=>gid("log_list"),
 go=(d)=>{const b=lb();if(!b)return;const h=b.clientHeight*.85;b.scrollTo({top:d==="t"?0:d==="e"?b.scrollHeight:b.scrollTop+(d==="u"?-h:h),behavior:"smooth"})};
gid("log_tgl").onclick=()=>{opened=!opened;const t=gid("log_tgl");gid("log_body").style.display=opened?"block":"none";t.classList.toggle("open",opened);t.setAttribute("aria-expanded",opened?"true":"false");if(opened){logLoad(!0);try{t.scrollIntoView({block:"start",behavior:"smooth"})}catch(e){}}};
gid("log_top").onclick=()=>go("t");gid("log_up").onclick=()=>go("u");gid("log_dn").onclick=()=>go("d");gid("log_end").onclick=()=>go("e");
gid("log_ref").onclick=()=>logLoad(!0);
gid("log_more").onclick=()=>{lim=Math.min(300,lim+100);logLoad()};
try{Object.assign(TX,{"Журнал действий":"Action log","Кто, когда и что выдал, забрал или изменил":"Who gave, took or changed what, and when","Показать ещё":"Show more"})}catch(e){}
const ab=document.getElementById("adm");if(ab)ab.addEventListener("click",()=>setTimeout(()=>logLoad(!0),60));
})();
}catch(e){try{console.error("[24_admin_log_eyes.js #26]",e)}catch(_){}}

/* ── скрипт #27 ── */
try{
(function(){
const EYE='<svg viewBox="0 0 24 24"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
OFF='<svg viewBox="0 0 24 24"><path d="M3 3l18 18"/><path d="M10.6 5.1A10.7 10.7 0 0 1 12 5c6.4 0 10 7 10 7a17.6 17.6 0 0 1-3.2 4.2"/><path d="M6.6 6.6A17.4 17.4 0 0 0 2 12s3.6 7 10 7a10.5 10.5 0 0 0 4.4-1"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/></svg>',
all=[];
function eye(inp){
 if(inp.dataset.eye)return;inp.dataset.eye="1";
 const w=document.createElement("div"),st=inp.style;
 w.className="pwf";
 w.style.flex=st.flex||"1 1 auto";w.style.marginTop=st.marginTop||"";
 if(st.width==="100%")w.style.width="100%";
 inp.parentNode.insertBefore(w,inp);w.appendChild(inp);st.flex="";st.marginTop="";
 /* span вместо button: глобальные стили кнопок (.row button, #reg button…) на него не действуют */
 const b=document.createElement("span");b.className="pweye";b.setAttribute("role","button");b.tabIndex=0;
 const paint=()=>{const show=inp.type==="text";b.innerHTML=show?OFF:EYE;b.classList.toggle("on",show);b.setAttribute("aria-pressed",show?"true":"false");b.setAttribute("aria-label",show?(LANG==="en"?"Hide password":"Скрыть пароль"):(LANG==="en"?"Show password":"Показать пароль"))};
 const flip=()=>{const a=inp.selectionStart,z=inp.selectionEnd,f=document.activeElement===inp;inp.type=inp.type==="password"?"text":"password";paint();if(f){try{inp.focus({preventScroll:true});if(a!=null)inp.setSelectionRange(a,z)}catch(e){}}};
 b.addEventListener("pointerdown",e=>e.preventDefault());
 b.addEventListener("mousedown",e=>e.preventDefault());
 b.addEventListener("click",e=>{e.preventDefault();flip()});
 b.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();flip()}});
 inp.hidePw=()=>{if(inp.type!=="password"){inp.type="password";paint()}};
 paint();w.appendChild(b);all.push(inp);
}
document.querySelectorAll('input[type="password"]').forEach(eye);
/* пароль не остаётся открытым после отправки, закрытия окна, смены режима и ухода из приложения */
const hideAll=()=>all.forEach(i=>i.hidePw&&i.hidePw());
document.addEventListener("click",e=>{if(e.target.closest&&e.target.closest(".pclose,#reg_ok,#s_pb,#t_reg,#t_in"))setTimeout(hideAll,0)},true);
document.addEventListener("visibilitychange",()=>{document.hidden&&hideAll()});
})();
}catch(e){try{console.error("[24_admin_log_eyes.js #27]",e)}catch(_){}}
