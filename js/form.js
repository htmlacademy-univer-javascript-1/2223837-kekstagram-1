import { body } from './main.js';
import { validateForm } from './validateForm.js';

const uploadFileButton = document.querySelector('#upload-file');
const uploadCancelButton = document.querySelector('#upload-cancel');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadImageForm = document.querySelector('.img-upload__form');
const hashtagsInput = uploadImageForm.querySelector('.text__hashtags');
const commentInput = uploadImageForm.querySelector('.text__description');

const onUploadOverlayEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    closeUploadOverlay();
  }
};

function openUploadOverlay() {
  body.classList.add('modal-open');
  uploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onUploadOverlayEscKeydown);
  validateForm(uploadImageForm, hashtagsInput, commentInput);
}

function closeUploadOverlay() {
  body.classList.remove('modal-open');
  uploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onUploadOverlayEscKeydown);
  uploadFileButton.value = hashtagsInput.value = commentInput.value = '';
}

uploadFileButton.onclick = openUploadOverlay;
uploadCancelButton.onclick = closeUploadOverlay;
