import { createUsersPictures } from './drawPictures.js';

const usersImgDescriptions = createUsersPictures(25);

const body = document.querySelector('body');
const userPictures = document.querySelectorAll('.picture');
const bigPic = document.querySelector('.big-picture');
const bigPicImg = document.querySelector('.big-picture__img').querySelector('img');
const bigPicaption = bigPic.querySelector('.social__caption');
const bigPicSocialComments = bigPic.querySelector('.social__comment-count');
const bigPicCommentsLoader = bigPic.querySelector('.comments-loader');
const bigPictureCommentsCount = bigPic.querySelector('.comments-count');
const comments = bigPic.querySelector('.social__comments');
const commentTemplate = comments.querySelector('.social__comment');
const bigPictureCancelButton = bigPic.querySelector('#picture-cancel');

export function BigPictureHandler() {
  for (let i = 0; i < userPictures.length; i++) {
    const picture = userPictures[i];
    picture.onclick = function () {
      body.classList.toggle('modal-open');
      bigPic.classList.toggle('hidden');
      bigPicSocialComments.classList.add('hidden');
      bigPicCommentsLoader.classList.add('hidden');

      bigPicImg.src = picture.querySelector('img').src;
      bigPicaption.textContent = usersImgDescriptions[i].description;
      bigPic.querySelector('.likes-count').textContent = usersImgDescriptions[i].likes;
      const imgComments = usersImgDescriptions[i].comments;
      bigPictureCommentsCount.textContent = imgComments.length;
      comments.innerHTML = '';
      for (const comment of imgComments) {
        const userComment = commentTemplate.cloneNode(true);
        const userCommentData = userComment.querySelector('img');
        userCommentData.src = comment.avatar;
        userCommentData.alt = comment.name;
        const userCommentText = userComment.querySelector('p');
        userCommentText.textContent = comment.message;
        comments.append(userComment);
      }
    };
  }

  bigPictureCancelButton.onclick = () => {
    bigPic.classList.toggle('hidden');
    body.classList.toggle('modal-open');
  };

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      bigPic.classList.toggle('hidden');
      body.classList.toggle('modal-open');
    }
  });
}
