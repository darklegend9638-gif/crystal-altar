/* 39_coin_fly.js — монеты/тикеты «прилетают» в счётчики шапки (#hudC / #hudG), когда их становится больше
   (награды, подарки, выигрыши, выдача админом, переводы…). Пассивный доход по секундам не анимируется. */
try{
(function(){"use strict";
const HUD={coins:"hudC",gems:"hudG"};
const VAL={coins:()=>S.coins,gems:()=>S.gem||0};

const CFG={
  coins:{color:"#ffc83d",glow:"rgba(255,190,40,.9)",emoji:"🪙"},
  gems:{color:"#5ee7ff",glow:"rgba(60,200,255,.9)",emoji:"💎"}
};
const HOLD=650;            /* сколько держим старое число, пока летят первые монеты, мс */
const eco=()=>document.documentElement.classList.contains("eco");
const RMq=matchMedia("(prefers-reduced-motion:reduce)");

/* ───────── стили ───────── */
const css=document.createElement("style");
css.textContent=
"#cfx{position:fixed;inset:0;pointer-events:none;z-index:99999;overflow:hidden}"+
".cfx-p{position:fixed;left:0;top:0;width:26px;height:26px;margin:-13px 0 0 -13px;will-change:transform,opacity;pointer-events:none}"+
".cfx-p svg,.cfx-p span{width:100%;height:100%;display:block;font-size:22px;line-height:26px;text-align:center}"+
".cfx-t{position:fixed;left:0;top:0;font:800 18px var(--fh);white-space:nowrap;pointer-events:none;will-change:transform,opacity;text-shadow:0 2px 10px rgba(0,0,0,.8)}"+
"@keyframes cfxBump{0%{transform:scale(1)}35%{transform:scale(1.09)}100%{transform:scale(1)}}"+
".cfx-bump{animation:cfxBump .32s cubic-bezier(.2,.9,.3,1.3);box-shadow:0 0 22px -2px var(--cfx-g,rgba(255,190,40,.8))!important}";
document.head.appendChild(css);

let layer=null;
const getLayer=()=>{if(!layer||!layer.isConnected){layer=document.createElement("div");layer.id="cfx";document.body.appendChild(layer)}return layer};

/* ───────── «можно ли сейчас анимировать» ───────── */
let lastTok=null,wasReady=false,armAt=0;
function armed(){
  let tok=null,rd=false;try{tok=TOKEN;rd=!!ready}catch(e){return false}
  if(tok!==lastTok){lastTok=tok;armAt=Date.now()+2500}          /* вход/выход — число прыгает, не анимируем */
  if(rd&&!wasReady)armAt=Math.max(armAt,Date.now()+1500);         /* первая загрузка данных с сервера */
  wasReady=rd;
  return rd&&Date.now()>=armAt;
}

/* ───────── откуда летим ───────── */
let lp={x:0,y:0,t:0};
const mark=e=>{const p=e.touches&&e.touches[0]?e.touches[0]:e;lp={x:p.clientX,y:p.clientY,t:Date.now()}};
addEventListener("pointerdown",mark,true);
addEventListener("touchstart",mark,{capture:true,passive:true});
function origin(){
  if(Date.now()-lp.t<1500&&lp.x&&lp.y)return{x:lp.x,y:lp.y};
  const o=document.getElementById("orb"),r=o&&o.getBoundingClientRect();
  if(r&&r.width>0)return{x:r.left+r.width/2,y:r.top+r.height/2};
  return{x:innerWidth/2,y:innerHeight*.6};
}

/* ───────── куда летим ───────── */
function target(id){
  const el=document.getElementById(HUD[id]),pill=el&&(el.closest(".hi")||el.parentElement);
  if(!el||!pill)return null;
  const s=pill.getBoundingClientRect();
  if(!s.width||!s.height||getComputedStyle(pill).visibility==="hidden")return null;
  const ic=pill.querySelector("svg"),r=(ic||el).getBoundingClientRect();
  return{x:r.left+r.width/2,y:r.top+r.height/2,stat:pill,icon:ic};
}

/* ───────── сам полёт ───────── */
let bumpT=0;
function bump(stat,col){
  const n=Date.now();if(n-bumpT<90)return;bumpT=n;
  stat.style.setProperty("--cfx-g",col);
  stat.classList.remove("cfx-bump");void stat.offsetWidth;stat.classList.add("cfx-bump");
}
function fly(id,delta,t){
  const c=CFG[id];if(!c||!t)return;
  const o=origin(),L=getLayer();
  const n=Math.max(5,Math.min(16,Math.round(4+Math.log10(delta+1)*1.7)));
  for(let i=0;i<n;i++){
    const p=document.createElement("div");p.className="cfx-p";
    if(t.icon){const k=t.icon.cloneNode(true);k.removeAttribute("id");p.appendChild(k)}
    else{const s=document.createElement("span");s.textContent=c.emoji;p.appendChild(s)}
    p.style.filter="drop-shadow(0 0 6px "+c.glow+")";
    const a=Math.random()*Math.PI*2,rad=8+Math.random()*26;
    const x0=o.x+Math.cos(a)*rad,y0=o.y+Math.sin(a)*rad;
    const mx=(x0+t.x)/2+(Math.random()-.5)*160,my=Math.min(y0,t.y)-30-Math.random()*90;
    const dur=640+Math.random()*260,dl=i*50+Math.random()*40;
    L.appendChild(p);
    let anim;
    try{
      anim=p.animate([
        {transform:"translate("+x0+"px,"+y0+"px) scale(.3)",opacity:0},
        {transform:"translate("+mx+"px,"+my+"px) scale(1.15)",opacity:1,offset:.38},
        {transform:"translate("+t.x+"px,"+t.y+"px) scale(.55)",opacity:.95}
      ],{duration:dur,delay:dl,easing:"cubic-bezier(.5,.05,.6,.95)",fill:"both"});
    }catch(e){p.remove();continue}
    anim.onfinish=()=>{p.remove();bump(t.stat,c.glow)};
    anim.oncancel=()=>p.remove();
  }
  /* всплывающая подпись «+N» у места, откуда вылетели монеты */
  try{
    const l=document.createElement("div");l.className="cfx-t";l.textContent="+"+fmt(delta);l.style.color=c.color;
    L.appendChild(l);
    const a=l.animate([
      {transform:"translate("+(o.x-24)+"px,"+(o.y-10)+"px) scale(.7)",opacity:0},
      {transform:"translate("+(o.x-24)+"px,"+(o.y-34)+"px) scale(1.05)",opacity:1,offset:.25},
      {transform:"translate("+(o.x-24)+"px,"+(o.y-70)+"px) scale(1)",opacity:0}
    ],{duration:1000,easing:"ease-out",fill:"both"});
    a.onfinish=()=>l.remove();a.oncancel=()=>l.remove();
  }catch(e){}
}

/* ───────── перехват записи в HUD ───────── */
const last={},held={};   /* last — прошлое числовое значение; held — пока летят монеты, показываем старый текст */
const TC=Object.getOwnPropertyDescriptor(Node.prototype,"textContent");
function shouldFly(id,prev,cur){
  const d=cur-prev;
  if(!(d>0)||!isFinite(d))return false;
  if(document.hidden||eco()||RMq.matches)return false;
  if(!armed())return false;
  if(id==="coins"){let inc=0;try{inc=+incNow()||0}catch(e){}if(d<=Math.max(2,inc*2.5))return false}   /* пассивный доход */
  return true;
}
function hook(id){
  const el=document.getElementById(HUD[id]);
  if(!el||el.__cfx)return;
  el.__cfx=1;
  Object.defineProperty(el,"textContent",{configurable:true,
    get(){return TC.get.call(el)},
    set(v){
      const h=held[id];
      if(h){h.txt=v;return}
      let cur=NaN;try{cur=+VAL[id]()}catch(e){}
      const prev=last[id];
      if(isFinite(cur)){
        last[id]=cur;
        if(prev!==undefined&&shouldFly(id,prev,cur)){
          const t=target(id);
          if(t){
            held[id]={txt:v};
            try{fly(id,cur-prev,t)}catch(e){console.error("[39_coin_fly]",e)}
            setTimeout(()=>{const x=held[id];delete held[id];TC.set.call(el,x?x.txt:v)},HOLD);
            return;
          }
        }
      }
      TC.set.call(el,v);
    }});
}
hook("coins");hook("gems");
})();
}catch(e){try{console.error("[39_coin_fly.js]",e)}catch(_){}}
