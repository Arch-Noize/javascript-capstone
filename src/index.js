import './index.css';
import { getComment , addComment , displayComment , newComment } from './modules/comment.js';

const popup = document.querySelector('#popup');
const closeBtn = document.querySelector("#close-btn");
const commentSection = document.querySelector("#comment-section");
const commentBtn = document.querySelector('#comment-btn');
const reservationSection = document.querySelector("#reservation-section");
const reservationBtn = document.querySelector("#res-btn");

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


