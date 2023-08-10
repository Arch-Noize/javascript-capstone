import { fetchLikesFromAPI, updateLikesOnAPI } from './api.js';

const invAPI = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/app/dSv5DdTGl6SZHdXDAlEr';
const likes = {};

export function updateLikes(item_id) {
    const likesCountElement = document.querySelector(`[data-like="${item_id}"] .likeCount`);
    if (likesCountElement) {
        likes[item_id] = (likes[item_id] || 0) + 1;
        likesCountElement.textContent = `Likes: ${likes[item_id]}`;
        updateLikesOnAPI(item_id, likes[item_id]);
    }
}

export function updateAllLikes() {
    for (const item_id in likes) {
        const likesCountElement = document.querySelector(`[data-like="${item_id}"] .likeCount`);
        if (likesCountElement) {
            likesCountElement.textContent = `Likes: ${likes[item_id]}`;
        }
    }
}

export async function fetchLikesFromAPIExternal() {
    try {
        const data = await fetchLikesFromAPI();
        Object.assign(likes, data);
        updateAllLikes();
    } catch (error) {
        console.error('Error fetching likes from API:', error);
    }
}
