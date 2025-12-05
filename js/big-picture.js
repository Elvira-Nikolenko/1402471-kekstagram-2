const COMMENTS_BATCH_SIZE = 5;

const bigPictureModal = document.querySelector('.big-picture');
const imgContainer = bigPictureModal.querySelector('.big-picture__img');
const img = imgContainer.querySelector('img');
const likes = bigPictureModal.querySelector('.likes-count');
const showCommentCount = bigPictureModal.querySelector('.social__comment-shown-count');
const commentCount = bigPictureModal.querySelector('.social__comment-total-count');
const commentListContainer = bigPictureModal.querySelector('.social__comments');
const commentTemplate = document.querySelector('.social__comment').cloneNode(true);
const closeBtn = bigPictureModal.querySelector('.big-picture__cancel');
const socialCaption = bigPictureModal.querySelector('.social__caption');
const commentsLoaderBtn = bigPictureModal.querySelector('.comments-loader');
const body = document.querySelector('body');

const state = {
  quantityComment: COMMENTS_BATCH_SIZE,
  visibilityComments: 0,
  endIndexCurrenCommentList: 0,
  commentsList: [],
};

const renderComment = ({ avatar, name, message }) => {
  const newComment = commentTemplate.cloneNode(true);
  const avatarImg = newComment.querySelector('.social__picture');
  const commentContainer = newComment.querySelector('.social__text');
  avatarImg.src = avatar;
  avatarImg.alt = `Аватар ${name}`;
  commentContainer.textContent = message;
  return newComment;
};

const renderCommentList = (comments) => {
  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    fragment.appendChild(renderComment(comment));
  });
  commentListContainer.appendChild(fragment);
};

const getNextCommentsBatch = () => {
  const start = state.endIndexCurrenCommentList;
  const end = start + state.quantityComment;
  return state.commentsList.slice(start, end);
};

const updateCommentsList = () => {
  const newComments = getNextCommentsBatch();
  renderCommentList(newComments);
  state.visibilityComments += newComments.length;
  state.endIndexCurrenCommentList += newComments.length;
  showCommentCount.textContent = state.visibilityComments;
  if (state.visibilityComments >= state.commentsList.length) {
    commentsLoaderBtn.classList.add('hidden');
  } else {
    commentsLoaderBtn.classList.remove('hidden');
  }
};

const handleClickCommentLoaderBtn = (evt) => {
  evt.preventDefault();
  updateCommentsList();
};

const handleClickCloseBtn = (evt) => {
  evt.preventDefault();
  toggleVisibilityBigPictureModal();
};

const handleKeydownEsc = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    toggleVisibilityBigPictureModal();
  }
};

const updateBigPictureData = ({ url, likes: likesCount, comments, description }) => {
  commentListContainer.replaceChildren();
  state.commentsList = comments;
  state.visibilityComments = 0;
  state.endIndexCurrenCommentList = 0;
  updateCommentsList();
  img.src = url;
  likes.textContent = likesCount;
  commentCount.textContent = comments.length;
  socialCaption.textContent = description;
};

const resetBigPictureData = () => {
  state.visibilityComments = 0;
  state.endIndexCurrenCommentList = 0;
  state.commentsList = [];
  img.src = '';
  likes.textContent = '';
  commentCount.textContent = '';
  socialCaption.textContent = '';
  showCommentCount.textContent = '';
};

export function toggleVisibilityBigPictureModal(dataUser) {
  bigPictureModal.classList.toggle('hidden');
  body.classList.toggle('modal-open');
  if (dataUser) {
    updateBigPictureData(dataUser);
    closeBtn.addEventListener('click', handleClickCloseBtn);
    commentsLoaderBtn.addEventListener('click', handleClickCommentLoaderBtn);
    document.addEventListener('keydown', handleKeydownEsc);
  } else {
    resetBigPictureData();
    closeBtn.removeEventListener('click', handleClickCloseBtn);
    commentsLoaderBtn.removeEventListener('click', handleClickCommentLoaderBtn);
    document.removeEventListener('keydown', handleKeydownEsc);
  }
}
