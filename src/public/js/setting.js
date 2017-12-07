// THIS FILE MUST BE CHANGED, IT IS NOT COMPLETE, DO NOT USE THIS YET
const settingForm = document.forms['main-form'];
const passForm = document.forms['pass-form'];

function checkForm() {
  const email = settingForm.email;
  if (!validateEmail(email.value)) {
    alert('Write a correct email.');
    return false;
  }
  return true;
}
function checkPassForm() {
  const password = passForm.newpass;
  if (password.value.length < 8) {
    alert('Password is too short.');
    return false;
  }
  if (!validatePassword(password.value)) {
    alert(`Your password should have at lease one
  number, upper case letter and lower case letter and symbol
  and at least 8 number.`);
    return false;
  }
  return true;
}
