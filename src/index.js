/* eslint-disable no-await-in-loop */

import './index.css';
import { getPokemon } from './modules/api.js';
import { addLike, getLikes } from './modules/like.js';
import { getComment , addComment , displayComment , newComment } from './modules/comment.js';

const createItemElement = (itemData) => {
  const itemDiv = document.createElement('div');
  itemDiv.classList.add('like');
  itemDiv.setAttribute('data-like', itemData.id);

  const itemTitle = document.createElement('h3');
  itemTitle.textContent = itemData.title;
  itemDiv.appendChild(itemTitle);

  const itemImg = document.createElement('img');
  itemImg.src = itemData.image;
  itemDiv.appendChild(itemImg);

  const likeButton = document.createElement('button');
  likeButton.classList.add('likeButton');
  likeButton.innerHTML = '&#x1F44D;';
  itemDiv.appendChild(likeButton);

  const likeCount = document.createElement('p');
  likeCount.classList.add('likeCount');
  likeCount.textContent = `Likes: ${itemData.likes}`;
  itemDiv.appendChild(likeCount);

  const commentsButton = document.createElement('button');
  commentsButton.classList.add('commentsButton');
  commentsButton.textContent = 'Comments';
  itemDiv.appendChild(commentsButton);

  const reservationsButton = document.createElement('button');
  reservationsButton.classList.add('reservationsButton');
  reservationsButton.textContent = 'Reservations';
  itemDiv.appendChild(reservationsButton);

  return itemDiv;
};

const populateItemsContainer = async () => {
  const itemsContainer = document.querySelector('.itemsContainer');
  let pokemon = [];

  for (let i = 1; i <= 15; i += 1) {
    pokemon = await getPokemon(i);
  }
  pokemon.forEach(async (item, index) => {
    const itemLikes = await getLikes(index);
    const itemData = {
      id: `${index + 1}`, title: item.name, image: item.sprites.front_default, likes: `${itemLikes}`,
    };
    const itemElement = createItemElement(itemData);
    itemsContainer.appendChild(itemElement);
  });
};

document.addEventListener('DOMContentLoaded', async () => {
  const itemsContainer = document.querySelector('.itemsContainer');

  const handleLikeButtonClick = async (event) => {
    if (event.target.classList.contains('likeButton')) {
      const itemDiv = event.target.closest('.like');
      const itemID = itemDiv.getAttribute('data-like');

      addLike(itemID);
      const totalLikes = await getLikes(itemID);

      const likeCountElement = itemDiv.querySelector('.likeCount');
      likeCountElement.textContent = `Likes: ${totalLikes}`;
    }
  };

  //   const handleCommentsButtonClick = async (event) => {
  //     if (event.target.classList.contains('commentsButton')) {
  //       const itemDiv = event.target.closest('.like');
  //       const itemID = itemDiv.getAttribute('data-like');
  //     }
  //   };

  //   const handleReservationsButtonClick = async (event) => {
  //     if (event.target.classList.contains('reservationsButton')) {
  //       const itemDiv = event.target.closest('.like');
  //       const itemID = itemDiv.getAttribute('data-like');
  //     }
  //   };

  itemsContainer.addEventListener('click', handleLikeButtonClick);
  //   itemsContainer.addEventListener('click', handleCommentsButtonClick);
  //   itemsContainer.addEventListener('click', handleReservationsButtonClick);

  populateItemsContainer();
});

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

