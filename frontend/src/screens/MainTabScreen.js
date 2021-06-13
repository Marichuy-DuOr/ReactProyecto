import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {HomeScreen} from './HomeScreen';
import {RecipeScreen} from './RecipeScreen';
import SearchRecipes from './SearchRecipes';
import ExploreScreen from './ExploreScreen';
import ProfileScreen from './ProfileScreen';

const HomeStack = createStackNavigator();
const ExploreStack = createStackNavigator();
const ProfileStack = createStackNavigator();

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
        name="Mis Recetas"
        component={ExploreStackScreen}
        options={{
          tabBarLabel: 'Mis Recetas',
          tabBarColor: '#d02860',
          tabBarIcon: ({ color }) => (
            <Icon name="add-outline" color={color} size={26} />
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
          <Icon.Button name="ios-search" size={25} backgroundColor="#009387" onPress={() => {navigation.navigate('SearchRecipes')}}></Icon.Button>
        )
        }}/>

        <HomeStack.Screen name="RecipeScreen" component={RecipeScreen} options={{
        title:'Receta',
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
          <ExploreStack.Screen name="Mis Recetas" component={ExploreScreen} options={{
          headerLeft: () => (
              <Icon.Button name="ios-menu" size={25} backgroundColor="#d02860" onPress={() => navigation.openDrawer()}></Icon.Button>
          ),
          headerRight:() => (
            <Icon.Button name="ios-search" size={25} backgroundColor="#d02860" onPress={() => {navigation.navigate('SearchRecipes')}}></Icon.Button>
          )
          }} />
  </ExploreStack.Navigator>
  );