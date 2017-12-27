function capslock(el) {
  el.addEventListener('keypress', e => {
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

    const msg = $('#capslock');
    if (kc >= 65 && kc <= 90 && !sk || kc >= 97 && kc <= 122 && sk) {
      msg.show();
    } else {
      msg.hide();
    }
  });
}
