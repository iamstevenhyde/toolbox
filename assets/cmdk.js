/* ============================================================
   The Toolbox v2 — Command Deck (dark glass) + shared behavior
   Same index and logic as v1; restyled. Also owns the burger
   toggle and the gallery reveal observer for v2 pages.
   ============================================================ */
(function(){
  const HT = window.HT || {};
  const IDX = [];
  (HT.bench||[]).forEach(x=>IDX.push({k:x.k, n:x.n, g:x.g, s:x.run?Object.values(x.run).join(" "):"", go:"tool.html?id="+x.id}));
  const ch = HT.chapters||{};
  (ch.mba546?.items||[]).forEach(x=>IDX.push({k:"Chapter", n:"MBA 546 · "+x.nm, g:x.src||"", go:"chapters.html"}));
  (ch.aiLit?.items||[]).forEach(x=>IDX.push({k:"Module", n:"AI Literacy · "+x.nm, g:"", go:"chapters.html"}));
  (HT.cases||[]).forEach(x=>IDX.push({k:"Case", n:x.n, g:x.cite||"", go:"cases.html"}));
  (HT.research||[]).filter(x=>!x.rev).forEach(x=>IDX.push({k:(x.media||[]).includes("Chapter")?"Chapter":"Article", n:x.ti, g:x.ven||"", go:"about.html"+(x.id?"#"+x.id:"")}));
  /* student work hidden from the site for now; re-add HT.student here when Tiny Tools ships */

  const wrap = document.createElement("div");
  wrap.className = "cmdk";
  wrap.innerHTML = `<div class="cmdbox">
    <div class="in"><span class="ar">▸</span><input id="ht-cq" aria-label="search the toolbox" placeholder="summon a tool, case, chapter, paper…" autocomplete="off" spellcheck="false"></div>
    <div class="cmdres" id="ht-cres"></div>
    <div class="cmdfoot"><span>↑↓ move</span><span>↵ open</span><span>esc close</span></div>
  </div>`;
  document.addEventListener("DOMContentLoaded", ()=>{
    document.body.appendChild(wrap);
    const cq = wrap.querySelector("#ht-cq"), cres = wrap.querySelector("#ht-cres");
    let list = IDX.slice(0,12), sel = 0;
    function draw(){
      cres.innerHTML = list.length
        ? list.map((it,i)=>`<div class="cr${i===sel?' sel':''}" data-i="${i}"><span class="ck">${it.k}</span><span class="cn">${it.n}</span><span class="cgg">${it.g}</span></div>`).join("")
        : `<div class="cmdempty">nothing by that name. try "case", "bot", "bias", "kahneman"…</div>`;
    }
    function open(){ wrap.classList.add("show"); cq.value=""; list=IDX.slice(0,12); sel=0; draw(); setTimeout(()=>cq.focus(),30); }
    function close(){ wrap.classList.remove("show"); }
    function go(){ const it=list[sel]; if(!it) return; if(/^https?:/.test(it.go)) window.open(it.go,"_blank"); else location.href=it.go; }
    function filter(){ const s=cq.value.toLowerCase().trim();
      list = s ? IDX.filter(it=>(it.n+" "+it.k+" "+it.g+" "+(it.s||"")).toLowerCase().includes(s)) : IDX.slice(0,12);
      sel=0; draw(); }
    cq.addEventListener("input", filter);
    cq.addEventListener("keydown", e=>{
      if(e.key==="ArrowDown"){ sel=Math.min(list.length-1,sel+1); draw(); scrollSel(); e.preventDefault(); }
      else if(e.key==="ArrowUp"){ sel=Math.max(0,sel-1); draw(); scrollSel(); e.preventDefault(); }
      else if(e.key==="Enter"){ go(); }
      else if(e.key==="Escape"){ close(); }
    });
    function scrollSel(){ const el=cres.querySelector(".cr.sel"); if(el) el.scrollIntoView({block:"nearest"}); }
    cres.addEventListener("click", e=>{ const r=e.target.closest(".cr"); if(r){ sel=+r.dataset.i; go(); } });
    wrap.addEventListener("click", e=>{ if(e.target===wrap) close(); });
    document.querySelectorAll(".srch").forEach(s=>{
      s.addEventListener("click", open);
      s.addEventListener("keydown", e=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); open(); } });
    });
    document.querySelectorAll(".burger").forEach(b=>b.addEventListener("click", ()=>{
      const n=document.querySelector(".nav"); if(!n) return;
      n.classList.toggle("open");
      b.setAttribute("aria-expanded", n.classList.contains("open"));
    }));
    addEventListener("keydown", e=>{
      const typing = /^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName);
      if((e.key==="k" && (e.metaKey||e.ctrlKey)) || (e.key==="/" && !typing)){ e.preventDefault(); open(); }
    });
  });

  // staggered reveal for gallery paintings and placard cards
  window.HTreveal = function(selector){
    const els = [...document.querySelectorAll(selector)];
    if(!("IntersectionObserver" in window)){ els.forEach(el=>el.classList.add("in")); return; }
    const io = new IntersectionObserver(entries=>{
      entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); } });
    },{rootMargin:"0px 0px -8% 0px"});
    els.forEach((el,i)=>{ el.style.transitionDelay = (i%4)*70+"ms"; io.observe(el); });
  };
})();
