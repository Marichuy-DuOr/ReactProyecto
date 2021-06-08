import React, {useState, useEffect} from 'react';
import { View, Text } from 'react-native';
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
  
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Hola c:</Text>
            <Text>{receta.title}</Text>
        </View>
    );
}
