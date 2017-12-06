function checkForm() {
  const f = document.forms['resend-form'];
  const divW = document.getElementById('warn');
  const divE = document.getElementById('error');
  const divS = document.getElementById('success');
  divW.innerHTML = '';
  divE.innerHTML = '';
  divS.innerHTML = '';
  divW.style.display = 'none';
  divE.style.display = 'none';
  divS.style.display = 'none';

  if (f.email.value) {
    if (!validateEmail(f.email.value)) {
      const p = document.createElement('p');
      p.innerHTML = 'ایمیل وارد شده صحیح نمیباشد.';
      divW.appendChild(p);
      divW.style.display = 'block';
    } else {
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
        if (data.type === 'e') {
          const p = document.createElement('p');
          if (data.code === 0) {
            p.innerHTML = 'چنین حسابی وجود ندارد.';
          } else if (data.code === 1) {
            p.innerHTML = 'خطا! بعدا امتحان کنید.';
          }
          divE.appendChild(p);
          divE.style.display = 'block';
        } else if (data.type === 's') {
          const p = document.createElement('p');
          p.innerHTML = 'پیام تاییدیه به ایمیل شما فرستاده شد.';
          divS.appendChild(p);
          divS.style.display = 'block';
        } else if (data.type === 'w') {
          if (data.code === 0) {
            window.location.href = '/login';
          }
        }
      }).catch(() => {
        const p = document.createElement('p');
        p.innerHTML = 'خطا! بعدا امتحان کنید.';
        divE.appendChild(p);
        divE.style.display = 'block';
      });
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