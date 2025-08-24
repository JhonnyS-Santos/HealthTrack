import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

export default StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#339989ff',
  },

  conteudo: {
    width: '90%',
    height: '95%',
    backgroundColor: '#fffafbff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: width * 0.1,
  },

  tituloA: {
    flex: 0.2,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  titulo: {
    fontSize: width * 0.1,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#2b2c28ff',
  },

  subT: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#339989ff',
    fontFamily: 'Roboto',
  },

  inputs: {
    flex: 0.8,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  icons: {
    height: "100%",
    width: '20%',
    backgroundColor: '#969696',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: width * 0.04,
    borderBottomRightRadius: width * 0.04,
  },

  icon: {
    width: "80%",
    height: "60%",
    objectFit: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputC: {
    width: '100%',
    height: height * 0.075,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  input: {
    backgroundColor: '#969696',
    fontWeight: 'bold',
    width: '60%',
    height: '100%',
    borderTopLeftRadius: width * 0.04,
    borderBottomLeftRadius: width * 0.04,
    paddingLeft: '5%',
    fontSize: width * 0.05,
    fontFamily: 'Roboto',
    color: "white",
  },

  proximo: {
    width: '80%',
    backgroundColor: "#2B2C28",
    height: height * 0.07,
    top: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: width * 0.04,
  },

  textoP: {
    color: "white",
    fontWeight: 'bold',
    fontSize: width * 0.05,
    fontFamily: 'Roboto',
  },

  data: {
    backgroundColor: '#969696',
    height: '100%',
    width: '80%',
    borderRadius: width * 0.04,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  date: {
    fontSize: width * 0.05,
    color: "white",
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Roboto',
    width: '75%',
  },

  iconD: {
    width: '25%',
    height: '100%',
    justifyContent: 'center',
  },

  iconB: {
    objectFit: 'contain',
    width: '97%',
    height: "60%",
  },

  pergunta: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    top: '17%',
  },

  bots: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  proximo1: {
    width: '40%',
    backgroundColor: "#2B2C28",
    height: height * 0.07,
    top: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: width * 0.04,
  },

  foto: {
    width: '100%',
    height: '60%',
  },  

  contFT: {
    width: '100%',
    height: '70%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  botaoA: {
    width: '60%',
    height: '80%',
    borderRadius: width*1,
    alignItems: 'center',
    overflow: 'hidden', 
    justifyContent: 'center'
  },

  fotoI: {
    width: '100%',
    height: '100%', 
    borderRadius: width,
    resizeMode: 'cover', 
  },

  contGL: {
    width: '100%',
    height: '13%',
    flexDirection: 'row'
  },

  ladoEsquerdo: {
    width: '32%',
    height: '100%',
    alignItems: 'flex-end'
  },

  botaoC: {
    width: '50%',
    borderColor: 'red',
    marginRight: '10%',
  },

  gale: {
    width: '100%',
    height: '100%',
    objectFit: 'contain'
  },

  ladoDireito: {
    width: '68.8%',
    height: '100%',
    alignItems: 'flex-end'
  },

  botaoE: {
    width: '50%',
    height: '100%',
    justifyContent: 'flex-end',
  },

  del: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    
  },

  logoA: {
    width: '100%',
    flex: 0.4,
  },

  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  }
});