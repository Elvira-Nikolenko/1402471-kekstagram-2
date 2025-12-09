import { MAX_HASHTAG_LENGTH, MAX_HASHTAGS, MAX_COMMENT_LENGTH } from './constants.js';

const pristineConfig = {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
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
    return 'Максимум 5 хэштегов';
  }
  const uniqueLowercase = new Set();
  for (const tag of hashtags) {
    if (!tag.startsWith('#')) {
      return 'Хэштег должен начинаться с #';
    }
    if (tag.length === 1) {
      return 'Хэштег не может состоять только из #';
    }
    if (tag.length > MAX_HASHTAG_LENGTH) {
      return 'Максимальная длина хэштега — 20 символов';
    }
    if (!/^#[a-zа-яё0-9]+$/i.test(tag)) {
      return 'Хэштег содержит недопустимые символы';
    }
    const lowercaseTag = tag.toLowerCase();
    if (uniqueLowercase.has(lowercaseTag)) {
      return 'Хэштеги не должны повторяться';
    }
    uniqueLowercase.add(lowercaseTag);
  }
  return true;
};

const validateComment = (value) => !value || value.length <= MAX_COMMENT_LENGTH;

const getCommentErrorMessage = (value) => {
  if (value && value.length > MAX_COMMENT_LENGTH) {
    return 'Максимальная длина комментария — 140 символов';
  }
  return true;
};

const initValidation = (formElement, hashtagsElement, commentElement) => {
  const pristine = new Pristine(formElement, pristineConfig);
  pristine.addValidator(
    hashtagsElement,
    validateHashtags,
    getHashtagErrorMessage
  );
  pristine.addValidator(
    commentElement,
    validateComment,
    getCommentErrorMessage
  );
  return pristine;
};

export { initValidation };
