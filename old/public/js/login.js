const f = document.forms['login-form'];

f.addEventListener('submit', e => {
  e.preventDefault();

  if (
    f.email.value &&
    f.password.value
  ) {
    if (!validateEmail(f.email.value)) {
      iziToast.error({
        title: 'خطا!',
        rtl: true,
        message: M[0][0]
      });

      f.email.select();
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
            iziToast.warning({
              title: 'خطا!',
              rtl: true,
              message: M[0][5]
            });
          } else if (data.text === 1) {
            iziToast.warning({
              title: 'خطا!',
              rtl: true,
              message: M[0][4]
            });
          } else if (data.text === 2) {
            iziToast.warning({
              title: 'خطا!',
              rtl: true,
              message: M[0][3]
            });
          } else if (data.text === 3) {
            iziToast.warning({
              title: 'خطا!',
              rtl: true,
              message: M[0][0]
            });
          }
        } else if (data.type === 2) {
          iziToast.success({
            title: 'هورا',
            rtl: true,
            message: M[2][3]
          });
          window.location.href = '/u';
        }
      }).catch(() => {
        iziToast.warning({
          title: 'خطا!',
          rtl: true,
          message: M[0][0]
        });
      });
    }
  }
});

capslock(f.password);
