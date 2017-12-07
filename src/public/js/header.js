const d = document.getElementById('open-close-bar');
const dO = document.getElementById('open-bar');
const dC = document.getElementById('close-bar');
let time = 0;
d.addEventListener('click', () => {
  if (time === 0) {
    dO.style.display = 'none';
    dC.style.display = 'block';
    time = 1;
  } else {
    dO.style.display = 'block';
    dC.style.display = 'none';
    time = 0;
  }
});
