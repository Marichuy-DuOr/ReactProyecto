import jwt_decode from "jwt-decode";
// import {API_URL} from "@env";
const API_URL = 'http://192.168.100.13:4000/api/';

export type AuthData = {
  token: string;
  _id: string, 
  email: string,
  nombre: string, 
  apepat: string, 
  apemat: string 
};

interface MyToken {
  _id: string, 
  nombre: string, 
  apepat: string, 
  apemat: string
}

const signIn = (_email: string, _password: string): Promise<AuthData> => {
  
  // send email and password, and if credential is corret
  //the API will resolve with some token and another datas as the below
  console.log(_email);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`${API_URL}signin`);
      fetch(`${API_URL}signin`,{
        method: 'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          email: _email,
          password: _password
        })
      }).then( response => {
        if (response.ok) {
          return response.json()
        }
      }).then( json => {
        console.log( json );
        if ( json ){
          const decodedToken = jwt_decode<MyToken>(json.token);
          console.log(decodedToken._id);
          resolve({
            token: json.token,
            _id: decodedToken._id,
            email: _email,
            nombre: decodedToken.nombre, 
            apepat: decodedToken.apepat, 
            apemat: decodedToken.apemat
          });
        } else {
          reject('Error');
        }
      });
    }, 1000);
  });
};
  
export const authService = {
  signIn,
};
