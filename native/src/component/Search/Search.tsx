import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput, Text, Button } from "react-native-paper";
import { useAtom } from "jotai";
import { searchTerm, searchClicked } from "../../Store/Atom";

function Search() {
  const [search, setSearch] = useAtom(searchTerm);
  const [searchBtnClicked, setSearchBtnClicked] = useAtom(searchClicked);

  return (
    <View style={{ alignItems: "center" }}>
      <View>
        <Text style={{ fontSize: 20, color: "white", alignSelf: "center" }}>
          Search Your Pokemon
        </Text>
      </View>
      <View style={{ marginTop: 30 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            backgroundColor: "#D9D9D9",
            elevation: 10,
          }}
        >
          <TextInput
            onChangeText={(text) => {
              setSearch(text);
            }}
            mode="flat"
            theme={{ roundness: 0 }}
            style={{
              backgroundColor: "#D9D9D9",
              width: 240,
              height: 60,
              borderRadius: 0,
              margin: 0,
            }}
          />
          <Button
            theme={{ roundness: 0 }}
            style={{
              width: 100,
              height: 60,
              backgroundColor: "#FFA400",
              borderRadius: 0,
              margin: 0,
              justifyContent: "center",
            }}
            onPress={(e) => {
              setSearchBtnClicked(!searchBtnClicked);
            }}
          >
            <Text
              style={{
                color: "black",
                fontSize: 20,
                alignSelf: "center",
              }}
            >
              Search
            </Text>
          </Button>
        </View>
      </View>
    </View>
  );
}

//////////////////////

export default Search;
