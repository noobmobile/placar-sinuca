import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FloatingAction } from "react-native-floating-action";
import { useSinuca } from "./SinucaContext";

const FloatButton = () => {
  const { undo } = useSinuca();
  const actions = [
    {
      text: "Restaurar ultima bola",
      icon: require("../assets/icons/undo-button.png"),
      name: "undo",
      position: 1,
      callback: undo,
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
