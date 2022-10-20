import { body } from './main.js';
import './validateForm.js';

const uploadFileButton = document.querySelector('#upload-file');
const uploadCancelButton = document.querySelector('#upload-cancel');
const uploadOverlay = document.querySelector('.img-upload__overlay');

const onUploadOverlayEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    closeUploadOverlay();
  }
};

function openUploadOverlay() {
  body.classList.add('modal-open');
  uploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onUploadOverlayEscKeydown);
}

function closeUploadOverlay() {
  body.classList.remove('modal-open');
  uploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onUploadOverlayEscKeydown);
  uploadFileButton.value = '';

}

uploadFileButton.onclick = openUploadOverlay;
uploadCancelButton.onclick = closeUploadOverlay;
