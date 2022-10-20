import { body } from './main.js';

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

const onBigPicModalEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    bigPicModalClose();
  }
};

function bigPicModalOpen() {
  body.classList.add('modal-open');
  bigPic.classList.remove('hidden');
  bigPicSocialComments.classList.add('hidden');
  bigPicCommentsLoader.classList.add('hidden');
  document.addEventListener('keydown', onBigPicModalEscKeydown);
}

function bigPicModalClose() {
  body.classList.remove('modal-open');
  bigPic.classList.add('hidden');
  bigPicSocialComments.classList.remove('hidden');
  bigPicCommentsLoader.classList.remove('hidden');
  document.removeEventListener('keydown', onBigPicModalEscKeydown);
}

function updateBigPicComments(comments) {
  comments.forEach(({ avatar, message }) => {
    const userComment = commentTemplate.cloneNode(true);
    const userCommentAvatar = userComment.querySelector('img');
    userCommentAvatar.src = avatar;
    const userCommentMessage = userComment.querySelector('p');
    userCommentMessage.textContent = message;
    bigPicComments.append(userComment);
  });
}

function updateBigPicData(url, description, likes, comments) {
  bigPicImg.src = url;
  bigPicCaption.textContent = description;
  bigPicLikesCount.textContent = likes;
  bigPicCommentsCount.textContent = comments.length;
  bigPicComments.innerHTML = '';
  updateBigPicComments(comments);
}

export function BigPictureHandler(usersImgDescriptions) {
  const userPictures = document.querySelectorAll('.picture');
  userPictures.forEach((picture, i) => {
    const { url, description, likes, comments } = usersImgDescriptions[i];
    picture.onclick = function () {
      bigPicModalOpen();
      updateBigPicData(url, description, likes, comments);
      cancelButton.onclick = bigPicModalClose;
    };
  });
}
