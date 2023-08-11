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
const totalComments = document.querySelector("#comment-counter");

const displayComment = async (id) => {
  const commentData = await getComment(id);
  totalComments.textContent = `Comments (${commentData.length}):`
  commentList.innerHTML = ''
  if (commentData.error){
    console.log("No comments!");
  } else {
    commentData.forEach((item) => {
        commentList.innerHTML+= `<li class="comment"> ${item.username}: ${item.comment} (${item.creation_date})`
    })
  };
}

const commentCounter = () => {
  const counter = document.querySelectorAll('.comment');
  if (counter.length === undefined) {
    totalComments.textContent = "(0)"
  } else {
    totalComments.textContent = `(${counter.length})`;
  }
};

newComment.addEventListener('click', (e) => {
  e.preventDefault;
  const commentor = document.querySelector('#username').value;
  const comment = document.querySelector('#comment').value;
  if (!commentor || !comment) {
    e.preventDefault();
    console.log("oops!");
  } else {
    addComment(2, commentor, comment);
    displayComment(2);
    getComment(2);
    commentForm.reset();
  }
});

export { getComment, addComment , displayComment , commentCounter};