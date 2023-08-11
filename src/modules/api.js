const invAPI = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/dSv5DdTGl6SZHdXDAlEr/';
const pokeAPI = 'https://pokeapi.co/api/v2/pokemon/';

const pokeArr = [];

const getPokemon = async (id) => {
  const res = await fetch(`${pokeAPI}${id}`);
  const data = await res.json();
  pokeArr.push(data);
  return pokeArr;
};

const fetchLikesFromAPI = async () => {
  const res = await fetch(`${invAPI}likes/`);
  const data = await res.json();
  console.log(data);
  return data;
}

const updateLikesOnAPI = async (item_id) => {
    const likeData = await fetchLikesFromAPI();
    const likes = likeData.find((like) => like.item_id === item_id);
    return likes.likes;
}

export { invAPI, getPokemon , fetchLikesFromAPI , updateLikesOnAPI}

