if (localStorage.getItem('delAcc')) {
  iziToast.success({
    title: 'موفق',
    rtl: true,
    message: 'حساب شما با موفقیت حذف شد'
  });
  localStorage.removeItem('delAcc');
}
