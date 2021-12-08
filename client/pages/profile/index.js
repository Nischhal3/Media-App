'use strict';

const url = 'http://localhost:3000'; // change url when uploading to server

const token = sessionStorage.getItem('token');
const user = sessionStorage.getItem('user');

console.log('user', user);
if (!token && !user) {
  console.log('here');
  location.href = '../login/index.html';
}

const getImageByUser = async (id) => {
  try {
    const fetchOptions = {
      method: 'GET',
    };
    const response = await fetch(url + '/image/user/' + id);
    const images = await response.json();
    console.log(images);
    createImageCard(images);
  } catch (e) {
    console.log(e.message);
  }
};

console.log("id",getImageByUser(user.user_id))

//Tabs selection
const tabs = document.querySelectorAll('[ data-tab-target]');
const tabContents = document.querySelectorAll('[data-tab-content]');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.tabTarget);
    tabContents.forEach((tabContent) => {
      tabContent.classList.remove('active');
    });
    tabs.forEach((tab) => {
      tab.classList.remove('active');
    });
    target.classList.add('active');
    tab.classList.add('active');
  });
});

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

//open add post overlay
const add = document.querySelector('.add');
const addPostOverlay = document.querySelector('.overlay');
const closeOverlay = document.querySelector('.overlay i');

add.addEventListener('click', () => {
  addPostOverlay.classList.add('overlay-open');
});

closeOverlay.addEventListener('click', () => {
  addPostOverlay.classList.remove('overlay-open');
});

//button edit profile
const updateProfileOverlay = document.querySelector('.updateProfileOverlay');
const editProfile = document.querySelector('.info-header button');
const editProfilePhone = document.querySelector('.info-header i');
const closeUpdateOverlay = document.querySelector('.updateProfileOverlay i');
editProfile.addEventListener('click', () => {
  updateProfileOverlay.classList.add('overlay-open');
});

closeUpdateOverlay.addEventListener('click', () => {
  updateProfileOverlay.classList.remove('overlay-open');
});

editProfilePhone.addEventListener('click', () => {
  updateProfileOverlay.classList.add('overlay-open');
});
