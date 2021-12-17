'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server

// select existing html elements
const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(signupForm);
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url + '/auth/register', fetchOptions);
  const json = await response.json();

  if (json.token && json.user) {
    // save token
    sessionStorage.setItem('token', json.token);
    sessionStorage.setItem('user', JSON.stringify(json.user));
    location.href = '../front/index.html';
    return;
  }

  if (json.length > 0) {
    let errors = '';
    json.forEach((err) => (errors += `${err.msg}\n`));
    alert(errors);
    return false;
  }

  alert(json.message);
  return false;
});

//handle hamburger menu
const menu = document.querySelector('.menu');
const navLinks = document.querySelector('.nav-links');
const closeMenuButton = document.querySelector('.close-menu');

menu.addEventListener('click', () => {
  navLinks.classList.add('open');
  navLinks.classList.remove('close');
});

closeMenuButton.addEventListener('click', () => {
  navLinks.classList.add('close');
  navLinks.classList.remove('open');
});
