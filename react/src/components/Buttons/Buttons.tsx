import moduleCSS from "./Buttons.module.scss";
import { Group, Button, ActionIcon } from "@mantine/core";
import { useAtom } from "jotai";
import { selectedBtn } from "../../Store/Atom";
import { X } from "react-feather";
const pokemonTypes = [
  "Grass",
  "Poison",
  "Flying",
  "Fire",
  "Water",
  "Bug",
  "Normal",
];

function Buttons() {
  const [selectedButton, setSelectedButton] = useAtom(selectedBtn);
  return (
    <Group w={1360} align="stretch" spacing={0} grow style={{ border: 0 }}>
      {pokemonTypes.map((item, index) => (
        <Button
          radius={0}
          size="md"
          sx={{
            flex: 1,
            fontWeight: 400,
            background: "#D9D9D9",
            color: "#000",
            borderRight:
              index === pokemonTypes.length - 1 ? "0px" : "3px solid #868686",

            "&:hover": {
              background: "#FFA400",
            },
          }}
          onClick={() => {
            if (selectedButton === item.toLowerCase()) setSelectedButton("");
            else setSelectedButton(item.toLowerCase());
          }}
        >
          {item}
          {selectedButton === item.toLowerCase() ? (
            <ActionIcon>
              <X size={20} color="#000" />
            </ActionIcon>
          ) : null}
        </Button>
      ))}
    </Group>
  );
}

//////////////////////

export default Buttons;
