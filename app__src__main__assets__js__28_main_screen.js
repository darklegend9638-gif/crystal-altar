/* 28_main_screen.js — главный экран: гача мира, монеты, панель апгрейдов
   (вынесено из index.html без изменений; порядок подключения — по номеру файла) */

/* ── скрипт #37 ── */
try{
/* ===== ГЛАВНЫЙ ЭКРАН: гача мира (Гача 1 / Гача 2) вместо шара и кнопок x1/x10 ===== */
(function(){"use strict";
const $$=id=>document.getElementById(id);
const stage=$$("orb").closest(".stage"),gin=$$("gxin"),gxp=$$("gxp");
if(!stage||!gin)return;
const st=document.createElement("style");
st.textContent="#orb,#nm,#rr,#fxs,#r1,#r10{display:none!important}.stage .row:has(#r1){display:none!important}#colh,#coltabs,#colinfo,#col{display:none!important}.gxw button{font-family:var(--fh)!important;font-weight:800!important;white-space:nowrap}.gxw .gx-tabs button{font-size:14px!important}.gxw .gx-amt button{font-size:13px!important}.gxw .gx-b button{font-size:14px!important}.gxw .gx-b .gx-rs,.gxw .gx-b .gx-sa{font-size:12px!important}.gxw .gx-b{grid-template-columns:1fr 1fr!important;gap:8px!important;margin-top:12px!important}.gxw .gx-b button[data-a]{font:800 13px var(--fh)!important;padding:11px 6px!important;border-radius:14px!important;min-height:0;white-space:nowrap}.gxw .gx-b .gx-roll{grid-column:auto!important}.gxw .gx-b button.gx-rs,.gxw .gx-b button.gx-sa{grid-column:1/3!important;font-size:11px!important;padding:9px 6px!important}.gxw #gxin{padding-top:0!important}.gxw .gx-tabs{margin-top:0!important}#wdchip{min-height:0!important;margin:0 0 4px!important}.stage:has(.gxw){padding-top:12px!important}#gxb{display:none!important}.gxw{text-align:left;margin-top:6px}.gxw .gx-ban{margin:0 0 10px 0}.gxw .gx-g{grid-template-columns:repeat(auto-fill,minmax(128px,1fr))!important;gap:20px 12px;padding:18px 8px 4px}.gxw .it.ey{min-height:140px;padding:22px 6px 9px}.gxw .it.ey.gxhit{animation:gxh .6s!important}.gxw .gx-c>div{min-width:0}.gxw .gx-amt{display:flex;gap:6px;margin-top:10px}.gxw .gx-amt button{flex:1;padding:9px 0;border-radius:10px;font-weight:800;min-height:0}.gxw .gx-cur{width:100%;max-width:140px;background:none!important;box-shadow:none!important;padding:14px 0 0}.gxw .gx-cur .it.ey{width:100%;box-sizing:border-box;min-height:140px;padding:22px 6px 9px;opacity:1!important;filter:none!important;transform:none!important;animation:none!important;aspect-ratio:auto!important;height:auto!important}";
document.head.appendChild(st);
try{$$("r1").parentElement.style.display="none"}catch(e){}
const w=document.createElement("div");w.className="gxw";w.appendChild(gin);
stage.insertBefore(w,$$("orb"));
if(window.gxRender)gxRender();
const gcb=$$("gcb");if(gcb)gcb.firstElementChild.textContent="🌀 Спутники";
})();
}catch(e){try{console.error("[28_main_screen.js #37]",e)}catch(_){}}

/* ── скрипт #38 (id=coinup) ── */
try{
(function(){"use strict";
const MAXCU=20,STEP=.15,$=id=>document.getElementById(id);
const lvl=()=>Math.min(MAXCU,Math.max(0,S.cu|0));
const unl=()=>Array.isArray(S.wu)&&S.wu.includes(2);
window.cuMul=()=>1+STEP*lvl();
const cost=()=>Math.floor(3000*((window.WORLDS&&window.WORLDS[2])?window.WORLDS[2].cm:20)*Math.pow(1.55,lvl())*(ev().disc||1)*rbDisc());
const lab=(withCost)=>{const mx=lvl()>=MAXCU;return "🪙 "+L2("Монеты","Coins")+" ×"+(+cuMul().toFixed(2))+(mx?" · MAX":(withCost?" → ×"+(+(1+STEP*(lvl()+1)).toFixed(2))+" · "+fmt(cost()):""))};
window.wpUp2=()=>{try{return `<button class="alt" data-wo="cu" data-wid="2">${lab(true)}</button>`}catch(e){return""}};
window.cuBuy=()=>{
 if(busy||!ready)return;
 if(!unl())return toast(L2("Сначала открой мир Ван Пис","Unlock the One Piece world first"),"err");
 if(lvl()>=MAXCU)return toast(L2("Монеты уже на максимуме","Coins already maxed"),"err");
 const c=cost();if(S.coins<c)return toast(L2("Не хватает монет","Not enough coins"),"err");
 S.coins-=c;S.cu=lvl()+1;render();save();try{pushSoon()}catch(e){}
 toast(L2("Монеты повышены: ×","Coins upgraded: ×")+(+cuMul().toFixed(2)),"ok");
};
const st=document.createElement("style");
st.textContent="#cuprow{margin-top:8px}#cup{border:0;font-weight:800;border-radius:16px;padding:12px;font-size:13.5px;line-height:1.3;min-height:60px;width:100%;background:linear-gradient(135deg,#fde047,#f59e0b);color:#2a1700}#cup:disabled{filter:grayscale(.55);opacity:.45}";
document.head.appendChild(st);
const b=$("cup");if(b)b.onclick=()=>window.cuBuy();
const _r=render;render=function(){const r=_r.apply(this,arguments);
 try{const row=$("cuprow"),on=unl();if(row)row.style.display=on?"":"none";
  if(on&&b){b.textContent=lab(true);b.disabled=lvl()>=MAXCU||busy||S.coins<cost()}}catch(e){}
 return r};
try{render()}catch(e){}
})();
}catch(e){try{console.error("[28_main_screen.js #38]",e)}catch(_){}}

/* ── скрипт #39 (id=uppanel) ── */
try{
(function(){"use strict";
const $=id=>document.getElementById(id);
const wp=$("wdp"),p=document.createElement("div");
p.id="upp";p.className="glass stage pbox";p.style.cssText="display:none;text-align:left";
p.innerHTML='<b class="hd">⚡ '+L2("Прокачка","Upgrades")+'</b><div class="adm-sub" id="upsub"></div><div id="upin" style="margin-top:10px"></div>';
$("pwrap").appendChild(p);
try{const x=wp.querySelector(".pclose").cloneNode(true);x.onclick=()=>closePanel();p.prepend(x)}catch(e){}
const h0=()=>(S.w|0)===0;
function draw(){
 const h=h0(),n=rbN(),mx=n>=RB_MAX,q=rbReq(Math.min(n,RB_MAX-1)),ok=!mx&&rbOk(n);
 $("upsub").textContent=h?L2("Удача, доход и перерождение действуют во всех мирах","Luck, income and rebirth apply to all worlds"):L2("Удача и доход качаются за монеты текущего мира","Luck and income are bought with the current world's coins");
 const card=(ic,t,sub,k,txt,dis)=>`<div class="glass ti"><div class="ic" style="font-size:26px">${ic}</div><div class="tx"><b>${t}</b><span>${sub}</span></div><button data-u="${k}" ${dis?"disabled":""}>${txt}</button></div>`;
 const lm=S.luck>=MAXLUCK,im=S.inc>=MAXINC;
 const lc=luckCost(),ic=incCost();
 let html=card("🍀",L2("Удача","Luck"),lm?LK(S.luck)+" · MAX":LK(S.luck)+" → "+LK(S.luck+1),"lk",lm?"MAX":fmt(lc),lm||busy||S.coins<lc);
 html+=card("💰",L2("Доход","Income"),im?fmtInc(inc())+L2("/с · MAX","/s · MAX"):fmtInc(inc())+L2("/с → ","/s → ")+fmtInc(incB(incAt(S.inc+1)+petInc()))+L2("/с","/s"),"ic",im?"MAX":fmt(ic),im||busy||S.coins<ic);
 const rq=mx?L2("Максимум перерождений","Max rebirths"):L2("Нужно: монеты ","Needs: coins ")+fmt(q.coins)+L2(", удача ",", luck ")+q.luck+L2(", доход ",", income ")+q.inc+L2(", редкость ≥ ",", rarity ≥ ")+(R[Math.min(q.best,R.length-1)].n);
 if(h)html+=card("🔄",L2("Перерождение ","Rebirth ")+n+"/"+RB_MAX,rq,"rb",mx?"MAX":L2("Переродиться","Rebirth"),!ok||busy);
 $("upin").innerHTML=html;
}
window.upOpen=()=>{p.style.display="block";draw();openPanel("upp")};
const _op=window.openPanel;
window.openPanel=function(e){if(e!=="upp")p.style.display="none";return _op.apply(this,arguments)};
p.onclick=e=>{const b=e.target.closest("button[data-u]");if(!b||b.disabled)return;
 if(!h0())return toast(L2("Зайди в 1 мир","Enter World 1 first"),"err");
 const k=b.dataset.u;
 if(k==="lk"){const x=$("luck");x&&!x.disabled&&x.click()}
 else if(k==="ic"){const x=$("inc");x&&!x.disabled&&x.click()}
 else{const x=$("rbBtn");if(x&&!x.disabled){x.click();if(typeof rbArm!=="undefined"&&rbArm)toast(L2("Нажми ещё раз — прогресс сбросится","Tap again — progress will reset"),"info")}}
 draw()};
const _r=render;render=function(){const r=_r.apply(this,arguments);try{if(p.style.display==="block")draw()}catch(e){}return r};
})();
}catch(e){try{console.error("[28_main_screen.js #39]",e)}catch(_){}}

/* ── скрипт #40 (id=eyeicons) ── */
try{
(function(){"use strict";
const C=50,Y=31,f1=v=>(+v).toFixed(1);
const pt=(r,a)=>[f1(C+r*Math.cos(a)),f1(Y+r*Math.sin(a))];
const tomoe=(n,r,sz,col)=>{let h="";for(let k=0;k<n;k++){const a=-Math.PI/2+k*2*Math.PI/n,P=pt(r,a),Q=pt(r,a+.85);h+=`<circle cx="${P[0]}" cy="${P[1]}" r="${sz}" fill="${col}"/><path d="M${P[0]} ${P[1]}A${r} ${r} 0 0 1 ${Q[0]} ${Q[1]}" fill="none" stroke="${col}" stroke-width="${f1(sz*.7)}" stroke-linecap="round"/>`}return h};
const rings=(rs,col,w)=>rs.map(r=>`<circle cx="${C}" cy="${Y}" r="${r}" fill="none" stroke="${col}" stroke-width="${w}"/>`).join("");
const spokes=(n,r1,r2,col,w)=>{let h="";for(let k=0;k<n;k++){const a=k*2*Math.PI/n,P=pt(r1,a),Q=pt(r2,a);h+=`<line x1="${P[0]}" y1="${P[1]}" x2="${Q[0]}" y2="${Q[1]}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`}return h};
const dot=(r,fill,st)=>`<circle cx="${C}" cy="${Y}" r="${r}" fill="${fill}"${st?` stroke="${st}" stroke-width="1"`:""}/>`;
const iris=(fill,edge)=>`<circle cx="${C}" cy="${Y}" r="16" fill="${fill}" stroke="${edge}" stroke-width="2"/>`;
const D={
 "Sharingan":()=>iris("#d3202a","#1a0508")+rings([9],"#0b0102",1)+tomoe(3,9,3,"#0b0102")+dot(3.4,"#000"),
 "Byakugan":()=>iris("#eceaf7","#9a98b8")+rings([12.5],"#cfcde6",1.2)+dot(2.4,"#dcdaf0","#c4c2de"),
 "Ketsuryugan":()=>iris("#d3202a","#1a0508")+dot(8.5,"#17090d","#000")+`<rect x="43.5" y="29.4" width="13" height="3.2" rx="1.4" fill="#d3202a"/>`,
 "Jogan":()=>iris("#e9f4ff","#9cc2e8")+rings([11],"#b9d6f2",1.3)+dot(4.2,"#fff","#cfe3f7"),
 "Tenseigan":()=>iris("#d3eaff","#3d7fc0")+spokes(12,5,15,"#7fb4e6",.9)+dot(3,"#0a1630"),
 "Rinnegan":()=>iris("#a37be0","#3a1c6e")+rings([4,8,12],"#4a2a86",1.3)+dot(2,"#1a0a35"),
 "RinneSharingan":()=>iris("#7a1018","#1a0508")+rings([5,9,13],"#210407",1.3)+tomoe(3,9,2.4,"#150205")+dot(2,"#000"),
 "Kokugan":()=>iris("#f6c63a","#5a3a00")+spokes(16,4,15,"#3a2600",1.1)+rings([14],"#2a1a00",1.4)+dot(3.2,"#2a1a00"),
 "Senrigan":()=>iris("#3fb7f5","#0d2a5a")+rings([5,9,13],"#bfeaff",1.5)+dot(2.6,"#fff")
};
const IMG={"Sharingan": "", "Byakugan": "", "Ketsuryugan": "", "Jogan": "", "Tenseigan": "", "Rinnegan": "", "RinneSharingan": "", "Kokugan": "", "Senrigan": "","Juubi": ""};
window.__eyeSvg=function(item){
 try{const nm=String(item).split(" ").slice(1).join(" ");if(IMG[nm])return `<img src="${IMG[nm]}" alt="" draggable="false">`;const d=D[nm];if(!d)return"";
  const id="eyc"+nm;
  return `<svg viewBox="0 0 100 62" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><radialGradient id="eyw" cx=".5" cy=".4" r=".75"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#cdd4e2"/></radialGradient><clipPath id="${id}"><path d="M3 31C20 8 80 8 97 31C80 54 20 54 3 31Z"/></clipPath></defs><path d="M3 31C20 8 80 8 97 31C80 54 20 54 3 31Z" fill="url(#eyw)"/><g clip-path="url(#${id})">${d()}</g><path d="M3 31C20 8 80 8 97 31C80 54 20 54 3 31Z" fill="none" stroke="#0b0b12" stroke-width="3.2" stroke-linejoin="round"/></svg>`}catch(e){return""}};
const st=document.createElement("style");
st.textContent=".eyesvg{display:flex;align-items:center;justify-content:center;font-size:0!important;line-height:0}.eyesvg svg{width:60px;height:37px;display:block;filter:drop-shadow(0 2px 4px rgba(0,0,0,.6))}.eyesvg img{width:64px;height:auto;display:block;pointer-events:none;-webkit-user-drag:none}.eyesvg.beast{height:62px}.eyesvg.beast img{width:auto;height:auto;max-width:84px;max-height:62px;object-fit:contain;filter:drop-shadow(0 2px 4px rgba(0,0,0,.55))}";
document.head.appendChild(st);
})();
}catch(e){try{console.error("[28_main_screen.js #40]",e)}catch(_){}}
