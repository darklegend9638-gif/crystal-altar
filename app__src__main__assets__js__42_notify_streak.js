/* 42_notify_streak.js — серия ежедневных заходов + системные уведомления Android
   • S.ls = {d:"YYYY-MM-DD", n:серия, b:рекорд} — хранится в сохранении игры
   • напоминания планируются через AndroidBridge (AlarmManager), сервер не нужен */
(function(){
  var B=window.AndroidBridge;
  var ru=function(){try{return (typeof LANG!=="undefined"?LANG:(navigator.language||"ru")).toString().toLowerCase().indexOf("ru")===0}catch(e){return true}};
  var T=function(r,e){return ru()?r:e};
  var HOUR=36e5,DAY=864e5;

  /* ── день по времени сервера (смена даты на телефоне не помогает) ── */
  function nowMs(){try{var n=drNow();return n==null?null:n}catch(e){return Date.now()}}
  function key(ms){var d=new Date(ms),p=function(x){return(x<10?"0":"")+x};return d.getFullYear()+"-"+p(d.getMonth()+1)+"-"+p(d.getDate())}
  function dayNum(k){var a=k.split("-");return Math.round(Date.UTC(+a[0],+a[1]-1,+a[2])/DAY)}

  /* ── серия заходов ── */
  function streak(){var s=(typeof S==="object"&&S&&S.ls&&typeof S.ls==="object")?S.ls:null;return{n:s?(+s.n||0):0,b:s?(+s.b||0):0,d:s?s.d:""}}
  var touched=false;
  function touch(){
    if(touched||typeof ready==="undefined"||!ready||typeof S!=="object"||!S)return;
    var now=nowMs();if(now==null)return;
    touched=true;
    var today=key(now),st=streak(),n=st.n,msg=null;
    if(!st.d){n=1;msg=T("🔥 Серия заходов началась!","🔥 Login streak started!")}
    else if(st.d===today){/* уже заходил сегодня */}
    else{
      var diff=dayNum(today)-dayNum(st.d);
      if(diff===1){n=st.n+1;msg=T("🔥 Серия заходов: ","🔥 Login streak: ")+n+T(" дн.",(n===1?" day":" days"))}
      else if(diff>1){n=1;msg=T("Серия заходов сброшена — начни новую 🔥","Streak was reset — start a new one 🔥")}
      else{/* часы ушли назад — ничего не меняем */}
    }
    if(!S.ls||S.ls.d!==today||S.ls.n!==n){
      S.ls={d:(st.d&&dayNum(today)<dayNum(st.d))?st.d:today,n:n,b:Math.max(st.b,n)};
      try{save();pushSoon()}catch(e){}
    }
    if(msg)try{toast(msg,"ok")}catch(e){}
    paint();schedule();
  }

  /* ── огонёк серии в шапке (рядом с тикетами и монетами) ──
     каждые 5 дней меняются и цвет, и форма огонька (после 25-го дня остаётся финальный) */
  var FL=[
    {c1:"#ffe08a",c2:"#ff5a1f",g:"255,120,40",
     s:'<path d="M12 2.2c.9 3.6 5.2 5.7 5.2 10.6A5.2 5.2 0 0 1 12 22a5.2 5.2 0 0 1-5.2-5.3c0-2.1 1-3.5 2.1-4.8.3 1.7 1.2 2.5 2.1 2.7C10.8 10 10.4 5.6 12 2.2z" fill="url(#G)"/>'},
    {c1:"#ffb0a0",c2:"#e0192b",g:"255,70,70",
     s:'<path d="M12 2c1 3.7 5.4 5.9 5.4 10.9A5.4 5.4 0 0 1 12 22.2a5.4 5.4 0 0 1-5.4-5.4c0-2.2 1-3.7 2.2-5 .3 1.8 1.3 2.6 2.2 2.8C10.7 10 10.3 5.6 12 2z" fill="url(#G)"/><path d="M12 11.5c.5 1.8 2.4 2.8 2.4 5a2.4 2.4 0 0 1-4.8 0c0-1.2.6-1.9 1.1-2.5.2.8.7 1.2 1.1 1.3-.2-1.3-.1-2.7.2-3.8z" fill="#fff" fill-opacity=".85"/>'},
    {c1:"#c9f4ff",c2:"#2f7bff",g:"70,160,255",
     s:'<path d="M12 1.8c1 3.8 5.4 6 5.4 11A5.4 5.4 0 0 1 12 22.2a5.4 5.4 0 0 1-5.4-5.4c0-2.2 1-3.7 2.2-5 .3 1.8 1.3 2.6 2.2 2.8C10.7 10 10.3 5.4 12 1.8z" fill="url(#G)"/><path d="M5.2 9.4c1.2 1.4 1.4 2.8.9 4.2-.9-.4-1.9-1.6-.9-4.2zM18.8 9.4c-1.2 1.4-1.4 2.8-.9 4.2.9-.4 1.9-1.6.9-4.2z" fill="url(#G)" fill-opacity=".8"/><path d="M12 12c.5 1.8 2.3 2.8 2.3 4.8a2.3 2.3 0 0 1-4.6 0c0-1.2.6-1.9 1.1-2.5.2.8.7 1.2 1.1 1.3-.2-1.2-.1-2.4.1-3.6z" fill="#fff" fill-opacity=".9"/>'},
    {c1:"#f0c4ff",c2:"#8a2be2",g:"170,80,255",
     s:'<path d="M12 1.5c1 3.6 4.6 5.5 4.6 10 0 1.2-.3 2.2-.8 3 1-.2 1.9-1 2.4-2.2 1.2 5.2-1.7 9.9-6.2 9.9s-7.4-4.7-6.2-9.9c.5 1.2 1.4 2 2.4 2.2-.5-.8-.8-1.8-.8-3C7.4 7 11 5.100 12 1.500z" fill="url(#G)"/><path d="M12 12.5c.5 1.7 2.2 2.6 2.2 4.6a2.2 2.2 0 0 1-4.4 0c0-1.1.5-1.8 1-2.3.2.7.7 1.1 1.1 1.2-.2-1.1-.1-2.3.1-3.5z" fill="#fff" fill-opacity=".9"/><circle cx="19.500" cy="4.500" r="1.100" fill="#f0c4ff"/><circle cx="4.500" cy="6" r=".9" fill="#f0c4ff"/>'},
    {c1:"#d2ffd9",c2:"#0fb866",g:"60,220,130",
     s:'<path d="M12 1.5c.9 3.2 3.2 4.7 3.2 7.700 1.500-.7 2.400-2 2.700-3.500 2.100 2.300 3.100 5.100 3.100 7.800A8.500 8.500 0 0 1 12 22.300a8.500 8.500 0 0 1-8.200-8.800c0-2.700 1-5.500 3.100-7.800.3 1.500 1.200 2.800 2.700 3.500 0-3 2.300-4.500 3.200-7.700z" fill="url(#G)"/><path d="M12 12c.6 2 2.600 3 2.600 5.300a2.600 2.600 0 0 1-5.200 0c0-1.300.7-2.100 1.200-2.800.3.900.8 1.300 1.300 1.400-.2-1.300-.1-2.800.1-3.900z" fill="#fff" fill-opacity=".9"/><circle cx="20" cy="3.500" r="1.200" fill="#d2ffd9"/><circle cx="3.800" cy="4.500" r="1" fill="#d2ffd9"/>'},
    {c1:"#fffbd0",c2:"#f2a21a",g:"255,200,70",
     s:'<path d="M12 1c.9 3 3 4.300 3 7 1.500-.6 2.500-1.800 2.800-3.200C20 7.200 21.500 10 21.500 13.300A9.500 9.500 0 0 1 12 22.800a9.500 9.500 0 0 1-9.500-9.500c0-3.300 1.500-6.100 3.700-8.500.3 1.400 1.300 2.600 2.800 3.200 0-2.700 2.100-4 3-7z" fill="url(#G)"/><path d="M12 11.800c.7 2.100 2.800 3.200 2.800 5.600a2.800 2.800 0 0 1-5.600 0c0-1.400.7-2.200 1.300-3 .3 1 .9 1.400 1.400 1.500-.2-1.400-.1-3 .1-4.100z" fill="#fff"/><path d="M3 2.500l.6 1.300 1.300.6-1.300.6L3 6.300l-.6-1.300L1.100 4.400l1.300-.6zM21 1.500l.5 1.100 1.100.5-1.100.5-.5 1.100-.5-1.100-1.100-.5 1.100-.5z" fill="#fff6c2"/>'}
  ];
  function stage(n){return Math.max(0,Math.min(FL.length-1,Math.floor((Math.max(n,1)-1)/5)))}
  function flameSvg(i){var f=FL[i],id="lsg"+i;
    return '<svg class="ico lsfl" viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+f.c1+'"/><stop offset="1" stop-color="'+f.c2+'"/></linearGradient></defs>'+f.s.replace(/url\(#G\)/g,"url(#"+id+")")+'</svg>'}
  function addCss(){
    if(document.getElementById("lsCss"))return;
    var s=document.createElement("style");s.id="lsCss";
    s.textContent="#hud .hi.ls{cursor:pointer}#hud .ls .lsfl{transform-origin:50% 90%;filter:drop-shadow(0 0 4px rgba(var(--lsg,255,120,40),.85));animation:lsFlick 1.3s ease-in-out infinite}"+
      "@keyframes lsFlick{0%,100%{transform:scale(1,1) rotate(0)}25%{transform:scale(.94,1.07) rotate(-2.5deg)}55%{transform:scale(1.05,.95) rotate(2deg)}80%{transform:scale(.97,1.05) rotate(-1deg)}}"+
      "#hud .ls .lsn{font-variant-numeric:tabular-nums}@media (prefers-reduced-motion:reduce){#hud .ls .lsfl{animation:none}}";
    document.head.appendChild(s)}
  function paint(){
    /* старую строку серии в окне «Ежедневная награда» убираем */
    var old=document.getElementById("lsrow");if(old&&old.parentNode)old.parentNode.removeChild(old);
    var hud=document.getElementById("hud");if(!hud)return;
    var st=streak(),n=st.n,it=hud.querySelector(".hi.ls");
    if(n<1){if(it)it.style.display="none";return}
    addCss();
    var i=stage(n);
    if(!it){it=document.createElement("span");it.className="hi ls";
      it.innerHTML='<span class="lsi"></span><span class="lsn"></span>';
      it.onclick=function(){var s=streak(),k=stage(s.n),left=k>=FL.length-1?0:5-((s.n-1)%5);
        try{toast("🔥 "+T("Серия заходов: ","Login streak: ")+s.n+T(" дн. · рекорд "," d · best ")+Math.max(s.b,s.n)+(left?T(" · новый огонёк через "," · new flame in ")+left+T(" дн."," d"):""),"ok")}catch(e){}};
      hud.appendChild(it)}
    it.style.display="";
    if(it.__st!==i){it.__st=i;it.firstChild.innerHTML=flameSvg(i);it.style.setProperty("--lsg",FL[i].g)}
    var num=it.lastChild;if(num.textContent!==String(n))num.textContent=n;
  }
  setInterval(paint,1000);

  /* ── уведомления ── */
  function enabled(){try{return localStorage.getItem("ca_notif")!=="0"}catch(e){return true}}
  function setEnabled(v){try{localStorage.setItem("ca_notif",v?"1":"0")}catch(e){}}
  function allowed(){try{return !!(B&&B.notifAllowed&&B.notifAllowed())}catch(e){return false}}

  /* не будим ночью: с 23:00 до 09:00 сдвигаем на 09:00 */
  function quiet(ms){var d=new Date(ms),h=d.getHours();
    if(h>=23){d.setDate(d.getDate()+1);d.setHours(9,0,0,0)}else if(h<9){d.setHours(9,0,0,0)}
    return d.getTime()}
  function at(ms,hh){var d=new Date(ms);d.setHours(hh,0,0,0);return d.getTime()}

  function schedule(){
    if(!B||!B.notifSchedule||typeof ready==="undefined"||!ready)return;
    if(!enabled()||!allowed()){try{[1,2,3].forEach(function(i){B.notifCancel(i)})}catch(e){}return}
    var now=Date.now(),st=streak();
    try{
      /* 1 — ежедневная награда готова */
      var dr=null;try{dr=drState()}catch(e){}
      if(dr&&!dr.nosync){
        var when=dr.claimed?now+dr.sec*1000+6e4:now+3*HOUR;
        B.notifSchedule(1,quiet(when),
          T("🎁 Ежедневная награда готова!","🎁 Daily reward is ready!"),
          T("Заходи и забери тикеты 💎","Come back and claim your tickets 💎"));
      }
      /* 2 — серия под угрозой: завтра в 19:00 */
      if(st.n>=1){
        var tomorrow=at(now+DAY,19);
        B.notifSchedule(2,tomorrow,
          T("🔥 Не потеряй серию!","🔥 Don't lose your streak!"),
          T("Серия заходов: "+st.n+" дн. Загляни сегодня, чтобы сохранить её.","Login streak: "+st.n+" d. Visit today to keep it."));
      }
      /* 3 — давно не заходил: через 3 дня */
      B.notifSchedule(3,quiet(now+3*DAY),
        T("Crystal Altar скучает 💎","Crystal Altar misses you 💎"),
        T("Тебя ждут награды и новые выпадения!","Rewards and new drops are waiting for you!"));
    }catch(e){}
  }

  /* ── переключатель в настройках ── */
  function addToggle(){
    var anchor=document.getElementById("s_ext");if(!anchor||document.getElementById("s_ntf"))return;
    var row=document.createElement("div");row.className="row";
    var b=document.createElement("button");b.className="alt";b.id="s_ntf";row.appendChild(b);
    anchor.parentNode.insertBefore(row,anchor);
    var lbl=function(){var on=enabled()&&allowed();
      b.textContent="🔔 "+T("Уведомления: ","Notifications: ")+(on?T("вкл","on"):T("выкл","off"))};
    b.onclick=function(){
      if(enabled()&&allowed()){setEnabled(false);lbl();schedule();return}
      setEnabled(true);
      if(!allowed()&&B){
        try{B.notifRequest&&B.notifRequest()}catch(e){}
        /* если система больше не показывает запрос — ведём в настройки */
        setTimeout(function(){if(!allowed()){try{toast(T("Разреши уведомления в настройках телефона","Allow notifications in phone settings"),"err")}catch(e){}try{B.notifSettings&&B.notifSettings()}catch(e){}}lbl();schedule()},1800);
      }
      lbl();schedule();
    };
    lbl();
    var sb=document.getElementById("setb");if(sb){var o=sb.onclick;sb.onclick=function(){var r=o&&o.apply(this,arguments);lbl();return r}}
    document.addEventListener("visibilitychange",function(){document.hidden||lbl()});
  }

  /* ── запуск ── */
  var drb=document.getElementById("drb");
  if(drb)drb.addEventListener("click",function(){setTimeout(paint,0)});
  addToggle();
  /* первый запрос разрешения — после первого захода в игру (Android 13+) */
  function firstAsk(){
    try{if(!B||!enabled()||allowed()||localStorage.getItem("ca_notif_asked"))return;localStorage.setItem("ca_notif_asked","1");B.notifRequest&&B.notifRequest()}catch(e){}
  }
  var tries=0,iv=setInterval(function(){
    touch();
    if(touched||++tries>120){clearInterval(iv);if(touched)setTimeout(firstAsk,4000)}
  },500);
  /* держим расписание свежим: пока игра открыта — сдвигаем, на экране уведомления не показываются */
  setInterval(function(){schedule()},3*60*1e3);
  document.addEventListener("visibilitychange",function(){if(document.hidden)schedule();else touch()});
  window.addEventListener("pagehide",schedule);
  /* после получения награды расписание меняется */
  var gb=document.getElementById("drgo");if(gb)gb.addEventListener("click",function(){setTimeout(schedule,600)});
  window.__ntfSchedule=schedule;
})();
