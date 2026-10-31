/* 20_world_gacha.js — гачи миров
   (вынесено из index.html без изменений; порядок подключения — по номеру файла) */

/* ── скрипт #19 ── */
try{
/* ===== ГАЧИ МИРА: 2 гачи в каждом мире, по 1 предмету каждой редкости (Common…Astral) ===== */
(function(){"use strict";
const $$=id=>document.getElementById(id);
const BV=[1.05,1.1,1.2,1.4,1.8,2.5,4,7,12];
let cur=0,auto=null,busy=false,stopOn=true,last=-1,amt=1;const AM=[1,10,25,50];
const gx=()=>{if(!S.gx||typeof S.gx!=="object"||Array.isArray(S.gx))S.gx={};let a=S.gx[S.w];if(!Array.isArray(a)||a.length!==2){a=[-1,-1];S.gx[S.w]=a}return a};
window.gxMul=()=>{try{let m=1;if(S.gx&&typeof S.gx==="object")for(const k in S.gx){const a=S.gx[k];if(Array.isArray(a))a.forEach(r=>{if(r>=0&&BV[r])m*=BV[r]})}return m}catch(e){return 1}};
const item=(g,r)=>{const l=R[r].items;return l[Math.min(g,l.length-1)]};
const ch=()=>{const w=weights().slice(0,9),t=w.reduce((a,b)=>a+b,0);return w.map(x=>x/t*100)};
const pf=p=>p>=1?+p.toFixed(2):+p.toPrecision(3);
const st=document.createElement("style");
st.textContent=`.gxw .gx-tabs{display:flex;gap:8px;margin:6px 0 10px}.gxw .gx-tabs button{flex:1}.gxw .gx-box{background:linear-gradient(160deg,#0b2a5c,#061230 70%);border:2px solid #1d6bff;border-radius:18px;padding:10px 10px 14px;box-shadow:0 0 22px rgba(40,120,255,.35) inset}
.gxw .gx-ban{margin:-18px -4px 10px -4px;padding:12px 18px;transform:skewX(-8deg);background:linear-gradient(100deg,#7fd8ff,#1c7bff 45%,#0a3a9a);border-radius:6px;box-shadow:0 4px 14px rgba(0,0,0,.5)}.gxw .gx-ban b{display:block;transform:skewX(8deg);font:800 20px var(--fb);color:#fff;}
.gxw .gx-g{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.gxw .gx-t{position:relative;aspect-ratio:1/1.02;border-radius:14px;border:3px solid var(--bc);background:radial-gradient(circle at 50% 40%,#23283a,#0a0c14);display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden}
.gxw .gx-t.r5{border-image:linear-gradient(135deg,#ff3d3d,#ffd23d,#3dff6b,#3da8ff,#c13dff) 1}.gxw .gx-t.hit{animation:gxh .6s}@keyframes gxh{0%,100%{transform:scale(1)}40%{transform:scale(1.1);box-shadow:0 0 22px var(--bc)}}
.gxw .gx-p{position:absolute;left:6px;top:3px;font:800 13px var(--fb);color:#ffb21a;}.gxw .gx-e{font-size:38px;line-height:1;margin-top:10px}.gxw .gx-n{font:800 11px var(--fb);color:#fff;text-align:center;margin-top:4px;padding:0 2px;word-break:break-word}
.gxw .gx-c{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px;align-items:start}.gxw .gx-c h4{margin:0 0 6px;font:800 20px var(--fb);color:#fff;}.gxw .gx-bf{font:800 13px var(--fb);color:#fff;background:#a3121f;border:2px solid #ff4d5e;border-radius:10px;padding:6px 8px;text-align:center}
.gxw .gx-b{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px}.gxw .gx-b button{border:0;border-radius:12px;padding:12px 6px;font:800 17px var(--fb);color:#fff;}.gxw .gx-roll{background:linear-gradient(#7dff3a,#18b010)}.gxw .gx-auto{background:linear-gradient(#4de0ff,#1a8fd8)}.gxw .gx-auto.on{background:linear-gradient(#ff7a7a,#c01818)}.gxw .gx-rs{background:#10b81f!important;grid-column:1/3;font-size:13px!important}.gxw .gx-rs.off{background:#7a1a1a!important}`;
st.textContent+=`.gxw #gxin{padding-top:46px}.gxw .gx-ban b{font-size:16px!important}.gxw .gx-b button{color:#04161c!important}.gxw .gx-auto.on,.gxw .gx-rs.off{color:#fff!important}.gxw .gx-c h4{font-size:16px!important;color:var(--text)!important}#wpp .hd{display:block;padding-right:52px}`;
document.head.appendChild(st);
const ST={};
/* настройки «Стоп по редкости» (вкл/выкл + порог) — хранятся в localStorage на аккаунт, пишутся мгновенно, без сервера */
let GS=null,GSK="";
const gsApply=(st,v)=>{st.stopOn=!v||v.on!==false;const a=v?+v.at:4;st.stopAt=a>=1&&a<=8?Math.floor(a):4};
const gsLoad=()=>{let k;try{k=GPX+"gacha-gxs-"+String((typeof me!=="undefined"&&me&&me.nick)||"").toLowerCase()}catch(e){k=GPX+"gacha-gxs-"}
 if(GS&&GSK===k)return GS;GSK=k;try{GS=JSON.parse(localStorage.getItem(k)||"{}");if(!GS||typeof GS!=="object"||Array.isArray(GS))GS={}}catch(e){GS={}}
 for(const w in ST)gsApply(ST[w],GS[w]);return GS};
const gsSave=(w,st)=>{const g=gsLoad();g[w]={on:!!st.stopOn,at:st.stopAt};try{localStorage.setItem(GSK,JSON.stringify(g))}catch(e){}};
const sw=w=>{const g=gsLoad();if(!ST[w]){ST[w]={cur:0,amt:1,last:-1,au:[null,null]};gsApply(ST[w],g[w])}return ST[w]};
/* окно подтверждения обмена монет на токены */
function gxAsk(n,tn,fn){let m=$$("gxConfirm");
 if(!m){m=document.createElement("div");m.id="gxConfirm";m.className="confirm-modal";m.style.zIndex="1100";
  m.innerHTML='<div class="modal-box"><div class="modal-title" id="gxcH"></div><div class="modal-text" id="gxcT"></div><div class="modal-actions"><button class="alt" id="gxcNo"></button><button id="gxcYes"></button></div></div>';
  document.body.appendChild(m);m.onclick=e=>{if(e.target===m)m.classList.remove("show")};$$("gxcNo").onclick=()=>m.classList.remove("show")}
 $$("gxcH").textContent=L2("💱 Подтвердите обмен","💱 Confirm exchange");
 $$("gxcT").innerHTML=L2("Обменять <b>","Exchange <b>")+fmt(n)+" 🪙</b> "+L2("на","for")+" <b>"+fmt(n)+" "+esc(tn)+"</b>?<br>"+L2("Обратно токены в монеты не обменять.","Tokens can't be exchanged back to coins.");
 $$("gxcNo").textContent=L2("Отмена","Cancel");$$("gxcYes").textContent=L2("Обменять","Exchange");
 $$("gxcYes").onclick=()=>{m.classList.remove("show");fn()};m.classList.add("show")}
const gxA=w=>{if(!S.gx||typeof S.gx!=="object"||Array.isArray(S.gx))S.gx={};let a=S.gx[w];if(!Array.isArray(a)||a.length!==2){a=[-1,-1];S.gx[w]=a}return a};
const itemW=(w,g,r)=>{const l=WORLDS[w].items[r];return l[Math.min(g,l.length-1)]};
const foundOf=w=>w===S.w?S.found:((S.wd&&S.wd[w]&&S.wd[w].found)||{});
const coinsOf=w=>S.coins;
const PWK=["best","pl","pm","ps"],DF={coins:30,luck:0,inc:0,best:-1,pl:0,pm:0,ps:0};
/* выполнить fn «внутри» мира w (его монеты, удача, гарант, находки), не переключая мир игрока */
function inW(w,fn){
 if(w===S.w)return fn();
 if(!S.wd||typeof S.wd!=="object"||Array.isArray(S.wd))S.wd={};
 const t=S.wd[w]||(S.wd[w]={}),sv={},sf=S.found,sw0=S.w;
 PWK.forEach(k=>sv[k]=S[k]);
 PWK.forEach(k=>S[k]=typeof t[k]==="number"?t[k]:DF[k]);
 if(!t.found||typeof t.found!=="object")t.found={};
 S.found=t.found;S.w=w;
 try{return fn()}finally{PWK.forEach(k=>t[k]=S[k]);PWK.forEach(k=>S[k]=sv[k]);S.found=sf;S.w=sw0}
}
const chW=w=>inW(w,()=>{const x=weights().slice(0,9),t=x.reduce((a,b)=>a+b,0);return x.map(v=>v/t*100)});
let panelW=null;const gp=$$("gxp"),pwr=$$("pwrap");
const pw=document.createElement("div");pw.className="gxw";pw.style.paddingTop="34px";const pin=document.createElement("div");pin.id="gxpin";pw.appendChild(pin);gp.appendChild(pw);
const TK=[[{"n": "Chakra Token", "c1": "#ffb347", "c2": "#7a2bd1", "g": "🍥"}], [{"n": "Ki Token", "c1": "#ffb02e", "c2": "#c2410c", "g": "🐉"}], [{"n": "Berry Token", "c1": "#ef4444", "c2": "#7f1d1d", "g": "🏴‍☠️"}], [{"n": "Titan Token", "c1": "#e5e7eb", "c2": "#6b7280", "g": "🧱"}], [{"n": "Mana Token", "c1": "#7c3aed", "c2": "#1e1b4b", "g": "🌑"}], [{"n": "Breath Token", "c1": "#dc2626", "c2": "#450a0a", "g": "👹"}], [{"n": "Grimoire Token", "c1": "#34d399", "c2": "#065f46", "g": "🍀"}]];
const tokOf=(w,g)=>{if(g!==0)return 0;const a=S.tok&&S.tok[w];return Array.isArray(a)?(a[g]||0):0};
const tokAdd=(w,g,n)=>{if(g!==0)return;if(!S.tok||typeof S.tok!=="object"||Array.isArray(S.tok))S.tok={};let a=S.tok[w];if(!Array.isArray(a)||a.length!==2)a=S.tok[w]=[0,0];a[g]=Math.min(999e33,Math.max(0,(a[g]||0)+n))};
const STAR=(()=>{const q=[];for(let i=0;i<16;i++){const r=i%2?21:30,an=i*Math.PI/8-Math.PI/2;q.push((32+r*Math.cos(an)).toFixed(1)+","+(32+r*Math.sin(an)).toFixed(1))}return q.join(" ")})();
const TIMG=["", "", "", "", "", "", "", "", "", "", "", "", "", ""];
const TMAP=[[0,1],[2,3],[4,5],[6,7],[8,9],[10,11],[12,13]];window.__TIMG=TIMG;window.__TMAP=TMAP;
const tokSvg=(w,g,z)=>{const ti=(TMAP[w]||[])[g];if(ti>=0&&TIMG[ti])return `<img src="${TIMG[ti]}" width="${z}" height="${z}" alt="" style="flex:none;vertical-align:middle;object-fit:contain;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))">`;const k=(TK[w]||TK[0])[g],id="tk"+w+"_"+g;return `<svg viewBox="0 0 64 64" width="${z}" height="${z}" style="flex:none;vertical-align:middle;filter:drop-shadow(0 2px 4px rgba(0,0,0,.45))" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${k.c1}"/><stop offset="1" stop-color="${k.c2}"/></linearGradient></defs><polygon points="${STAR}" fill="url(#${id})" stroke="#ffd36b" stroke-width="3" stroke-linejoin="round"/><circle cx="32" cy="32" r="14" fill="rgba(0,0,0,.35)"/><text x="32" y="39" text-anchor="middle" font-size="19">${k.g}</text></svg>`};
window.tokDrop=t=>{try{const w=S.w;tokAdd(w,0,1+Math.floor(Math.random()*(t+2))+t)}catch(e){}};
const gcost=n=>Math.max(1,Math.ceil(10*n*(gpHas("vip")?.7:1)));
const ic=n=>`<svg class="ico" style="width:18px;height:18px;vertical-align:-4px;margin-right:5px;filter:none" aria-hidden="true"><use href="#i-${n}"/></svg>`;
function ui(box,w){if(!box)return;const st=sw(w),cur=(st.cur=0),wd=WORLDS[w],a=gxA(w),p=chW(w),r=a[cur],auto=!!st.au[cur],anyAuto=!!(st.au[0]||st.au[1]),fo=foundOf(w),
 nm=TK[w][cur].n,coins=tokOf(w,cur),cost=gcost(st.amt),ce=window.wCe?wCe(w):"🪙";
const card=(i,full)=>{const n=itemW(w,cur,i),f=fo[n]|0;let h=window.__eyeCard(n,i,f||1,(typeof rname=="function"?rname(i):R[i].n),iname(n),R[i].c,i,pf(p[i])+"%");if(!f)h=h.replace(/<span class="cn">[^<]*<\/span>/,"");{const _u=window.__gxIcon&&__gxIcon(w,i);if(_u)h=h.replace(/<div class="e[^"]*">[\s\S]*?<\/div>/,'<div class="e"><img class="gximg" src="'+_u+'" alt=""></div>')}{const _nm=window.__gxName&&__gxName(w,i);if(_nm)h=h.replace(/<div class="en">[\s\S]*?<\/div>/,'<div class="en">'+_nm+'</div>')}if(false&&window.__eyeSvg){const sv=__eyeSvg(n);if(sv)h=h.replace(/<div class="e">[\s\S]*?<\/div>/,'<div class="e eyesvg'+(cur===0?" beast":"")+'">'+sv+"</div>")}if(!full&&st.last===i)h=h.replace("it ey","it ey gxhit");return h};
const curT=r>=0?`<div class="gx-cur">${card(r,1)}</div>`:`<div class="gx-cur"><div class="it ey off"><div class="e">❔</div><div class="en">—</div></div></div>`;
setH(box,`<div class="gx-box"><div class="gx-ban"><b>${wd.ic} ${esc(window.__gxTitle?__gxTitle(w):nm)}</b></div><div class="gx-g">${[0,1,2,3,4,5,6,7,8].map(i=>card(i)).join("")}</div>
<div class="gx-c"><div><h4>${L2("Сейчас:","Current:")}</h4>${curT}</div><div><h4>${L2("Бафф:","Buffs:")}</h4><div class="gx-bf">${L2("Монеты","Coins")} ×${r>=0?BV[r]:1}</div><div style="color:var(--mute);font-size:12px;margin-top:6px">${L2("Все гачи мира","Both gachas")}: ×${+gxA(w).reduce((m,q)=>m*(q>=0?BV[q]:1),1).toFixed(2)}</div><div style="color:#7dff3a;font-size:12px;font-weight:700;margin-top:3px">${L2("Бонус монет во всех мирах","Coin bonus in all worlds")}: ×${+gxMul().toFixed(2)}</div></div></div>
${anyAuto?`<div style="font:700 12px var(--fb);color:#7dff3a;margin-top:6px">🔁 ${L2("Авто-ролл работает в фоне, даже если ты в другом мире","Auto roll runs in the background, even in another world")}</div>`:""}
<div style="display:flex;justify-content:center;align-items:center;gap:6px;margin-top:12px;font:800 15px var(--fh);color:${coins>=cost?"#fff":"#ff7a8a"}">${tokSvg(w,cur,32)}<span>${esc(TK[w][cur].n)}</span> ${fmt(coins)} / ${fmt(cost)}</div>
<div style="margin-top:10px;text-align:center"><div style="font:800 13px var(--fb);color:#fff;margin-bottom:6px">${ce} ${L2("Обмен монет на токены (1 : 1)","Exchange coins for tokens (1 : 1)")} · ${ce} ${fmt(Math.floor(coinsOf(w)))}</div><div style="display:flex;gap:6px;justify-content:center;flex-wrap:wrap">${[10,100,1000,10000].map(n=>`<button class="alt" style="padding:7px 10px;font:800 13px var(--fb)" data-ex="${n}">+${fmt(n)}</button>`).join("")}<button class="alt" style="padding:7px 10px;font:800 13px var(--fb)" data-ex="max">${L2("Все","All")}</button></div></div>
<div class="gx-amt">${AM.map(n=>`<button class="${st.amt===n?"":"alt"}" data-n="${n}">${ic("dice")}x${n}</button>`).join("")}</div>
<div class="gx-b"><button class="gx-roll" data-a="roll">${ic("dice")}${L2("Ролл","Roll")} x${st.amt}</button><button class="gx-auto${auto?" on":""}" data-a="auto">${auto?ic("shield")+L2("Стоп","Stop"):ic("rebirth")+L2("Авто","Auto")+" x"+st.amt}</button><button class="gx-rs${st.stopOn?"":" off"}" data-a="rs">${ic("shield")}${L2("СТОП ПО РЕДКОСТИ","RARITY STOP")}: ${st.stopOn?L2("ВКЛ","ON"):L2("ВЫКЛ","OFF")}</button><button class="alt gx-sa" data-a="sa">${ic("star")}${L2("Стоп на редкости","Stop at rarity")}: <b style="color:${R[st.stopAt].c}">${esc(typeof rname=="function"?rname(st.stopAt):R[st.stopAt].n)}+</b></button></div></div>`)}
function renderMain(){ui($$("gxin"),S.w)}
function renderPanel(){if(panelW!=null&&gp.style.display==="block"&&pwr.classList.contains("open"))ui(pin,panelW)}
function refresh(){try{renderMain();renderPanel()}catch(e){}}
window.gxRender=refresh;
function doRoll(w,g){
 if(!ready||!S.wu||!S.wu.includes(w))return null;
 const st=sw(w),n=st.amt,cur=g==null?st.cur:g,its=[];let top=-1;
 const c=gcost(n);if(tokOf(w,cur)<c)return null;
 inW(w,()=>{const a=gxA(w);top=0;
  for(let k=0;k<n;k++){const r=Math.min(8,pick()),nm=itemW(w,cur,r);S.found[nm]=(S.found[nm]||0)+1;its.push(nm);if(r>top)top=r;if(r>(S.best==null?-1:S.best))S.best=r;if(r>=a[cur])a[cur]=r}});
 if(top<0)return null;tokAdd(w,cur,-c);
 S.rolls=(S.rolls|0)+n;try{typeof dqRoll=="function"&&dqRoll(its,n,0)}catch(e){}
 if(cur===st.cur)st.last=top;try{render()}catch(e){}save();pushSoon();refresh();return top}
function stopAuto(w,g){const st=sw(w);[0,1].forEach(i=>{if((g==null||g===i)&&st.au[i]){clearInterval(st.au[i]);st.au[i]=null}});refresh()}
function startAuto(w,g){const st=sw(w);if(st.au[g])return;const o=1-g;if(st.au[o]&&!gpHas("dual")){stopAuto(w,o);toast(L2("Две гачи сразу — нужен геймпасс «Двойная гача»","Two gachas at once needs the «Dual Gacha» pass"),"err")}
st.au[g]=setInterval(()=>{const r=doRoll(w,g);if(r===null){toast(L2("Авто-ролл остановлен: не хватает токенов","Auto roll stopped: not enough tokens"),"err");stopAuto(w,g)}else if(st.stopOn&&r>=st.stopAt)stopAuto(w,g)},450);refresh()}
function bind(box,getW){box.onclick=e=>{const b=e.target.closest("button");if(!b)return;const w=getW(),st=sw(w);
 if(b.dataset.ex!=null){const have=Math.floor(coinsOf(w)),n=b.dataset.ex==="max"?have:+b.dataset.ex;if(!(n>=1)||have<n){toast(L2("Не хватает монет","Not enough coins"),"err");return}const cw=w,cc=st.cur;gxAsk(n,TK[cw][cc].n,()=>{if(Math.floor(coinsOf(cw))<n){toast(L2("Не хватает монет","Not enough coins"),"err");return}inW(cw,()=>{S.coins-=n});tokAdd(cw,cc,n);try{render()}catch(e){}save();pushSoon();refresh();toast(L2("Обменяно: ","Exchanged: ")+fmt(n)+" → "+TK[cw][cc].n,"ok")});return}
 if(b.dataset.n!=null)st.amt=+b.dataset.n;
 else if(b.dataset.g!=null){st.cur=+b.dataset.g;st.last=-1}
 else if(b.dataset.a==="roll"){if(doRoll(w,st.cur)===null)toast(L2("Не хватает токенов","Not enough tokens"),"err");return}
 else if(b.dataset.a==="rs"){st.stopOn=!st.stopOn;gsSave(w,st)}
 else if(b.dataset.a==="sa"){st.stopAt=st.stopAt>=8?1:st.stopAt+1;gsSave(w,st)}
 else if(b.dataset.a==="auto"){st.au[st.cur]?stopAuto(w,st.cur):startAuto(w,st.cur);return}
 refresh()}}
bind($$("gxin"),()=>S.w);bind(pin,()=>panelW);
$$("gxb").onclick=()=>window.gxOpen(sw(S.w).cur,S.w);
window.gxOpen=(g,w)=>{w=(w==null)?S.w:w;if(!S.wu||!S.wu.includes(w))return;const st=sw(w);if(g!=null&&g!==st.cur){st.cur=g;st.last=-1}panelW=w;gp.style.display="block";ui(pin,w);openPanel("gxp")};
let _sg="";setInterval(()=>{const s2=S.w+"|"+Math.floor(S.coins)+"|"+S.luck+"|"+JSON.stringify(S.tok||0);if(s2!==_sg){_sg=s2;refresh()}},700);
try{Object.assign(TX,{"🎴 Гачи мира":"🎴 World gachas"});applyStatic()}catch(e){}
})();
}catch(e){try{console.error("[20_world_gacha.js #19]",e)}catch(_){}}
