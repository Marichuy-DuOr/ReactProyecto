import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useAuth} from '../contexts/Auth';
import {
  Avatar,
} from 'react-native-paper';

export default function DetailsScreen() {
  const auth = useAuth();
    return (
      <View style={{marginTop:50}}>
        <Text style={styles.title}>{auth.authData.nombre} </Text>
        <Text style={styles.title}>{auth.authData.apepat} {auth.authData.apemat}</Text>
        <View style={styles.categoryContainer}>
          <TouchableOpacity style={styles.categoryBtn}>
            <View style={styles.categoryIcon}>
              <Image source={require('../../assets/user.png')} width='300' height='300' />
            </View>
            <Text style={styles.categoryBtnTxt}>{auth.authData.email}</Text>
          </TouchableOpacity>
        </View>
      </View>
      
    );
  }

  const styles = StyleSheet.create({
    title: {
      fontSize: 30,
      marginTop: 3,
      fontWeight: 'bold',
      textAlign: 'center'
    },
    categoryContainer: {
      flexDirection: 'row',
      width: '90%',
      alignSelf: 'center',
      marginTop: 25,
      marginBottom: 10,
    },
    categoryBtn: {
      flex: 1,
      width: '30%',
      marginHorizontal: 0,
      alignSelf: 'center',
    },
    categoryIcon: {
      borderWidth: 0,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      width: 350,
      height: 350,
      backgroundColor: '#fdeae7' /* '#FF6347' */,
      borderRadius: 50,
    },
    categoryBtnTxt: {
      alignSelf: 'center',
      marginTop: 5,
      color: '#de4f35',
    },
  });