'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server

const token = sessionStorage.getItem('token');
const user = sessionStorage.getItem('user');
const userData = user && JSON.parse(user);

const userName = document.querySelector('.userName span');

if (token && user) {
  userName.textContent = userData.first_name;
}

const getQParam = (param) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
};

const getImage = async (id) => {
  try {
    const fetchOptions = {
      method: 'GET',
    };
    const response = await fetch(url + '/image/collection/image/' + id);
    const image = await response.json();
    createPath(image.collection_id, image.collection_title, image.image_title);
    createImageCard(image);
    console.log(image);
  } catch (e) {
    console.log(e.message);
  }
};

getImage(getQParam('id'));

const path = document.getElementById('path');
const createPath = (id, collectionTitle, imageTitle) => {
  const collectionPath = document.createElement('a');
  collectionPath.href = 'index.html';
  collectionPath.className = 'collection-path';
  collectionPath.innerHTML = 'Collections';
  const singleCollectionPath = document.createElement('a');
  singleCollectionPath.innerHTML = collectionTitle;
  singleCollectionPath.href = `singleCollection.html?id=${id}`;
  singleCollectionPath.className = 'single-collection-path';
  const stupid = document.createElement('span');
  const stupid2 = document.createElement('span');
  stupid2.innerHTML = ' > ';
  stupid2.className = 'stupid';
  stupid.innerHTML = ' > ';
  stupid.className = 'stupid';
  const imagePath = document.createElement('a');
  imagePath.innerHTML = imageTitle;
  imagePath.className = 'image-path';

  path.append(collectionPath);
  path.append(stupid);
  path.append(singleCollectionPath);
  path.append(stupid2);
  path.append(imagePath);
};

const imageContent = document.getElementById('image-content');
const createImageCard = (image) => {
  const imageDiv = document.getElementById('image');
  const infoDiv = document.getElementById('info');

  const img = document.createElement('img');
  const imageTitle = document.createElement('h2');
  const imageDate = document.createElement('p');
  const imageDescription = document.createElement('p');
  const artist = document.createElement('h4');
  
  img.src = url + "/" + image.image_file;
  img.alt = image.image_title;
  
  imageTitle.innerHTML = image.image_title;
  imageDate.innerHTML = image.image_date.slice(0, 10);
  imageDescription.innerHTML = image.image_description;
  artist.innerHTML = 'Artist: ' + image.first_name + ' ' + image.last_name;

  img.className = 'single-image';
  imageTitle.className = 'image-title';
  imageDate.className = "date";
  imageDescription.className = 'image-description';
  artist.className = 'artist';

  imageDiv.appendChild(img);
  infoDiv.appendChild(imageTitle);
  infoDiv.appendChild(artist);
  infoDiv.appendChild(imageDate);
  infoDiv.appendChild(imageDescription);
};
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
