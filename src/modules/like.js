import { fetchLikesFromAPI, updateLikesOnAPI } from './api.js';

const invAPI = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/app/dSv5DdTGl6SZHdXDAlEr';
const likes = {};

const saveLikesToAPI = async (likesData) => {
    const res = await fetch(`${invAPI}/likes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(likesData),
    });
    const data = res.text();
    return data;
}

const updateLikes = (item_id) => {
    const likesCountElement = document.querySelector(`[data-like="${item_id}"] .likeCount`);
    if (likesCountElement) {
        likes[item_id] = (likes[item_id] || 0) + 1;
        likesCountElement.textContent = `Likes: ${likes[item_id]}`;
        updateLikesOnAPI(item_id);
    }
}

const updateAllLikes = (item_id) => {
    for (const item_id in likes) {
        const likesCountElement = document.querySelector(`[data-like="${item_id}"] .likeCount`);
        if (likesCountElement) {
            likesCountElement.textContent = `Likes: ${likes[item_id]}`;
        }
    }
}

const fetchLikesFromAPIExternal = async () => {
    try {
        const response = await fetch(`${invAPI}/likes`);
        const data = await response.json();
        Object.assign(likes, data);
        updateAllLikes();
    } catch (error) {
        console.error('Error fetching likes from API:', error);
    }
}

export { updateLikes, updateAllLikes, fetchLikesFromAPIExternal , saveLikesToAPI }

