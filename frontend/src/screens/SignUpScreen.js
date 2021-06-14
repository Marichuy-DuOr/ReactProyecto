import React, {useState} from 'react';
import {
  ActivityIndicator, 
  Button, 
  Text, 
  TextInput, 
  SafeAreaView, 
  ScrollView,
  ImageBackground
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useAuth} from '../contexts/Auth';
// import {API_URL} from "@env";
import {estilos} from './estilos';
// const API_URL = 'http://192.168.1.73:4000/api/';
// const API_URL = 'http://192.168.100.9:4000/api/';

const background = require("../../assets/sign_up_background.jpg");

export const SignUpScreen = ({navigation}) => {
  const [loading, isLoading] = useState(false);
  const auth = useAuth();

  const signUp = async (values) => {
    isLoading(true);

    const body = {
      nombre: values.nombre,
      apepat: values.apepat,
      apemat: values.apemat,
      email: values.email,
      password: values.password,
    }
    
    await apiCalls.postApiCallnoT(`signup`, body)
    .then( json => {
      console.log(json);
      navigation.navigate("SignInScreen");
    })
  };

  return (
    <ImageBackground 
        style={estilos.fondo}
        source={background}>
    <SafeAreaView style={estilos.container}>
      <ScrollView style={estilos.scrollView}>
      
        {loading ? (
          <ActivityIndicator color={'#000'} animating={true} size="small" />
        ) : (
          <>
            <Formik
              initialValues={{
                nombre:"",
                apepat:"",
                apemat:"",
                email:"",
                password:"",
                password2:""
              }} 
              onSubmit={values=>{
                signUp(values);
                /* isLoading(true);
                console.log(API_URL + "signup");
                fetch(API_URL + "signup",{
                  method: 'POST',
                  headers:{
                    'Content-Type':'application/json'
                  },
                  body:JSON.stringify({
                    nombre: values.nombre,
                    apepat: values.apepat,
                    apemat: values.apemat,
                    email: values.email,
                    password: values.password,
                  })
                }).then( response => {
                  if (response.ok) {
                    return response.json()
                  } else {
                    console.log("Algo salio mal :c");
                  }
                }).then( json => {
                  console.log(json);
                  navigation.navigate("SignInScreen");
                }) */
              }}
              validationSchema={yup.object().shape(
              {
                nombre: yup
                  .string()
                  .required('Campo nombre requerido'),
                apepat: yup
                  .string()
                  .required('Campo apellido paterno requerido'),
                apemat: yup
                  .string()
                  .required('Campo apellido materno requerido'),
                email: yup
                  .string()
                  .email('Ingresa correo valido')
                  .required('Campo email requerido'),
                password: yup
                  .string()
                  .required('Campo contraseña requerido')
                  .min(4,'Campo al menos 4 caracteres')
                  .max(10,"Maximo 10 carecteres"),
                password2: yup
                  .string()
                  .required('Comprueba tu contraseña')
                  .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden')
                  .min(4,'Campo al menos 4 caracteres')
                  .max(10,"Maximo 10 carecteres"),
                  })  
              }
              >
                {({values,handleChange,errors,setFieldTouched, touched,isValid,handleSubmit})=>(
                  <>
                    <Text style={estilos.textoTitulo}>Registrate</Text>
                    <TextInput 
                      style={estilos.entrada}
                      value={values.nombre}
                      onChangeText={handleChange('nombre')}
                      onBlur={()=>setFieldTouched('nombre')}
                      placeholder="Nombre"
                    />
                    {touched.nombre && errors.nombre && 
                      <Text style={{fontSize:12,color:'red'}}>{errors.nombre}</Text>
                    }
                    <TextInput 
                      style={estilos.entrada}
                      value={values.apepat}
                      onChangeText={handleChange('apepat')}
                      onBlur={()=>setFieldTouched('apepat')}
                      placeholder="Apellido paterno"
                    />
                    {touched.apepat && errors.apepat && 
                      <Text style={{fontSize:12,color:'red'}}>{errors.apepat}</Text>
                    }
                    <TextInput 
                      style={estilos.entrada}
                      value={values.apemat}
                      onChangeText={handleChange('apemat')}
                      onBlur={()=>setFieldTouched('apemat')}
                      placeholder="Apellido materno"
                    />
                    {touched.apemat && errors.apemat && 
                      <Text style={{fontSize:12,color:'red'}}>{errors.apemat}</Text>
                    }
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
                      placeholder="Contraseña"
                      secureTextEntry={true}
                    />
                    {touched.password && errors.password && 
                      <Text style={{fontSize:12,color:'red'}}>{errors.password}</Text>
                    } 
                    <TextInput 
                      style={estilos.entrada}
                      value={values.password2}
                      onChangeText={handleChange('password2')}
                      onBlur={()=>setFieldTouched('password2')}
                      placeholder="Confirma tu contraseña"
                      secureTextEntry={true}
                    />
                    {touched.password2 && errors.password2 && 
                      <Text style={{fontSize:12,color:'red'}}>{errors.password2}</Text>
                    } 
                    <Button 
                      color='#B4BE1E'
                      title="Sing up"
                      disabled={!isValid}
                      onPress={handleSubmit}
                    /> 
                    <Text style={estilos.textoSmall}>¿Ya tienes una cuenta?</Text>
                    <Button
                      color='#EEBC36'
                      title="Go to SingIn"
                      onPress={() => navigation.navigate("SignInScreen")}
                    />
                  </>
              )}
            </Formik>
          </>
        )}
        
      </ScrollView>
    </SafeAreaView>
    </ImageBackground>
  );
};
