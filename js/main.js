import { BigPictureHandler } from './bigPicture.js';
import { uploadFormHandler } from './form.js';
import { createUsersPictures } from './gallery.js';

export const body = document.querySelector('body');
createUsersPictures();
BigPictureHandler();
uploadFormHandler();
