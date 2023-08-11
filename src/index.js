import './index.css';
import { getPokemon } from './modules/api.js';
import { getComment , addComment } from './modules/comment.js';

const popup = document.querySelector('#popup');
const closeBtn = document.querySelector("#close-btn");

const commentSection = document.querySelector("#comment-section");
const commentBtn = document.querySelector('#comment-btn');
const newComment = document.querySelector('#add-comment');
const commentForm = document.querySelector('#comment-form');

const reservationSection = document.querySelector("#reservation-section");
const reservationBtn = document.querySelector("#res-btn");

const displayPoke = async () => {
  for (let i = 1; i <= 10; i += 1) {
    const pokemon = await getPokemon(i);
    pokeData.innerHTML += `<li class="poke">${pokemon.name}</li>`;
  }
};

/*
Make a "section" target and dynamically display comments or reservation depending of 
what was pressed

createComment?
commentSection.innerHTML = `
    <h3>
    Comments!
    </h3>
    <ul id="comment" class="list">

    </ul>
    <form id="comment-form">
    <input type="text" id="username" placeholder="Please leave a name" autocomplete="off">
    <input type="text" id="comment" placeholder="Please add a comment" autocomplete="off">
    </form>
    <button id="add-comment">Comment</button>
  `

  const title = document.createElement("h3")
  const ul = document.createElement("ul")
  const form = document.createElement("form")
  
  const handlePopup = (e) => {
    if (e.target.id.contains("comment-btn")){
        console.log("hi, comments!")
    } else if (e.target.id.contains("res-btn")){
        console.log("hi, reservation!")
    }
}

*/

const displayComment = async () => {
  console.log("hi, this is a comment!");
  const comments = document.querySelector("#comment");
  const commentList = await getComment("item3");
  commentList.forEach((item) => {
    comments.innerHTML+= `<li class="comment"> ${item.username}: ${item.comment} (${item.creation_date})`
  });
}

const displayReservations = async () => {
  console.log("hi, this is a reservation!")
}

commentBtn.addEventListener('click', async () => {
  popup.classList.remove("overlay");
  commentSection.innerHTML = `
    <h3>
    Comments!
    </h3>
    <ul id="comment" class="comment-list">

    </ul>
    <form id="comment-form">
        <input type="text" id="username" placeholder="Please leave a name" autocomplete="off">
        <input type="text" id="comment" placeholder="Please add a comment" autocomplete="off">
    </form>
    <button id="add-comment">Comment</button>`
  displayComment();
});

reservationBtn.addEventListener('click', () => {
  popup.classList.remove("overlay");
  commentSection.innerHTML = "Hello, reservations!"
})

closeBtn.addEventListener('click', () => {
  popup.classList.add("overlay");
});

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

// document.addEventListener("DOMContentLoaded", displayComment());
