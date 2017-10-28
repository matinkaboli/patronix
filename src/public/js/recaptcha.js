const btn = document.getElementById('change-captcha');

btn.addEventListener('click', () => {
  fetch('/recaptcha').then(res => res.json()).then(data => {
    let svgElement = document.getElementsByTagName('svg')[0];
    svgElement.innerHTML = data.captcha;
    console.log(data);
  }).catch(() => {
    console.log('خطا! بعدا امتحان کنید.');
  });
});
