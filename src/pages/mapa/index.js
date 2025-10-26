import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';
import { View, Text, Modal, Image, TouchableOpacity, ActivityIndicator, Pressable } from 'react-native';
import styles from './styles';
import { BlurView } from "expo-blur";
import { useNavigation } from "@react-navigation/native";

export default function Mapa() {
  const [location, setLocation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState(null);
  const navigation = useNavigation();

  // Sua posição fixa
  const minhaPosicaoFixa = {
    latitude: -23.552893572793838,
    longitude: -46.39961117671233
  };

  const market = [
    {
      id: 1,
      latitude: -23.546282927952642,
      longitude: -46.40650644709544,
      nome: "Rossi Supermercados - Guaianases",
      abFe: "08:00–22:00",
      img: require("./img/Rossi.jpg"),
      rua: "R. Carvalho de Araújo, 12 - Vila Cruzeiro, São Paulo - SP, 08412-020",
      telefone: "(11) 3019-0311"
    },
    {
      id: 2,
      latitude: -23.56331959624157,
      longitude: -46.41499392004288,
      nome: "Bem barato",
      abFe: "07:00–22:00",
      img: require("./img/Bem.jpg"),
      rua: "Estr. Iguatemi, 2270 - Jardim Pedra Branca, São Paulo - SP, 08375-000",
      telefone: "(11) 4010-2733"
    },
    {
      id: 3,
      latitude: -23.540368166885653,
      longitude: -46.421792115175805,
      nome: "Assaí Atacadista",
      abFe: "08:00–20:00",
      img: require("./img/Assai.jpg"),
      rua: "Estr. Itaquera Guaianazes, 2671 - Parque Central, São Paulo - SP, 08420-000",
      telefone: "(11) 2551-7500"
    },
    {
      id: 4,
      latitude: -23.53736324354659,
      longitude: -46.42529368389299,
      nome: "D'avó - Guaianases",
      abFe: "07:30–20:00",
      img: require("./img/Davo.jpg"),
      rua: "Estr. Itaquera Guaianazes, 2000 - Jardim Helena, São Paulo - SP, 08420-000",
      telefone: "(11) 2551-4500"
    },
    {
      id: 5,
      latitude: -23.544820097149493,
      longitude: -46.37899057297316,
      nome: "Shibata Supermercados - Ferraz de Vasconcelos",
      abFe: "08:00–20:00",
      img: require("./img/Shibata.jpg"),
      rua: "R. Gilda, 153 - Vila do Americano, Ferraz de Vasconcelos - SP, 08533-210",
      telefone: "(11) 2500-5500"
    }
  ];

  // Função para calcular distância
  const calcularDistancia = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Raio da Terra em km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distancia = R * c;
    return distancia;
  };

  // Adiciona distância a cada mercado
  const marketComDistancia = market.map(mercado => ({
    ...mercado,
    distancia: calcularDistancia(
      minhaPosicaoFixa.latitude,
      minhaPosicaoFixa.longitude,
      mercado.latitude,
      mercado.longitude
    )
  }));

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permissão negada');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
      console.log(loc);
    })();
  }, []);

  const handleMarketPress = (market) => {
    setSelectedMarket(market);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedMarket(null);
  };

  // Formatar distância
  const formatarDistancia = (distancia) => {
    if (distancia < 1) {
      return `${(distancia * 1000).toFixed(0)} metros`;
    } else {
      return `${distancia.toFixed(1)} km`;
    }
  };

  return (
    <View style={styles.container}>
      {location ? (
        <>
          <MapView
            style={styles.map}
            region={{
              latitude: minhaPosicaoFixa.latitude,
              longitude: minhaPosicaoFixa.longitude,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            }}
          >

            {/* Sua posição fixa */}
            <Marker
              coordinate={minhaPosicaoFixa}
              title="Sua Localização"
              pinColor="blue"
            />

            {/* Marcadores dos mercados com distância */}
            {marketComDistancia.map((item) => (
              <Marker
                key={item.id}
                coordinate={{
                  latitude: item.latitude,
                  longitude: item.longitude
                }}
                title={item.nome}
                description={`${formatarDistancia(item.distancia)} - ${item.abFe}`}
                image={require('./img/Icon.png')}
                onPress={() => handleMarketPress(item)}
              />
            ))}
          </MapView>
          <View style={[styles.voltC]}>
            <Pressable onPress={() => navigation.navigate('Home')} style={styles.voltar}>
              <Text style={styles.textVolt}>Voltar</Text>
            </Pressable>
          </View>
        </>
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Carregando localização...</Text>
        </View>
      )}

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <BlurView intensity={90} tint="dark" style={styles.contModa}>
          <View style={styles.conteudo}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle} numberOfLines={2}>
                {selectedMarket?.nome}
              </Text>
            </View>

            {/* Conteúdo */}
            <View style={styles.modalBody}>
              {selectedMarket && (
                <>
                  <Image
                    source={selectedMarket.img}
                    style={styles.marketImage}
                    resizeMode="cover"
                  />
                  <View style={styles.infoContainer}>
                    {/* Distância em destaque */}
                    <View style={styles.distanciaContainer}>
                      <Text style={styles.distanciaLabel}>Distância da sua localização:</Text>
                      <Text style={styles.distanciaValor}>
                        {formatarDistancia(selectedMarket.distancia)}
                      </Text>
                    </View>

                    <Text style={styles.infoLabel}>Horário de Funcionamento:</Text>
                    <Text style={styles.infoText}>{selectedMarket.abFe}</Text>

                    <Text style={styles.infoLabel}>Endereço:</Text>
                    <Text style={styles.infoText}>{selectedMarket.rua}</Text>

                    <Text style={styles.infoLabel}>Telefone:</Text>
                    <Text style={styles.infoText}>{selectedMarket.telefone}</Text>
                  </View>
                </>
              )}
            </View>
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={closeModal}
              >
                <Text style={styles.actionButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      </Modal>
    </View>
  );
}