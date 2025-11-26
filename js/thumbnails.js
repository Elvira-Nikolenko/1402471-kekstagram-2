import {getImageList, MAX_LENGTH_IMAGES} from './main';
import {toggleVisibilityBigPictureModal} from './big-picture';

const miniature = document.querySelector('#picture').content;


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

const fragment = document.createDocumentFragment();
const imageList = getImageList(MAX_LENGTH_IMAGES);

const renderListMiniature = (list) => {
  list.forEach((image) => {
    fragment.appendChild(renderMiniature(image));
  });

  const pictureContainer = document.querySelector('.pictures');
  if (pictureContainer) {
    pictureContainer.appendChild(fragment);
  }
};

renderListMiniature(imageList);
