import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import styles from './styles';

export default function Caloria() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    console.log("Pesquisando por:", query);
    // aqui você pode chamar sua API ou lógica de pesquisa
  };

  return (
    <KeyboardAvoidingView
      style={styles.container2}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar style="light" />

      <View style={styles.searchBox}>
        <TextInput
          style={styles.input}
          placeholder="Digite para pesquisar..."
          placeholderTextColor="#7de2d1" 
          value={query}
          onChangeText={setQuery}
        />
        <Pressable 
          style={({ pressed }) => [
            styles.botao,
            pressed && styles.botaoPressionado
          ]}
          onPress={handleSearch}
        >
          <Text style={styles.textoBotao}>Buscar</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
