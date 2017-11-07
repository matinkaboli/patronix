const form = document.forms['forgot-form'];

function checkForm() {
  const email = form.email;
  if (!validateEmail(email.value)) {
    alert('Write a correct email');
    return false;
  }
  return true;
}
