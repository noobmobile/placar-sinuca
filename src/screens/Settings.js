import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { useSinuca } from "../context/SinucaContext";
import { navigate } from "../utils";
import { useCountdown } from "../context/CountdownContext";

const Settings = () => {
  const { players, setPlayers, save } = useSinuca();
  const [playerAmount, setPlayerAmount] = useState(players.length);
  const { countdownDuration, setCountdownDuration, saveCountdown } =
    useCountdown();

  function onChangePlayerAmount(text) {
    let value = parseInt(text);
    if (!value || value < 2) {
      setPlayerAmount("");
      return;
    }
    if (value > 4) value = 4;
    if (value < 2) value = 2;
    setPlayerAmount(value);
    if (value > players.length) {
      const diff = value - players.length;
      const newPlayers = [...Array(diff).keys()].map((i) => ({
        name: `Jogador ${i + 1 + players.length}`,
        balls: [],
      }));
      setPlayers((players) => [...players, ...newPlayers]);
    } else if (value < players.length) {
      setPlayers((players) => players.slice(0, value));
    }
  }

  function changePlayerName(player, name) {
    player.name = name;
    setPlayers([...players]);
  }

  function changeCountdownDuration(text) {
    let value = parseInt(text);
    if (!value || value < 1) {
      setCountdownDuration("");
      return;
    }
    if (value > 60) value = 60;
    setCountdownDuration(value);
  }

  function back() {
    navigate("Home");
    save();
    saveCountdown();
  }

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        keyboardType="numeric"
        label="Tempo do cronômetro"
        value={countdownDuration?.toString()}
        onChangeText={changeCountdownDuration}
      />
      <TextInput
        mode="outlined"
        keyboardType="numeric"
        label="Quantidade de Jogadores"
        value={playerAmount?.toString()}
        onChangeText={onChangePlayerAmount}
      />
      {players.map((player, index) => (
        <TextInput
          key={index}
          mode="outlined"
          label={`Nome do Jogador ${index + 1}`}
          defaultValue={player.name}
          onChangeText={(text) => changePlayerName(player, text)}
        />
      ))}
      <Button mode="contained" onPress={back}>
        Voltar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 50,
    flex: 1,
    gap: 10,
  },
});

export default Settings;
