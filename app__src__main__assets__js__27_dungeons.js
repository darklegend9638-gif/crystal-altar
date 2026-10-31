/* 27_dungeons.js — данжи
   (вынесено из index.html без изменений; порядок подключения — по номеру файла) */

/* ── скрипт #36 (id=dungeons) ── */
try{
(function(){"use strict";
const $=id=>document.getElementById(id),M=window.__mobs;
const UP=[
 {k:"dmg",e:"⚔️",ru:"Урон",en:"Damage",d:["Макс ×7.5 урона","Max ×7.5 damage"],b:10,g:1.08,max:75},
 {k:"coin",e:"🪙",ru:"Монеты",en:"Coins",d:["Макс ×7.5 монет с дохода","Max ×7.5 coin income"],b:20,g:1.09,max:75},
 {k:"luck",e:"🍀",ru:"Удача",en:"Luck",d:["Макс +11 удачи","Max +11 luck"],b:30,g:1.1,max:75},
 {k:"drop",e:"🎁",ru:"Дроп с данжей",en:"Dungeon drops",d:["Макс ×2 токенов, монет данжа и ключей","Max ×2 tokens, dungeon coins and keys"],b:15,g:1.09,max:75},
];
const dgW=()=>S.w|0;
const dupOf=()=>{if(!S.dupw||typeof S.dupw!=="object"){S.dupw={};if(S.dup&&typeof S.dup==="object")S.dupw[0]=Object.assign({},S.dup)}const w=0;return S.dupw[w]||(S.dupw[w]={})};
const lv=k=>{const w=0,d=S.dupw?S.dupw[w]:(w===0?S.dup:null);return(d&&d[k])|0};
const dtOf=()=>{const w=dgW();return S.dtw?(+S.dtw[w]||0):(w===0?(S.dt|0):0)};
const addDt=(w,n)=>{if(!S.dtw||typeof S.dtw!=="object"){S.dtw={};if(S.dt)S.dtw[0]=S.dt|0}S.dtw[w]=Math.min(999e33,Math.max(0,(+S.dtw[w]||0)+n))};
const NOWV={dmg:()=>"×"+(dgDmg.raw||dgDmg)().toFixed(2)+" (+0.09/"+L2("ур.","lv.")+")",coin:()=>"×"+(dgCoin.raw||dgCoin)().toFixed(2)+" (+0.09/"+L2("ур.","lv.")+")",luck:()=>"+"+(dgLuck.raw||dgLuck)(),drop:()=>"×"+(dgDropMul.raw||dgDropMul)().toFixed(2)+" (+0.01/"+L2("ур.","lv.")+")"};
const upCost=u=>Math.ceil(u.b*Math.pow(u.g,lv(u.k)));
window.dgDmg=()=>1+6.5*lv("dmg")/75;
window.dgCoin=()=>1+6.5*lv("coin")/75;
window.dgLuck=()=>Math.floor(lv("luck")*11/75+1e-9);
window.dgDropCoin=()=>1;
window.dgDropMul=()=>1+lv("drop")/75;
window.enCap=()=>200+20*lv("pow");
window.enRate=()=>1+.05*(typeof petInc==="function"?petInc():0)+(window.cpSpd?cpSpd():0)+.25*lv("pow");
window.enNow=()=>(typeof S.en==="number"?S.en:0);
window.enUse=x=>true;
window.dkOf=()=>((S.dkey&&S.dkey[S.w])|0);
const KP=[.02,.03,.05,.08,.12,.2];
window.dgKeyRoll=t=>{try{if(Math.random()<KP[t]*dgDropMul()){if(!S.dkey||typeof S.dkey!=="object")S.dkey={};S.dkey[S.w]=Math.min(99,dkOf()+1);0}}catch(e){}};
function tick(){try{if(!ready)return;const now=Date.now();
 if(typeof S.en!=="number"){S.en=20;S.et=now}
 let dt=S.et?(now-S.et)/1000:0;if(!(dt>0))dt=0;S.et=now;
 S.en=Math.min(enCap(),S.en+dt*enRate());lbl();
 const q=$("dgp");if(q&&q.style.display==="block"&&$("pwrap").classList.contains("open")&&!run)list()}catch(e){}}
setInterval(tick,1000);
const DW=[
 {ic:"🌲",n:["Лес Смерти","Forest of Death"],c:"#ff9a3d",boss:["👁️","Itache","Itache"],f:[["Опушка","Edge"],["Чаща","Thicket"],["Башня","Tower"]]},
 {ic:"⏳",n:["Комната духа и времени","Hyperbolic Time Chamber"],c:"#ffd23f",boss:["💥","Brolew","Brolew"],f:[["Белая пустота","White Void"],["Гравитация ×100","Gravity ×100"],["Врата","Gate"]]},
 {ic:"⛓️",n:["Импел Даун","Impel Down"],c:"#5cb4ff",boss:["🌊","White Beard","White Beard"],f:[["Уровень 1","Level 1"],["Уровень 3","Level 3"],["Уровень 6","Level 6"]]},
 {ic:"🏰",n:["Стены Марии","Walls of Maria"],c:"#8fd36b",boss:["🛡️","Armored Titan","Armored Titan"],f:[["Окраина","Outskirts"],["Лес гигантских деревьев","Giant Forest"],["Подземелье","Underground"]]},
 {ic:"🌀",n:["Двойное подземелье","Double Dungeon"],c:"#b987ff",boss:["🐜","Beleon","Beleon"],f:[["Зал гоблинов","Goblin Hall"],["Коридор теней","Shadow Corridor"],["Храм","Temple"]]},
 {ic:"🏯",n:["Крепость Бесконечности","Infinity Castle"],c:"#ff5c7a",boss:["🌙","Kokeshebo","Kokeshebo"],f:[["Тёмный зал","Dark Hall"],["Лабиринт комнат","Room Maze"],["Тронный зал","Throne Room"]]},
 {ic:"🌊",n:["Подводный храм","Underwater Temple"],c:"#1ee3cf",boss:["👿","Lucies","Lucies"],f:[["Затопленный порт","Flooded Port"],["Зал колонн","Pillar Hall"],["Алтарь дьявола","Devil's Altar"]]}];
{const _o=DW.slice(),_n=_o.slice();DW.length=0;_n.forEach(x=>DW.push(x))}
const WAVES=50,WT=30;
const tierOf=w=>Math.min(5,Math.floor((w-1)/9));
const isBoss=w=>w%10===0;
const cntOf=w=>isBoss(w)?1:Math.min(10,3+Math.floor(w/8));
const MS={10:1,20:2,30:3,40:5,50:10};
const eHp=w=>Math.ceil(M.hpOf(0)*Math.pow(1.14,w-1)*(isBoss(w)?8:1)*(w===WAVES?3:1));
let run=null,spd=1,auto=false;
const el=h=>{const d=document.createElement("div");d.innerHTML=h;return d.firstElementChild};
const css=document.createElement("style");css.textContent=`
.dg-ban{position:relative;overflow:hidden;display:flex;align-items:center;gap:14px;padding:16px;border-radius:20px;background:linear-gradient(135deg,color-mix(in srgb,var(--dc) 55%,#0a0820),rgba(8,6,24,.95));border:1px solid color-mix(in srgb,var(--dc) 65%,transparent);box-shadow:0 0 34px -10px var(--dc),inset 0 1px 0 rgba(255,255,255,.14)}
.dg-ban .e{font-size:48px;line-height:1;filter:drop-shadow(0 4px 10px rgba(0,0,0,.6))}
.dg-ban b{display:block;font:800 18px var(--fh);color:#fff;letter-spacing:-.01em}
.dg-ban span{display:block;font-size:12.5px;color:rgba(255,255,255,.75);margin-top:3px}
.dg-chips{display:flex;gap:8px;margin:10px 0;flex-wrap:wrap}
.dg-chip{flex:1;min-width:92px;padding:9px 10px;border-radius:14px;background:rgba(255,255,255,.06);border:1px solid var(--line);font-weight:800;font-size:14px;text-align:center}
.dg-chip small{display:block;font-size:11px;color:var(--mute);font-weight:700}
.dg-card{box-shadow:0 0 22px -12px var(--cc)}
.dg-up{display:flex;align-items:center;gap:10px;padding:10px 12px;margin-top:8px;border-radius:16px}
.dg-up .ue{font-size:26px;width:34px;text-align:center;flex:none}
.dg-up .ut{flex:1;min-width:0;line-height:1.3}.dg-up .ut b{font:800 14px var(--fh)}.dg-up .ut span{display:block;font-size:12px;color:var(--mute)}
.dg-arena{position:relative;overflow:hidden;padding:14px;text-align:center;border-radius:20px;background:radial-gradient(120% 90% at 50% 0%,color-mix(in srgb,var(--dc) 40%,transparent),rgba(10,8,30,.94) 70%);border:1px solid color-mix(in srgb,var(--dc) 60%,transparent);box-shadow:0 0 36px -10px var(--dc)}
.dg-arena.boss .mob-em{animation:dgboss 1.1s ease-in-out infinite;font-size:96px}
@keyframes dgboss{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}
.dg-h2{font:800 15px var(--fh);margin:16px 0 2px}
.dg-bar{display:flex;gap:8px;align-items:center;justify-content:center;margin-bottom:10px}
.dg-pill{padding:8px 14px;border-radius:14px;background:#0b0b12;border:2px solid rgba(255,255,255,.18);color:#fff;font:800 14px var(--fb);box-shadow:0 4px 12px -6px #000;white-space:nowrap}
.dg-pill.big{font-size:20px;padding:9px 20px;border-color:color-mix(in srgb,var(--dc) 70%,#fff 10%)}
.dg-pill.low{color:#ff5c6c;border-color:#ff5c6c}
.dg-leave{width:100%;margin-top:10px;background:linear-gradient(180deg,#ff5c6c,#c01830)!important;color:#fff!important;font:900 18px var(--fb)!important;letter-spacing:.04em;border:2px solid #ffb3bb!important;text-shadow:0 2px 0 rgba(0,0,0,.4)}
.dg-go{width:100%;margin-top:12px;padding:16px!important;font:900 18px var(--fb)!important;background:linear-gradient(135deg,#8b5cf6,#38bdf8)!important;color:#fff!important;border-radius:16px!important;box-shadow:0 12px 26px -10px rgba(110,90,255,.85),inset 0 1px 0 rgba(255,255,255,.4),inset 0 -4px 0 rgba(0,0,0,.2)!important}
.dg-go:disabled{opacity:.45}
.dg-rec{display:flex;align-items:center;padding:12px 14px;border-radius:16px;margin-top:2px}
.bpg{display:grid;grid-template-columns:repeat(10,1fr);gap:4px;margin-top:10px}.bpc{text-align:center;border-radius:8px;padding:3px 0;font-size:10px;background:rgba(255,255,255,.05);border:1px solid var(--line);line-height:1.2}.bpc i{display:block;font-style:normal;font-size:11px}.bpc.done{background:color-mix(in srgb,var(--dc) 40%,#000);border-color:var(--dc)}.bpc.cur{border-color:#ffd86b;box-shadow:0 0 8px #ffd86b}.bpn{font-size:12.5px;color:var(--mute);line-height:1.5}.dg-rec small{display:block;color:var(--mute);font-size:11px;font-weight:700}.dg-rec b{font:800 17px var(--fh)}
`;document.head.appendChild(css);
const p=el('<div id="dgp" class="glass stage pbox" style="display:none;text-align:left"><button class="alt pclose" aria-label="Закрыть"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7l10 10M17 7L7 17"/></svg></button> <b class="hd">🏰 Данжи</b><div id="dgtop" style="margin-top:10px"></div><div id="dgl"></div><div id="dgr" style="display:none"><div class="dg-bar"><div class="dg-pill">👾 <b id="dgcnt">0/0</b></div><div class="dg-pill big">Wave <b id="dgwv">1</b>/50</div><div class="dg-pill" id="dgtm">0:30</div></div><div class="dg-arena" id="dga"><div id="dgfl" class="mob-tier"></div><div id="dgem" class="mob-em" role="button"></div><div id="dgnm" class="mob-nm"></div><div class="mob-bar"><i id="dghp" style="width:100%"></i></div><div id="dghpt" class="mob-hpt"></div><div id="dgbank" class="mob-prog"></div><div id="dgen2" class="mob-eng"></div></div><div class="row" style="margin-top:10px"><button class="alt" id="dgsp" type="button">⏩ x1</button><button class="alt" id="dgau" type="button">🔁 Авто: выкл</button></div><button id="dgx" type="button" class="dg-leave"></button></div><div id="dgmsg" style="min-height:22px;margin-top:10px;font-weight:700;text-align:center"></div></div>');
$("pwrap").appendChild(p);
const mb=$("mobb");if(mb)mb.insertAdjacentHTML("afterend",'<button class="alt" id="dgb" type="button"><span>🏰 Данжи</span></button>');
function lbl(){const b=$("dgb");if(b){const t="🏰 "+L2("Данжи","Dungeons")+" · 🔑 "+dkOf();const s=b.firstElementChild||b;if(s.textContent!==t)s.textContent=t}}
function enemy(wd,wave,idx){
 if(wave===WAVES)return DW[wd].boss;
 if(isBoss(wave))return M.MOBS[wd][Math.min(5,wave/10+1)];
 return M.MOBS[wd][Math.max(0,tierOf(wave)-(idx%2))];
}
const best=w=>((S.dgbest&&S.dgbest[w])|0);
const BPL=50;
const bpDone=w=>Math.min(BPL,((S.dgl&&S.dgl[w])|0));
const bpRew=L=>({t0:5+L*2,dt:10+L*5,key:1,gem:L%10===0?10:(L%5===0?3:0)});
function bpGive(w,L){
 const r=bpRew(L);
 if(r.t0)tokAdd(w,0,r.t0);
 addDt(w,r.dt);
 if(!S.dkey||typeof S.dkey!=="object")S.dkey={};S.dkey[w]=Math.min(99,((S.dkey[w])|0)+r.key);
 if(r.gem)S.gem=(S.gem||0)+r.gem;
}
function bpRewTxt(L){const r=bpRew(L);return "🎟"+r.t0+" · 🔷"+r.dt+" · 🔑"+r.key+(r.gem?" · 💎"+r.gem:"")}
function bpHtml(w,W){
 bpSync(w);const d=bpDone(w),b=best(w),tg=Math.min(WAVES,b+1);
 let g="";for(let L=1;L<=BPL;L++){const st=L<=d?"done":(L===d+1?"cur":"lock");
  g+='<div class="bpc '+st+'" title="'+bpRewTxt(L)+'"><b>'+L+'</b><i>'+(st==="done"?"✓":(L%10===0?"💎":(L%5===0?"🎁":"•")))+'</i></div>'}
 const nx=d<BPL?'<div class="bpn">'+L2("Следующий уровень ","Next level ")+(d+1)+": "+bpRewTxt(d+1)+'<br>'+L2("Каждая новая волна выше рекорда (",'Each new wave above your best (')+b+L2(") = +1 уровень. Нужно пройти волну ",") = +1 level. Clear wave ")+'<b>'+tg+'</b>.<br>'+L2("Если вышел — снова дойди до волны "+b+" и пройди дальше, чтобы получить следующие уровни.","If you leave, reach wave "+b+" again and go further to earn more levels.")+'</div>':'<div class="bpn">🏆 '+L2("Батлпасс мира пройден","World pass complete")+'</div>';
 return '<div class="dg-h2">🎖 '+L2("Батлпасс мира","World pass")+' · '+L2("ур.","lv.")+' '+d+'/'+BPL+'</div><div class="glass dg-rec" style="display:block"><div class="mob-bar" style="margin:0 0 8px"><i style="width:'+(d/BPL*100)+'%;background:'+W.c+'"></i></div>'+nx+'<div class="bpg">'+g+'</div></div>';
}
function bpSync(w){
 const b=Math.min(BPL,best(w));let d=bpDone(w),n=0;
 while(d<b){d++;if(!S.dgl||typeof S.dgl!=="object")S.dgl={};S.dgl[w]=d;bpGive(w,d);n++}
 if(n&&run&&run.w===w){run.bpl=(run.bpl||0)+n;try{toast("🎖 "+L2("Батлпасс: уровень ","Pass level ")+d+(n>1?" (+"+n+")":"")+" · "+bpRewTxt(d),"ok")}catch(e){}}
}

const tkOf=(wave,wd)=>Math.max(1,Math.ceil(wave/4*(1+.4*wd)));
const cnOf=(wave)=>Math.floor(M.rwd(Math.min(5,tierOf(wave)))*(1+wave*.2));
function list(){
 const w=S.w,W=DW[w];
 p.style.setProperty("--dc",W.c);
 const b=best(w);
 $("dgtop").innerHTML='<div class="dg-ban" style="--dc:'+W.c+'"><div class="e">'+W.ic+'</div><div><b>'+esc(L2(W.n[0],W.n[1]))+'</b><span>'+WORLDS[w].ic+' '+esc(L2(WORLDS[w].ru,WORLDS[w].en))+' · '+WAVES+' '+L2("волн","waves")+' · '+L2("финал: ","final: ")+esc(L2(W.boss[1],W.boss[2]))+' '+W.boss[0]+'</span></div></div>'
 +'<div class="dg-chips"><div class="dg-chip"><small>🔑 '+L2("Ключи","Keys")+'</small>'+dkOf()+'</div><div class="dg-chip"><small>🔷 '+L2("Токены","Tokens")+'</small>'+fmt(dtOf())+'</div></div>'
 +'<div class="glass dg-rec"><div><small>🏆 '+L2("Рекорд","Best")+'</small><b>'+b+' / '+WAVES+'</b></div><div class="mob-bar" style="flex:1;margin:0 0 0 12px"><i style="width:'+(b/WAVES*100)+'%;background:'+W.c+'"></i></div></div>'
 +bpHtml(w,W)+'<button id="dggo" class="dg-go" data-go="1" '+(dkOf()<1?'disabled':'')+'>▶ '+L2("Начать данж","Start dungeon")+' · 🔑 1</button>'
 +'<div style="color:var(--mute);font-size:12.5px;margin:8px 0">'+L2("Волна 30 с, боссы каждые 10 волн. Награды за каждую волну: 🔷 токены и 🪙 монеты, 💎 за 10/20/30/40/50. Не успел — забираешь всё, что набрал. Ключи падают с мобов этого мира. ","30 s per wave, bosses every 10 waves. Each wave pays 🔷 tokens and 🪙 coins, 💎 at 10/20/30/40/50. Time out — you keep what you earned. Keys drop from this world's mobs. ")+L2("Авто-удары бьют сами, без лимита.","Auto-hits strike on their own, no limit.")+'</div>';
 $("dgl").innerHTML='<div class="dg-h2">🔷 '+L2("Прокачка данжа","Dungeon upgrades")+'</div>'+UP.map(u=>{const l=lv(u.k),mx=l>=u.max,c=upCost(u);
  return '<div class="glass dg-up"><div class="ue">'+u.e+'</div><div class="ut"><b>'+L2(u.ru,u.en)+' · '+L2("ур.","lv.")+' '+l+'/'+u.max+(mx?' MAX':'')+'</b><span>'+L2(u.d[0],u.d[1])+'</span><span style="color:var(--c1);font-weight:800">'+L2("Сейчас: ","Now: ")+NOWV[u.k]()+'</span></div><button data-u="'+u.k+'" style="flex:none" '+(mx||dtOf()<c?'disabled':'')+'>'+(mx?'MAX':'🔷 '+fmt(c))+'</button></div>'}).join("");
}
function showRun(on){$("dgl").style.display=on?"none":"";$("dgtop").style.display=on?"none":"";$("dgr").style.display=on?"block":"none"}
function paint(){
 if(!run)return;const W=DW[run.w],boss=isBoss(run.wave),m=enemy(run.w,run.wave,run.k);
 p.style.setProperty("--dc",W.c);$("dga").style.setProperty("--dc",W.c);$("dga").classList.toggle("boss",boss);
 const col=boss?"#ffd86b":M.TC[Math.min(5,tierOf(run.wave))];$("dga").style.setProperty("--tc",col);
 $("dgwv").textContent=run.wave;$("dgcnt").textContent=run.k+"/"+run.cnt;
 const t=Math.max(0,Math.ceil(run.time));$("dgtm").textContent="0:"+(t<10?"0":"")+t;$("dgtm").classList.toggle("low",t<=8);
 $("dgfl").textContent=boss?"👑 "+L2("БОСС","BOSS")+(run.wave===WAVES?" · "+L2("ФИНАЛ","FINAL"):""):L2(W.f[Math.min(2,Math.floor((run.wave-1)/17))][0],W.f[Math.min(2,Math.floor((run.wave-1)/17))][1]);$("dgfl").style.color=col;
 const em=$("dgem");if(em.textContent!==m[0])em.textContent=m[0];
 $("dgnm").textContent=L2(m[1],m[2]);
 $("dghp").style.width=Math.max(0,run.hp/run.max*100)+"%";$("dghp").style.background=col;
 $("dghpt").textContent="❤️ "+fmt(Math.max(0,Math.ceil(run.hp)))+" / "+fmt(run.max);
 $("dgbank").textContent="🔷 +"+fmt(run.tk)+" · 🪙 +"+fmt(run.coins)+(run.gems?" · 💎 +"+run.gems:"");
 $("dgen2").textContent="";
 $("dgx").textContent="🚪 LEAVE";
}
function start(){
 if(run||!ready)return;
 if(dkOf()<1)return toast(L2("Нет ключей — они падают с мобов","No keys — mobs drop them"),"err");
 if(!S.dkey||typeof S.dkey!=="object")S.dkey={};
 S.dkey[S.w]=dkOf()-1;save();lbl();
 run={w:S.w,wave:1,k:0,cnt:cntOf(1),time:WT,max:1,hp:1,tk:0,coins:0,gems:0,bpl:0};run.max=run.hp=eHp(1);
 $("dgmsg").textContent="";showRun(true);paint();
}
function finish(win,flee){
 const r=run;run=null;showRun(false);
 S.coins+=r.coins;S.gem=(S.gem||0)+r.gems;addDt(r.w,r.tk);
 try{render()}catch(e){}save();try{pushSoon()}catch(e){}
 const done=r.wave-(win?0:1);
 $("dgmsg").style.color=win?"var(--c1)":"var(--c5)";
 $("dgmsg").textContent=(win?"🏆 "+L2("Данж пройден! ","Dungeon cleared! "):flee?"🚪 "+L2("Ты вышел. ","You left. "):"⏱ "+L2("Время вышло. ","Time out. "))+L2("Волн: ","Waves: ")+Math.max(0,done)+" · 🔷 +"+fmt(r.tk)+" · 🪙 +"+fmt(r.coins)+(r.gems?" · 💎 +"+r.gems:"");
 list();
 if(auto&&!flee)setTimeout(()=>{if(!run&&dkOf()>0)start()},700);
}
function waveClear(){
 const wv=run.wave;
 run.tk+=Math.ceil(tkOf(wv,run.w)*dgDropMul());run.coins+=Math.floor(cnOf(wv)*dgDropMul());
 if(!S.dgbest||typeof S.dgbest!=="object")S.dgbest={};
 if(wv>best(run.w)){S.dgbest[run.w]=wv;bpSync(run.w)}
 if(MS[wv]){if(!S.dgm||typeof S.dgm!=="object")S.dgm={};const key=run.w+"-"+wv;if(!S.dgm[key]){S.dgm[key]=1;run.gems+=MS[wv]}}
 if(wv>=WAVES){finish(true);return}
 run.wave++;run.k=0;run.cnt=cntOf(run.wave);run.time=WT;run.max=run.hp=eHp(run.wave);
}
function dmgNow(n){
 if(!run)return;run.hp-=n;
 if(run.hp<=0){
  run.k++;
  if(run.k>=run.cnt){waveClear();if(!run)return}
  else run.max=run.hp=eHp(run.wave);
 }
 paint();
}
$("dgem").onclick=()=>{if(run&&ready)dmgNow(M.dmg())};
$("dgx").onclick=()=>{if(run)finish(false,true)};
$("dgsp").onclick=()=>{spd=spd>=3?1:spd+1;$("dgsp").textContent="⏩ x"+spd};
$("dgau").onclick=()=>{auto=!auto;$("dgau").textContent=auto?"🔁 Авто: вкл":"🔁 Авто: выкл"};
$("dgtop").onclick=e=>{const b=e.target.closest("button[data-go]");if(b&&!b.disabled)start()};
$("dgl").onclick=e=>{
 const b=e.target.closest("button");if(!b||b.disabled)return;
 if(b.dataset.u){const u=UP.find(x=>x.k===b.dataset.u);if(!u)return;const c=upCost(u);
  if(lv(u.k)>=u.max||dtOf()<c)return;
  addDt(dgW(),-c);dupOf()[u.k]=lv(u.k)+1;
  try{render()}catch(e){}save();try{pushSoon()}catch(e){}list();lbl()}
};
setInterval(()=>{
 if(!run||document.hidden||p.style.display!=="block"||!$("pwrap").classList.contains("open"))return;
 run.time-=.1;
 if(run.time<=0){finish(false);return}
 dmgNow(enUse(.1*spd)?M.eng()/10*spd:0);
},100);
const _op=window.openPanel;
window.openPanel=function(e){const d=$("dgp");if(d&&e!=="dgp")d.style.display="none";return _op.apply(this,arguments)};
const db=$("dgb");if(db)db.onclick=()=>{p.style.display="block";if(!run)list();_op("dgp")};
lbl();
})();
}catch(e){try{console.error("[27_dungeons.js #36]",e)}catch(_){}}
