/* 40_save_guard.js — прокачка/покупки не откатываются.
   Причины отката (исправлено):
   1) «экстренное» сохранение при сворачивании уходило ПАРАЛЛЕЛЬНО обычному → второй запрос получал
      устаревшую версию (_v), сервер отвечал «reset» со СТАРОЙ копией, а клиент её принимал → откат.
      Теперь экстренное сохранение встаёт в общую очередь (serial), а не обгоняет её.
   2) сервер менял версию (донат в клан, промокод, подарок…), клиент об этом не знал, следующее
      сохранение считалось устаревшим → откат. Теперь adminSync подхватывает версию (03_game.js).
   3) при «reset» клиент слепо принимал серверную копию. Теперь __softAdopt оставляет локальный
      прогресс и берёт у сервера только счётчики/коллекцию (полный сброс — только если это реальный вайп).
   4) ошибки сохранения были молчаливыми — теперь показываем тост, чтобы было видно, если сервер отклоняет. */
try{
(function(){"use strict";
const op=window.push;
if(typeof op!=="function")return;

/* 1) экстренное сохранение: если очередь занята — ставим сохранение В ОЧЕРЕДЬ, а не шлём параллельно */
window.push=function(e){
  if(e===true||e===1){
    let busy=0;try{busy=_ops}catch(x){}
    if(busy>0){try{return op.call(this)}catch(x){return}}
  }
  return op.apply(this,arguments);
};

/* 2) мягкое принятие ответа reset: не теряем локальные покупки/апгрейды */
window.__softAdopt=function(sv){
  try{
    if(typeof sv==="string")sv=JSON.parse(sv);
    if(!sv||typeof sv!=="object"||Array.isArray(sv)||!Object.keys(sv).length)return adopt(sv);
    const n=x=>+x||0;
    const dom=n(sv.rolls)>=n(S.rolls)&&n(sv.luck)>=n(S.luck)&&n(sv.inc)>=n(S.inc)&&n(sv.best)>=n(S.best)&&n(sv.w)===n(S.w);
    if(!dom)return adopt(sv);                 /* похоже на вайп/админ-сброс — принимаем сервер целиком */
    const pc=typeof S._pc==="number"?S._pc:n(sv.coins);
    S.coins=Math.max(0,Math.floor(n(sv.coins)+(S.coins-pc)));S._pc=n(sv.coins);
    const pg=(typeof _pg==="number")?_pg:n(sv.gem);
    S.gem=Math.max(0,Math.floor(n(sv.gem)+((S.gem||0)-pg)));try{_pg=n(sv.gem)}catch(x){}
    S.luck=Math.max(n(S.luck),n(sv.luck));S.inc=Math.max(n(S.inc),n(sv.inc));S.rolls=Math.max(n(S.rolls),n(sv.rolls));S.best=Math.max(n(S.best),n(sv.best));
    S.found=S.found||{};for(const k in (sv.found||{}))S.found[k]=Math.max(n(S.found[k]),n(sv.found[k]));
    S.pt=Array.from(new Set([].concat(S.pt||[],sv.pt||[])));S.tb=Array.from(new Set([].concat(S.tb||[],sv.tb||[])));
    if(sv.gp&&typeof sv.gp==="object"){S.gp=S.gp||{};for(const k in sv.gp)if(sv.gp[k])S.gp[k]=1}
    if(sv.bp&&sv.bp.pr&&S.bp&&typeof S.bp==="object"&&!S.bp.pr)S.bp.pr=sv.bp.pr;
    if(sv._v!=null)S._v=sv._v;
    dirty=!0;render();pushSoon();
  }catch(e){try{adopt(sv)}catch(_){}}
};

/* 3) не молчим, если сервер отклоняет сохранение (иначе кажется, что игра «откатилась») */
const orpc=window.rpc;
if(typeof orpc==="function"){
  let lastErr=0;
  window.rpc=async function(fn){
    const r=await orpc.apply(this,arguments);
    try{
      if(fn==="g2_save"&&r&&r.error&&!r.net&&!/частые|frequent/i.test(String(r.error))&&Date.now()-lastErr>20000){
        lastErr=Date.now();console.error("[save] отклонено сервером:",r.error);
        toast("Сохранение не прошло: "+String(r.error).slice(0,80),"err");
      }
    }catch(e){}
    return r;
  };
}

/* 4) после тапа сохраняем почти сразу (не чаще раза в 700 мс) */
let lastQ=0;
addEventListener("click",()=>{
  setTimeout(()=>{
    try{
      if(dirty&&Date.now()-lastQ>700){lastQ=Date.now();window.push()}
    }catch(e){}
  },120);
},true);
})();
}catch(e){try{console.error("[40_save_guard.js]",e)}catch(_){}}
