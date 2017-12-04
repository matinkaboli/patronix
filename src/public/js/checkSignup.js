function checkForm() {
  const f = document.forms['signup-form'];
  const divW = document.getElementById('warn');
  const divE = document.getElementById('error');
  const divS = document.getElementById('success');
  divW.innerHTML = '';
  divE.innerHTML = '';
  divS.innerHTML = '';
  if (
    f.email.value &&
    f.password.value &&
    f.fname.value &&
    f.lname.value &&
    f.captcha.value
  ) {
    if (!validateEmail(f.email.value)) {
      const p = document.createElement('p');
      p.innerHTML = 'ایمیل وارد شده صحیح نمیباشد.';
      divW.appendChild(p);
      divW.style.display = 'block';
    } else {
      if (f.password.value.length < 8) {
        const p = document.createElement('p');
        p.innerHTML = 'رمز عبور باید حداقل هشت رقم باشد.';
        divW.appendChild(p);
        divW.style.display = 'block';
      } else {
        divW.style.display = 'none';
        divE.style.display = 'none';
        const XHR = new XMLHttpRequest();
        XHR.onreadystatechange = function () {
          if (this.readyState === 4 && this.status === 200) {
            const obj = JSON.parse(this.responseText);
            if (obj.status === 'e') {
              const p = document.createElement('p');
              if (obj.code === 0) {
                p.innerHTML = 'این ایمیل توسط کسی ثبت نام شده.';
              } else if (obj.code === 1) {
                p.innerHTML = 'مشکلی پیش آمده است، بعدا امتحان کنید';
              } else if (obj.code === 2) {
                p.innerHTML = 'کد امنیتی وارد شده اشتباه است.';
              }
              divE.appendChild(p);
              divE.style.display = 'block';
            } else if (obj.status === 's') {
              const p = document.createElement('p');
              p.innerHTML = 'حساب شما با موفقیت ایجاد شد، ' +
              'برای فعالسازی حساب خود، به ایمیل خود مراجعه فرمایید.';
              divS.appendChild(p);
              divS.style.display = 'block';
            }
          }
        };
        XHR.open('POST', '/signup', false);
        XHR.withCredentials = true;
        XHR.setRequestHeader('Content-type',
        'application/x-www-form-urlencoded');
        XHR.send(
          'fname=' + f.fname.value +
          '&lname=' + f.lname.value +
          '&password=' + f.password.value +
          '&captcha=' + f.captcha.value +
          '&email=' + f.email.value);
      }
    }
  }
  return false;
}
