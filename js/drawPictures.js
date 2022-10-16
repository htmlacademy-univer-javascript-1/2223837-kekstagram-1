import { createImageDescriptions } from './data.js';

export function createUsersPictures(amount) {
  const userImgDescriptions = createImageDescriptions(amount);
  const picturesList = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content;
  const pictureFragment = document.createDocumentFragment();

  for (let i = 0; i < amount; i++) {
    const userPicture = pictureTemplate.cloneNode(true);
    const image = userPicture.querySelector('.picture__img');
    const commentsCount = userPicture.querySelector('.picture__comments');
    const likesCount = userPicture.querySelector('.picture__likes');
    image.src = userImgDescriptions[i].url;
    commentsCount.textContent = userImgDescriptions[i].comments.length;
    likesCount.textContent = userImgDescriptions[i].likes;
    pictureFragment.append(userPicture);
  }
  picturesList.append(pictureFragment);
  return userImgDescriptions;
}
