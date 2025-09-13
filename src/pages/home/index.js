import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  Pressable,
  Image,
  FlatList,
  Modal,
  ActivityIndicator,
  Dimensions
} from "react-native";
import { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import * as NavigationBar from "expo-navigation-bar";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import api from "../../../api/axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlurView } from 'expo-blur';

// Componente de imagem com loading
const ImageWithLoader = ({ source, style, onError, ...props }) => {
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <View style={[style, { justifyContent: 'center', alignItems: 'center' }]}>
      {/* Loading enquanto carrega */}
      {loading && (
        <View style={[
          style, 
          { 
            position: 'absolute', 
            justifyContent: 'center', 
            alignItems: 'center',
            backgroundColor: '#f0f0f0',
            borderRadius: style.borderRadius || 0
          }
        ]}>
          <ActivityIndicator size="small" color="#999" />
        </View>
      )}
      
      {/* Imagem principal */}
      <Image
        source={source}
        style={[
          style,
          { 
            opacity: loading ? 0 : 1,
            position: loading ? 'absolute' : 'relative'
          }
        ]}
        onLoadStart={() => {
          setLoading(true);
          setHasError(false);
        }}
        onLoad={() => {
          setLoading(false);
          setHasError(false);
          console.log("Imagem carregada com sucesso");
        }}
        onLoadEnd={() => {
          setLoading(false);
        }}
        onError={(e) => {
          console.log("Erro ao carregar imagem:", e.nativeEvent);
          setLoading(false);
          setHasError(true);
          if (onError) onError(e);
        }}
        {...props}
      />
      
      {/* Fallback em caso de erro */}
      {hasError && (
        <Image
          source={require("../../../assets/Icones/UserRed.png")}
          style={[
            style,
            { position: 'absolute' }
          ]}
          resizeMode="cover"
        />
      )}
    </View>
  );
};

export default function Home() {
  const [id, setId] = useState('');
  const [user, setUser] = useState('');
  const width = Dimensions.get('screen').width;
  const height = Dimensions.get('screen').height;
  const [verM, setVerM] = useState(false);
  const [imageError, setImageError] = useState(false);

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
          logout();
          return;
        }

        const response = await api.get('/users');
        const usuarioEncontrado = response.data.find(user => user.id == userId);

        if (usuarioEncontrado) {
          setUser(usuarioEncontrado);
          console.log('Usuário encontrado:', usuarioEncontrado);
        } else {
          console.log('Usuário não encontrado');
          logout();
        }

      } catch (error) {
        console.log('Erro ao buscar usuário:', error.response?.data || error.message);
        logout();
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

  const numeros = [
    { id: 1, img: require('./img/Primeiro.png') },
    { id: 2, img: require('../../../assets/Icones/Pasta.png') },
    { id: 3, img: require('../../../assets/Icones/Pasta.png') },
    { id: 4, img: require('../../../assets/Icones/Pasta.png') },
    { id: 5, img: require('../../../assets/Icones/Pasta.png') },
    { id: 6, img: require('../../../assets/Icones/Pasta.png') },
    { id: 7, img: require('../../../assets/Icones/Pasta.png') },
    { id: 8, img: require('../../../assets/Icones/Pasta.png') },
    { id: 9, img: require('../../../assets/Icones/Pasta.png') },
    { id: 10, img: require('../../../assets/Icones/Pasta.png') },
    { id: 11, img: require('../../../assets/Icones/Pasta.png') },
    { id: 12, img: require('../../../assets/Icones/Pasta.png') },
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
    <View style={styles.container}>
      <View style={styles.navbar}>
        <View
          style={{
            width: "40%",
            height: "70%",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: 'row',
            marginLeft: '20%'
          }}
        >
          {/* IMAGEM COM LOADING - SUBSTITUÍDA AQUI */}
          <ImageWithLoader
            source={
              user?.fotoUsers && !imageError
                ? { 
                    uri: `${api.defaults.baseURL.replace('/api', '')}${user.fotoUsers}`,
                    headers: { 'Cache-Control': 'no-cache' }
                  }
                : require("../../../assets/Icones/UserRed.png")
            }
            style={{
              width: width * 0.2,
              height: width * 0.2,
              borderRadius: width * 0.5,
              borderWidth: width * 0.008,
              borderColor: '#fffafbff',
            }}
            onError={(e) => {
              console.log("Erro ao carregar imagem:", e.nativeEvent);
              setImageError(true);
            }}
          />
          
          <Text style={{ 
            color: 'white', 
            fontSize: width * 0.06, 
            fontWeight: '900', 
            marginTop: width * 0.07, 
            marginLeft: width * 0.02 
          }}>
            Olá, {user.nomeUsers}
          </Text>
        </View>
        
        <View
          style={{
            width: "60%",
            height: "70%",
            justifyContent: "center",
            alignItems: "center",
            paddingRight: "7%",
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
            <Pressable onPress={() => setVerM(true)}>
              <Image
                source={require('../../../assets/Icones/menu-aberto.png')}
                style={{ width: "70%", height: "100%" }}
                resizeMode="contain"
              />
            </Pressable>
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
                {item.img && (
                  <Image 
                    style={[{ borderWidth: 1, width: "100%", height: "100%" }]} 
                    resizeMode="contain" 
                    source={item.img}
                  />
                )}
              </Pressable>
            </Animatable.View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>

      <Modal visible={verM} transparent={true}>
        <BlurView intensity={70} tint="dark" style={{ width: '100%', height: '100%' }}>
          <View style={styles.container2}>
            <View style={{ 
              flex: 0.5, 
              width: '80%', 
              backgroundColor: '#fffafbff', 
              borderRadius: width * 0.07, 
              borderWidth: 1, 
              justifyContent: 'center', 
              alignItems: 'center' 
            }}>
              <Pressable onPress={() => setVerM(false)}>
                <Text>sair</Text>
              </Pressable>
              <View style={{
                flex: 0.8, 
                width: '100%', 
                borderWidth: 1, 
                justifyContent: 'space-between', 
                alignItems: 'center',
                flexDirection: 'column'
              }}>
                <View style={{ width: '100%', height: '20%', borderWidth: 1 }}><Text>a</Text></View>
                <View style={{ width: '100%', height: '20%', borderWidth: 1 }}><Text>a</Text></View>
                <View style={{ width: '100%', height: '20%', borderWidth: 1 }}><Text>a</Text></View>
                <View style={{ width: '100%', height: '20%', borderWidth: 1 }}><Text>a</Text></View>
                <View style={{ width: '100%', height: '20%', borderWidth: 1 }}><Text>a</Text></View>
              </View>
            </View>
          </View>
        </BlurView>
      </Modal>

      <StatusBar style="auto" hidden={true} />
    </View>
  );
}