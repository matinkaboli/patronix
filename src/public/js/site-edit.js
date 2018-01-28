const delAcc = $('#delete-account');
const siteSetting = document.forms['site-setting'];

delAcc.on('click', e => {
  e.preventDefault();

  let URL = window.location.pathname;
  URL = URL.replace('edit', 'remove');

  iziToast.question({
      timeout: 10000,
      close: false,
      overlay: true,
      toastOnce: true,
      id: 'question',
      zindex: 999,
      rtl: true,
      title: 'اوپس..',
      message: 'مطمئنی؟',
      position: 'center',
      buttons: [
        ['<button><b>اره</b></button>', (instance, toast) => {
          instance.hide(toast, { transitionOut: 'fadeOut' }, 'button');

          fetch(URL, {
            credentials: 'include',
            method: 'POST'
          })
          .then(res => res.json())
          .then(data => {
            if (data.type === 2) {
              localStorage.setItem('delSite', 2);
              window.location.href = '/u/sites';
            }
          }).catch(err => {
            iziErr();
          });

        }, true],
        ['<button>نه</button>', (instance, toast) => {
          instance.hide(toast, { transitionOut: 'fadeOut' }, 'button');
        }]
      ]
  });
});

siteSetting.addEventListener('submit', e => {
  e.preventDefault();


  let URL = window.location.pathname;
  URL = URL.replace('setting', 'edit');


  fetch(URL, {
    method: 'POST',
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      name: siteSetting.name.value
    })
  }).then(res => res.json()).then(data => {
    if (data.type === 2) {
      localStorage.setItem('siteNewVal', siteSetting.name.value);
      location.href = '/u/sites/';
    } else if (data.type === 0) {
      iziErr();
    }
  }).catch(err => {

  });
});
