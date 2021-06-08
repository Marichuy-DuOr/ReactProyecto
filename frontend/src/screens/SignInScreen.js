import React, {useState} from 'react';
import {
  ActivityIndicator, 
  Button, 
  Text, 
  View, 
  Alert, 
  TextInput, 
  ImageBackground
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useAuth} from '../contexts/Auth';
import {estilos} from './estilos';

const background = require("../../assets/sign_in_background.jpg");

export const SignInScreen = ({navigation}) => {
  const [loading, isLoading] = useState(false);
  const auth = useAuth();

  const signIn = async (_email, _password) => {
    isLoading(true);

    await auth.signIn(_email, _password )
    .catch(err => {
      console.log('There was an error:' + err);
      Alert.alert('La cuenta no existe o alguno de los campos es incorrecto');
      isLoading(false);
    })
        
  };

  return (
    <View style={estilos.container}>
      <ImageBackground 
        style={estilos.fondo}
        source={background}>
        {loading ? (
          <ActivityIndicator color={'#000'} animating={true} size="small" />
        ) : (
          <>
            
            <Formik
              initialValues={{
                nombre:"",
                email:"",
                password:""
              }} 
              onSubmit={values=>{
                signIn(values.email,values.password)
              }}
              validationSchema={yup.object().shape(
              {
                email: yup
                  .string()
                  .email('Ingresa correo valido')
                  .required('campo email requerido'),
                password: yup
                  .string()
                  .required('campo password requerido')
                  .min(4,'campo al menos 4 caracteres')
                  .max(10,"Maximo 10 carecteres"),
                  })  
              }
              >
                {({values,handleChange,errors,setFieldTouched, touched,isValid,handleSubmit})=>(
                <View style={estilos.formulario}>
                  <Text style={estilos.textoTitulo}>Inicia sesión</Text>
                  <TextInput 
                    style={estilos.entrada}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={()=>setFieldTouched('email')}
                    placeholder="email"
                    autoCapitalize='none'
                  />
                  {touched.email && errors.email && 
                    <Text style={{fontSize:12,color:'red'}}>{errors.email}</Text>
                  }
                  <TextInput 
                    style={estilos.entrada}
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={()=>setFieldTouched('password')}
                    placeholder="password"
                    secureTextEntry={true}
                  />
                  {touched.password && errors.password && 
                    <Text style={{fontSize:12,color:'red'}}>{errors.password}</Text>
                  } 
                  <Button 
                    color='#B4BE1E'
                    title="Sing in"
                    disabled={!isValid}
                    onPress={handleSubmit}
                  /> 
                  <Text style={estilos.textoSmall}>¿Aún no tienes una cuenta?</Text>
                  <Button
                    color='#EEBC36'
                    title="Sign up"
                    onPress={() => navigation.navigate("SignUpScreen")}
                  />
                </View> 
              )}
            </Formik>
          </>
        )}
      </ImageBackground>
    </View>
  );
};
