function checkForm() { //eslint-disable-line
  const f = document.forms['changepass-form'];
  const divW = document.getElementById('warn');
  const divE = document.getElementById('error');
  const divS = document.getElementById('success');
  divW.innerHTML = '';
  divE.innerHTML = '';
  divS.innerHTML = '';
  divW.style.display = 'none';
  divE.style.display = 'none';
  divS.style.display = 'none';

  if (f.password.value) {
    if (f.password.value.length < 7) {
      const p = document.createElement('p');
      p.innerHTML = M[1][1];
      divW.appendChild(p);
      divW.style.display = 'block';
    } else {
      fetch('/forgot/changepass', {
        method: 'POST',
        credentials: 'include',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          email: f.password.value
        })
      }).then(checkStatus).then(res => res.json()).then(data => {
        if (data.type === 'e') {
          const p = document.createElement('p');
          if (data.code === 0) {
            p.innerHTML = M[0][3];
          } else if (data.code === 1) {
            p.innerHTML = M[0][0];
          }
          divE.appendChild(p);
          divE.style.display = 'block';
        } else if (data.type === 's') {
          window.location.href = '/login';
        }
      }).catch(() => {
        const p = document.createElement('p');
        p.innerHTML = M[0][0];
        divE.appendChild(p);
        divE.style.display = 'block';
      });
    }
  }
  return false;
}
