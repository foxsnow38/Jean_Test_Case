import React from "react";
import moduleCSS from "./Table.module.scss";
import { pokemons, modalImage } from "../../Store/Atom";
import { useAtom } from "jotai";
import { Stack, Box, Table, Modal } from "@mantine/core";
type PokeType = {
  name: string;
  url: string;
};

type PokemonTypes = {
  slot: number;
  type: PokeType;
};

const tableStyle: React.CSSProperties | undefined = {
  textAlign: "center",
  borderColor: "#868686",
  border: "0px",
  borderRight: "1px solid #868686",
};

function TableComp() {
  const [pokes, setPokes] = useAtom(pokemons);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalImg, setModalImg] = useAtom(modalImage);

  const setModalImgFuncAndOpenModal = (url: string) => {
    setModalImg(url);
    setIsModalOpen(true);
  };
  return (
    <>
      <Modal
        opened={isModalOpen}
        centered
        size={"500px"}
        withCloseButton={false}
        onClose={() => setIsModalOpen(false)}
      >
        <Box sx={{ width: "100%", margin: "auto" }}>
          <img width={"100%"} src={modalImg} alt="Random unsplash image" />
        </Box>
      </Modal>

      <Stack
        id="table"
        align="center"
        w={1360}
        h={pokes.length < 8 ? "100%" : 700}
      >
        <Box
          style={{
            width: "100%",
            height: "100%",
            overflowX: "auto",
            overflowY: "auto",
          }}
        >
          <Table
            verticalSpacing="xl"
            horizontalSpacing="xl"
            sx={{
              width: "100%",
              height: "100%",

              background: "#D9D9D9",
            }}
            withColumnBorders={true}
          >
            <thead
              style={{
                position: "relative",
                boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.25)",
                zIndex: 10,
              }}
            >
              <tr>
                <th style={{ ...tableStyle, fontWeight: "bold" }}>NAME</th>
                <th style={{ ...tableStyle, fontWeight: "bold" }}>HEIGHT</th>
                <th style={{ ...tableStyle, fontWeight: "bold" }}>WEIGHT</th>
                <th style={{ ...tableStyle, fontWeight: "bold" }}>TYPE</th>
              </tr>
            </thead>
            <tbody>
              {pokes.map((item) => (
                <tr
                  key={item.name}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = "#FFA400";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = "#D9D9D9";
                  }}
                  onClick={() =>
                    setModalImgFuncAndOpenModal(item.sprites.front_default)
                  }
                >
                  <td style={{ ...tableStyle, fontWeight: "normal" }}>
                    {item.name.charAt(0).toUpperCase() + item.name.substring(1)}
                  </td>
                  <td style={{ ...tableStyle }}>{item.height * 10} cm</td>
                  <td style={{ ...tableStyle }}>{item.weight / 10} kg</td>
                  <td style={{ ...tableStyle }}>
                    {item.types.map((attackType: PokemonTypes, index: number) =>
                      index === 0
                        ? `${attackType.type.name}`
                        : `, ${attackType.type.name}`
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Box>
      </Stack>
    </>
  );
}

//////////////////////

export default TableComp;
