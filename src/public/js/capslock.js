const pass = document.getElementsByClassName('password');

for (let i = 0; i < pass.length; i++) {
  pass[i].addEventListener('keypress', e => {
    const kc = e.keyCode ? e.keyCode : e.which;
    const sk = e.shiftKey ? e.shiftKey : ((kc === 16) ? true : false);
    const msg = document.getElementsByClassName('capslock');
    if (((kc >= 65 && kc <= 90) && !sk) || ((kc >= 97 && kc <= 122) && sk)) {
      msg[i].style.display = 'block';
    } else {
      msg[i].style.display = 'none';
    }
  });
}
