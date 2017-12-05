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
        fetch('/signup', {
          method: 'POST',
          credentials: 'include',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }),
          body: JSON3.stringify({
            fname: f.fname.value,
            lname: f.lname.value,
            password: f.password.value,
            email: f.email.value,
            captcha: f.captcha.value
          })
        }).then(checkStatus).then(res => res.json()).then(data => {
          if (data.status === 'e') {
            const p = document.createElement('p');
            if (data.code === 0) {
              p.innerHTML = 'این ایمیل توسط کسی ثبت نام شده.';
            } else if (data.code === 1) {
              p.innerHTML = 'مشکلی پیش آمده است، بعدا امتحان کنید';
            } else if (data.code === 2) {
              p.innerHTML = 'کد امنیتی وارد شده اشتباه است.';
            }
            divE.appendChild(p);
            divE.style.display = 'block';
          } else if (data.status === 's') {
            const p = document.createElement('p');
            p.innerHTML = 'حساب شما با موفقیت ایجاد شد، ' +
            'برای فعالسازی حساب خود، به ایمیل خود مراجعه فرمایید.';
            divS.appendChild(p);
            divS.style.display = 'block';
          }
        }).catch(() => {
          const p = document.createElement('p');
          p.innerHTML = 'خطا! بعدا امتحان کنید.';
          divW.appendChild(p);
          divW.style.display = 'block';
        });
      }
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
