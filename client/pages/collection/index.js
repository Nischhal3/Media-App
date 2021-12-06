'use strict';
const collections = [
  {
    id: 1,
    title: 'PAINTINGS',
    description:
      'More than 4,000 European and American paintings in our collection, dating from the Renaissance period to the present day.',
    image: '../../assets/collection1.svg',
  },
  {
    id: 2,
    title: 'PHOTOGRAPHY',
    description:
      'Phoenix Art Museum presents three annual exhibitions of photography to its community, drawn from the  collection of historical and contemporary photography.',
    image: '../../assets/collection2.svg',
  },
  {
    id: 3,
    title: 'CONTEMPORARY',
    description:
      'The contemporary art collection features cutting-edge contemporary works by living artists, from the mid-20th century to today.',
    image: '../../assets/collection3.svg',
  },
  {
    id: 4,
    title: 'NATURE',
    description:
      'More than 3,000 European and American nature artwork in our collection, dating from the Renaissance to the present day.',
    image: '../../assets/collection4.svg',
  },
  {
    id: 5,
    title: 'SCULPTURES',
    description:
      'Sculpture is a medium that brings artist inspiration to life in three dimensional form. NodeArtive is proud to feature internationally renowned sculpture art from various artists in the world.',
    image: '../../assets/collection5.svg',
  },
  {
    id: 6,
    title: 'MODERN',
    description:
      'The modern art collection features nearly 2,500 objects that capture the progressive, innovative spirit of the early to mid-20th century, from Post Impressionism to the early stages of Abstract Expressionism.',
    image: '../../assets/collection6.svg',
  },
];

const url = 'http://localhost:3000'; // change url when uploading to server

const collectionContent = document.getElementById('collectionContent');

const createCollectionCards = (collection) => {
  console.log('from card', collection);

  collection.forEach((item) => {
    console.log(item.collection_id);

    const singleCollection = document.createElement('div');
    const img = document.createElement('img');
    const title = document.createElement('p');
    const line = document.createElement('hr');
    const description = document.createElement('p');

    img.src =  url + '/thumbnails/' + item.collection_image;
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
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
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
