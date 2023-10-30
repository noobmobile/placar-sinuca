import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FloatingAction } from "react-native-floating-action";
import { useSinuca } from "../context/SinucaContext";
import { navigate } from "../utils";

const FloatButton = () => {
  const { undo, setPlayers } = useSinuca();

  function cancel() {
    setPlayers((players) =>
      players.map((player) => ({ ...player, balls: [] }))
    );
  }

  const actions = [
    {
      text: "Cancelar partida",
      icon: require("../../assets/icons/cancel-button.png"),
      name: "reset",
      position: 2,
      callback: cancel,
    },
    {
      text: "Restaurar ultima bola",
      icon: require("../../assets/icons/undo-button.png"),
      name: "undo",
      position: 3,
      callback: undo,
    },
    {
      text: "Configurações",
      icon: require("../../assets/icons/settings.png"),
      name: "settings",
      position: 1,
      callback: () => navigate("Settings"),
    },
  ];

  return (
    <FloatingAction
      actions={actions}
      onPressItem={(name) => {
        actions.find((action) => action.name === name).callback();
      }}
    />
  );
};

export default FloatButton;

const styles = StyleSheet.create({});
