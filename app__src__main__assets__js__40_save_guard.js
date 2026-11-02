/* 40_save_guard.js — прокачка/награда не теряется, если сразу выйти из игры.
   Причина бага: при сворачивании/выходе игра делает «экстренное» сохранение, но оно молча пропускалось,
   если в очереди уже были обычные сохранения (а они идут каждую секунду из-за дохода). */
try{
(function(){"use strict";
const op=window.push;
if(typeof op!=="function")return;

/* 1) экстренное сохранение (выход/сворачивание) больше не пропускается из-за очереди */
window.push=function(e){
  if(e===true||e===1){
    let saved=0,swapped=false;
    try{saved=_ops;_ops=0;swapped=true}catch(x){}
    try{return op.apply(this,arguments)}
    finally{if(swapped){try{_ops=saved}catch(x){}}}     /* первая (синхронная) часть уже отправила запрос */
  }
  return op.apply(this,arguments);
};

/* 2) после любого тапа сохраняем почти сразу, а не «когда дойдёт очередь» (не чаще раза в 700 мс) */
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
