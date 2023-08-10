import { invAPI } from './api.js';

const reservationURL = `${invAPI}reservations?item_id=`;

const getReservation = async (id) => {
  const res = await fetch(reservationURL + id);
  const data = await res.json();
  console.log(data.result);
  return data.result;
};

// const displayReservation = async () => {
//   const reservationList = await getReservation();
//   reservationList.forEach((item) => {

//   })
// }

const addReservation = async (id, name, dateStart, dateEnd) => {
  const res = await fetch(reservationURL + id, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({
      item_id: id, username: name, date_start: dateStart, date_end: dateEnd,
    }),
  });
  const data = await res.json();
  return data.result;
};

export { getReservation, addReservation };