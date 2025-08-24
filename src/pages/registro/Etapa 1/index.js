import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, Pressable, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../styles';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Etapa1() {
  const route = useRoute();
  const { nomeP = '', emailP = '', dataN = 'Data de Nascimento', cepP = '', estadoP = '', bairroP = '', numP = '', photoUriP = '', senhaP = '', senhaCP = ''} = route.params || {};
  const [isFocused, setIsFocused] = useState(false);
  const [isFocusedA, setIsFocusedA] = useState(false);
  const [mostrar, setMostrar] = useState(false);
  const navigation = useNavigation();
  const [data, setData] = useState(new Date(2000, 0, 1));
  const [valor, setValor] = useState(dataN || 'Data de Nascimento');
  const [nome, setNome] = useState(nomeP)
  const [email, setEmail] = useState(emailP)

  

  useEffect(() => {
    NavigationBar.setVisibilityAsync('hidden');
    NavigationBar.setBackgroundColorAsync('#000000ff');
  }, []);

  const aoMudar = (event, novaData) => {
    setMostrar(false);
    if (novaData) {
      setData(novaData);
      const dataFormatada = formatarData(novaData);
      setValor(dataFormatada);
      trat("dataAniversario");
    }
  };

  const formatarData = (data) => {
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  const [fontsLoaded] = useFonts({
    Roboto: require('../../../../assets/Fontes/Roboto.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>

        <View style={styles.conteudo}>

          <View style={styles.tituloA}>
            <Text style={styles.titulo}>Cadastre-se</Text>
            <Text style={[styles.subT]}>Etapa 1</Text>
          </View>

          <View style={styles.inputs}>

            <View style={styles.inputC}>
              <TextInput style={styles.input} onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)} placeholder={isFocused ? '' : 'Digite seu Nome'} cursorColor="#fff"
                value={nome}
                onChangeText={setNome}
                placeholderTextColor="#fff" />
              <Pressable style={styles.icons}>
                <Image style={styles.icon} source={require('../../../../assets/Icones/User.png')}></Image>
              </Pressable>
            </View>

            <View style={styles.inputC}>
              <TextInput style={styles.input} onFocus={() => setIsFocusedA(true)}
                onBlur={() => setIsFocusedA(false)} placeholder={isFocusedA ? '' : 'Digite seu Email'} cursorColor="#fff"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="#fff" />
              <Pressable style={styles.icons}>
                <Image
                  style={styles.icon}
                  source={isFocusedA
                    ? require('../../../../assets/Icones/EmailA.png')
                    : require('../../../../assets/Icones/Email.png')}
                />
              </Pressable>
            </View>

            <View style={styles.inputC}>
              <Pressable style={styles.data} onPress={() => setMostrar(true)} >
                {mostrar && (
                  <DateTimePicker
                    value={data}
                    mode="date"
                    onChange={aoMudar}
                  />
                )}
                <Text style={styles.date}>{valor}</Text>

                <View style={styles.iconD}>
                  <Image style={styles.iconB} source={require('../../../../assets/Icones/Calendario.png')}></Image>
                </View>
              </Pressable>
            </View>

            <View style={[styles.inputC, { flexDirection: 'column', }]}>
              <Pressable onPress={() => navigation.navigate('Etapa2', { nomeP: nome, emailP: email, dataN: valor, cepP, estadoP, bairroP, numP, photoUriP, senhaP, senhaCP })} style={[styles.proximo]}><Text style={styles.textoP}>Proximo</Text></Pressable>
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