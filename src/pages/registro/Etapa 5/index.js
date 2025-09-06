import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable, KeyboardAvoidingView, Platform, Image, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
import styles from '../styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from "../../../../api/axios";
import * as ImagePicker from 'expo-image-picker';
import { Alert } from "react-native";

export default function Etapa5() {
    const route = useRoute();
    const { nomeP = '', emailP = '', dataN = '', estadoP = '', cepP = '', bairroP = '', numP = '', photoUriP, senhaP, senhaCP, logP = '' } = route.params || {};
    const navigation = useNavigation();
    const [photoUri, setPhotoUri] = useState(null || photoUriP);
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [senha, setSenha] = useState('' || senhaP);
    const [senhaC, setSenhaC] = useState('' || senhaCP);
    const [isFocusedB, setIsFocusedB] = useState(false);
    const [isFocusedC, setIsFocusedC] = useState(false);


    const [fontsLoaded] = useFonts({
        Roboto: require('../../../../assets/Fontes/Roboto.ttf'),
    });

    const registrar = async () => {
        if (senha === '' || senhaC === '') {
            Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
            return;
        }

        if (senha !== senhaC) {
            Alert.alert('Atenção', 'As senhas não coincidem.');
            return;
        }

        if (senha.length < 4) {
            Alert.alert('Atenção', 'A senha deve ter pelo menos 4 caracteres.');
            return;
        }

        try {
            // Converter a data para formato ISO (YYYY-MM-DD)
            let dataNISO;

            if (dataN) {
                if (dataN instanceof Date) {
                    dataNISO = dataN.toISOString().split('T')[0];
                }
                else if (dataN.includes('/')) {
                    const [day, month, year] = dataN.split('/');
                    dataNISO = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
                }
                else {
                    const dateObj = new Date(dataN);
                    if (!isNaN(dateObj.getTime())) {
                        dataNISO = dateObj.toISOString().split('T')[0];
                    }
                }
            }

            const novoUsuario = {
                nomeUsers: nomeP,
                emailUsers: emailP,
                dataNUsers: dataNISO,
                estadoUsers: estadoP,
                cepUsers: cepP,
                bairroUsers: bairroP,
                ruaUsers: logP,
                numUsers: numP,
                // fotoUsers: photoUri, 
                senhaUsers: senhaC
            };

            const response = await api.post("/users", novoUsuario);
            Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
            navigation.navigate('Login');
        } catch (error) {
            console.log("Erro completo:", error.response?.data || error.message);

            if (error.response?.data?.message) {
                Alert.alert("Erro", error.response.data.message);
            } else if (error.response?.data?.errors) {
                const errors = Object.values(error.response.data.errors).flat();
                Alert.alert("Erro de validação", errors.join('\n'));
            } else {
                Alert.alert("Erro", "Não foi possível cadastrar o usuário.");
            }
        }
    };

    // const testConnection = async () => {
    //     try {
    //         const response = await api.get("/test");
    //         console.log("Conexão bem-sucedida:", response.data);
    //     } catch (error) {
    //         console.log("Falha na conexão:", error.message);
    //     }
    // };

    useEffect(() => {
        NavigationBar.setVisibilityAsync('hidden');
        NavigationBar.setBackgroundColorAsync('#000000ff');
    }, []);

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
                        <Text style={styles.titulo}>Senha</Text>
                        <Text style={styles.subT}>Etapa 5 (Final)</Text>
                    </View>

                    <View style={styles.inputs}>


                        <View style={styles.inputC}>
                            <TextInput style={styles.input} onFocus={() => setIsFocusedB(true)}
                                onBlur={() => setIsFocusedB(false)} placeholder={isFocusedB ? '' : 'Digite sua Senha'}
                                value={senha} onChangeText={setSenha} cursorColor="#fff" placeholderTextColor="#fff" secureTextEntry={!mostrarSenha} />
                            <Pressable style={styles.icons} onPress={() => setMostrarSenha(!mostrarSenha)}>
                                <Image style={styles.icon} source={
                                    mostrarSenha
                                        ? require('../../../../assets/Icones/OlhoA.png')
                                        : require('../../../../assets/Icones/OlhoB.png')
                                }></Image>
                            </Pressable>
                        </View>

                        <View style={styles.inputC}>
                            <TextInput style={styles.input} onFocus={() => setIsFocusedC(true)}
                                onBlur={() => setIsFocusedC(false)} placeholder={isFocusedC ? '' : 'Confirme a Senha'}
                                value={senhaC} onChangeText={setSenhaC} cursorColor="#fff" placeholderTextColor="#fff" secureTextEntry={!mostrarSenha} />
                            <Pressable style={styles.icons} onPress={() => setMostrarSenha(!mostrarSenha)}>
                                <Image style={styles.icon} ></Image>
                            </Pressable>
                        </View>



                        <View style={[styles.inputC, { flexDirection: 'column' }]}>
                            <View style={[styles.bots, { flexDirection: 'row' }]}>
                                <Pressable
                                    onPress={() =>
                                        navigation.navigate('Etapa4', { nomeP, emailP, dataN, estadoP, cepP, bairroP, numP, photoUri, senhaP: senha, senhaCP: senhaC, logP })
                                    }
                                    style={[styles.proximo1, { backgroundColor: '#339989ff' }]}
                                >
                                    <Text style={styles.textoP}>Voltar</Text>
                                </Pressable>

                                <Pressable
                                    style={[styles.proximo1]} onPress={() => registrar()}
                                >
                                    <Text style={styles.textoP}>Registrar-se</Text>
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

                    <StatusBar style="auto" hidden={true} />
                </View>
            </View>
        </KeyboardAvoidingView >
    );
}