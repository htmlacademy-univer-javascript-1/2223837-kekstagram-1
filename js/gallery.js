import { bigPicModalOpen, updateBigPicData } from './bigPicture.js';

const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

function createUsersPicture(userImgDescription, fragment) {
  const { url, comments, likes } = userImgDescription;
  const userPicture = pictureTemplate.cloneNode(true);
  userPicture.querySelector('.picture__img').src = url;
  userPicture.querySelector('.picture__comments').textContent = comments.length;
  userPicture.querySelector('.picture__likes').textContent = likes;
  fragment.appendChild(userPicture);

  userPicture.onclick = () => {
    bigPicModalOpen();
    updateBigPicData(userImgDescription);
  };
}

function createUsersPictures(userImgDescriptions) {
  const fragment = document.createDocumentFragment();
  userImgDescriptions.forEach((userImgDescription) => {
    createUsersPicture(userImgDescription, fragment);
  });

  picturesList.appendChild(fragment);
}

export { picturesList, createUsersPictures };
