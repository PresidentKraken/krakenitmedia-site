(function(){
  var yr=document.getElementById('yr'); if(yr) yr.textContent=new Date().getFullYear();

  // mobile menu
  var btn=document.querySelector('.menu-btn'), list=document.getElementById('navlinks');
  if(btn&&list){
    btn.addEventListener('click',function(){ var o=list.classList.toggle('open'); btn.setAttribute('aria-expanded',o); });
    list.addEventListener('click',function(e){ if(e.target.tagName==='A'){ list.classList.remove('open'); btn.setAttribute('aria-expanded',false);} });
  }

  // age gate, remembered per browser when storage works
  var gate=document.getElementById('gate'), mlist=document.getElementById('mature-list'), yes=document.getElementById('gate-yes');
  if(gate&&mlist&&yes){
    var KEY='kim_age_ok';
    var reveal=function(){ gate.hidden=true; gate.style.display='none'; mlist.hidden=false; };
    try{ if(localStorage.getItem(KEY)==='1') reveal(); }catch(e){}
    yes.addEventListener('click',function(){ try{ localStorage.setItem(KEY,'1'); }catch(e){} reveal(); });
  }

  // lightbox
  var lb=document.getElementById('lb');
  if(lb){
    var items=Array.prototype.slice.call(document.querySelectorAll('[data-full]'));
    var img=document.getElementById('lb-img'), cap=document.getElementById('lb-cap'), idx=0, last=null;
    var show=function(i){ idx=(i+items.length)%items.length; var b=items[idx]; img.src=b.dataset.full; img.alt=b.dataset.cap; cap.textContent=b.dataset.cap; };
    var open=function(i){ last=document.activeElement; show(i); lb.classList.add('open'); document.body.style.overflow='hidden'; lb.querySelector('.x').focus(); };
    var close=function(){ lb.classList.remove('open'); document.body.style.overflow=''; img.src=''; if(last) last.focus(); };
    items.forEach(function(b,i){ b.addEventListener('click',function(){ open(i); }); });
    lb.querySelector('.x').addEventListener('click',close);
    lb.querySelector('.prev').addEventListener('click',function(){ show(idx-1); });
    lb.querySelector('.next').addEventListener('click',function(){ show(idx+1); });
    lb.addEventListener('click',function(e){ if(e.target===lb) close(); });
    document.addEventListener('keydown',function(e){
      if(!lb.classList.contains('open')) return;
      if(e.key==='Escape') close();
      if(e.key==='ArrowLeft') show(idx-1);
      if(e.key==='ArrowRight') show(idx+1);
    });
  }
})();
