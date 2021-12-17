'use strict';
import logOut from '../logout.js';
const url = 'http://localhost:3000'; // change url when uploading to server
const appName = document.getElementById('app-name');

//redirect to front page when click on app name
appName.addEventListener('click', () => {
  location.href = '../front/index.html';
});

const token = sessionStorage.getItem('token');
const user = sessionStorage.getItem('user');
const userData = user && JSON.parse(user);

//get id on url
const getQParam = (param) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
};

//get all images belong to a collection
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

//get one collection with collection id
const getOneCollection = async (id) => {
  try {
    const fetchOptions = {
      method: 'GET',
    };
    const response = await fetch(url + '/collection/' + id, fetchOptions);
    const collection = await response.json();
    createPath(getQParam('id'), collection.collection_title);
  } catch (e) {
    console.log(e.message);
  }
};

getImageByCollection(getQParam('id'));
getOneCollection(getQParam('id'));

//Display the path to the collection
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

//display all images of the collection
const imageList = document.getElementById('images');
const createImageCard = (images) => {
  images.forEach((item) => {
    const singleImage = document.createElement('div');
    const img = document.createElement('img');
    const overlay = document.createElement('div');
    const line = document.createElement('hr');
    const artist = document.createElement('p');
    const title = document.createElement('p');

    img.src = url + '/thumbnails/' + item.image_file;
    img.alt = item.image_title;
    artist.innerHTML = item.first_name + ' ' + item.last_name;

    title.innerHTML = `"${item.image_title}"`;

    singleImage.appendChild(img);
    overlay.appendChild(artist);
    overlay.appendChild(line);
    overlay.appendChild(title);
    singleImage.append(overlay);
    singleImage.className = 'single-image';
    overlay.className = 'overlay';
    artist.className = 'artist';
    title.className = 'text';
    line.className = 'line';

    imageList.appendChild(singleImage);

    //redirect to single image page with id
    singleImage.addEventListener('click', () => {
      location.href = `singleImage.html?id=${item.image_id}`;
    });
  });
};

const userName = document.querySelector('.loginText');

//display user name
if (token && user) {
  userName.textContent = userData.first_name;
}

const menu = document.querySelector('.menu');
const navLinks = document.querySelector('.nav-links');
const closeMenuButton = document.querySelector('.close-menu');
const logout = document.querySelector('#logout');

//hide the logout when user is not logged in
if (!token || !user) {
  logout.className = 'disappear';
}

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

//logout function
const logOutButton = document.getElementById('logout');
logOutButton.addEventListener('click', () => {
  logOut();
});
