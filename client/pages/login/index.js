'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server

// select existing html elements
const loginForm = document.querySelector('#login-form');

// login
loginForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(loginForm);
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url + '/auth/login', fetchOptions);
  const json = await response.json();

  if (json.user) {
    // save token
    sessionStorage.setItem('token', json.token);
    sessionStorage.setItem('user', JSON.stringify(json.user));
    location.href = '../front/index.html';
    return;
  }

  alert(json.message);
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
