
// Automatic language redirect (runs only on first visit)
(function(){
  try{
    if(sessionStorage.getItem("lang_checked")) return;
    sessionStorage.setItem("lang_checked","1");
    var p=location.pathname.toLowerCase();
    if(p.endsWith("/en.html")||p.endsWith("en.html")) return;
    var lang=(navigator.language||navigator.userLanguage||"").toLowerCase();
    if(lang.startsWith("en")){
      location.replace("en.html");
    }
  }catch(e){}
})();

const menuBtn=document.querySelector('.menu-btn'),nav=document.querySelector('#main-nav');
menuBtn.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',open)});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
document.getElementById('year').textContent=new Date().getFullYear();

window.addEventListener('load',()=>setTimeout(()=>document.querySelector('.loader').classList.add('hide'),350));

const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target)}}),{threshold:.11});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

const countObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;const el=entry.target,end=Number(el.dataset.count);let n=0;const step=Math.max(1,Math.ceil(end/25));const timer=setInterval(()=>{n=Math.min(end,n+step);el.textContent=n;if(n===end)clearInterval(timer)},120);countObserver.unobserve(el)}),{threshold:.8});
document.querySelectorAll('.count').forEach(el=>countObserver.observe(el));

const modal=document.querySelector('#gallery-modal'),modalImage=document.querySelector('#modal-image'),modalTitle=document.querySelector('#modal-title'),counter=document.querySelector('#modal-counter'),thumbs=document.querySelector('#modal-thumbs'),prev=document.querySelector('.modal-nav.prev'),next=document.querySelector('.modal-nav.next');
let gallery=[],current=0;
function renderGallery(){modalImage.src=gallery[current];modalImage.alt=modalTitle.textContent;counter.textContent=`${current+1} / ${gallery.length}`;prev.hidden=gallery.length<2;next.hidden=gallery.length<2;thumbs.innerHTML='';gallery.forEach((src,i)=>{const b=document.createElement('button');if(i===current)b.classList.add('active');const img=document.createElement('img');img.src=src;img.alt='';b.appendChild(img);b.addEventListener('click',()=>{current=i;renderGallery()});thumbs.appendChild(b)})}
function openGallery(el){gallery=JSON.parse(el.dataset.gallery);current=0;modalTitle.textContent=el.dataset.title||'Galerija';renderGallery();modal.showModal()}
document.querySelectorAll('[data-gallery]').forEach(el=>el.addEventListener('click',e=>{if(e.target.closest('a'))return;openGallery(el)}));
prev.addEventListener('click',()=>{current=(current-1+gallery.length)%gallery.length;renderGallery()});
next.addEventListener('click',()=>{current=(current+1)%gallery.length;renderGallery()});
document.querySelector('.modal-close').addEventListener('click',()=>modal.close());
modal.addEventListener('click',e=>{if(e.target===modal)modal.close()});
document.addEventListener('keydown',e=>{if(!modal.open)return;if(e.key==='ArrowLeft')prev.click();if(e.key==='ArrowRight')next.click()});
