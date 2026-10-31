/* 30_icons_cleanup.js — иконки новых миров, чистка интерфейса, подсветка топа
   (вынесено из index.html без изменений; порядок подключения — по номеру файла) */

/* ── скрипт #42 (id=newicons) ── */
try{
(function(){"use strict";
/* ===== 1. Мир 1 (Наруто): новые названия гачи ===== */
var NR=[
[['🗡️ Кунай','Kunai','kunai','#cfd6e4','#6b7488'],['🍜 Рамен Ичираку','Ichiraku Ramen','ramen','#ff9a3c','#c0301a'],['⭐ Сюрикен','Shuriken','shuriken','#dfe5f0','#5f6a80'],['🍡 Данго','Dango','dango','#ff9ec0','#c0507a']],
[['🥷 Повязка Конохи','Konoha Headband','headband','#4a7bff','#1d3a8a'],['💊 Пилюля чакры','Chakra Pill','pill','#3fd0ff','#1a6aff'],['📜 Взрывная печать','Explosive Tag','seal','#ff7a3c','#c0301a'],['🎭 Маска АНБУ','ANBU Mask','mask','#f4f1ea','#9a8f80']],
[['👥 Теневой клон','Shadow Clone','clone','#ffb347','#e07a10'],['🔥 Катон: Огненный шар','Fire Style: Fireball','fire','#ffd23c','#ff3c1a'],['💧 Суйтон: Водяной дракон','Water Style: Dragon','water','#6ee0ff','#1a6aff'],['🌪️ Футон: Великий прорыв','Wind Style: Breakthrough','wind','#bff5e0','#2aa88a']],
[['⚡ Райтон: Молния','Lightning Style','lightning','#fff27a','#3c7aff'],['🪨 Дотон: Каменная стена','Earth Style: Wall','earth','#d9a05a','#7a4a1a'],['🐸 Призыв жабы','Toad Summoning','toad','#7adf5a','#2a7a2a']],
[['👁️ Шаринган','Sharingan','sharingan','#e0141c','#7a0a10'],['🌀 Расенган','Rasengan','rasengan','#bfeaff','#1a8aff'],['⚡ Чидори','Chidori','chidori','#e8f6ff','#3c8aff']],
[['🧘 Режим мудреца','Sage Mode','sage','#ffb020','#c05a10'],['🔴 Мангекё Шаринган','Mangekyo Sharingan','mangekyo','#ff2a3c','#600a14'],['🛡️ Сусаноо','Susanoo','susanoo','#c58aff','#5a2a9a']],
[['🖤 Аматэрасу','Amaterasu','fire','#5a5a78','#0a0a12'],['🌠 Расенсюрикен','Rasenshuriken','rasenshuriken','#d8f0ff','#2a7aff'],['🦊 Режим Курамы','Kurama Mode','kurama','#ffb03c','#e0501a']],
[['🟣 Риннеган','Rinnegan','rinnegan','#c9a0f0','#6a3aa0'],['🌀 Камуи','Kamui','rasengan','#d09aff','#4a1a9a'],['☯️ Шесть Путей','Six Paths','sixpaths','#ffe9a0','#d08a20']],
[['👑 Шляпа Хокаге','Hokage Hat','hokage','#ff5a3c','#b01a1a'],['🌕 Лунный глаз','Infinite Tsukuyomi','moon','#fff0b0','#d0a040'],['✨ Чакра Хагоромо','Hagoromo Chakra','fire','#9ae8ff','#6a5aff']]];
var RC=['#9aa3b8','#5eea8a','#4da3ff','#b46cff','#ffb82e','#ff4d6d','#ff7ad9','#ffe98a','#56e0ff'],NAR={};
NR.forEach(function(r,ri){r.forEach(function(e){NAR[e[0]]={k:e[2],a:e[3],b:e[4],rc:RC[ri]}})});

try{window.gxRender&&window.gxRender()}catch(e){}try{render()}catch(e){}try{save();pushSoon()}catch(e){}
})();
}catch(e){try{console.error("[30_icons_cleanup.js #42]",e)}catch(_){}}

/* ── скрипт #43 (id=cleanui) ── */
try{
(function(){"use strict";
var st=document.createElement("style");
st.textContent=".sub,.adm-sub,#mobsub,#shgsub,#wdlist .tx span:nth-of-type(-n+2),.ac-note:not(#m_info):not(#own .ac-note),.ac-sub,.pbox .dsc{display:none!important}#toptabs,#topw{display:none!important}";
document.head.appendChild(st);
var RX=/^(Введи промокод|Переводи монеты|Покупай питомцев|Выбери мир|Питомцы покупаются|Управление игроками|Бросай, качай|Максимум 30 дней|Кто, когда и что)/;
var SELQ=".pbox div,.pbox p,.stage p";
function chk(e){if(e.children.length===0&&e.style.display!=="none"&&RX.test((e.textContent||"").trim()))e.style.display="none"}
function fixTop(){try{if(typeof topTab!=="undefined"&&topTab==="g"){topTab="c"+(window.topLW||0)}}catch(e){}}
function sweep(){fixTop();document.querySelectorAll(SELQ).forEach(chk)}
sweep();var t,q=new Set();
new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){var m=ms[i],n=m.target;if(n&&n.nodeType===3)n=n.parentNode;if(n&&n.nodeType===1)q.add(n);for(var j=0;j<m.addedNodes.length;j++){var a=m.addedNodes[j];if(a.nodeType===1)q.add(a)}}
clearTimeout(t);t=setTimeout(function(){var L=Array.from(q);q.clear();fixTop();L.forEach(function(n){if(!n.isConnected)return;if(n.matches&&n.matches(SELQ))chk(n);if(n.querySelectorAll)n.querySelectorAll(SELQ).forEach(chk)})},300)}).observe(document.body,{childList:true,subtree:true});
})();
}catch(e){try{console.error("[30_icons_cleanup.js #43]",e)}catch(_){}}

/* ── скрипт #44 (id=topfix) ── */
try{
(function(){var st=document.createElement("style");st.textContent="#toplist .ti.eq{background:linear-gradient(90deg,rgba(255,200,60,.28),rgba(255,140,30,.12))!important;border:2px solid #ffc23c!important;box-shadow:0 0 18px rgba(255,194,60,.55),inset 0 0 12px rgba(255,194,60,.18)!important;transform:scale(1.02)}#toplist .ti.eq .tx b{color:#ffe08a}";document.head.appendChild(st);
var el=document.getElementById("toptitle");if(el){var f=function(){var t=el.textContent;if(t.indexOf(" · ")>-1){el.textContent=t.split(" · ")[0]}};f();new MutationObserver(f).observe(el,{childList:true,characterData:true,subtree:true})}})();
}catch(e){try{console.error("[30_icons_cleanup.js #44]",e)}catch(_){}}
