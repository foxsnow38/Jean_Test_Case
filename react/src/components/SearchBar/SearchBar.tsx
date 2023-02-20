import React from "react";
import moduleCSS from "./SearchBar.module.scss";
import { Box, Stack, Text, Autocomplete, Button } from "@mantine/core";
import { useAtom } from "jotai";
import { pokemons, searchTerm, searchClicked } from "../../Store/Atom";
function SearchBar() {
  const [pokes, setPokes] = useAtom(pokemons);
  const [search, setSearch] = useAtom(searchTerm);
  const [searchBtnClicked, setSearchBtnClicked] = useAtom(searchClicked);

  const searchBarValueChange = (
    event: React.FormEvent<HTMLInputElement> | string
  ) => {
    let value = "";
    if (typeof event === "string") {
      value = event;
    } else {
      value = event.currentTarget.value;
    }
    setSearch(value);
  };
  return (
    <Stack id="searchBar" align="center">
      <Box id="searchBarText" sx={{ marginBottom: "20px" }}>
        <Text
          sx={{
            fontSize: "20px",
            color: "white",
            fontWeight: 300,
          }}
        >
          Search Your Pokemon
        </Text>
      </Box>
      <Box
        id="searchBarInput"
        sx={{
          boxShadow: "0px 5px 8px 2px rgba(0,0,0,0.25)",
          width: "600px",
        }}
      >
        <Autocomplete
          rightSection={
            <Button
              onClick={() => {
                setSearchBtnClicked(!searchBtnClicked);
              }}
              variant="filled"
              radius={0}
              sx={{
                width: "100px",
                height: "60px",
                background: "#FFA400",
                color: "#000",
                fontSize: "20px",

                "&:hover": {
                  background: "#ffb028",
                },
              }}
            >
              Search
            </Button>
          }
          sx={{
            width: "570px",
            color: "white",
          }}
          data={pokes.map(
            (item) => item.name.charAt(0).toUpperCase() + item.name.substring(1)
          )}
          size="xl"
          placeholder="Search"
          radius={0}
          onInput={(event) => {
            searchBarValueChange(event);
          }}
          onChange={(event) => {
            searchBarValueChange(event);
          }}
        />
      </Box>
    </Stack>
  );
}

//////////////////////

export default SearchBar;
