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
    email.select();
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
    password.select();
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

$('#delete-account').on('click', e => {
  e.preventDefault();

  iziToast.question({
      timeout: 10000,
      close: false,
      overlay: true,
      toastOnce: true,
      id: 'question',
      zindex: 999,
      rtl: true,
      title: 'اوپس..',
      message: 'مطمئنی؟',
      position: 'center',
      buttons: [
        ['<button><b>اره</b></button>', (instance, toast) => {
          instance.hide(toast, { transitionOut: 'fadeOut' }, 'button');

          fetch('/u/setting/delete', {
            method: 'POST', credentials: 'include'
          }).then(checkStatus).then(res => res.json()).then(data => {
            localStorage.setItem('delAcc', 2);
            window.href = '/';
          }).catch(() => {
            iziToast.error({
              title: 'خطا!',
              rtl: true,
              message: M[0][0]
            });
          });
        }, true],
        ['<button>نه</button>', (instance, toast) => {
          instance.hide(toast, { transitionOut: 'fadeOut' }, 'button');
        }]
      ]
  });
});
