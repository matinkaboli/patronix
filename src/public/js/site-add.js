const addSite = document.forms['add-site'];

addSite.addEventListener('submit', e => {
  e.preventDefault();

  fetch('/u/sites/add', {
    method: 'POST',
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      name: addSite.name.value
    })

  }).then(res => res.json()).then(data => {
    if (data.type === 2) {
      localStorage.setItem('newSite', 2);
      window.location.href = '/u/sites';
    } else if (data.type === 0) {
      iziToast.error({
        title: 'شما بیشتر از یک سایت نمیتوانید داشته باشید',
        rtl: true,
        message: 'برای ساخت سایت های بیشتر باید اکانت خود را ارتقا دهید'
      });
    }
  }).catch(err => {
    iziToast.error({
      title: 'شما بیشتر از یک سایت نمیتوانید داشته باشید',
      rtl: true,
      message: 'برای ساخت سایت های بیشتر باید اکانت خود را ارتقا دهید'
    });
  });
});
