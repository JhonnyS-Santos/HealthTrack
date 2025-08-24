import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, Pressable, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
import styles from '../registro/styles';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const [isFocused, setIsFocused] = useState(false);
  const [isFocusedA, setIsFocusedA] = useState(false);
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    NavigationBar.setVisibilityAsync('hidden');
    NavigationBar.setBackgroundColorAsync('#000000ff');
  }, []);


  const [fontsLoaded] = useFonts({
    Roboto: require('../../../assets/Fontes/Roboto.ttf'),
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

          <View style={styles.logoA}>
            <Image style={styles.logo} source={require('../../../assets/Logo.png')}></Image>
          </View>


          <View style={[styles.inputs, { flex: 0.6 }]}>

            <View style={styles.inputC}>
              <TextInput
                style={styles.input}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={isFocused ? '' : 'Digite seu Email'}
                value={email}
                onChangeText={setEmail}
                cursorColor="#fff"
                placeholderTextColor="#fff"
              />
              <Pressable style={styles.icons}>
                <Image
                  style={styles.icon}
                  source={require('../../../assets/Icones/User.png')}
                />
              </Pressable>
            </View>

            <View style={styles.inputC}>
              <TextInput
                style={styles.input}
                onFocus={() => setIsFocusedA(true)}
                onBlur={() => setIsFocusedA(false)}
                secureTextEntry={!mostrarSenha}
                placeholder={isFocusedA ? '' : 'Digite sua Senha'}
                value={senha}
                onChangeText={setSenha}
                cursorColor="#fff"
                placeholderTextColor="#fff"
              />
              <Pressable onPress={() => setMostrarSenha(!mostrarSenha)} style={styles.icons}>
                <Image
                  style={styles.icon}
                  source={
                    mostrarSenha
                      ? require('../../../assets/Icones/OlhoA.png')
                      : require('../../../assets/Icones/OlhoB.png')}
                />
              </Pressable>
            </View>



            <View style={[styles.inputC, { flexDirection: 'column', }]}>
              <Pressable style={[styles.proximo]}><Text style={styles.textoP}>Entrar</Text></Pressable>
              <View style={styles.pergunta}>
                <Text>Ja tem uma Conta?</Text>
                <Pressable onPress={() => navigation.navigate('Etapa1')}><Text style={[{ color: '#339989ff', textDecorationLine: 'underline' }]}>Registre-se</Text></Pressable>
              </View>
            </View>

          </View>
        </View>

        <StatusBar style="auto" hidden={true} />
      </View >
    </KeyboardAvoidingView>
  );
}
