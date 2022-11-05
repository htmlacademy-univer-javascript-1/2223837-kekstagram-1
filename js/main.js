import { getData } from './api.js';
import { BigPictureHandler } from './bigPicture.js';
import { uploadFormHandler } from './form.js';
import { createUsersPictures } from './gallery.js';

export const body = document.querySelector('body');

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

getData(createUsersPictures, showError);
BigPictureHandler();
uploadFormHandler();
