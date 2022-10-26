import { body } from './main.js';
import { validateForm } from './validateForm.js';

const form = document.querySelector('.img-upload__form');
const uploadImgButton = document.querySelector('#upload-file');
const closeFormButton = form.querySelector('#upload-cancel');
const scaleSmallerButton = form.querySelector('.scale__control--smaller');
const scaleBiggerButton = form.querySelector('.scale__control--bigger');
const scaleControl = form.querySelector('.scale__control--value');
const preview = form.querySelector('.img-upload__preview');
const formOverlay = form.querySelector('.img-upload__overlay');
const hashtagsInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');
const slider = form.querySelector('.effect-level__slider');
const effectLevel = form.querySelector('.effect-level__value');
const effectsData = {
  'chrome': { filter: 'grayscale( )', options: { range: { min: 0, max: 1, }, start: 0, step: 0.1, connect: 'lower' } },
  'sepia': { filter: 'sepia( )', options: { range: { min: 0, max: 1, }, start: 0, step: 0.1, connect: 'lower' } },
  'marvin': { filter: 'invert( %)', options: { range: { min: 0, max: 100, }, start: 0, step: 1, connect: 'lower' } },
  'phobos': { filter: 'blur( px)', options: { range: { min: 0, max: 3, }, start: 0, step: 0.1, connect: 'lower' } },
  'heat': { filter: 'brightness( )', options: { range: { min: 1, max: 3, }, start: 1, step: 0.1, connect: 'lower' } },
};

noUiSlider.create(slider, effectsData['chrome'].options);

let previousEffectClass = 'effects__preview--none';
function changePreviewEffectClass(newEffectName) {
  preview.classList.remove(previousEffectClass);
  const newEffectClass = `effects__preview--${newEffectName}`;
  preview.classList.add(newEffectClass);
  previousEffectClass = newEffectClass;
}

const onUploadOverlayEffectChange = (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    const newEffectName = evt.target.value;
    changePreviewEffectClass(newEffectName);

    if (newEffectName !== 'none') {
      if (slider.classList.contains('hidden')) {
        slider.classList.remove('hidden');
      }
      slider.noUiSlider.updateOptions(effectsData[newEffectName].options);

      slider.noUiSlider.on('update', () => {
        effectLevel.value = slider.noUiSlider.get();
        const filter = effectsData[newEffectName].filter.replace(' ', effectLevel.value);
        preview.style.filter = filter;
      });
    }
    else {
      preview.style.filter = 'none';
      slider.classList.toggle('hidden');
    }
  }
};

function resizeImgPreview(limit) {
  const k = limit === '100%' ? 1 : -1;
  if (scaleControl.value !== limit) {
    const scaleControlValueNumber = Number(scaleControl.value.replace('%', '')) + 25 * k;
    scaleControl.value = `${scaleControlValueNumber}%`;
    preview.style.transform = `scale(${scaleControlValueNumber / 100})`;
  }
}

const onUploadOverlayEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    closeUploadOverlay();
  }
};

function openUploadOverlay() {
  body.classList.add('modal-open');
  formOverlay.classList.remove('hidden');
  slider.classList.add('hidden');
  document.addEventListener('keydown', onUploadOverlayEscKeydown);
  form.addEventListener('change', onUploadOverlayEffectChange);
  scaleSmallerButton.onclick = () => resizeImgPreview('25%');
  scaleBiggerButton.onclick = () => resizeImgPreview('100%');
  validateForm(form, hashtagsInput, commentInput);
  closeFormButton.onclick = closeUploadOverlay;
}

function closeUploadOverlay() {
  body.classList.remove('modal-open');
  formOverlay.classList.add('hidden');
  form.reset();
  preview.style.filter = 'none';
  document.removeEventListener('keydown', onUploadOverlayEscKeydown);
  form.removeEventListener('change', onUploadOverlayEffectChange);
}

export function uploadFormHandler() {
  uploadImgButton.onclick = openUploadOverlay;
}

