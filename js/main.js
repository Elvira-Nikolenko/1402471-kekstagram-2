const MIN_COUNT_ID = 1;
const MAX_COUNT_ID = 25;
const MAX_LENGTH_IMAGES = 25;
const MOCK_DESCRIPTION = 'Картинка';
const MIN_COUNT_COMMENTS = 0;
const MAX_COUNT_COMMENTS = 30;
const MIN_AVATAR_COUNT = 1;
const MAX_AVATAR_COUNT = 6;
const MIN_COUNT_LIKES = 15;
const MAX_COUNT_LIKES = 200;
const MOCK_COMMENTS_LIST = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const MOCK_NAMES = ['Петр', 'Иван', 'Порфирий'];

function getRandomNumber(min, max) {
  return Math.floor(Math.floor(Math.random() * (max - min + 1) + min));
}

function getMockId(listId = [], min, max) {
  const randomNumber = getRandomNumber(min, max);
  if (!listId.includes(randomNumber)) {
    return randomNumber;
  }
  return getMockId(listId, min, max);
}

function getRandomAvatar(min = MIN_AVATAR_COUNT, max = MAX_AVATAR_COUNT){
  return `img/avatar-${getRandomNumber(min, max)}.svg`;
}


function getRandomItemByIndex(list, minIndex = 0) {
  const randomIndex = getRandomNumber(minIndex, list.length - 1);
  return list[randomIndex];
}

function getMockComment(commentsList = []) {
  const listId = commentsList.map((comment) => comment?.id);
  const id = getMockId(listId, MIN_COUNT_COMMENTS, MAX_COUNT_COMMENTS);

  return {
    id,
    avatar: getRandomAvatar(),
    message: getRandomItemByIndex(MOCK_COMMENTS_LIST),
    name: getRandomItemByIndex(MOCK_NAMES),
  };
}


function getMockImage(imageList = []) {
  const listId = imageList.map((image) => image?.id);
  const id = getMockId(listId, MIN_COUNT_ID, MAX_COUNT_ID);
  const commentsLength = getRandomNumber(MIN_COUNT_COMMENTS, MAX_COUNT_COMMENTS);

  return {
    id,
    url: `photos/${id}.jpg`,
    description: `${MOCK_DESCRIPTION} ${id}`,
    likes: getRandomNumber(MIN_COUNT_LIKES, MAX_COUNT_LIKES),
    comments: getCommentsList(commentsLength)
  };
}

function getCommentsList(maxLength) {
  const commentsList = [];

  for (let i = 0; i < maxLength; i++) {
    const comment = getMockComment(commentsList);
    commentsList.push(comment);
  }

  return commentsList;
}

function getImageList(maxLength = MAX_LENGTH_IMAGES) {
  const imagesList = [];

  for (let i = 0; i < maxLength; i++) {
    const image = getMockImage(imagesList);
    imagesList.push(image);
  }

  return imagesList;
}


const MIN_COUNT_ID = 1;
const MAX_COUNT_ID = 25;
const MAX_LENGTH_IMAGES = 25;
const MOCK_DESCRIPTION = 'Картинка';
const MIN_COUNT_COMMENTS = 0;
const MAX_COUNT_COMMENTS = 30;
const MIN_AVATAR_COUNT = 1;
const MAX_AVATAR_COUNT = 6;
const MIN_COUNT_LIKES = 15;
const MAX_COUNT_LIKES = 200;
const MOCK_COMMENTS_LIST = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const MOCK_NAMES = ['Петр', 'Иван', 'Порфирий'];

function getRandomNumber(min, max) {
  return Math.floor(Math.floor(Math.random() * (max - min + 1) + min));
}

function getMockId(listId = [], min, max) {
  const randomNumber = getRandomNumber(min, max);
  if (!listId.includes(randomNumber)) {
    return randomNumber;
  }
  return getMockId(listId, min, max);
}

function getRandomAvatar(min = MIN_AVATAR_COUNT, max = MAX_AVATAR_COUNT){
  return `img/avatar-${getRandomNumber(min, max)}.svg`;
}


function getRandomItemByIndex(list, minIndex = 0) {
  const randomIndex = getRandomNumber(minIndex, list.length - 1);
  return list[randomIndex];
}

function getMockComment(commentsList = []) {
  const listId = commentsList.map((comment) => comment?.id);
  const id = getMockId(listId, MIN_COUNT_COMMENTS, MAX_COUNT_COMMENTS);

  return {
    id,
    avatar: getRandomAvatar(),
    message: getRandomItemByIndex(MOCK_COMMENTS_LIST),
    name: getRandomItemByIndex(MOCK_NAMES),
  };
}


function getMockImage(imageList = []) {
  const listId = imageList.map((image) => image?.id);
  const id = getMockId(listId, MIN_COUNT_ID, MAX_COUNT_ID);
  const commentsLength = getRandomNumber(MIN_COUNT_COMMENTS, MAX_COUNT_COMMENTS);

  return {
    id,
    url: `photos/${id}.jpg`,
    description: `${MOCK_DESCRIPTION} ${id}`,
    likes: getRandomNumber(MIN_COUNT_LIKES, MAX_COUNT_LIKES),
    comments: getCommentsList(commentsLength)
  };
}

function getCommentsList(maxLength) {
  const commentsList = [];

  for (let i = 0; i < maxLength; i++) {
    const comment = getMockComment(commentsList);
    commentsList.push(comment);
  }

  return commentsList;
}

function getImageList(maxLength = MAX_LENGTH_IMAGES) {
  const imagesList = [];

  for (let i = 0; i < maxLength; i++) {
    const image = getMockImage(imagesList);
    imagesList.push(image);
  }

  return imagesList;
}
