/* 15_sfx.js — ЗВУКОВЫЕ ЭФФЕКТЫ (WebAudio)
   (вынесено из index.html без изменений; порядок подключения — по номеру файла) */

/* ── скрипт #14 ── */
try{
(function(){
const KEY="gacha-sfx";let pref="1";try{pref=localStorage.getItem(KEY)||"1"}catch(e){}
let ctx=null,out=null,last=0;
function ac(){if(!ctx){const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return null;ctx=new AC();out=ctx.createGain();out.gain.value=.55;const c=ctx.createDynamicsCompressor();out.connect(c);c.connect(ctx.destination)}
if(ctx.state==="suspended"){try{ctx.resume().catch(function(){})}catch(e){}}return ctx}
function tone(type,f1,f2,t,d,v){const o=ctx.createOscillator(),g=ctx.createGain();o.type=type;o.frequency.setValueAtTime(f1,t);if(f2!==f1)o.frequency.exponentialRampToValueAtTime(f2,t+d);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.008);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(out);o.start(t);o.stop(t+d+.03)}
function pop(r){const t=ctx.currentTime;tone("sine",420*r,780*r,t,.12,.55);tone("triangle",900*r,1250*r,t,.07,.2)}
function shut(){const t=ctx.currentTime;tone("sine",640,300,t,.14,.5)}
function nope(){window.__sfxErrNow()}
function roll(){const t=ctx.currentTime;tone("sine",200,900,t,.28,.35);[523,659,784,1047,1319].forEach(function(f,i){tone("triangle",f,f,t+.04+i*.055,.22,.28);tone("sine",f*2,f*2,t+.04+i*.055,.14,.08)})}
function reveal(lv){const t=ctx.currentTime;const n=lv>1?[523,659,784,1047,1319,1568,2093]:[659,880,1175];n.forEach(function(f,i){tone("triangle",f,f,t+i*.07,.38,.3);tone("sine",f*2,f*2,t+i*.07,.2,.1)});if(lv>1){tone("sawtooth",130,260,t,.5,.1)}}
function err(){const t=ctx.currentTime;tone("sawtooth",240,120,t,.16,.2);tone("sawtooth",180,70,t+.13,.24,.2)}
var lastE=0;window.__sfxErr=function(){try{var n=Date.now();if(n-lastE<250)return;lastE=n;if(on()&&ac())err()}catch(e){}};window.__sfxErrNow=function(){try{var n=Date.now();if(n-lastE<250)return;lastE=n;err()}catch(e){}};window.__sfxPop=function(){try{if(on()&&ac())pop(1.08)}catch(e){}};
function on(){return pref!=="0"}
document.addEventListener("pointerdown",function(e){if(!on())return;const b=e.target&&e.target.closest?e.target.closest("button,.avb,.ti.pl,.it"):null;if(!b)return;const n=Date.now();if(n-last<45)return;last=n;if(!ac())return;
if(b.disabled||b.getAttribute("aria-disabled")==="true"||b.classList.contains("no")||b.classList.contains("dis")||b.classList.contains("disabled")||b.classList.contains("locked"))nope();else if(b.id==="r1"||b.id==="r10"||b.classList.contains("rbtn"))roll();else if(b.classList.contains("pclose"))shut();else pop(b.classList.contains("alt")?.92:1.06+Math.random()*.1)},!0);
try{const nm=document.getElementById("nm");if(nm)new MutationObserver(function(){setTimeout(function(){if(!on()||!ctx)return;const o=document.querySelector(".orb.reveal");if(!o)return;const rr=document.getElementById("rr");const hi=rr&&/rr-(cel|tra)/.test(rr.className);const n=Date.now();if(n-last<150)return;last=n;reveal(hi?2:1)},80)}).observe(nm,{childList:!0,characterData:!0,subtree:!0})}catch(e){}
const IC='<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">';
function lab(){const b=document.getElementById("sfxb");if(!b)return;b.innerHTML=IC+(on()?'<path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16.5 8.5a5 5 0 010 7"/>':'<path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M17 9l4 6M21 9l-4 6"/>')+'</svg>'+L2("Звуки: ","Sounds: ")+(on()?L2("вкл","on"):L2("выкл","off"))}
document.getElementById("sfxb").onclick=function(){pref=on()?"0":"1";try{localStorage.setItem(KEY,pref)}catch(e){}lab();if(on()&&ac())pop(1)};
lab();
/* ---------- политика конфиденциальности ---------- */
const PV={
ru:{t:"Политика конфиденциальности",b:"Политика конфиденциальности",upd:"Обновлено: 11 октября 2026",s:[
["Какие данные мы храним",["ник и аватарку","пароль — только для входа в аккаунт","игровой прогресс: монеты, тикеты, коллекцию, квесты, батлпасс, переводы и клан","настройки языка, музыки и звуков — они остаются на твоём устройстве"]],
["Зачем это нужно",["чтобы работали аккаунт и сохранение прогресса","чтобы работали топ игроков, профили, переводы и кланы","чтобы защищать игру от читов и накруток"]],
["Что видят другие игроки",["ник, аватарку, титулы и игровую статистику","пароль никому не показывается — ни игрокам, ни админам"]],
["Чего мы не делаем",["не продаём и не передаём твои данные","не показываем рекламу и не ставим сторонние трекеры","не просим настоящее имя, телефон, почту или адрес — и тебе не стоит вписывать их в ник"]],
["Где хранятся данные","Прогресс хранится на сервере игры, а язык и звук — в памяти браузера или приложения. Шрифты загружаются с Google Fonts, поэтому твой браузер обращается к их серверам."],
["Дети","Игра подходит для всех возрастов. Если тебе меньше 13 лет, играй с разрешения родителей и не делись личной информацией в нике и чате."],
["Удаление данных","В «Настройки профиля» нажми «Удалить аккаунт» — аккаунт и весь прогресс будут удалены. Владелец игры может провести общий вайп прогресса при перезапуске сезона."],
["Изменения и вопросы","Мы можем обновлять эту политику — актуальная версия всегда здесь. Есть вопросы — напиши владельцу игры (owner) в игре."]]},
en:{t:"Privacy Policy",b:"Privacy Policy",upd:"Updated: October 11, 2026",s:[
["What we store",["your nickname and avatar","your password — only used to sign in","game progress: coins, tickets, collection, quests, battle pass, transfers and clan","language, music and sound settings — these stay on your device"]],
["Why we need it",["so your account and saved progress work","so leaderboards, profiles, transfers and clans work","to protect the game from cheating and abuse"]],
["What other players see",["your nickname, avatar, titles and game stats","your password is never shown to anyone — not players, not admins"]],
["What we don't do",["we don't sell or share your data","no ads and no third-party trackers","we never ask for your real name, phone, email or address — don't put them in your nickname either"]],
["Where data lives","Progress is stored on the game server; language and sound settings are kept in your browser or app. Fonts load from Google Fonts, so your browser contacts their servers."],
["Kids","The game is for all ages. If you are under 13, play with a parent's permission and don't share personal info in your nickname or chat."],
["Deleting your data","Open Profile settings and tap Delete account — your account and all progress will be removed. The game owner may run a global progress wipe when a season restarts."],
["Changes and questions","We may update this policy — the latest version is always here. Questions? Message the game owner in the game."]]}};
function esc(x){return String(x).replace(/[&<>]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;"}[c]})}
function renderPriv(){const d=PV[LANG==="en"?"en":"ru"];const t=document.getElementById("priv_t"),b=document.getElementById("priv_b");if(!t||!b)return;
t.innerHTML='<svg class="ico"><use href="#i-user"/></svg>'+esc(d.t);
b.innerHTML=d.s.map(function(x){return'<div class="pv-h">'+esc(x[0])+'</div>'+(Array.isArray(x[1])?'<ul>'+x[1].map(function(i){return'<li>'+esc(i)+'</li>'}).join("")+'</ul>':'<p>'+esc(x[1])+'</p>')}).join("")+'<small>'+esc(d.upd)+'</small>'}
function labP(){const b=document.getElementById("s_priv");if(b)b.textContent=PV[LANG==="en"?"en":"ru"].b}
document.getElementById("s_priv").onclick=function(){renderPriv();openPanel("privp")};
labP();renderPriv();
{const _sl=setLang;setLang=function(e){_sl(e);lab();labP();renderPriv()}}
})();
}catch(e){try{console.error("[15_sfx.js #14]",e)}catch(_){}}
