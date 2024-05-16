import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { logout } from '../redux/actionTypes'
import { useDispatch, useSelector } from 'react-redux'
import MapView from 'react-native-maps';

const MapComponent = ({ navigation }) => {
  const dispatch = useDispatch();

  const onLogout = async () => {
    await AsyncStorage.clear();
    dispatch(logout())
    navigation.navigate('Login')
  }

  return (
    <View>
      <TouchableOpacity style={styles.logoutBtn} onPress={() => onLogout()}>
        <Text style={styles.btn}>
          Log Out
        </Text>
      </TouchableOpacity>
      {/* <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      /> */}
      <TouchableOpacity onPress={()=>navigation.navigate("Movies")}>
        <Text>
          Go to Movies Screen
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default MapComponent

const styles = StyleSheet.create({
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