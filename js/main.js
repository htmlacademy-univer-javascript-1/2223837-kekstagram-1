import { BigPictureHandler } from './bigPicture.js';
import { createUsersPictures } from './gallery.js';
import './form.js';
import './validateForm.js';

export const body = document.querySelector('body');

BigPictureHandler(createUsersPictures(25));
