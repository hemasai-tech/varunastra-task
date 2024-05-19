import React, { useEffect } from 'react';
import { View, Text, StyleSheet, BackHandler } from 'react-native';

const LocationDetails = (props) => {

  const locationDetails = props?.route?.params?.details || null;

  useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{locationDetails?.name}</Text>
      <Text style={styles.title}>{locationDetails?.longitude}</Text>
      <Text style={styles.title}>{locationDetails?.latitude}</Text>
    </View>
  )
}

export default LocationDetails;

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  title: {
    fontSize: 20,
    color: '#C73659',
    fontWeight: '500'
  }
})