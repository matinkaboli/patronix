/* eslint-disable */

import izitoast from 'izitoast';


function validateEmail(email){var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return re.test(email);}

const validatePassword = password => password.length >= 8 ? true : false;

const validateImage = img => {
  const type = img.type.split('/')[1];

  if (img.size > 1048576) {
    izitoast.warning({
      rtl: true,
      title: 'حجم فایل حداکثر می تواند ۱ مگابایت باشد.'
    });

    return false;
  }

  if (!['jpg', 'jpeg', 'png'].includes(type)) {
    izitoast.warning({
      rtl: true,
      title: 'فرمت فایل باید jpg یا png باشد'
    });

    return false;
  }
  
  return true;
};

export {
  validateEmail as email,
  validateImage as image,
  validatePassword as password,
};
