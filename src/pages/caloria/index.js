import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Image,
  ActivityIndicator,
  Modal,
  ScrollView,
  Keyboard,
} from "react-native";
import { useState, useEffect } from "react";
import styles from "./styles";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default function Caloria() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const popularTerms = [
    "apple",
    "banana",
    "bread",
    "chicken",
    "pizza",
    "pasta",
    "rice",
    "milk",
    "cheese",
    "yogurt",
    "egg",
    "fish",
    "beef",
    "potato",
  ];

  const APP_ID = "10df2edd";
  const APP_KEY = "0fcf26f90b3722cb7f07e2e043b4790c";

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    fetchInitialProducts();
  }, []);

  const fetchInitialProducts = async () => {
    setLoading(true);
    const randomTerm =
      popularTerms[Math.floor(Math.random() * popularTerms.length)];
    try {
      const response = await axios.get(
        "https://trackapi.nutritionix.com/v2/search/instant",
        {
          params: {
            query: randomTerm,
            branded: true,
            common: true,
          },
          headers: {
            "x-app-id": APP_ID,
            "x-app-key": APP_KEY,
            "x-remote-user-id": "0",
          },
        }
      );

      // CORREÇÃO: Combinar resultados branded e common
      let allProducts = [];
      if (response.data.branded && response.data.branded.length > 0) {
        allProducts = [...allProducts, ...response.data.branded];
      }
      if (response.data.common && response.data.common.length > 0) {
        allProducts = [...allProducts, ...response.data.common];
      }
      setProducts(allProducts);
    } catch (error) {
      console.error("Erro ao carregar produtos iniciais:", error);
      setError("Não foi possível carregar os produtos.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    Keyboard.dismiss();

    if (!query.trim()) {
      fetchInitialProducts();
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        "https://trackapi.nutritionix.com/v2/search/instant",
        {
          params: {
            query: query,
            branded: true,
            common: true,
          },
          headers: {
            "x-app-id": APP_ID,
            "x-app-key": APP_KEY,
            "x-remote-user-id": "0",
          },
        }
      );

      // CORREÇÃO: Combinar resultados branded e common
      let allProducts = [];
      if (response.data.branded && response.data.branded.length > 0) {
        allProducts = [...allProducts, ...response.data.branded];
      }
      if (response.data.common && response.data.common.length > 0) {
        allProducts = [...allProducts, ...response.data.common];
      }

      if (allProducts.length > 0) {
        setProducts(allProducts);
      } else {
        setProducts([]);
        setError("Nenhum produto encontrado. Tente outro termo de busca.");
      }
    } catch (error) {
      console.error("Erro na pesquisa:", error);
      setError("Erro ao buscar produtos. Verifique sua conexão.");
    } finally {
      setLoading(false);
    }
  };

  const fetchProductDetails = async (item) => {
    setDetailsLoading(true);
    setModalVisible(true);

    try {
      if (item.nix_item_id) {
        const response = await axios.get(
          "https://trackapi.nutritionix.com/v2/search/item",
          {
            params: {
              nix_item_id: item.nix_item_id,
            },
            headers: {
              "x-app-id": APP_ID,
              "x-app-key": APP_KEY,
              "x-remote-user-id": "0",
            },
          }
        );

        if (response.data.foods && response.data.foods.length > 0) {
          setProductDetails(response.data.foods[0]);
        } else {
          setProductDetails(item);
        }
      } else {
        setProductDetails(item);
      }
    } catch (error) {
      console.error("Erro ao buscar detalhes:", error);
      setProductDetails(item);
    } finally {
      setDetailsLoading(false);
    }
  };

  const renderProductItem = ({ item }) => (
    <Pressable onPress={() => fetchProductDetails(item)}>
      <View style={styles.productItem}>
        {item.photo && item.photo.thumb ? (
          <Image
            source={{ uri: item.photo.thumb }}
            style={styles.productImage}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.productImage, styles.placeholderImage]}>
            {/* CORREÇÃO: Texto dentro de componente Text */}
            <Text style={styles.placeholderText}>Imagem</Text>
          </View>
        )}

        <View style={styles.productInfo}>
          <Text style={styles.productName} numberOfLines={2}>
            {item.food_name || "Nome não disponível"}
          </Text>
          <Text style={styles.brandName} numberOfLines={1}>
            {item.brand_name || "Marca não especificada"}
          </Text>

          {item.nf_calories && (
            <Text style={styles.calories}>{item.nf_calories} calorias</Text>
          )}

          {item.serving_qty && item.serving_unit && (
            <Text style={styles.serving}>
              Porção: {item.serving_qty} {item.serving_unit}
            </Text>
          )}
        </View>
      </View>
    </Pressable>
  );

  const ItemSeparator = () => <View style={styles.separator} />;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.searchContainer}
      >
        <View style={styles.searchBox}>
        <Pressable
            style={({ pressed }) => [
              styles.botao,
              {backgroundColor: "#D10000", marginRight: "2%",},
              pressed && styles.botaoPressionado, 
            ]}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={[styles.textoBotao, {color: "#fff",}]}>Voltar</Text>
          </Pressable>
          <TextInput
            style={styles.input}
            placeholder="Digite para pesquisar"
            placeholderTextColor="rgba(255, 250, 251, 0.7)"
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={handleSearch}
          />
          <Pressable
            style={({ pressed }) => [
              styles.botao,
              pressed && styles.botaoPressionado,
            ]}
            onPress={handleSearch}
          >
            <Text style={styles.textoBotao}>Buscar</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#7de2d1" />
          <Text style={styles.loadingText}>Buscando produtos...</Text>
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Pressable onPress={fetchInitialProducts} style={styles.retryButton}>
            <Text style={styles.retryButtonText}>Recarregar Produtos</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={products}
          renderItem={renderProductItem}
          keyExtractor={(item, index) => item.nix_item_id || `item-${index}`}
          ItemSeparatorComponent={ItemSeparator}
          ListEmptyComponent={
            <View style={styles.centerContainer}>
              <Text style={styles.emptyText}>Nenhum produto disponível</Text>
            </View>
          }
          contentContainerStyle={[
            products.length === 0 && styles.emptyListContainer,
            keyboardVisible && { paddingBottom: 300 },
          ]}
          keyboardShouldPersistTaps="handled"
        />
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {detailsLoading ? (
              <View style={styles.modalLoading}>
                <ActivityIndicator size="large" color="#7de2d1" />
                <Text style={styles.modalLoadingText}>
                  Carregando informações...
                </Text>
              </View>
            ) : productDetails ? (
              <ScrollView>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>
                    {productDetails.food_name || "Produto"}
                  </Text>
                  <Pressable
                    style={styles.closeButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.closeButtonText}>X</Text>
                  </Pressable>
                </View>

                {productDetails.photo && productDetails.photo.thumb && (
                  <Image
                    source={{ uri: productDetails.photo.thumb }}
                    style={styles.modalImage}
                    resizeMode="cover"
                  />
                )}

                <View style={styles.detailsSection}>
                  <Text style={styles.sectionTitle}>Informações Básicas</Text>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Marca:</Text>
                    <Text style={styles.detailValue}>
                      {productDetails.brand_name || "Não especificada"}
                    </Text>
                  </View>

                  {productDetails.serving_qty &&
                    productDetails.serving_unit && (
                      <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>
                          Tamanho da porção:
                        </Text>
                        <Text style={styles.detailValue}>
                          {productDetails.serving_qty}{" "}
                          {productDetails.serving_unit}
                        </Text>
                      </View>
                    )}

                  {productDetails.nf_calories && (
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Calorias:</Text>
                      <Text style={[styles.detailValue, styles.caloriesValue]}>
                        {productDetails.nf_calories} kcal
                      </Text>
                    </View>
                  )}
                </View>

                <View style={styles.detailsSection}>
                  <Text style={styles.sectionTitle}>
                    Informações Nutricionais
                  </Text>

                  {productDetails.nf_total_fat !== undefined && (
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Gorduras Totais:</Text>
                      <Text style={styles.detailValue}>
                        {productDetails.nf_total_fat}g
                      </Text>
                    </View>
                  )}

                  {productDetails.nf_saturated_fat !== undefined && (
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>
                        Gorduras Saturadas:
                      </Text>
                      <Text style={styles.detailValue}>
                        {productDetails.nf_saturated_fat}g
                      </Text>
                    </View>
                  )}

                  {productDetails.nf_cholesterol !== undefined && (
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Colesterol:</Text>
                      <Text style={styles.detailValue}>
                        {productDetails.nf_cholesterol}mg
                      </Text>
                    </View>
                  )}

                  {productDetails.nf_sodium !== undefined && (
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Sódio:</Text>
                      <Text style={styles.detailValue}>
                        {productDetails.nf_sodium}mg
                      </Text>
                    </View>
                  )}

                  {productDetails.nf_total_carbohydrate !== undefined && (
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>
                        Carboidratos Totais:
                      </Text>
                      <Text style={styles.detailValue}>
                        {productDetails.nf_total_carbohydrate}g
                      </Text>
                    </View>
                  )}

                  {productDetails.nf_dietary_fiber !== undefined && (
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Fibra Alimentar:</Text>
                      <Text style={styles.detailValue}>
                        {productDetails.nf_dietary_fiber}g
                      </Text>
                    </View>
                  )}

                  {productDetails.nf_sugars !== undefined && (
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Açúcares:</Text>
                      <Text style={styles.detailValue}>
                        {productDetails.nf_sugars}g
                      </Text>
                    </View>
                  )}

                  {productDetails.nf_protein !== undefined && (
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Proteínas:</Text>
                      <Text style={styles.detailValue}>
                        {productDetails.nf_protein}g
                      </Text>
                    </View>
                  )}

                  {productDetails.nf_potassium !== undefined && (
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Potássio:</Text>
                      <Text style={styles.detailValue}>
                        {productDetails.nf_potassium}mg
                      </Text>
                    </View>
                  )}

                  {!productDetails.nf_total_fat &&
                    !productDetails.nf_saturated_fat &&
                    !productDetails.nf_cholesterol &&
                    !productDetails.nf_sodium &&
                    !productDetails.nf_total_carbohydrate &&
                    !productDetails.nf_dietary_fiber &&
                    !productDetails.nf_sugars &&
                    !productDetails.nf_protein &&
                    !productDetails.nf_potassium && (
                      <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>
                          Informações nutricionais:
                        </Text>
                        <Text style={styles.detailValue}>
                          Detalhes não disponíveis
                        </Text>
                      </View>
                    )}
                </View>
              </ScrollView>
            ) : (
              <View style={styles.modalLoading}>
                <Text style={styles.errorText}>
                  Erro ao carregar informações do produto.
                </Text>
                <Pressable
                  style={styles.retryButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.retryButtonText}>Fechar</Text>
                </Pressable>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}
