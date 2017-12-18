const pass = document.getElementsByClassName('password');

for (let i = 0; i < pass.length; i++) {
  pass[i].addEventListener('keypress', e => {
    let kc, sk;

    if (e.keyCode) {
      kc = e.keyCode;
    } else {
      kc = e.which;
    }

    if (e.shiftKey) {
      sk = e.shiftKey;
    } else {
      if (kc === 16) {
        sk = true;
      } else {
        sk = false;
      }
    }

    const msg = document.getElementsByClassName('capslock');
    if (kc >= 65 && kc <= 90 && !sk || kc >= 97 && kc <= 122 && sk) {
      msg[i].style.display = 'block';
    } else {
      msg[i].style.display = 'none';
    }
  });
}
