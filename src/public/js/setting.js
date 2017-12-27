const mainSet = document.forms['setting-form'];
const passSet = document.forms['pass-form'];

mainSet.addEventListener('submit', e => {
  e.preventDefault();

  const email = mainSet.email;
  const emailErr = $('#email-err');
  const err = $('#err1');

  emailErr.hide();
  err.hide();

  if (!validateEmail(email.value)) {
    emailErr.show();
  } else {
    fetch('/u/setting', { method: 'POST', credentials: 'include' })
      .then(checkStatus).then(res => res.json()).then(data => {
      console.log(data);
    }).catch(() => {
      err.show();
    });
  }
});

passSet.addEventListener('submit', e => {
  e.preventDefault();

  const password = passSet.newpass;
  const err = $('#err2');
  const passErr = $('#pass-err');

  err.hide();
  passErr.hide();

  if (password.value.length < 8) {
    passErr.show();
  } else {
    fetch('/u/setting/password', { method: 'POST', credentials: 'include' })
      .then(checkStatus).then(res => res.json()).then(data => {
        console.log(data);
      }).catch(() => {
        err.show();
      });
  }
});

capslock(passSet.newpass);
