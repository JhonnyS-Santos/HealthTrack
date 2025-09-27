import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, Pressable, Image, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
import styles from '../styles';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Etapa2() {
  const route = useRoute();
  const { nomeP = '', emailP = '', dataN = '', estadoP = '', cepP = '', bairroP = '', numP = '', photoUriP = '', senhaP = '', senhaCP = '', pesoP = '', alturaP = '', tipoSP = '' } = route.params || {};
  const [cep, setCep] = useState(cepP);
  const [isFocused, setIsFocused] = useState(false);
  const [isFocusedA, setIsFocusedA] = useState(false);
  const [isFocusedB, setIsFocusedB] = useState(false);
  const navigation = useNavigation();
  const [estado, setEstado] = useState(estadoP);
  const [bairro, setBairro] = useState(bairroP);

  useEffect(() => {
    NavigationBar.setVisibilityAsync('hidden');
    NavigationBar.setBackgroundColorAsync('#000000ff');
  }, []);

  const verificar = () => {
    if (estado === '' || cep === '' || bairro === '') {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');

    } else {
      navigation.navigate('Etapa3', { nomeP, emailP, dataN, estadoP: estado, cepP: cep, bairroP: bairro, numP, photoUriP, senhaP, senhaCP, pesoP, alturaP, tipoSP  } );
    }
  }

  const [fontsLoaded] = useFonts({
    Roboto: require('../../../../assets/Fontes/Roboto.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const cepAlt = (texto) => {
    let numericCep = texto.replace(/\D/g, '');
    if (numericCep.length > 5) {
      numericCep = numericCep.slice(0, 5) + '-' + numericCep.slice(5, 8);
    }
    setCep(numericCep);
  };

  useEffect(() => {
    const numericCep = cep.replace('-', '');
    if (numericCep.length === 8) {
      axios.get(`https://viacep.com.br/ws/${numericCep}/json/`)
        .then(res => {
          setEstado(res.data.estado);
          setBairro(res.data.bairro);
        })
        .catch(err => console.log(err));
    }
  }, [cep]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>

        <View style={styles.conteudo}>

          <View style={styles.tituloA}>
            <Text style={styles.titulo}>Endereço</Text>
            <Text style={styles.subT}>Etapa 2</Text>
          </View>

          <View style={[styles.inputs]}>

            <View style={styles.inputC}>
              <TextInput style={styles.input} onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)} placeholder={isFocused ? '' : 'Digite sua Estado'} cursorColor="#fff" placeholderTextColor="#fff"
                onChangeText={setEstado}
                value={estado}
              />
              <Pressable style={styles.icons}>
                <Image style={styles.icon} source={require('../../../../assets/Icones/Ponto.png')}></Image>
              </Pressable>
            </View>

            <View style={styles.inputC}>
              <TextInput style={styles.input} onFocus={() => setIsFocusedA(true)}
                onBlur={() => setIsFocusedA(false)} placeholder={isFocusedA ? '' : 'Digite seu CEP'} cursorColor="#fff" placeholderTextColor="#fff" value={cep}
                keyboardType="numeric"
                onChangeText={cepAlt}
                maxLength={9} />
              <Pressable style={styles.icons}>
                <Image style={styles.icon} source={require('../../../../assets/Icones/Globo.png')}></Image>
              </Pressable>
            </View>

            <View style={styles.inputC}>
              <TextInput style={styles.input} onFocus={() => setIsFocusedB(true)}
                onBlur={() => setIsFocusedB(false)} placeholder={isFocusedB ? '' : 'Digite seu Bairro'} cursorColor="#fff"
                value={bairro}
                onChangeText={setBairro}
                placeholderTextColor="#fff" />
              <Pressable style={styles.icons}>
                <Image style={styles.icon} source={require('../../../../assets/Icones/Loc.png')}></Image>
              </Pressable>
            </View>


            <View style={[styles.inputC, { flexDirection: 'column', }]}>
              <View style={[styles.bots, { flexDirection: 'row', }]}>
                <Pressable onPress={() => navigation.navigate('Etapa1', { nomeP, emailP, dataN, cepP, estadoP, bairroP, numP, photoUriP, senhaP, senhaCP, pesoP, alturaP, tipoSP })} style={[styles.proximo1, { backgroundColor: '#339989ff' }]}><Text style={styles.textoP}>Voltar</Text></Pressable>
                <Pressable onPress={() => verificar()} style={[styles.proximo1]}><Text style={styles.textoP}>Proximo</Text></Pressable>
              </View>

              <View style={styles.pergunta}>
                <Text>Ja tem uma Conta?</Text>
                <Pressable onPress={() => navigation.navigate('Login')}><Text style={[{ color: '#339989ff', textDecorationLine: 'underline' }]}>Entrar</Text></Pressable>
              </View>
            </View>

          </View>
        </View>

        <StatusBar style="auto" hidden={true} />
      </View >
    </KeyboardAvoidingView>
  );
}