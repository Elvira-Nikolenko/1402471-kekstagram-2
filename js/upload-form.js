import { resetScale } from './scale.js';
import { resetEffect } from './effects.js';
import { sendData } from './api.js';
import { showUploadSuccessMessage, showUploadErrorMessage } from './utils.js';
import { initValidation } from './validation.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const uploadFile = document.querySelector('#upload-file');
const submitButton = uploadForm.querySelector('.img-upload__submit');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

const pristine = initValidation(uploadForm, hashtagsInput, commentInput);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

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
  pristine.reset();
  resetScale();
  resetEffect();
};

function handleKeydownEsc(evt) {
  if (evt.key === 'Escape' && !document.activeElement.closest('.text__hashtags, .text__description')) {
    evt.preventDefault();
    closeForm();
  }
}

export function handleClickCancel() {
  closeForm();
}

export const handleChangeFile = () => {
  openForm();
};

uploadFile.addEventListener('change', handleChangeFile);

const handleSubmit = async (evt) => {
  try {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (!isValid) {
      return;
    }
    blockSubmitButton();
    const formData = new FormData(evt.target);
    await sendData(formData);
    unblockSubmitButton();
    closeForm();
    showUploadSuccessMessage();
  } catch {
    unblockSubmitButton();
    showUploadErrorMessage();
  }
};

uploadForm.addEventListener('submit', handleSubmit);
