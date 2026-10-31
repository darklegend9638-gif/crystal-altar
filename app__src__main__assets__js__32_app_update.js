/* 32_app_update.js — проверка обновления приложения (__BUILD__/__REPO__)
   (вынесено из index.html без изменений; порядок подключения — по номеру файла) */

/* ── скрипт #51 (id=app-update) ── */
try{
(function(){
"use strict";
/* ===== НАСТРОЙКА ===== */
var APP_BUILD=+"__BUILD__"||0;                    /* номер сборки подставляет GitHub Actions сам (run_number = число в теге build-N); в браузере без подстановки проверка выключена */
var REPO="__REPO__";if(REPO.indexOf("__")===0)REPO="darklegend9638-gif/crystal-altar";        /* GitHub-репозиторий с релизами */
var UPDATE_PAGE="https://crystal-altar-update.onrender.com";  /* страница скачивания APK */
var CHECK_EVERY=60*1000;         /* как часто проверять, мс */
/* Данные берутся из последнего релиза GitHub: тег с номером в конце (например v42), описание релиза = «что нового» */
var $=function(i){return document.getElementById(i)};
var ru=function(){try{return typeof LANG==="undefined"||LANG!=="en"}catch(e){return true}};
var T=function(a,b){return ru()?a:b};
var cur=null,shown=false;
function hide(){$("updM").classList.remove("show")}
function show(d){
 if(shown)return;
 var skip="";try{skip=localStorage.getItem("upd-skip")||""}catch(e){}
 
 shown=true;cur=d;
 $("updT").textContent="🚀 "+T("Доступно обновление","Update available");
 $("updX").textContent=d.notes||T("Вышла новая версия игры.","A new version of the game is out.");
 $("updV").textContent=T("Ваша сборка: ","Your build: ")+APP_BUILD+" → "+d.version;
 $("updGo").textContent=T("Обновить","Update");
 $("updNo").textContent=T("Позже","Later");
 $("updNo").style.display=d.force?"none":"";
 $("updM").classList.add("show");
}
$("updNo").onclick=function(){try{localStorage.setItem("upd-skip",String(cur.version))}catch(e){}shown=false;hide()};
$("updGo").onclick=function(){
 var u=((cur&&cur.url)||UPDATE_PAGE)+"?auto=1&b="+APP_BUILD;
 try{if(window.AndroidBridge&&typeof AndroidBridge.openUrl==="function"){AndroidBridge.openUrl(u);return}}catch(e){}
 try{location.href=u}catch(e){window.open(u,"_blank")}
};
function check(){
 if(!APP_BUILD)return;

 fetch("https://api.github.com/repos/"+REPO+"/releases/latest",{cache:"no-store"}).then(function(r){return r.ok?r.json():null}).then(function(j){
  if(!j)return;var m=/(\d+)\s*$/.exec(j.tag_name||"");if(!m)return;var n=+m[1];
  if(n>APP_BUILD)show({version:n,url:UPDATE_PAGE,notes:String(j.body||"").replace(/\r/g,"").trim().slice(0,600),force:true});
 }).catch(function(){});
}
check();setTimeout(check,1500);setInterval(check,CHECK_EVERY);addEventListener("online",check);
document.addEventListener("visibilitychange",function(){!document.hidden&&check()});
window.__checkUpdate=check;
})();
}catch(e){try{console.error("[32_app_update.js #51]",e)}catch(_){}}
