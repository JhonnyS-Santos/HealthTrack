import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container2: {
    flex: 1,
    backgroundColor: "#fffafbff", 
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
   
  },
  searchBox: {
    width: "100%",
    alignItems: "center",
  },
  input: {
    width: "100%",
    backgroundColor: "#fffafbff", 
    color: " #131515ff", 
    padding: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#7de2d1", 
    fontSize: 16,
    marginBottom: 15,
  },
  botao: {
    backgroundColor: "#339989", 
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  botaoPressionado: {
    backgroundColor: "#7de2d1", // tiffany blue
  },
  textoBotao: {
    color: "#fffafb", // snow
    fontSize: 16,
    fontWeight: "600",
  },
});
