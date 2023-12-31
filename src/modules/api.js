const invAPI = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/wr5n1QxD7pfK5gphgr0z/';
const pokeAPI = 'https://pokeapi.co/api/v2/pokemon/';

const pokeArr = [];

const getPokemon = async (id) => {
  const res = await fetch(`${pokeAPI}${id}`);
  const data = await res.json();
  pokeArr.push(data);
  return pokeArr;
};

export {
  invAPI, getPokemon,
};
