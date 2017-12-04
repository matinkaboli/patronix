function checkForm() {
  const f = document.forms['login-form'];
  const divW = document.getElementById('warn');
  const divE = document.getElementById('error');
  const divS = document.getElementById('success');
  divW.innerHTML = '';
  divE.innerHTML = '';
  divS.innerHTML = '';
  divW.style.display = 'none';
  divE.style.display = 'none';
  divS.style.display = 'none';
  if (
    f.email.value &&
    f.password.value
  ) {
    if (!validateEmail(f.email.value)) {
      const p = document.createElement('p');
      p.innerHTML = 'ایمیل وارد شده صحیح نمیباشد.';
      divW.appendChild(p);
      divW.style.display = 'block';
    } else {
      const XHR = new XMLHttpRequest();
      XHR.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          const obj = JSON.parse(this.responseText);
          console.log(obj);
          if (obj.status === 'e') {
            const p = document.createElement('p');
            if (obj.code === 0) {
              p.innerHTML = 'حساب شما تایید نشده، برای تایید آن به ';
              const a = document.createElement('a');
              a.setAttribute('href', '/code');
              a.innerHTML = 'این صفحه';
              p.appendChild(a);
              p.innerHTML += ' مراجعه کنید';
            } else if (obj.code === 1) {
              p.innerHTML = 'حساب شما منقضی شده است.';
            } else if (obj.code === 2) {
              p.innerHTML = 'چنین حسابی وجود ندارد.';
              p.innerHTML += ' در غیر این صورت رمز عبور یا ایمیل غلط است.';
            } else if (obj.code === 3) {
              p.innerHTML = 'خطا! بعدا امتحان کنید.';
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
      XHR.open('POST', '/login', false);
      XHR.withCredentials = true;
      XHR.setRequestHeader('Content-type',
      'application/x-www-form-urlencoded');
      XHR.send(
        'password=' + f.password.value +
        '&email=' + f.email.value);
    }
  }
  return false;
}
