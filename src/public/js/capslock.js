document.getElementById('password').addEventListener('keypress', e => {
  const kc = e.keyCode ? e.keyCode : e.which;
  const sk = e.shiftKey ? e.shiftKey : ((kc === 16) ? true : false);
  const msg = document.getElementById('capslock');
  if (((kc >= 65 && kc <= 90) && !sk) || ((kc >= 97 && kc <= 122) && sk)) {
    msg.style.display = 'block';
  } else {
    msg.style.display = 'none';
  }
});
