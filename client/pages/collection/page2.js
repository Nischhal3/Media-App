'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server

const getQParam = (param) => {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	return urlParams.get(param);
};

const getCollection = async (id) => {
	const response = await fetch(url + '/collection/' + id);
	const collection = await response.json();
	console.log(collection);
	createCollectionCard(collection);
};

getCollection(getQParam('id'));
console.log(getQParam('id'));

const collectionGet = document.getElementById('singleCollection');
const createCollectionCard = (item) => {
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

	collectionGet.appendChild(singleCollection);
};