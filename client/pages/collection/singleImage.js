'use strict';

import logOut from '../logout.js';
const url = 'http://localhost:3000'; // change url when uploading to server

const token = sessionStorage.getItem('token');
const user = sessionStorage.getItem('user');
const userData = user && JSON.parse(user);

const userName = document.querySelector('.userName span');
const logOutButton = document.querySelector('#logout');
logOutButton.addEventListener('click', () => {
  logOut();
});

if (token && user) {
  userName.textContent = userData.first_name;
  userName.addEventListener('click', () => {
    location.href = '../profile/index.html';
  });
  logOutButton.classList.remove('disappear');
}

if (!token || !user) {
  userName.addEventListener('click', () => {
    location.href = '../login/index.html';
  });
}

const appName = document.getElementById('app-name');
appName.addEventListener('click', () => {
  location.href = '../front/index.html';
});

const getQParam = (param) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
};
const imageId = getQParam('id');

const getImage = async (id) => {
  try {
    const fetchOptions = {
      method: 'GET',
    };
    const response = await fetch(url + '/image/collection/image/' + id);
    const image = await response.json();
    createPath(image.collection_id, image.collection_title, image.image_title);
    createImageCard(image);
  } catch (e) {
    console.log(e.message);
  }
};
getImage(imageId);

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
  const dateFormated = new Date(image.image_date);
  imageDate.innerHTML = dateFormated.toDateString().slice(4, 15);
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
  if (token && user) {
    e.preventDefault();
    const data = serializeJson(updateImageForm);
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
  } else {
    alert('You have to log in to do this!');
  }
});

//Deleting image
const deleteImage = document.querySelector('#delete');
deleteImage.addEventListener('click', async () => {
  if (token && user) {
    if (confirm('Are you sure you want to delete this image?')) {
      // Save it!
      const fetchOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      };
      const response = await fetch(
        url + `/image/user/${imageId}`,
        fetchOptions
      );
      const json = await response.json();
      alert(json.message);
      //Redirection to collection page after deleting image
      location.href = `singleCollection.html?id=${collectionID}`;
    }
  }
});

//Get all the likes from the beginning
const likeIcon = document.querySelector('#likeIcon');
const likeCount = document.querySelector('#likeCount');

async function getAllLikes() {
  try {
    const response = await fetch(url + '/like/image/' + imageId);
    const allLikes = await response.json();
    updateHeartCount(allLikes.allLikes);
  } catch (error) {
    alert(error.message);
  }
}

// Get like of the user
async function getLikeOfUser() {
  try {
    const fetchOptions = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/like/user/' + imageId, fetchOptions);
    const like = await response.json();
    updateHeartIcon(like.like);
  } catch (error) {
    alert(error.message);
  }
}

getAllLikes();
if (user && token) {
  getLikeOfUser();
}

//Toggle like and display number of likes
likeIcon.addEventListener('click', async (event) => {
  event.preventDefault();
  if (!token || !user) {
    alert('You have to log in to like this picture');
    return false;
  }
  const fetchOptions =
    likeIcon.className === 'far fa-heart'
      ? {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
          },
        }
      : {
          method: 'DELETE',
          headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
          },
        };

  try {
    const response = await fetch(url + '/like/user/' + imageId, fetchOptions);

    if (response.status === 200) {
      getAllLikes();
      getLikeOfUser();
    }
  } catch (error) {
    alert(error.message);
  }
});

//update UI of heart Icon
function updateHeartIcon(userLike) {
  if (userLike > 0) {
    likeIcon.className = 'fas fa-heart';
    likeIcon.style.color = 'red';
  } else {
    likeIcon.className = 'far fa-heart';
    likeIcon.style.color = 'black';
  }
}

function updateHeartCount(allLikes) {
  likeCount.textContent = allLikes;
}

///handle normal user can only view comments, not add comments/edit/delete
const comments = document.getElementById('comment');
const edit = document.getElementById('edit');
const deleteButton = document.getElementById('delete');
if (!user || !token) {
  comments.style.display = 'none';
  edit.style.display = 'none';
  deleteButton.style.display = 'none';
}

//get all comments in the begining
async function getAllComments() {
  try {
    const response = await fetch(url + '/comments/image/' + imageId);
    const allComments = await response.json();
    displayComments(allComments);
  } catch (error) {
    alert(error.message);
  }
}

getAllComments();

//Display comment
const displayComments = (allComments) => {
  const allCommentsContainer = document.querySelector('.allComments');
  allCommentsContainer.innerHTML = '';

  allComments.map((cmt) => {
    const commentContainer = document.createElement('div');
    const commentContent = document.createElement('div');
    const name = document.createElement('p');
    const comment = document.createElement('p');
    const buttonDelete = document.createElement('button');
    const trashIcon = '<i class="fas fa-trash"></i>';

    name.innerHTML = cmt.first_name + ' ' + cmt.last_name;
    comment.innerHTML = cmt.comments;
    buttonDelete.innerHTML += trashIcon;

    commentContent.appendChild(name);
    commentContent.appendChild(comment);
    commentContainer.appendChild(commentContent);
    if (
      token &&
      user &&
      (cmt.user_id === userData.user_id || userData.role === 0)
    ) {
      commentContainer.appendChild(buttonDelete);
      buttonDelete.addEventListener('click', (event) => {
        if (confirm('Are you sure you want to delete this comment?')) {
          deleteComment(cmt.id, event);
        }
      });
    }

    name.className = 'commentUser';
    comment.className = 'comment';
    commentContent.className = 'commentContent';
    commentContainer.className = 'commentBox';

    allCommentsContainer.appendChild(commentContainer);
  });
};

//Adding comments
const input = document.querySelector('#comment-input');
comments.addEventListener('keypress', async (e) => {
  if (e.key === 'Enter') {
    //converting input comment to json object
    const data = {
      comment: input.value,
    };

    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(
      url + `/image/comment/${imageId}`,
      fetchOptions
    );
    const allComments = await response.json();

    if (allComments.length >= 0) {
      displayComments(allComments);
      input.value = '';
    } else {
      alert(allComments.message);
    }
  }
});

//Delete comment
const deleteComment = async (commentId, event) => {
  event.preventDefault();
  const fetchOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  };
  const response = await fetch(
    url + `/image/comment/${commentId}`,
    fetchOptions
  );
  const json = await response.json();
  if (json.message === 'Comment has been deleted') {
    window.location.reload();
  }
};
