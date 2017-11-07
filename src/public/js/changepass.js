const form = document.forms['changepass-form'];

function checkForm() {
  const pass = form.password;
  if (!validatePassword(pass.value)) {
    alert('Write a correct password');
    return false;
  }
  return true;
}
