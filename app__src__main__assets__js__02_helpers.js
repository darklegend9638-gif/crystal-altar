/* 02_helpers.js — общие помощники (__one и др.)
   (вынесено из index.html без изменений; порядок подключения — по номеру файла) */

/* ── скрипт #3 ── */
try{
window.__one=function(f){var b=0;return function(){if(b||Date.now()<(window.__cool||0))return;b=1;var r;try{r=f.apply(this,arguments)}catch(e){b=0;throw e}return Promise.resolve(r).then(function(v){b=0;return v},function(e){b=0})}};(function(){var el=document.getElementById("ld"),bar=document.getElementById("ldb"),pc=document.getElementById("ldp"),tx=document.getElementById("ldt"),hn=document.getElementById("ldh");if(!el)return;
var l=(navigator.languages&&navigator.languages[0])||navigator.language||"ru",ru=/^(ru|uk|be|kk)/i.test(l),cap=30,cur=0,k=.06,t0=Date.now(),done=0,ti=0,tv=0;
var tips=[["Копи монеты и качай удачу — редкие предметы выпадают чаще","Save coins and upgrade luck — rare items drop more often"],["Питомцы приносят монеты каждую секунду","Pets earn you coins every second"],["Собери всю коллекцию и получи бонус к монетам","Complete the collection for a coin bonus"]];
function T(r,e){tx.textContent=ru?r:e}
T("Загрузка…","Loading…");
try{var q=document.getElementById("ldq"),cs=["#8fe8ff","#b98cff","#ffd36e","#ffffff"],h="";for(var n=0;n<24;n++){var s=2+(Math.random()*4|0),c=cs[n%4];h+='<i style="left:'+(Math.random()*100).toFixed(1)+'%;width:'+s+'px;height:'+s+'px;background:'+c+';box-shadow:0 0 '+s*3+'px '+c+';animation-duration:'+(7+Math.random()*9).toFixed(1)+'s;animation-delay:-'+(Math.random()*14).toFixed(1)+'s"></i>'}q.innerHTML=h}catch(e){}
function tip(){hn.textContent=tips[ti++%tips.length][ru?0:1]}
tip();tv=setInterval(function(){hn.style.opacity=0;setTimeout(function(){tip();hn.style.opacity=""},250)},2800);
function draw(){bar.style.width=cur.toFixed(1)+"%";pc.textContent=Math.floor(cur)+"%"}
var iv=setInterval(function(){cur+=(cap-cur)*k;if(cur>cap)cur=cap;draw()},50);
function st(p){if(p>cap&&p<100)cap=p;if(p>=60)T("Подключение к серверу…","Connecting…")}
try{if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",function(){st(45)});else st(45);addEventListener("load",function(){st(58)});document.fonts&&document.fonts.ready&&document.fonts.ready.then(function(){st(52)})}catch(e){}
function fin(){if(done)return;done=1;cap=100;k=.14;var w=Math.max(450,1400-(Date.now()-t0));setTimeout(function(){clearInterval(iv);cur=100;draw();T("Готово!","Done!");document.documentElement.classList.remove("ldw");setTimeout(function(){clearInterval(tv);el.className="out";setTimeout(function(){if(el.parentNode)el.parentNode.removeChild(el)},600)},250)},w)}
window.__ld={stage:st,done:fin};
setTimeout(fin,10000);setTimeout(function(){document.documentElement.classList.remove("ldw")},12000);
})();
}catch(e){try{console.error("[02_helpers.js #3]",e)}catch(_){}}
