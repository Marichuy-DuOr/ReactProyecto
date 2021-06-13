import React, {useState, useEffect} from 'react';
import { View, Text } from 'react-native';
import {useAuth} from '../contexts/Auth';

export default function SearchRecipes() {
    
    const auth = useAuth();

  
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Hola c:</Text>
        </View>
    );
}
