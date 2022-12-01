import { body } from './main.js';
import { onUploadOverlayEscKeydown, closeUploadOverlay } from './form.js';

function showError(errorMessage) {
  const errorTemplate = document.querySelector('#error').content.querySelector('section');
  const error = errorTemplate.cloneNode(true);
  error.querySelector('h2').textContent = errorMessage;
  error.querySelector('button').remove();
  body.append(error);
  setTimeout(() => {
    error.remove();
  }, 5000);
}

const onMessageEscKeydown = (evt, messageBlock, abortController) => {
  if (evt.key === 'Escape') {
    removeMessageBlock(messageBlock, abortController);
  }
};

const onMessageClickOutside = (evt, messageBlock, isError, abortController) => {
  if (!evt.target.closest(`.${isError ? 'error' : 'success'}__inner`)) {
    removeMessageBlock(messageBlock, abortController);
  }
};

function removeMessageBlock(messageBlock, abortController) {
  abortController.abort();
  document.addEventListener('keydown', onUploadOverlayEscKeydown);
  body.removeChild(messageBlock);
}

function createMessageBlock(isError) {
  document.removeEventListener('keydown', onUploadOverlayEscKeydown);
  const messageTemplate = document.querySelector(`#${isError ? 'error' : 'success'}`).content.querySelector('section');
  const message = messageTemplate.cloneNode(true);
  const button = message.querySelector('button');
  body.append(message);
  const abortController = new AbortController();
  button.onclick = () => removeMessageBlock(message, abortController);
  message.onclick = (evt) => onMessageClickOutside(evt, message, isError, abortController);
  document.addEventListener('keydown', (evt) => onMessageEscKeydown(evt, message, abortController), { signal: abortController.signal });
}

function createPostMessage() {
  const messageTemplate = document.querySelector('#messages').content.querySelector('div');
  const message = messageTemplate.cloneNode(true);
  body.append(message);
  return message;
}

function removePostMessage(message) {
  body.removeChild(message);
}

function successPost() {
  createMessageBlock(false);
  closeUploadOverlay();
}

function failPost() {
  createMessageBlock(true);
}

export { showError, successPost, failPost, createPostMessage, removePostMessage };
