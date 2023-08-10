import './index.css';
import { getPokemon } from './modules/api.js';

const list = document.querySelector('.pokemon-data');
const reservation = document.querySelector('.reserve');

for (let i = 1; i <= 10; i += 1) {
  const pokemon = await getPokemon(i);
  console.log(pokemon.name);
  // list.innerHTML += `<li class="score">${pokemon.name}</li>`
}

document.addEventListener('DOMContentLoaded', getPokemon());