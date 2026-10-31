/* 12_gifts_friends.js — подарки и друзья
   (вынесено из index.html без изменений; порядок подключения — по номеру файла) */

/* ── скрипт #8 (id=gift-extras-js) ── */
try{
(function(){"use strict";
const L=(a,b)=>L2(a,b);
/* избранные игроки (хранятся на устройстве, отдельно для каждого аккаунта) */
let _fav=null,_favK="";
const favKey=()=>(typeof GPX!=="undefined"?GPX:"g2-")+"fav-"+(me&&me.nick?String(me.nick).toLowerCase():"");
function favSet(){const k=favKey();if(_fav&&_favK===k)return _fav;_favK=k;try{_fav=new Set(JSON.parse(localStorage.getItem(k)||"[]"))}catch(e){_fav=new Set}return _fav}
window.ppIsFav=n=>favSet().has(String(n).toLowerCase())||!!(window.FR&&FR.set&&FR.set.has(String(n).toLowerCase()));
window.ppFavSig=()=>[...favSet()].sort().join(",")+"#"+(window.FR?FR.sig:"");
window.ppToggleFav=n=>{const s=favSet(),k=String(n).toLowerCase();s.has(k)?s.delete(k):s.add(k);try{localStorage.setItem(favKey(),JSON.stringify([...s]))}catch(e){}};
/* единый список игроков для магазина и батлпасса: избранные сверху, «✓ Уже есть», ★ в строке */
window.ppList=(players,o)=>{o=o||{};const sel=o.sel||"",has=o.has||(()=>false),attr=o.attr||"data-n";
const arr=players.slice().sort((a,b)=>(+ppIsFav(b.nick))-(+ppIsFav(a.nick)));
if(!arr.length)return `<div style="color:var(--mute);font-size:13px;padding:6px">${L("Никого не найдено","Nobody found")}</div>`;
return arr.map(p=>{if(has(p))return `<button class="alt ppi has" disabled>${avW(p.nick,p.avatar)} <b>${esc(p.nick)}</b>${vipTag(p)}<span class="ppown">✓ ${L("Уже есть","Owned")}</span></button>`;
const f=ppIsFav(p.nick);return `<button class="alt ppi${p.nick===sel?" sel":""}" ${attr}="${esc(p.nick)}">${avW(p.nick,p.avatar)} <b>${esc(p.nick)}</b>${vipTag(p)}${window.FR&&FR.set&&FR.set.has(String(p.nick).toLowerCase())?`<span class="ppfr" title="${L("Друг","Friend")}">👥</span>`:`<span class="ppfav${f?" on":""}" data-fav="${esc(p.nick)}" role="button" aria-label="${L("В избранное","Favorite")}">${f?"★":"☆"}</span>`}</button>`}).join("")};
/* сообщение к подарку (до 60 символов) */
window.gNote=async(to,kind,msg)=>{msg=String(msg||"").trim().slice(0,60);if(!msg||!TOKEN)return;try{await rpc("g2_gift_note",{p_token:TOKEN,p_to:to,p_kind:kind,p_msg:msg})}catch(e){}};
window.gMsgInput=id=>`<input id="${id}" class="gmsg" maxlength="60" autocomplete="off" placeholder="${L("Сообщение к подарку (необязательно)","Gift message (optional)")}">`;
/* история подарков */
document.body.insertAdjacentHTML("beforeend",'<div id="gHist" class="confirm-modal"><div class="modal-box" style="text-align:left;max-width:400px"><div class="modal-title" id="gh_t" style="text-align:center"></div><div id="gh_body" style="max-height:60vh;overflow:auto"></div><div class="modal-actions" style="margin-top:12px"><button class="alt" id="gh_x"></button></div></div></div>');
const hm=()=>document.getElementById("gHist"),hb=()=>document.getElementById("gh_body");
const ST={pending:["Ожидает","Pending"],done:["Получен","Received"],declined:["Отклонён","Declined"],cancelled:["Отменён","Cancelled"],expired:["Истёк","Expired"]};
const gName=r=>{if(r.kind==="bp"||r.pass==="bp")return "⭐ "+L("Премиум батлпасса","Premium battle pass");const g=(typeof GP_LIST!=="undefined"?GP_LIST:[]).find(x=>x.k===r.pass);return g?g.e+" "+L(g.ru[0],g.en[0]):String(r.pass||"")};
function hDraw(list){const b=hb();if(!list.length){b.innerHTML=`<div style="color:var(--mute);padding:10px;text-align:center">${L("Подарков пока нет","No gifts yet")}</div>`;return}
b.innerHTML=list.map((r,i)=>{const st=ST[r.status]||[r.status,r.status],d=new Date((+r.ts||0)*1e3).toLocaleDateString(LANG==="en"?"en":"ru",{day:"2-digit",month:"short"});
return `<div class="hrow"><span style="font-size:22px">${r.dir==="out"?"📤":"📥"}</span><div class="hm"><b>${esc(gName(r))}</b><br>${r.dir==="out"?L("Кому: ","To: "):L("От: ","From: ")}<b>${esc(r.nick||"?")}</b><div class="hs">${d} · ${L(st[0],st[1])}</div>${r.msg?`<i>«${esc(r.msg)}»</i>`:""}</div>${r.dir==="out"&&r.nick?`<button class="alt" data-again="${i}" title="${L("Подарить ещё раз","Gift again")}">↻</button>`:""}</div>`}).join("");
b.onclick=e=>{const a=e.target.closest("[data-again]");if(!a)return;const r=list[+a.dataset.again];if(!r)return;hm().classList.remove("show");
if(r.kind==="bp"){window.bpGiftTo&&window.bpGiftTo(r.nick)}else{window.gpGift&&window.gpGift(r.pass,r.nick)}}}
window.gHistOpen=async()=>{if(!TOKEN||!me)return toast(L("Войдите в аккаунт","Sign in first"),"err");
document.getElementById("gh_t").textContent="📜 "+L("История подарков","Gift history");document.getElementById("gh_x").textContent=L("Закрыть","Close");
hb().innerHTML=`<div style="color:var(--mute);padding:10px;text-align:center">…</div>`;hm().classList.add("show");
const r=await rpc("g2_gift_history",{p_token:TOKEN});
if(r.error){hb().innerHTML=`<div style="color:var(--mute);padding:10px;text-align:center">${/Could not find|schema cache/i.test(r.error)?L("История ещё не включена на сервере","History is not enabled on the server yet"):esc(srv(r.error))}</div>`;return}
hDraw(Array.isArray(r.data)?r.data:[])};
document.getElementById("gh_x").onclick=()=>hm().classList.remove("show");
hm().onclick=e=>{e.target===hm()&&hm().classList.remove("show")};
})();
}catch(e){try{console.error("[12_gifts_friends.js #8]",e)}catch(_){}}

/* ── скрипт #9 (id=friends-js) ── */
try{
(function(){"use strict";
const L=(a,b)=>L2(a,b),key=n=>String(n||"").toLowerCase();
const FR=window.FR={friends:[],incoming:[],outgoing:[],set:new Set(),sig:"",at:0,off:false,busy:false};
function setData(d){FR.friends=d.friends||[];FR.incoming=d.incoming||[];FR.outgoing=d.outgoing||[];FR.set=new Set(FR.friends.map(x=>key(x.nick)));const sg=FR.friends.map(x=>x.nick).join(",")+"|"+FR.incoming.map(x=>x.nick).join(",")+"|"+FR.outgoing.map(x=>x.nick).join(",");const ch=sg!==FR.sig;FR.sig=sg;return ch}
function badge(){const b=document.getElementById("frb");if(!b)return;const n=FR.incoming.length,h='<svg class="ico"><use href="#i-user"/></svg>'+L("Друзья","Friends")+(n?" ("+n+")":"");if(b.__h!==h){b.__h=h;b.innerHTML=h}}
async function frLoad(force){if(!TOKEN||!me||FR.off||FR.busy)return false;if(!force&&Date.now()-FR.at<2e4)return false;FR.busy=true;FR.at=Date.now();
try{const r=await rpc("g2_friend_list",{p_token:TOKEN});if(r.error){if(/Could not find|schema cache/i.test(r.error)){FR.off=true;draw()}return false}const ch=setData(r.data||{});badge();if(ch||force)draw();return ch}catch(e){return false}finally{FR.busy=false}}
window.frLoad=frLoad;
const open=()=>{const p=document.getElementById("frp");return p&&p.style.display==="block"};
let armed="",armT=0,built=false;
function skeleton(){document.getElementById("fr_hd").textContent=L("Друзья","Friends");
document.getElementById("fr_body").innerHTML=`<div style="color:var(--mute);font-size:13px;margin-top:4px">${L("Друзья показываются в списках подарков и переводов выше остальных.","Friends are shown first in gift and transfer lists.")}</div><div id="fr_off"></div><div id="fr_in"></div><h2 id="fr_h1"></h2><div id="fr_fl"></div><div id="fr_out"></div><h2 id="fr_h2"></h2><input id="fr_q" maxlength="16" autocomplete="off" placeholder="${L("Поиск игрока","Search player")}"><div id="fr_cand" style="display:flex;flex-direction:column;gap:6px;max-height:36vh;overflow:auto;margin-top:8px"></div>`;
document.getElementById("fr_q").oninput=drawCand;built=true}
const av=x=>`<div class="ic">${avW(x.nick,x.avatar)}</div>`;
function draw(){if(!open()||!built)return;const off=document.getElementById("fr_off");
if(FR.off){off.innerHTML=`<div class="trn">${L("Друзья ещё не включены на сервере (нужен 18_social.sql)","Friends are not enabled on the server yet (18_social.sql needed)")}</div>`;return}off.innerHTML="";
document.getElementById("fr_in").innerHTML=FR.incoming.length?`<h2>${L("Заявки в друзья","Friend requests")} · ${FR.incoming.length}</h2>`+FR.incoming.map(x=>`<div class="glass ti fr">${av(x)}<div class="tx"><b>${esc(x.nick)}</b></div><button data-fra="ok|${esc(x.nick)}">${L("Принять","Accept")}</button><button class="alt" data-fra="no|${esc(x.nick)}">✕</button></div>`).join(""):"";
document.getElementById("fr_h1").textContent=L("Мои друзья","My friends")+" · "+FR.friends.length;
document.getElementById("fr_fl").innerHTML=FR.friends.length?FR.friends.map(x=>`<div class="glass ti fr">${av(x)}<div class="tx"><b>${esc(x.nick)}</b></div><button class="alt" data-fra="prof|${esc(x.nick)}" aria-label="${L("Профиль","Profile")}">👤</button><button class="alt${armed===key(x.nick)?" arm":""}" data-fra="rm|${esc(x.nick)}">${armed===key(x.nick)?L("Точно?","Sure?"):"✕"}</button></div>`).join(""):`<div class="trn">${L("Пока никого. Найди игрока ниже или открой его профиль.","Nobody yet. Find a player below or open their profile.")}</div>`;
document.getElementById("fr_out").innerHTML=FR.outgoing.length?`<h2>${L("Отправленные заявки","Sent requests")}</h2>`+FR.outgoing.map(x=>`<div class="glass ti fr">${av(x)}<div class="tx"><b>${esc(x.nick)}</b><span>⏳ ${L("ждёт ответа","waiting")}</span></div><button class="alt" data-fra="rm|${esc(x.nick)}">${L("Отмена","Cancel")}</button></div>`).join(""):"";
document.getElementById("fr_h2").textContent=L("Добавить в друзья","Add friends");
try{avWatch(document.getElementById("fr_body"))}catch(e){}drawCand()}
function drawCand(){if(!open()||!built||FR.off)return;const q=(document.getElementById("fr_q").value||"").trim().toLowerCase(),me0=me&&me.nick?key(me.nick):"",out=new Set(FR.outgoing.map(x=>key(x.nick))),inc=new Set(FR.incoming.map(x=>key(x.nick)));
const arr=(typeof TP!=="undefined"&&Array.isArray(TP)?TP:[]).filter(p=>p&&p.nick&&key(p.nick)!==me0&&!FR.set.has(key(p.nick))&&!out.has(key(p.nick))&&(!q||key(p.nick).includes(q))).slice(0,40);
document.getElementById("fr_cand").innerHTML=arr.length?arr.map(p=>`<div class="glass ti fr">${av(p)}<div class="tx"><b>${esc(p.nick)}</b></div>${inc.has(key(p.nick))?`<button data-fra="ok|${esc(p.nick)}">${L("Принять","Accept")}</button>`:`<button data-fra="add|${esc(p.nick)}">➕ ${L("Добавить","Add")}</button>`}</div>`).join(""):`<div class="trn">${L("Никого не найдено","Nobody found")}</div>`;
try{avWatch(document.getElementById("fr_cand"))}catch(e){}}
async function act(kind,nick){if(!TOKEN||!me)return;let r;
if(kind==="add")r=await rpc("g2_friend_add",{p_token:TOKEN,p_nick:nick});
else if(kind==="ok")r=await rpc("g2_friend_respond",{p_token:TOKEN,p_nick:nick,p_accept:true});
else if(kind==="no")r=await rpc("g2_friend_respond",{p_token:TOKEN,p_nick:nick,p_accept:false});
else r=await rpc("g2_friend_remove",{p_token:TOKEN,p_nick:nick});
if(r.error){toast(/Could not find|schema cache/i.test(r.error)?L("Друзья ещё не включены на сервере (18_social.sql)","Friends are not enabled on the server yet (18_social.sql)"):srv(r.error),"err");return false}
if(kind==="add")toast(r.data&&r.data.status==="accepted"?L("Теперь вы друзья: ","You are now friends: ")+nick:L("Заявка отправлена: ","Request sent: ")+nick,"ok");
else if(kind==="ok")toast(L("Теперь вы друзья: ","You are now friends: ")+nick,"ok");
await frLoad(true);return true}
document.getElementById("frp").addEventListener("click",async e=>{const b=e.target.closest("[data-fra]");if(!b||b.disabled)return;const [k,n]=b.dataset.fra.split("|");
if(k==="prof"){try{closePanel();window.openPlayerProfile&&(document.getElementById("profb").click(),setTimeout(()=>window.openPlayerProfile(n),50))}catch(x){}return}
if(k==="rm"&&FR.friends.some(x=>key(x.nick)===key(n))){if(armed!==key(n)){armed=key(n);clearTimeout(armT);armT=setTimeout(()=>{armed="";draw()},3000);draw();return}armed="";clearTimeout(armT)}
b.disabled=true;await act(k,n);draw()});
(document.getElementById("frb")||{}).onclick=()=>{if(!TOKEN||!me)return toast(L("Сначала войди в аккаунт","Log in first"),"err");skeleton();openPanel("frp");draw();frLoad(true);try{loadPlayers().then(drawCand)}catch(e){}};
/* кнопка «в друзья» в профиле игрока */
window.frProfileBtn=nick=>{const k=key(nick);let t,c="alt",dis="";
if(FR.set.has(k)){return '<div class="frbadge">🤝 '+L("Твой друг","Your friend")+'</div><button class="alt" data-frp-rm="'+esc(nick)+'" style="margin-top:8px;border-color:var(--c5)!important;color:var(--c5)!important">🗑 '+L("Удалить из друзей","Remove friend")+'</button>'}
else if(FR.outgoing.some(x=>key(x.nick)===k)){t="⏳ "+L("Заявка отправлена","Request sent");dis="disabled"}
else if(FR.incoming.some(x=>key(x.nick)===k)){t="✔ "+L("Принять заявку","Accept request");c=""}
else t="➕ "+L("В друзья","Add friend");
return `<button class="${c}" data-frp="${esc(nick)}" style="margin-top:8px" ${dis}>${t}</button>`};
window.frIsFriend=nick=>FR.set.has(key(nick));window.frLoadPub=()=>frLoad(false);
const FRBIND=(root,nick,redraw)=>{const rb=root.querySelector("[data-frp-rm]");if(!rb)return;let armed=0;rb.onclick=async()=>{if(!armed){armed=1;rb.textContent="⚠️ "+L("Нажми ещё раз","Tap again");setTimeout(()=>{if(rb.isConnected&&!rb.disabled){armed=0;rb.textContent="🗑 "+L("Удалить из друзей","Remove friend")}},3000);return}rb.disabled=true;const ok=await act("rm",nick);if(ok)toast(L("Удалён из друзей: ","Removed from friends: ")+nick,"ok");redraw()}};
window.frProfileBind=(root,nick,redraw)=>{FRBIND(root,nick,redraw);const b=root.querySelector("[data-frp]");if(b)b.onclick=async()=>{b.disabled=true;const inc=FR.incoming.some(x=>key(x.nick)===key(nick));await act(inc?"ok":"add",nick);redraw()};
frLoad(false).then(ch=>{if(ch)redraw()})};
badge();setTimeout(()=>frLoad(false),3000);setInterval(()=>{document.hidden||frLoad(false)},3e4);
})();
}catch(e){try{console.error("[12_gifts_friends.js #9]",e)}catch(_){}}
