import { ImageBackground, StyleSheet, Text, View } from "react-native";
import Balls from "../components/Balls";
import Players from "../components/Players";
import FloatButton from "../components/FloatButton";
import FinishModal from "../components/FinishModal";

export default function Home() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/background.jpg")}
        resizeMode="stretch"
        style={styles.image}
      >
        <Players />
        <Balls />
      </ImageBackground>
      <FloatButton />
      <FinishModal />
    </View>
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
