import { StyleSheet, Dimensions } from "react-native";

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fffafbff',
      alignItems: 'center',
      justifyContent: 'center',
      gap:10 ,
     
    },
    container2: {
      flex: 1,
      
      
      alignItems: 'flex-end',
      justifyContent: 'center',
      gap:10 ,
      
    },
    navbar:{ 

      
      width:'100%',
      flex:0.2
      , top:'-10%',
      justifyContent:'center', 
      alignItems:'center', 
      display:'flex', 
      flexDirection:'row',
      gap:10, 
      paddingTop:'13%', 
      borderRadius:'5%',
      padding:'2%'
      ,backgroundColor:'#7de2d1ff'

    }, 
    

    numerosAd: {
    flex: 0.7,
    width: "90%",
    
    
  },itensModal:{ 
    width: '100%', 
    height: '20%', 
  
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  tamanhoIcone:{ 
    width: "55%", 
    height: "60%" 

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
  }, 
  container3: {
      flex: 1,
     
      alignItems: 'center',
      justifyContent: 'center',
      alignItems:'center',
      display:'flex', 
      flexDirection:'column',
      width:'100%'
     
    },
    perfil:{ 
        flex:0.5,
        borderWidth:1,
        width:'85%', 
        borderRadius:20, 
        justifyContent:'center', 
        alignItems:'center', 
        display:'flex', 
        backgroundColor:'#339989ff',
        flexDirection:'column'
    }, 
    itensPerfil:{
       
        flex:0.5,
        width:'100%', 
        justifyContent:'center', 
        alignItems:'center', 
        display:'flex', 
        flexDirection:'column',
        gap:5,
        
    },itensPerfil2:{
       
        flex:0.2,
        width:'100%', 
        justifyContent:'center', 
        alignItems:'center', 
        display:'flex', 
        flexDirection:'column',
        
        gap:20
       
    },
    itensPerfil3:{
       
        flex:0.4,
        width:'100%', 
        justifyContent:'center', 
        alignItems:'center', 
        display:'flex', 
        flexDirection:'column',

       
    },
    fotoPerfil:{ 
        borderWidth:1, 
        flex:0.9,
        width:'44%', 
        borderRadius:'50%',
        
    }, 
    nome:{ 
        color:'#fffafbff', 
        fontSize:22,
        width:'100%', 
        textAlign:'center',
    }, 
    itens2:{
        width:'100%', 
        borderTopWidth:1, 
    }, 
    texto:{
          color:'#fffafbff', 
          fontSize:20
    },
      botao: {
    backgroundColor: "#c70202ff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#131515",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  botaoPressionado: {
    backgroundColor: "#7de2d1", 
  },
  texto2: {
    color: "#fffafb", 
    fontSize: 15,
    fontWeight: "600",
  },
  
  });