'use strict';

const url = 'http://localhost:3000';

const token = sessionStorage.getItem('token');
const user = sessionStorage.getItem('user');
const userData = user && JSON.parse(user);

if (!token && !user) {
  console.log('here');
  location.href = '../login/index.html';
}

//Tabs selection
const tabs = document.querySelectorAll('[ data-tab-target]');
const tabContents = document.querySelectorAll('[data-tab-content]');

tabs.forEach(tab =>{
  tab.addEventListener('click', ()=>{
    const target = document.querySelector(tab.dataset.tabTarget);
    tabContents.forEach(tabContent =>{
      tabContent.classList.remove('active');
    })
    tabs.forEach(tab =>{
      tab.classList.remove('active');
    })
    tab.classList.add('active');
    target.classList.add('active');
  })
})

const getImageByUser = async (id) => {
  try {
    const fetchOptions = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/image/user/' + id, fetchOptions);
    const images = await response.json();
    console.log(images);
    createImageCard(images);
  } catch (e) {
    console.log(e.message);
  }
};

getImageByUser(userData.user_id);

const imageList = document.getElementById('artwork');
const createImageCard = (images) => {
  images.forEach((item) => {
    console.log('item', item.image_file);
    const singleImage = document.createElement('div');
    const img = document.createElement('img');
    let title = document.createElement('p');
    img.src = url + '/thumbnails/' + item.image_file;
    img.alt = item.image_title;
    singleImage.appendChild(img);

    imageList.appendChild(singleImage);

    //redirect to single image page with id
    singleImage.addEventListener('click', () => {
      location.href = `singleImage.html?id=${item.image_id}`;
    }); 
  });
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

//open add post overlay
const add = document.querySelector('.add');
const addPostOverlay = document.querySelector('.overlay');
const closeOverlay = document.querySelector('.overlay i');

add.addEventListener('click', () => {
  addPostOverlay.classList.add('overlay-open');
});

closeOverlay.addEventListener('click', () => {
  addPostOverlay.classList.remove('overlay-open');
});

//button edit profile
const updateProfileOverlay = document.querySelector('.updateProfileOverlay');
const editProfile = document.querySelector('.info-header button');
const editProfilePhone = document.querySelector('.info-header i');
const closeUpdateOverlay = document.querySelector('.updateProfileOverlay i');
editProfile.addEventListener('click', () => {
  updateProfileOverlay.classList.add('overlay-open');
});

closeUpdateOverlay.addEventListener('click', () => {
  updateProfileOverlay.classList.remove('overlay-open');
});

editProfilePhone.addEventListener('click', () => {
  updateProfileOverlay.classList.add('overlay-open');
});

//get user and display user
(async function getUser() {
  try {
    const fetchOptions = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    const response = await fetch(
      url + `/user/${userData.user_id}`,
      fetchOptions
    );
    const user = await response.json();
    const userName = document.querySelector('.info-header p');
    const userIntro = document.querySelector('.user-intro');
    const imageName = document.getElementById('name');
    userName.textContent = user.first_name + ' ' + user.last_name;
    imageName.textContent =
      user.first_name.charAt(0) + user.last_name.charAt(0);
    if (user.user_description !== null)
      userIntro.textContent = user.user_description;
  } catch (e) {
    console.log(e.message);
  }
})();

//update user
const updateInfoForm = document.querySelector('#updateInfoForm');

updateInfoForm.addEventListener('submit', async () => {
  const data = serializeJson(updateInfoForm);
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url + `/user/${userData.user_id}`, fetchOptions);
  const json = await response.json();

  if (json.length > 0) {
    let errors = '';
    json.forEach((err) => (errors += `${err.msg}\n`));
    alert(errors);
    return false;
  }
});

//get all collections to display in the select option(not yet ready, wait for collection route ready)
// const select = document.querySelector('.collection-select');

// (async function getAllCollections() {
//   try {
//     const fetchOptions = {
//       method: 'GET',
//     };
//     const response = await fetch(url + '/collection', fetchOptions);
//     const collections = await response.json();
//     console.log(collections);
//     // select.appendChild(
//     //   collections.map((collection) => {
//     //     return (
//     //       <option
//     //         key={collection.collection_id}
//     //         value={collection.collection_title}
//     //       />
//     //     );
//     //   })
//     // );
//   } catch (e) {
//     alert(e.message);
//   }
// })();
