/** @jest-environment jsdom */

import { commentCounter } from './commentCounter.js';

describe('Adding or removing items test', () => {
  let list;

  beforeEach(() => {
    document.body.innerHTML = '<ul class="comment-list"> </ul>';
    list = document.querySelector('.comment-list');
  });

  test('Counting how many comments are there', () => {
    list.innerHTML = `
        <ul class="comment-list"> 
            <li class="comment">Tester: this is a test comment! (2023-08-09)</li>
            <li class="comment">Tester: this is a test comment! (2023-08-09)</li>
            <li class="comment">Tester: this is a test comment! (2023-08-09)</li>
            <li class="comment">Tester: this is a test comment! (2023-08-09)</li>
            <li class="comment">Tester: this is a test comment! (2023-08-09)</li>
        </ul>`;
    const test = commentCounter();
    expect(test).toBe(5);
  });

  test('Check if comments are empty. If they are, print a message', () => {
    const test = commentCounter();
    expect(test).toBe(0);
  });
});