import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TextInput,
  Pressable,
  Image,
  FlatList,
} from "react-native";
import { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import * as NavigationBar from "expo-navigation-bar";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";

export default function Home() {
  let delay = 0;

  const numeros = [
    {
      id: 1,
    },

    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
    {
      id: 6,
    },
    {
      id: 7,
    },
    {
      id: 8,
    },
    {
      id: 9,
    },
    {
      id: 10,
    },
    {
      id: 11,
    },
    {
      id: 12,
    },
  ];
  const navigation = useNavigation();

  useEffect(() => {
    NavigationBar.setVisibilityAsync("hidden");
    NavigationBar.setBackgroundColorAsync("#000000ff");
  }, []);

  const [fontsLoaded] = useFonts({
    Roboto: require("../../../assets/Fontes/Roboto.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    //nutritionix api para caloria
    <View style={styles.container}>
      <View style={styles.navbar}>
        <View
          style={{
            width: "40%",
            height: "70%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../../assets/Logo.png")}
            style={{ width: "50%", height: "80%" }}
          />
        </View>
        <View
          style={{
            width: "60%",
            height: "70%",
            justifyContent: "center",
            alignItems: "center",
            paddingRight: "3%",
          }}
        >
          <View
            style={{
              borderWidth: 1,
              width: "37%",
              height: "75%",
              borderRadius: "50%",
              alignSelf: "flex-end",
            }}
          >
            <Image
              source={require("../../../assets/Icones/Carro.png")}
              style={{
                width: "100%",
                height: "80%",
                resizeMode: "contain",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
            ></Image>
          </View>
        </View>
      </View>

      <View style={styles.numerosAd}>
        <FlatList
          style={styles.flatlist}
          data={numeros}
          numColumns={3}
          renderItem={({ item, index }) => (
            <Animatable.View
              animation={"fadeInUp"}
              delay={item.id * 350}
              style={styles.bera}
            >
              <Pressable
                style={[styles.adv]}
                onPress={() => {
                  item.id;
                }}
              >
                <Text style={[styles.botoes]}>{item.id}</Text>
              </Pressable>
            </Animatable.View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>

      <StatusBar style="auto" hidden={true} />
    </View>
  );
}
