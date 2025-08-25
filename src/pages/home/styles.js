import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fffafbff',
      alignItems: 'center',
      justifyContent: 'center',
      gap:10 ,
     
    },
    navbar:{ 
      borderWidth:1, 
      width:'100%',
      flex:0.2
      , top:'-10%',
      justifyContent:'center', 
      alignItems:'center', 
      display:'flex', 
      flexDirection:'row',
      gap:10, 
      paddingTop:'13%'

    }, 
    

    numerosAd: {
    flex: 0.7,
    width: "90%",
    
    
  },

  flatlist: {
    width: "100%",
    flex: 1,
    padding: "8%",
    paddingBottom: "140%",
    marginBottom: "130%",
    
  },

  bera: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom:'9%',
    marginHorizontal: 4,
    marginVertical: 5,
    
    
  },

  adv: {
    height: "100%",
    width: "100%",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  texto1: {
    fontSize: Dimensions.get("window").width * 0.07,
    fontWeight: "600",
    textAlignVertical: "center",
    textAlign: "center",
    includeFontPadding: false,
  }, 
  botoes:{ 
    borderWidth:1,
    width:'90%',
    height:'90%',
    borderRadius:5
  }
  
  });