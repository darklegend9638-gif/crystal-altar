/* 01_icons.js — SVG-иконки редкостей (head)
   (вынесено из index.html без изменений; порядок подключения — по номеру файла) */

/* ── скрипт #2 ── */
try{
(function(){
function P(a,r){var x=60+r*Math.cos(a*Math.PI/180),y=35+r*Math.sin(a*Math.PI/180);return[x.toFixed(2),y.toFixed(2)]}
function dots(angs,r,s,f){return angs.map(function(a){var p=P(a,r);return'<circle cx="'+p[0]+'" cy="'+p[1]+'" r="'+s+'" fill="'+f+'"/>'}).join('')}
function rays(n,r1,r2,c,w){var o='';for(var i=0;i<n;i++){var a=i*360/n,p=P(a,r1),q=P(a,r2);o+='<line x1="'+p[0]+'" y1="'+p[1]+'" x2="'+q[0]+'" y2="'+q[1]+'" stroke="'+c+'" stroke-width="'+w+'" stroke-linecap="round"/>'}return o}
function star(n,r1,r2,f){var pts=[];for(var i=0;i<n*2;i++){var p=P(i*180/n-90,i%2?r2:r1);pts.push(p[0]+','+p[1])}return'<polygon points="'+pts.join(' ')+'" fill="'+f+'"/>'}
function ring(r,c,w,x){return'<circle cx="60" cy="35" r="'+r+'" fill="none" stroke="'+c+'" stroke-width="'+w+'"'+(x||'')+'/>'}
function disc(r,f){return'<circle cx="60" cy="35" r="'+r+'" fill="'+f+'"/>'}
function iris(t,k){
 switch(t){
 case 0:return disc(20,'#c4161c')+ring(14,'#6e0a0e',1.5)+disc(4,'#111')+dots([90,210,330],10,3.2,'#111');
 case 1:return disc(20,'#ece9ff')+ring(16,'#cfc9f2',2)+ring(8,'#8884b5',1.6,' stroke-dasharray="4 3"');
 case 2:return disc(20,'#d9291d')+disc(13,'#ef4a37')+ring(17,'#7a0d09',1.5)+'<rect x="51" y="33" width="18" height="4" rx="2" fill="#4d0907"/>';
 case 3:return disc(20,'#e3f4ff')+ring(15,'#a9dbff',2)+disc(7,'#8fd0ff')+disc(3.2,'#fff');
 case 4:return disc(20,'#d3e6f3')+star(8,16,7,'#fff')+disc(4.5,'#1e6a8c');
 case 5:return disc(20,'#a77bf0')+[17,13,9,5].map(function(r){return ring(r,'#5e32b8',1.3)}).join('')+disc(2.4,'#20143f');
 case 6:return disc(20,'#b3141b')+ring(16,'#3d0408',1.2)+ring(11,'#3d0408',1.2)+ring(6,'#3d0408',1.2)+dots([90,210,330],11,1.9,'#000')+dots([0,60,120,180,240,300],16,1.7,'#000')+disc(2.4,'#000');
 case 7:return disc(20,'#f6c443')+rays(10,4,17.5,'#8a5a00',1.7)+ring(18.5,'#2a2a2a',2)+disc(6,'#fff6c8')+disc(3,'#fff');
 case 8:return disc(20,'#3fc3ff')+ring(17,'#fff',2.2)+ring(13,'#1c6fe0',2.6)+ring(9,'#fff',2.2)+ring(5,'#1c6fe0',2.4)+disc(2.4,'#06203d');
 case 9:return disc(20,'url(#gx9_'+k+')')+ring(16,'#8fe6ff',1,' stroke-dasharray="2 3"')+dots([20,75,140,200,255,310],12,.9,'#fff')+'<circle cx="72" cy="26" r="5" fill="#dff6ff"/><circle cx="73.8" cy="25" r="4.3" fill="#2a1a8a"/>'+'<polygon points="60,25 62.2,32.8 70,35 62.2,37.2 60,45 57.8,37.2 50,35 57.8,32.8" fill="#fff"/>';
 case 10:return disc(20,'url(#gx10_'+k+')')+rays(12,6,19,'#fff',1.4)+ring(16,'#fff7c8',1.6)+ring(9,'#fff',1)+disc(4,'#fff');
 case 11:return disc(20,'#2bd98a')+ring(16,'#eafff4',1.4)+rays(8,8,18,'#0b5b3a',1.2)+disc(5,'#eafff4');
 case 12:return disc(20,'#a8e620')+star(6,17,8,'#fffbd0')+ring(18,'#3a5a00',1.2)+disc(4,'#3a5a00');
 case 13:return disc(20,'#ffffff')+rays(16,8,20,'#8a8aff',1.2)+ring(15,'#ff7ad9',1.5)+ring(10,'#5cd6ff',1.5)+disc(4,'#222');
 }return disc(20,'#888')}
function defs(t,k){
 if(t===9)return'<radialGradient id="gx9_'+k+'"><stop offset="0" stop-color="#7a55ff"/><stop offset=".55" stop-color="#2a1a8a"/><stop offset="1" stop-color="#0c0638"/></radialGradient>';
 if(t===10)return'<radialGradient id="gx10_'+k+'"><stop offset="0" stop-color="#fffbe6"/><stop offset=".5" stop-color="#ffd75a"/><stop offset="1" stop-color="#e49a12"/></radialGradient>';
 return''}
function eye(t,k){
 var d='M5 35Q60-8 115 35Q60 78 5 35Z',id='ec'+k;
 return'<svg class="eye" viewBox="0 0 120 70" aria-hidden="true"><defs><clipPath id="'+id+'"><path d="'+d+'"/></clipPath>'+defs(t,k)+'</defs><path d="'+d+'" fill="#000" stroke="#000" stroke-width="9" stroke-linejoin="round"/><path d="'+d+'" fill="#fff"/><g clip-path="url(#'+id+')">'+iris(t,k)+ring(20,'#000',3.5)+'</g></svg>'}
function crown(t,k){var g=t===10?['#fffbe0','#ffd24a','#d98a0a','#ff4d4d','#fff']:t===11?['#eafff4','#5cffb0','#0e8f58','#fff3a0','#b8ffe0']:t===12?['#f6ffd0','#b8ff3a','#4f8f00','#ffd24a','#fff']:t===13?['#ffffff','#e6d6ff','#8a8aff','#ff7ad9','#5cd6ff']:['#f4fcff','#b9a6ff','#6a4dff','#58e6ff','#ff9bf0'],id='cg'+k;
 return'<svg class="cr" viewBox="0 0 60 32" aria-hidden="true"><defs><linearGradient id="'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+g[0]+'"/><stop offset=".55" stop-color="'+g[1]+'"/><stop offset="1" stop-color="'+g[2]+'"/></linearGradient></defs><path d="M5 28L8 9L20 19L30 5L40 19L52 9L55 28Z" fill="url(#'+id+')" stroke="#000" stroke-width="3" stroke-linejoin="round"/><path d="M8 24H52" stroke="#000" stroke-width="2" opacity=".55"/><circle cx="8" cy="8" r="3.4" fill="'+g[3]+'" stroke="#000" stroke-width="1.6"/><circle cx="30" cy="4.5" r="3.8" fill="'+g[4]+'" stroke="#000" stroke-width="1.6"/><circle cx="52" cy="8" r="3.4" fill="'+g[3]+'" stroke="#000" stroke-width="1.6"/><circle cx="30" cy="22" r="2.6" fill="'+g[3]+'" stroke="#000" stroke-width="1.2"/></svg>'}
function halo(){return'<svg class="hl" viewBox="0 0 60 18" aria-hidden="true"><defs><linearGradient id="hg" x1="0" x2="1"><stop offset="0" stop-color="#ffcf4a"/><stop offset=".5" stop-color="#fffbe0"/><stop offset="1" stop-color="#ffcf4a"/></linearGradient></defs><ellipse cx="30" cy="9" rx="24" ry="5.5" fill="none" stroke="#000" stroke-width="6.5"/><ellipse cx="30" cy="9" rx="24" ry="5.5" fill="none" stroke="url(#hg)" stroke-width="3.2"/></svg>'}
window.__colF=function(c){return (window.__colTab||"o")==="o"?!!c:!c};
window.__colWrap=function(h){return h||'<div class="col-empty">'+((window.__colTab||"o")==="o"?"Пока ничего не выбито — сделай ролл 🎲":"Всё открыто! 🎉")+'</div>'};
window.__pf=function(u){if(!(u>0))return'—';if(u>=10)return u.toFixed(1)+'%';if(u>=1)return u.toFixed(2)+'%';var d=Math.min(8,Math.max(2,2-Math.floor(Math.log10(u))));return u.toFixed(d).replace(/0+$/,'')+'%'};
function crystal(k){var id='cs'+k;return'<svg class="cs" viewBox="0 0 60 32" aria-hidden="true"><defs><linearGradient id="'+id+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f2fdff"/><stop offset=".5" stop-color="#5fd4ff"/><stop offset="1" stop-color="#3d6bff"/></linearGradient></defs><g stroke="#000" stroke-width="2.6" stroke-linejoin="round"><path d="M10 26L15 14L20 26Z" fill="url(#'+id+')"/><path d="M40 26L45 14L50 26Z" fill="url(#'+id+')"/><path d="M30 2L38 17L30 30L22 17Z" fill="url(#'+id+')"/></g><path d="M30 5L30 28M23 17H37" stroke="#fff" stroke-width="1" opacity=".55"/><circle cx="26.5" cy="12" r="1.6" fill="#fff"/></svg>'}
window.__eyeCard=function(t,i,c,rn,nm,col,k,p){
 var u=t.split(' ')[0],ex=i==='ex',ti=ex?5:Math.min(i,13);
 return'<div class="it ey'+(ex?' ex':' t'+ti)+(c?'':' off')+'">'+(ti>=9?crown(ti,k):ti===7?halo():ti===8?crystal(k):'')+'<span class="pc">'+(p==null?'':p)+'</span>'+(c?'<span class="cn">×'+c+'</span>':'')+'<div class="e">'+(c?u:'❔')+'</div>'+'<div class="en">'+nm+'</div><div class="er" style="color:'+col+'">'+rn+'</div></div>'}
})();
}catch(e){try{console.error("[01_icons.js #2]",e)}catch(_){}}
