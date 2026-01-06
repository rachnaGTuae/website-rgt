/* AUTO-CENTER BIG IMAGE LIKE YOUR REFERENCE:
   - finds which card is closest to center
   - makes it bigger
   - auto-scrolls every 3.8s
*/
(function(){
  const track = document.getElementById('ct3Track');
  if(!track) return;

  const cards = Array.from(track.querySelectorAll('.ct3-card'));
  if(cards.length === 0) return;

  // ensure smooth snap
  let autoTimer = null;
  let isUserInteracting = false;

  function setCenterCard(){
    const rect = track.getBoundingClientRect();
    const mid = rect.left + rect.width/2;

    let best = null, bestDist = Infinity;
    cards.forEach(c=>{
      const r = c.getBoundingClientRect();
      const cMid = r.left + r.width/2;
      const d = Math.abs(mid - cMid);
      if(d < bestDist){ bestDist = d; best = c; }
    });

    cards.forEach(c => c.classList.toggle('is-center', c === best));
  }

  function nextCard(){
    const current = track.querySelector('.ct3-card.is-center') || cards[0];
    const idx = cards.indexOf(current);
    const next = cards[(idx + 1) % cards.length];
    next.scrollIntoView({behavior:'smooth', inline:'center', block:'nearest'});
  }

  // initial center
  requestAnimationFrame(() => {
    cards[0].scrollIntoView({behavior:'auto', inline:'center', block:'nearest'});
    setCenterCard();
  });

  // update on scroll
  let raf = null;
  track.addEventListener('scroll', () => {
    if(raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(setCenterCard);
  }, {passive:true});

  // pause autoplay on touch/mouse
  ['pointerdown','touchstart','mouseenter','focusin'].forEach(ev=>{
    track.addEventListener(ev, ()=>{ isUserInteracting = true; }, {passive:true});
  });
  ['pointerup','touchend','mouseleave','focusout'].forEach(ev=>{
    track.addEventListener(ev, ()=>{ isUserInteracting = false; }, {passive:true});
  });

  // autoplay
  autoTimer = setInterval(() => {
    if(!isUserInteracting) nextCard();
  }, 3800);

  // keep centered on resize
  window.addEventListener('resize', () => setCenterCard());
})();