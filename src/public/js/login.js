const f = document.forms['login-form'];

f.addEventListener('submit', e => {
  e.preventDefault();

  const unverified = $('#unverified');
  const expired = $('#expired');
  const err = $('#err');
  const wrong = $('#wrong');
  const success = $('#moving');
  const emailErr = $('#email-err');

  unverified.hide();
  expired.hide();
  err.hide();
  wrong.hide();
  success.hide();
  emailErr.hide();

  if (
    f.email.value &&
    f.password.value
  ) {
    if (!validateEmail(f.email.value)) {
      emailErr.show();
    } else {
      fetch('/login', {
        method: 'POST',
        credentials: 'include',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          password: f.password.value,
          email: f.email.value
        })

      }).then(checkStatus).then(res => res.json()).then(data => {
        if (data.type === 0) {
          if (data.text === 0) {
            // unverified
            unverified.show();
          } else if (data.text === 1) {
            // account has expired
            expired.show();
          } else if (data.text === 2) {
            // wrong pass or no such user
            wrong.show();
          } else if (data.text === 3) {
            // error occured
            err.show();
          }
        } else if (data.type === 2) {
          success.show();
          window.location.href = '/u';
        }
      }).catch(() => {
        // error occured
        err.hide();
      });
    }
  }
});

f.password.addEventListener('keypress', e => {

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
