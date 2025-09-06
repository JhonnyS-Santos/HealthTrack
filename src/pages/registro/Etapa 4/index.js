import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
import styles from '../styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

export default function Etapa4() {
    const route = useRoute();
    const { nomeP = '', emailP = '', dataN = '', estadoP = '', cepP = '', bairroP = '', numP = '', photoUriP = '', senhaP, senhaCP, logP = '' } = route.params || {};
    const navigation = useNavigation();
    const [photoUri, setPhotoUri] = useState(null || photoUriP);
    const [fontsLoaded] = useFonts({
        Roboto: require('../../../../assets/Fontes/Roboto.ttf'),
    });

    // Função para solicitar permissões da câmera
    const requestCameraPermission = async () => {
        try {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            return status === 'granted';
        } catch (error) {
            console.error('Erro ao solicitar permissão da câmera:', error);
            return false;
        }
    };

    // Função para tirar foto usando a câmera
    const takePhoto = async () => {
        try {

            const hasPermission = await requestCameraPermission();
            if (!hasPermission) {
                alert('Permissão da câmera negada!');
                return;
            }

            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8,
                cameraType: ImagePicker.CameraType.back,
            });

            console.log('Resultado da câmera:', result);

            if (!result.canceled && result.assets && result.assets.length > 0) {
                setPhotoUri(result.assets[0].uri);
            }

        } catch (error) {
            alert('Erro ao acessar a câmera!');
        }
    };

    // Função para escolher foto da galeria
    const pickImageFromGallery = async () => {
        try {

            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Permissão para acessar a galeria negada!');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8,
            });

            console.log('Resultado da galeria:', result); // Debug

            if (!result.canceled && result.assets && result.assets.length > 0) {
                setPhotoUri(result.assets[0].uri);
                console.log('URI da imagem:', result.assets[0].uri); // Debug
            }

        } catch (error) {
            console.error('Erro ao escolher imagem:', error);
            alert('Erro ao acessar a galeria!');
        }
    };

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
                        <Text style={styles.titulo}>Foto</Text>
                        <Text style={styles.subT}>Etapa 4 (Opcional)</Text>
                    </View>

                    <View style={styles.inputs}>

                        <View style={styles.foto}>
                            <View style={styles.contFT}>
                                <Pressable onPress={takePhoto} style={styles.botaoA}><Image style={styles.fotoI} source={photoUri ? {uri: photoUri} : require('../../../../assets/Icones/Camera.png')}></Image></Pressable>
                            </View>

                            <View style={styles.contGL}>
                                <View style={styles.ladoDireito}>
                                    <Pressable onPress={() => setPhotoUri(null)} style={styles.botaoE}><Image source={photoUri?require('../../../../assets/Icones/Deletar.png') : ''} style={styles.del}></Image></Pressable>
                                </View>

                                <View style={styles.ladoEsquerdo}>
                                    <Pressable onPress={pickImageFromGallery} style={styles.botaoC}><Image source={photoUri ? '' : require('../../../../assets/Icones/Pasta.png')} style={styles.gale}></Image></Pressable>
                                </View>

                            </View>


                        </View>




                        <View style={[styles.inputC, { flexDirection: 'column' }]}>
                            <View style={[styles.bots, { flexDirection: 'row' }]}>
                                <Pressable
                                    onPress={() =>
                                        navigation.navigate('Etapa3', { nomeP, emailP, dataN, estadoP, cepP, bairroP, numP, photoUriP: photoUri, senhaP, senhaCP })
                                    }
                                    style={[styles.proximo1, { backgroundColor: '#339989ff' }]}
                                >
                                    <Text style={styles.textoP}>Voltar</Text>
                                </Pressable>

                                <Pressable
                                    onPress={() => {
                                        navigation.navigate('Etapa5', {
                                            nomeP, emailP, dataN, estadoP, cepP, bairroP, numP, photoUriP: photoUri, senhaP, senhaCP, logP
                                        });
                                    }}
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

                    <StatusBar style="auto" hidden={true} />
                </View>
            </View>
        </KeyboardAvoidingView >
    );
}