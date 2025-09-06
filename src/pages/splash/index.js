import { StatusBar } from 'expo-status-bar';
import { Text, View, Image } from 'react-native';
import { useState, useEffect } from "react";
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


export default function Splash() {
  const navigation = useNavigation()
  useEffect(() => {
    setTimeout(async () => {
      try {
        const login = await AsyncStorage.getItem('userId');
        if (login === null) {
          navigation.navigate('Login');
        } else {
          navigation.navigate('Home');
        }
      } catch (error) {
        console.error('Erro ao recuperar login:', error);
        navigation.navigate('Login');
      }
    }, 1000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.imgs}>

        <Image style={styles.logo} source={require('../../../assets/Logo.png')}></Image>
        <Image style={styles.load} source={require('./img/Load.gif')}></Image>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}