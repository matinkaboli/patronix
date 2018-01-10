if (parseInt(localStorage.getItem('newSite')) === 2) {
  iziToast.success({
    title: 'سایت شما ساخته شد',
    rtl: true,
    message: 'الان میتونی ازش استفاده کنی'
  });
  localStorage.removeItem('newSite');
}
