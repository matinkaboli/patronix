const svgElement = document.getElementById('svg-container');

fetch('/captcha', {
  credentials: 'include'
}).then(res => res.json()).then(data => {
  svgElement.innerHTML = data.captcha;
}).catch(() => {
  svgElement.innerHTML = 'خطا! بعدا امتحان کنید';
});


function checkForm() {
  const f = document.forms['signup-form'];
  const captchaErr = document.getElementById('captcha-err');
  const taken = document.getElementById('taken');
  const err = document.getElementById('err');
  const success = document.getElementById('moving');
  const emailErr = document.getElementById('email-err');

  err.style.display = 'none';
  success.style.display = 'none';
  emailErr.style.display = 'none';
  captchaErr.style.display = 'none';
  taken.style.display = 'none';

  if (
    f.email.value &&
    f.password.value
  ) {
    if (!validateEmail(f.email.value)) {
      emailErr.style.display = 'block';
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
            captchaErr.style.display = 'block';
          } else if (data.text === 1) {
            // account has expired
          } else if (data.text === 2) {
            // wrong pass or no such user
            taken.style.display = 'block';
          } else if (data.text === 3) {
            // error occured
            err.style.display = 'block';
          }
        } else if (data.type === 2) {
          success.style.display = 'block';
          window.location.href = '/u';
        }
      }).catch(() => {
        // error occured
        err.style.display = 'block';
      });
    }
  }
  return false;
}

function checkStatus(res) {
  if (res.status >= 200 && res.status < 300) {
    return res;
  } else {
    const error = new Error(res.statusText);
    error.res = res;
    throw error;
  }
}

document.forms['signup-form'].password.addEventListener('keypress', e => {
  const kc = e.keyCode ? e.keyCode : e.which;
  const sk = e.shiftKey ? e.shiftKey : ((kc === 16) ? true : false);
  const msg = document.getElementById('capslock');
  if (((kc >= 65 && kc <= 90) && !sk) || ((kc >= 97 && kc <= 122) && sk)) {
    msg.style.display = 'block';
  } else {
    msg.style.display = 'none';
  }
});
