if (parseInt(localStorage.getItem('newSite')) === 2) {
  iziToast.success({
    title: 'سایت شما ساخته شد',
    rtl: true,
    message: 'الان میتونی ازش استفاده کنی'
  });
  localStorage.removeItem('newSite');
}

if (parseInt(localStorage.getItem('delSite')) === 2) {
  iziToast.success({
    title: 'سایت با موفقیت حذف شد',
    rtl: true
  });
  localStorage.removeItem('delSite');
}


if (localStorage.getItem('siteNewVal')) {
  iziToast.success({
    title: 'تغییرات ثبت شد',
    rtl: true,
    message: `اسم سایت به ${localStorage.getItem('siteNewVal')} تغییر کرد`
  });
  localStorage.removeItem('siteNewVal');
}
