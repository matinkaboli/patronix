function checkForm() {
  const f = document.forms['login-form'];
  document.getElementById('unverified').style.display = 'none';
  document.getElementById('expired').style.display = 'none';
  document.getElementById('err').style.display = 'none';
  document.getElementById('wrong').style.display = 'none';
  document.getElementById('moving').style.display = 'none';
  document.getElementById('email-err').style.display = 'none';
  if (
    f.email.value &&
    f.password.value
  ) {
    if (!validateEmail(f.email.value)) {
      document.getElementById('email-err').style.display = 'block';
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
        console.log(data);
        if (data.type === 0) {
          if (data.text === 0) {
            // unverified
            document.getElementById('unverified').style.display = 'block';
          } else if (data.text === 1) {
            // account has expired
            document.getElementById('expired').style.display = 'block';
          } else if (data.text === 2) {
            // wrong pass or no such user
            document.getElementById('wrong').style.display = 'block';
          } else if (data.text === 3) {
            // error happened
            document.getElementById('err').style.display = 'block';
          }
        } else if (data.type === 2) {
          document.getElementById('moving').style.display = 'block';
          window.location.href = '/u';
        }
      }).catch(() => {
        // error happened
        document.getElementById('err').style.display = 'block';
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
