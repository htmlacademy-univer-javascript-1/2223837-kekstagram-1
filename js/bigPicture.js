import { body } from './main.js';

const bigPic = document.querySelector('.big-picture');
const bigPicImg = document.querySelector('.big-picture__img').querySelector('img');
const bigPicCaption = bigPic.querySelector('.social__caption');
const bigPicCurrentCommentsCount = bigPic.querySelector('.current-comments-count');
const commentsLoadButton = bigPic.querySelector('.comments-loader');
const bigPicCommentsCount = bigPic.querySelector('.comments-count');
const bigPicLikesCount = bigPic.querySelector('.likes-count');
const bigPicComments = bigPic.querySelector('.social__comments');
const commentTemplate = bigPicComments.querySelector('.social__comment');
const cancelButton = bigPic.querySelector('#picture-cancel');
let currentCommentsCount = 0;

const onBigPicModalEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    bigPicModalClose();
  }
};

function bigPicModalOpen() {
  body.classList.add('modal-open');
  bigPic.classList.remove('hidden');
  document.addEventListener('keydown', onBigPicModalEscKeydown);
}

function bigPicModalClose() {
  body.classList.remove('modal-open');
  bigPic.classList.add('hidden');
  document.removeEventListener('keydown', onBigPicModalEscKeydown);
  currentCommentsCount = 0;
}


const loadComments = (comments) => {
  comments.slice(currentCommentsCount, currentCommentsCount + 5).forEach(({ avatar, message }) => {
    const userComment = commentTemplate.cloneNode(true);
    const userCommentAvatar = userComment.querySelector('img');
    userCommentAvatar.src = avatar;
    const userCommentMessage = userComment.querySelector('p');
    userCommentMessage.textContent = message;
    bigPicComments.append(userComment);
    currentCommentsCount++;
  });
  bigPicCurrentCommentsCount.textContent = currentCommentsCount;
};

function updateBigPicData(url, description, likes, comments) {
  bigPicImg.src = url;
  bigPicCaption.textContent = description;
  bigPicLikesCount.textContent = likes;
  bigPicCommentsCount.textContent = comments.length;
  bigPicComments.innerHTML = '';
  loadComments(comments);
  commentsLoadButton.onclick = () => loadComments(comments);
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
