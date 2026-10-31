/* 34_journal.js — ЖУРНАЛ заходов: sessions.json, report.txt, session_log.txt
   (вынесено из index.html без изменений; порядок подключения — по номеру файла) */

/* ── скрипт #62 ── */
try{
/* Журнал заходов: Android/data/<пакет>/files/sessions.json и report.txt */
(function(){
  if(!window.AndroidBridge||!AndroidBridge.writeFile||!AndroidBridge.readFile)return;
  var MAXS=40,MAXE=400,SKIP={wd:1,en:1,et:1,pl:1,pm:1,ps:1};
  var LBL={coins:"Монеты",gem:"Тикеты",luck:"Удача (уровень)",inc:"Доход (уровень)",rolls:"Роллы",found:"Коллекция",pt:"Питомцы",gp:"Геймпассы",w:"Мир",best:"Лучшая редкость",wu:"Открытые миры",dr:"Ежедневная награда",dq:"Ежедневные задания",rb:"Перерождения"};
  var ST={coins:"Монеты",gems:"Тикеты",luck:"Удача",income:"Доход",rolls:"Роллы",items:"Предметов в коллекции",pets:"Питомцев"};
  var H=[],cur=null,last=null,dirty=false,lastW=0;
  try{var tx=AndroidBridge.readFile("sessions.json");var a=tx?JSON.parse(tx):[];if(Array.isArray(a))H=a}catch(e){}
  function pad(n){return n<10?"0"+n:""+n}
  function fd(t){var d=new Date(t);return pad(d.getDate())+"."+pad(d.getMonth()+1)+"."+d.getFullYear()+" "+pad(d.getHours())+":"+pad(d.getMinutes())}
  function ft(t){var d=new Date(t);return pad(d.getHours())+":"+pad(d.getMinutes())+":"+pad(d.getSeconds())}
  function fn(n){n=+n||0;return (Math.round(n*100)/100).toLocaleString("ru-RU",{maximumFractionDigits:2})}
  function sg(n){return (n>0?"+":n<0?"−":"")+fn(Math.abs(n))}
  function num(x){return typeof x==="number"&&isFinite(x)?x:0}
  function stats(s){var f=s.found||{};return{coins:num(s.coins),gems:num(s.gem),luck:num(s.luck),income:num(s.inc),rolls:num(s.rolls),items:Object.keys(f).length,pets:(s.pt||[]).length}}
  function label(p){var q=p.split(".");q[0]=LBL[q[0]]||q[0];return q.join(" › ")}
  function short(v){var t;try{t=JSON.stringify(v)}catch(e){t=String(v)}t=String(t);return t.length>60?t.slice(0,57)+"…":t}
  function petName(id){try{if(typeof PETS!=="undefined"){var p=PETS.find(function(x){return x.id===id});if(p)return p.ru}}catch(e){}return id}
  function cnt(arr){var m={};arr.forEach(function(x){var k=typeof x==="string"?x:JSON.stringify(x);m[k]=(m[k]||0)+1});return m}
  function walk(a,b,p,out,d){
    if(out.length>=8||a===b)return;
    var ta=typeof a,tb=typeof b;
    if(a===undefined){out.push({k:p,txt:"новое "+short(b)});return}
    if(b===undefined){out.push({k:p,txt:"убрано"});return}
    if(ta==="number"&&tb==="number"){if(Math.abs(b-a)>1e-9)out.push({k:p,n:b-a});return}
    if(Array.isArray(a)&&Array.isArray(b)){
      var ca=cnt(a),cb=cnt(b),ad=[],rm=[],k;
      for(k in cb)for(var i=0;i<cb[k]-(ca[k]||0);i++)ad.push(p==="pt"?petName(k):k);
      for(k in ca)for(var j=0;j<ca[k]-(cb[k]||0);j++)rm.push(p==="pt"?petName(k):k);
      if(ad.length||rm.length)out.push({k:p,add:ad,rem:rm});return}
    if(a&&b&&ta==="object"&&tb==="object"&&!Array.isArray(a)&&!Array.isArray(b)){
      if(d>=3){if(JSON.stringify(a)!==JSON.stringify(b))out.push({k:p,txt:"изменено"});return}
      var add=[],rem=[],key,ks={};
      for(key in a)ks[key]=1;for(key in b)ks[key]=1;
      for(key in ks){
        if(!(key in a))add.push(key);else if(!(key in b))rem.push(key);
        else if(p!=="found")walk(a[key],b[key],p+"."+key,out,d+1)
      }
      if(add.length||rem.length)out.push({k:p==="found"?"Новые предметы":p,add:add,rem:p==="found"?[]:rem});
      return}
    out.push({k:p,txt:short(a)+" → "+short(b)})
  }
  function sig(ev){return ev.ch.map(function(c){return c.k+"|"+(c.n!==undefined?"n":(c.add||c.rem)?"l":"t")}).join(",")}
  function addEv(t,ch,cd){
    var ev={t:t,ch:ch,coins:cd},pv=cur.events[cur.events.length-1];
    jlog(ch.map(render).join("; ")+(cd&&Math.abs(cd)>=1?" · монеты "+sg(cd):""));
    if(pv&&t-pv.t<8000&&sig(pv)===sig(ev)){
      pv.t=t;pv.coins=(pv.coins||0)+cd;
      ev.ch.forEach(function(c,i){var o=pv.ch[i];
        if(c.n!==undefined)o.n+=c.n;
        else if(c.add||c.rem){o.add=(o.add||[]).concat(c.add||[]);o.rem=(o.rem||[]).concat(c.rem||[])}
        else o.txt=c.txt});
      return}
    cur.events.push(ev);if(cur.events.length>MAXE)cur.events.shift()
  }
  function render(c){
    var s=label(c.k);
    if(c.n!==undefined)return s+" "+sg(c.n);
    if(c.add||c.rem){var r=[];if(c.add&&c.add.length)r.push("+ "+c.add.join(", "));if(c.rem&&c.rem.length)r.push("− "+c.rem.join(", "));return s+": "+r.join(" ")}
    return s+": "+c.txt
  }
  /* session_log.txt: построчный журнал (нужен APK с AndroidBridge.log; в старом APK просто молчит) */
  function jlog(t){try{if(typeof AndroidBridge.log==="function")AndroidBridge.log(t)}catch(e){}}
  function startS(nick,now){
    var prev=null,i;
    for(i=H.length-1;i>=0;i--)if(H[i].nick===nick){prev=H[i];break}
    var st=stats(now);
    cur={n:(prev?prev.n||0:0)+1,nick:nick,start:Date.now(),end:Date.now(),startStats:st,endStats:st,delta:{},events:[],worldChanged:false};
    if(prev){var g={};for(var k in st){var d=st[k]-num(prev.endStats[k]);if(d)g[k]=d}cur.gap=g}
    H.push(cur);while(H.length>MAXS)H.shift();
    (function(){var g=[],neg=0,k;if(cur.gap)for(k in cur.gap){g.push(ST[k]+" "+sg(cur.gap[k]));if(cur.gap[k]<0)neg=1}
      jlog("=== ЗАХОД №"+cur.n+" · "+nick+" · удача "+fn(st.luck)+" · доход "+fn(st.income)+" · роллы "+fn(st.rolls)
        +(g.length?" · между заходами: "+g.join(", "):"")+(neg?"  ⚠ ОТКАТ":"")+" ===")})();
    last=now;dirty=true;flush(true)
  }
  function tick(){
    try{
      if(typeof S==="undefined"||typeof me==="undefined"||!me||typeof ready==="undefined"||!ready){if(cur){jlog("Заход №"+cur.n+" завершён · "+cur.nick);flush(true);cur=null;last=null}return}
      if(cur&&cur.nick!==me.nick){flush(true);cur=null;last=null}
      var now=JSON.parse(JSON.stringify(S));
      if(!cur){startS(me.nick,now);return}
      var t=Date.now();
      if((last.w|0)!==(now.w|0)){
        cur.worldChanged=true;
        addEv(t,[{k:"w",txt:(last.w|0)+" → "+(now.w|0)}],0);
      }else{
        var sa=stats(last),sb=stats(now),k;
        for(k in sb)cur.delta[k]=(cur.delta[k]||0)+(sb[k]-sa[k]);
        var out=[];
        for(k in now){if(SKIP[k]||k.charAt(0)==="_"||k==="coins")continue;walk(last[k],now[k],k,out,0)}
        var cd=num(now.coins)-num(last.coins);
        if(out.length)addEv(t,out,cd);
        else if(cd<-0.5)addEv(t,[{k:"coins",txt:"потрачено"}],cd);
      }
      cur.end=t;cur.endStats=stats(now);last=now;dirty=true;flush(false)
    }catch(e){}
  }
  function sums(nick){
    var tot={},c=0;
    H.forEach(function(s){if(s.nick!==nick)return;c++;for(var k in s.delta)tot[k]=(tot[k]||0)+s.delta[k]});
    return {tot:tot,c:c}
  }
  function report(){
    var L=["КРИСТАЛЬНЫЙ АЛТАРЬ — история заходов","(файл только для чтения: изменения здесь на игру не влияют)",""];
    var nick=H.length?H[H.length-1].nick:"",sm=sums(nick),k;
    L.push("Игрок: "+nick+" · заходов в журнале: "+sm.c);
    var tl=[];for(k in ST)if(sm.tot[k])tl.push(ST[k]+" "+sg(sm.tot[k]));
    L.push("Всего за все заходы: "+(tl.length?tl.join(", "):"без изменений"));L.push("");
    L.push("СПИСОК ВСЕХ ЗАХОДОВ (новые сверху):");
    H.slice().reverse().forEach(function(s){
      var rb=0;if(s.gap)for(var q in s.gap)if(s.gap[q]<0)rb=1;
      L.push("  №"+(s.n||"?")+" · "+s.nick+" · "+fd(s.start)+" · "+Math.max(1,Math.round((s.end-s.start)/60000))+" мин"
        +" · удача "+fn(s.startStats.luck)+"→"+fn(s.endStats.luck)
        +" · доход "+fn(s.startStats.income)+"→"+fn(s.endStats.income)
        +" · монеты "+sg((s.delta||{}).coins||0)+(rb?"  ⚠ ОТКАТ при входе":""))
    });
    L.push("");
    H.slice().reverse().forEach(function(s){
      L.push("=== Заход №"+(s.n||"?")+" · "+s.nick+" · "+fd(s.start)+" → "+ft(s.end)+" ("+Math.max(1,Math.round((s.end-s.start)/60000))+" мин) ===");
      if(s.gap){var g=[];for(k in s.gap)g.push(ST[k]+" "+sg(s.gap[k]));if(g.length){var neg=0;for(k in s.gap)if(s.gap[k]<0)neg=1;L.push((neg?"⚠ ОТКАТ! ":"")+"Между заходами изменилось: "+g.join(", "))}}
      L.push("Было → Стало (итог):");
      for(k in ST)L.push("  "+ST[k]+": "+fn(s.startStats[k])+" → "+fn(s.endStats[k])+" ("+sg(s.delta[k]||0)+")");
      if(s.worldChanged)L.push("  * в заходе была смена мира, поэтому «итог» суммирует изменения внутри каждого мира");
      L.push("Что делал:");
      if(!s.events.length)L.push("  (ничего не зафиксировано)");
      if(s.events.length>100)L.push("  … ранних записей скрыто: "+(s.events.length-100)+" (полностью — в sessions.json)");
      s.events.slice(-100).forEach(function(e){
        L.push("  "+ft(e.t)+"  "+e.ch.map(render).join("; ")+(e.coins&&Math.abs(e.coins)>=1?" · монеты "+sg(e.coins):""))
      });
      L.push("")
    });
    return L.join("\n")
  }
  /* sessions.json: каждая сессия отдельным блоком с отступами; если файл слишком большой — по одной сессии на строку */
  function pretty(){
    var t=JSON.stringify(H,null,2);
    if(t.length<=900000)return t;
    return "[\n"+H.map(function(s){return JSON.stringify(s)}).join(",\n")+"\n]"
  }
  function flush(f){
    if(!H.length)return;var n=Date.now();
    if(!f&&(!dirty||n-lastW<5000))return;
    dirty=false;lastW=n;
    try{AndroidBridge.writeFile("sessions.json",pretty());AndroidBridge.writeFile("report.txt",report())}catch(e){}
  }
  setInterval(tick,3000);setTimeout(tick,1500);
  document.addEventListener("visibilitychange",function(){if(document.hidden){tick();flush(true)}});
  window.addEventListener("pagehide",function(){flush(true)});
})();
}catch(e){try{console.error("[34_journal.js #62]",e)}catch(_){}}
