const loginForm = document.forms['login-form'];

function checkForm() {
  const email = loginForm.email;
  const password = loginForm.password;
  if (!validatePassword(password.value)) {
    alert(`Your password should have at lease one
  number, upper case letter and lower case letter and symbol
  and at least 8 number.`);
    return false;
  }
  if (!validateEmail(email.value)) {
    alert('Write a correct email.');
    return false;
  }
  if (password.value.length < 8) {
    alert('Password is too short.');
    return false;
  }
  return true;
}
