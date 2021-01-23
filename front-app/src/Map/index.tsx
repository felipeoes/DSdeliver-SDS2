import React, { useEffect, useState } from "react";
import AsyncSelect from 'react-select/async';
import { Alert, Linking, Text, View } from "react-native";
import MapView, {
  Callout,
  Marker,
  PROVIDER_GOOGLE,
  Region,
} from "react-native-maps";
import { RectButton, TextInput } from "react-native-gesture-handler";
import * as Location from "expo-location";
import styles from "../styles";
import { fetchLocalMapBox } from "../api";
import { OrderLocationData } from "../types";
import { FontAwesome } from "@expo/vector-icons";

const initialRegion = {
    latitude: -23.5063752,
    longitude: -46.5793367,
    latitudeDelta: 100,
    longitudeDelta: 100,
  };

const initialPosition = {
    lat: -23.5063752,
    lng: -46.5793367
}

type Place = {
    label?: string;
    value?: string;
    position: {
        lat: number;
        lng: number;
    };
}

type Props = {
    onChangeLocation: (location: OrderLocationData) => void;
}


export default function Map( { onChangeLocation }: Props) {
    const [address, setAddress] = useState<Place>({
        position: initialPosition
    });

    const loadOptions = async (inputValue: string, callback: (places: Place[]) => void) => {
        const response = await fetchLocalMapBox(inputValue);
      
        const places = response.data.features.map((item: any) => {
          return ({
            label: item.place_name,
            value: item.place_name,
            position: {
              lat: item.center[1],
              lng: item.center[0]
            },
          });
        });
      
        callback(places);
    };
      
    const handleChangeSelect = (place: Place) => {
        setAddress(place);
        onChangeLocation({
          latitude: place.position.lat,
          longitude: place.position.lng,
          address: place.label!
        });
    };

  const [username, setUsername] = useState("");
  const [region, setRegion] = useState<Region>();

  const getCurrentPosition = async () => {
    let { status } = await Location.requestPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Ops!", "Permissão de acesso a localização negada.");
    }

    let {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync();

    setRegion({ latitude, longitude, latitudeDelta: 100, longitudeDelta: 100 });
  };

  useEffect(() => {
    getCurrentPosition();
  }, []);

  return (
      
    <View style={styles.container}>
        
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        initialRegion={initialRegion}
        zoomControlEnabled={true}

      >
      </MapView>

      <View style={styles.footer}>
        <TextInput
          placeholder={"Digite um endereço..."}
          style={styles.footerText}
          onChangeText={setUsername}
          value={username}
        />

        {/* <RectButton style={styles.searchUserButton} onPress={handleChangeSelect}>
          <FontAwesome name="github" size={24} color="#fff" />
        </RectButton> */}
      </View>
    </View>
  );
}