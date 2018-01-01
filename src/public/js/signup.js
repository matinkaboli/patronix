const svgElement = $('#svg-container');

fetch('/captcha', {
  credentials: 'include'
}).then(checkStatus).then(res => res.json()).then(data => {
  svgElement.html(data.captcha);
}).catch(e => {
  svgElement.html(M[0][0]);
});

const f = document.forms['signup-form'];

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
        message: M[1][0]
      });

      f.email.select();
    } else {

      if (f.password.value.length > 7) {
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
        }).then(checkStatus).then(res => res.json()).then(result => {
          const data = result.report;

          if (data.type === 0) {
            if (data.text === 0) {
              iziToast.warning({
                title: 'خطا!',
                rtl: true,
                message: M[0][1]
              });
            } else if (data.text === 3) {
              iziToast.error({
                title: 'خطا!',
                rtl: true,
                message: M[0][0]
              });
            }
          } else if (data.type === 2) {
            iziToast.success({
              title: 'هورا!!',
              rtl: true,
              message: M[2][0]
            });
          }
        }).catch(() => {
          iziToast.error({
            title: 'خطا!',
            rtl: true,
            message: M[0][0]
          });
        });
      } else {
        iziToast.warning({
          title: 'خطا!',
          rtl: true,
          message: M[1][1]
        });

        f.password.select();
      }
    }
  }
});

capslock(f.password);
