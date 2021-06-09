import React, {createContext, useState, useContext, useEffect } from 'react';
// import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthData, authService} from '../services/authService';
// import {API_URL_SOCKET} from "@env";
const API_URL_SOCKET = 'http://192.168.100.13:4000/';

const io = require('socket.io-client');
const socket = io(API_URL_SOCKET);

type AuthContextData = {
  authData?: AuthData;
  loading: boolean;
  signIn(_email: string, _password: string): Promise<void>;
  signOut(): void;
};

//Create the Auth Context with the data type specified
//and a empty object
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({children}) => {
  const [authData, setAuthData] = useState<AuthData>();

  //the AuthContext start with loading equals true
  //and stay like this, until the data be load from Async Storage
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Every time the App is opened, this provider is rendered
    //and call de loadStorage function.
    loadStorageData();
  }, []);

  const handleNewMessage = (email) => {
    
    var date = new Date().getDate() + '/';
    date += (new Date().getMonth() + 1) + '/';
    date += new Date().getFullYear() + ' ';
    date += new Date().getHours()+ ':';
    date += new Date().getMinutes() + ':';
    date += new Date().getSeconds();
    socket.emit('new-logueo', {
      email: email,
      date: date
    });
    console.log('emitting new message');
  }

  async function loadStorageData(): Promise<void> {
    try {
      //Try get the data from Async Storage
      const authDataSerialized = await AsyncStorage.getItem('@AuthData');
      if (authDataSerialized) {
        //If there are data, it's converted to an Object and the state is updated.
        const _authData: AuthData = JSON.parse(authDataSerialized);
        setAuthData(_authData);
      }
    } catch (error) {
    } finally {
      //loading finished
      setLoading(false);
    }
  }

  const signIn = async (_email: string, _password: string) => {
    
    //call the service passing credential (email and password).
    await authService.signIn(
      _email,
      _password,
    )
    .then(_authData => {
      
      //Set the data in the context, so the App can be notified
      //and send the user to the AuthStack
      setAuthData(_authData);

      //Socket 
      handleNewMessage(_email);

      //Persist the data in the Async Storage
      //to be recovered in the next user session.
      AsyncStorage.setItem('@AuthData', JSON.stringify(_authData));
    })
    .catch(err => {
      throw err;
    })

    
  };

  const signOut = async () => {
    //Remove data from context, so the App can be notified
    //and send the user to the AuthStack
    setAuthData(undefined);

    //Remove the data from Async Storage
    //to NOT be recoverede in next session.
    await AsyncStorage.removeItem('@AuthData');
  };

  return (
    //This component will be used to encapsulate the whole App,
    //so all components will have access to the Context
    <AuthContext.Provider value={{authData, loading, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

//A simple hooks to facilitate the access to the AuthContext
// and permit components to subscribe to AuthContext updates
function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export {AuthContext, AuthProvider, useAuth};