import './index.css';
import { getPokemon } from './modules/api.js';
import { getReservation, addReservation } from './modules/reservation.js';

const pokeData = document.querySelector('#pokemon-data');
const newReservation = document.querySelector('#add-reservation');
const reservationForm = document.querySelector('.reservation-form');
const reserveBtn = document.querySelector('.reserve-button');
const reservationPopup = document.querySelector('#reservation-popup');
const closeBtn = document.querySelector('#close-btn');
const list = document.querySelector('#reservation-list');

// const displayPoke = async () => {
//   for (let i = 1; i <= 10; i += 1) {
//     const pokemon = await getPokemon(i);
//     pokeData.innerHTML += `<li class="poke">${pokemon.name}</li>`;
//   }
// };

const displayComment = async () => {
  const commentList = await getReservation('item2');
  commentList.forEach((item) => {
    list.innerHTML += `<li class="comment"> ${item.username}: ${item.comment} (${item.creation_date})`;
  });
};

reserveBtn.addEventListener('click', () => {
  reservationPopup.classList.remove('reservation-overlay');
});

closeBtn.addEventListener('click', () => {
  reservationPopup.classList.add('reservation-overlay');
});

newReservation.addEventListener('click', (e) => {
  e.preventDefault;
  const reserverName = document.querySelector('#reservationName').value;
  const startDate = document.querySelector('#startDate').value;
  const endDate = document.querySelector('#endDate').value;
  if (!reserverName || !startDate || !endDate) {
    e.preventDefault();
    console.log('oops!');
  } else {
    addReservation('item2', reserverName, startDate, endDate);
    getReservation('item2');
    reservationForm.reset();
  }
});

document.addEventListener('DOMContentLoaded', displayComment());