const form = document.forms['changepass-form'];

function validatePassword(password) {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  return re.test(password);
}

function checkForm() {
  const pass = form.password;
  if (!validatePassword(pass.value)) {
    alert('Write a correct password');
    return false;
  }
  return true;
}
