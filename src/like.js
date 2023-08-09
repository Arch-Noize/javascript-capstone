const apiUrl = "https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/";
let likes = 0; 

const likeButton = document.getElementById("likeButton");
const likesCount = document.getElementById("likesCount");


async function fetchLikesFromAPI() {
    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
            const data = await response.json();
            likes = data.likes || 0; 
            updateLikes();
        } else {
            console.error("Failed to fetch likes from API.");
        }
    } catch (error) {
        console.error("An error occurred while fetching likes from API:", error);
    }
}

updateLikes()
fetchLikesFromAPI(); 

likeButton.addEventListener("click", function() {
    likes++;
    updateLikes();


    updateLikesOnAPI();
});

function updateLikes() {
    likesCount.textContent = likes;
}
