'use strict';

const url = 'http://localhost:3000';
const token = sessionStorage.getItem('token');
const user = sessionStorage.getItem('user');
const userData = user && JSON.parse(user);

//display the fixed artworks

(async function getImageByCollection(id) {
  try {
    const fetchOptions = {
      method: 'GET',
    };
    const response = await fetch(url + '/image/collection/1');
    const images = await response.json();
    displayArtworks(images);
  } catch (e) {
    console.log(e.message);
  }
})();

const displayArtworks = (artworks) => {
  const artworksContent = document.getElementById('artworksContent');

  artworks.forEach((artwork) => {
    const singleArtwork = document.createElement('div');
    const img = document.createElement('img');
    const title = document.createElement('p');

    img.src = artwork.image_file;
    title.innerHTML = artwork.image_title;

    const div = document.createElement('div');
    div.innerHTML += `<a>Find out more</a> <span><i class='fas fa-chevron-right'></i></span>`;
    div.className = 'button';

    singleArtwork.appendChild(img);
    singleArtwork.appendChild(title);
    singleArtwork.appendChild(div);
    singleArtwork.className = 'artwork';

    artworksContent.appendChild(singleArtwork);
  });
};

const goToLogIn = document.querySelector('.imgOverlay a');

if (!token && !user) {
  goToLogIn.href = '../login/index.html';
}

if (token && user) {
  goToLogIn.textContent = 'Contact Artist';
  //will need to display artist contact?
  goToLogIn.href = '../collection/singleCollection.html';
}

//display items for front page header
const headerContent = document.querySelector('.headerContent');
const loginText = document.querySelector('.loginText');

const hamburgerMenu = `<button class="menu"><i class="fas fa-bars"></i></button>
<ul class="nav-links">
  <i class="fas fa-times close-menu"></i>
  <li><a href="../../pages/front/index.html">Home</a></li>
  <li><a href="../../pages/profile/index.html">Profile</a></li>
  <li><a href="../../pages/collection/index.html">Collections</a></li>
  <li><a>Log out</a></li>
</ul>`;

if (token && user) {
  loginText.innerHTML = userData.first_name;
  headerContent.innerHTML += hamburgerMenu;
  headerContent.className = 'headerContentLoggedIn';
}

const menu = document.querySelector('.menu');
const navLinks = document.querySelector('.nav-links');
const closeMenuButton = document.querySelector('.close-menu');

menu &&
  menu.addEventListener('click', () => {
    navLinks.classList.add('open');
    navLinks.classList.remove('close');
  });

closeMenuButton &&
  closeMenuButton.addEventListener('click', () => {
    navLinks.classList.add('close');
    navLinks.classList.remove('open');
  });

//button of greeting parts
const greeting = document.querySelector('.greeting');
const greetingButton = document.querySelector('.greeting a');

if (token && user) {
  greetingButton.className = 'disappear';
  const buttonGroup = document.createElement('div');
  const gotToCollection = document.createElement('a');
  const shareYourArtwork = document.createElement('a');
  gotToCollection.href = '../collection/index.html';
  gotToCollection.textContent = 'Go to collections';
  shareYourArtwork.href = '../profile/index.html';
  shareYourArtwork.textContent = 'Share Your Artwork';
  buttonGroup.appendChild(gotToCollection);
  buttonGroup.appendChild(shareYourArtwork);
  greeting.appendChild(buttonGroup);
  buttonGroup.className = 'greetingBtns';
}

//handle redirect login button on header
const loginDiv = document.querySelector('.login');
loginDiv.addEventListener('click', () => {
  if (token && user) {
    location.href = '../profile/index.html';
  } else {
    location.href = '../login/index.html';
  }
});

const searchDiv = document.querySelector('.search');
searchDiv.addEventListener('click', () => {
  location.href = '../collection/index.html';
});
