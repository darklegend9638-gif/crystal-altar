/* 11_music.js — МУЗЫКА (фоновая, WebAudio) и её переключатель
   (вынесено из index.html без изменений; порядок подключения — по номеру файла) */

/* ── скрипт #7 ── */
try{
(function(){
const KEY="gacha-music";let pref="1";try{pref=localStorage.getItem(KEY)||"1"}catch(e){}
let ctx=null,master=null,bus=null,lead=null,nbuf=null,on=!1,timer=0,nc=0,si=0;
const BPM=116,S=60/BPM/4,N=m=>440*Math.pow(2,(m-69)/12);
const CHD={C:[48,[60,64,67]],G:[43,[59,62,67]],A:[45,[60,64,69]],F:[41,[60,65,69]]};
const PROG=["C","G","A","F","C","G","F","G"];
const MEL=[[76,0,79,76,74,0,72,74],[71,0,74,71,67,0,71,74],[72,0,76,72,69,0,72,76],[77,0,76,72,74,0,72,69],[76,79,84,79,76,0,79,0],[74,79,83,79,74,0,71,74],[77,0,81,77,76,0,72,77],[74,0,79,74,71,74,79,0]];
function init(){const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return!1;ctx=new AC();master=ctx.createGain();master.gain.value=0;ctx.onstatechange=function(){if(ctx&&ctx.state==="running"){if(nc<ctx.currentTime)nc=ctx.currentTime+.1;unbind()}};
const cp=ctx.createDynamicsCompressor();cp.threshold.value=-18;cp.ratio.value=4;
bus=ctx.createGain();lead=ctx.createGain();lead.connect(bus);
const dly=ctx.createDelay(1);dly.delayTime.value=S*3;const fb=ctx.createGain();fb.gain.value=.28;const df=ctx.createBiquadFilter();df.type="lowpass";df.frequency.value=2600;const dg=ctx.createGain();dg.gain.value=.35;
lead.connect(dly);dly.connect(df);df.connect(fb);fb.connect(dly);df.connect(dg);dg.connect(bus);
bus.connect(cp);cp.connect(master);master.connect(ctx.destination);
nbuf=ctx.createBuffer(1,ctx.sampleRate,ctx.sampleRate);const d=nbuf.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;return!0}
function osc(type,f,t,d,v,dest){const o=ctx.createOscillator(),g=ctx.createGain();o.type=type;o.frequency.value=f;g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+.006);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(dest);o.start(t);o.stop(t+d+.03)}
function noise(t,d,v,type,freq){const n=ctx.createBufferSource();n.buffer=nbuf;const f=ctx.createBiquadFilter();f.type=type;f.frequency.value=freq;const g=ctx.createGain();g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);n.connect(f);f.connect(g);g.connect(bus);n.start(t,Math.random()*.5);n.stop(t+d+.02)}
function kick(t){const o=ctx.createOscillator(),g=ctx.createGain();o.type="sine";o.frequency.setValueAtTime(160,t);o.frequency.exponentialRampToValueAtTime(42,t+.14);g.gain.setValueAtTime(.95,t);g.gain.exponentialRampToValueAtTime(.0001,t+.24);o.connect(g);g.connect(bus);o.start(t);o.stop(t+.26)}
function snare(t){noise(t,.17,.4,"bandpass",1900);osc("triangle",190,t,.1,.25,bus)}
function play(st,bar,t){const ch=CHD[PROG[bar]];
if(st===0||st===8||st===10)kick(t);
if(st===4||st===12)snare(t);
if(st%2===0)noise(t,st===14?.16:.045,st===14?.14:.1,"highpass",7500);
if(st===0||st===3||st===6||st===8||st===11||st===14){const m=ch[0]+(st===6||st===14?12:0);osc("triangle",N(m),t,S*2.3,.6,bus)}
if(st===2||st===6||st===10||st===14)ch[1].forEach(function(m){osc("square",N(m),t,S*1.4,.03,bus)});
if(st%2===1)osc("triangle",N(ch[1][[0,1,2,1][(st>>1)%4]]+12),t,S*1.2,.06,bus);
if(st%2===0){const m=MEL[bar][st/2];if(m){osc("square",N(m),t,S*1.9,.06,lead);osc("triangle",N(m),t,S*1.9,.1,lead)}}}
function tick(){if(!ctx||ctx.state!=="running")return;while(nc<ctx.currentTime+1.2){play(si%16,Math.floor(si/16)%8,nc);nc+=S;si++}}
function start(){if(on)return;if(!ctx&&!init())return;on=!0;try{ctx.resume()}catch(e){}nc=ctx.currentTime+.1;master.gain.cancelScheduledValues(ctx.currentTime);master.gain.setValueAtTime(master.gain.value,ctx.currentTime);master.gain.linearRampToValueAtTime(.5,ctx.currentTime+1);clearInterval(timer);timer=setInterval(tick,300);tick()}
function stop(){if(!on)return;on=!1;clearInterval(timer);if(ctx){master.gain.cancelScheduledValues(ctx.currentTime);master.gain.setValueAtTime(master.gain.value,ctx.currentTime);master.gain.linearRampToValueAtTime(0,ctx.currentTime+.4);const c=ctx;setTimeout(function(){if(!on)try{c.close()}catch(e){}if(!on){ctx=null}},800)}}
function lab(){$("musicb").innerHTML='<svg class="ico"><use href="#i-music'+(pref==="0"?"-off":"")+'"/></svg>'+L2("Музыка: ","Music: ")+(pref==="0"?L2("выкл","off"):L2("вкл","on"))}
$("musicb").onclick=function(){pref=pref==="0"?"1":"0";try{localStorage.setItem(KEY,pref)}catch(e){}pref==="0"?stop():start();lab()};
var EVN=["pointerdown","pointerup","touchstart","touchend","click","keydown"];
function unbind(){EVN.forEach(function(n){document.removeEventListener(n,first,!0)})}
function first(){if(pref==="0")return;if(!on)start();try{if(ctx&&ctx.state!=="running"){var p=ctx.resume();p&&p.catch&&p.catch(function(){})}else if(ctx)unbind()}catch(e){}}
EVN.forEach(function(n){document.addEventListener(n,first,!0)});
if(pref!=="0"){try{start()}catch(e){}}
document.addEventListener("visibilitychange",function(){if(!ctx)return;try{document.hidden?ctx.suspend():on&&ctx.resume()}catch(e){}});
{const _sl=setLang;setLang=function(e){_sl(e);lab()}}
lab();
var tries=0,rt=setInterval(function(){tries++;if(pref==="0"){clearInterval(rt);return}if(ctx&&ctx.state==="running"){clearInterval(rt);return}try{if(!on)start();ctx&&ctx.resume&&ctx.resume().catch(function(){})}catch(e){}if(tries>120)clearInterval(rt)},400);
["load","pageshow","focus"].forEach(function(n){addEventListener(n,function(){if(pref!=="0"&&ctx&&ctx.state!=="running")try{ctx.resume().catch(function(){})}catch(e){}})});
})();
}catch(e){try{console.error("[11_music.js #7]",e)}catch(_){}}
