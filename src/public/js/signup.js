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
  const passErr = $('#pass-err');
  const done = $('#signup-done');

  err.hide();
  emailErr.hide();
  captchaErr.hide();
  taken.hide();
  passErr.hide();
  done.hide();

  if (
    f.email.value &&
    f.password.value
  ) {
    if (!validateEmail(f.email.value)) {
      emailErr.show();
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
          console.log(data);
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
            done.show();
          }
        }).catch(() => {
          // error occured
          err.show();
        });
      } else {
        passErr.show();
      }
    }
  }
});

capslock(f.password);
