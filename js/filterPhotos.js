import { createUsersPictures, picturesList } from './gallery.js';
import { getRandomPositiveInt, throttle } from './util.js';

const listHeader = picturesList.children[0];
const uploadButton = picturesList.children[1];
const filter = document.querySelector('.img-filters');
const defaultFilterButton = document.querySelector('#filter-default');
const randomFilterButton = document.querySelector('#filter-random');
const discussedFilterButton = document.querySelector('#filter-discussed');
let currentActiveButton = defaultFilterButton;

function discussedComparer(a, b) {
  if (a.comments.length < b.comments.length) {
    return 1;
  }
  if (a.comments.length > b.comments.length) {
    return -1;
  }
  return 0;
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function addStaticElementsToPicturesList() {
  picturesList.appendChild(listHeader);
  picturesList.appendChild(uploadButton);
}

function removeUserPhotos() {
  removeAllChildNodes(picturesList);
  addStaticElementsToPicturesList();
}

function changeActiveButton(button) {
  currentActiveButton.classList.remove('img-filters__button--active');
  button.classList.add('img-filters__button--active');
  currentActiveButton = button;
}

function getRandomUsersPictures(data) {
  const randomPictures = data.slice();
  while (randomPictures.length > 10) {
    randomPictures.splice(getRandomPositiveInt(0, randomPictures.length), 1);
  }
  return randomPictures;
}

const drawUserPicturesByFilter = (filtredData) => {
  removeUserPhotos();
  createUsersPictures(filtredData);
};

function setDefaultButtonClick(cb, data) {
  defaultFilterButton.onclick = (evt) => {
    changeActiveButton(evt.target);
    cb(data);
  };
}

function setRandomButtonClick(cb, data) {
  randomFilterButton.onclick = (evt) => {
    changeActiveButton(evt.target);
    const randomPictures = getRandomUsersPictures(data);
    cb(randomPictures);
  };
}

function setDiscussedButtonClick(cb, data) {
  discussedFilterButton.onclick = (evt) => {
    changeActiveButton(evt.target);
    cb(data.slice().sort(discussedComparer));
  };
}

function onFilterButtonsClick(data) {
  setDefaultButtonClick(throttle(drawUserPicturesByFilter), data);
  setRandomButtonClick(throttle(drawUserPicturesByFilter), data);
  setDiscussedButtonClick(throttle(drawUserPicturesByFilter), data);
}

function showFilter(data) {
  filter.classList.remove('img-filters--inactive');
  onFilterButtonsClick(data);
}

export { showFilter };
