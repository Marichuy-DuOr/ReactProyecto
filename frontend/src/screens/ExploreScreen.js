import React, {useState} from 'react';
import {Formik} from 'formik';
import {StyleSheet, Text, StatusBar, TextInput, Button, Alert, ScrollView, SafeAreaView } from 'react-native';
import * as yup from 'yup';
import {useAuth} from '../contexts/Auth';
import apiCalls from '../utils/apiCalls';

export const ExploreScreen = ({navigation}) => {
    const auth = useAuth();
   const  registrarOriginal = async (values) => {
      const body = {
        nombre: values.nombre,
        listoMinutos: values.listoMinutos,
        descripcion: values.descripcion,
        ingredientes: values.ingredientes,
        instrucciones: values.instrucciones,
        image: values.image,
      }
    
      await apiCalls.postApiCall(`original`, body , auth.authData.token)
        .then( json => {
          console.log(json);
          Alert.alert('Guardaste tu receta!!');
      }).then( json => {
        console.log(json);
        navigation.navigate("Mis Recetas");
      })
    };
    
    return(
      <Formik
        initialValues={{
            nombre: "",
            listoMinutos: "", 
            descripcion: "",
            ingredientes: "",
            instrucciones: "",
            image: ""
        }} 
        // onSubmit={values=>alert.alert(JSON.stringify(values))}
        onSubmit={values=>{
          registrarOriginal(values);
        }}
        validationSchema={yup.object().shape(
          {
            nombre: yup
              .string()
              .required('Campo titulo requerido'),
            listoMinutos: yup
              .string()
              .required('Campo minutos requerido'),
            descripcion: yup
              .string()
              .required('Campo descripcion requerido'),
            ingredientes: yup
              .string()
              .required('Campo ingredientes requerido'),
            instrucciones: yup
              .string()
              .required('Campo instrucciones requerido'), 
            image: yup
              .string()
              .required('Campo url imagen requerido'), 
              })  
          }
        >
          {({values,handleChange,errors,setFieldTouched, touched,isValid,handleSubmit})=>(
          <SafeAreaView style={styles.container}>
          <ScrollView >
            <TextInput 
              style={styles.entrada}
              value={values.nombre}
              onChangeText={handleChange('nombre')}
              placeholder="Titulo"
            />
            {touched.nombre && errors.nombre && 
                <Text style={{fontSize:12,color:'red'}}>{errors.nombre}</Text>
            }
            <TextInput 
              style={styles.entrada}
              value={values.listoMinutos}
              onChangeText={handleChange('listoMinutos')}
              placeholder="Listo Minutos"
            />
            {touched.listoMinutos && errors.listoMinutos && 
                <Text style={{fontSize:12,color:'red'}}>{errors.listoMinutos}</Text>
            }
            <TextInput 
              style={styles.area}
              multiline={true}
              numberOfLines={10}
              value={values.descripcion}
              onChangeText={handleChange('descripcion')}
              placeholder="Descripcion"
            />
            {touched.descripcion && errors.descripcion && 
                <Text style={{fontSize:12,color:'red'}}>{errors.descripcion}</Text>
            }
            <TextInput 
              style={styles.area}
              multiline={true}
              numberOfLines={10}
              value={values.ingredientes}
              onChangeText={handleChange('ingredientes')}
              placeholder="Ingredientes"
            />
            {touched.ingredientes && errors.ingredientes && 
                <Text style={{fontSize:12,color:'red'}}>{errors.ingredientes}</Text>
            }
            <TextInput 
              style={styles.area}
              multiline={true}
              numberOfLines={10}
              value={values.instrucciones}
              onChangeText={handleChange('instrucciones')}
              placeholder="Instrucciones"
            />
            {touched.instrucciones && errors.instrucciones && 
                <Text style={{fontSize:12,color:'red'}}>{errors.instrucciones}</Text>
            }
            <TextInput 
              style={styles.entrada}
              value={values.image}
              onChangeText={handleChange('image')}
              placeholder="Url imagen"
            />
            {touched.image && errors.image && 
                <Text style={{fontSize:12,color:'red'}}>{errors.image}</Text>
            }
            <Button 
              color='#1f65ff'
              title="enviar"
              disabled={!isValid}
              onPress={handleSubmit}
            /> 
          </ScrollView> 
          </SafeAreaView>
        )}
      </Formik>
    );
  
}

const styles=StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  entrada:{
    borderWidth:1,
    borderColor:'#d02860',
    padding:12,
    marginBottom:10,
    borderRadius: 10
  }, 
  area:{
    borderWidth:1,
    borderColor:'#d02860',
    padding:12,
    marginBottom:10,
    height: 120,
    borderRadius: 10
  }
})