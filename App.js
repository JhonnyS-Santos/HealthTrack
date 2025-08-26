import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Etapa1 from "./src/pages/registro/Etapa 1";
import Etapa2 from "./src/pages/registro/Etapa 2";
import Etapa3 from "./src/pages/registro/Etapa 3";
import Etapa4 from "./src/pages/registro/Etapa 4";
import Etapa5 from "./src/pages/registro/Etapa 5";
import Login from "./src/pages/login";
import Splash from "./src/pages/splash";
import Home from "./src/pages/home"

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">

        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Home}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="Etapa5"
          component={Etapa5}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="Etapa4"
          component={Etapa4}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="Etapa3"
          component={Etapa3}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="Etapa2"
          component={Etapa2}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="Etapa1"
          component={Etapa1}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="Splash"
          component={Splash}
        />

        

      </Stack.Navigator>
    </NavigationContainer>
  );
}
