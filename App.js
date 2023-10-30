import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import { SinucaProvider } from "./src/context/SinucaContext";
import Settings from "./src/screens/Settings";
import { navigationRef } from "./src/utils";
import { CountdownProvider } from "./src/context/CountdownContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SinucaProvider>
      <CountdownProvider>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              animation: "slide_from_right",
            }}
          >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Settings" component={Settings} />
          </Stack.Navigator>
        </NavigationContainer>
      </CountdownProvider>
    </SinucaProvider>
  );
}
