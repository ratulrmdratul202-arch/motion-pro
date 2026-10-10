
let mediaLibPromise=null;
function ensureMediabunny(){
  if(window.Mediabunny) return Promise.resolve(window.Mediabunny);
  if(mediaLibPromise) return mediaLibPromise;
  mediaLibPromise=new Promise((resolve,reject)=>{
    const urls=[
      'https://cdn.jsdelivr.net/npm/mediabunny@1.61.0/dist/bundles/mediabunny.cjs',
      'https://unpkg.com/mediabunny@1.61.0/dist/bundles/mediabunny.cjs',
      'https://cdn.jsdelivr.net/npm/mediabunny@latest/dist/bundles/mediabunny.cjs'
    ];
    let i=0;
    const tryNext=()=>{
      if(window.Mediabunny){resolve(window.Mediabunny);return}
      if(i>=urls.length){reject(Error('Mediabunny library could not load. Check your internet connection, then reload the page.'));return}
      const src=urls[i++];
      const tag=document.createElement('script');
      tag.src=src;
      tag.async=true;
      tag.onload=()=>window.Mediabunny?resolve(window.Mediabunny):tryNext();
      tag.onerror=()=>tryNext();
      document.head.appendChild(tag);
    };
    tryNext();
  });
  return mediaLibPromise;
}
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const R={"16:9":[[1280,720],[1920,1080],[2560,1440],[3840,2160]],"9:16":[[720,1280],[1080,1920],[1440,2560],[2160,3840]],"1:1":[[720,720],[1080,1080],[1440,1440],[2160,2160]],"4:5":[[864,1080],[1080,1350],[1440,1800],[2160,2700]],"5:4":[[1080,864],[1350,1080],[1800,1440],[2160,1728]],"4:3":[[960,720],[1440,1080],[1920,1440],[2880,2160]],"3:4":[[720,960],[1080,1440],[1440,1920],[2160,2880]],"3:2":[[960,640],[1440,960],[2160,1440],[2880,1920]],"2:3":[[640,960],[960,1440],[1440,2160],[1920,2880]]};
const DEFAULT_MOTION="<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width,initial-scale=1.0\">\n<title>Motion Pro — Animated Preview</title>\n<style>\n*{box-sizing:border-box}\nhtml,body{margin:0;width:100%;height:100%;background:#000;overflow:hidden}\nbody{font-family:Inter,Arial,Helvetica,sans-serif}\n.stage{\n  width:100vw;height:100vh;min-height:320px;\n  aspect-ratio:16/9;position:relative;overflow:hidden;\n  background:#000;\n  isolation:isolate;\n}\nsvg{position:absolute;inset:0;width:100%;height:100%;display:block}\n.scene{transform-origin:50% 50%;animation:sceneFloat 7s ease-in-out infinite}\n.orbit{transform-origin:50% 50%;animation:orbitSpin 18s linear infinite}\n.orbit.reverse{animation-direction:reverse;animation-duration:24s}\n.slowSpin{transform-origin:50% 50%;animation:orbitSpin 35s linear infinite}\n.ringGlow{animation:ringPulse 3.2s ease-in-out infinite}\n.particle{animation:particleFloat 4s ease-in-out infinite}\n.p2{animation-delay:-1.3s}.p3{animation-delay:-2.4s}.p4{animation-delay:-3.1s}\n.iconFloat{animation:iconFloat 5s ease-in-out infinite}\n.icon2{animation-delay:-1.6s}.icon3{animation-delay:-3s}.icon4{animation-delay:-4s}\n.logoMark{transform-origin:50% 50%;animation:logoBreath 3.5s ease-in-out infinite}\n.title{animation:titleIn 1.5s cubic-bezier(.2,.8,.2,1) both}\n.playRing{transform-origin:50% 50%;animation:playPulse 2.2s ease-in-out infinite}\n.playTriangle{animation:playGlow 2.2s ease-in-out infinite}\n.scan{animation:scan 5s ease-in-out infinite}\n@keyframes sceneFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}\n@keyframes orbitSpin{to{transform:rotate(360deg)}}\n@keyframes ringPulse{0%,100%{opacity:.65}50%{opacity:1}}\n@keyframes particleFloat{0%,100%{transform:translate(0,0);opacity:.35}50%{transform:translate(7px,-15px);opacity:1}}\n@keyframes iconFloat{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-10px) rotate(3deg)}}\n@keyframes logoBreath{0%,100%{transform:scale(1)}50%{transform:scale(1.045)}}\n@keyframes titleIn{from{opacity:0;transform:translateY(18px);letter-spacing:12px}to{opacity:1;transform:translateY(0);letter-spacing:0}}\n@keyframes playPulse{0%,100%{transform:scale(1);opacity:.75}50%{transform:scale(1.08);opacity:1}}\n@keyframes playGlow{0%,100%{filter:drop-shadow(0 0 5px #7b2cff)}50%{filter:drop-shadow(0 0 16px #7b2cff)}}\n@keyframes scan{0%{transform:translateX(-120%);opacity:0}15%{opacity:.8}50%{opacity:.15}85%{opacity:.8}100%{transform:translateX(120%);opacity:0}}\n@media(max-aspect-ratio:4/3){.stage{height:100vh;width:100vw}}\n</style>\n</head>\n<body>\n<div class=\"stage\">\n<svg viewBox=\"0 0 1600 900\" preserveAspectRatio=\"xMidYMid slice\" aria-label=\"Motion Pro animated preview\">\n\n<defs>\n  <radialGradient id=\"bgGlow\">\n    <stop offset=\"0\" stop-color=\"#25105c\" stop-opacity=\".32\"/>\n    <stop offset=\".45\" stop-color=\"#090019\" stop-opacity=\".18\"/>\n    <stop offset=\"1\" stop-color=\"#000\" stop-opacity=\"0\"/>\n  </radialGradient>\n  <linearGradient id=\"purple\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\">\n    <stop offset=\"0\" stop-color=\"#a84cff\"/>\n    <stop offset=\".45\" stop-color=\"#712cff\"/>\n    <stop offset=\"1\" stop-color=\"#3e16d8\"/>\n  </linearGradient>\n  <linearGradient id=\"purple2\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"0\">\n    <stop offset=\"0\" stop-color=\"#5b20ff\"/>\n    <stop offset=\".5\" stop-color=\"#a34bff\"/>\n    <stop offset=\"1\" stop-color=\"#5420ff\"/>\n  </linearGradient>\n  <filter id=\"glow\">\n    <feGaussianBlur stdDeviation=\"9\" result=\"b\"/>\n    <feMerge><feMergeNode in=\"b\"/><feMergeNode in=\"SourceGraphic\"/></feMerge>\n  </filter>\n  <filter id=\"softGlow\">\n    <feGaussianBlur stdDeviation=\"20\"/>\n  </filter>\n  <filter id=\"shadow\">\n    <feDropShadow dx=\"0\" dy=\"8\" stdDeviation=\"16\" flood-color=\"#681cff\" flood-opacity=\".4\"/>\n  </filter>\n  <clipPath id=\"clip\">\n    <rect width=\"1600\" height=\"900\" rx=\"0\"/>\n  </clipPath>\n</defs>\n\n<rect width=\"1600\" height=\"900\" fill=\"#000\"/>\n<ellipse cx=\"800\" cy=\"450\" rx=\"520\" ry=\"420\" fill=\"url(#bgGlow)\"/>\n<ellipse cx=\"800\" cy=\"710\" rx=\"260\" ry=\"45\" fill=\"#661cff\" opacity=\".18\" filter=\"url(#softGlow)\"/>\n\n<g class=\"scene\">\n\n  <!-- Large rotating orbital system -->\n  <g class=\"orbit\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n    <!-- Continuous, crystal-clear main ring -->\n    <circle cx=\"800\" cy=\"450\" r=\"330\" stroke=\"#6c28ff\" stroke-width=\"8\" opacity=\".16\" filter=\"url(#glow)\"/>\n    <circle cx=\"800\" cy=\"450\" r=\"330\" stroke=\"#a35cff\" stroke-width=\"3.2\" opacity=\"1\"/>\n    <circle cx=\"800\" cy=\"450\" r=\"330\" stroke=\"#e4baff\" stroke-width=\"1\" opacity=\".72\"/>\n    <!-- Smooth upper highlight -->\n    <path d=\"M470 450 A330 330 0 0 1 1130 450\" stroke=\"url(#purple2)\" stroke-width=\"7\" opacity=\".96\"/>\n    <path d=\"M470 450 A330 330 0 0 1 1130 450\" stroke=\"#f0d4ff\" stroke-width=\"1.25\" opacity=\".9\"/>\n  </g>\n\n  <g class=\"orbit reverse\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n    <!-- Continuous outer ring; no broken/dashed circle -->\n    <circle cx=\"800\" cy=\"450\" r=\"375\" stroke=\"#702bff\" stroke-width=\"7\" opacity=\".12\" filter=\"url(#glow)\"/>\n    <circle cx=\"800\" cy=\"450\" r=\"375\" stroke=\"#914dff\" stroke-width=\"2.5\" opacity=\".9\"/>\n    <circle cx=\"800\" cy=\"450\" r=\"375\" stroke=\"#d5a2ff\" stroke-width=\".8\" opacity=\".55\"/>\n    <path d=\"M800 75 A375 375 0 0 1 1175 450\" stroke=\"#b35fff\" stroke-width=\"3\" opacity=\".9\"/>\n    <path d=\"M800 80 A370 370 0 0 1 1170 450\" stroke=\"#e3b8ff\" stroke-width=\"1\" opacity=\".7\"/>\n  </g>\n\n  <!-- Long orbital streaks -->\n  <g fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n    <path d=\"M300 500 Q410 435 530 400\" stroke=\"#6c28ff\" stroke-width=\"8\" opacity=\".18\" filter=\"url(#glow)\"/>\n    <path d=\"M1070 540 Q1240 470 1390 525\" stroke=\"#6c28ff\" stroke-width=\"8\" opacity=\".16\" filter=\"url(#glow)\"/>\n    <path d=\"M300 500 Q410 435 530 400\" stroke=\"#7e35ff\" stroke-width=\"4.5\" opacity=\".98\"/>\n    <path d=\"M1070 540 Q1240 470 1390 525\" stroke=\"#7e35ff\" stroke-width=\"4.5\" opacity=\".92\"/>\n    <path d=\"M300 500 Q410 435 530 400\" stroke=\"#d8a0ff\" stroke-width=\"1.4\" opacity=\".95\"/>\n    <path d=\"M1070 540 Q1240 470 1390 525\" stroke=\"#d8a0ff\" stroke-width=\"1.4\" opacity=\".88\"/>\n  </g>\n\n  <!-- Code/technology floating tiles -->\n  <g class=\"iconFloat icon1\" filter=\"url(#shadow)\">\n    <g transform=\"translate(355 170) rotate(-12)\">\n      <rect width=\"112\" height=\"112\" rx=\"23\" fill=\"#111027\" stroke=\"#7149bc\" stroke-width=\"2\"/>\n      <rect x=\"8\" y=\"8\" width=\"96\" height=\"96\" rx=\"18\" fill=\"#161331\" opacity=\".8\"/>\n      <text x=\"56\" y=\"70\" text-anchor=\"middle\" fill=\"#fff\" font-size=\"42\" font-weight=\"800\">&lt;/&gt;</text>\n    </g>\n  </g>\n\n  <g class=\"iconFloat icon2\" filter=\"url(#shadow)\">\n    <g transform=\"translate(1165 175) rotate(13)\">\n      <rect width=\"112\" height=\"112\" rx=\"23\" fill=\"#111027\" stroke=\"#7149bc\" stroke-width=\"2\"/>\n      <rect x=\"8\" y=\"8\" width=\"96\" height=\"96\" rx=\"18\" fill=\"#161331\" opacity=\".8\"/>\n      <text x=\"56\" y=\"72\" text-anchor=\"middle\" fill=\"#fff\" font-size=\"48\" font-weight=\"900\">5</text>\n    </g>\n  </g>\n\n  <g class=\"iconFloat icon3\" filter=\"url(#shadow)\">\n    <g transform=\"translate(285 555) rotate(-11)\">\n      <rect width=\"112\" height=\"112\" rx=\"23\" fill=\"#111027\" stroke=\"#7149bc\" stroke-width=\"2\"/>\n      <rect x=\"8\" y=\"8\" width=\"96\" height=\"96\" rx=\"18\" fill=\"#161331\" opacity=\".8\"/>\n      <text x=\"56\" y=\"73\" text-anchor=\"middle\" fill=\"#fff\" font-size=\"40\" font-weight=\"900\">JS</text>\n    </g>\n  </g>\n\n  <g class=\"iconFloat icon4\" filter=\"url(#shadow)\">\n    <g transform=\"translate(1210 570) rotate(14)\">\n      <rect width=\"112\" height=\"112\" rx=\"23\" fill=\"#111027\" stroke=\"#7149bc\" stroke-width=\"2\"/>\n      <rect x=\"8\" y=\"8\" width=\"96\" height=\"96\" rx=\"18\" fill=\"#161331\" opacity=\".8\"/>\n      <path d=\"M30 73 L48 52 L62 65 L84 39\" fill=\"none\" stroke=\"#fff\" stroke-width=\"5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      <circle cx=\"30\" cy=\"73\" r=\"5\" fill=\"#fff\"/><circle cx=\"48\" cy=\"52\" r=\"5\" fill=\"#fff\"/>\n      <circle cx=\"62\" cy=\"65\" r=\"5\" fill=\"#fff\"/><circle cx=\"84\" cy=\"39\" r=\"5\" fill=\"#fff\"/>\n      <text x=\"56\" y=\"91\" text-anchor=\"middle\" fill=\"#fff\" font-size=\"17\" font-weight=\"800\">SVG</text>\n    </g>\n  </g>\n\n  <!-- Main central area -->\n  <g>\n    <!-- Logo glow -->\n    <ellipse cx=\"800\" cy=\"300\" rx=\"150\" ry=\"120\" fill=\"#7628ff\" opacity=\".12\" filter=\"url(#softGlow)\"/>\n\n    <!-- M mark -->\n    <g class=\"logoMark\" filter=\"url(#shadow)\">\n      <path d=\"M675 250\n               Q675 215 710 215\n               Q730 215 750 232\n               L800 275\n               L850 232\n               Q870 215 890 215\n               Q925 215 925 250\n               L925 365\n               Q925 400 890 400\n               Q855 400 855 365\n               L855 300\n               L822 329\n               Q800 348 778 329\n               L745 300\n               L745 365\n               Q745 400 710 400\n               Q675 400 675 365 Z\"\n            fill=\"url(#purple)\"/>\n      <path d=\"M800 275 L850 232 Q870 215 890 215 Q900 215 907 220\n               L823 297 Q800 318 777 297 L693 220 Q700 215 710 215 Q730 215 750 232 Z\"\n            fill=\"#b55aff\" opacity=\".22\"/>\n    </g>\n\n    <!-- Title -->\n    <g class=\"title\">\n      <text x=\"800\" y=\"500\" text-anchor=\"middle\"\n            font-size=\"76\" font-weight=\"800\" letter-spacing=\"-2\"\n            fill=\"#fff\">Motion <tspan fill=\"url(#purple)\">Pro</tspan></text>\n    </g>\n\n    <!-- Play button -->\n    <g class=\"playRing\" filter=\"url(#glow)\">\n      <circle cx=\"800\" cy=\"625\" r=\"57\" fill=\"#09000f\" stroke=\"#7a2fff\" stroke-width=\"4\"/>\n      <circle cx=\"800\" cy=\"625\" r=\"47\" fill=\"none\" stroke=\"#a653ff\" stroke-width=\"1\" opacity=\".65\"/>\n    </g>\n    <polygon class=\"playTriangle\" points=\"788,600 788,650 827,625\" fill=\"#fff\"/>\n  </g>\n\n  <!-- particles -->\n  <g fill=\"#8c3cff\" filter=\"url(#glow)\">\n    <circle class=\"particle p1\" cx=\"220\" cy=\"360\" r=\"13\"/>\n    <circle class=\"particle p2 p2\" cx=\"530\" cy=\"720\" r=\"7\"/>\n    <circle class=\"particle p3 p3\" cx=\"1080\" cy=\"710\" r=\"8\"/>\n    <circle class=\"particle p4 p4\" cx=\"1390\" cy=\"400\" r=\"6\"/>\n  </g>\n\n  <!-- subtle moving scan -->\n  <rect class=\"scan\" x=\"-400\" y=\"120\" width=\"220\" height=\"660\"\n        fill=\"url(#purple)\" opacity=\".08\" transform=\"skewX(-18)\"/>\n\n</g>\n</svg>\n</div>\n</body>\n</html>";
const S={format:'mov',ratio:'16:9',w:3840,h:2160,fps:30,duration:10,bitrate:25,quality:'Ultra',speed:1,zoom:100,rotation:0,posX:0,posY:0,code:DEFAULT_MOTION,hasUserMotion:false,busy:false,cancel:false,previewURL:null,previewClock:null,previewClockStart:0,previewVirtualNow:0,renderFrames:0,speedReloadTimer:null};
function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('show');clearTimeout(e._t);e._t=setTimeout(()=>e.classList.remove('show'),2600)}
function setStatus(t,p=0){$('#status').textContent=t;$('#bar').style.width=Math.max(0,Math.min(100,p))+'%';$('#percent').textContent=Math.round(p)+'%';$('#frameCount').textContent=S.busy?`${Math.round(Math.max(0,p)/100*S.renderFrames)} / ${S.renderFrames} frames`:`0 / 0 frames`;const rs=$('#renderOverlayStatus');if(rs&&S.busy)rs.textContent=t;}
function populateRes(defaultBoot=false){const ratio=$('#ratio').value,rs=R[ratio],preferred=defaultBoot&&ratio==='16:9'?'3840x2160':null;$('#res').innerHTML=rs.map((x,i)=>{const v=`${x[0]}x${x[1]}`;const selected=preferred?v===preferred:i===1;return `<option value="${v}" ${selected?'selected':''}>${x[0]} × ${x[1]} • ${ratio}</option>`}).join('');readSettings()}
function readSettings(){const [w,h]=$('#res').value.split('x').map(Number);S.ratio=$('#ratio').value;S.w=w;S.h=h;S.fps=Number($('#fps').value)||30;S.duration=Math.max(.1,Number($('#duration').value)||10);S.bitrate=Math.max(1,Number($('#bitrate').value)||35);S.quality=$('#quality').value;$('#sizeReadout').textContent=`${w} × ${h} • ${S.ratio}`;$('#previewRatio').textContent=S.ratio;$('#previewRes').textContent=`${w} × ${h}`;updatePreviewViewport();}
function updatePreviewViewport(){const stage=$('#stage'),vp=$('#previewViewport'),sc=$('#previewScaler'),fr=$('#frame');if(!stage||!vp)return;const pad=18,sw=Math.max(120,stage.clientWidth-pad*2),sh=Math.max(80,stage.clientHeight-pad*2);const [a,b]=S.ratio.split(':').map(Number);let vw=sw,vh=vw*b/a;if(vh>sh){vh=sh;vw=vh*a/b}vw=Math.floor(vw);vh=Math.floor(vh);vp.style.width=vw+'px';vp.style.height=vh+'px';sc.style.width=S.w+'px';sc.style.height=S.h+'px';sc.style.transform=`scale(${vw/S.w})`;fr.style.width=S.w+'px';fr.style.height=S.h+'px';}
function setMode(m){$$('.tab').forEach(b=>b.classList.toggle('active',b.dataset.mode===m));$('#pastePane').classList.toggle('hidden',m!=='paste');$('#filePane').classList.toggle('hidden',m!=='file');}
function cleanHTML(src){return src.replace(/<base[^>]*>/gi,'');}
function previewHTML(src){
  const css=`<style id="__mrs_preview_css">html,body{margin:0!important;width:100%!important;height:100%!important;min-width:0!important;min-height:0!important;overflow:hidden!important;overscroll-behavior:none!important}html{transform-origin:50% 50%!important;will-change:transform!important}*{scrollbar-width:none!important}*::-webkit-scrollbar{width:0!important;height:0!important;display:none!important}</style>`;
  const speedBridge=`<script>(function(){
const P=window.parent;let virtualNow=0,rafId=1,timerId=1,previewPaused=false;const rafs=new Map(),timers=new Map(),intervals=new Map();const RealDate=Date;
try{function MRSDate(...args){return args.length?new RealDate(...args):new RealDate(virtualNow)}MRSDate.prototype=RealDate.prototype;Object.setPrototypeOf(MRSDate,RealDate);MRSDate.now=()=>virtualNow;window.Date=MRSDate}catch{}
try{Object.defineProperty(performance,'now',{configurable:true,value:()=>virtualNow})}catch{try{Object.defineProperty(Object.getPrototypeOf(performance),'now',{configurable:true,value:()=>virtualNow})}catch{}}
window.__MRS_VIRTUAL_TIME__=()=>virtualNow;window.requestAnimationFrame=cb=>{const id=rafId++;rafs.set(id,cb);return id};window.cancelAnimationFrame=id=>rafs.delete(id);
window.setTimeout=(cb,delay=0,...args)=>{const id=timerId++;timers.set(id,{at:virtualNow+Math.max(0,Number(delay)||0),cb,args});return id};window.clearTimeout=id=>timers.delete(id);
window.setInterval=(cb,delay=0,...args)=>{const id=timerId++;intervals.set(id,{next:virtualNow+Math.max(1,Number(delay)||1),delay:Math.max(1,Number(delay)||1),cb,args});return id};window.clearInterval=id=>intervals.delete(id);
function runTimers(){let guard=0;while(guard++<10000){let picked=null,pid=null;for(const [id,t] of timers){if(t.at<=virtualNow&&(picked===null||t.at<picked.at)){picked=t;pid=id}}if(!picked)break;timers.delete(pid);try{picked.cb(...picked.args)}catch{}}for(const [,t] of intervals){let g=0;while(t.next<=virtualNow&&g++<1000){try{t.cb()}catch{}t.next+=t.delay}}}
function runRafs(){const batch=[...rafs.entries()];rafs.clear();for(const [,cb] of batch){try{cb(virtualNow)}catch{}}}
function syncAnimations(){try{const list=document.getAnimations?document.getAnimations():[];for(const a of list){try{a.pause();a.currentTime=virtualNow}catch{}}}catch{}try{document.querySelectorAll('svg').forEach(svg=>{try{svg.pauseAnimations();svg.setCurrentTime(virtualNow/1000)}catch{}})}catch{}}
function applyZoom(z){try{const v=Math.max(.5,Math.min(2,Number(z)/100||1));const r=Number(window.__MRS_ROTATION__||0),x=Number(window.__MRS_X__||0),y=Number(window.__MRS_Y__||0);document.documentElement.style.transform='translate('+x+'px,'+y+'px) rotate('+r+'deg) scale('+v+')';document.documentElement.style.transformOrigin='50% 50%'}catch{}}
function sync(ms,runFrame=true){virtualNow=Math.max(0,Number(ms)||0);runTimers();if(runFrame)runRafs();syncAnimations();try{document.documentElement.style.setProperty('--mrs-time-ms',virtualNow+'ms');document.documentElement.style.setProperty('--mrs-time-s',virtualNow/1000+'s')}catch{}applyZoom(window.__MRS_ZOOM__||100)}
function previewTo(target){target=Math.max(0,Number(target)||0);virtualNow=target;runTimers();runRafs();syncAnimations();try{document.documentElement.style.setProperty('--mrs-time-ms',virtualNow+'ms');document.documentElement.style.setProperty('--mrs-time-s',virtualNow/1000+'s')}catch{}applyZoom(window.__MRS_ZOOM__||100)}
function advanceTo(target){target=Math.max(0,Number(target)||0);const step=1000/60;if(target<virtualNow){sync(target,true);return}let t=virtualNow;while(t+step<target-0.0001){t+=step;virtualNow=t;runTimers();runRafs()}virtualNow=target;runTimers();runRafs();syncAnimations();try{document.documentElement.style.setProperty('--mrs-time-ms',virtualNow+'ms');document.documentElement.style.setProperty('--mrs-time-s',virtualNow/1000+'s')}catch{}applyZoom(window.__MRS_ZOOM__||100)}
window.__MRS_SYNC__=sync;window.__MRS_APPLY_ZOOM__=applyZoom;
window.addEventListener('message',e=>{
  if(e.source!==P)return;
  if(e.data?.type==='MRS_PREVIEW_PAUSE'){previewPaused=true;try{document.getAnimations?.().forEach(a=>a.pause())}catch{}}
  if(e.data?.type==='MRS_PREVIEW_RESUME'){previewPaused=false;sync(virtualNow,false)}
  if(e.data?.type==='MRS_PREVIEW_TIME'&&!previewPaused){previewTo(e.data.ms)}
  if(e.data?.type==='MRS_SET_ZOOM'){window.__MRS_ZOOM__=e.data.zoom;applyZoom(e.data.zoom)}
  if(e.data?.type==='MRS_SET_ADJUSTMENT'){window.__MRS_ROTATION__=e.data.rotation||0;window.__MRS_X__=e.data.x||0;window.__MRS_Y__=e.data.y||0;applyZoom(window.__MRS_ZOOM__||100)}
});
function boot(){applyZoom(window.__MRS_ZOOM__||100);sync(0);P.postMessage({type:'MRS_READY'},'*');P.postMessage({type:'MRS_PREVIEW_VIRTUAL_READY'},'*')}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();</script>`;
  return injectAtHead(cleanHTML(src),css+speedBridge);
}
function renderHTML(src){const bridge=`<style id="__mrs_render_css">html,body{margin:0!important;width:100%!important;height:100%!important;min-width:0!important;min-height:0!important;overflow:hidden!important;overscroll-behavior:none!important}html{transform-origin:50% 50%!important;will-change:transform!important}*{scrollbar-width:none!important}*::-webkit-scrollbar{width:0!important;height:0!important;display:none!important}</style><script>(function(){
const P=window.parent;
let virtualNow=0;
let adjustment={zoom:100,rotation:0,x:0,y:0};
function applyAdjustment(d={}){try{adjustment={...adjustment,...d};const z=Math.max(.5,Math.min(2,Number(adjustment.zoom||100)/100||1)),r=Number(adjustment.rotation||0),x=Number(adjustment.x||0),y=Number(adjustment.y||0);window.__MRS_RENDER_ADJUSTMENT__={...adjustment};document.documentElement.style.transform='none';document.body.style.transform='translate('+x+'px,'+y+'px) rotate('+r+'deg) scale('+z+')';document.body.style.transformOrigin='50% 50%'}catch{}}
let rafId=1, timerId=1;
const rafs=new Map(), timers=new Map(), intervals=new Map();
const RealDate=Date;
try{
  function MRSDate(...args){ return args.length ? new RealDate(...args) : new RealDate(virtualNow); }
  MRSDate.prototype=RealDate.prototype;
  Object.setPrototypeOf(MRSDate,RealDate);
  MRSDate.now=()=>virtualNow;
  window.Date=MRSDate;
}catch{}
try{Object.defineProperty(performance,'now',{configurable:true,value:()=>virtualNow});}catch{try{Object.defineProperty(Object.getPrototypeOf(performance),'now',{configurable:true,value:()=>virtualNow});}catch{}}
window.__MRS_VIRTUAL_TIME__=()=>virtualNow;
window.requestAnimationFrame=cb=>{const id=rafId++;rafs.set(id,cb);return id};
window.cancelAnimationFrame=id=>rafs.delete(id);
window.setTimeout=(cb,delay=0,...args)=>{const id=timerId++;timers.set(id,{at:virtualNow+Math.max(0,Number(delay)||0),cb,args});return id};
window.clearTimeout=id=>timers.delete(id);
window.setInterval=(cb,delay=0,...args)=>{const id=timerId++;intervals.set(id,{next:virtualNow+Math.max(1,Number(delay)||1),delay:Math.max(1,Number(delay)||1),cb,args});return id};
window.clearInterval=id=>intervals.delete(id);
function runTimers(){
  let guard=0;
  while(guard++<10000){
    let picked=null,pid=null;
    for(const [id,t] of timers){if(t.at<=virtualNow&&(picked===null||t.at<picked.at)){picked=t;pid=id}}
    if(!picked)break;
    timers.delete(pid);try{picked.cb(...picked.args)}catch(e){setTimeout(()=>{throw e},0)}
  }
  for(const [id,t] of intervals){
    let guard2=0;
    while(t.next<=virtualNow&&guard2++<1000){try{t.cb()}catch(e){setTimeout(()=>{throw e},0)}t.next+=t.delay}
  }
}
function runRafs(){
  const batch=[...rafs.entries()];rafs.clear();
  for(const [,cb] of batch){try{cb(virtualNow)}catch(e){setTimeout(()=>{throw e},0)}}
}
function syncAnimations(ms, runFrame=true){
  virtualNow=Math.max(0,Number(ms)||0);
  runTimers();
  try{
    const list=document.getAnimations?document.getAnimations():[];
    for(const a of list){try{a.pause();a.currentTime=virtualNow}catch{}}
  }catch{}
  try{
    const svgs=document.querySelectorAll('svg');
    for(const svg of svgs){try{svg.pauseAnimations();svg.setCurrentTime(virtualNow/1000)}catch{}}
  }catch{}
  if(runFrame) runRafs();
  try{document.documentElement.style.setProperty('--mrs-time-ms',String(virtualNow)+'ms');document.documentElement.style.setProperty('--mrs-time-s',String(virtualNow/1000)+'s')}catch{}
  try{applyAdjustment()}catch{}
}
function advanceTo(ms){
  const target=Math.max(0,Number(ms)||0);
  const step=1000/60;
  if(target<=virtualNow){syncAnimations(target,true);return;}
  // Emulate a normal browser preview RAF clock at 60Hz, regardless of export FPS.
  // This prevents frame-based animations from becoming slower when exporting at 24/30 FPS.
  let t=virtualNow;
  while(t + step < target - 0.0001){
    t += step;
    syncAnimations(t,true);
  }
  syncAnimations(target,true);
}
window.__MRS_SEEK__=syncAnimations;
window.addEventListener('message',e=>{
  if(e.source!==P)return;
  if(e.data?.type==='MRS_SET_ZOOM'){applyAdjustment({zoom:e.data.zoom})}
  if(e.data?.type==='MRS_SET_ADJUSTMENT')applyAdjustment(e.data)
  if(e.data?.type==='MRS_SET_TIME'){
    advanceTo(e.data.ms);
    P.postMessage({type:'MRS_TIME_SET',ms:virtualNow},'*');
  }
  if(e.data?.type==='MRS_PING')P.postMessage({type:'MRS_RENDER_READY'},'*');
});
function bootRender(){setTimeout(()=>{syncAnimations(0);P.postMessage({type:'MRS_RENDER_READY'},'*');},0)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bootRender,{once:true});else bootRender();
setTimeout(()=>P.postMessage({type:'MRS_RENDER_READY'},'*'),100);
})();</script>`;return injectAtHead(cleanHTML(src),bridge);}
function injectAtHead(src,extra){if(/<head[^>]*>/i.test(src))return src.replace(/<head([^>]*)>/i,`<head$1>${extra}`);return `<!doctype html><html><head>${extra}</head><body>${src}</body></html>`;}
function stopPreviewClock(){if(S.previewClock){cancelAnimationFrame(S.previewClock);S.previewClock=null}}
function startPreviewClock(reset=false){
  stopPreviewClock();
  if(!S.code.trim()||S.busy)return;
  const now=performance.now();
  if(reset)S.previewVirtualNow=0;
  S.previewClockStart=now-(S.previewVirtualNow/Math.max(.01,S.speed));
  const tick=t=>{
    if(!S.previewClock||S.busy)return;
    const ms=Math.max(0,(t-S.previewClockStart)*S.speed);
    S.previewVirtualNow=ms;
    const fr=$('#frame');
    if(fr?.contentWindow)fr.contentWindow.postMessage({type:'MRS_PREVIEW_TIME',ms},'*');
    S.previewClock=requestAnimationFrame(tick);
  };
  S.previewClock=requestAnimationFrame(tick);
}
function pausePreviewForRender(){
  stopPreviewClock();
  const fr=$('#frame');
  if(fr?.contentWindow)fr.contentWindow.postMessage({type:'MRS_PREVIEW_PAUSE'},'*');
}
function resumePreviewAfterRender(){
  const fr=$('#frame');
  if(fr?.contentWindow)fr.contentWindow.postMessage({type:'MRS_PREVIEW_RESUME'},'*');
  startPreviewClock(false);
}
function sendPreviewZoom(){const fr=$('#frame');if(fr?.contentWindow){fr.contentWindow.postMessage({type:'MRS_SET_ZOOM',zoom:S.zoom},'*');sendPreviewAdjustment()}}
function sendPreviewAdjustment(){const fr=$('#frame');if(fr?.contentWindow)fr.contentWindow.postMessage({type:'MRS_SET_ADJUSTMENT',zoom:S.zoom,rotation:S.rotation,x:S.posX,y:S.posY},'*')}
function updateAdjustmentUI(){ $('#rotationValue').textContent=S.rotation+'°';$('#positionValue').textContent='X '+S.posX+' · Y '+S.posY;sendPreviewAdjustment(); }
function sendRenderAdjustment(iframe){if(iframe?.contentWindow)iframe.contentWindow.postMessage({type:'MRS_SET_ADJUSTMENT',zoom:S.zoom,rotation:S.rotation,x:S.posX,y:S.posY},'*')}

function setMotionAccess(enabled){S.hasUserMotion=!!enabled;$('#render').disabled=!S.hasUserMotion||S.busy;}
function loadCode(code,name='Untitled Motion',isUserMotion=true){const cleaned=cleanHTML(code);if(isUserMotion&&!cleaned.trim()){toast('Paste or load your own HTML motion code first');return false;}stopPreviewClock();S.code=cleaned;setMotionAccess(isUserMotion&&!!cleaned.trim());$('#frame').srcdoc=previewHTML(S.code);$('#empty').classList.add('hidden');$('#name').textContent=name.replace(/\.(html?|htm)$/i,'');$('#title').textContent='Motion Pro';$('#meta').textContent=`${S.w} × ${S.h} • ${S.fps} FPS • ${S.duration}s`;setStatus('Preview loaded',0);toast('Motion loaded');updatePreviewViewport();setTimeout(()=>{sendPreviewZoom();startPreviewClock(true)},120);}
async function wait(ms){return new Promise(r=>setTimeout(r,ms));}
async function waitImageAssets(doc){if(!doc)return;const imgs=[...doc.images];await Promise.all(imgs.map(im=>im.complete?Promise.resolve():new Promise(r=>{im.onload=im.onerror=r})));try{if(doc.fonts)await doc.fonts.ready}catch{} }
async function setRenderTime(iframe,ms){return await new Promise(resolve=>{let done=false;const on=e=>{if(e.source===iframe.contentWindow&&e.data?.type==='MRS_TIME_SET'){done=true;window.removeEventListener('message',on);resolve();}};window.addEventListener('message',on);iframe.contentWindow.postMessage({type:'MRS_SET_TIME',ms},'*');setTimeout(()=>{if(!done){window.removeEventListener('message',on);resolve()}},120);});}
async function capture(iframe){const doc=iframe.contentDocument;if(!doc)throw Error('Render document is not ready');await waitImageAssets(doc);const body=doc.body;const target=body.querySelector('[data-motion-root]')||body;return await html2canvas(target,{backgroundColor:null,scale:1,width:S.w,height:S.h,useCORS:true,allowTaint:false,logging:false,imageTimeout:15000,windowWidth:S.w,windowHeight:S.h,scrollX:0,scrollY:0});}
function makeCanvas(){const c=document.createElement('canvas');c.width=S.w;c.height=S.h;return {canvas:c,ctx:c.getContext('2d',{alpha:false,desynchronized:true})};}
async function makeRenderIframe(){const f=document.createElement('iframe');f.setAttribute('scrolling','no');f.style.cssText=`position:fixed;left:-100000px;top:0;width:${S.w}px;height:${S.h}px;border:0;overflow:hidden;visibility:visible;pointer-events:none;`;document.body.appendChild(f);return await new Promise((resolve,reject)=>{let done=false;const finish=(ok,err)=>{if(done)return;done=true;clearTimeout(timer);window.removeEventListener('message',onmsg);if(ok)resolve(f);else{f.remove();reject(err)}};const onmsg=e=>{if(e.source===f.contentWindow&&e.data?.type==='MRS_RENDER_READY')finish(true)};window.addEventListener('message',onmsg);const timer=setTimeout(()=>finish(false,Error('Render iframe timeout')),20000);f.srcdoc=renderHTML(S.code);f.addEventListener('load',()=>setTimeout(()=>finish(true),250));});}
async function renderH264(){
  const MB=await ensureMediabunny();
  if(!MB.Output||!MB.BufferTarget||!MB.CanvasSource||!MB.Quality) throw Error('Mediabunny video engine is unavailable.');
  if(S.w>1920 && !window.VideoEncoder) throw Error('4K H.264 requires WebCodecs support in Chrome/Edge.');
  const iframe=await makeRenderIframe();
  let output=null,source=null;
  try{
    const frames=Math.max(1,Math.round(S.duration*S.fps));
    const out=makeCanvas();
    iframe.contentWindow.__MRS_ZOOM__=S.zoom;sendRenderAdjustment(iframe);iframe.contentWindow.postMessage({type:'MRS_SET_ZOOM',zoom:S.zoom},'*');
    const format=S.format==='mov'?new MB.MovOutputFormat({fastStart:'in-memory'}):new MB.Mp4OutputFormat({fastStart:'in-memory'});
    const target=new MB.BufferTarget();
    output=new MB.Output({format,target});
    const quality=new MB.Quality({bitrate:S.bitrate*1e6,bitrateMode:'constant'});
    source=new MB.CanvasSource(out.canvas,{
      codec:'avc',
      quality,
      bitrateMode:'constant',
      latencyMode:'quality',
      hardwareAcceleration:'prefer-hardware',
      keyFrameInterval:2,
      sizeChangeBehavior:'deny'
    });
    output.addVideoTrack(source);
    await output.start();
    const frameDuration=1/S.fps;
    for(let i=0;i<frames;i++){
      if(S.cancel) throw Error('CANCELLED');
      setStatus(`Rendering frame ${i+1} / ${frames}`,i/frames*100);
      await setRenderTime(iframe,i*frameDuration*1000*S.speed);
      const c=await capture(iframe);
      out.ctx.clearRect(0,0,S.w,S.h);
      out.ctx.drawImage(c,0,0,S.w,S.h);
      await source.add(i*frameDuration,frameDuration,{keyFrame:i===0||i%Math.max(1,Math.round(S.fps*2))===0});
      await new Promise(r=>setTimeout(r,0));
    }
    source.close();
    await output.finalize();
    if(!target.buffer) throw Error('MP4/MOV finalization returned no file data.');
    const ext=S.format==='mov'?'mov':'mp4';
    const mime=S.format==='mov'?'video/quicktime':'video/mp4';
    setStatus(`Finalizing ${ext.toUpperCase()}…`,99);
    return new Blob([target.buffer],{type:mime});
  }finally{
    try{source?.close()}catch{}
    try{if(output?.state!=='finalized'&&output?.state!=='canceled'&&typeof output?.cancel==='function') await output.cancel()}catch{}
    iframe.remove();
  }
}
async function renderWebm(){
  const MB=await ensureMediabunny();
  if(!MB.Output||!MB.BufferTarget||!MB.CanvasSource||!MB.Quality||!MB.WebMOutputFormat) throw Error('Mediabunny WebM engine is unavailable.');
  const iframe=await makeRenderIframe();
  let output=null,source=null;
  try{
    const frames=Math.max(1,Math.round(S.duration*S.fps));
    const out=makeCanvas();
    iframe.contentWindow.__MRS_ZOOM__=S.zoom;sendRenderAdjustment(iframe);
    const format=new MB.WebMOutputFormat();
    const target=new MB.BufferTarget();
    output=new MB.Output({format,target});
    const quality=new MB.Quality({bitrate:S.bitrate*1e6,bitrateMode:'constant'});
    source=new MB.CanvasSource(out.canvas,{
      codec:'vp9',
      quality,
      bitrateMode:'constant',
      latencyMode:'quality',
      hardwareAcceleration:'prefer-hardware',
      keyFrameInterval:2,
      sizeChangeBehavior:'deny'
    });
    output.addVideoTrack(source);
    await output.start();
    const frameDuration=1/S.fps;
    for(let i=0;i<frames;i++){
      if(S.cancel) throw Error('CANCELLED');
      setStatus(`Rendering frame ${i+1} / ${frames}`,i/frames*100);
      await setRenderTime(iframe,i*frameDuration*1000*S.speed);
      const c=await capture(iframe);
      out.ctx.clearRect(0,0,S.w,S.h);
      out.ctx.drawImage(c,0,0,S.w,S.h);
      await source.add(i*frameDuration,frameDuration,{keyFrame:i===0||i%Math.max(1,Math.round(S.fps*2))===0});
      await new Promise(r=>setTimeout(r,0));
    }
    source.close();
    await output.finalize();
    if(!target.buffer) throw Error('WebM finalization returned no file data.');
    setStatus('Finalizing WEBM…',99);
    return new Blob([target.buffer],{type:'video/webm'});
  }finally{
    try{source?.close()}catch{}
    try{if(output?.state!=='finalized'&&output?.state!=='canceled'&&typeof output?.cancel==='function') await output.cancel()}catch{}
    iframe.remove();
  }
}

async function downloadBlob(blob,ext){const url=URL.createObjectURL(blob);if(S.previewURL)URL.revokeObjectURL(S.previewURL);S.previewURL=url;const a=$('#download');a.href=url;a.download=`motion-render-${Date.now()}.${ext}`;$('#downloadTitle').textContent=`Video ready • ${(blob.size/1048576).toFixed(2)} MB`;$('#downloadBox').classList.remove('hidden');try{a.click()}catch{} }
async function render(){
  if(S.busy)return;
  if(!S.hasUserMotion||!S.code.trim()){toast('Load your own HTML motion code before rendering');return}
  S.busy=true;S.cancel=false;S.renderFrames=Math.max(1,Math.round(S.duration*S.fps));
  pausePreviewForRender();
  document.body.classList.add('isRendering');
  $('#renderOverlay').classList.remove('hidden');
  $('#renderOverlayStatus').textContent='Preparing render…';
  $('#render').disabled=true;$('#cancel').disabled=false;$('#downloadBox').classList.add('hidden');
  setStatus('Preparing render…',0);
  try{
    readSettings();
    const blob=S.format==='webm'?await renderWebm():await renderH264();
    await downloadBlob(blob,S.format);
    setStatus('Render complete',100);
    toast('Render complete — download started');
  }catch(e){
    console.error(e);
    if(e.message==='CANCELLED'){setStatus('Cancelled',0);toast('Render cancelled')}
    else{setStatus('Render failed',0);toast(e.message||'Render failed')}
  }finally{
    S.busy=false;$('#render').disabled=false;$('#cancel').disabled=true;
    document.body.classList.remove('isRendering');
    $('#renderOverlay').classList.add('hidden');
    resumePreviewAfterRender();
  }
}
document.addEventListener('visibilitychange',()=>{
  if(!document.hidden&&!S.busy){
    const fr=$('#frame');
    if(fr?.contentWindow)fr.contentWindow.postMessage({type:'MRS_PREVIEW_RESUME'},'*');
    startPreviewClock(false);
  }
});
// V36: restored the original dark-only theme; theme switching removed.
$('#ratio').addEventListener('change',()=>populateRes(false));$('#res').addEventListener('change',readSettings);$('#fps').addEventListener('change',readSettings);$('#duration').addEventListener('change',readSettings);$('#bitrate').addEventListener('change',readSettings);$('#quality').addEventListener('change',readSettings);$$('.speedBtn').forEach(b=>b.onclick=()=>{S.speed=Number(b.dataset.speed)||1;$$('.speedBtn').forEach(x=>x.classList.toggle('active',x===b));$('#speedValue').textContent=(Number.isInteger(S.speed)?S.speed:S.speed.toFixed(2).replace(/0$/,'')).toString()+'×';if(S.code){clearTimeout(S.speedReloadTimer);S.speedReloadTimer=setTimeout(()=>{startPreviewClock(false)},30)}});$('#zoom').addEventListener('input',()=>{S.zoom=Number($('#zoom').value)||100;$('#zoomValue').textContent=S.zoom+'%';sendPreviewZoom()});$('#rotation').addEventListener('input',()=>{S.rotation=Number($('#rotation').value)||0;updateAdjustmentUI()});$$('[data-move]').forEach(b=>b.addEventListener('click',()=>{const step=2;if(b.dataset.move==='up')S.posY-=step;if(b.dataset.move==='down')S.posY+=step;if(b.dataset.move==='left')S.posX-=step;if(b.dataset.move==='right')S.posX+=step;S.posX=Math.max(-2000,Math.min(2000,S.posX));S.posY=Math.max(-2000,Math.min(2000,S.posY));updateAdjustmentUI()}));$('#resetAdjustment').addEventListener('click',()=>{S.rotation=0;S.posX=0;S.posY=0;$('#rotation').value=0;updateAdjustmentUI()});$$('.fmt').forEach(b=>b.onclick=()=>{$$('.fmt').forEach(x=>x.classList.remove('active'));b.classList.add('active');S.format=b.dataset.format});$$('.tab').forEach(b=>b.onclick=()=>setMode(b.dataset.mode));$('#load').onclick=()=>{const code=$('#code').value;if(!code.trim()){toast('Paste your own HTML motion code first');return;}loadCode(code,'Untitled Motion',true)};$('#choose').onclick=()=>$('#file').click();$('#file').onchange=async e=>{if(e.target.files[0])loadCode(await e.target.files[0].text(),e.target.files[0].name,true)};$('#drop').ondragover=e=>e.preventDefault();$('#drop').ondrop=async e=>{e.preventDefault();const f=e.dataTransfer.files[0];if(f)loadCode(await f.text(),f.name,true)};$('#reload').onclick=()=>S.hasUserMotion&&S.code&&loadCode(S.code,$('#name').textContent,true);$('#full').onclick=()=>$('#stage').requestFullscreen?.();$('#render').onclick=render;$('#cancel').onclick=()=>S.cancel=true;$('#new').onclick=()=>{S.code='';S.hasUserMotion=false;$('#code').value='';$('#frame').srcdoc='';setMotionAccess(false);$('#empty').classList.remove('hidden');$('#name').textContent='Untitled Motion';$('#title').textContent='Motion Pro';setStatus('Ready',0)};$('#save').onclick=()=>{const blob=new Blob([JSON.stringify({version:16,code:S.code,settings:{ratio:S.ratio,w:S.w,h:S.h,fps:S.fps,duration:S.duration,bitrate:S.bitrate,quality:S.quality,format:S.format,speed:S.speed,zoom:S.zoom,rotation:S.rotation,posX:S.posX,posY:S.posY}},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='motion-project.mrs.json';a.click()};$('#open').onclick=()=>$('#project').click();$('#project').onchange=async e=>{const f=e.target.files[0];if(!f)return;try{const p=JSON.parse(await f.text());$('#code').value=p.code||'';if(p.settings){$('#ratio').value=p.settings.ratio||'16:9';populateRes();const val=`${p.settings.w}x${p.settings.h}`;if([...$('#res').options].some(o=>o.value===val))$('#res').value=val;$('#fps').value=p.settings.fps||30;$('#duration').value=p.settings.duration||10;$('#bitrate').value=p.settings.bitrate||35;$('#quality').value=p.settings.quality||'High';const allowedSpeeds=[.25,.5,1,1.25,1.5,2];const loadedSpeed=Number(p.settings.speed);S.speed=allowedSpeeds.includes(loadedSpeed)?loadedSpeed:1;S.zoom=Number(p.settings.zoom)||100;S.rotation=Number(p.settings.rotation)||0;S.posX=Number(p.settings.posX)||0;S.posY=Number(p.settings.posY)||0;$('#rotation').value=S.rotation;updateAdjustmentUI();$$('.speedBtn').forEach(x=>x.classList.toggle('active',Number(x.dataset.speed)===S.speed));$('#zoom').value=S.zoom;$('#speedValue').textContent=S.speed+'×';$('#zoomValue').textContent=S.zoom+'%';readSettings();}loadCode(p.code||'','Untitled Motion',true)}catch{toast('Invalid project file')}};window.addEventListener('resize',updatePreviewViewport);window.addEventListener('message',e=>{if(e.data?.type==='MRS_READY')updatePreviewViewport()});populateRes(true);$$('.fmt').forEach(x=>x.classList.toggle('active',x.dataset.format==='mov'));$('#bitrate').value='25';$('#quality').value='Ultra';$$('.speedBtn').forEach(x=>x.classList.toggle('active',x.dataset.speed==='1'));$('#zoom').value='100';S.speed=1;S.zoom=100;$('#speedValue').textContent='1×';$('#zoomValue').textContent='100%';$('#rotation').value='0';$('#rotationValue').textContent='0°';$('#positionValue').textContent='X 0 · Y 0';readSettings();
loadCode(DEFAULT_MOTION,'Motion Pro',false);
setMotionAccess(false);
// Keep the source box empty on first load: the built-in demo motion stays internal.
$('#code').value='';
