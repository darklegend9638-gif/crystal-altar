/* 41_offline_gate.js — игра только с интернетом.
   Если сети нет — поверх всего показывается меню «Включите интернет», игра заблокирована.
   Как только сеть появляется, меню исчезает само (или по кнопке «Повторить»). */
(function(){
  var PING="https://ybjnbrioosiumcnoqvbz.supabase.co/rest/v1/";
  var ru=function(){try{return (typeof LANG!=="undefined"?LANG:(navigator.language||"ru")).toString().toLowerCase().indexOf("ru")===0}catch(e){return true}};
  var T=function(r,e){return ru()?r:e};
  var box,timer=0,shown=false;

  function build(){
    if(box)return;
    box=document.createElement("div");
    box.id="offGate";
    box.setAttribute("style","position:fixed;inset:0;z-index:2147483000;display:none;align-items:center;justify-content:center;padding:18px;background:rgba(2,4,10,.92);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);touch-action:none");
    box.innerHTML=
      '<div style="width:100%;max-width:380px;padding:28px 22px;text-align:center;background:var(--bg2,#14102a);border:1px solid var(--line,rgba(255,255,255,.14));border-radius:26px;box-shadow:0 30px 80px -10px rgba(0,0,0,.85);color:var(--text,#fff);font-family:inherit">'+
        '<div style="font-size:54px;line-height:1;margin-bottom:10px">📡</div>'+
        '<div id="offT" style="font-size:20px;font-weight:800;margin-bottom:8px"></div>'+
        '<div id="offD" style="font-size:14px;opacity:.7;margin-bottom:20px;line-height:1.4"></div>'+
        '<button id="offB" type="button" style="width:100%;padding:14px 12px;font-size:16px;font-weight:800;border:0;border-radius:16px;color:#06121c;background:linear-gradient(135deg,#34e3c8,#3aa6ff);font-family:inherit"></button>'+
      '</div>';
    document.body.appendChild(box);
    box.querySelector("#offB").onclick=function(){check(true)};
    ["touchmove","wheel"].forEach(function(n){box.addEventListener(n,function(e){e.preventDefault()},{passive:false})});
  }
  function texts(){
    if(!box)return;
    box.querySelector("#offT").textContent=T("Нет подключения к интернету","No internet connection");
    box.querySelector("#offD").textContent=T("Игра работает только онлайн. Включите Wi‑Fi или мобильный интернет — игра продолжится сама.","The game needs an internet connection. Turn on Wi‑Fi or mobile data and the game will continue automatically.");
    box.querySelector("#offB").textContent=T("Повторить","Retry");
  }
  function show(){
    build();texts();
    box.style.display="flex";shown=true;
    if(!timer)timer=setInterval(function(){check(false)},3000);
  }
  function hide(){
    if(box)box.style.display="none";
    shown=false;
    if(timer){clearInterval(timer);timer=0}
  }
  function ping(){
    if(typeof fetch!=="function")return Promise.resolve(navigator.onLine!==false);
    var c=typeof AbortController==="function"?new AbortController():null;
    var t=c?setTimeout(function(){c.abort()},5000):0;
    return fetch(PING,{method:"HEAD",mode:"no-cors",cache:"no-store",signal:c?c.signal:undefined})
      .then(function(){clearTimeout(t);return true},function(){clearTimeout(t);return false});
  }
  function check(manual){
    if(navigator.onLine===false){show();return}
    ping().then(function(ok){ok?hide():show()});
  }
  addEventListener("offline",show);
  addEventListener("online",function(){check(false)});
  addEventListener("languagechange",texts);
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",function(){check(false)});
  else check(false);
})();
