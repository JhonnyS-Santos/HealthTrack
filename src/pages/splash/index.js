import { StatusBar } from 'expo-status-bar';
import { Text, View, Image } from 'react-native';
import styles from './styles';
export default function Splash() {
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