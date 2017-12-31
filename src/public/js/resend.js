const f = document.forms['resend-form'];

f.addEventListener('submit', e => {
  e.preventDefault();

  const err = $('#err');
  const emailErr = $('#emailErr');
  const success = $('#success');

  if (validateEmail(f.email.value)) {
    fetch('/resend', {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        email: f.email.value
      })
    }).then(checkStatus).then(res => res.json()).then(data => {
      if (data.type === 0) {
        if (data.code === 0) {
          err.show();
        } else if (data.code === 1) {
          err.show();
        }
      } else if (data.type === 2) {
        success.show();
        window.location.href = '/login';
      } else if (data.type === 1) {
        success.show();
      }
    }).catch(() => {
      err.show();
    });
  } else {
    emailErr.show();
  }
});
