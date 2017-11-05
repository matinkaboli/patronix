const settingForm = document.forms['signup-form'];
const passForm = document.forms['pass-form'];

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
function validatePassword(password) {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  return re.test(password);
}

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
