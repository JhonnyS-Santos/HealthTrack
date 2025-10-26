import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  Pressable,
  Image,
  FlatList,
  Modal,
  ActivityIndicator,
  Dimensions,
  TextInput,
} from "react-native";
import { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import * as NavigationBar from "expo-navigation-bar";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import api from "../../../api/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlurView } from "expo-blur";
import { Picker } from "@react-native-picker/picker";

// Componente de imagem com loading
const ImageWithLoader = ({ source, style, onError, ...props }) => {
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <View style={[style, { justifyContent: "center", alignItems: "center" }]}>
      {/* Loading enquanto carrega */}
      {loading && (
        <View
          style={[
            style,
            {
              position: "absolute",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f0f0f0",
              borderRadius: style.borderRadius || 0,
            },
          ]}
        >
          <ActivityIndicator size="small" color="#999" />
        </View>
      )}

      {/* Imagem principal */}
      <Image
        source={source}
        style={[
          style,
          {
            opacity: loading ? 0 : 1,
            position: loading ? "absolute" : "relative",
          },
        ]}
        onLoadStart={() => {
          setLoading(true);
          setHasError(false);
        }}
        onLoad={() => {
          setLoading(false);
          setHasError(false);
          console.log("Imagem carregada com sucesso");
        }}
        onLoadEnd={() => {
          setLoading(false);
        }}
        onError={(e) => {
          console.log("Erro ao carregar imagem:", e.nativeEvent);
          setLoading(false);
          setHasError(true);
          if (onError) onError(e);
        }}
        {...props}
      />

      {/* Fallback em caso de erro */}
      {hasError && (
        <Image
          source={require("../../../assets/Icones/UserRed.png")}
          style={[style, { position: "absolute" }]}
          resizeMode="cover"
        />
      )}
    </View>
  );
};

export default function Home() {
  const [id, setId] = useState("");
  const [user, setUser] = useState("");
  const width = Dimensions.get("screen").width;
  const height = Dimensions.get("screen").height;
  const [verM, setVerM] = useState(false);
  const [verM2, setVerM2] = useState(false);
  const [verM3, setVerM3] = useState(false); // Modal de editar perfil
  const [imageError, setImageError] = useState(false);
  const [animacao, setAnimacao] = useState("fadeInRight");

  // Estados para edição do perfil
  const [editUser, setEditUser] = useState({
    nomeUsers: "",
    emailUsers: "",
    senhaUsers: "",
    tipoSUsers: "",
    alturaUsers: "",
    pesoUsers: "",
  });
  const [loadingEdit, setLoadingEdit] = useState(false);

  const lerId = async () => {
    try {
      const storedId = await AsyncStorage.getItem("userId");
      if (storedId !== null) {
        setId(storedId);
        console.log("ID do usuário carregado com sucesso:", storedId);
        return storedId;
      }
    } catch (error) {
      console.log("Erro ao carregar ID do usuário:", error);
    }
  };

  useEffect(() => {
    const buscarUsuario = async () => {
      try {
        const userId = await lerId();

        if (!userId) {
          console.log("Nenhum ID de usuário encontrado");
          logout();
          return;
        }

        const response = await api.get("/users");
        const usuarioEncontrado = response.data.find(
          (user) => user.id == userId
        );

        if (usuarioEncontrado) {
          setUser(usuarioEncontrado);
          console.log("Usuário encontrado:", usuarioEncontrado);
        } else {
          console.log("Usuário não encontrado");
          logout();
        }
      } catch (error) {
        console.log(
          "Erro ao buscar usuário:",
          error.response?.data || error.message
        );
        logout();
      }
    };
    buscarUsuario();
  }, []);

  // Carrega dados do usuário quando o modal de edição abre
  useEffect(() => {
    if (verM3 && user) {
      setEditUser({
        nomeUsers: user.nomeUsers || "",
        emailUsers: user.emailUsers || "",
        senhaUsers: "", // Senha não é preenchida por segurança
        tipoUsers: user.tipoUsers || "",
        alturaUsers: user.alturaUsers || "",
        pesoUsers: user.pesoUsers || "",
      });
    }
  }, [verM3, user]);

  const logout = () => {
    AsyncStorage.removeItem("userId")
      .then(() => {
        console.log("Logout realizado com sucesso");
        navigation.navigate("Splash");
      })
      .catch((error) => {
        console.log("Erro ao realizar logout:", error);
      });
  };

  // Função para atualizar o perfil
  const atualizarPerfil = async () => {
    try {
      setLoadingEdit(true);

      
      const dadosAtualizacao = Object.fromEntries(
        Object.entries(editUser).filter(([_, value]) => value !== "")
      );

      const response = await api.put(`/users/${id}`, dadosAtualizacao);

      if (response.status === 200) {
        // Atualiza o usuário localmente
        setUser({ ...user, ...dadosAtualizacao });
        setVerM3(false);
        alert("Perfil atualizado com sucesso!");
      }
    } catch (error) {
      console.log(
        "Erro ao atualizar perfil:",
        error.response?.data || error.message
      );
      alert("Erro ao atualizar perfil. Tente novamente.");
    } finally {
      setLoadingEdit(false);
    }
  };

  const numeros = [
    { id: 1, img: require("./img/Primeiro.png"), nav: () => navigation.navigate('Caloria')  },
    { id: 2, img: require("./img/Segundo.png"), nav: () => navigation.navigate('Mapa') },
    { id: 3, img: require("../../../assets/Icones/Pasta.png"), nav: () => navigation.navigate('Home') },
    { id: 4, img: require("../../../assets/Icones/Pasta.png"), nav: () => navigation.navigate('Home') },
    { id: 5, img: require("../../../assets/Icones/Pasta.png"), nav: () => navigation.navigate('Home') },
    { id: 6, img: require("../../../assets/Icones/Pasta.png"), nav: () => navigation.navigate('Home') },
    { id: 7, img: require("../../../assets/Icones/Pasta.png"), nav: () => navigation.navigate('Home') },
    { id: 8, img: require("../../../assets/Icones/Pasta.png"), nav: () => navigation.navigate('Home') },
    { id: 9, img: require("../../../assets/Icones/Pasta.png"), nav: () => navigation.navigate('Home') },
    { id: 10, img: require("../../../assets/Icones/Pasta.png"), nav: () => navigation.navigate('Home') },
    { id: 11, img: require("../../../assets/Icones/Pasta.png"), nav: () => navigation.navigate('Home') },
    { id: 12, img: require("../../../assets/Icones/Pasta.png"), nav: () => navigation.navigate('Home') },
  ];

  const navigation = useNavigation();

  useEffect(() => {
    NavigationBar.setVisibilityAsync("hidden");
    NavigationBar.setBackgroundColorAsync("#000000ff");
  }, []);

  const [fontsLoaded] = useFonts({
    Roboto: require("../../../assets/Fontes/Roboto.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <View
          style={{
            width: "40%",
            height: "70%",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            marginLeft: "20%",
          }}
        >
          {/* IMAGEM COM LOADING - SUBSTITUÍDA AQUI */}
          <ImageWithLoader
            source={
              user?.fotoUsers && !imageError
                ? {
                    uri: `${api.defaults.baseURL.replace("/api", "")}${
                      user.fotoUsers
                    }`,
                    headers: { "Cache-Control": "no-cache" },
                  }
                : require("../../../assets/Icones/UserRed.png")
            }
            style={{
              width: width * 0.2,
              height: width * 0.2,
              borderRadius: width * 0.5,
              borderWidth: width * 0.008,
              borderColor: "#fffafbff",
            }}
            onError={(e) => {
              console.log("Erro ao carregar imagem:", e.nativeEvent);
              setImageError(true);
            }}
          />

          <Text
            style={{
              color: "white",
              fontSize: width * 0.06,
              fontWeight: "900",
              marginTop: width * 0.07,
              marginLeft: width * 0.02,
            }}
          >
            Olá, {user.nomeUsers}
          </Text>
        </View>

        <View
          style={{
            width: "60%",
            height: "70%",
            justifyContent: "center",
            alignItems: "center",
            paddingRight: "7%",
          }}
        >
          <View
            style={{
              width: "37%",
              height: "75%",
              borderRadius: "50%",
              alignSelf: "flex-end",
            }}
          >
            <Pressable onPress={() => setVerM(true)}>
              <Image
                source={require("../../../assets/Icones/menu-aberto.png")}
                style={{ width: "70%", height: "100%" }}
                resizeMode="contain"
              />
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.numerosAd}>
        <FlatList
          style={styles.flatlist}
          data={numeros}
          numColumns={3}
          renderItem={({ item, index }) => (
            <Animatable.View
              animation={"fadeInUp"}
              delay={item.id * 350}
              style={styles.bera}
            >
              <Pressable
                style={[styles.adv]}
                onPress={() => {
                  item.nav();
                }}
              >
                {item.img && (
                  <Image
                    style={[{ width: "100%", height: "100%" }]}
                    resizeMode="contain"
                    source={item.img}
                  />
                )}
              </Pressable>
            </Animatable.View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>

      <Modal visible={verM} transparent={true} statusBarTranslucent={true}>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => {
            setAnimacao("fadeOutRight");
            setTimeout(() => {
              setVerM(false);
              setAnimacao("fadeInRight");
            }, 500);
          }}
        >
          <BlurView intensity={90} tint="dark" style={styles.blurContainer2}>
            <View style={styles.container2}>
              <Animatable.View animation={animacao} style={styles.sidebar}>
                {/* Header do Sidebar */}
                <View style={styles.sidebarHeader}>
                  <Text style={styles.sidebarTitle}>Menu</Text>
                  <View style={styles.headerLine} />
                </View>

                {/* Itens do Menu */}
                <View style={styles.menuItems}>
                  {/* Perfil */}
                  <Pressable
                    style={({ pressed }) => [
                      styles.menuItem,
                      pressed && styles.menuItemPressed,
                    ]}
                    onPress={() => {
                      setAnimacao("fadeOutRight");
                      setTimeout(() => {
                        setVerM(false);
                        setVerM2(true);
                        setAnimacao("fadeInRight");
                      }, 300);
                    }}
                  >
                    <View style={styles.menuItemContent}>
                      <View style={[styles.iconContainer, styles.profileIcon]}>
                        <Image
                          source={require("../../../assets/Icones/user-shape.png")}
                          style={styles.menuIcon}
                          resizeMode="contain"
                        />
                      </View>
                      <Text style={styles.menuText}>Perfil</Text>
                    </View>
                    <Text style={styles.menuArrow}>›</Text>
                  </Pressable>

                  {/* Suporte */}
                  <Pressable
                    style={({ pressed }) => [
                      styles.menuItem,
                      pressed && styles.menuItemPressed,
                    ]}
                  >
                    <View style={styles.menuItemContent}>
                      <View style={[styles.iconContainer, styles.supportIcon]}>
                        <Image
                          source={require("../../../assets/Icones/suport.png")}
                          style={styles.menuIcon}
                          resizeMode="contain"
                        />
                      </View>
                      <Text style={styles.menuText}>Suporte</Text>
                    </View>
                    <Text style={styles.menuArrow}>›</Text>
                  </Pressable>

                  {/* Termos */}
                  <Pressable
                    style={({ pressed }) => [
                      styles.menuItem,
                      pressed && styles.menuItemPressed,
                    ]}
                  >
                    <View style={styles.menuItemContent}>
                      <View style={[styles.iconContainer, styles.termsIcon]}>
                        <Image
                          source={require("../../../assets/Icones/termo.png")}
                          style={styles.menuIcon}
                          resizeMode="contain"
                        />
                      </View>
                      <Text style={styles.menuText}>Termos</Text>
                    </View>
                    <Text style={styles.menuArrow}>›</Text>
                  </Pressable>

                  {/* Configurações */}
                  <Pressable
                    style={({ pressed }) => [
                      styles.menuItem,
                      pressed && styles.menuItemPressed,
                    ]}
                  >
                    <View style={styles.menuItemContent}>
                      <View style={[styles.iconContainer, styles.settingsIcon]}>
                        <Image
                          source={require("../../../assets/Icones/settings-cogwheel-button.png")}
                          style={styles.menuIcon}
                          resizeMode="contain"
                        />
                      </View>
                      <Text style={styles.menuText}>Configurações</Text>
                    </View>
                    <Text style={styles.menuArrow}>›</Text>
                  </Pressable>

                  {/* Logout */}
                  <Pressable
                    style={({ pressed }) => [
                      styles.menuItem,
                      pressed && styles.menuItemPressed,
                    ]}
                    onPress={() => {
                      setAnimacao("fadeOutRight");
                      setTimeout(() => {
                        setVerM(false);
                        logout();
                      }, 300);
                    }}
                  >
                    <View style={styles.menuItemContent}>
                      <View style={[styles.iconContainer, styles.logoutIcon]}>
                        <Image
                          source={require("../../../assets/Icones/logout.png")}
                          style={styles.menuIcon}
                          resizeMode="contain"
                        />
                      </View>
                      <Text style={[styles.menuText, styles.logoutText]}>
                        Sair
                      </Text>
                    </View>
                    <Text style={styles.menuArrow}>›</Text>
                  </Pressable>
                </View>

                {/* Footer do Sidebar */}
                <View style={styles.sidebarFooter}>
                  <Text style={styles.footerText}>Versão 1.0.0</Text>
                </View>
              </Animatable.View>
            </View>
          </BlurView>
        </Pressable>
      </Modal>

      <Modal
        visible={verM2}
        transparent={true}
        animationType="slide"
        statusBarTranslucent={true}
      >
        <View style={styles.modalOverlay}>
          <BlurView intensity={80} tint="dark" style={styles.blurContainer}>
            <Pressable
              style={styles.modalBackground}
              onPress={() => setVerM2(false)}
            >
              <View style={styles.modalContent}>
                {/* Container principal do perfil */}
                <View style={styles.perfilCard}>
                  {/* Cabeçalho do perfil */}
                  <View style={styles.profileHeader}>
                    <View style={styles.avatarContainer}>
                      <View style={styles.avatar}>
                        <ImageWithLoader
                          source={
                            user?.fotoUsers && !imageError
                              ? {
                                  uri: `${api.defaults.baseURL.replace(
                                    "/api",
                                    ""
                                  )}${user.fotoUsers}`,
                                  headers: { "Cache-Control": "no-cache" },
                                }
                              : require("../../../assets/Icones/UserRed.png")
                          }
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                          onError={(e) => {
                            console.log(
                              "Erro ao carregar imagem:",
                              e.nativeEvent
                            );
                            setImageError(true);
                          }}
                        />
                      </View>
                      <View style={styles.onlineIndicator} />
                    </View>
                    <Text style={styles.userName}>{user.nomeUsers}</Text>
                    <Text style={styles.userEmail}>{user.emailUsers}</Text>
                  </View>

                  {/* Seção de opções */}
                  <View style={styles.optionsSection}>
                    <Pressable
                      style={({ pressed }) => [
                        styles.optionButton,
                        pressed && styles.optionPressed,
                      ]}
                      onPress={() => {
                        setVerM2(false);
                        setTimeout(() => setVerM3(true), 300);
                      }}
                    >
                      <View style={styles.optionContent}>
                        <Text style={styles.optionText}>Editar Perfil</Text>
                        <Text style={styles.optionArrow}>›</Text>
                      </View>
                    </Pressable>

                    <Pressable
                      style={({ pressed }) => [
                        styles.optionButton,
                        pressed && styles.optionPressed,
                      ]}
                    >
                      <View style={styles.optionContent}>
                        <Text style={styles.optionText}>Notificações</Text>
                        <Text style={styles.optionArrow}>›</Text>
                      </View>
                    </Pressable>

                    <Pressable
                      style={({ pressed }) => [
                        styles.optionButton,
                        pressed && styles.optionPressed,
                      ]}
                    >
                      <View style={styles.optionContent}>
                        <Text style={styles.optionText}>Configurações</Text>
                        <Text style={styles.optionArrow}>›</Text>
                      </View>
                    </Pressable>
                  </View>

                  {/* Seção de ações */}
                  <View style={styles.actionsSection}>
                    <Pressable
                      style={({ pressed }) => [
                        styles.deleteButton,
                        pressed && styles.deletePressed,
                      ]}
                    >
                      <Text style={styles.deleteText}>Excluir Perfil</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </Pressable>
          </BlurView>
        </View>
      </Modal>

      {/* Modal de Editar Perfil */}
      <Modal
        visible={verM3}
        transparent={true}
        animationType="slide"
        statusBarTranslucent={true}
      >
        <View style={styles.modalOverlay}>
          <BlurView intensity={80} tint="dark" style={styles.blurContainer}>
            <View style={styles.editProfileModal}>
              {/* Header do Modal */}
              <View style={styles.editProfileHeader}>
                <Text style={styles.editProfileTitle}>Editar Perfil</Text>
                <Pressable
                  style={styles.closeButton}
                  onPress={() => setVerM3(false)}
                >
                  <Text style={styles.closeButtonText}>×</Text>
                </Pressable>
              </View>

              {/* Formulário */}
              <View style={styles.editProfileForm}>
                {/* Nome */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Nome</Text>
                  <TextInput
                    style={styles.textInput}
                    value={editUser.nomeUsers}
                    onChangeText={(text) =>
                      setEditUser({ ...editUser, nomeUsers: text })
                    }
                    placeholder="Digite seu nome"
                    placeholderTextColor="#7de2d1aa"
                  />
                </View>

                {/* Email */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Email</Text>
                  <TextInput
                    style={styles.textInput}
                    value={editUser.emailUsers}
                    onChangeText={(text) =>
                      setEditUser({ ...editUser, emailUsers: text })
                    }
                    placeholder="Digite seu email"
                    placeholderTextColor="#7de2d1aa"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                {/* Senha */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Nova Senha</Text>
                  <TextInput
                    style={styles.textInput}
                    value={editUser.senhaUsers}
                    onChangeText={(text) =>
                      setEditUser({ ...editUser, senhaUsers: text })
                    }
                    placeholder="Digite nova senha"
                    placeholderTextColor="#7de2d1aa"
                    secureTextEntry
                  />
                </View>

                {/* Tipo */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Tipo Sanguíneo</Text>
                  <View style={styles.selectContainer}>
                    <Picker
                      selectedValue={editUser.tipoSUsers}
                      style={styles.picker}
                      onValueChange={(itemValue) =>
                        setEditUser({ ...editUser, tipoUsers: itemValue })
                      }
                      dropdownIconColor="#339989"
                    >
                      <Picker.Item
                        label="Selecione o tipo sanguíneo"
                        value=""
                      />
                      <Picker.Item label="A+" value="A+" />
                      <Picker.Item label="A-" value="A-" />
                      <Picker.Item label="B+" value="B+" />
                      <Picker.Item label="B-" value="B-" />
                      <Picker.Item label="AB+" value="AB+" />
                      <Picker.Item label="AB-" value="AB-" />
                      <Picker.Item label="O+" value="O+" />
                      <Picker.Item label="O-" value="O-" />
                    </Picker>
                  </View>
                </View>

                {/* Altura e Peso */}
                <View style={styles.rowInputs}>
                  <View style={[styles.inputGroup, styles.halfInput]}>
                    <Text style={styles.inputLabel}>Altura (cm)</Text>
                    <TextInput
                      style={styles.textInput}
                      value={editUser.alturaUsers}
                      onChangeText={(text) =>
                        setEditUser({ ...editUser, alturaUsers: text })
                      }
                      placeholder="Ex: 175"
                      placeholderTextColor="#7de2d1aa"
                      keyboardType="numeric"
                    />
                  </View>

                  <View style={[styles.inputGroup, styles.halfInput]}>
                    <Text style={styles.inputLabel}>Peso (kg)</Text>
                    <TextInput
                      style={styles.textInput}
                      value={editUser.pesoUsers}
                      onChangeText={(text) =>
                        setEditUser({ ...editUser, pesoUsers: text })
                      }
                      placeholder="Ex: 70"
                      placeholderTextColor="#7de2d1aa"
                      keyboardType="numeric"
                    />
                  </View>
                </View>
              </View>

              {/* Botões de Ação */}
              <View style={styles.editProfileActions}>
                <Pressable
                  style={[styles.actionButton, styles.cancelButton]}
                  onPress={() => setVerM3(false)}
                  disabled={loadingEdit}
                >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </Pressable>

                <Pressable
                  style={[styles.actionButton, styles.saveButton]}
                  onPress={atualizarPerfil}
                  disabled={loadingEdit}
                >
                  {loadingEdit ? (
                    <ActivityIndicator size="small" color="#fffafbff" />
                  ) : (
                    <Text style={styles.saveButtonText}>Salvar Alterações</Text>
                  )}
                </Pressable>
              </View>
            </View>
          </BlurView>
        </View>
      </Modal>

      <StatusBar style="auto" />
    </View>
  );
}
