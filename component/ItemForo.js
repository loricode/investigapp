import React  from 'react'
import {StyleSheet, TouchableOpacity,TextInput , Dimensions,Text, View} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';

const windowWidth = Dimensions.get('window').width-20;

const ItemForo = (props) => (
  <View style={{...styles.cardView, width:windowWidth, marginVertical:3 }}>
      <Text style={{...styles.textoInfo ,fontSize:16,color:'blue'}}>{props.descripcion}</Text>
      <Text style={styles.textoInfo}>Materia: {props.materia}</Text>
      <Text style={styles.textoInfo}>Fecha de Entrega: {props.fecha}</Text>
       {props.fechaEnvio.charAt(0)=== '0' ? <></> : <Text style={styles.textoInfo}>Enviado: {props.fechaEnvio}</Text> }
       {props.fechaEnvio.charAt(0)=== '2' ? <></> :  
       <View style={{flexDirection:'row'}}>
   
       <TextInput style={styles.input}
         multiline={true}
         placeholder="Respuesta"  onChangeText={(e)=>props.myRespuesta(e)} />
       
       <TouchableOpacity  style={{margin:10}}
            onPress={props.MyOnPressRes.bind(this,props)} >
           <Ionicons name="md-paper-plane" size={36} color="blue" />
       </TouchableOpacity>     
       </View>}       
    </View>
  );
  
const styles = StyleSheet.create({
    cardView: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
 textoInfo:{
    fontWeight:'bold'
},
input:{
  borderBottomWidth:1,
  flex:1,
  marginVertical:5
},

});

  export default ItemForo;