import './index.css';
import { getPokemon } from './modules/api.js';
import { getComment , addComment } from './modules/comment';

const list = document.querySelector('.pokemon-data');
const newComment = document.querySelector('#add-comment');
const commentForm = document.querySelector('.comment-section');
const test = document.querySelector('.test');
const popup = document.querySelector('#popup');
const closeBtn = document.querySelector("#close-btn");

const displayPoke = async () => {
  for (let i = 1; i <= 10; i += 1) {
    const pokemon = await getPokemon(i);
    list.innerHTML += `<li class="score">${pokemon.name}</li>`;
  }
};

test.addEventListener('click', () => {
    popup.classList.remove("overlay");
});

closeBtn.addEventListener('click', () => {
    popup.classList.add("overlay");
});

newComment.addEventListener('click', async (e) => {
    e.preventDefault;
    const commentor = document.querySelector('#username').value;
    const comment = document.querySelector('#comment').value;
    if (!commentor || !comment) {
      e.preventDefault();
    } else {
      await addComment("item3", commentor, comment);
      await getComment("item3")
      commentForm.reset();
    }
});

// document.addEventListener("DOMContentLoaded", getComment("item3"));