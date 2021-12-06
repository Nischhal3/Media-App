'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server

const collectionContent = document.getElementById('collectionContent');
const textNotFound = document.getElementById('not-found');
const searchCollection = document.getElementById('collection');


const createCollectionCards = (collection) => {
  collection.forEach((item) => {
    const singleCollection = document.createElement('div');
    const img = document.createElement('img');
    const title = document.createElement('h4');
    const line = document.createElement('hr');
    const description = document.createElement('p');

    img.src = url + '/' + item.image;
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


const createSearchCards = (item) => {
  const singleCollection = document.createElement('div');
  const img = document.createElement('img');
  const title = document.createElement('h4');
  const line = document.createElement('hr');
  const description = document.createElement('p');

  img.src = url + '/' + item.image;
  img.alt = item.collection_title;
  title.innerHTML = item.collection_title;
  description.innerHTML = item.collection_description;

  singleCollection.appendChild(img);
  singleCollection.appendChild(title);
  singleCollection.appendChild(line);
  singleCollection.appendChild(description);
  singleCollection.className = 'single-collection';

  searchCollection.appendChild(singleCollection);
};


const getCollection = async () => {
  try {
    const fetchOptions = {
      method: 'GET',
    };
    const response = await fetch(url + '/collection', fetchOptions);
    const collection = await response.json();
    createCollectionCards(collection);
    searchFunction(collection);
  } catch (e) {
    console.log(e.message);
  }
};
getCollection();

const searchFunction = (collection) => {
  const searchButton = document.getElementById('search-button');
  searchButton.addEventListener('click', () => {
    searchCollection.innerHTML = "";
    const input = document.getElementById('search-collection').value;
    for (let i = 0; i < collection.length; i++) {
      const titles = (collection[i].collection_title).toLowerCase();
      if (titles.includes(input)) {
        createSearchCards(collection[i]);
        collectionContent.style.display = "none";
        searchCollection.style.display = "flex";
      }
      if (titles.includes(input) === false) {
        
      }
    }
  });
};

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
