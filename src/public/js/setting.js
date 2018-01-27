const mainSet = document.forms['setting-form'];
const passSet = document.forms['pass-form'];

mainSet.addEventListener('submit', e => {
  e.preventDefault();

  const email = mainSet.email;

  if (!validateEmail(email.value)) {
    iziToast.warning({
      rtl: true,
      title: 'ایمیل وارد شده اشتباه است'
    });

    email.select();

  } else {
    fetch('/u/setting', {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      body: JSON.stringify({
        email: mainSet.email.value,
        fname: mainSet.fname.value,
        lname: mainSet.lname.value
      })
    }).then(checkStatus).then(res => res.json()).then(data => {
        console.log(data);
    }).catch(e => {
      iziToast.error({
        rtl: true,
        title: 'خطا!',
        message: M[0][0]
      });
      console.log(e);
    });
  }
});

passSet.addEventListener('submit', e => {
  e.preventDefault();

  const password = passSet.newpass;

  if (password.value.length < 8) {
    iziToast.warning({
      rtl: true,
      title: 'رمز عبور باید حداقل هشت رقم باشد'
    });
    password.select();
  } else {
    fetch('/u/setting/password', { method: 'POST', credentials: 'include' })
      .then(checkStatus).then(res => res.json()).then(data => {
        console.log(data);
      }).catch(() => {
        iziToast.error({
          rtl: true,
          title: 'خطا',
          message: M[0][0]
        });
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
            if (data.type === 2) {
              localStorage.setItem('delAcc', 2);
              window.location.href = '/';
            }
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
