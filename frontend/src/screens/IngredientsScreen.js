import React, {useState} from 'react';
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

export function IngredientsScreen({navigation}) {
    const [ingredientes, setIngredientes] = useState([]);
    const [ingrediente, setIngrediente] = useState([]);
    
    const auth = useAuth();

    const handleIngredienteChange = (ingrediente) => {
      setIngrediente(ingrediente);
    }

    /* useEffect(() => {
      const callApi = async () => {
          await apiCalls.getApiCall('randomSpoonacular', auth.authData.token)
          .then( json => {
            setIngredientes(json.ingredients);
          })
      }
      callApi();
    }, []); */

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

    const Item = ({ item }) => (
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
            <View style={{ flex: 1 }}></View>
        </View>
        
        { ingredientes ? (
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
