
const showDataErrorMessage = () => {
  const dataErrorTemplate = document.querySelector('#data-error');
  const dataErrorElement = dataErrorTemplate.content.querySelector('.data-error').cloneNode(true);
  document.body.append(dataErrorElement);

  setTimeout(() => {
    dataErrorElement.remove();
  }, 5000);
};

const showUploadErrorMessage = () => {
  const errorTemplate = document.querySelector('#error');
  const errorElement = errorTemplate.content.querySelector('.error').cloneNode(true);
  const errorButton = errorElement.querySelector('.error__button');
  document.body.append(errorElement);

  const closeErrorMessage = () => {
    errorElement.remove();
  };

  const handleErrorEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeErrorMessage();
    }
  };

  const handleOutsideClick = (evt) => {
    if (evt.target === errorElement) {
      closeErrorMessage();
    }
  };

  errorButton.addEventListener('click', closeErrorMessage);
  document.addEventListener('keydown', handleErrorEscKeydown);
  errorElement.addEventListener('click', handleOutsideClick);
};

const showUploadSuccessMessage = () => {
  const successTemplate = document.querySelector('#success');
  const successElement = successTemplate.content.querySelector('.success').cloneNode(true);
  const successButton = successElement.querySelector('.success__button');
  document.body.append(successElement);

  const closeSuccessMessage = () => {
    successElement.remove();
  };

  const handleSuccessEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeSuccessMessage();
    }
  };

  const handleOutsideClick = (evt) => {
    if (evt.target === successElement) {
      closeSuccessMessage();
    }
  };

  successButton.addEventListener('click', closeSuccessMessage);
  document.addEventListener('keydown', handleSuccessEscKeydown);
  successElement.addEventListener('click', handleOutsideClick);
};

export { showDataErrorMessage, showUploadErrorMessage, showUploadSuccessMessage };
