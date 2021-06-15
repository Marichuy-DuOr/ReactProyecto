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
  TextInput,
  TouchableHighlight,
  RefreshControl,
  ScrollView
} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import Swiper from 'react-native-swiper/src';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useAuth} from '../contexts/Auth';
import apiCalls from '../utils/apiCalls';
import { Icon } from 'react-native-elements';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export function HomeScreen({navigation}) {
    const [recetas, setRecetas] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    
    const auth = useAuth();

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
        apiCalls.getApiCall('randomSpoonacular', auth.authData.token)
        .then( json => {
          setRecetas(json.recipes);
        })
      wait(2000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
      const callApi = async () => {
          await apiCalls.getApiCall('randomSpoonacular', auth.authData.token)
          .then( json => {
            setRecetas(json.recipes);
          })
      }
      callApi();
    }, []);

    const buscarIngredientes = () => {
      navigation.navigate("IngredientsScreen");
    }
    
    const recetasFavoritas = () => {
      navigation.navigate("FavoriteRecipesScreen");
    }

    const Item = ({ item }) => (

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
              source={{uri: item.image}}
              resizeMode="cover"
              style={styles.cardImg}
            />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDetails}>
                {item.creditsText}
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
          ListHeaderComponent = {
            <>
            <View style={styles.sliderContainer}>
              <Swiper
                autoplay
                horizontal={false}
                height={200}
                activeDotColor="#FF6347">
                <View style={styles.slide}>
                  <Image
                    source={require("../../assets/banners/3.jpg")}
                    resizeMode="cover"
                    style={styles.sliderImage}
                  />
                </View>
                <View style={styles.slide}>
                  <Image
                    source={require("../../assets/banners/2.jpg")}
                    resizeMode="cover"
                    style={styles.sliderImage}
                  />
                </View>
                <View style={styles.slide}>
                  <Image
                    source={require("../../assets/banners/1.jpg")}
                    resizeMode="cover"
                    style={styles.sliderImage}
                  />
                </View>
              </Swiper>
            </View>

            <View style={styles.categoryContainer}>
              <TouchableOpacity
                style={styles.categoryBtn}
                >
                <View style={styles.categoryIcon}>
                <MaterialCommunityIcons name="food-apple" size={35} color="#FF6347" />
                </View>
                <Text style={styles.categoryBtnTxt}>Nutrición</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={recetasFavoritas}
                style={styles.categoryBtn}
                >
                <View style={styles.categoryIcon}>
                  <MaterialCommunityIcons
                    name="heart-outline"
                    size={35}
                    color="#FF6347"
                  />
                </View>
                <Text style={styles.categoryBtnTxt}>Favoritas</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryBtn} onPress={buscarIngredientes}>
                <View style={styles.categoryIcon}>
                  <MaterialCommunityIcons name="magnify" size={35} color="#FF6347" />
                </View>
                <Text style={styles.categoryBtnTxt}>Ingredientes</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.cardsWrapper}>
            <Text
                    style={{
                    alignSelf: 'center',
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: '#333',
                  }}>
                    Recetas
                  </Text>
            </View> 
            </>
          }
          // si pones data={recetas} tambien hace lo mismo pero marca warning, no se por que jaja que raro 
          data={Object.values(recetas)} 
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          refreshControl={
            <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                enabled={true}
            />
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
