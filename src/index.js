import './index.css';
import { fetchLikesFromAPI, updateLikesOnAPI } from './modules/api.js';
import { updateLikes } from './modules/like.js';

const invAPI = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/dSv5DdTGl6SZHdXDAlEr/';
const pokeAPI = 'https://pokeapi.co/api/v2/pokemon/';

const likes = {};

function createItemElement(itemData) {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("like");
    itemDiv.setAttribute("data-like", itemData.id);

    const itemTitle = document.createElement("h3");
    itemTitle.textContent = itemData.title;
    itemDiv.appendChild(itemTitle);

    const likeButton = document.createElement("button");
    likeButton.classList.add("likeButton");
    likeButton.innerHTML = "&#x1F44D;"; // Thumbs-up emoji
    itemDiv.appendChild(likeButton);

    const likeCount = document.createElement("p");
    likeCount.classList.add("likeCount");
    likeCount.textContent = `Likes: ${itemData.likes}`;
    itemDiv.appendChild(likeCount);

    return itemDiv;
}

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

document.addEventListener("DOMContentLoaded", () => {
    populateItemsContainer();
    fetchLikesFromAPI();

    const itemsContainer = document.querySelector(".itemsContainer");

    itemsContainer.addEventListener("click", async (event) => {
        if (event.target.classList.contains("likeButton")) {
            const itemDiv = event.target.closest(".like");
            const item_id = itemDiv.getAttribute("data-like");

            likes[item_id]++;
            updateLikes(item_id);
            await updateLikesOnAPI(item_id, likes[item_id]);
        }
    });
});
