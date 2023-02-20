import { View, ScrollView, TouchableOpacity } from "react-native";
import * as React from "react";
import { Button, Title, Paragraph, Text } from "react-native-paper";
import { useAtom } from "jotai";
import { selectedBtn } from "../../Store/Atom";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";

const pokemonTypes = [
  "Grass",
  "Poison",
  "Flying",
  "Fire",
  "Water",
  "Bug",
  "Normal",
];

export default function Buttons() {
  const [selected, setSelected] = useAtom(selectedBtn);

  return (
    <>
      <View style={{ height: 50 }}>
        <ScrollView
          style={{ height: 50 }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {pokemonTypes.map((itemType, index) => (
            <TouchableOpacity
              key={itemType}
              style={{
                borderRightWidth: index === pokemonTypes.length - 1 ? 0 : 3,
                borderRightColor: "#D9D9D9",

                width: 100,
                height: 50,

                backgroundColor: selected === itemType ? "#FFA400" : "#D9D9D9",
                borderRadius: 0,
                margin: 0,
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={(e) => {
                // setSelected(itemType);

                if (selected === itemType) {
                  setSelected("");
                } else {
                  setSelected(itemType);
                }
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: 20,
                  alignSelf: "center",
                }}
              >
                {itemType}
              </Text>
              {selected === itemType && (
                <AwesomeIcon
                  name="close"
                  size={20}
                  color="black"
                  style={{ marginLeft: 5 }}
                />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
}
