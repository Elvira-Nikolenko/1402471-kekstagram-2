const effectsList = document.querySelector('.effects__list');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const imgPreview = document.querySelector('.img-upload__preview img');
let currentEffect = 'none';

const EFFECTS = {
  none: {
    style: '',
    min: 0,
    max: 0,
    step: 0,
    unit: '',
    defaultValue: 0,
  },
  chrome: {
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
    defaultValue: 1,
  },
  sepia: {
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
    defaultValue: 1,
  },
  marvin: {
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
    defaultValue: 100,
  },
  phobos: {
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
    defaultValue: 3,
  },
  heat: {
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
    defaultValue: 3,
  },
};

export const updateEffect = () => {
  imgPreview.style.filter = '';
  effectLevelSlider.noUiSlider?.destroy();
  effectLevelContainer.classList.add('hidden');
  effectLevelValue.value = '';
  if (currentEffect === 'none') {
    return;
  }
  const { style, min, max, step, unit, defaultValue } = EFFECTS[currentEffect];
  effectLevelContainer.classList.remove('hidden');
  noUiSlider.create(effectLevelSlider, {
    range: { min, max },
    start: defaultValue,
    step,
    connect: 'lower',
  });
  effectLevelSlider.noUiSlider.on('update', () => {
    const value = effectLevelSlider.noUiSlider.get();
    effectLevelValue.value = value;
    imgPreview.style.filter = `${style}(${value}${unit})`;
  });
  effectLevelValue.value = defaultValue;
  imgPreview.style.filter = `${style}(${defaultValue}${unit})`;
};

export const resetEffect = () => {
  currentEffect = 'none';
  updateEffect();
};

effectsList.addEventListener('change', (evt) => {
  currentEffect = evt.target.value;
  updateEffect();
});

updateEffect();
