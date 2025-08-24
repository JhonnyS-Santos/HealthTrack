import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, Pressable, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
import styles from '../styles';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Etapa3() {
    const route = useRoute();
    const { nomeP = '', emailP = '', dataN = '', estadoP = '', cepP = '', bairroP = '', numP = '', photoUriP = '', senhaP = '', senhaCP = '' } = route.params || {};
    const [isFocused, setIsFocused] = useState(false);
    const [isFocusedA, setIsFocusedA] = useState(false);
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState(numP || '');
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

    if (!fontsLoaded) return null;

    // Busca logradouro pelo CEP
    useEffect(() => {
        if (cepP) {
            axios.get(`https://viacep.com.br/ws/${cepP}/json/`)
                .then(res => setLogradouro(res.data.logradouro || ''))
                .catch(err => console.log(err));
        }
    }, [cepP]);

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.container}>
                <View style={styles.conteudo}>
                    <View style={styles.tituloA}>
                        <Text style={styles.titulo}>Endereço</Text>
                        <Text style={styles.subT}>Etapa 3</Text>
                    </View>

                    <View style={styles.inputs}>
                        <View style={styles.inputC}>
                            <TextInput
                                style={styles.input}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                placeholder={isFocused ? '' : 'Digite sua Rua'}
                                value={logradouro}
                                onChangeText={setLogradouro}
                                cursorColor="#fff"
                                placeholderTextColor="#fff"
                            />
                            <Pressable style={styles.icons}>
                                <Image
                                    style={styles.icon}
                                    source={require('../../../../assets/Icones/Carro.png')}
                                />
                            </Pressable>
                        </View>

                        <View style={styles.inputC}>
                            <TextInput
                                style={styles.input}
                                onFocus={() => setIsFocusedA(true)}
                                onBlur={() => setIsFocusedA(false)}
                                placeholder={isFocusedA ? '' : 'Digite seu Número'}
                                value={numero}
                                onChangeText={setNumero}
                                cursorColor="#fff"
                                placeholderTextColor="#fff"
                            />
                            <Pressable style={styles.icons}>
                                <Image
                                    style={styles.icon}
                                    source={require('../../../../assets/Icones/Casa.png')}
                                />
                            </Pressable>
                        </View>

                        <View style={[styles.inputC, { flexDirection: 'column' }]}>
                            <View style={[styles.bots, { flexDirection: 'row' }]}>
                                <Pressable
                                    onPress={() => navigation.navigate('Etapa2', { nomeP, emailP, dataN, estadoP, cepP, bairroP, numP: numero, photoUriP, senhaP, senhaCP })}
                                    style={[styles.proximo1, { backgroundColor: '#339989ff' }]}
                                >
                                    <Text style={styles.textoP}>Voltar</Text>
                                </Pressable>

                                <Pressable
                                    onPress={() => navigation.navigate('Etapa4', { nomeP, emailP, dataN, estadoP, cepP, bairroP, numP: numero, photoUriP, senhaP, senhaCP })}
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

                <StatusBar style="auto" hidden={true} />
            </View>
        </KeyboardAvoidingView>
    );
}
