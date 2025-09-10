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
import api from "../../../api/axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  const [id, setId] = useState('');
  const [user, setUser] = useState('');

  const lerId = async () => {
    try {
      const storedId = await AsyncStorage.getItem('userId');
      if (storedId !== null) {
        setId(storedId);
        console.log('ID do usuário carregado com sucesso:', storedId);
        return storedId;
      }
    } catch (error) {
      console.log('Erro ao carregar ID do usuário:', error);
    }
  };

  useEffect(() => {
    const buscarUsuario = async () => {
      try {
        const userId = await lerId();

        if (!userId) {
          console.log('Nenhum ID de usuário encontrado');
          return;
        }

        const response = await api.get('/users');

        const usuarioEncontrado = response.data.find(user => user.id == userId);

        if (usuarioEncontrado) {
          setUser(usuarioEncontrado);
          console.log('Usuário encontrado:', usuarioEncontrado);
        } else {
          console.log('Usuário não encontrado');
        }

      } catch (error) {
        console.log('Erro ao buscar usuário:', error.response?.data || error.message);
      }
    };
    buscarUsuario();
  }, []);

  const logout = () => {
    AsyncStorage.removeItem('userId')
      .then(() => {
        console.log('Logout realizado com sucesso');
        navigation.navigate('Splash');
      })
      .catch((error) => {
        console.log('Erro ao realizar logout:', error);
      });
  }

  let delay = 0;

  const numeros = [
    {
      id: 1,
      img: require('./img/Primeiro.png')
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
            flexDirection:'row',
           
           
          }}
        >

          
          
          <Image
              source={
                user?.fotoUsers
                  ? { uri: `${api.defaults.baseURL.replace('/api', '')}${user.fotoUsers}` }
                  : require("../../../assets/Icones/UserRed.png")
              }
              resizeMode="contain"
              style={{
                width: "50%",
                height: "65%",
                resizeMode: "contain",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                borderRadius: 500,
                marginRight:10
              }}
            ></Image>
            <Text style={{color:'white',fontSize:22}}>Ola , {user.nomeUsers}</Text>
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
              width: "37%",
              height: "75%",
              borderRadius: "50%",
              alignSelf: "flex-end",
            }}
          >
            <Image
            source={require('../../../assets/Icones/menu-aberto.png')}
            style={{ width: "70%", height: "100%" }}
            resizeMode="contain"
          />
            
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
                <Image style={[{ borderWidth: 1, width: "100%", height: "100%" }]} resizeMode="contain" source={item.img}></Image>
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
