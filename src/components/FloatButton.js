import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FloatingAction } from "react-native-floating-action";
import { useSinuca } from "../context/SinucaContext";
import { navigate } from "../utils";
import { useCountdown } from "../context/CountdownContext";

const FloatButton = () => {
  const { undo, resetScore, setHistoryModal } = useSinuca();
  const { stop } = useCountdown();

  const actions = [
    {
      text: "Cancelar partida",
      icon: require("../../assets/icons/cancel-button.png"),
      name: "reset",
      position: 2,
      callback: () => {
        stop();
        resetScore();
      },
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
      position: 0,
      callback: () => navigate("Settings"),
    },
    {
      text: "Histórico",
      icon: require("../../assets/icons/history.png"),
      name: "history",
      position: 1,
      callback: () => setHistoryModal(true),
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
