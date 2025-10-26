import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffafbff',
  },
  map: {
    flex: 1,
    width: '100%',
  },
  // Loading Styles
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fffafbff',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  
  // Modal Styles
  contModa: {
    flex: 1,
    width: '100%',
    alignItems: "center",
    justifyContent: 'center',
    padding: 20,
  },
  conteudo: {
    flex: 0.8,
    backgroundColor: "white",
    width: "90%",
    maxHeight: "80%",
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#f8f9fa',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: "center",
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  modalBody: {
    flex: 1,
  },
  marketImage: {
    width: '100%',
    height: 150,
  },
  infoContainer: {
    padding: 20,
  },
  distanciaContainer: {
    backgroundColor: '#e8f4fd',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  distanciaLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 5,
  },
  distanciaValor: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginTop: 12,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  modalFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  actionButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  voltC: {
    position: 'absolute',
    top: width*2,
    left: width/100,
    width: "100%",
    height: "10%",
    alignItems: 'center',
    zIndex: 1000,
  },

  voltar: {
    backgroundColor: "#007AFF",
    width: "50%",
    height: "50%",
    alignItems: 'center',
    justifyContent: "center",
    borderRadius: 10
  },
  textVolt: {
    color: "white",
    fontSize: width/20,
    fontWeight: "bold"
  }
});