function checkForm() {
  const f = document.forms['login-form'];
  const unverified = document.getElementById('unverified');
  const expired = document.getElementById('expired');
  const err = document.getElementById('err');
  const wrong = document.getElementById('wrong');
  const success = document.getElementById('moving');
  const emailErr = document.getElementById('email-err');

  unverified.style.display = 'none';
  expired.style.display = 'none';
  err.style.display = 'none';
  wrong.style.display = 'none';
  success.style.display = 'none';
  emailErr.style.display = 'none';

  if (
    f.email.value &&
    f.password.value
  ) {
    if (!validateEmail(f.email.value)) {
      emailErr.style.display = 'block';
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
            unverified.style.display = 'block';
          } else if (data.text === 1) {
            // account has expired
            expired.style.display = 'block';
          } else if (data.text === 2) {
            // wrong pass or no such user
            wrong.style.display = 'block';
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
