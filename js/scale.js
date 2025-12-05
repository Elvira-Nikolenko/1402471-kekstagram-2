import { SCALE_STEP, SCALE_MIN, SCALE_MAX, SCALE_DEFAULT } from './constants.js';

const scaleControlValue = document.querySelector('.scale__control--value');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const imgPreview = document.querySelector('.img-upload__preview img');
let currentScale = SCALE_DEFAULT;

export const updateScale = () => {
  imgPreview.style.transform = `scale(${currentScale / 100})`;
  scaleControlValue.value = `${currentScale}%`;
};

export const resetScale = () => {
  currentScale = SCALE_DEFAULT;
  updateScale();
};

scaleControlSmaller.addEventListener('click', () => {
  currentScale = Math.max(SCALE_MIN, currentScale - SCALE_STEP);
  updateScale();
});

scaleControlBigger.addEventListener('click', () => {
  currentScale = Math.min(SCALE_MAX, currentScale + SCALE_STEP);
  updateScale();
});

updateScale();
