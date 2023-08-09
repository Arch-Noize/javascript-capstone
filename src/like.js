const apiUrl = "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/";
let likes = {};

document.addEventListener("DOMContentLoaded", () => {
    const likeButtons = document.querySelectorAll(".likeButton");
    const likesCounts = document.querySelectorAll(".likesCount");

    likeButtons.forEach((likeButton, index) => {
        const item_id = likeButton.getAttribute("data-item");
        likes[item_id] = localStorage.getItem(item_id) ? parseInt(localStorage.getItem(item_id)) : 0;

        likeButton.addEventListener("click", async () => {
            likes[item_id]++;
            updateLikes(item_id);
            await updateLikesOnAPI(item_id);
            localStorage.setItem(item_id, likes[item_id]);
        });

        updateLikes(item_id);
    });

    fetchLikesFromAPI();
});

async function fetchLikesFromAPI() {
    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
            const data = await response.json();
            for (const item_id in data) {
                likes[item_id] = data[item_id].likes || 0;
                updateLikes(item_id);
            }
        } else {
            console.error("Failed to fetch likes from API.");
        }
    } catch (error) {
        console.error("An error occurred while fetching likes from API:", error);
    }
}

function updateLikes(item_id) {
    const likesCountElement = document.querySelector(`.likesCount[data-item="${item_id}"]`);
    if (likesCountElement) {
        likesCountElement.textContent = likes[item_id];
    }
}

async function updateLikesOnAPI(item_id) {
    try {
        const response = await fetch(`${apiUrl}/${item_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ likes: likes[item_id] })
        });

        if (response.ok) {
            console.log(`Likes for item ${item_id} updated on API successfully.`);
        } else {
            console.error(`Failed to update likes for item ${item_id} on API.`);
        }
    } catch (error) {
        console.error(`An error occurred while updating likes for item ${item_id} on API:`, error);
    }
}
