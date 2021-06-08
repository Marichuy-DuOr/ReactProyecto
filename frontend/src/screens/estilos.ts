import {StyleSheet} from 'react-native';

export const estilos = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection:"column"
    },
    /*containersignup:{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },*/
    scrollView: {
        margin:20,
    },
    entrada:{
        backgroundColor:'#64CBBF',
        padding:12,
        marginBottom:10,
        borderRadius: 10,
    },
    textoTitulo:{
        fontSize:20,
        padding:10,
        color:'#384F4C'
    },
    textoSmall:{
        fontSize:10,
        paddingTop:15,
        color:'#384F4C'
    },
    fondo:{
        flex:1,
        resizeMode:"cover"
    },
    formulario:{
        margin: 50
    }
});
