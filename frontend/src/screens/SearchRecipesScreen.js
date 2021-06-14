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

export function SearchRecipesScreen({route, navigation}) {
    const [recetas, setRecetas] = useState([]);
    const [receta, setReceta] = useState([]);
    //route.params.similares
    const auth = useAuth();

    const handleRecipeChange = (receta) => {
      setReceta(receta);
    } 

    useEffect(() => {
      
      if (route.params.similares) {
        const callApi = async () => {
          await apiCalls.getApiCall(`similarSpoonacular/${route.params.id}`, auth.authData.token)
          .then( json => {
            setRecetas(json);
          })
        }
        callApi();
      }
    }, []);

    const lookRecipes = () => {
      if (receta) {
        setRecetas(null);
        const callApi = async () => {
          await apiCalls.getApiCall(`buscarSpoonacular/${receta}` , auth.authData.token)
            .then( json => {
              setRecetas(json.results);
            })
        }
        callApi();
      }
      
    }

    const Item = ({ item }) => (

      // Solo usar los campos "id", "title","image" porque las búsquedas solo retornan estos tres campos
      <View style={styles.cardsWrapper}>
        <TouchableOpacity 
          onPress={()=>{
            console.log('El id -> ' + item.id);
            console.log(item);
            // navigation.navigate(RecipeScreen);
            navigation.navigate(
              'RecipeScreen',
              { id:  item.id},
            );
          }}
          style={styles.card}
        >
          <View style={styles.cardImgWrapper}>
            <Image
              source={{uri: `https://spoonacular.com/recipeImages/${item.id}-556x370.jpg`}}
              resizeMode="cover"
              style={styles.cardImg}
            />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            
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
                    Buscar Recetas
                  </Text>

              <View style={{flexDirection:'row'}}>
                <View style={{ flex: 2 }}>
                  
                  </View>
                <View>
                  <TextInput
                      style={styles.busqueda}
                      placeholder="Busqueda..." 
                      onChangeText={handleRecipeChange} 
                      style={{marginVertical:20}}
                      autoCapitalize='none'
                      />
                </View>
                <TouchableHighlight 
                  style={styles.icono}
                  onPress={lookRecipes}
                  underlayColor = 'transparent'>
                    <View>                        
                      <Icon name="search" size = {20} color = "#4285F4" />
                    </View>
                </TouchableHighlight>
              </View>

              
            </View> 
            </>
            { recetas ? (
                <>
                <FlatList
                    // si pones data={recetas} tambien hace lo mismo pero marca warning, no se por que jaja que raro 
                    data={Object.values(recetas)} 
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                />
                </>
            ) : (
                <>
                <Text color="#ff345a">No se encontraron recetas</Text>
                </>
            )}
      </SafeAreaView>

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
