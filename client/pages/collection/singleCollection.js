'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server
const appName = document.getElementById('app-name');

appName &&
  appName.addEventListener('click', () => {
    location.href = '../front/index.html';
  });

const token = sessionStorage.getItem('token');
const user = sessionStorage.getItem('user');
const userData = user && JSON.parse(user);

const getQParam = (param) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
};

const getImageByCollection = async (id) => {
  try {
    const fetchOptions = {
      method: 'GET',
    };
    const response = await fetch(url + '/image/collection/' + id);
    const images = await response.json();
    createImageCard(images);
  } catch (e) {
    console.log(e.message);
  }
};

const getOneCollection = async (id) => {
  try {
    const fetchOptions = {
      method: 'GET',
    };
    const response = await fetch(url + '/collection/' + id);
    const collection = await response.json();
    createPath(getQParam('id'), collection.collection_title);
  } catch (e) {
    console.log(e.message);
  }
};

getImageByCollection(getQParam('id'));
getOneCollection(getQParam('id'));

const path = document.getElementById('path');
const createPath = (id, title) => {
  const collectionPath = document.createElement('a');
  collectionPath.href = 'index.html';
  collectionPath.className = 'collection-path';
  collectionPath.innerHTML = 'Collections';
  const singleCollectionPath = document.createElement('a');
  singleCollectionPath.innerHTML = title;
  singleCollectionPath.href = `singleCollection.html?id=${id}`;
  singleCollectionPath.className = 'single-collection-path';
  const rightArrow = document.createElement('span');
  rightArrow.innerHTML = ' > ';
  rightArrow.className = 'stupid';

  path.append(collectionPath);
  path.append(rightArrow);
  path.append(singleCollectionPath);
};

const imageList = document.getElementById('images');
const createImageCard = (images) => {
  images.forEach((item) => {
    const singleImage = document.createElement('div');
    const img = document.createElement('img');
    const overlay = document.createElement('div');
    const title = document.createElement('div');
    const icons = document.createElement('div');
    const like = document.createElement('a');
    const save = document.createElement('a');
    const iconLike = document.createElement('i');
    const iconSave = document.createElement('i');
    like.append(iconLike);
    save.append(iconSave);
    icons.appendChild(like);
    icons.appendChild(iconSave);
    img.src = url + '/thumbnails/' + item.image_file;
    img.alt = item.image_title;
    title.innerHTML =
      item.first_name + ' ' + item.last_name + ', ' + `"${item.image_title}"`;

    singleImage.appendChild(img);
    overlay.appendChild(title);
    overlay.appendChild(icons);
    singleImage.append(overlay);
    singleImage.className = 'single-image';
    overlay.className = 'overlay';
    title.className = 'text';
    icons.className = 'icons';
    iconLike.className = 'far fa-heart';
    iconSave.className = 'far fa-bookmark';

    imageList.appendChild(singleImage);

    //redirect to single image page with id
    singleImage.addEventListener('click', () => {
      location.href = `singleImage.html?id=${item.image_id}`;
    });
  });
};

const userName = document.querySelector('.loginText');

if (token && user) {
  userName.textContent = userData.first_name;
}

const menu = document.querySelector('.menu');
const navLinks = document.querySelector('.nav-links');
const closeMenuButton = document.querySelector('.close-menu');

//toggle menu
menu.addEventListener('click', () => {
  navLinks.classList.add('open');
  navLinks.classList.remove('close');
});

closeMenuButton.addEventListener('click', () => {
  navLinks.classList.add('close');
  navLinks.classList.remove('open');
});

//redirect to profile page when there is user
const loginDiv = document.querySelector('.login');
loginDiv.addEventListener('click', () => {
  if (token && user) {
    location.href = '../profile/index.html';
  } else {
    location.href = '../login/index.html';
  }
});
