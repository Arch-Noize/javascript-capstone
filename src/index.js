import './index.css';
import { fetchItemsFromAPI, fetchLikesFromAPI, updateLikesOnAPI } from './modules/api.js';
import { updateLikes, updateAllLikes } from './modules/like.js';

const invAPI = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/app/';
const pokeAPI = 'https://pokeapi.co/api/v2/pokemon';
const projectID = 'dSv5DdTGl6SZHdXDAlEr';

const likes = {};

async function populateItemsContainer() {
    const itemsContainer = document.querySelector(".itemsContainer");

    try {
        const response = await fetch(`${pokeAPI}?limit=10`);
        const data = await response.json();

        data.results.forEach((pokemon, index) => {
            const itemData = { id: `${index + 1}`, title: pokemon.name, likes: 0 };
            const itemElement = createItemElement(itemData);
            itemsContainer.appendChild(itemElement);
            likes[itemData.id] = itemData.likes;
        });
    } catch (error) {
        console.error('Error fetching Pokemon data from API:', error);
    }
}

function createItemElement(itemData) {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("like");
    itemDiv.setAttribute("data-like", itemData.id);

    const itemTitle = document.createElement("h3");
    itemTitle.textContent = itemData.title;
    itemDiv.appendChild(itemTitle);

    const likeButton = document.createElement("button");
    likeButton.classList.add("likeButton");
    likeButton.innerHTML = "&#x1F44D;";
    itemDiv.appendChild(likeButton);

    const likeCount = document.createElement("p");
    likeCount.classList.add("likeCount");
    likeCount.textContent = `Likes: ${itemData.likes}`;
    itemDiv.appendChild(likeCount);

    const commentsButton = document.createElement("button");
    commentsButton.classList.add("commentsButton");
    commentsButton.textContent = "Comments";
    itemDiv.appendChild(commentsButton);

    const reservationsButton = document.createElement("button");
    reservationsButton.classList.add("reservationsButton");
    reservationsButton.textContent = "Reservations";
    itemDiv.appendChild(reservationsButton);

    return itemDiv;
}

document.addEventListener("DOMContentLoaded", async () => {
    const itemsContainer = document.querySelector(".itemsContainer");

    async function handleLikeButtonClick(event) {
        if (event.target.classList.contains("likeButton")) {
            const itemDiv = event.target.closest(".like");
            const item_id = itemDiv.getAttribute("data-like");

            likes[item_id] = (likes[item_id] || 0) + 1;
            updateLikes(item_id);
            updateLikesOnAPI(item_id, likes[item_id]);

            const likeCountElement = itemDiv.querySelector(".likeCount");
            likeCountElement.textContent = `Likes: ${likes[item_id]}`;

            saveLikesToAPI(likes);
        }
    }

    async function handleCommentsButtonClick(event) {
        if (event.target.classList.contains("commentsButton")) {
        
            const itemDiv = event.target.closest(".like");
            const item_id = itemDiv.getAttribute("data-like");
          
        }
    }

    async function handleReservationsButtonClick(event) {
        if (event.target.classList.contains("reservationsButton")) {
           
            const itemDiv = event.target.closest(".like");
            const item_id = itemDiv.getAttribute("data-like");
           
        }
    }

    async function fetchLikesFromAPIExternal() {
        try {
            const response = await fetch(`${invAPI}${projectID}/likes`);
            const data = await response.json();
            Object.assign(likes, data);
            updateAllLikes();
        } catch (error) {
            console.error('Error fetching likes from API:', error);
        }
    }

    async function saveLikesToAPI(likesData) {
        try {
            await fetch(`${invAPI}${projectID}/likes`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(likesData),
            });
        } catch (error) {
            console.error('Error saving likes to API:', error);
        }
    }

    
    itemsContainer.addEventListener("click", handleLikeButtonClick);
    itemsContainer.addEventListener("click", handleCommentsButtonClick);
    itemsContainer.addEventListener("click", handleReservationsButtonClick);


    await fetchLikesFromAPIExternal();
    await populateItemsContainer();
});
