export function updateLikes(item_id) {
    const likesCountElement = document.querySelector(`[data-like="${item_id}"] .likeCount`);
    if (likesCountElement) {
        likes[item_id]++;
        likesCountElement.textContent = `Likes: ${likes[item_id]}`;
        localStorage.setItem(item_id, likes[item_id]);
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
