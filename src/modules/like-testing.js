import { invAPI } from "./api.js";

const likeURL = invAPI + 'likes';

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
    localStorage.setItem('likesList', JSON.stringify(data));
    const findItem = await data.find((item) => item.item_id === id);
    if (findItem) {
      return findItem.likes;
    }
    return 0;
};

export {addLike , getLikes}


