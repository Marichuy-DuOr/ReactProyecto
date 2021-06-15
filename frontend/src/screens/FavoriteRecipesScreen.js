import React, {useState, useEffect} from 'react';
import { 
  SafeAreaView, 
  View, 
  Image,
  FlatList, 
  StyleSheet, 
  Text, 
  TouchableOpacity,
  RefreshControl,
  ScrollView
} from 'react-native';
import {useAuth} from '../contexts/Auth';
import apiCalls from '../utils/apiCalls';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export function FavoriteRecipesScreen({navigation}) {
    const [recetas, setRecetas] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);

    const auth = useAuth();

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        apiCalls.getApiCall(`recipes`, auth.authData.token)
            .then( json => {
                setRecetas(json.data);
            })
        wait(2000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        const callApi = async () => {
          await apiCalls.getApiCall(`recipes`, auth.authData.token)
          .then( json => {
            setRecetas(json.data);
          })
        }
        callApi();
    }, []);

    const Item = ({ item }) => (

      // Solo usar los campos "id", "title","image" porque las búsquedas solo retornan estos tres campos
      <View style={styles.cardsWrapper}>
        <TouchableOpacity 
          onPress={()=>{
            console.log('El id -> ' + item.id_recipe);
            console.log(item);
            navigation.navigate(
              'RecipeScreen',
              { id:  item.id_recipe},
            );
          }}
          style={styles.card}
        >
          <View style={styles.cardImgWrapper}>
            <Image
              source={{uri: `https://spoonacular.com/recipeImages/${item.id_recipe}-556x370.jpg`}}
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
                    Mis recetas
                </Text>  
            </View> 
            </>
            { recetas ? (
                <>
                <FlatList
                    // si pones data={recetas} tambien hace lo mismo pero marca warning, no se por que jaja que raro 
                    data={Object.values(recetas)} 
                    renderItem={renderItem}
                    keyExtractor={item => item.id_recipe.toString()}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            enabled={true}
                        />
                        }
                    ListEmptyComponent={
                        <Text>Aún no haz guardado ninguna receta</Text>
                    }
                />
                </>
            ) : (
                <>
                <ScrollView
                    // contentContainerStyle={styles.scrollView}
                    refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        enabled={true}
                    />
                    }
                >
                    <Text >No se encontraron recetas</Text>
                </ScrollView>
                
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
