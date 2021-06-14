/* import React, {useState} from 'react';
import { 
  SafeAreaView, 
  View, 
  FlatList, 
  StyleSheet, 
  Text, 
  StatusBar,
  TouchableOpacity,
  TextInput,
  Button,
  TouchableHighlight,
} from 'react-native';
import {useAuth} from '../contexts/Auth';
import apiCalls from '../utils/apiCalls';
import { Icon } from 'react-native-elements'; */

import React, {useState, useEffect} from 'react';
import { 
  SafeAreaView, 
  View, 
  Image,
  FlatList, 
  StyleSheet, 
  Text, 
  TouchableOpacity,
  TextInput,
  // Button,
  TouchableHighlight,
} from 'react-native';
import {useAuth} from '../contexts/Auth';
import apiCalls from '../utils/apiCalls';
import { Icon } from 'react-native-elements'

export function IngredientsScreen({navigation}) {
    const [ingredientes, setIngredientes] = useState([]);
    const [ingrediente, setIngrediente] = useState([]);
    
    const auth = useAuth();

    const handleIngredienteChange = (ingrediente) => {
      setIngrediente(ingrediente);
    }

    const lookIngredientes = () => {
      if (ingrediente) {
        setIngredientes(null);
        const callApi = async () => {
          await apiCalls.getApiCall(`ingredientsSpoonacular/${ingrediente}` , auth.authData.token)
            .then( json => {
              setIngredientes(json.results);
            })
        }
        callApi();
      }
      
    }

    /* const Item = ({ item }) => (
      // Solo usar los campos "id", "name","image" porque las búsquedas solo retornan estos tres campos
      <View style={styles.item}>
        <TouchableOpacity 
          onPress={()=>{
            console.log('El id -> ' + item.id);
            navigation.navigate(
              'IngredientScreen',
              { id:  item.id},
            );
          }}
        >
          <Text style={styles.title}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    ); */

    const Item = ({ item }) => (

      // Solo usar los campos "id", "title","image" porque las búsquedas solo retornan estos tres campos
      <View style={styles.cardsWrapper}>
        <TouchableOpacity 
          onPress={()=>{
            console.log('El id -> ' + item.id);
            // console.log(item);
            // navigation.navigate(RecipeScreen);
            navigation.navigate(
              'IngredientScreen',
              { id:  item.id},
            );
          }}
          style={styles.card}
        >
          <View style={styles.cardImgWrapper}>
            <Image
              source={{uri: `https://spoonacular.com/cdn/ingredients_500x500/${item.image}`}}
              resizeMode="cover"
              style={styles.cardImg}
            />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            
          </View>
        </TouchableOpacity>
      </View>
      
    );

    const renderItem = ({ item }) => (
      <Item item={item} />
    );
  
    return (
      <SafeAreaView style={styles.container}>
          <>
            <View style={styles.cardsWrapper}>
            <Text
                    style={{
                    alignSelf: 'center',
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: '#333',
                  }}>
                    Buscar Ingredientes
                  </Text>

              <View style={{flexDirection:'row'}}>
                <View style={{ flex: 2 }}>
                  
                  </View>
                <View>
                  <TextInput
                      style={styles.busqueda}
                      placeholder="Busqueda..." 
                      onChangeText={handleIngredienteChange} 
                      style={{marginVertical:20}}
                      autoCapitalize='none'
                      />
                </View>
                <TouchableHighlight 
                  style={styles.icono}
                  onPress={lookIngredientes}
                  underlayColor = 'transparent'>
                    <View>                        
                      <Icon name="search" size = {20} color = "#4285F4" />
                    </View>
                </TouchableHighlight>
              </View>

              
            </View> 
            </>

            { ingredientes ? (
                <>
                <FlatList
                    // si pones data={recetas} tambien hace lo mismo pero marca warning, no se por que jaja que raro 
                    data={Object.values(ingredientes)} 
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                />
                </>
            ) : (
                <>
                <Text color="#ff345a">No se encontraron ingredientes</Text>
                </>
            )}
      </SafeAreaView>     
        
        /* { ingredientes ? (
          <>
            <FlatList
              // si pones data={ingredientes} tambien hace lo mismo pero marca warning, no se por que jaja que raro 
              data={Object.values(ingredientes)} 
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
            />
          </>
          ) : (
            <>
              <Text>No se encontraron ingredientes</Text>
            </>
          )
        }
      </SafeAreaView> */
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  wrapper: {},

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
   cardsWrapper: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
  card: {
    height: 100,
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImgWrapper: {
    flex: 1,
  },
  cardImg: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  busqueda: {
    flex: 3,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white'
  },
  icono: {
    alignItems:'center',
    justifyContent:'center'
  }
});
