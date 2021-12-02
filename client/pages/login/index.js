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
  console.log('login response', json);
  if (!json.user) {
    alert(json.message);
  } else {
    // save token
    sessionStorage.setItem('token', json.token);
    sessionStorage.setItem('user', JSON.stringify(json.user));
    location.href = '../front/index.html';
  }
});

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  if (navLinks.classList.contains('open')) {
    navLinks.classList.remove('open');
    navLinks.classList.add('close');
    hamburger.classList.remove('hamburgerOpen');
  } else {
    navLinks.classList.remove('close');
    navLinks.classList.add('open');
    hamburger.classList.add('hamburgerOpen');
  }
});
