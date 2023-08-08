const invAPI = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/dSv5DdTGl6SZHdXDAlEr/';
const pokeAPI = 'https://pokeapi.co/api/v2/pokemon/';

const getPokemon = async (id) => {
  const res = await fetch(pokeAPI + id);
  const data = await res.json();
  return data;
};

export { invAPI, pokeAPI, getPokemon };