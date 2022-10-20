const uploadImageForm = document.querySelector('.img-upload__form');
const hashtagsInput = uploadImageForm.querySelector('.text__hashtags');
const commentInput = uploadImageForm.querySelector('.text__description');
const pristine = new Pristine(uploadImageForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error'
});

const hashtagRegularExp = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

function onFocusIgnoreEscKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
}

function validateHasgtag(value) {
  const hashtags = value.split(' ');
  const uniqueHashtags = [...new Set(hashtags)];
  for (const hashtag of hashtags) {
    if (!hashtagRegularExp.test(hashtag)) {
      return false;
    }
  }
  return hashtags.length <= 5 && hashtags.length === uniqueHashtags.length;
}

function validateComment(value) {
  return value.length <= 140;
}

pristine.addValidator(
  hashtagsInput,
  validateHasgtag,
  'Максимальная длина тега - 20 символов, максимум тегов, разделенных пробелами - 5.'
);

pristine.addValidator(
  commentInput,
  validateComment,
  'Длина комментария не должна превышать 140 символов.'
);

hashtagsInput.onkeydown = onFocusIgnoreEscKeydown;
commentInput.onkeydown = onFocusIgnoreEscKeydown;

uploadImageForm.onsubmit = function (evt) {
  evt.preventDefault();
  pristine.validate();
};
