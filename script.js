
function copyIP(text){
  try{
    navigator.clipboard.writeText(text);
    const btns = document.querySelectorAll('button, .btn');
    const notify = document.createElement('div');
    notify.textContent = 'IP copied: ' + text;
    notify.style.position='fixed';
    notify.style.bottom='20px';
    notify.style.left='50%';
    notify.style.transform='translateX(-50%)';
    notify.style.background='rgba(0,0,0,.8)';
    notify.style.padding='10px 16px';
    notify.style.borderRadius='10px';
    notify.style.border='1px solid #2a2a56';
    notify.style.color='#fff';
    notify.style.zIndex='9999';
    document.body.appendChild(notify);
    setTimeout(()=>notify.remove(),1600);
  }catch(e){
    alert('IP: ' + text);
  }
}
