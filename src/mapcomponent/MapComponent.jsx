import React, { useEffect, useRef, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, BackHandler, PermissionsAndroid } from 'react-native'

import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { logout } from '../redux/actionTypes'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation'
import { BottomSheet } from "react-native-btr";

const MapComponent = ({ navigation }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [details, setDetails] = useState(null);

  const markers = [
    {
      latitude: 18.249,
      longitude: 83.8938,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
      name: "Srikakulam",
    },
    {
      latitude: 13.629065,
      longitude: 79.424446,
      latitudeDelta: 0.09,
      longitudeDelta: 0.09,
      name: "Tirupati",
    },
    {
      latitude: 18.781715,
      longitude: 83.42675,
      latitudeDelta: 0.09,
      longitudeDelta: 0.09,
      name: "Parvathi Puram Manyam",
    },
    {
      latitude: 17.7242,
      longitude: 82.7347,
      latitudeDelta: 0.09,
      longitudeDelta: 0.09,
      name: "Visakapatnam",
    },
    {
      latitude: 17.686,
      longitude: 83.008,
      latitudeDelta: 0.09,
      longitudeDelta: 0.09,
      name: "Anakapalli",
    },
    {
      latitude: 16.989,
      longitude: 82.247,
      latitudeDelta: 0.09,
      longitudeDelta: 0.09,
      name: "Kakinada",
    },
    {
      latitude: 17.3213,
      longitude: 82.0407,
      latitudeDelta: 0.09,
      longitudeDelta: 0.09,
      name: "East Godavari",
    },
    {
      latitude: 16.702,
      longitude: 82.011,
      latitudeDelta: 0.09,
      longitudeDelta: 0.09,
      name: "DR BR Ambedhkar Konaseema",
    },
  ]

  const getDetails = async () => {
    const details = await AsyncStorage.getItem('userDetails')
    if (details !== null) {
      BackHandler.exitApp();
      return
    } else {
      navigation.navigate("Login")
      return
    }
  }

  useEffect(() => {
    const backAction = () => {
      getDetails();
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);

  const onLogout = async () => {
    await AsyncStorage.clear();
    dispatch(logout())
    navigation.navigate('Login')
  }

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  useEffect(() => {
    const checkPermissionAndLocate = async () => {
      const hasPermission = await requestLocationPermission();
      if (hasPermission) {
        Geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
          },
          (error) => {
            console.log(error);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      }
    };

    checkPermissionAndLocate();
  }, []);

  const toggle = (item) => {
    console.log(item);
    setVisible((visible) => !visible);
    setDetails(item);
  }
  const BottomSheetDemo = () => {
    return (
      <View style={styles.container}>
        <BottomSheet
          visible={visible}
        >
          <TouchableOpacity onPress={() => setVisible(false)} style={styles.close}>
            <Text style={styles.clsBtn}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("LocationDetails", {
            details
          })} style={styles.card}>
            <Text style={styles.crdTxt}>{details?.name}</Text>
          </TouchableOpacity>
        </BottomSheet>
      </View>
    );
  }

  return (
    <>
      <TouchableOpacity style={styles.logoutBtn} onPress={() => onLogout()}>
        <Text style={styles.btn}>
          Log Out
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.logoutBtn, { backgroundColor: '#FF7F3E' }]} onPress={() => navigation.navigate("Movies")}>
        <Text style={{ color: '#fff', fontWeight: '700' }}>
          Go to Movies Screen
        </Text>
      </TouchableOpacity>
      <View>
        <MapView
          userLocationPriority={'balanced'}
          showsUserLocation={true}
          showsMyLocationButton
          zoomControlEnabled
          userLocationCalloutEnabled
          zoomEnabled
          followsUserLocation
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: 17.686,
            longitude: 83.008,
            latitudeDelta: 2,
            longitudeDelta: 2,
          }}
        >
          {
            markers.map((e, i) => (
              <Marker
                onPress={() => toggle(e)}
                title={e.name}
                key={i}
                coordinate={{ latitude: e.latitude, longitude: e.longitude }}
              />
            ))
          }
        </MapView>
      </View>
      {BottomSheetDemo()}
    </>
  )
}

export default MapComponent

const styles = StyleSheet.create({
  close: {
    marginLeft: 'auto',
    marginRight: 20,
    backgroundColor: '#DDDDDD',
    borderRadius: 4
  },
  clsBtn: {
    color: 'black',
    fontSize: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderRadius: 50,
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  crdTxt: {
    color: 'black',
    fontSize: 20
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: 550,
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 5
  },
  logoutBtn: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    paddingVertical: 7,
    paddingHorizontal: 15,
    backgroundColor: '#dddddd',
    margin: 5,
    borderRadius: 5
  },
  btn: {
    color: '#010101'
  }
})