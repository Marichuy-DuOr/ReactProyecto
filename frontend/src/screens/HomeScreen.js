import React, {useState, useEffect} from 'react';
import { 
  SafeAreaView, 
  View, 
  FlatList, 
  StyleSheet, 
  Text, 
  StatusBar,
  TouchableOpacity
} from 'react-native';
import {useAuth} from '../contexts/Auth';
import apiCalls from '../utils/apiCalls';

export function HomeScreen({navigation}) {
    const [recetas, setRecetas] = useState([]);
    
    const auth = useAuth();

    useEffect(() => {
      const callApi = async () => {
          await apiCalls.getApiCall('randomSpoonacular', auth.authData.token)
          .then( json => {
            setRecetas(json.recipes);
          })
      }
      callApi();
    }, []);

    const Item = ({ item }) => (
      <View style={styles.item}>
        <TouchableOpacity 
          onPress={()=>{
            console.log('El id -> ' + item.id);
            // navigation.navigate(RecipeScreen);
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
        
          <FlatList
            // si pones data={recetas} tambien hace lo mismo pero marca warning, no se por que jaja que raro 
            data={Object.values(recetas)} 
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          />
        
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
});
