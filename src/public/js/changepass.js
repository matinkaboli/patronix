// This file need to be changed
function checkForm() {
  if (f.password.value) {

    if (f.password.value.length < 7) {
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
}
