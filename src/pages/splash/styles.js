import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffafbff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  imgs: {
    width: '100%',
    height: "100%",
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: '70%',
    height: '50%',
    alignItems: 'center',
    objectFit: 'contain',
    justifyContent: 'center',
  },

  load: {
    width: '20%',
    height: '10%',
    objectFit: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
    top: '15%',
  }
});
