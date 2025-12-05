import { getData } from './api.js';
import { toggleVisibilityBigPictureModal } from './big-picture.js';
import { showDataErrorMessage } from './utils.js';

const miniature = document.querySelector('#picture').content;
const pictureContainer = document.querySelector('.pictures');

const handleClickMiniature = (evt, dataUser) => {
  evt.preventDefault();
  toggleVisibilityBigPictureModal(dataUser);
};

const renderMiniature = (dataUser) => {
  const newMiniature = miniature.cloneNode(true);
  const imagePath = newMiniature.querySelector('.picture__img');
  const likes = newMiniature.querySelector('.picture__likes');
  const comments = newMiniature.querySelector('.picture__comments');
  const containerNewMiniature = newMiniature.querySelector('.picture');
  containerNewMiniature.addEventListener('click', (evt) => handleClickMiniature(evt, dataUser));
  imagePath.src = dataUser.url;
  likes.textContent = dataUser.likes;
  comments.textContent = dataUser.comments.length;
  return newMiniature;
};

const renderListMiniature = (list) => {
  const fragment = document.createDocumentFragment();
  list.forEach((image) => {
    fragment.appendChild(renderMiniature(image));
  });
  pictureContainer.appendChild(fragment);
};

try {
  const data = await getData();
  renderListMiniature(data);
} catch (error) {
  showDataErrorMessage(error);
}
