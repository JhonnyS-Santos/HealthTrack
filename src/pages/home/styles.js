import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  // Estilos existentes mantidos...
  container: {
    flex: 1,
    backgroundColor: '#fffafbff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  container2: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 10,
  },
  navbar: {
    width: '100%',
    flex: 0.2,
    top: '-10%',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    paddingTop: '13%',
    borderRadius: 20,
    padding: '2%',
    backgroundColor: '#7de2d1ff'
  },
  numerosAd: {
    flex: 0.7,
    width: "90%",
  }, 
  itensModal: {
    width: '100%',
    height: '20%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tamanhoIcone: {
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
    marginBottom: '9%',
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
  botoes: {
    borderWidth: 1,
    width: '90%',
    height: '90%',
    borderRadius: 5
  },
  
  
  modalOverlay: {
    width: '100%', 
    height: '100%', 
    alignItems: 'flex-end', 
    justifyContent: 'center',
  },
  blurContainer: {
    flex: 1,
    width: "100%", 
    height: "100%",
    alignItems:'center', 
    justifyContent:'center',
    display:'flex',
    flexDirection:'column' 

  },
   blurContainer2: {
    flex: 1,
    width: "100%", 
    height: "100%",
    justifyContent:'flex-end'
   

  },
  sidebar: {
    flex: 1,
    width: width * 0.75,
    backgroundColor: "#339989ff",
    justifyContent: "space-between",
    borderBottomLeftRadius: 25,
    borderTopLeftRadius: 25,
    shadowColor: '#131515',
    shadowOffset: { 
      width: -4, 
      height: 0 
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 25,
    borderLeftWidth: 3,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderLeftColor: '#7de2d1ff',
    borderTopColor: '#7de2d1ff',
    borderBottomColor: '#7de2d1ff',
    overflow: 'hidden',
  },
  sidebarHeader: {
    paddingTop: 60,
    paddingHorizontal: 25,
    paddingBottom: 20,
  },
  sidebarTitle: {
    color: '#fffafbff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  headerLine: {
    height: 3,
    backgroundColor: '#7de2d1ff',
    borderRadius: 2,
    width: '40%',
  },
  menuItems: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 15,
    borderRadius: 16,
    marginVertical: 6,
    backgroundColor: 'rgba(125, 226, 209, 0.1)',
  },
  menuItemPressed: {
    backgroundColor: 'rgba(125, 226, 209, 0.25)',
    transform: [{ scale: 0.98 }],
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  profileIcon: {
    backgroundColor: 'rgba(125, 226, 209, 0.2)',
  },
  supportIcon: {
    backgroundColor: 'rgba(255, 193, 7, 0.2)',
  },
  termsIcon: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
  },
  settingsIcon: {
    backgroundColor: 'rgba(33, 150, 243, 0.2)',
  },
  logoutIcon: {
    backgroundColor: 'rgba(244, 67, 54, 0.2)',
  },
  menuIcon: {
    width: 24,
    height: 24,
    tintColor: '#fffafbff',
  },
  menuText: {
    color: '#fffafbff',
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  logoutText: {
    color: '#ffebee',
  },
  menuArrow: {
    color: 'rgba(255, 250, 251, 0.7)',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  sidebarFooter: {
    padding: 25,
    alignItems: 'center',
    borderTopWidth: 2,
    borderTopColor: 'rgba(125, 226, 209, 0.3)',
  },
  footerText: {
    color: 'rgba(255, 250, 251, 0.6)',
    fontSize: 14,
    fontWeight: '500',
  },

  // Estilos para o Modal
 
  
  modalBackground: {
    flex: 1,
    width: '100%', 
    height: '100%', 
    alignItems: 'center', 
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Card principal do perfil
  perfilCard: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#339989ff',
    borderRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 25,
    shadowColor: '#131515',
    shadowOffset: { 
      width: 0, 
      height: 20 
    },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 15,
    borderWidth: 2,
    borderColor: '#7de2d1ff',
  },

  // Cabeçalho do perfil
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
    paddingBottom: 25,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(125, 226, 209, 0.4)',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#7de2d1ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fffafbff',
    shadowColor: '#131515',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  
  onlineIndicator: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4CAF50',
    borderWidth: 3,
    borderColor: '#339989ff',
  },
  userName: {
    color: '#fffafbff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  userEmail: {
    color: 'rgba(255, 250, 251, 0.8)',
    fontSize: 16,
    textAlign: 'center',
  },

  // Seção de opções
  optionsSection: {
    marginBottom: 25,
    backgroundColor: 'rgba(125, 226, 209, 0.15)',
    borderRadius: 20,
    padding: 5,
    borderWidth: 1,
    borderColor: 'rgba(125, 226, 209, 0.3)',
  },
  optionButton: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginVertical: 3,
  },
  optionPressed: {
    backgroundColor: 'rgba(125, 226, 209, 0.3)',
    transform: [{ scale: 0.98 }],
  },
  optionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionText: {
    color: '#fffafbff',
    fontSize: 18,
    fontWeight: '600',
  },
  optionArrow: {
    color: 'rgba(255, 250, 251, 0.7)',
    fontSize: 24,
    fontWeight: 'bold',
  },

  // Seção de ações
  actionsSection: {
    gap: 12,
  },
  secondaryButton: {
    backgroundColor: 'rgba(125, 226, 209, 0.2)',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#7de2d1ff',
  },
  secondaryPressed: {
    backgroundColor: 'rgba(125, 226, 209, 0.4)',
    transform: [{ scale: 0.98 }],
  },
  secondaryText: {
    color: '#fffafbff',
    fontSize: 17,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: 'rgba(199, 2, 2, 0.9)',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#c70202',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  deletePressed: {
    backgroundColor: 'rgba(160, 0, 0, 0.9)',
    transform: [{ scale: 0.98 }],
  },
  deleteText: {
    color: '#fffafbff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  // Modal de Editar Perfil
editProfileModal: {
  backgroundColor: '#fffafbff',
  marginHorizontal: 20,
  borderRadius: 20,
  overflow: 'hidden',
  maxHeight: '100%',
 
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 10,
  },
  shadowOpacity: 0.3,
  shadowRadius: 20,
  elevation: 10,
},

// Header do Modal
editProfileHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 25,
  paddingVertical: 20,
  backgroundColor: '#339989ff',
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
},
editProfileTitle: {
  fontSize: 22,
  fontWeight: 'bold',
  color: '#fffafbff',
  fontFamily: 'Roboto',
},
closeButton: {
  width: 32,
  height: 32,
  borderRadius: 16,
  backgroundColor: '#7de2d1ff',
  justifyContent: 'center',
  alignItems: 'center',
},
closeButtonText: {
  fontSize: 20,
  color: '#339989ff',
  fontWeight: 'bold',
  lineHeight: 22,
},

// Formulário
editProfileForm: {
  padding: 25,
  maxHeight: '70%',
},
inputGroup: {
  marginBottom: 20,
},
inputLabel: {
  fontSize: 16,
  fontWeight: '600',
  color: '#339989ff',
  marginBottom: 8,
  fontFamily: 'Roboto',
},
textInput: {
  borderWidth: 2,
  borderColor: '#7de2d1ff',
  borderRadius: 12,
  paddingHorizontal: 16,
  paddingVertical: 12,
  fontSize: 16,
  color: '#339989ff',
  backgroundColor: '#fffafbff',
  fontFamily: 'Roboto',
},
selectContainer: {
  borderWidth: 2,
  borderColor: '#7de2d1ff',
  borderRadius: 12,
  overflow: 'hidden',
  backgroundColor: '#fffafbff',
},
picker: {
  height: 50,
  color: '#339989ff',
},
rowInputs: {
  flexDirection: 'row',
  justifyContent: 'space-between',
},
halfInput: {
  width: '48%',
},

// Botões de Ação
editProfileActions: {
  marginTop:height*0.02,
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingHorizontal: 25,
  paddingVertical: 20,
  borderTopWidth: 1,
  borderTopColor: '#7de2d133',
  backgroundColor: '#fffafbff',
},
actionButton: {
  flex: 1,
  paddingVertical: 15,
  borderRadius: 12,
  justifyContent: 'center',
  alignItems: 'center',
  marginHorizontal: 5,
},
cancelButton: {
  backgroundColor: 'transparent',
  borderWidth: 2,
  borderColor: '#339989ff',
},
saveButton: {
  backgroundColor: '#339989ff',
  borderWidth: 2,
  borderColor: '#339989ff',
},
cancelButtonText: {
  color: '#339989ff',
  fontSize: 16,
  fontWeight: '600',
  fontFamily: 'Roboto',
},
saveButtonText: {
  color: '#fffafbff',
  fontSize: 16,
  fontWeight: '600',
  fontFamily: 'Roboto',
},

// Estados pressionados
cancelButtonPressed: {
  backgroundColor: '#33998911',
},
saveButtonPressed: {
  backgroundColor: '#2a7a6d',
},


  
});