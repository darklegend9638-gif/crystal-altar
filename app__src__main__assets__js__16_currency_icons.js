/* 16_currency_icons.js — иконки валют вместо эмодзи
   (вынесено из index.html без изменений; порядок подключения — по номеру файла) */

/* ── скрипт #15 (id=cur-icons) ── */
try{
(function(){try{
var RX=/(?:🪙|💎|🍀|🎲)/,SKIP={SCRIPT:1,STYLE:1,TEXTAREA:1,INPUT:1,OPTION:1,SELECT:1,NOSCRIPT:1,TITLE:1},NS="http://www.w3.org/2000/svg",M={"🪙":"coin","💎":"gem","🍀":"clover","🎲":"dice"};
try{Object.keys(TX).forEach(function(k){var m=/^(?:🪙|💎|🍀|🎲)\uFE0F?\s*([\s\S]+)$/.exec(k);if(m&&!(m[1] in TX))TX[m[1]]=String(TX[k]).replace(/^(?:🪙|💎|🍀|🎲)\uFE0F?\s*/,"")});TX["Удача"]=TX["Удача"]||"Luck";TX["Роллы"]=TX["Роллы"]||"Rolls"}catch(e){}
function mk(n){var s=document.createElementNS(NS,"svg");s.setAttribute("class","ico ei");s.setAttribute("aria-hidden","true");var u=document.createElementNS(NS,"use");u.setAttribute("href","#i-"+n);s.appendChild(u);return s}
function fix(t){var p=t.parentNode;if(!p||p.nodeType!==1||SKIP[p.nodeName]||p.namespaceURI===NS)return;var v=t.nodeValue;if(!v||!RX.test(v))return;
 var parts=v.split(/(🪙|💎|🍀|🎲)\uFE0F?/),alone=/^\s*(?:🪙|💎|🍀|🎲)\uFE0F?\s*$/.test(v),ch=0,f=document.createDocumentFragment();
 for(var i=0;i<parts.length;i++){var x=parts[i];
  if(i%2===0){if(x)f.appendChild(document.createTextNode(x));continue}
  var nx=parts[i+1]||"",ok=true;
  if(x==="💎"){ok=!alone&&!/^\s*(Сапфир|Sapphire)/.test(nx)}
  else if(x==="🍀"){ok=!alone&&!/^\s*(Клевер|Clover)/.test(nx)}
  if(ok){f.appendChild(mk(M[x]));ch=1}else f.appendChild(document.createTextNode(x))}
 if(ch)p.replaceChild(f,t)}
function scan(n){if(n.nodeType===3){fix(n);return}if(n.nodeType!==1||SKIP[n.nodeName]||n.namespaceURI===NS)return;if(!RX.test(n.textContent))return;
 var w=document.createTreeWalker(n,NodeFilter.SHOW_TEXT,null),a=[],x;while(x=w.nextNode())a.push(x);a.forEach(fix)}
new MutationObserver(function(r){for(var i=0;i<r.length;i++){var m=r[i];if(m.type==="characterData")fix(m.target);else for(var j=0;j<m.addedNodes.length;j++)scan(m.addedNodes[j])}}).observe(document.body,{childList:true,subtree:true,characterData:true});
scan(document.body)}catch(e){}})();
}catch(e){try{console.error("[16_currency_icons.js #15]",e)}catch(_){}}
