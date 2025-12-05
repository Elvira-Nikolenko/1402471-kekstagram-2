const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const getData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/data`);

    if (!response.ok) {
      throw new Error();
    }

    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
};

const sendData = async (body) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      body,
    });

    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  } catch(error) {
    throw new Error(error);
  }
};

export { getData, sendData };
