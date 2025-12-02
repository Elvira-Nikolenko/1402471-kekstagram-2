const COMMENTS_BATCH_SIZE = 5;

const bigPictureModal = document.querySelector('.big-picture');
const imgContainer = bigPictureModal.querySelector('.big-picture__img');
const img = imgContainer.querySelector('img');
const likes = bigPictureModal.querySelector('.likes-count');
const showCommentCount = bigPictureModal.querySelector('.social__comment-shown-count');
const commentCount = bigPictureModal.querySelector('.social__comment-total-count');
const commentListContainer = bigPictureModal.querySelector('.social__comments');
const commentTemplate = bigPictureModal.querySelector('.social__comment').cloneNode(true);
const closeBtn = bigPictureModal.querySelector('.big-picture__cancel');
const socialCaption = bigPictureModal.querySelector('.social__caption');
const commentsLoaderBtn = bigPictureModal.querySelector('.comments-loader');
const body = document.querySelector('body');

const state = {
  quantityComment: COMMENTS_BATCH_SIZE,
  visibilityComments: 0,
  currentCommentList: [],
  endIndexCurrenCommentList: 0,
  commentsList: [],
};

const renderComment = (comment) => {
  const newComment = commentTemplate.cloneNode(true);
  const avatarImg = newComment.querySelector('.social__picture');
  const commentContainer = newComment.querySelector('.social__text');
  avatarImg.src = comment.avatar;
  avatarImg.alt = `Аватар ${comment.name}`;
  commentContainer.textContent = comment.message;
  return newComment;
};

const renderCommentList = (comments) => {
  comments.forEach((comment) => {
    commentListContainer.appendChild(renderComment(comment));
  });
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
};

const handleClickCommentLoaderBtn = (evt) => {
  evt.preventDefault();
  if (state.visibilityComments < state.commentsList?.length) {
    updateCommentsList();
  }
};

const handleClickCloseBtn = (evt) => {
  evt.preventDefault();
  toggleVisibilityBigPictureModal();
};

const updateBigPictureData = (dataUser) => {
  commentListContainer.replaceChildren();
  state.commentsList = dataUser.comments;
  updateCommentsList();
  img.src = dataUser.url;
  likes.textContent = dataUser.likes;
  commentCount.textContent = state.commentsList?.length.toString();
  socialCaption.textContent = dataUser.description;
};

const resetBigPictureData = () => {
  state.visibilityComments = 0;
  state.quantityComment = COMMENTS_BATCH_SIZE;
  state.commentsList = [];
  state.currentCommentList = [];
  state.endIndexCurrenCommentList = 0;
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
  } else {
    resetBigPictureData();
    closeBtn.removeEventListener('click', handleClickCloseBtn);
    commentsLoaderBtn.removeEventListener('click', handleClickCommentLoaderBtn);
  }
}
