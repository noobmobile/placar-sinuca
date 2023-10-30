import { createNavigationContainerRef } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import { TouchableOpacity } from "react-native";

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

// react native não suporta require dinâmico :/
export const ballsAssets = {
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

export const AnimatedTouchableOpacity =
  Animatable.createAnimatableComponent(TouchableOpacity);
