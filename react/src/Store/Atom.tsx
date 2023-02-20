import { atom } from "jotai";
import { PokemonApi, Type } from "./atomType";
import { startTransition } from "react";

// fetch pokemans with all data from on": "https://pokeapi.co/api/v2/
const pokemonsAtom = atom(async () => {
  const pokemons = [];
  for (let index = 0; index < 30; index++) {
    pokemons.push(
      fetch(`https://pokeapi.co/api/v2/pokemon/${index + 1}`).then((res) =>
        res.json()
      )
    );
  }

  const result = Promise.all(pokemons);

  return result;
});

const pokemons = atom([] as PokemonApi[] | []);

const modalImage = atom("");
const selectedBtn = atom("");
const searchTerm = atom("");
const searchClicked = atom(false);

// const selectedPokemon = atom(async (get) => {
//   let pokemons = await get(pokemonsAtom);

//   const selected = get(selectedBtn);
//   const search = get(searchTerm);
//   if (selected === "" && search === "") return pokemons;

//   let result = pokemons.filter((item) =>
//     item.types.filter(
//       (slots: Type) => slots.type.name === selected.toLowerCase()
//     )
//   );
//   result = result.filter((item) => item.name.includes(search));

//   return result;
// });

export {
  selectedBtn,
  pokemonsAtom,
  pokemons,
  modalImage,
  searchTerm,
  searchClicked,
};
