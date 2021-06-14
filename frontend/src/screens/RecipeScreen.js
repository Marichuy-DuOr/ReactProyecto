import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Image, StyleSheet, Dimensions, StatusBar, Platform, TouchableOpacity } from 'react-native';
import { ImageHeaderScrollView, TriggeringView } from 'react-native-image-header-scroll-view';

import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useAuth} from '../contexts/Auth';
import apiCalls from '../utils/apiCalls';

/* import React, {useState, useEffect } from 'react';
import { View, Text, Alert, Button } from 'react-native'; 
<Button title="Guardar" onPress={guardarReceta}></Button> */

const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55;
const MAX_HEIGHT = 350;

export function RecipeScreen({route, navigation}) {
    const [receta, setReceta] = useState([]);
    
    const auth = useAuth();
    const navTitleView = useRef(null);

    useEffect(() => {
      const callApi = async () => {
          await apiCalls.getApiCall(`recipeSpoonacular/${route.params.id}`, auth.authData.token)
          .then( json => {
            setReceta(json);
          })
      }
      callApi();
    }, []);

    const guardarReceta = () => {
      const body = {
        id_recipe: receta.id,
        title: receta.title,
        creditsText: receta.creditsText,
        image: receta.image,
      }
      
      const callApi = async () => {
        await apiCalls.getApiCall(`recipe/${route.params.id}` , auth.authData.token)
          .then( json => {
            if ( json.data.length > 0 ) {
              Alert.alert('Ya haz guardado esta receta');
            } else {
              apiCalls.postApiCall(`recipe`, body , auth.authData.token)
                .then( json => {
                  Alert.alert('Se guardó en tus recetas!!');
              })
            }
            console.log(json);
        })
      }
      callApi();
    }
  
    return (
       
            
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
        <ImageHeaderScrollView
        maxHeight={MAX_HEIGHT}
        minHeight={MIN_HEIGHT}
        renderHeader={() => (
          <Image source={{uri: receta.image}} style={styles.image} />
        )}
        renderForeground={() => (
          <View style={styles.titleContainer}>
            <Text style={styles.imageTitle}>{receta.title}</Text>
          </View>
        )}
        renderFixedForeground={() => (
          <Animatable.View style={styles.navTitleView} ref={navTitleView}>
            <Text style={styles.navTitle}>{receta.title}</Text>
          </Animatable.View>
        )}>
        <TriggeringView
          style={styles.section}
          onHide={() => navTitleView.current.fadeInUp(200)}
          onDisplay={() => navTitleView.current.fadeOut(100)}>
          <View style={styles.categoryContainer2}>
              <TouchableOpacity
                style={styles.categoryBtn}
                >
                <View style={styles.categoryIcon}>
                <FontAwesome name="heart" size={16} color="#FF6347" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.categoryBtn}
                >
                <View style={styles.categoryIcon}>
                <FontAwesome name="search" size={16} color="#FF6347" />
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.categoryBtn}
                >
                <View style={styles.categoryIcon}>
                <FontAwesome name="print" size={16} color="#FF6347" />
                </View>
              </TouchableOpacity>
          </View>
        </TriggeringView>
        <View style={[styles.section, styles.sectionLarge]}>
          <View style={styles.categories}>
              <View style={styles.categoryContainer}>
                <FontAwesome name="tag" size={16} color="#fff" />
                <Text style={styles.category}>Ingredientes</Text>
              </View>
            
          </View>
          <Text style={styles.sectionContent}>Aqui van los ingredientes</Text>
        </View>

        <View style={[styles.section, styles.sectionLarge]}>
          <View style={styles.categories}>
              <View style={styles.categoryContainer}>
                <FontAwesome name="tag" size={16} color="#fff" />
                <Text style={styles.category}>Pasos</Text>
              </View>
            
          </View>
          <Text style={styles.sectionContent}>Aqui van los pasos</Text>
        </View>
        <View style={[styles.section, styles.sectionLarge]}>
          <View style={styles.categories}>
              <View style={styles.categoryContainer}>
                <FontAwesome name="tag" size={16} color="#fff" />
                <Text style={styles.category}>Información nutrimental</Text>
              </View>
            
          </View>
          <Text style={styles.sectionContent}>Aqui van las graficas</Text>
        </View>
      </ImageHeaderScrollView>
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: MAX_HEIGHT,
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 20,
  },
  name: {
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    backgroundColor: 'white',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionContent: {
    fontSize: 16,
    textAlign: 'justify',
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  categoryContainer: {
    flexDirection: 'row',
    backgroundColor: '#FF6347',
    borderRadius: 20,
    margin: 10,
    padding: 10,
    paddingHorizontal: 15,
  },
  category: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 10,
  },
  titleContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTitle: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 24,
  },
  navTitleView: {
    height: MIN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 40 : 5,
    opacity: 0,
  },
  navTitle: {
    color: 'white',
    fontSize: 18,
    backgroundColor: 'transparent',
  },
  sectionLarge: {
    minHeight: 300,
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#fdeae7',
    borderRadius: 50,
  },
  
  categoryBtn: {
    flex: 1,
    width: '30%',
    marginHorizontal: 0,
    alignSelf: 'center',
  },
  
  categoryContainer2: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginTop: 25,
    marginBottom: 10,
  },
});