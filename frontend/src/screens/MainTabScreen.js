import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {HomeScreen} from './HomeScreen';
import {RecipeScreen} from './RecipeScreen';
import {IngredientsScreen} from './IngredientsScreen';
import {IngredientScreen} from './IngredientScreen';
import {SearchRecipesScreen} from './SearchRecipesScreen';
import {FavoriteIngredientsScreen} from './FavoriteIngredientsScreen';
import {FavoriteRecipesScreen} from './FavoriteRecipesScreen';
import DetailsScreen from './DetailsScreen';
import {ExploreScreen} from './ExploreScreen';
import ProfileScreen from './ProfileScreen';
import { MyRecipesScreen } from './MyRecipesScreen';
import { OriginalScreen } from './OriginalScreen';
import { EditRecipe } from './EditRecipe';

const HomeStack = createStackNavigator();
const ExploreStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const RecipesStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
  
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
      shifting={true}
      >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Yo',
          tabBarColor: '#1f65ff',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Agregar Receta"
        component={ExploreStackScreen}
        options={{
          tabBarLabel: 'Recetas',
          tabBarColor: '#d02860',
          tabBarIcon: ({ color }) => (
            <Icon name="add-outline" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Mis Recetas"
        component={RecipesStackScreen}
        options={{
          tabBarLabel: 'Recetas',
          tabBarColor: '#97DF3C',
          tabBarIcon: ({ color }) => (
            <Icon name="bookmark-outline" color={color} size={26} />
          ),
        }}
      />
      
    </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({navigation}) => (
<HomeStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#009387'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
        <HomeStack.Screen name="Home" component={HomeScreen} options={{
        title:'FoodApp',
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
        ),
        headerRight:() => (
          <Icon.Button name="ios-search" size={25} backgroundColor="#009387" onPress={() => {
            // navigation.navigate('SearchRecipes')
            navigation.navigate(
              'SearchRecipes',
              { similares:  false},
            );
          }}></Icon.Button>
        )
        }}/>

        <HomeStack.Screen name="RecipeScreen" component={RecipeScreen} options={{
        title:'Receta',
        headerBackTitleVisible: false,
        headerTitle: false,
        headerTransparent: true,
        headerTintColor: '#fff'
        }} />
        
        <HomeStack.Screen name="SearchRecipes" component={SearchRecipesScreen} options={{
        title:'Buscar recetas',
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
        ),
        }} />

        <HomeStack.Screen name="IngredientsScreen" component={IngredientsScreen} options={{
        title:'Ingredientes',
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
        ),
        }} />
        
        <HomeStack.Screen name="FavoriteRecipesScreen" component={FavoriteRecipesScreen} options={{
        title:'Recetas favoritos',
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
        ),
        headerRight:() => (
          <Icon.Button name="md-arrow-redo-outline" size={25} backgroundColor="#009387" onPress={() => {
            navigation.navigate('FavoriteIngredientsScreen');
          }}></Icon.Button>
        )
        }} />
        
        <HomeStack.Screen name="FavoriteIngredientsScreen" component={FavoriteIngredientsScreen} options={{
        title:'Ingredientes favoritos',
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
        ),
        headerRight:() => (
          <Icon.Button name="md-arrow-redo-outline" size={25} backgroundColor="#009387" onPress={() => {
            navigation.navigate('FavoriteRecipesScreen');
          }}></Icon.Button>
        )
        }} />
        
        <HomeStack.Screen name="IngredientScreen" component={IngredientScreen} options={{
        title:'Ingrediente',
        headerBackTitleVisible: false,
        headerTitle: false,
        headerTransparent: true,
        headerTintColor: '#fff'
        }} />

</HomeStack.Navigator>
);

const ProfileStackScreen = ({navigation}) => (
<ProfileStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#1f65ff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
        <ProfileStack.Screen name="Perfil" component={ProfileScreen} options={{
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#1f65ff" onPress={() => navigation.openDrawer()}></Icon.Button>
        ),
        headerRight:() => (
          <Icon.Button name="ios-search" size={25} backgroundColor="#1f65ff" onPress={() => {navigation.navigate('SearchRecipes')}}></Icon.Button>
        )
        }} />
</ProfileStack.Navigator>
);

const ExploreStackScreen = ({navigation}) => (
  <ExploreStack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#d02860',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
          <ExploreStack.Screen name="Agregar Receta" component={ExploreScreen} options={{
          headerLeft: () => (
              <Icon.Button name="ios-menu" size={25} backgroundColor="#d02860" onPress={() => navigation.openDrawer()}></Icon.Button>
          ),
          headerRight:() => (
            <Icon.Button name="ios-search" size={25} backgroundColor="#d02860" onPress={() => {navigation.navigate('SearchRecipes')}}></Icon.Button>
          )
          }} />
  </ExploreStack.Navigator>
  );

  const RecipesStackScreen = ({navigation}) => (
    <RecipesStack.Navigator screenOptions={{
            headerStyle: {
            backgroundColor: '#97DF3C'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            fontWeight: 'bold'
            }
        }}>
            <RecipesStack.Screen name="Mis Recetas" component={MyRecipesScreen} options={{
            title:'Mis Recetas',
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#97DF3C" onPress={() => navigation.openDrawer()}></Icon.Button>
            ),
            headerRight:() => (
              <Icon.Button name="ios-search" size={25} backgroundColor="#97DF3C" onPress={() => {navigation.navigate('SearchRecipes')}}></Icon.Button>
            )
            }}/>
            <RecipesStack.Screen name="OriginalScreen" component={OriginalScreen} options={{
              title:'Receta',
              headerBackTitleVisible: false,
              headerTitle: false,
              headerTransparent: true,
              headerTintColor: '#fff'
              }} />
            <RecipesStack.Screen name="EditRecipe" component={EditRecipe} options={{
              title:'Actualizar Receta',
              headerTintColor: '#fff'
              }} />
            
    
    </RecipesStack.Navigator>
    );
