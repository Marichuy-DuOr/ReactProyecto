import React, {useState, useEffect} from 'react';
import {Formik} from 'formik';
import {StyleSheet, Text, StatusBar, TextInput, Button, Alert, ScrollView, SafeAreaView } from 'react-native';
import {useAuth} from '../contexts/Auth';
import apiCalls from '../utils/apiCalls';

export const EditRecipe = ({route, navigation}) => {
    const [receta, setReceta] = useState([]);
    const auth = useAuth();

    useEffect(() => {
        const callApi = async () => {
            await apiCalls.getApiCall(`original/${route.params.id}`, auth.authData.token)
            .then( json => {
                console.log(json.data[0]);
              setReceta(json.data[0]);
            })
        }
        callApi();
      }, []);

   const  registrarOriginal = async (values) => {
      const body = {
        nombre: values.nombre,
        listoMinutos: values.listoMinutos,
        descripcion: values.descripcion,
        ingredientes: values.ingredientes,
        instrucciones: values.instrucciones,
        image: values.image,
      }
    
      await apiCalls.putApiCall(`original/${route.params.id}`, body , auth.authData.token)
        .then( json => {
          console.log(json);
          Alert.alert('Cambios Realizados');
      }).then( json => {
        console.log(json);
        navigation.navigate("Mis Recetas");
      })
    };
    
    return(
      <Formik
        initialValues={{
            nombre: receta.nombre,
            listoMinutos: receta.listoMinutos, 
            descripcion: receta.descripcion,
            ingredientes: receta.ingredientes,
            instrucciones: receta.instrucciones,
            image: receta.image
        }} 
        // onSubmit={values=>alert.alert(JSON.stringify(values))}
        onSubmit={values=>{
          registrarOriginal(values);
        }}
        
        >
          {({values,handleChange,errors,setFieldTouched, touched,isValid,handleSubmit})=>(
          <SafeAreaView style={styles.container}>
          <ScrollView >
            <TextInput 
              defaultValue={receta.nombre}
              style={styles.entrada}
              value={values.nombre}
              onChangeText={handleChange('nombre')}
            />
            <TextInput 
              style={styles.entrada}
              value={values.listoMinutos}
              onChangeText={handleChange('listoMinutos')}
              defaultValue={receta.listoMinutos}
            />
            <TextInput 
              style={styles.area}
              multiline={true}
              numberOfLines={10}
              value={values.descripcion}
              onChangeText={handleChange('descripcion')}
              defaultValue={receta.descripcion}
            />
            <TextInput 
              style={styles.area}
              multiline={true}
              numberOfLines={10}
              value={values.ingredientes}
              onChangeText={handleChange('ingredientes')}
              defaultValue={receta.ingredientes}
            />
            <TextInput 
              style={styles.area}
              multiline={true}
              numberOfLines={10}
              value={values.instrucciones}
              onChangeText={handleChange('instrucciones')}
              defaultValue={receta.instrucciones}
            />
            <TextInput 
              style={styles.entrada}
              value={values.image}
              onChangeText={handleChange('image')}
              defaultValue={receta.image}
            />
            <Button 
              color='#1f65ff'
              title="Actualizar"
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