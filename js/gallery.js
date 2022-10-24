import { bigPicModalOpen, updateBigPicData } from './bigPicture.js';
import { createImageDescriptions } from './data.js';

const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

function createUsersPicture(userImgDescription, fragment) {
  const { url, comments, likes } = userImgDescription;
  const userPicture = pictureTemplate.cloneNode(true);
  userPicture.querySelector('.picture__img').src = url;
  userPicture.querySelector('.picture__comments').textContent = comments.length;
  userPicture.querySelector('.picture__likes').textContent = likes;
  fragment.append(userPicture);

  userPicture.onclick = () => {
    bigPicModalOpen();
    updateBigPicData(userImgDescription);
  };
}

export function createUsersPictures(amount = 25) {
  const userImgDescriptions = createImageDescriptions(amount);
  const fragment = document.createDocumentFragment();

  userImgDescriptions.forEach((userImgDescription) => {
    createUsersPicture(userImgDescription, fragment);
  });

  picturesList.append(fragment);
}
