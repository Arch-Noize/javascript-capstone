/** @jest-environment jsdom */

import reservationCounter from './reservationCounter.js';

describe('Adding or removing items test', () => {
  let list;

  beforeEach(() => {
    document.body.innerHTML = '<ul class="reservation-list"> </ul>';
    list = document.querySelector('.reservation-list');
  });

  test('Counting how many reservations are there', () => {
    list.innerHTML = `
        <ul class="reservation-list"> 
            <li class="reservation">Tester: this is a test reservation! (2023-08-09)</li>
            <li class="reservation">Tester: this is a test reservation! (2023-08-09)</li>
            <li class="reservation">Tester: this is a test reservation! (2023-08-09)</li>
            <li class="reservation">Tester: this is a test reservation! (2023-08-09)</li>
            <li class="reservation">Tester: this is a test reservation! (2023-08-09)</li>
        </ul>`;
    const test = reservationCounter();
    expect(test).toBe(5);
  });

  test('Check if reservations are empty. If they are, print a message', () => {
    const test = reservationCounter();
    expect(test).toBe(0);
  });
});