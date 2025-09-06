import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, Pressable, Image, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
import styles from '../registro/styles';
import { useNavigation } from '@react-navigation/native';
import api from "../../../api/axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const salvarId = async (id) => {
    try {
      await AsyncStorage.setItem('userId', id.toString());
      console.log('ID do usuário salvo com sucesso:', id);
    } catch (error) {
      console.log('Erro ao salvar ID do usuário:', error);
    }
  };

  const entrar = async () => {
    if (!email || !senha) {
      alert('Preencha todos os campos');
      return;
    }

    try {
      const response = await api.post('/login', {
        emailUsers: email.toLowerCase(),
        senhaUsers: senha
      });

      if (response.data.success) {
        Alert.alert(
          'Sucesso',
          `Login realizado com sucesso!`
        );
        salvarId(response.data.user.id);
        navigation.navigate('Home');
      } else {
        Alert.alert('Erro', response.data.message);
      }
    } catch (error) {
      console.log('Erro ao logar:', error.response?.data || error.message);
      Alert.alert('Não encotrado', 'Usuario ou senha incorretos');
    }
  };

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
                autoCapitalize="none"
                keyboardType="email-address"
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
              <Pressable onPress={() => entrar()} style={[styles.proximo]}><Text style={styles.textoP}>Entrar</Text></Pressable>
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
