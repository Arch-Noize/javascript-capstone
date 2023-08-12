/* eslint-disable no-await-in-loop , no-unused-vars */

import './index.css';
import { getPokemon } from './modules/api.js';
import { addLike, getLikes } from './modules/like.js';
import {
  getComment, addComment, displayComment,
} from './modules/comment.js';
import { getReservation, addReservation, displayReservation } from './modules/reservation.js';
import pokecounter from './modules/pokecounter.js';

const popup = document.querySelector('#popup');
const commentSection = document.querySelector('#comment-section');
const reservationSection = document.querySelector('#reservation-section');
const reservationBtn = document.querySelector('#res-btn');

const createItemElement = (itemData) => {
  const itemDiv = document.createElement('div');
  itemDiv.classList.add('like');
  itemDiv.setAttribute('data-id', itemData.id);

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
  commentsButton.classList.add('comment-btn');
  commentsButton.textContent = 'Comments';
  itemDiv.appendChild(commentsButton);

  const reservationsButton = document.createElement('button');
  reservationsButton.classList.add('res-btn');
  reservationsButton.textContent = 'Reservations';
  itemDiv.appendChild(reservationsButton);

  return itemDiv;
};

const printPokeInfo = async (id) => {
  const pokestats = document.querySelector('#pokestats');
  let pokemon = [];
  for (let i = 1; i <= 9; i += 1) {
    pokemon = await getPokemon(i);
  }
  const stats = pokemon[id - 1];
  const statsData = {
    pokeID: stats.id,
    title: stats.name,
    image: stats.sprites.front_default,
    weight: stats.weight,
    height: stats.height,
  };
  pokestats.innerHTML = `
    <h2> 
        ${statsData.title} 
        <i id="close-btn" class="fa fa-times"></i>
    </h2>
    <img src="${statsData.image}" alt="${statsData.title}">
    <h3>
        Stats
    </h3>
    <ul>
        <li>ID: #${statsData.pokeID}</li>
        <li>Weight: ${statsData.weight} hectograms</li>
        <li>Height: ${statsData.height} decimetres</li>
    </ul>
    `;
};

const populateItemsContainer = async () => {
  const itemsContainer = document.querySelector('.itemsContainer');
  const itemCounter = document.querySelector('#pokecounter');
  let pokemon = [];
  let counter;

  for (let i = 1; i <= 9; i += 1) {
    pokemon = await getPokemon(i);
  }
  pokemon.forEach(async (item) => {
    const itemLikes = await getLikes(item.id);
    const itemData = {
      id: item.id, title: item.name, image: item.sprites.front_default, likes: `${itemLikes}`,
    };
    const itemElement = createItemElement(itemData);
    itemsContainer.appendChild(itemElement);
  });

  setTimeout(() => {
    counter = pokecounter();
    itemCounter.textContent += ` (${counter})`;
  }, 4000);
};

document.addEventListener('DOMContentLoaded', async () => {
  const itemsContainer = document.querySelector('.itemsContainer');

  const handleLikeButtonClick = async (event) => {
    if (event.target.classList.contains('likeButton')) {
      const itemDiv = event.target.closest('.like');
      const itemID = itemDiv.getAttribute('data-id');

      addLike(itemID);
      const totalLikes = await getLikes(itemID);

      const likeCountElement = itemDiv.querySelector('.likeCount');
      likeCountElement.textContent = `Likes: ${totalLikes}`;
    }
  };

  const handleCommentsButtonClick = async (event) => {
    if (event.target.classList.contains('comment-btn')) {
      const card = document.querySelector('.card');
      card.style.display = 'flex';
      const itemDiv = event.target.parentElement;
      const itemID = itemDiv.getAttribute('data-id');
      printPokeInfo(itemID);
      const comments = await getComment(itemID);

      popup.classList.toggle('overlay');
      displayComment(itemID);
      commentSection.style.display = 'flex';

      const closeBtn = document.querySelector('#close-btn');
      closeBtn.addEventListener('click', () => {
        popup.classList.toggle('overlay');
        card.style.display = 'none';
        commentSection.style.display = 'none';
        reservationSection.style.display = 'none';
      });

      const newComment = document.querySelector('#add-comment');
      const commentForm = document.querySelector('#comment-form');
      newComment.addEventListener('click', (e) => {
        const commentor = document.querySelector('#username').value;
        const comment = document.querySelector('#comment').value;
        if (!commentor || !comment) {
          e.preventDefault();
        } else {
          addComment(itemID, commentor, comment);
          getComment(itemID);
          setTimeout(() => {
            displayComment(itemID);
          }, 500);
          commentForm.reset();
        }
      });
    }
  };

  const handleResButtonClick = async (event) => {
    if (event.target.classList.contains('res-btn')) {
      const card = document.querySelector('.card');
      card.style.display = 'flex';
      const itemDiv = event.target.parentElement;
      const itemID = itemDiv.getAttribute('data-id');
      printPokeInfo(itemID);
      const reservations = await getReservation(itemID);
      popup.classList.toggle('overlay');
      displayReservation(itemID);
      reservationSection.style.display = 'flex';

      const closeBtn = document.querySelector('#close-btn');
      closeBtn.addEventListener('click', () => {
        popup.classList.toggle('overlay');
        card.style.display = 'none';
        commentSection.style.display = 'none';
        reservationSection.style.display = 'none';
      });

      const newReservation = document.querySelector('#add-reservation');
      const reservationForm = document.querySelector('.reservation-form');
      newReservation.addEventListener('click', (e) => {
        const reserverName = document.querySelector('#reservationName').value;
        const startDate = document.querySelector('#startDate').value;
        const endDate = document.querySelector('#endDate').value;
        getReservation('item2');
        if (!reserverName || !startDate || !endDate) {
          e.preventDefault();
        } else {
          addReservation(itemID, reserverName, startDate, endDate);
          getReservation(itemID);
          setTimeout(() => {
            displayReservation(itemID);
          }, 500);
          reservationForm.reset();
        }
      });
    }
  };

  const handleCloseButton = async (event) => {
    if (event.target.classList.contains('close-btn')) {
      popup.classList.add('overlay');
      commentSection.style.display = 'none';
      reservationSection.style.display = 'none';
    }
  };

  populateItemsContainer();

  itemsContainer.addEventListener('click', handleLikeButtonClick);
  itemsContainer.addEventListener('click', handleCommentsButtonClick);
  itemsContainer.addEventListener('click', handleResButtonClick);
  itemsContainer.addEventListener('click', handleCloseButton);
});

reservationBtn.addEventListener('click', () => {
  popup.classList.remove('overlay');
  reservationSection.style.display = 'flex';
});
