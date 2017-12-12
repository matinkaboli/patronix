const su = document.getElementById('sign-up');
const si = document.getElementById('sign-in');
const sic = document.getElementById('sign-in-container');
const suc = document.getElementById('sign-up-container');

su.addEventListener('click', () => {
  si.classList.remove('active');
  sic.style.display = 'none';
  su.classList.add('active');
  suc.style.display = 'block';
});
si.addEventListener('click', () => {
  si.classList.add('active');
  sic.style.display = 'block';
  su.classList.remove('active');
  suc.style.display = 'none';
});
