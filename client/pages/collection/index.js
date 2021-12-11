'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server

const token = sessionStorage.getItem('token');
const user = sessionStorage.getItem('user');

const collectionContent = document.getElementById('collectionContent');
const textNotFound = document.getElementById('not-found');
const searchCollection = document.getElementById('collection');
const searchInput = document.getElementById('search-collection');
const searchButton = document.getElementById('search-button');
const h2 = document.getElementById('to-collections');
const appName = document.getElementById('app-name');

appName.addEventListener('click', () => {
    location.href = '../front/index.html';
  });

h2.addEventListener('click', () => {
    location.href = 'index.html';
  });

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

    //redirect to single collection page with id
    singleCollection.addEventListener('click', () => {
      location.href = `singleCollection.html?id=${item.collection_id}`;
    });
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
  singleCollection.addEventListener('click', () => {
    location.href = `singleCollection.html?id=${item.collection_id}`;
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
    searchFunction(collection);
  } catch (e) {
    console.log(e.message);
  }
};
getCollection();

const searchFunction = (collection) => {
  handleEnter();
  searchButton.addEventListener('click', () => {
    searchCollection.innerHTML = '';
    const input = document.getElementById('search-collection').value;
    let array = [];
    for (let i = 0; i < collection.length; i++) {
      const titles = collection[i].collection_title.toLowerCase();
      if (titles.includes(input)) {
        createSearchCards(collection[i]);
        collectionContent.style.display = 'none';
        searchCollection.style.display = 'flex';
        array.push(collection[i]);
      }
      if (array.length == 0) {
        collectionContent.style.display = 'none';
        textNotFound.style.display = 'block';
        textNotFound.innerHTML =
          'Sorry we do not have any collection like that!';
      } else {
        textNotFound.style.display = 'none';
      }
    }
    searchInput.value = '';
  });
};

const handleEnter = () => {
  searchInput.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      searchButton.click();
    }
  });
};

const menu = document.querySelector('.hamburgerMenu');
const navLinks = document.querySelector('.nav-links');
const closeMenuButton = document.querySelector('.close-menu');
const logout = document.querySelector('#logout');

if (!token || !user) {
  logout.className = 'noUser';
}

menu.addEventListener('click', () => {
  navLinks.classList.add('open');
  navLinks.classList.remove('close');
});

closeMenuButton.addEventListener('click', () => {
  navLinks.classList.add('close');
  navLinks.classList.remove('open');
});

const logOut = document.getElementById('logout');
logOut.addEventListener('click', () => {
  (async () => {
    try {
      const response = await fetch(url + '/auth/logout');
      const json = await response.json();
      console.log(json);
      // remove token
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      alert('You have logged out');
      location.href = '../front/index.html';
    } catch (e) {
      console.log(e.message);
    }
  })();
})