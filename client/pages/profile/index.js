'use strict';

const url = 'http://localhost:3000';

const token = sessionStorage.getItem('token');
const user = sessionStorage.getItem('user');
const userData = user && JSON.parse(user);
console.log(userData)
if (!token && !user) {
  console.log('here');
  location.href = '../login/index.html';
}

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

//get user and display user
(async function getUser() {
  try {
    const fetchOptions = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    const response = await fetch(
      url + `/user/${userData.user_id}`,
      fetchOptions
    );
    const user = await response.json();
    console.log(user);
    const userName = document.querySelector('.info-header p');
    const userIntro = document.querySelector('.user-intro');
    const imageName = document.getElementById('name');
    userName.textContent = user.first_name + ' ' + user.last_name;
    imageName.textContent =
      user.first_name.charAt(0) + user.last_name.charAt(0);
    if (user.user_description !== null)
      userIntro.textContent = user.user_description;
  } catch (e) {
    console.log(e.message);
  }
})();

//update user
const updateInfoForm = document.querySelector('#updateInfoForm');

updateInfoForm.addEventListener('submit', async () => {
  const data = serializeJson(updateInfoForm);
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url + `/user/${userData.user_id}`, fetchOptions);
  const json = await response.json();

  if (json.length > 0) {
    let errors = '';
    json.forEach((err) => (errors += `${err.msg}\n`));
    alert(errors);
    return false;
  }
});

//get all collections for options in uploading artwork
const select = document.getElementById('collection-select');
(async function getAllCollections() {
  try {
    const fetchOptions = {
      method: 'GET',
    };
    const response = await fetch(url + '/collection', fetchOptions);
    const collections = await response.json();
    console.log(collections);
    optionCreated(collections);

  } catch (e) {
    alert(e.message);
  }
})();

const optionCreated = (collections) => {
  collections.forEach((item) => {
    const option = document.createElement('option');
    option.key = item.collection_id;
    option.value = item.collection_title;
    option.innerHTML = item.collection_title;

    select.appendChild(option);
  });
}