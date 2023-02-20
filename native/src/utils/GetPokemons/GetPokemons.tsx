import React, { Component } from "react";

function GetPokemons() {
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
}

//////////////////////

export default GetPokemons;
