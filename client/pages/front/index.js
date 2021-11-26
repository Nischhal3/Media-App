'use strict';

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
