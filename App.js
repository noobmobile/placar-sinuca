import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import Balls from "./src/Balls";
import Players from "./src/Players";
import { SinucaProvider } from "./src/SinucaContext";
import FloatButton from "./src/FloatButton";

export default function App() {
  return (
    <SinucaProvider style={styles.container}>
      <ImageBackground
        source={require("./assets/background.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <Players />
        <Balls />
      </ImageBackground>
      <FloatButton />
    </SinucaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    flex: 1,
  },
});
