import { View, Text, FlatList, StyleSheet, ActivityIndicator, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Movies = ({ navigation }) => {
  const [moviesData, setMoviesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const state = useSelector(state => state?.user)

  const getDetails = async () => {
    const details = await AsyncStorage.getItem('userDetails')
    if (details !== null) {
      navigation.navigate("MapScreen")
    } else {
      navigation.navigate("Login")
    }
  }

  useEffect(() => {
    const backAction = () => {
      getDetails();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);

  const getMovies = async () => {
    setLoading(true)
    try {
      const movies = await axios.get('https://dummyapi.online/api/movies')
      if (movies.status === 200) {
        setMoviesData(movies?.data)
      } else {
        setMoviesData([]);
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    getMovies()
  }, []);

  const renderMovies = ({ item, indes }) => {
    return (
      <View style={styles.movieView}>
        <Text style={styles.movieTxt}>
          {item.movie}
        </Text>
        <Text style={styles.movieTxt}>
          {item.rating}
        </Text>
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Movies Screen</Text>
        <Text style={styles.user}>{state?.username}</Text>
      </View>
      {!loading ?
        <>
          <View style={styles.container}>
            <View style={styles.separator} />
            <FlatList
              data={moviesData}
              renderItem={renderMovies}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </>
        :
        <View style={styles.indicator}>
          <ActivityIndicator size={'large'} style={styles.indicator} />
        </View>
      }
    </View>
  )
}

export default Movies

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  movieView: {
    margin: 4,
    paddingVertical: 7,
    paddingHorizontal: 14,
    backgroundColor: '#ddd'
  },
  movieTxt: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center'
  },
  user: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
    color: '#000'
  },
  separator: {
    borderBottomWidth: 0.7,
    borderColor: '#000',
  },
  header: {
    backgroundColor: '#fff'
  },
  indicator: {
    marginBottom: 'auto',
    marginTop: 'auto'
  }
})