import { resetScale } from './scale.js';
import { resetEffect } from './effects.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const uploadFile = document.querySelector('#upload-file');

export const openForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', handleKeydownEsc);
  uploadCancel.addEventListener('click', handleClickCancel);
};

const closeForm = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', handleKeydownEsc);
  uploadCancel.removeEventListener('click', handleClickCancel);
  uploadForm.reset();
};

function handleKeydownEsc(evt) {
  if (evt.key === 'Escape' && !document.activeElement.closest('.text__hashtags, .text__description')) {
    evt.preventDefault();
    closeForm();
  }
}

export function handleClickCancel() {
  closeForm();
  resetScale();
  resetEffect();
}

export const handleChangeFile = () => {
  openForm();
};

uploadFile.addEventListener('change', handleChangeFile);
