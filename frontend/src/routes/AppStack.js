import React from 'react';
// import {createStackNavigator} from '@react-navigation/stack';
// import {HomeScreen} from '../screens/HomeScreen';

// //import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTabScreen from '../screens/MainTabScreen';
import { DrawerContent } from '../screens/DrawerContent';
import { RecipeScreen } from '../screens/RecipeScreen';

// const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export const AppStack = () => {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen 
          name="HomeDrawer" 
          component={MainTabScreen} 
        />
        <Drawer.Screen name="RecipeScreen" 
          component={RecipeScreen} 
          options={{
            title: 'Receta',
            headerStyle: {
              backgroundColor: '#2DA596',
            },
            headerTintColor: '#fff',
          }} 
        />
        
    </Drawer.Navigator>
  );
};

/**/
