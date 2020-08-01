import React from 'react'
import {StyleSheet,  Dimensions,Text,TouchableOpacity ,View} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
const windowWidth = Dimensions.get('window').width-20;

const ItemProfesor = (props) => (
    
   <View style={{...styles.cardView, width:windowWidth, marginVertical:3 }}>
      <Text style={{textTransform: 'uppercase', fontWeight:'bold'}}>
          Profesor: {props.nombre}</Text>
        <Text style={{textTransform: 'uppercase', fontWeight:'bold'}}>
          Telefono: {props.telefono}</Text>   
      <Text style={{textTransform: 'uppercase', color:'green'}} >
          Correo {props.correo}
      </Text> 
     <View style={{flexDirection:'row-reverse'}}>
        <TouchableOpacity style={{marginHorizontal:5}}
             onPress={props.mymodal.bind(this,props)}>
           
           <Ionicons name="md-paper-plane" size={36} color="#0DDCC0" />
       </TouchableOpacity>
      
       <TouchableOpacity  style={{marginHorizontal:5}}
           
           onPress={props.getmensaje.bind(this,props)}>
          
          <Ionicons name="md-paper" size={36} color="#09C4CA" />
      </TouchableOpacity>
       </View>

    
   </View>
  );
  
const styles = StyleSheet.create({
    cardView: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      }

});

  export default ItemProfesor;