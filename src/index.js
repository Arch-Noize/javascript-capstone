import './index.css';
import { getPokemon } from './modules/api.js';
import { addLike , getLikes } from './modules/like.js';

const populateItemsContainer = async () => {
    const itemsContainer = document.querySelector(".itemsContainer");
    let pokemon = [];


    for (let i = 1; i <= 15; i += 1){
        pokemon = await getPokemon(i);
    }
    pokemon.forEach(async (item, index) => {
        const itemLikes = await getLikes(index);
        const itemData = { id: `${index + 1}`, title: item.name, image: item.sprites.front_default, likes: `${itemLikes}`};
        const itemElement = createItemElement(itemData);
        itemsContainer.appendChild(itemElement);
    })
}

const createItemElement = (itemData) => {

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("like");
    itemDiv.setAttribute("data-like", itemData.id);

    const itemTitle = document.createElement("h3");
    itemTitle.textContent = itemData.title;
    itemDiv.appendChild(itemTitle);

    const itemImg = document.createElement("img");
    itemImg.src = itemData.image;
    itemDiv.appendChild(itemImg);

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

    const handleLikeButtonClick = async (event) => {
        if (event.target.classList.contains("likeButton")) {
            const itemDiv = event.target.closest(".like");
            const item_id = itemDiv.getAttribute("data-like");

            addLike(item_id);
            const totalLikes = await getLikes(item_id);
            console.log(totalLikes)

            const likeCountElement = itemDiv.querySelector(".likeCount");
            likeCountElement.textContent = `Likes: ${totalLikes}`;

        }
    }

    const handleCommentsButtonClick = async (event) => {
        if (event.target.classList.contains("commentsButton")) {
            const itemDiv = event.target.closest(".like");
            const item_id = itemDiv.getAttribute("data-like");
        }
    }

    const handleReservationsButtonClick = async (event) => {
        if (event.target.classList.contains("reservationsButton")) {
            const itemDiv = event.target.closest(".like");
            const item_id = itemDiv.getAttribute("data-like");
        }
    }
    
    itemsContainer.addEventListener("click", handleLikeButtonClick);
    itemsContainer.addEventListener("click", handleCommentsButtonClick);
    itemsContainer.addEventListener("click", handleReservationsButtonClick);

    populateItemsContainer();
});


