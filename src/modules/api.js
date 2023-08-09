const invAPI = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/dSv5DdTGl6SZHdXDAlEr/';

export async function fetchLikesFromAPI() {
    try {
        const response = await fetch(`${invAPI}likes`);
        const data = await response.json();
        
        data.forEach(item => {
            likes[item.id] = item.likes;
            updateLikes(item.id);
        });
    } catch (error) {
        console.error('Error fetching likes from API:', error);
    }
}

export async function updateLikesOnAPI(item_id) {
    try {
        const response = await fetch(`${invAPI}likes/${item_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ likes: likes[item_id] })
        });

        if (!response.ok) {
            console.error('Failed to update likes on API');
        }
    } catch (error) {
        console.error('Error updating likes on API:', error);
    }
}
