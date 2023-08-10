import { invAPI } from './api.js';

const reservationURL = `${invAPI}comments?item_id=`;

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

const addReservation = async (id, user, desc) => {
  const res = await fetch(reservationURL + id, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({ item_id: id, username: user, comment: desc }),
  });
  const data = await res.json();
  return data.result;
};

export { getReservation, addReservation };