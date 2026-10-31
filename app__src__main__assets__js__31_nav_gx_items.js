/* 31_nav_gx_items.js — навигация, названия/иконки гач, новые предметы и токены
   (вынесено из index.html без изменений; порядок подключения — по номеру файла) */

/* ── скрипт #45 (id=center-nav) ── */
try{
(function(){function w(){var m=document.getElementById("mobb");if(!m||document.getElementById("navrow"))return;var r=document.createElement("div");r.id="navrow";m.parentNode.insertBefore(r,m);["mobb","dgb","skb"].forEach(function(id){var e=document.getElementById(id);if(e)r.appendChild(e)})}w();setTimeout(w,300)})();
}catch(e){try{console.error("[31_nav_gx_items.js #45]",e)}catch(_){}}

/* ── скрипт #46 (id=gx-uniform-icons) ── */
try{
window.__GXI={coins:["","","","","",""],books:["assets/img/279_ff7b66b2ae.webp","assets/img/280_cda7c78989.webp","assets/img/281_8ab8cba9f3.webp","assets/img/282_5ef289d7c4.webp","assets/img/283_091bc2ab76.webp","assets/img/284_aaa8f3187a.webp","assets/img/285_a0692664b2.webp","assets/img/286_d149c8e960.webp","assets/img/287_5f032e4727.webp"]};window.__gxIcon=function(w,i){var G=window.__GXI;return w===6?G.books[Math.min(8,Math.max(0,i|0))]:(G.coins[w]||G.coins[0])};try{window.gxRender&&window.gxRender()}catch(e){}
}catch(e){try{console.error("[31_nav_gx_items.js #46]",e)}catch(_){}}

/* ── скрипт #47 (id=gx-names) ── */
try{
window.__GXN=[["Sharingan", "Byakugan", "Ketsuryugan", "Jogan", "Tenseigan", "Rinnegan", "Rinne Sharingan", "Kokugan", "Senrigan"], ["Human", "Namekian", "Androide", "Saiyan", "Majin", "Kaioshin", "GOD", "Angel", "Zen'oh"], ["Sanje", "Zorro", "Mehowk", "Royleigh", "Luffe", "Beard White", "Gol De Rogar", "Shunks", "Imu Sama"], ["Wagenor", "Sprenger", "Leonart", "Zohe", "Broun", "Rezz", "Yeagor", "Ackermon", "Fritz"], ["Fighter", "Assassin", "Ranger", "Mage", "Tank", "Necromancer", "Shadow Monarch", "Soul Striker", "White Shadow"], ["Rui", "Daki", "Gyutaro", "Gyokko", "Hantengu", "Akaza", "Douma", "Kokushibo", "Muzan"], ["Earth Grimoire", "Wind Grimoire", "Water Grimoire", "Fire Grimoire", "Lightning Grimoire", "Darkness Grimoire", "Light Grimoire", "Anti Magic Grimoire", "Time Grimoire"]];window.__gxName=function(w,i){var a=window.__GXN[w];return a&&a[i]?a[i].replace(/&/g,"&amp;").replace(/</g,"&lt;"):null};try{window.gxRender&&window.gxRender()}catch(e){}
}catch(e){try{console.error("[31_nav_gx_items.js #47]",e)}catch(_){}}

/* ── скрипт #48 (id=gx-titles) ── */
try{
window.__gxTitle=function(w){return["Dojutsu","Races","Hakis","Survey Corps","Hunter Class","Demon Moons","Grimoires"][w]||"Gacha"};try{window.gxRender&&window.gxRender()}catch(e){}try{typeof render==="function"&&render()}catch(e){}
}catch(e){try{console.error("[31_nav_gx_items.js #48]",e)}catch(_){}}

/* ── скрипт #49 (id=new-item-icons) ── */
try{
(function(){"use strict";
var IC=["assets/img/288_ae3ba9308d.webp", "assets/img/289_34ee3c1e6c.webp", "assets/img/290_1c6126beb9.webp", "assets/img/291_5bcd393c02.webp", "assets/img/292_550ef4d091.webp", "assets/img/293_c1fb96d495.webp", "assets/img/294_0f2307fac7.webp", "assets/img/295_24d9c231fb.webp", "assets/img/296_8b2193bd1d.webp", "assets/img/297_c590fd7ba1.webp", "assets/img/298_160bd01756.webp", "assets/img/299_8b19cdf65c.webp", "assets/img/300_5a86c0e512.webp", "assets/img/301_55e8c27d10.webp", "assets/img/302_1dab60f9e5.webp", "assets/img/303_2dc10ccf28.webp", "assets/img/304_ceb8143748.webp", "assets/img/305_e6e689b4f7.webp", "", "assets/img/307_ac087cd130.webp", "assets/img/308_6fe2a2c29a.webp", "assets/img/309_2831484fba.webp", "assets/img/310_8bb95cfec8.webp", "assets/img/311_5f749fa419.webp", "assets/img/312_d0da1d370e.webp", "assets/img/313_045fe5e28b.webp", "assets/img/314_b981557bd0.webp", "assets/img/315_ac416a4cbe.webp", "assets/img/316_01200f070d.webp", "assets/img/317_1020aad97a.webp", "assets/img/318_a5462c40b9.webp", "assets/img/319_f03cef0f03.webp", "assets/img/320_fd19594647.webp", "assets/img/321_830c485bb6.webp", "assets/img/322_79186cb109.webp", "assets/img/323_40bfe3ecf6.webp", "assets/img/324_580a6c053d.webp", "assets/img/325_e39613a543.webp", "assets/img/326_b057d4629e.webp", "assets/img/327_6694881ab1.webp", "assets/img/328_1b576b1dc0.webp", "assets/img/329_e562ede3bb.webp", "assets/img/330_ec3149da02.webp", "assets/img/331_54d0f26669.webp", "assets/img/332_7c83f4e3b8.webp", "assets/img/333_696dbdd956.webp", "assets/img/334_086a52cb87.webp", "assets/img/335_8230580056.webp", "assets/img/336_b8ced503de.webp", "assets/img/337_a170e754e3.webp", "assets/img/338_4aab0111db.webp", "assets/img/339_c1b87ece8e.webp", "assets/img/340_eb1fabb1db.webp", "assets/img/341_7454974d0c.webp", "assets/img/342_4b6c2aaebd.webp", "assets/img/343_3e7f8a2ba5.webp", "assets/img/344_39988f9418.webp", "assets/img/345_c45fe7ea73.webp", "assets/img/346_2a22cf3342.webp", "assets/img/347_592ba4db6f.webp", "assets/img/348_93c6949d95.webp", "assets/img/349_e50c871da9.webp", "assets/img/350_20fd848558.webp", "assets/img/351_8ec6803cca.webp"];
var BYKEY={"🧑 Human": 52, "🟢 Namekian": 51, "🐒 Saiyan": 49, "🤖 Androide": 50, "🍬 Majin": 26, "🧝 Kaioshin": 48, "🐱 GOD": 47, "👼 Angel": 46, "👑 Zen'oh": 45, "🚬 Sanje": 44, "⚔️ Zorro": 43, "🦅 Mehowk": 42, "🧓 Royleigh": 41, "👒 Luffe": 40, "🧔 Beard White": 39, "🏴‍☠️ Gol De Rogar": 38, "🍶 Shunks": 37, "🕴️ Imu Sama": 36, "🧑 Wagenor": 35, "🧒 Sprenger": 34, "👱 Leonart": 33, "🕶️ Zohe": 32, "🛡️ Broun": 31, "👩 Rezz": 30, "🧑‍🦱 Yeagor": 29, "🗡️ Ackermon": 28, "🏛️ Fritz": 27, "🥊 Fighter": 22, "🗡️ Assassin": 25, "🏹 Ranger": 24, "🔮 Mage": 23, "🛡️ Tank": 21, "💀 Necromancer": 20, "👊 Soul Striker": 62, "❄️ White Shadow": 18, "🕸️ Rui": 17, "🎀 Daki": 16, "🏺 Gyokko": 14, "😭 Hantengu": 13, "🥊 Akaza": 12, "❄️ Douma": 11, "🌙 Kokushibo": 10, "🩸 Muzan": 9, "🪨 Earth": 8, "🌪️ Wind": 7, "💧 Water": 6, "🔥 Fire": 5, "⚡ Lightning": 4, "✨ Light": 3, "🗡️ Anti Magic": 2, "⏳ Time Magic": 1, "💡 Light": 3, "🌩️ Lightning": 4, "🌑 Darkness": 63, "🌑 Shadow Monarch": 64};
var GX={"0": [60, 59, 58, 57, 56, 61, 55, 54, 53], "1": [52, 51, 50, 49, 26, 48, 47, 46, 45], "2": [44, 43, 42, 41, 40, 39, 38, 37, 36], "3": [35, 34, 33, 32, 31, 30, 29, 28, 27], "4": [22, 25, 24, 23, 21, 20, 64, 62, 18], "5": [17, 16, 15, 14, 13, 12, 11, 10, 9], "6": [8, 7, 6, 5, 4, 63, 3, 2, 1]};
var ic=function(n){return n>0?IC[n-1]:null};
/* карточки гачи миров: свои иконки вместо одинаковой монеты */
var og=window.__gxIcon;
window.__gxIcon=function(w,i){var a=GX[w],n=a&&a[i|0];return ic(n)||(og?og(w,i):null)};
/* плитки предметов: та же иконка, без рамки-плитки */
var oe=window.__eyeCard;
if(typeof oe==="function"){window.__eyeCard=function(t,i,c){
 var h=oe.apply(this,arguments),u=ic(BYKEY[t]);
 if(u&&c)h=h.replace(/<div class="e">[\s\S]*?<\/div>/,'<div class="e"><img class="gximg" src="'+u+'" alt=""></div>');
 return h}}
var st=document.createElement("style");
st.textContent=".it.ey .e{display:flex!important;align-items:center!important;justify-content:center!important;width:100%!important;margin:0 auto!important;font-size:0!important;line-height:0!important}"
+".it.ey .e img.gximg,.gxw .it.ey .e img.gximg,.gx-cur .it.ey .e img.gximg{width:84px!important;height:84px!important;min-width:84px;max-width:84px!important;min-height:84px;max-height:84px!important;margin:0 auto!important;padding:0!important;display:block!important;object-fit:contain!important;object-position:center center!important;border-radius:0!important;box-shadow:none!important}";
document.head.appendChild(st);
try{window.gxRender&&window.gxRender()}catch(e){}
try{typeof render==="function"&&render()}catch(e){}
})();
}catch(e){try{console.error("[31_nav_gx_items.js #49]",e)}catch(_){}}

/* ── скрипт #50 (id=new-tokens) ── */
try{
(function(){try{var U=["assets/img/352_90f067c7e5.webp", "assets/img/353_76eec58c12.webp", "assets/img/354_5e99c5aef7.webp", "assets/img/355_88e166ec79.webp", "assets/img/356_3cfe4286af.webp", "assets/img/357_8d85eb5ff9.webp", "assets/img/358_8a2e0a6a87.webp"],T=window.__TIMG,M=window.__TMAP,G=window.__GXI;
for(var w=0;w<U.length;w++){if(M&&T&&M[w])for(var g=0;g<2;g++){if(M[w][g]>=0)T[M[w][g]]=U[w]}if(G&&G.coins&&w<G.coins.length)G.coins[w]=U[w]}
}catch(e){}
try{window.gxRender&&window.gxRender()}catch(e){}try{typeof render==="function"&&render()}catch(e){}
setTimeout(function(){try{window.gxRender&&window.gxRender();render()}catch(e){}},900);
})();
}catch(e){try{console.error("[31_nav_gx_items.js #50]",e)}catch(_){}}
