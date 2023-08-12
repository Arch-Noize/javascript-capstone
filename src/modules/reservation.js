import { invAPI } from './api.js';

/* API Functions */ 

const reservationURL = `${invAPI}reservations?item_id=`;

const getReservation = async (id) => {
  const res = await fetch(reservationURL + id);
  const data = await res.json();
  console.log(data);
  return data;
};

const addReservation = async (id, name, dateStart, dateEnd) => {
  const res = await fetch(reservationURL + id, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({
      item_id: id, username: name, date_start: dateStart, date_end: dateEnd,
    }),
  });
  const data = await res.json();
  return data;
};

/* Display functions */

const newReservation = document.querySelector('#add-reservation');
const reservationForm = document.querySelector('.reservation-form');
const reserveBtn = document.querySelector('.reserve-button');
const reservationPopup = document.querySelector('#reservation-popup');
const closeBtn = document.querySelector('#close-btn');
const list = document.querySelector('#reservation-list');

const displayReservation = async () => {
  const reservationList = await getReservation('item2');
  reservationList.forEach((item) => {
    list.innerHTML += `<li class="reservationName"> ${item.username}: ${item.date_start} ${item.date_end}`;
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
  getReservation('item2');
  if (!reserverName || !startDate || !endDate) {
    e.preventDefault();
    console.log('oops!');
  } else {
    addReservation('item2', reserverName, startDate, endDate);
    //reservation-popup.innerHTML = '';
    reservationForm.reset();
  }
});


export { getReservation, addReservation };