import React, {useState, useEffect } from 'react';
import { View, Text, Alert, Button } from 'react-native';
import {useAuth} from '../contexts/Auth';
import apiCalls from '../utils/apiCalls';

export function IngredientScreen({route, navigation}) {
    const [ingrediente, setIngrediente] = useState([]);
    
    const auth = useAuth();

    useEffect(() => {
      const callApi = async () => {
          await apiCalls.getApiCall(`ingredientSpoonacular/${route.params.id}`, auth.authData.token)
          .then( json => {
            setIngrediente(json);
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
              Alert.alert('Ya haz guardado este ingrediente');
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
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Hola c:</Text>
            <Text>{ingrediente.name}</Text>
            <Button title="Guardar" onPress={guardarIngrediente}></Button>
        </View>
    );
}
