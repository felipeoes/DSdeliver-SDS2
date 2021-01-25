import React, { Component, useEffect, useState } from "react";
import { Alert, Linking, Platform, Text, View } from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import * as Location from "expo-location";
import styles from "../styles";
import { fetchLocalMapBox } from "../api";
import { OrderLocationData } from "../types";
import { GooglePlaceData, GooglePlaceDetail, GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Geocoder from 'react-native-geocoding';
import { GOOGLE_PLAY_API } from '@env';

Geocoder.init(GOOGLE_PLAY_API, { language: "pt-br" });

const initialRegion = {
  latitude: -23.5063752,
  longitude: -46.5793367,
  latitudeDelta: 0.09,
  longitudeDelta: 0.08,
};

const initialPosition = {
  latitude: -23.5063752,
  longitude: -46.5793367
}

type Place = {
  label?: string;
  value?: string;
  position: {
    latitude: number;
    longitude: number;
  };
}

type Regions = {
  latitude: number,
  longitude: number,
  latitudeDelta: number,
  longitudeDelta: number
}

type Props = {
  onChangeLocation: (location: OrderLocationData) => void;
}

function OrderLocation({ onChangeLocation }: Props) {
  const [address, setAddress] = useState<Place>({
    position: initialPosition
  });
  const [region, setRegion] = useState<Region>();

  const handleChangeRegion = (data: GooglePlaceData, details: GooglePlaceDetail) => {
    Geocoder.from(details.adr_address)
      .then(json => {
        var location = json.results[0].geometry.location;
        console.log(location);
        setRegion({ latitude: location.lat, longitude: location.lng, latitudeDelta: 0.0079, longitudeDelta: 0.008 });
        setAddress({
          label: details.formatted_address,
          position: {
            latitude: location.lat,
            longitude: location.lng,
          }
        });
        onChangeLocation({
          latitude: location.lat,
          longitude: location.lng,
          address: details.formatted_address
        });
      })
      .catch(error => console.warn(error));
  };

  const getCurrentPosition = async () => {
    let { status } = await Location.requestPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permissão de acesso à localização negada.");
    }

    let {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync();

    setRegion({ latitude, longitude, latitudeDelta: 0.09, longitudeDelta: 0.08 });
  };

  useEffect(() => {
    getCurrentPosition();
  }, []);

  class MapSearch extends Component {
    state = {
      searchFocused: false
    };

    render() {
      const { searchFocused } = this.state;

      return (
        <GooglePlacesAutocomplete
          placeholder="Digite o endereço de entrega..."
          onPress={(data, details) => {
            handleChangeRegion(data, details as GooglePlaceDetail)
          }}
          query={{
            key: GOOGLE_PLAY_API,
            language: "pt",
            components: 'country:br'
          }}
          textInputProps={{
            onFocus: () => {
              this.setState({ searchFocused: true });
            },
            onBlur: () => {
              this.setState({ searchFocused: false });
            },
            autoCapitalize: "none",
            autoCorrect: false,
          }}
          fetchDetails
          enablePoweredByContainer={false}
          styles={{
            container: {
              top: Platform.select({ ios: 60, android: 30 }),
              width: "100%",
            },
            textInputContainer: {
              flex: 1,
              backgroundColor: "transparent",
              height: 94,
              marginHorizontal: 2,
              marginVertical: 2,
              borderTopWidth: 0,
              borderBottomWidth: 0,
              justifyContent: "center",
              marginRight: '3%',
            },
            textInput: {
              height: 54,
              margin: 0,
              borderRadius: 10,
              paddingTop: 0,
              paddingBottom: 0,
              paddingLeft: 20,
              paddingRight: 20,
              marginTop: 0,
              marginLeft: 0,
              marginRight: 0,
              elevation: 5,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowOffset: { x: 0, y: 0 },
              shadowRadius: 15,
              borderWidth: 1,
              borderColor: "#DDD",
              fontSize: 18
            },
            listView: {
              borderWidth: 1,
              borderColor: "#DDD",
              backgroundColor: "#FFF",
              marginHorizontal: 20,
              elevation: 5,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowOffset: { x: 0, y: 0 },
              shadowRadius: 15,
              marginTop: '15%',
              position: 'absolute',
              zIndex: 999
            },
            description: {
              fontSize: 16
            },
            row: {
              padding: 20,
              height: 58
            }
          }}
        />
      );
    }
  }

  var newLocal = address.position;
  return (
    <>
      <MapSearch />
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={region}
          initialRegion={initialRegion}
          zoomControlEnabled={true}
          showsUserLocation
        >
          <Marker
            coordinate={newLocal}
            title={address.label}
            tracksViewChanges
            tracksInfoWindowChanges
          >
          </Marker>
        </MapView>
      </View>
    </>
  );
}

export default OrderLocation;