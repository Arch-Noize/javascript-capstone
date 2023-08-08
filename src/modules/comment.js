import { invAPI , getPokemon } from "./api.js";

const list = document.querySelector(".pokemon-data");
const test = document.querySelector(".test");

const displayPoke = async () => {
    const pokemon = await getPokemon();
    // console.log(pokemon[1].name);
    // for (let i = 0; i <= 10; i++){
        list.innerHTML += `<li class="score">${pokemon.name}</li>`
        console.log(pokemon.name);
    // }
}

test.addEventListener('click', displayPoke());