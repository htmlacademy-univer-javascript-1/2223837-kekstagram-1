import { BigPictureHandler } from './bigPicture.js';
import { createUsersPictures } from './gallery.js';
import './form.js';

export const body = document.querySelector('body');

BigPictureHandler(createUsersPictures(25));
