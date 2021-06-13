import React, {useState, useEffect} from 'react';
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
import { Icon } from 'react-native-elements'

export function HomeScreen({navigation}) {
    const [recetas, setRecetas] = useState([]);
    const [receta, setReceta] = useState([]);
    
    const auth = useAuth();

    const handleRecipeChange = (receta) => {
      setReceta(receta);
    }

    useEffect(() => {
      const callApi = async () => {
          await apiCalls.getApiCall('randomSpoonacular', auth.authData.token)
          .then( json => {
            setRecetas(json.recipes);
          })
      }
      callApi();
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
      <View style={styles.item}>
        <TouchableOpacity 
          onPress={()=>{
            console.log('El id -> ' + item.id);
            navigation.navigate(
              'RecipeScreen',
              { id:  item.id},
            );
          }}
        >
          <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
      </View>
    );

    const renderItem = ({ item }) => (
      <Item item={item} />
    );
  
    return (
      <SafeAreaView style={styles.container}>
        
        <View style={{flexDirection:'row'}}>
          <View style={{ flex: 1 }}></View>
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
            <View style={{ flex: 1 }}></View>
        </View>
        
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
              <Text>No se encontraron recetas</Text>
            </>
          )
        }
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
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
      flex: 5,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'white'
    },
    icono: {
      alignItems:'center',
      justifyContent:'center'
    }
});
