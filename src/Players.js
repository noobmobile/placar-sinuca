import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { useSinuca } from "./SinucaContext";
import { ballsAssets } from "./utils";
import * as Animatable from "react-native-animatable";

const AnimatedTouchableOpacity =
  Animatable.createAnimatableComponent(TouchableOpacity);

function PlayerBall({ ball }) {
  return (
    <View style={styles.playerBall}>
      <Image style={styles.playerBallImage} source={ballsAssets[ball]} />
    </View>
  );
}

function Player({ player }) {
  const { selectedBall, setSelectedBall, addBallToPlayer } = useSinuca();
  const isSelecting = !!selectedBall;

  function onPress() {
    if (!isSelecting) return;
    setSelectedBall(null);
    addBallToPlayer(player, selectedBall);
  }

  return (
    <AnimatedTouchableOpacity
      onPress={onPress}
      style={[styles.player, isSelecting ? styles.selecting : undefined]}
      animation={isSelecting ? "pulse" : undefined}
      easing="ease-out"
      iterationCount="infinite"
    >
      <View>
        <Text style={styles.playerName}>{player.name}</Text>
      </View>
      <View style={styles.ballContainer}>
        {player.balls?.map((ball, index) => (
          <PlayerBall key={index} ball={ball} />
        ))}
      </View>
    </AnimatedTouchableOpacity>
  );
}

export default function Players() {
  const { players } = useSinuca();
  return (
    <View style={styles.container}>
      {players.map((player, index) => (
        <Player key={index} player={player} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "85%",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 2,
    justifyContent: "space-around",
  },
  player: {
    flexBasis: "45%",
    padding: 10,
    minHeight: 100,
    marginBottom: 10,
    backgroundColor: "rgba(0,0,0,.2)",
    borderRadius: 5,
  },
  playerName: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    marginBottom: 10,
  },
  selecting: {
    borderColor: "red",
  },
  ballContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 2,
  },
  playerBallImage: {
    width: 30,
    height: 30,
  },
});
