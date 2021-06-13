import React, {useState, useEffect } from 'react';
import { View, Text, Alert, Button } from 'react-native';
import {useAuth} from '../contexts/Auth';
import apiCalls from '../utils/apiCalls';

export function RecipeScreen({route, navigation}) {
    const [receta, setReceta] = useState([]);
    
    const auth = useAuth();

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
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Hola c:</Text>
            <Text>{receta.title}</Text>
            <Button title="Guardar" onPress={guardarReceta}></Button>
        </View>
    );
}
