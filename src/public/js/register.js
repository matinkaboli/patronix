const registerForm = document.forms['signup-form'];

function checkForm() {
  const email = registerForm.email;
  const password = registerForm.password;
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
}
