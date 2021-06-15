import React, {useState, useEffect} from 'react';
import { 
  SafeAreaView, 
  View, 
  Image,
  FlatList, 
  StyleSheet, 
  Text, 
  StatusBar,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {useAuth} from '../contexts/Auth';
import apiCalls from '../utils/apiCalls';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export const MyRecipesScreen = ({navigation}) => {
  const [recetas, setRecetas] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const auth = useAuth();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    apiCalls.getApiCall('originals', auth.authData.token)
      .then( json => {
        console.log(json.data);
        setRecetas(json.data);
      })
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    const callApi = async () => {
        await apiCalls.getApiCall('originals', auth.authData.token)
        .then( json => {
          console.log(json.data);
          setRecetas(json.data);
        })
    }
    callApi();
  }, []);


  const Item = ({ item }) => (

    <View style={styles.cardsWrapper}>
      <TouchableOpacity 
        onPress={()=>{
          console.log('El id -> ' + item._id);
          console.log(item);
          // navigation.navigate(RecipeScreen);
          navigation.navigate(
            'OriginalScreen',
            { id:  item._id},
          );
        }}
        style={styles.card}
      >
        <View style={styles.cardImgWrapper}>
          <Image
            source={{uri: item.image}}
            resizeMode="cover"
            style={styles.cardImg}
          />
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>{item.nombre}</Text>
            <Text style={styles.cardDetails}>
              {item.descripcion}
            </Text>
          
        </View>
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
        keyExtractor={item => item._id}
        refreshControl={
          <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              enabled={true}
          />
          }
        ListEmptyComponent={
            <Text >Aún no haz guardado ninguna receta</Text>
        } 
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
container: {
  flex: 1,
},
container2: {
  flex: 1,
  marginTop: StatusBar.currentHeight || 0,
},
sliderContainer: {
  height: 200,
  width: '90%',
  marginTop: 10,
  justifyContent: 'center',
  alignSelf: 'center',
  borderRadius: 8,
},

wrapper: {},

slide: {
  flex: 1,
  justifyContent: 'center',
  backgroundColor: 'transparent',
  borderRadius: 8,
},
sliderImage: {
  height: '100%',
  width: '100%',
  alignSelf: 'center',
  borderRadius: 8,
},
categoryContainer: {
  flexDirection: 'row',
  width: '90%',
  alignSelf: 'center',
  marginTop: 25,
  marginBottom: 10,
},
categoryBtn: {
  flex: 1,
  width: '30%',
  marginHorizontal: 0,
  alignSelf: 'center',
},
categoryIcon: {
  borderWidth: 0,
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'center',
  width: 70,
  height: 70,
  backgroundColor: '#fdeae7' /* '#FF6347' */,
  borderRadius: 50,
},
categoryBtnTxt: {
  alignSelf: 'center',
  marginTop: 5,
  color: '#de4f35',
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
cardDetails: {
  fontSize: 12,
  color: '#444',
},
});