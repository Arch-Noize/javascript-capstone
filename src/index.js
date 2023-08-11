/* eslint-disable no-await-in-loop */

import './index.css';
import { getPokemon } from './modules/api.js';
import { addLike, getLikes } from './modules/like.js';
import { getComment , addComment , displayComment , newComment, commentCounter } from './modules/comment.js';

const popup = document.querySelector('#popup');
const commentSection = document.querySelector("#comment-section");
const reservationSection = document.querySelector("#reservation-section");
const reservationBtn = document.querySelector("#res-btn");

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
    const pokestats = document.querySelector("#pokestats");
    let pokemon = [];
    for (let i = 1; i <= 15; i += 1) {
      pokemon = await getPokemon(i);
    }
    const stats = pokemon[id-1];
    console.log(stats);
    const statsData = {pokeID: stats.id, title: stats.name, image: stats.sprites.front_default, weight: stats.weight, height: stats.height}
    pokestats.innerHTML = `
    <h2> 
        ${statsData.title} 
        <i class="fa fa-times close-btn"></i>
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
    `
}

const closeBtn = document.querySelector(".close-btn");

const populateItemsContainer = async () => {
  const itemsContainer = document.querySelector('.itemsContainer');
  let pokemon = [];

  for (let i = 1; i <= 15; i += 1) {
    pokemon = await getPokemon(i);
  }
  pokemon.forEach(async (item, index = 1) => {
    const itemLikes = await getLikes(index);
    const itemData = {
      id: item.id , title: item.name, image: item.sprites.front_default, likes: `${itemLikes}`,
    };
    const itemElement = createItemElement(itemData);
    console.log(itemElement)
    itemsContainer.appendChild(itemElement);
  });
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
        const itemDiv = event.target.parentElement;
        const itemID = itemDiv.getAttribute('data-id');
        printPokeInfo(itemID);
        const comments = await getComment(itemID);
        commentCounter();
        popup.classList.remove("overlay");
        displayComment(itemID);
        commentSection.style.display = "flex";
    } 
  };

  const handleCloseButton = async (event) => {
    if (event.target.classList.contains('close-btn')) {
      popup.classList.add("overlay");
      console.log("hi");
      commentSection.style.display = "none";
      reservationSection.style.display = "none";
    }
  }

  itemsContainer.addEventListener('click', handleLikeButtonClick);
  itemsContainer.addEventListener('click', handleCommentsButtonClick);
  itemsContainer.addEventListener('click', handleCloseButton);

  populateItemsContainer();
});

// commentBtn.addEventListener('click', () => {
//   popup.classList.remove("overlay");
//   displayComment();
//   commentSection.style.display = "flex";
// });

reservationBtn.addEventListener('click', () => {
  popup.classList.remove("overlay");
  reservationSection.style.display = "flex";
})

closeBtn.addEventListener('click', () => {
  popup.classList.add("overlay");
  console.log("hi");
  commentSection.style.display = "none";
  reservationSection.style.display = "none";
});