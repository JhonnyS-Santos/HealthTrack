import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, Pressable, Image, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { useState } from 'react';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './styles';

export default function Registro() {
  const [isFocused, setIsFocused] = useState(false);
  const [isFocusedA, setIsFocusedA] = useState(false);
  const [isFocusedB, setIsFocusedB] = useState(false);
  const [isFocusedC, setIsFocusedC] = useState(false);
  const [isFocusedD, setIsFocusedD] = useState(false);
  const [mostrar, setMostrar] = useState(false);
  const [data, setData] = useState(new Date(2000, 0, 1));
  const [valor, setValor] = useState('Data de nascimento');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const aoMudar = (event, novaData) => {
    setMostrar(false);
    if (novaData) {
      setData(novaData);
      const dataFormatada = formatarData(novaData);
      setValor(dataFormatada);
      trat("dataAniversario", dataFormatada.trim());
    }
  };

  const formatarData = (data) => {
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };


  const [fontsLoaded] = useFonts({
    Roboto: require('../../../assets/Fontes/Roboto.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}>

      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start' }} keyboardShouldPersistTaps="handled">
        <View style={styles.tituloA}>
          <Text style={styles.titulo}>Cadastre-se</Text>
        </View>

        <View style={styles.inputs}>

          <View style={styles.inputC}>
            <TextInput style={styles.input} onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)} placeholder={isFocused ? '' : 'Digite seu Nome'} cursorColor="#fff" placeholderTextColor="#fff" />
            <Pressable style={styles.icons}>
              <Image style={styles.icon} source={require('../../../assets/Icones/User.png')}></Image>
            </Pressable>
          </View>


          <View style={styles.inputC}>
            <TextInput style={styles.input} onFocus={() => setIsFocusedA(true)}
              onBlur={() => setIsFocusedA(false)} placeholder={isFocusedA ? '' : 'Digite seu Email'} cursorColor="#fff" placeholderTextColor="#fff" />
            <Pressable style={styles.icons}>
              <Image style={styles.icon} source={require('../../../assets/Icones/Email.png')}></Image>
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
              <Text onChangeText={(valor) => trat("dataAniversario", valor.trim())} style={styles.date}>{valor}</Text>

              <View style={styles.iconD}>
                <Image style={styles.iconB} source={require('../../../assets/Icones/Calendario.png')}></Image>
              </View>
            </Pressable>
          </View>

          <View style={styles.inputC}>
            <TextInput style={styles.input} onFocus={() => setIsFocusedB(true)}
              onBlur={() => setIsFocusedB(false)} placeholder={isFocusedB ? '' : 'Digite sua Senha'} cursorColor="#fff" placeholderTextColor="#fff" secureTextEntry={!mostrarSenha} />
            <Pressable style={styles.icons} onPress={() => setMostrarSenha(!mostrarSenha)}>
              <Image style={styles.icon} source={
                mostrarSenha
                  ? require('../../../assets/Icones/OlhoA.png')
                  : require('../../../assets/Icones/OlhoB.png')
              }></Image>
            </Pressable>
          </View>

          <View style={styles.inputC}>
            <TextInput style={styles.input} onFocus={() => setIsFocusedC(true)}
              onBlur={() => setIsFocusedC(false)} placeholder={isFocusedC ? '' : 'Confirme sua Senha'} cursorColor="#fff" placeholderTextColor="#fff" secureTextEntry={!mostrarSenha} />
            <Pressable style={styles.icons} onPress={() => setMostrarSenha(!mostrarSenha)}>
              <Image style={styles.icon} ></Image>
            </Pressable>
          </View>

          <View style={[styles.inputC, {flexDirection: 'column', gap: '20%'}]}>
            <Pressable style={[styles.proximo]}><Text style={styles.textoP}>Proximo</Text></Pressable>
            <View style={styles.pergunta}>
              <Text>Ja tem uma Conta?</Text>
              <Pressable><Text style={[{color: '#339989ff', textDecorationLine: 'underline'}]}>Entrar</Text></Pressable>
            </View>
          </View>

        </View>
        <StatusBar style="auto" />
      </ScrollView>
    </KeyboardAvoidingView >
  );
}
