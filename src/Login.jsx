// Login.js

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid, BackHandler } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from './redux/actionTypes';

const Login = ({ navigation }) => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const getDetails = async () => {
    const details = await AsyncStorage.getItem('userDetails')
    if (details !== null) {
      navigation.navigate('MapScreen')
    } else {
      navigation.navigate("Login")
    }
  }

  useEffect(() => {
    getDetails()
  }, [])

  const handleLogin = async () => {
    // Validate user input
    if (username !== "" && password !== "") {
      const userDetails = {
        username: username,
        password: password
      }
      await AsyncStorage.setItem('userDetails', JSON.stringify(userDetails))
      // Redirect authenticated users to the map screen
      dispatch(login(userDetails))
      navigation.navigate('MapScreen');
      setPassword("");
      setUsername("");
    } else {
      // Show an alert for invalid credentials
      ToastAndroid.show('Invalid Credentials , Please enter valid username and password.', ToastAndroid.SHORT);
      return
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Screen</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={text => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Login;
