import React, { Component } from "react";
import { View, Image } from "react-native";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";

import { DataTable, Text, Portal, Modal, Button } from "react-native-paper";
import { modalImage, pokemons } from "../../Store/Atom";
import { Crystal } from "../../Store/atomType";
import Buttons from "../Buttons/Buttons";
import { useAtom } from "jotai";

const firstLetterUpperCase = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

function Table() {
  const [isModalVisible, setModalVisible] = React.useState(true);
  const [pokes, setPokes] = useAtom(pokemons);
  const [modalImgSrc, setModalImgSrc] = useAtom(modalImage);
  return (
    <View style={{ width: "100%" }}>
      <Portal>
        <Modal
          visible={isModalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={{
            width: "100%",
            height: 300,
            padding: 20,
          }}
          dismissable={true}
        >
          <>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <View
                style={{
                  width: "100%",
                  alignItems: "flex-end",
                }}
              >
                <AwesomeIcon.Button
                  name="close"
                  size={30}
                  backgroundColor="rgba(0,0,0,0)"
                  color={"#FFA400"}
                  onPress={() => {
                    setModalVisible(false);
                  }}
                />
              </View>
              <Image
                resizeMode="contain"
                style={{ width: "80%", height: "80%" }}
                source={{
                  uri: modalImgSrc,
                }}
              />
            </View>
          </>
        </Modal>
      </Portal>

      <DataTable style={{ width: "100%" }}>
        <DataTable.Header
          style={{
            width: "100%",
            paddingLeft: -10,
            paddingRight: -10,
            justifyContent: "space-between",
            borderBottomWidth: 0,
            shadowOffset: { width: 0, height: 5 },
            shadowColor: "#0000",
            shadowOpacity: 1,
            elevation: 15,
          }}
        >
          <DataTable.Title
            style={{
              borderRightColor: "#868686",
              backgroundColor: "#D9D9D9",

              borderRightWidth: 3,
              justifyContent: "center",
              flex: 4,
            }}
          >
            <Text style={{ color: "black", fontSize: 20 }}>Name</Text>
          </DataTable.Title>

          <DataTable.Title
            style={{
              borderRightColor: "#868686",
              backgroundColor: "#D9D9D9",

              borderRightWidth: 3,
              justifyContent: "center",
              flex: 3,
            }}
          >
            <Text style={{ color: "black", fontSize: 20 }}>HEIGHT</Text>
          </DataTable.Title>

          <DataTable.Title
            style={{
              borderRightColor: "#868686",
              backgroundColor: "#D9D9D9",

              borderRightWidth: 3,
              justifyContent: "center",
              flex: 4,
            }}
          >
            <Text style={{ color: "black", fontSize: 20 }}>WEIGHT</Text>
          </DataTable.Title>

          <DataTable.Title
            style={{
              backgroundColor: "#D9D9D9",

              justifyContent: "center",
              flex: 5,
            }}
          >
            <Text style={{ color: "black", fontSize: 20 }}>TYPES</Text>
          </DataTable.Title>
        </DataTable.Header>
        <View>
          {pokes.slice(0, 6).map((pokemon) => (
            <DataTable.Row
              key={pokemon.name}
              style={{
                borderWidth: 0,
                paddingLeft: -5,
                paddingRight: -5,
                justifyContent: "space-between",
                borderBottomWidth: 0,
              }}
              onPress={() => {
                setModalVisible(true);
                setModalImgSrc(pokemon.sprites.front_default);
              }}
            >
              <DataTable.Cell
                style={{
                  borderRightColor: "#868686",
                  borderRightWidth: 3,
                  alignItems: "center",
                  backgroundColor: "#D9D9D9",
                  flex: 4,
                }}
              >
                <Text style={{ color: "black", fontSize: 20 }}>
                  {firstLetterUpperCase(pokemon.name)}
                </Text>
              </DataTable.Cell>
              <DataTable.Cell
                style={{
                  borderRightColor: "#868686",
                  borderRightWidth: 3,
                  alignItems: "center",
                  backgroundColor: "#D9D9D9",
                  flex: 3,
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "black", fontSize: 20 }}>
                  {pokemon.height} cm
                </Text>
              </DataTable.Cell>
              <DataTable.Cell
                style={{
                  borderRightColor: "#868686",
                  borderRightWidth: 3,
                  alignItems: "center",
                  backgroundColor: "#D9D9D9",
                  flex: 4,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontSize: 20,
                  }}
                >
                  {pokemon.weight} kg
                </Text>
              </DataTable.Cell>
              <DataTable.Cell
                style={{
                  alignItems: "center",
                  backgroundColor: "#D9D9D9",
                  flex: 5,
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "black", fontSize: 20 }}>
                  {pokemon.types.map((type, index) => {
                    return index == 0
                      ? `${type.type.name}`
                      : `, ${type.type.name}`;
                  })}
                </Text>
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </View>

        {/* <DataTable.Pagination
          page={1}
          numberOfPages={1}
          // disable left arrow button
          onPageChange={(page) => {
            console.log(page);
          }}
        /> */}
      </DataTable>
    </View>
  );
}

export default Table;
