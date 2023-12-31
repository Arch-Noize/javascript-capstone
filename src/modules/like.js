/* eslint-disable camelcase , eqeqeq */
import { invAPI } from './api.js';

const likeURL = `${invAPI}likes`;

const addLike = async (id) => {
  await fetch(likeURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item_id: id,
    }),
  });
};

const getLikes = async (id) => {
  const res = await fetch(likeURL);
  const data = await res.json();
  const findItem = data.find(({ item_id }) => item_id == id);
  if (findItem) {
    return findItem.likes;
  }
  return 0;
};

export { addLike, getLikes };
