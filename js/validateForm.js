const hashtagRegularExp = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

function onFocusIgnoreEscKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
}

function validateHasgtag(value) {
  if (!value.length) {
    return true;
  }
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

function validateForm(form, hashtagsInput, commentInput) {
  const pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper__error'
  });

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

  return pristine.validate();
}
export { validateForm, onFocusIgnoreEscKeydown };

