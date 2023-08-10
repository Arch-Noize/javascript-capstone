const invAPI = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/app/dSv5DdTGl6SZHdXDAlEr';

export async function fetchLikesFromAPI() {
    try {
        const response = await fetch(`${invAPI}/likes`);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error("Failed to fetch likes from API.");
        }
    } catch (error) {
        console.error("An error occurred while fetching likes from API:", error);
    }
}

export async function updateLikesOnAPI(item_id, newLikes) {
    try {
        const response = await fetch(`${invAPI}/likes/${item_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ likes: newLikes })
        });

        if (!response.ok) {
            console.error(`Failed to update likes for item ${item_id} on API.`);
        }
    } catch (error) {
        console.error(`An error occurred while updating likes for item ${item_id} on API:`, error);
    }
}
