/* 13_battlepass.js — боевой пропуск
   (вынесено из index.html без изменений; порядок подключения — по номеру файла) */

/* ── скрипт #10 ── */
try{
(function(){
const IB='<svg class="ico"><use href="#i-bp"/></svg>',IP='<svg class="ico"><use href="#i-bpp"/></svg>',LV=30,PREM=300,xpNeed=i=>350+75*i,cum=l=>{let t=0;for(let i=0;i<l;i++)t+=xpNeed(i);return t},
XPT={roll:2,x10:5,up:25,gem:10,rare:1,epic:3,leg:10},
NM=[["Зимняя стужа","Winter Frost"],["Сердца и звёзды","Hearts & Stars"],["Весенний рассвет","Spring Dawn"],["Цветущий алтарь","Blooming Altar"],["Майская гроза","May Storm"],["Летний зной","Summer Heat"],["Звёздное лето","Starry Summer"],["Золотой урожай","Golden Harvest"],["Осенний туман","Autumn Mist"],["Тёмная луна","Dark Moon"],["Первый снег","First Snow"],["Новогоднее чудо","New Year Miracle"]];
const sid=()=>{const d=new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")};
const snum=()=>{const d=new Date();return (d.getFullYear()-2026)*12+d.getMonth()+1-9};
const sname=()=>NM[new Date().getMonth()][LANG==="en"?1:0];
function bp(){const s=sid();if(!S.bp||typeof S.bp!=="object"||S.bp.s<s)S.bp={s:s,xp:0,pr:0,c:0,p:0};return S.bp}
const lvl=()=>{const x=bp().xp;let l=0;while(l<LV&&x>=cum(l+1))l++;return l};
function rw(L,p){const m=p?2.5:1;return{coins:Math.max(Math.round(250*L*m),Math.floor(inc()*30*L*m)),gems:(L%5===0?L/5*(p?4:2):0)+(p?1:0)}}
const rt=r=>"🪙 "+fmt(r.coins)+(r.gems?" · 💎 "+r.gems:"");
function bpAdd(x){if(!ready||!(x>0))return;const b=bp(),a=lvl();b.xp=Math.min(cum(LV),b.xp+x);const n=lvl();if(n>a)toast(L2("Батлпасс: уровень ","Battle pass: level ")+n,"ok")}
const _d=dqAdd;dqAdd=function(id,n){_d(id,n);if(ready&&n>0&&XPT[id])bpAdd(XPT[id]*n)};
function claim(i,p){const b=bp(),L=i+1;if(lvl()<L||(p&&!b.pr))return null;const k=p?"p":"c",bit=1<<i;if(b[k]&bit)return null;b[k]|=bit;const r=rw(L,p);S.coins+=r.coins;S.gem=(S.gem||0)+r.gems;if(L===LV){const t=p?"bp30p":"bp30";Array.isArray(S.tb)||(S.tb=[]);S.tb.includes(t)||S.tb.push(t)}return r}
function pending(){if(!ready)return 0;const b=bp(),l=lvl();let n=0;for(let i=0;i<l;i++){if(!(b.c&(1<<i)))n++;if(b.pr&&!(b.p&(1<<i)))n++}return n}
let sig="";
function draw(){const b=bp(),l=lvl(),t=LANG==="en",end=new Date(new Date().getFullYear(),new Date().getMonth()+1,1)-Date.now(),cur=b.xp-cum(l),pc=l>=LV?100:cur/xpNeed(l)*100,pn=pending();
{const _a=IB+L2("Батлпасс · сезон ","Battle pass · season ")+snum(),_b=sname()+" · "+L2("до конца ","ends in ")+fmtT(Math.max(0,Math.floor(end/1e3)));const A=$("bphd"),B=$("bpsub");if(A.__h!==_a){A.__h=_a;A.innerHTML=_a}if(B.__h!==_b){B.__h=_b;B.textContent=_b}B.style.color=end<3*864e5?"#ff6b6b":""}
let h=`<div class="glass" style="padding:12px;margin-bottom:8px"><div style="display:flex;justify-content:space-between;font-weight:800"><span>${L2("Уровень","Level")} ${l}/${LV}</span><span style="color:var(--mute);font-size:13px">${l>=LV?"MAX":fmt(cur)+" / "+xpNeed(l)+" XP"}</span></div><div class="pb"><i style="width:${pc}%;background:var(--c4)"></i></div><div style="color:var(--mute);font-size:12px;margin-top:6px">${L2("XP: ролл +2, прокачка +25, тикет +10, редкие предметы","XP: roll +2, upgrade +25, ticket +10, rare items")}</div><div class="row" style="margin-top:8px">${b.pr?`<span style="flex:1;color:#ffb02e;font-weight:800">${IP} ${L2("Премиум активен","Premium active")}</span>`:`<button data-bpbuy="1" ${S.gem>=PREM?"":"disabled"}>${IP} ${L2("Премиум","Premium")} · 💎 ${PREM}</button>`}<button class="alt" data-bpall="1" ${pn?"":"disabled"}>${L2("Забрать всё","Claim all")}${pn?" ("+pn+")":""}</button></div></div>`;
for(let i=0;i<LV;i++){const L=i+1,ok=l>=L,f=rw(L,0),p=rw(L,1),fc=b.c&(1<<i),pcl=b.p&(1<<i),bs='style="padding:6px 10px;font-size:12px;min-width:84px"';
h+=`<div class="glass ti ${ok?"":"off"}"><div class="ic" style="font:800 18px var(--fh)">${L}</div><div class="tx"><b>${rt(f)}${L===LV?" · "+IB:""}</b><span style="color:#ffb02e">${IP} ${rt(p)}${L===LV?" · "+IP:""}</span></div><div style="display:flex;flex-direction:column;gap:4px;flex:none"><button data-bpc="${i}|0" ${bs} ${ok&&!fc?"":"disabled"}>${fc?"✓":ok?L2("Забрать","Claim"):"🔒"}</button><button class="alt" data-bpc="${i}|1" ${bs} ${ok&&b.pr&&!pcl?"":"disabled"}>${pcl?"✓":ok&&b.pr?L2("Забрать","Claim"):IP}</button></div></div>`}
if(h!==sig){const sc=$("bplist");sig=h;$("bptop").innerHTML="";sc.innerHTML=h}}
function lab(){try{if(!ready)return;const n=pending(),h=IB+L2("Батлпасс","Battle pass")+(n?" ("+n+")":""),el=$("bpb");if(el.__h!==h){el.__h=h;el.innerHTML=h}}catch(e){}}
$("bpb").onclick=()=>{if(!ready)return;sig="";draw();openPanel("bpp")};
$("bpp").addEventListener("click",e=>{if(!ready||busy)return;const bt=e.target.closest("button");if(!bt||bt.disabled)return;let got=null,sum={coins:0,gems:0};
if(bt.dataset.bpbuy){if((S.gem||0)<PREM)return toast(L2("Не хватает тикетов","Not enough tickets"),"err");S.gem-=PREM;bp().pr=1;toast(L2("Премиум-пропуск активирован","Premium pass activated"),"ok");got=1}
else if(bt.dataset.bpall){const l=lvl(),b=bp();for(let i=0;i<l;i++)for(const p of [0,1]){const r=claim(i,p);if(r){sum.coins+=r.coins;sum.gems+=r.gems}}if(sum.coins||sum.gems){toast(L2("Награда: ","Reward: ")+rt(sum),"ok");got=1}}
else if(bt.dataset.bpc){const [i,p]=bt.dataset.bpc.split("|").map(Number),r=claim(i,p);if(r){toast(L2("Награда: ","Reward: ")+rt(r),"ok");got=1}}
if(got){render();save();pushSoon();draw();lab()}});

/* ===== Подарок премиума (через систему обменов) ===== */
const isGift=x=>{try{const g=Object.keys(x.give||{}),w=Object.keys(x.want||{});return g.length===1&&w.length===1&&g[0]==="$gems"&&w[0]==="$coins"&&+x.give["$gems"]===PREM&&+x.want["$coins"]===1}catch(e){return false}};
const _tc=trCard;trCard=function(x,k){if(!isGift(x))return _tc(x,k);const who=esc(k==="out"?x.to_nick:x.from_nick);
return `<div class="glass ti"><div class="tx"><b>${who}</b><span class="l">🎁 ${L2("Подарок: Премиум батлпасс","Gift: Premium battle pass")}</span></div>`+(k==="in"?`<button data-ta="ok|${x.id}">${L2("Принять","Accept")}</button><button class="alt" data-ta="no|${x.id}">${L2("Отказ","Decline")}</button>`:k==="out"?`<button class="alt" data-ta="no|${x.id}">${L2("Отмена","Cancel")}</button>`:`<span style="flex:none;color:var(--mute);font-size:12px">${L2(...(trLbl[x.status]||[x.status,x.status]))}</span>`)+`</div>`};
const _ta=trAct;trAct=async function(kind,id){const x=((trData&&trData.incoming)||[]).find(o=>o.id===id),g=kind==="ok"&&x&&isGift(x)&&!bp().pr,before=S.gem||0;await _ta(kind,id);
if(g&&(S.gem||0)-before>=PREM&&!bp().pr){S.gem=Math.max(0,S.gem-PREM);bp().pr=1;render();save();pushSoon();draw();lab();toast(L2("🎁 Премиум батлпасс получен в подарок!","🎁 Premium battle pass received as a gift!"),"ok")}};
const gb=document.createElement("div");gb.id="bpgift";gb.className="glass";gb.style.cssText="padding:12px;margin-bottom:8px";
gb.innerHTML=`<div style="font-weight:800;margin-bottom:6px">🎁 <span id="bpg_t"></span></div><button class="alt" id="bpg_pick" style="width:100%;display:flex;align-items:center;gap:8px;text-align:left;overflow:hidden;white-space:nowrap;min-height:48px"></button>${gMsgInput("bpg_msg")}<button id="bpg_b" style="width:100%;margin-top:8px;white-space:normal;min-height:46px"></button><div id="bpg_list" style="display:none;max-height:230px;overflow:auto;margin-top:8px;gap:6px;flex-direction:column"></div><div id="bpg_s" style="font-size:12px;color:var(--mute);margin-top:6px"></div><button class="alt" id="bpg_h" style="width:100%;margin-top:8px">📜 ${L2("История подарков","Gift history")}</button>`;
$("bpp").insertBefore(gb,$("bplist"));
let bpOwn=null,bpOwnAt=0,bpOwnWarn=0,bpSel="",bpOpen=false,_gk="",_pk="",_lk="";
async function bpLoadOwn(){if(!TOKEN||!me||document.hidden||Date.now()-bpOwnAt<8e3)return;bpOwnAt=Date.now();try{const r=await rpc("g2_bp_owners",{p_token:TOKEN,p_season:sid()});if(!r.error&&Array.isArray(r.data)){bpOwn=new Set(r.data.map(n=>String(n).toLowerCase()));gTxt()}else if(r.error&&/Could not find|schema cache/i.test(r.error)){bpOwn=null;if(!bpOwnWarn){bpOwnWarn=1;console.warn("g2_bp_owners не найдена: выполни sql/15_bp_owners.sql");try{isOwner&&toast("SQL 15_bp_owners.sql не выполнен — блокировка подарка не работает","err")}catch(e){}}}}catch(e){}}
const bpHas=n=>!!(n&&bpOwn&&bpOwn.has(String(n).trim().toLowerCase()));
const bpPl=()=>(typeof TP!=="undefined"&&Array.isArray(TP)?TP:[]).filter(p=>p&&p.nick&&(!me||p.nick.toLowerCase()!==me.nick.toLowerCase())).slice(0,100);
/* всё пишем только при изменении — иначе таймер каждые 500 мс перерисовывает и вызывает мигание */
function gTxt(){const b=$("bpg_b"),st=$("bpg_s"),pk=$("bpg_pick");if(!b||!st||!pk)return;const has=bpHas(bpSel),k=LANG+"|"+(has?1:0)+"|"+PREM;
if(k!==_gk){_gk=k;$("bpg_t").textContent=L2("Подарить премиум другу","Gift premium to a friend");
b.textContent=has?"✓ "+L2("Уже есть","Already owned"):L2("Подарить · 💎 ","Gift · 💎 ")+PREM;
st.textContent=has?L2("У игрока уже есть премиум батлпасс","The player already has the premium battle pass"):L2("Премиум выдаётся сразу — ничего принимать не нужно.","Premium is granted instantly — nothing to accept.");st.style.color=has?"#34d399":""}
b.disabled=has;
const sp=bpSel?bpPl().find(p=>p.nick===bpSel):null,k2=LANG+"|"+bpSel+"|"+(bpOpen?1:0)+"|"+(sp?sp.avatar:"");
if(k2!==_pk){_pk=k2;pk.innerHTML=(bpSel?avW(bpSel,sp?sp.avatar:"")+" "+"<b style=\"overflow:hidden;text-overflow:ellipsis\">"+esc(bpSel)+"</b>"+(sp?vipTag(sp):""):"<span style=\"color:var(--mute)\">"+L2("Выбрать игрока","Choose a player")+"</span>")+"<span style=\"margin-left:auto;flex:none;color:var(--mute)\">"+(bpOpen?"▴":"▾")+"</span>";try{avWatch(pk)}catch(e){}}
const ls=$("bpg_list");ls.style.display=bpOpen?"flex":"none";
if(bpOpen){const pl=bpPl(),k3=pl.map(p=>p.nick+(bpHas(p.nick)?"!":"")+(p.nick===bpSel?"*":"")).join("|")+LANG+"#"+ppFavSig();
if(k3!==_lk){_lk=k3;ls.innerHTML=ppList(pl,{sel:bpSel,has:p=>bpHas(p.nick),attr:"data-bpn"});try{avWatch(ls)}catch(e){}}}else _lk=""}
$("bpg_pick").onclick=()=>{bpOpen=!bpOpen;if(bpOpen){_lk="";try{loadPlayers().then(()=>{_lk="";gTxt()})}catch(e){}bpLoadOwn()}gTxt()};
$("bpg_list").onclick=e=>{const f=e.target.closest("[data-fav]");if(f){e.stopPropagation();ppToggleFav(f.dataset.fav);_lk="";gTxt();return}const b=e.target.closest("[data-bpn]");if(!b||b.disabled)return;bpSel=b.dataset.bpn;bpOpen=false;gTxt()};
$("bpg_h").onclick=()=>window.gHistOpen&&window.gHistOpen();
window.bpGiftTo=n=>{bpSel=n;bpOpen=false;gTxt();try{openPanel("bpp")}catch(e){}};
gTxt();setInterval(()=>{document.hidden||gTxt()},500);
$("bpg_b").onclick=async()=>{if(!TOKEN||!me)return toast(L2("Войдите в аккаунт","Sign in first"),"err");const n=bpSel;if(!n){bpOpen=true;gTxt();try{loadPlayers().then(()=>{_lk="";gTxt()})}catch(e){}return toast(L2("Выберите игрока","Choose a player"),"err")}if(n.toLowerCase()===me.nick.toLowerCase())return toast(L2("Нельзя дарить себе","You can't gift yourself"),"err");if(bpHas(n))return toast(L2("У игрока уже есть премиум батлпасс","The player already has the premium battle pass"),"err");if((S.gem||0)<PREM)return toast(L2("Не хватает тикетов","Not enough tickets"),"err");if(tBusy||busy||!ready)return;tBusy=true;
const r=await serial(async()=>{await trFlush();const x=await rpc("g2_gift_bp",{p_token:TOKEN,p_to:n});if(x.error)return x;const d=x.data||{};
if(d.gem!=null&&isFinite(+d.gem)){S.gem=Math.max(0,Math.floor(+d.gem));try{_pg=S.gem}catch(e){}}else{S.gem=Math.max(0,(S.gem||0)-PREM)}
if(d.v!=null)S._v=d.v;dirty=!0;render();pushSoon();return x});tBusy=false;
if(r.error){if(/уже есть/.test(r.error)){(bpOwn=bpOwn||new Set).add(n.toLowerCase());gTxt()}return toast(/Could not find|schema cache/i.test(r.error)?L2("Подарок премиума ещё не включён на сервере (18_social.sql)","Premium gifts are not enabled on the server yet (18_social.sql)"):srv(r.error),"err")}
const _m=($("bpg_msg")||{}).value||"";gNote(n,"pass",_m);if($("bpg_msg"))$("bpg_msg").value="";(bpOwn=bpOwn||new Set).add(n.toLowerCase());bpOwnAt=0;bpSel="";toast(L2("🎁 Премиум выдан игроку ","🎁 Premium granted to ")+n,"ok");gTxt()};
window.bpGrantPremium=()=>{bp().pr=1};
setInterval(()=>{if(document.hidden)return;lab();if($("bpp").style.display==="block"){try{draw()}catch(e){}bpLoadOwn()}},500);
})();
}catch(e){try{console.error("[13_battlepass.js #10]",e)}catch(_){}}
