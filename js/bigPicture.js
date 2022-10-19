import { createUsersPictures } from './gallery.js';

const usersImgDescriptions = createUsersPictures(25);

const body = document.querySelector('body');
const userPictures = document.querySelectorAll('.picture');
const bigPic = document.querySelector('.big-picture');
const bigPicImg = document.querySelector('.big-picture__img').querySelector('img');
const bigPicCaption = bigPic.querySelector('.social__caption');
const bigPicSocialComments = bigPic.querySelector('.social__comment-count');
const bigPicCommentsLoader = bigPic.querySelector('.comments-loader');
const bigPicCommentsCount = bigPic.querySelector('.comments-count');
const bigPicLikesCount = bigPic.querySelector('.likes-count');
const bigPicComments = bigPic.querySelector('.social__comments');
const commentTemplate = bigPicComments.querySelector('.social__comment');
const cancelButton = bigPic.querySelector('#picture-cancel');

function closeModalHandler() {
  cancelButton.onclick = () => {
    bigPic.classList.add('hidden');
    body.classList.remove('modal-open');
  };

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      bigPic.classList.add('hidden');
      body.classList.remove('modal-open');
    }
  });
}

export function BigPictureHandler() {
  userPictures.forEach((picture, i) => {
    const { url, description, likes, comments } = usersImgDescriptions[i];
    picture.onclick = function () {
      body.classList.toggle('modal-open');
      bigPic.classList.toggle('hidden');
      bigPicSocialComments.classList.add('hidden');
      bigPicCommentsLoader.classList.add('hidden');

      bigPicImg.src = url;
      bigPicCaption.textContent = description;
      bigPicLikesCount.textContent = likes;

      bigPicCommentsCount.textContent = comments.length;
      bigPicComments.innerHTML = '';

      comments.forEach(({ avatar, message }) => {
        const userComment = commentTemplate.cloneNode(true);
        const userCommentAvatar = userComment.querySelector('img');
        userCommentAvatar.src = avatar;
        const userCommentMessage = userComment.querySelector('p');
        userCommentMessage.textContent = message;
        bigPicComments.append(userComment);
      });
    };
  });
  closeModalHandler();
}
