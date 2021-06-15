import React, {useState, useEffect, useRef } from 'react';
import {View, Text, Image, StyleSheet, Dimensions, StatusBar, Platform, TouchableOpacity, Alert } from 'react-native';
import {useAuth} from '../contexts/Auth';
import apiCalls from '../utils/apiCalls';
import { ImageHeaderScrollView, TriggeringView } from 'react-native-image-header-scroll-view';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { PieChart } from "react-native-chart-kit";

const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55;
const MAX_HEIGHT = 350;

export function IngredientScreen({route, navigation}) {
    const [ingrediente, setIngrediente] = useState([]);
    const [data, setData] = useState([]);
    
    const auth = useAuth();
    const navTitleView = useRef(null);

    useEffect(() => {
      setData([]);
      const callApi = async () => {
          await apiCalls.getApiCall(`ingredientSpoonacular/${route.params.id}`, auth.authData.token)
          .then( json => {
            setIngrediente(json);
            let i = 0;
            json.nutrition.nutrients.map(o => {
              if (o.unit === 'g' ) {
                const newData = {
                  name: `g ${o.title}`,
                  population: o.amount,
                  color: '#' + Math.random().toString(16).substr(-6),
                  legendFontColor: "#7F7F7F",
                  legendFontSize: 10
                }
                setData(data =>[...data, newData]);
              }
              i++;
              if ( i == 10 ){
                i = 0;
              }
            });
          })
      }
      callApi();
    }, []);

    const guardarIngrediente = () => {
      const body = {
        id_ingredient: ingrediente.id,
        name: ingrediente.name,
        categoryPath: ingrediente.categoryPath,
        image: ingrediente.image,
      }
      
      const callApi = async () => {
        await apiCalls.getApiCall(`ingredient/${route.params.id}` , auth.authData.token)
          .then( json => {
            if ( json.data.length > 0 ) {
              // Alert.alert('Ya haz guardado este ingrediente');
              // console.log(json.data[0]._id);
              apiCalls.deleteApiCall(`ingredient/${json.data[0]._id}` , auth.authData.token)
                .then( json => {
                  Alert.alert('Se ha eliminado de tus ingredientes!!');
              }) 
            } else {
              apiCalls.postApiCall(`ingredient`, body , auth.authData.token)
                .then( json => {
                  Alert.alert('Se guardó en tus ingredientes!!');
              })
            }
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
          <Image source={{uri: `https://spoonacular.com/cdn/ingredients_500x500/${ingrediente.image}`}} style={styles.image} />
        )}
        renderForeground={() => (
          <View style={styles.titleContainer}>
            <Text style={styles.imageTitle}>{ingrediente.name}</Text>
          </View>
        )}
        renderFixedForeground={() => (
          <Animatable.View style={styles.navTitleView} ref={navTitleView}>
            <Text style={styles.navTitle}>{ingrediente.name}</Text>
          </Animatable.View>
        )}>
        <TriggeringView
          style={styles.section}
          onHide={() => navTitleView.current.fadeInUp(200)}
          onDisplay={() => navTitleView.current.fadeOut(100)}>
          <View style={styles.categoryContainer2}>
              <TouchableOpacity
                style={styles.categoryBtn}
                onPress={guardarIngrediente}
                >
                <View style={styles.categoryIcon}>
                <FontAwesome name="heart"  size={16} color="#FF6347" />
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
                <Text style={styles.category}>Más información</Text>
              </View>
            
          </View>
          {ingrediente.categoryPath && ingrediente.categoryPath.length > 0 ?
            <Text style={styles.sectionContent}>
              Aisle: {ingrediente.aisle}{"\n"}
              Cost: {ingrediente.estimatedCost.value} {ingrediente.estimatedCost.unit}{"\n"}
              Consistency: {ingrediente.consistency}{"\n"}
              {ingrediente.nutrition.nutrients[0].title}: {ingrediente.nutrition.nutrients[0].amount} {ingrediente.nutrition.nutrients[0].unit}
            </Text>
          : 
            <Text style={styles.sectionContent} >Cargando...</Text>
          }
        </View>
        <View style={[styles.section, styles.sectionLarge]}>
          <View style={styles.categories}>
              <View style={styles.categoryContainer}>
                <FontAwesome name="tag" size={16} color="#fff" />
                <Text style={styles.category}>Categorías</Text>
              </View>
            
          </View>
          {ingrediente.categoryPath && ingrediente.categoryPath.length > 0 ? 
              ingrediente.categoryPath.map((categoria) => (
                <Text style={styles.sectionContent}  key={categoria}>{categoria}</Text>
              ))
            : 
            <Text style={styles.sectionContent} >Cargando...</Text>
          }
        </View>
        <View style={[styles.section, styles.sectionLarge]}>
          <View style={styles.categories}>
              <View style={styles.categoryContainer}>
                <FontAwesome name="tag" size={16} color="#fff" />
                <Text style={styles.category}>Información nutrimental</Text>
              </View>
            
          </View>
          <View>
            
            <PieChart
              data={data}
              width={Dimensions.get('window').width - 16}
              height={220}
              chartConfig={{
                backgroundColor: '#fff',
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute //for the absolute number remove if you want percentage
            />
          </View>
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
