import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { IconButton } from "react-native-paper";
import { useCountdown } from "../context/CountdownContext";
import * as Animatable from "react-native-animatable";

const Countdown = () => {
  const { toggle, countdownTimeLeft, countdownRunning } = useCountdown();

  function onPress() {
    toggle();
  }

  const minutes = `${Math.floor(countdownTimeLeft / 60)}`.padStart(2, "0");
  const seconds = `${countdownTimeLeft % 60}`.padStart(2, "0");

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Animatable.Text
        animation={countdownRunning ? "pulse" : undefined}
        easing="ease-out"
        iterationCount="infinite"
        style={styles.text}
      >
        {minutes}:{seconds}
      </Animatable.Text>
    </TouchableOpacity>
  );
};

export default Countdown;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    flexDirection: "row",
    position: "absolute",
    top: 65,
    width: "100%",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
