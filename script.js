const observer = new IntersectionObserver((entries)=>{
  entries.forEach((entry,i)=>{
    if(entry.isIntersecting){
      entry.target.style.transitionDelay = `${Math.min(i*45,220)}ms`;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const modal=document.querySelector("[data-modal]");
const demo=document.querySelector("[data-demo]");
const closeButtons=document.querySelectorAll("[data-close]");
function closeModal(){modal.classList.remove("show");modal.setAttribute("aria-hidden","true");document.body.style.overflow=""}
demo?.addEventListener("click",()=>{modal.classList.add("show");modal.setAttribute("aria-hidden","false");document.body.style.overflow="hidden"});
closeButtons.forEach(b=>b.addEventListener("click",closeModal));
modal?.addEventListener("click",(e)=>{if(e.target===modal)closeModal()});
document.addEventListener("keydown",(e)=>{if(e.key==="Escape")closeModal()});

document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener("click",()=>{
    if(modal?.classList.contains("show")) closeModal();
  });
});

document.querySelectorAll("details").forEach(d=>{
  d.addEventListener("toggle",()=>{
    const icon=d.querySelector("summary span");
    if(icon) icon.textContent=d.open?"⌃":"⌄";
  });
});

window.addEventListener("scroll",()=>{
  const y=window.scrollY;
  document.querySelector(".page-glow")?.style.setProperty("transform",`translateX(-50%) translateY(${y*.035}px)`);
},{passive:true});
