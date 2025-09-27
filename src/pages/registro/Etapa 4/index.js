import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, Pressable, Image, KeyboardAvoidingView, Platform, Alert, Modal } from 'react-native';
import { useState, useEffect, use } from 'react';
import { useFonts } from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
import styles from '../styles';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Etapa4() {
  const route = useRoute();
  const { nomeP = '', emailP = '', dataN = '', estadoP = '', cepP = '', bairroP = '', numP = '', photoUriP = '', senhaP = '', senhaCP = '', logP = '', pesoP = '', alturaP = '', tipoSP = '' } = route.params || {};
  const [isFocusedA, setIsFocusedA] = useState(false);
  const [isFocusedB, setIsFocusedB] = useState(false);
  const [tipoS, setTipoS] = useState();
  const [peso, setPeso] = useState(pesoP);
  const [altura, setAltura] = useState(alturaP);
  const [mostrar, setMostrar] = useState(false);
  const [valor, setValor] = useState(tipoSP || 'Tipo Sanguíneo');
  const navigation = useNavigation();

  // Oculta barra de navegação
  useEffect(() => {
    NavigationBar.setVisibilityAsync('hidden');
    NavigationBar.setBackgroundColorAsync('#000000ff');
  }, []);

  // Carrega fontes
  const [fontsLoaded] = useFonts({
    Roboto: require('../../../../assets/Fontes/Roboto.ttf'),
  });

  const verificar = () => {
    let alturaA = altura.replace(',', '.');
    if (parseFloat(peso) > 635 || parseFloat(peso) < 25) {
      Alert.alert('Atenção', 'Por favor, insira um peso válido.');
      return;
    }

    if (parseFloat(alturaA) > 2.72 || parseFloat(alturaA) < 0.54) {
      Alert.alert('Atenção', 'Por favor, insira uma altura válida.');
      return;
    }



    if (tipoS === '' || peso === '' || altura === '') {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
    } else {
      navigation.navigate('Etapa5', { nomeP, emailP, dataN, estadoP, cepP, bairroP, numP, photoUriP, senhaP, senhaCP, logP, tipoSP: valor, pesoP: peso, alturaP: altura });
    }
  }

  if (!fontsLoaded) return null;

  const alturaAlt = (texto) => {
    let numericAlt = texto.replace(/[^0-9]/g, ''); // só números

    if (numericAlt.length === 0) {
      setAltura('');
      return;
    }

    // formata como X,YY (1 dígito antes da vírgula, 2 depois)
    if (numericAlt.length >= 3) {
      numericAlt = numericAlt.slice(0, 1) + ',' + numericAlt.slice(1, 3);
    }

    setAltura(numericAlt);
  };

  useEffect(() => {

  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        <View style={styles.conteudo}>
          <View style={styles.tituloA}>
            <Text style={styles.titulo}>Extras</Text>
            <Text style={styles.subT}>Etapa 4</Text>
          </View>

          <View style={styles.inputs}>
            <View style={styles.inputC}>
              <Pressable style={styles.data} onPress={() => setMostrar(true)} >
                <Text style={styles.date}>{valor}</Text>

                <View style={styles.iconD}>
                  <Image style={styles.iconB} source={require('../../../../assets/Icones/sangue.png')}></Image>
                </View>
              </Pressable>
            </View>

            <View style={styles.inputC}>
              <TextInput
                style={styles.input}
                onFocus={() => setIsFocusedB(true)}
                onBlur={() => setIsFocusedB(false)}
                placeholder={isFocusedB ? '' : 'Digite seu Peso'}
                value={peso}
                onChangeText={setPeso}
                cursorColor="#fff"
                placeholderTextColor="#fff"
                keyboardType='numeric'
                maxLength={3}
              />
              <Pressable style={styles.icons}>
                <Image
                  style={styles.icon}
                  source={require('../../../../assets/Icones/kg.png')}
                />
              </Pressable>
            </View>

            <View style={styles.inputC}>
              <TextInput
                style={styles.input}
                onFocus={() => setIsFocusedA(true)}
                onBlur={() => setIsFocusedA(false)}
                placeholder={isFocusedA ? '' : 'Digite seu Altura'}
                value={altura}
                onChangeText={alturaAlt}
                cursorColor="#fff"
                placeholderTextColor="#fff"
                keyboardType='numeric'
                maxLength={4}
              />
              <Pressable style={styles.icons}>
                <Image
                  style={styles.icon}
                  source={require('../../../../assets/Icones/altura.png')}
                />
              </Pressable>
            </View>

            <View style={[styles.inputC, { flexDirection: 'column' }]}>
              <View style={[styles.bots, { flexDirection: 'row' }]}>
                <Pressable
                  onPress={() => navigation.navigate('Etapa3', { nomeP, emailP, dataN, estadoP, cepP, bairroP, numP, photoUriP, senhaP, senhaCP, logP, pesoP: peso, alturaP: altura, tipoSP: valor })}
                  style={[styles.proximo1, { backgroundColor: '#339989ff' }]}
                >
                  <Text style={styles.textoP}>Voltar</Text>
                </Pressable>

                <Pressable
                  onPress={() => verificar()}
                  style={[styles.proximo1]}
                >
                  <Text style={styles.textoP}>Próximo</Text>
                </Pressable>
              </View>

              <View style={styles.pergunta}>
                <Text>Já tem uma Conta?</Text>
                <Pressable onPress={() => navigation.navigate('Login')}>
                  <Text style={{ color: '#339989ff', textDecorationLine: 'underline' }}>Entrar</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>

        <Modal style={styles.modal1} visible={mostrar} animationType="slide" transparent={true}>
          <View style={styles.modal1}>
            <View style={{ backgroundColor: '#fff', width: '80%', borderRadius: 10, padding: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, alignItems: 'center' }}>Selecione o Tipo Sanguíneo</Text>
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((item) => (
                <Pressable
                  key={item}
                  onPress={() => { setValor(item); setTipoS(item); setMostrar(false); }}
                  style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc', alignItems: 'center' }}
                >
                  <Text style={{ fontSize: 16 }}>{item}</Text>
                </Pressable>
              ))}
              <Pressable
                onPress={() => setMostrar(false)}
                style={{ marginTop: 10, padding: 10, backgroundColor: '#339989ff', borderRadius: 5, alignItems: 'center' }}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Fechar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>


        <StatusBar style="auto" hidden={true} />
      </View>
    </KeyboardAvoidingView>
  );
}
