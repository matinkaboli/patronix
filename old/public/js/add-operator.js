fixLink('add-operator');
fixLink('remove-operator-form', 'action');
fixLink('add-operator-form', 'action');

$('#add-operator').on('click', e => {
  e.preventDefault();

  $('#add-operator-form').toggleClass('hidden-box');
});

const addOp = document.forms['add-operator-form'];

addOp.addEventListener('submit', e => {
  e.preventDefault();

  if (validateEmail(addOp.email.value)) {
    fetch(addOp.getAttribute('action'), {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      bode: JSON.stringify({
        email: addOp.email.value.toLowerCase()
      })
    }).then(res => res.json()).then(data => {
      if (data.type === 2) {
        iziToast.success({
          title: 'پشتیبان با موفقیت به سایت اضافه شد',
          rtl: true
        });
      } else if (data.type === 0) {
        iziToast.error({
          title: 'خطا!',
          rtl: true,
          message: 'مشکلی پیش آمده است، بعدا امتحان کنید'
        });
      }
    }).catch(() => {
      iziToast.error({
        title: 'خطا!',
        rtl: true,
        message: 'مشکلی پیش آمده است، بعدا امتحان کنید'
      });
    });
  } else {
    iziToast.warning({
      title: 'خطا!',
      rtl: true,
      message: 'ایمیل وارد شده صحیح نیست'
    });
  }
});

const removeOp = document.forms['remove-operator-form'];

removeOp.addEventListener('submit', e => {
  e.preventDefault();

  fetch(removeOp.getAttribute('action'), {
    method: 'POST',
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }),
    bode: JSON.stringify({
      id: removeOp.id.value
    })
  }).then(res => res.json()).then(data => {
    if (data.type === 0) {
      iziToast.error({
        title: 'خطا!',
        rtl: true,
        message: 'مشکلی پیش آمده است، بعدا امتحان کنید'
      });
    } else {
      iziToast.success({
        title: 'پشتیبان با موفقیت از سایت حذف شد',
        rtl: true
      });
    }
  }).catch(() => {
    iziToast.error({
      title: 'خطا!',
      rtl: true,
      message: 'مشکلی پیش آمده است، بعدا امتحان کنید'
    });
  });
});
