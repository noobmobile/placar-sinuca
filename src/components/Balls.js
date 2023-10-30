import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { SinucaContext, useSinuca } from "../context/SinucaContext";
import * as Animatable from "react-native-animatable";
import { ballsAssets } from "../utils";
import { useCountdown } from "../context/CountdownContext";

function Ball({ number }) {
  const { selectedBall, setSelectedBall, players } = useSinuca();
  const { countdownRunning } = useCountdown();
  const isSelected = selectedBall === number;
  const isInsideAnyPlayer = players.some((player) =>
    player.balls?.includes(number)
  );

  function onPress() {
    if (isInsideAnyPlayer) return;
    if (isSelected) {
      setSelectedBall(null);
      return;
    }
    setSelectedBall(number);
  }

  return (
    <TouchableOpacity
      style={[
        styles.ball,
        countdownRunning ? undefined : { opacity: 0.2 },
        isSelected ? styles.selectedBall : undefined,
        isInsideAnyPlayer ? styles.insidePlayer : undefined,
      ]}
      disabled={isInsideAnyPlayer || !countdownRunning}
      onPress={onPress}
    >
      <Animatable.Image
        animation={isSelected ? "rubberBand" : undefined}
        easing="ease-out"
        iterationCount="infinite"
        style={styles.ballImage}
        source={ballsAssets[number]}
      />
    </TouchableOpacity>
  );
}

export default function Balls() {
  let n = 1; // perdoe-me pai pela gambiarra nossa de cada dia
  return (
    <View style={styles.container}>
      {[...Array(5).keys()].map((i) => (
        <View key={i} style={styles.row}>
          {[...Array(i + 1).keys()].map((j) => (
            // number of the ball is the index in a pyramid pattern
            <Ball number={n++} key={j} />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  ball: {
    padding: 2,
  },
  ballImage: {
    width: 50,
    height: 50,
  },
  selectedBall: {},
  insidePlayer: {
    opacity: 0,
  },
});
