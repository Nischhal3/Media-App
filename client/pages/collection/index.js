'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server

const collectionContent = document.getElementById('collectionContent');

const createCollectionCards = (collection) => {
  collection.forEach((item) => {
    const singleCollection = document.createElement('div');
    const img = document.createElement('img');
    const title = document.createElement('p');
    const line = document.createElement('hr');
    const description = document.createElement('p');

    img.src = url + '/thumbnails/' + item.image;
    img.alt = item.collection_title;
    title.innerHTML = item.collection_title;
    description.innerHTML = item.collection_description;

    singleCollection.appendChild(img);
    singleCollection.appendChild(title);
    singleCollection.appendChild(line);
    singleCollection.appendChild(description);
    singleCollection.className = 'single-collection';

    collectionContent.appendChild(singleCollection);
  });
};

const getCollection = async () => {
  try {
    const fetchOptions = {
      method: 'GET',
    };
    const response = await fetch(url + '/collection', fetchOptions);
    const collection = await response.json();
    createCollectionCards(collection);
  } catch (e) {
    console.log(e.message);
  }
};
getCollection();

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
