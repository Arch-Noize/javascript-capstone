import { invAPI } from './api.js';

/* API Functions */

const commentURL = `${invAPI}comments?item_id=`;

const getComment = async (id) => {
  const res = await fetch(commentURL + id);
  const data = await res.json();
  return data;
};

const addComment = async (id, user, desc) => {
  const res = await fetch(commentURL + id, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Accept: 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({ item_id: id, username: user, comment: desc }),
  });
  const data = await res.json();
  return data;
};

/* Display Functions */

const newComment = document.querySelector('#add-comment');
const commentForm = document.querySelector('#comment-form');
const commentList = document.querySelector("#comment-list");

const displayComment = async () => {
  const commentData = await getComment("item5");
  if (Object.keys(commentData).length = 0){
    commentList.innerHTML = '';
  } else {
    commentData.forEach((item) => {
        commentList.innerHTML+= `<li class="comment"> ${item.username}: ${item.comment} (${item.creation_date})`
    })
  };
}

newComment.addEventListener('click', (e) => {
  e.preventDefault;
  const commentor = document.querySelector('#username').value;
  const comment = document.querySelector('#comment').value;
  if (!commentor || !comment) {
    e.preventDefault();
    console.log("oops!");
  } else {
    addComment("item5", commentor, comment);
    commentSection.innerHTML = '';
    getComment();
    displayComment();
    commentForm.reset();
  }
});

export { getComment, addComment , displayComment };