'use strict';

const token = sessionStorage.getItem('token');
const user = sessionStorage.getItem('user');
const userData = user && JSON.parse(user);

//display the fixed artworks
const artworks = [
  {
    id: 1,
    title: 'Johannes Vermeer, Girl with a Pearl Earring',
    image: '../../assets/artwork1.svg',
  },
  {
    id: 2,
    title: 'Gustav Klimt, “The Kiss” oil and gold leaf on canvas',
    image: '../../assets/artwork2.svg',
  },
  {
    id: 3,
    title: 'Leonardo da Vinci, “The Mona Lisa”',
    image: '../../assets/artwork3.svg',
  },
];

const artworksContent = document.getElementById('artworksContent');

artworks.forEach((artwork) => {
  const singleArtwork = document.createElement('div');
  const img = document.createElement('img');
  const title = document.createElement('p');

  img.src = artwork.image;
  title.innerHTML = artwork.title;

  const div = document.createElement('div');
  div.innerHTML += `<a>Find out more</a> <span><i class='fas fa-chevron-right'></i></span>`;
  div.className = 'button';

  singleArtwork.appendChild(img);
  singleArtwork.appendChild(title);
  singleArtwork.appendChild(div);
  singleArtwork.className = 'artwork';

  artworksContent.appendChild(singleArtwork);
});

<<<<<<< HEAD
//handle link to login on image overlay and link to contact artist if users logged in
=======
>>>>>>> 9046364 (fix hamburger menu in front page, login, sign up and collection page)
const goToLogIn = document.querySelector('.imgOverlay a');
goToLogIn.addEventListener('click', () => {
  document.location('../login/index.html');
});

<<<<<<< HEAD
if (token && user) {
  goToLogIn.textContent = 'Contact Artist';
  //will need to display artist contact?
  goToLogIn.addEventListener('click', () => {
    document.location('../collection/index.html');
  });
}

//display items for front page header
const headerContent = document.querySelector('.headerContent');
const loginText = document.querySelector('.loginText');

const hamburgerMenu = `<div class="hamburger">
<div class="line"></div>
<div class="line"></div>
<div class="line"></div>
</div>
<ul class="nav-links">
<li><a href="../../pages/front/index.html">Home</a></li>
<li><a href="../../pages/profile/index.html">Profile</a></li>
<li><a href="../../pages/collection/index.html">Collections</a></li>
<li><a>Log out</a></li>
</ul>`;

if (token && user) {
  loginText.innerHTML = userData.first_name;
  headerContent.innerHTML += hamburgerMenu;
}

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger &&
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
=======
//toggle menu
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
>>>>>>> 9046364 (fix hamburger menu in front page, login, sign up and collection page)
