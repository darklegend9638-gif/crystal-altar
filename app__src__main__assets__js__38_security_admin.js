/* 38_security_admin.js — админ-панель в настройках, привязка почты, 2FA по почте
   Нужен SQL из crystal_altar_email_2fa.sql (иначе блок почты покажет «недоступно»). */
try{
(function(){"use strict";
const $=id=>document.getElementById(id);
const T=(ru,en)=>typeof L2==="function"?L2(ru,en):ru;
const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const isAdm=()=>{try{return !!(isOwner||granted)}catch(e){return false}};
const hasTok=()=>{try{return !!(TOKEN&&me)}catch(e){return false}};
const notify=(m,ok)=>{try{toast(m,ok?"ok":"err")}catch(e){}};

/* ───────── стили ───────── */
const css=document.createElement("style");
css.textContent=
"#menu #adm{display:none!important}"+                      /* админка переехала в настройки */
"#s_admw{margin-top:12px}#s_admw button{width:100%;display:flex;align-items:center;justify-content:center;gap:8px}"+
".sec-box{margin-top:14px;padding:12px;border-radius:16px;border:1px solid var(--line);background:rgba(255,255,255,.04)}"+
".sec-box h4{margin:0 0 8px;font:700 15px var(--fh)}"+
".sec-line{display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:14px}"+
".sec-ok{color:#3fe0b0;font-weight:700}.sec-off{color:var(--mute)}"+
".sec-r{display:flex;gap:8px;margin-top:10px;flex-wrap:wrap}"+
".sec-r input{flex:1 1 150px;min-width:0}.sec-r button{flex:1 1 auto}"+
".sec-n{color:var(--mute);font-size:12px;margin-top:6px;line-height:1.35}"+
".sec-w{color:#ffb02e;font-size:12px;margin-top:8px;line-height:1.35}"+
".sec-st{font-size:13px;min-height:18px;margin-top:6px}"+
"#tfa{position:fixed;inset:0;z-index:2147483647!important;display:none;align-items:center;justify-content:center;padding:16px;background:rgba(2,4,10,.82);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}"+
"#tfa .tb{width:100%;max-width:370px;padding:22px;border-radius:26px;background:radial-gradient(120% 60% at 50% -8%,rgba(168,85,247,.38),transparent 62%),linear-gradient(180deg,#1a1034,#0d0a1f);border:1px solid rgba(180,130,255,.55);box-shadow:0 34px 90px -18px rgba(0,0,0,.9),0 0 34px -10px rgba(168,85,247,.55)}"+
"#tfa .tt{display:block;font:800 20px var(--fh);margin-bottom:6px}#tfa .ts{font-size:14px;color:var(--mute);margin-bottom:12px;line-height:1.4}"+
"#tfa input{width:100%;box-sizing:border-box;text-align:center;font:800 28px/1 var(--fh);letter-spacing:.35em;padding:12px 8px}";
document.head.appendChild(css);

/* ───────── 1. Кнопка «Админ-панель» внутри настроек ───────── */
const setp=$("setp");
function mountAdmin(){
  if(!setp||$("s_admw"))return;
  const w=document.createElement("div");
  w.id="s_admw";w.style.display="none";
  w.innerHTML='<button class="alt" id="s_adm" type="button"><svg class="ico"><use href="#i-admin"/></svg><span></span></button>';
  const hd=setp.querySelector(".hd");
  if(hd)hd.insertAdjacentElement("afterend",w);else setp.appendChild(w);
  w.querySelector("span").textContent=T("Админ-панель","Admin panel");
  $("s_adm").onclick=()=>{const b=$("adm");if(b)b.click()};   /* click() — чтобы сработали и onclick, и слушатель журнала */
}
function syncAdmin(){const w=$("s_admw");if(!w)return;w.style.display=isAdm()?"":"none";const s=w.querySelector("span");if(s)s.textContent=T("Админ-панель","Admin panel")}

/* ───────── 2. Почта и 2FA в настройках ───────── */
let ST=null,V="idle",P=null,cd=0,cdT=0,BUSY=false;
function mountSec(){
  if(!setp||$("s_sec"))return;
  const b=document.createElement("div");b.id="s_sec";b.className="sec-box";b.style.display="none";
  let row=$("s_old");while(row&&row.parentElement!==setp)row=row.parentElement;   /* строка пароля (она может быть обёрнута) */
  const lbl=row&&row.previousElementSibling;                                     /* подпись «Пароль» */
  if(lbl)setp.insertBefore(b,lbl);else setp.appendChild(b);
  b.addEventListener("click",onClick);
  b.addEventListener("input",e=>{if(e.target.id==="sec_code"){e.target.value=e.target.value.replace(/\D/g,"").slice(0,6);if(e.target.value.length===6)doCode()}});
}
function say(m,ok){const s=$("sec_st");if(s){s.textContent=m||"";s.style.color=ok?"#3fe0b0":"#ff6b6b"}}
function lock(on){BUSY=!!on;const b=$("s_sec");if(b)b.querySelectorAll("button").forEach(x=>{x.disabled=!!on||(x.id==="sec_rs"&&cd>0)})}
function startCd(s){cd=s;clearInterval(cdT);cdT=setInterval(()=>{cd=Math.max(0,cd-1);tickCd();if(!cd)clearInterval(cdT)},1000)}
function tickCd(){const b=$("sec_rs");if(!b)return;b.disabled=cd>0||BUSY;b.textContent=T("Отправить ещё раз","Resend")+(cd>0?" ("+cd+")":"")}
const call=(fn,a)=>rpc(fn,Object.assign({p_token:TOKEN},a||{}));

function draw(){
  const b=$("s_sec");if(!b)return;
  if(!hasTok()){b.style.display="none";return}
  b.style.display="";
  let h='<h4>🔐 '+T("Почта и защита входа","Email & login security")+'</h4>';
  if(ST===null){h+='<div class="sec-n">'+T("Загрузка…","Loading…")+'</div>'}
  else if(ST.unavailable){h+='<div class="sec-n">'+T("Привязка почты пока недоступна.","Email linking isn’t available yet.")+'</div>'}
  else if(V==="code"&&P){
    const to=P.kind==="link"?P.email:(ST.email||"");
    const what={link:T("Подтверди почту","Confirm your email"),twofa_on:T("Включение 2FA","Enable 2FA"),twofa_off:T("Отключение 2FA","Disable 2FA"),unlink:T("Отвязка почты","Unlink email")}[P.kind];
    h+='<div class="sec-line"><b>'+what+'</b></div><div class="sec-n">'+T("Мы отправили 6-значный код на ","We sent a 6-digit code to ")+'<b>'+esc(to)+'</b>. '+T("Проверь «Спам», если письма нет.","Check spam if it’s missing.")+'</div>'+
       '<div class="sec-r"><input id="sec_code" inputmode="numeric" autocomplete="one-time-code" maxlength="6" placeholder="000000"><button data-a="ok" type="button">'+T("Подтвердить","Confirm")+'</button></div>'+
       '<div class="sec-r"><button class="alt" id="sec_rs" data-a="rs" type="button"></button><button class="alt" data-a="no" type="button">'+T("Отмена","Cancel")+'</button></div>';
  }
  else if(!ST.linked){
    h+='<div class="sec-n">'+T("Привяжи почту — так можно включить двухфакторную защиту входа.","Link an email to enable two-factor login protection.")+'</div>'+
       '<div class="sec-r"><input id="sec_em" type="email" inputmode="email" autocomplete="email" autocapitalize="off" spellcheck="false" maxlength="120" placeholder="mail@example.com"><button data-a="link" type="button">'+T("Привязать","Link")+'</button></div>';
    if(isAdm())h+='<div class="sec-w">⚠️ '+T("У тебя доступ к админке — привяжи почту и включи 2FA.","You have admin access — link an email and enable 2FA.")+'</div>';
  }
  else{
    h+='<div class="sec-line">📧 <b>'+esc(ST.email)+'</b> <span class="sec-ok">✓ '+T("подтверждена","verified")+'</span></div>'+
       '<div class="sec-line" style="margin-top:8px">'+T("2FA при входе: ","2FA on sign-in: ")+(ST.twofa?'<span class="sec-ok">'+T("включена","on")+'</span>':'<span class="sec-off">'+T("выключена","off")+'</span>')+'</div>'+
       '<div class="sec-r">'+(ST.twofa?'<button class="alt" data-a="2off" type="button">'+T("Выключить 2FA","Turn off 2FA")+'</button>':'<button data-a="2on" type="button">'+T("Включить 2FA","Turn on 2FA")+'</button>')+
       '<button class="alt" data-a="unlink" type="button" style="border-color:var(--c5);color:var(--c5)">'+T("Отвязать почту","Unlink email")+'</button></div>'+
       '<div class="sec-n">'+T("С включённой 2FA после пароля нужно вводить код из письма.","With 2FA on, you’ll enter an emailed code after your password.")+'</div>';
    if(isAdm()&&!ST.twofa)h+='<div class="sec-w">⚠️ '+T("У тебя доступ к админке — включи 2FA.","You have admin access — turn on 2FA.")+'</div>';
  }
  h+='<div class="sec-st" id="sec_st"></div>';
  b.innerHTML=h;
  if(V==="code")tickCd();
}
async function load(){
  if(!hasTok()){ST=null;draw();return}
  const r=await rpc("g2_email_status",{p_token:TOKEN});
  ST=(r&&r.data&&!r.error)?r.data:{unavailable:true};
  draw();
}
async function doLink(){
  const em=(($("sec_em")||{}).value||"").trim().toLowerCase();
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(em))return say(T("Введи корректную почту","Enter a valid email"),0);
  lock(1);const r=await call("g2_email_link_request",{p_email:em});lock(0);
  if(r.error)return say(r.error,0);
  P={kind:"link",email:em};V="code";startCd(60);draw();say(T("Код отправлен","Code sent"),1);
}
async function doAct(kind){
  lock(1);const r=await call("g2_email_action_request",{p_action:kind});lock(0);
  if(r.error)return say(r.error,0);
  P={kind};V="code";startCd(60);draw();say(T("Код отправлен","Code sent"),1);
}
async function doResend(){
  if(cd>0||BUSY||!P)return;
  lock(1);
  const r=P.kind==="link"?await call("g2_email_link_request",{p_email:P.email}):await call("g2_email_action_request",{p_action:P.kind});
  lock(0);
  if(r.error)return say(r.error,0);
  startCd(60);tickCd();say(T("Новый код отправлен","New code sent"),1);
}
async function doCode(){
  if(BUSY||!P)return;
  const code=(($("sec_code")||{}).value||"").replace(/\D/g,"");
  if(code.length!==6)return say(T("Введи 6 цифр","Enter 6 digits"),0);
  const kind=P.kind;
  lock(1);
  const r=kind==="link"?await call("g2_email_link_confirm",{p_code:code}):await call("g2_email_action_confirm",{p_action:kind,p_code:code});
  lock(0);
  if(r.error)return say(r.error,0);
  const d=r.data||{};
  if(d.fail){
    if(d.dead){V="idle";P=null;await load();say(d.msg,0)}
    else{say(d.msg+(d.left!=null?" ("+T("осталось попыток: ","attempts left: ")+d.left+")":""),0);const i=$("sec_code");if(i){i.value="";i.focus()}}
    return;
  }
  V="idle";P=null;await load();
  notify({link:T("Почта привязана","Email linked"),twofa_on:T("2FA включена","2FA enabled"),twofa_off:T("2FA выключена","2FA disabled"),unlink:T("Почта отвязана","Email unlinked")}[kind],1);
}
function onClick(e){
  const b=e.target.closest("[data-a]");if(!b||BUSY)return;
  const a=b.dataset.a;
  if(a==="link")doLink();
  else if(a==="2on")doAct("twofa_on");
  else if(a==="2off")doAct("twofa_off");
  else if(a==="unlink")doAct("unlink");
  else if(a==="ok")doCode();
  else if(a==="rs")doResend();
  else if(a==="no"){V="idle";P=null;draw()}
}

/* при каждом открытии настроек */
const sb=$("setb");
if(sb){const o=sb.onclick;sb.onclick=function(){const r=o&&o.apply(this,arguments);try{mountAdmin();mountSec();syncAdmin();ST=null;V="idle";P=null;draw();load()}catch(e){}return r}}
mountAdmin();mountSec();

/* ───────── 3. Окно кода при входе (перехват g2_login) ───────── */
const origRpc=window.rpc;
function ask2fa(d){
  return new Promise(res=>{
    let m=$("tfa");if(!m){m=document.createElement("div");m.id="tfa";document.body.appendChild(m)}
    let left=60,tm=0,done=false,busy=false;
    m.innerHTML='<div class="tb"><b class="tt">'+T("Код из письма","Email code")+'</b>'+
      '<div class="ts">'+T("Мы отправили 6-значный код на ","We sent a 6-digit code to ")+'<b>'+esc(d.hint||"")+'</b></div>'+
      '<input id="tfa_in" inputmode="numeric" autocomplete="one-time-code" maxlength="6" placeholder="000000">'+
      '<div class="sec-st" id="tfa_st"></div>'+
      '<div class="sec-r"><button id="tfa_ok" type="button">'+T("Войти","Sign in")+'</button></div>'+
      '<div class="sec-r"><button class="alt" id="tfa_rs" type="button"></button><button class="alt" id="tfa_no" type="button">'+T("Отмена","Cancel")+'</button></div></div>';
    m.style.display="flex";
    const inp=$("tfa_in"),st=$("tfa_st"),ok=$("tfa_ok"),rs=$("tfa_rs");
    const msg=(t,g)=>{st.textContent=t||"";st.style.color=g?"#3fe0b0":"#ff6b6b"};
    const rsTxt=()=>{rs.textContent=T("Отправить ещё раз","Resend")+(left>0?" ("+left+")":"");rs.disabled=left>0};
    const finish=v=>{if(done)return;done=true;clearInterval(tm);m.style.display="none";m.innerHTML="";res(v)};
    rsTxt();tm=setInterval(()=>{left=Math.max(0,left-1);rsTxt()},1000);
    setTimeout(()=>{try{inp.focus()}catch(e){}},60);
    async function submit(){
      if(busy||done)return;
      const code=inp.value.replace(/\D/g,"");
      if(code.length!==6)return msg(T("Введи 6 цифр","Enter 6 digits"));
      busy=true;ok.disabled=true;
      const r=await origRpc("g2_login_2fa",{p_cid:d.cid,p_code:code});
      busy=false;ok.disabled=false;
      if(done)return;
      if(r.error)return msg(r.error);
      const x=r.data||{};
      if(x.fail){
        if(x.dead)return finish({error:x.msg||T("Вход отменён","Sign-in cancelled")});
        msg(x.msg+(x.left!=null?" ("+T("осталось попыток: ","attempts left: ")+x.left+")":""));inp.value="";inp.focus();return;
      }
      finish({data:x});
    }
    inp.addEventListener("input",()=>{inp.value=inp.value.replace(/\D/g,"").slice(0,6);if(inp.value.length===6)submit()});
    ok.onclick=submit;
    $("tfa_no").onclick=()=>finish({error:T("Вход отменён","Sign-in cancelled")});
    rs.onclick=async()=>{
      if(left>0||done)return;
      rs.disabled=true;
      const r=await origRpc("g2_login_2fa_resend",{p_cid:d.cid});
      if(done)return;
      const x=r.data||{};
      if(r.error)msg(r.error);
      else if(x.fail){if(x.dead)return finish({error:x.msg});msg(x.msg)}
      else msg(T("Новый код отправлен","New code sent"),1);
      left=60;rsTxt();
    };
  });
}
if(typeof origRpc==="function"){
  window.rpc=async function(name){
    const r=await origRpc.apply(this,arguments);
    if(name==="g2_login"&&r&&r.data&&r.data.need_2fa)return await ask2fa(r.data);
    return r;
  };
}
})();
}catch(e){try{console.error("[38_security_admin.js]",e)}catch(_){}}
