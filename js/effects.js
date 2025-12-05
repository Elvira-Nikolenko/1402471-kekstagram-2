import { MAX_HASHTAG_LENGTH, MAX_HASHTAGS, MAX_COMMENT_LENGTH } from './constants.js';

const effectsList = document.querySelector('.effects__list');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const imgPreview = document.querySelector('.img-upload__preview img');
const uploadForm = document.querySelector('.img-upload__form');

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

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

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

const validateHashtags = (value) => {
  if (!value) {
    return true;
  }
  const hashtags = value.trim().split(/\s+/);
  if (hashtags.length > MAX_HASHTAGS) {
    return false;
  }
  const uniqueLowercase = new Set();
  for (const tag of hashtags) {
    if (!tag.startsWith('#')) {
      return false;
    }
    if (tag.length === 1) {
      return false;
    }
    if (tag.length > MAX_HASHTAG_LENGTH) {
      return false;
    }
    if (!/^#[a-zа-яё0-9]+$/i.test(tag)) {
      return false;
    }
    const lowercaseTag = tag.toLowerCase();
    if (uniqueLowercase.has(lowercaseTag)) {
      return false;
    }
    uniqueLowercase.add(lowercaseTag);
  }
  return true;
};

const getHashtagErrorMessage = (value) => {
  if (!value) {
    return true;
  }
  const hashtags = value.trim().split(/\s+/);
  if (hashtags.length > MAX_HASHTAGS) {
    return 'Можно добавить не более 5 хэштегов';
  }
  const uniqueLowercase = new Set();
  for (const tag of hashtags) {
    if (!tag.startsWith('#')) {
      return 'Хэштег должен начинаться с #';
    }
    if (tag.length === 1) {
      return 'Хэштег не может быть из одной #';
    }
    if (tag.length > MAX_HASHTAG_LENGTH) {
      return 'Хэштег должен содержать не более 20 символов';
    }
    if (!/^#[a-zа-яё0-9]+$/i.test(tag)) {
      return 'В хэштеге должны быть только буквы и цифры';
    }
    const lowercaseTag = tag.toLowerCase();
    if (uniqueLowercase.has(lowercaseTag)) {
      return 'Хэштег дублируется';
    }
    uniqueLowercase.add(lowercaseTag);
  }
  return true;
};

pristine.addValidator(
  hashtagsInput,
  validateHashtags,
  getHashtagErrorMessage
);

pristine.addValidator(
  commentInput,
  (value) => !value || value.length <= MAX_COMMENT_LENGTH,
  `Длина комментария не должна превышать ${MAX_COMMENT_LENGTH} символов.`
);

// Блокировка отправки формы при ошибках валидации
uploadForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

// Инициализация
effectsList.addEventListener('change', (evt) => {
  currentEffect = evt.target.value;
  updateEffect();
});

updateEffect();
