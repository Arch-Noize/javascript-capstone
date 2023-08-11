import './index.css';
import { getPokemon } from './modules/api.js';
import { getComment , addComment } from './modules/comment.js';

const popup = document.querySelector('#popup');
const closeBtn = document.querySelector("#close-btn");

const commentSection = document.querySelector("#comment-section");
const commentBtn = document.querySelector('#comment-btn');
const newComment = document.querySelector('#add-comment');
const commentForm = document.querySelector('#comment-form');
const comments = document.querySelector("#comment-list");

const reservationSection = document.querySelector("#reservation-section");
const reservationBtn = document.querySelector("#res-btn");

const displayPoke = async () => {
  for (let i = 1; i <= 10; i += 1) {
    const pokemon = await getPokemon(i);
    pokeData.innerHTML += `<li class="poke">${pokemon.name}</li>`;
  }
};

const displayComment = async () => {
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
  popup.classList.remove("overlay");
  displayComment();
  commentSection.style.display = "flex";
});

reservationBtn.addEventListener('click', () => {
  popup.classList.remove("overlay");
  reservationSection.style.display = "flex";
})

closeBtn.addEventListener('click', () => {
  popup.classList.add("overlay");
  commentSection.style.display = "none";
  reservationSection.style.display = "none";
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
      commentSection.innerHTML = '';
      getComment();
      displayComment();
      commentForm.reset();
    }
});
