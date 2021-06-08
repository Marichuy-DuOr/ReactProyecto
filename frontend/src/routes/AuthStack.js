import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SignInScreen} from './../screens/SignInScreen';
import {SignUpScreen} from './../screens/SignUpScreen';

const Stack = createStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="SignInScreen" 
        component={SignInScreen} 
        options={{
          title: 'Sign In',
          headerStyle: {
            backgroundColor: '#2DA596',
          },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen 
        name="SignUpScreen" 
        component={SignUpScreen}
        options={{
          title: 'Sign Up',
          headerStyle: {
            backgroundColor: '#2DA596',
          },
          headerTintColor: '#fff',
        }} 
      />
    </Stack.Navigator>
  );
};
