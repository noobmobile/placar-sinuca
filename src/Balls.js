import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

// react native não suporta require dinâmico :/
const assets = {
  1: require("../assets/bolas/1.png"),
  2: require("../assets/bolas/2.png"),
  3: require("../assets/bolas/3.png"),
  4: require("../assets/bolas/4.png"),
  5: require("../assets/bolas/5.png"),
  6: require("../assets/bolas/6.png"),
  7: require("../assets/bolas/7.png"),
  8: require("../assets/bolas/8.png"),
  9: require("../assets/bolas/9.png"),
  10: require("../assets/bolas/10.png"),
  11: require("../assets/bolas/11.png"),
  12: require("../assets/bolas/12.png"),
  13: require("../assets/bolas/13.png"),
  14: require("../assets/bolas/14.png"),
  15: require("../assets/bolas/15.png"),
};

function Ball({ number }) {
  return (
    <View style={styles.ball}>
      <Image style={styles.ballImage} source={assets[number]} />
    </View>
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
    padding: 1,
  },
  ballImage: {
    width: 40,
    height: 40,
  },
});
