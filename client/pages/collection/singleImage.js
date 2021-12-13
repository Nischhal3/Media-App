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
    getId(image.collection_id);
  } catch (e) {
    console.log(e.message);
  }
};
getImage(getQParam('id'));

//Stroing id for collection to use later after deleting image
let collectionID;

const path = document.getElementById('path');
const createPath = (id, collectionTitle, imageTitle) => {
  collectionID = id;
  const collectionPath = document.createElement('a');
  collectionPath.href = 'index.html';
  collectionPath.className = 'collection-path';
  collectionPath.innerHTML = 'Collections';
  const singleCollectionPath = document.createElement('a');
  singleCollectionPath.innerHTML = collectionTitle;
  singleCollectionPath.href = `singleCollection.html?id=${id}`;
  singleCollectionPath.className = 'single-collection-path';
  const rightArrow = document.createElement('span');
  const rightArrow2 = document.createElement('span');
  rightArrow2.innerHTML = '> ';
  rightArrow2.className = 'stupid';
  rightArrow.innerHTML = '> ';
  rightArrow.className = 'stupid';
  const imagePath = document.createElement('a');
  imagePath.innerHTML = imageTitle;
  imagePath.className = 'image-path';

  path.append(collectionPath);
  path.append(rightArrow);
  path.append(singleCollectionPath);
  path.append(rightArrow2);
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

  img.src = url + '/' + image.image_file;
  img.alt = image.image_title;

  imageTitle.innerHTML = image.image_title;
  imageDate.innerHTML = image.image_date.slice(0, 10);
  imageDescription.innerHTML = image.image_description;
  artist.innerHTML = 'Artist: ' + image.first_name + ' ' + image.last_name;

  imageTitle.className = 'image-title';
  imageDate.className = 'date';
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

//open edit image overlay
const editButton = document.getElementById('edit');
const addPostOverlay = document.querySelector('.overlay');
const closeOverlay = document.querySelector('.overlay i');

editButton.addEventListener('click', () => {
  addPostOverlay.classList.add('overlay-open');
});

closeOverlay.addEventListener('click', () => {
  addPostOverlay.classList.remove('overlay-open');
});

//get all collections for options in updating artwork
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

//Update image
const updateImageForm = document.querySelector('.formContent');
updateImageForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = serializeJson(updateImageForm);
  const imageId = getQParam('id');
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url + `/image/user/${imageId}`, fetchOptions);
  const json = await response.json();
  alert(json.message);
  location.reload();
});

//Deleting image
const deleteImage = document.querySelector('#delete');
deleteImage.addEventListener('click', async () => {
  if (confirm('Are you sure you want to delete this image?')) {
    // Save it!
    const imageId = getQParam('id');
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    };

    const response = await fetch(url + `/image/user/${imageId}`, fetchOptions);
    const json = await response.json();
    alert(json.message);
    //Redirection to collection page after deleting image
    location.href = `singleCollection.html?id=${collectionID}`;
  }
});
