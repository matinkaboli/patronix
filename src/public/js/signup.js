function checkStatus(res) {
  if (res.status >= 200 && res.status < 300) {
    return res;
  } else {
    const error = new Error(res.statusText);
    error.res = res;
    throw error;
  }
}

const svgElement = $('#svg-container');

fetch('/captcha', {
  credentials: 'include'
}).then(checkStatus).then(res => res.json()).then(data => {
  svgElement.html(data.captcha);
}).catch(e => {
  svgElement.html('خطا! بعدا امتحان کنید');
});

const f = document.forms['signup-form'];

f.addEventListener('submit', e => {
  e.preventDefault();


  const captchaErr = $('#captcha-err');
  const taken = $('#taken');
  const err = $('#err');
  const emailErr = $('#email-err');

  err.hide();
  emailErr.hide();
  captchaErr.hide();
  taken.hide();

  if (
    f.email.value &&
    f.password.value
  ) {
    if (!validateEmail(f.email.value)) {
      emailErr.show();
    } else {
      fetch('/signup', {
        method: 'POST',
        credentials: 'include',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          password: f.password.value,
          email: f.email.value,
          fname: f.fname.value,
          lname: f.lname.value,
          captcha: f.captcha.value
        })
      }).then(checkStatus).then(res => res.json()).then(data => {
        if (data.type === 0) {
          if (data.text === 0) {
            // unverified
            captchaErr.show();
          } else if (data.text === 1) {
            // account has expired
          } else if (data.text === 2) {
            // wrong pass or no such user
            taken.show();
          } else if (data.text === 3) {
            // error occured
            err.show();
          }
        } else if (data.type === 2) {
          window.location.href = '/u';
        }
      }).catch(() => {
        // error occured
        err.show();
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
