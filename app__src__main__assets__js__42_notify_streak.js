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

  /* ── строка серии в окне «Ежедневная награда» ── */
  function paint(){
    var p=document.getElementById("drp");if(!p)return;
    var row=document.getElementById("lsrow");
    if(!row){row=document.createElement("div");row.id="lsrow";
      row.style.cssText="margin-top:10px;padding:10px 14px;border-radius:14px;border:1px solid rgba(255,170,60,.4);background:linear-gradient(135deg,rgba(255,140,40,.18),rgba(255,70,110,.12));font-weight:800;font-size:15px;display:flex;justify-content:space-between;align-items:center;gap:8px";
      var sub=document.getElementById("drsub");sub&&sub.parentNode.insertBefore(row,sub.nextSibling)}
    var st=streak();
    var h='<span>🔥 '+T("Серия заходов: ","Login streak: ")+st.n+" "+T("дн.","d")+'</span><span style="font-size:12px;font-weight:600;opacity:.75">'+T("рекорд ","best ")+Math.max(st.b,st.n)+'</span>';
    if(row.__h!==h){row.__h=h;row.innerHTML=h}
  }

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
