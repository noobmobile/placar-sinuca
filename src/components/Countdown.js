import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Icon } from "react-native-paper";
import { useCountdown } from "../context/CountdownContext";
import * as Animatable from "react-native-animatable";
import { AnimatedTouchableOpacity } from "../utils";

const Countdown = () => {
  const { toggle, countdownTimeLeft, countdownRunning } = useCountdown();

  function onPress() {
    toggle();
  }

  const minutes = `${Math.floor(countdownTimeLeft / 60)}`.padStart(2, "0");
  const seconds = `${countdownTimeLeft % 60}`.padStart(2, "0");

  return (
    <AnimatedTouchableOpacity style={styles.container} onPress={onPress}>
      <Icon
        source={
          countdownRunning ? "pause-circle-outline" : "play-circle-outline"
        }
        color="white"
        size={24}
      />
      <Text
        animation={countdownRunning ? "pulse" : undefined}
        easing="ease-out"
        iterationCount="infinite"
        style={styles.text}
      >
        {minutes}:{seconds}
      </Text>
    </AnimatedTouchableOpacity>
  );
};

export default Countdown;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    marginBottom: 15,
    flexDirection: "row",
    width: "100%",
    gap: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    gap: 10,
  },
});
