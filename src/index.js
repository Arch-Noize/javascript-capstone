import './index.css';
import { getPokemon } from './modules/api.js';
import { getComment , addComment } from './modules/comment.js';

const popup = document.querySelector('#popup');
const closeBtn = document.querySelector("#close-btn");

const commentSection = document.querySelector("#comment-section");
const commentBtn = document.querySelector('#comment-btn');
const newComment = document.querySelector('#add-comment');
const commentForm = document.querySelector('#comment-form');
const comments = document.querySelector("#comment");

const reservationSection = document.querySelector("#reservation-section");
const reservationBtn = document.querySelector("#res-btn");

const displayPoke = async () => {
  for (let i = 1; i <= 10; i += 1) {
    const pokemon = await getPokemon(i);
    pokeData.innerHTML += `<li class="poke">${pokemon.name}</li>`;
  }
};

const displayComment = async () => {
  console.log("hi, this is a comment!")
  const commentList = await getComment("item5");
  if (Object.keys(commentList).length = 0){
    comments.innerHTML = '';
  } else {

    commentList.forEach((item) => {
        comments.innerHTML+= `<li class="comment"> ${item.username}: ${item.comment} (${item.creation_date})`
    })
  };
}

const displayReservations = async () => {
  console.log("hi, this is a reservation!")
}

commentBtn.addEventListener('click', () => {
  displayComment();
  popup.classList.remove("overlay");
});

closeBtn.addEventListener('click', () => {
  popup.classList.add("overlay");
});

// const commentModal = () => {

// }

newComment.addEventListener('click', (e) => {
    e.preventDefault;
    const commentor = document.querySelector('#username').value;
    const comment = document.querySelector('#comment').value;
    if (!commentor || !comment) {
      e.preventDefault();
      console.log("oops!");
    } else {
      addComment("item5", commentor, comment);
      list.innerHTML = '';
      getComment();
      displayComment();
      commentForm.reset();
    }
});

document.addEventListener("DOMContentLoaded", displayComment());
