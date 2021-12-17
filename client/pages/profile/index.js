'use strict';
import logOut from '../logout.js';
const url = 'http://localhost:3000';

const token = sessionStorage.getItem('token');
const user = sessionStorage.getItem('user');
const userData = user && JSON.parse(user);

//if user does not login yet, redirect back to login page
if (!token && !user) {
  location.href = '../login/index.html';
}

//redirection to front page when click on app name
const appName = document.getElementById('app-name');
appName.addEventListener('click', () => {
  location.href = '../front/index.html';
});

//get image by user id
const getImageByUser = async (id) => {
  try {
    const fetchOptions = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/image/user/' + id, fetchOptions);
    const images = await response.json();
    createImageCard(images);
  } catch (e) {
    console.log(e.message);
  }
};

getImageByUser(userData.user_id);

//display image uploaded by user
const imageList = document.getElementById('artwork-content');
const createImageCard = (images) => {
  images.forEach((item) => {
    const singleImage = document.createElement('div');
    const img = document.createElement('img');
    img.src = url + '/thumbnails/' + item.image_file;
    img.alt = item.image_title;
    singleImage.className = 'single-image';

    singleImage.appendChild(img);
    imageList.appendChild(singleImage);

    //redirect to single image page with id
    singleImage.addEventListener('click', () => {
      location.href = `../collection/singleImage.html?id=${item.image_id}`;
    });
  });
};

//handle hamburger menu
const menu = document.querySelector('.menu-div');
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

//append file name into image box
document.getElementById('imagePosting').onchange = function () {
  const fileName = this.value.split('\\');
  document.getElementById('uploadImage').textContent =
    fileName[fileName.length - 1];
};

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
const closeUpdateOverlay = document.querySelector('#web');
const closeUpdateOverlayPhone = document.querySelector('#phone');
editProfile.addEventListener('click', () => {
  updateProfileOverlay.classList.add('overlay-open');
});

closeUpdateOverlay.addEventListener('click', () => {
  updateProfileOverlay.classList.remove('overlay-open');
});

closeUpdateOverlayPhone.addEventListener('click', () => {
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
    sessionStorage.setItem('user', JSON.stringify(user));
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

//update user info
const updateInfoForm = document.querySelector('#updateInfoForm');
updateInfoForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = serializeJson(updateInfoForm);
  for (const [prop, value] of Object.entries(data)) {
    if (value === '') {
      delete data[prop];
    }
  }
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
  if (json.message) alert(json.message);
  location.reload();
});

//update password
const updatePasswordForm = document.querySelector('#updatePasswordForm');
updatePasswordForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = serializeJson(updatePasswordForm);
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url + `/user/`, fetchOptions);
  const json = await response.json();
  if (json.message) alert(json.message);
  location.reload();
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
    optionCreated(collections);
  } catch (e) {
    alert(e.message);
  }
})();

const optionCreated = (collections) => {
  collections.forEach((item) => {
    const option = document.createElement('option');
    option.value = item.collection_id;
    option.key = item.collection_title;
    option.innerHTML = item.collection_title;

    select.appendChild(option);
  });
};

//post image
const postArtwork = document.querySelector('#post-artwork');
postArtwork.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = new FormData(postArtwork);

  const fetchOptions = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
    },
    body: data,
  };

  await fetch(url + '/image/user/', fetchOptions);
});

//handle logout button clicked
const logOutButton = document.getElementById('logout');
logOutButton.addEventListener('click', () => {
  logOut();
});
