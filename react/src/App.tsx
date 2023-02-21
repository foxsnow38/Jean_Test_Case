/// <reference path="App.d.ts" />

import styles from "./App.module.scss";
import { Box, Stack } from "@mantine/core";
import React from "react";
import { useAtom } from "jotai";
import {
  pokemonsAtom,
  pokemons,
  searchTerm,
  selectedBtn,
  searchClicked,
} from "./Store/Atom";
import SearchBar from "./components/SearchBar";
import TableComp from "./components/Table/Table";
import Buttons from "./components/Buttons";
import { PokemonApi, Type } from "./Store/atomType";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
function App() {
  const [pokemonsStore] = useAtom(pokemonsAtom);
  const [pokes, setPokes] = useAtom(pokemons);
  const [search, setSearch] = useAtom(searchTerm);
  const [selected, setSelected] = useAtom(selectedBtn);
  const [searchBtnClicked, setSearchBtnClicked] = useAtom(searchClicked);

  React.useEffect(() => {
    setPokes(
      pokemonsStore.sort((a: PokemonApi, b: PokemonApi) => {
        if (a.name < b.name) return 1;
        if (a.name > b.name) return -1;
        return 0;
      })
    );
  }, []);
  React.useEffect(() => {
    (async () => {
      let pokemons = pokemonsStore as PokemonApi[];
      if (!selected && !search) return setPokes(pokemons);
      await delay(100);
      let result = pokemons;
      if (selected) {
        result = pokemons.filter((item) => {
          const res = item.types.filter(
            (slots: Type) => slots.type.name === selected.toLowerCase()
          );
          return res.length > 0;
        });
      }

      if (search) {
        result = result.filter((item: PokemonApi) => {
          let res = false;
          res = item.name.includes(search.toLowerCase());

          res = res || item.weight.toString().includes(search.toLowerCase());
          res = res || item.height.toString().includes(search.toLowerCase());

          return res;
        });
      }

      setPokes(result);
    })();
  }, [search, selected, searchBtnClicked, pokemonsStore]);

  return (
    <>
      <Box
        sx={{
          background: "#393939",
          width: "100vw",
          height: "100vh",
          fontFamily: "Inter",
        }}
      >
        <Stack id="Content" align="center">
          <Box sx={{ marginTop: "20px" }}>
            <SearchBar />
          </Box>
          <Box sx={{ marginTop: "25px" }}>
            <TableComp />
          </Box>
          <Box sx={{ marginBottom: "20px" }}>
            <Buttons />
          </Box>
        </Stack>
      </Box>
    </>
  );
}

export default App;
