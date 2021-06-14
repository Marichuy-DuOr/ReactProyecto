import React, {Component} from 'react';
import {Formik} from 'formik';
import {StyleSheet, Text, View, TextInput, Button, Alert, ScrollView } from 'react-native';
import * as yup from 'yup';

export default class App extends Component{
  render(){
    return(
      <Formik
        initialValues={{
            id_usuario: "",
            nombre: "",
            listoMinutos: "", 
            descripcion: "",
            ingredientes: "",
            instrucciones: "",
            image: ""
        }} 
        // onSubmit={values=>alert.alert(JSON.stringify(values))}
        onSubmit={values=>{
          fetch('http://192.168.100.9:4000/insertar',{
            method: 'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({
                nombre: values.nombre,
                listoMinutos: values.listoMinutos, 
                descripcion: values.descripcion,
                ingredientes: values.ingredientes,
                instrucciones: values.instrucciones,
                image: values.image
            })
          }).then(() => {
              console.log('Datos enviados a guardar')
          })
          Alert.alert(JSON.stringify("Receta guardada ahora la puedes consultar en Mis Recetas"))
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
          <View style={styles.container}>
            <TextInput 
              style={styles.entrada}
              value={values.nombre}
              onChangeText={handleChange('nombre')}
              placeholder="Titulo"
            />
            <TextInput 
              style={styles.entrada}
              value={values.listoMinutos}
              onChangeText={handleChange('listoMinutos')}
              placeholder="Listo Minutos"
            />
            <TextInput 
              style={styles.entrada}
              value={values.descripcion}
              onChangeText={handleChange('descripcion')}
              placeholder="Descripcion"
            />
            <TextInput 
              style={styles.entrada}
              value={values.ingredientes}
              onChangeText={handleChange('ingredientes')}
              placeholder="Ingredientes"
            />
            <TextInput 
              style={styles.entrada}
              value={values.instrucciones}
              onChangeText={handleChange('instrucciones')}
              placeholder="Instrucciones"
            />
            <TextInput 
              style={styles.entrada}
              value={values.image}
              onChangeText={handleChange('image')}
              placeholder="Url imagen"
            />
            <Button 
              color='#1f65ff'
              title="enviar"
              disabled={!isValid}
              onPress={handleSubmit}
            /> 
          </View> 
        )}
      </Formik>
    );
  } 
}

const styles=StyleSheet.create({
  container:{
    padding:50
  },
  entrada:{
    borderWidth:1,
    borderColor:'#d02860',
    padding:12,
    marginBottom:10
  }
})