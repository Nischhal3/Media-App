const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  if (navLinks.classList.contains('open')) {
    navLinks.classList.remove('open');
  } else navLinks.classList.add('open');
});
