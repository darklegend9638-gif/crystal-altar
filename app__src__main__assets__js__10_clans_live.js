/* 10_clans_live.js — живое обновление экрана + кланы
   (вынесено из index.html без изменений; порядок подключения — по номеру файла) */

/* ── скрипт #5 ── */
try{
/* Живое обновление: счётчики гаранта, шансы и всё, что зависит от ивентов/состояния,
   перерисовывается само, без перезагрузки страницы. */
(function(){
  let last="",skip=0;
  const sig=()=>{try{
    const e=ev();
    return [clanLuck(),clanInc(),clanGem(),S.pm,S.ps,S.rolls,S.luck,S.inc,S.gem,TH(PM),TH(PS),
            e.pity||1,e.lk||1,e.la||0,e.rare||1,e.coin||1,e.inc||1,e.disc||1,e.shop||1,e.gain||1,
            (e.ex||[]).length, typeof evSig==="function"?evSig():""].join("|");
  }catch(_){return last}};
  function tick(){
    if(document.hidden||!ready)return;
    if(busy){skip=1;return}
    const k=sig();
    if(k!==last||skip){last=k;skip=0;try{render()}catch(_){}}
  }
  setInterval(tick,1000);
  document.addEventListener("visibilitychange",()=>{if(!document.hidden)tick()});
  addEventListener("focus",tick);addEventListener("pageshow",tick);
  addEventListener("storage",ev2=>{
    try{
      if(TOKEN||busy||ev2.key!==KEY||!ev2.newValue)return;
      S=Object.assign(FRESH(),JSON.parse(ev2.newValue));normS();render();
    }catch(_){}
  });
  last=sig();
  /* снимок состояния для мгновенного показа шансов после перезапуска */
  function snap(){
    try{
      if(!TOKEN||!ready)return;
      const c=Object.assign({},S);delete c._v;delete c._pc;
      localStorage.setItem(GPX+"gacha-snap",JSON.stringify({t:TOKEN,s:c}));
    }catch(_){}
  }
  setInterval(snap,3000);
  addEventListener("pagehide",snap);
  document.addEventListener("visibilitychange",()=>{if(document.hidden)snap()});
})();
}catch(e){try{console.error("[10_clans_live.js #5]",e)}catch(_){}}
