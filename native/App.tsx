import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";

import Search from "./src/component/Search";
import Buttons from "./src/component/Buttons";
import Table from "./src/component/Table";
import { useAtom } from "jotai";
import React, { Suspense } from "react";
import {
  // pokemonsAtom,
  pokemons,
  searchTerm,
  selectedBtn,
  searchClicked,
} from "./src/Store/Atom";
import { Type, PokemonApi } from "./src/Store/atomType";
import GetPokemons from "./src/utils/GetPokemons/GetPokemons";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
export default function App() {
  // const [pokemonsStore] = useAtom(pokemonsAtom);
  const [pokemonStore, setPokemonStore] = React.useState([]) as
    | PokemonApi[]
    | any[];

  const [pokes, setPokes] = useAtom(pokemons);
  const [search, setSearch] = useAtom(searchTerm);
  const [selected, setSelected] = useAtom(selectedBtn);
  const [searchBtnClicked, setSearchBtnClicked] = useAtom(searchClicked);

  React.useEffect(() => {
    (async () => {
      await GetPokemons().then((res) => {
        setPokes(res);
        setPokemonStore(res);
      });
    })();
  }, []);
  React.useEffect(() => {
    (async () => {
      let pokemons = pokemonStore as PokemonApi[];
      if (!selected && !search) return setPokes(pokemons);
      await delay(100);
      let result = pokemonStore;
      if (selected) {
        result = pokemons.filter((item) => {
          const res = item.types.filter(
            (slots: Type) => slots.type.name === selected
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
  }, [search, selected, searchBtnClicked]);
  return (
    <PaperProvider>
      <Suspense>
        {pokes && (
          <View
            style={{
              backgroundColor: "#343434",
              width: "100%",
              height: "100%",
              // alignItems: "center",
            }}
          >
            <View style={{ marginTop: 60 }}>
              <Search />
            </View>

            <View style={{ marginTop: 30 }}>
              <Buttons />
            </View>

            <View style={{ marginTop: 30, width: "100%" }}>
              <Table />
            </View>
          </View>
        )}
      </Suspense>

      <StatusBar style="auto" />
    </PaperProvider>
  );
}
