/** @jest-environment jsdom */

import pokecounter from "./pokecounter";

describe("Making sure we count all Pokemon!", () => {
    let container;

    beforeEach(() => {
        document.body.innerHTML = '<div class="itemsContainer"> </div>';
        container = document.querySelector(".itemsContainer");
    });

    test("There should be 3 Pokemon", () =>{
        container.innerHTML = `
        <div class="like" data-like="1">Bulbasaur</div>
        <div class="like" data-like="2">Ivysaur</div>
        <div class="like" data-like="3">Venusaur</div>
        `
        const test = pokecounter();

        expect(test).toBe(3);
    })

    test("There aren't any pokemon", () => {
        const test = pokecounter();

        expect(test).toBe(0);
    })

    test("There's 2 pokemon and 1 extra item", () => {
        container.innerHTML = `
        <div class="like" data-like="1">Bulbasaur</div>
        <div class="like" data-like="2">Ivysaur</div>
        <div>New pokemon have been added to the ring!</div>
        `
        const test = pokecounter();

        expect(test).toBe(2);
    })
})