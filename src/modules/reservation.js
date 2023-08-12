import { invAPI } from './api.js';

/* API Functions */

const reservationURL = `${invAPI}reservations?item_id=`;

const getReservation = async (id) => {
  const res = await fetch(reservationURL + id);
  const data = await res.json();
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

const resList = document.querySelector('.reservation-list');
const totalReservations = document.querySelector('#res-counter');

const displayReservation = async (id) => {
  const reservationData = await getReservation(id);
  resList.innerHTML = '';
  if (reservationData.error) {
    totalReservations.textContent = 'Reservations (0):';
  } else {
    totalReservations.textContent = `Reservations (${reservationData.length}):`;
    reservationData.forEach((item) => {
      resList.innerHTML += `<li class="reservation"> ${item.username}: ${item.date_start} ${item.date_end}`;
    });
  }
};

export { getReservation, addReservation, displayReservation };