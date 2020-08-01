import React from 'react'
import {StyleSheet,  Dimensions,Text, View, TouchableOpacity} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import PDFReader from 'rn-pdf-reader-js';

const windowWidth = Dimensions.get('window').width-20;

const ItemTaller = (props) => (
   <View style={{...styles.cardView, width:windowWidth, marginVertical:3 }}>
    <TouchableOpacity  style={{margin:10}}
            onPress={props.respuesta.bind(this,props)} >
    <Ionicons name="md-paper-plane" size={26} color="blue" />
       </TouchableOpacity>  
      <Text style={{textTransform: 'uppercase', fontWeight:'bold'}}>{props.materia}</Text>
      <Text style={{textTransform: 'uppercase', color:'green'}} >
        {props.descripcion}
      </Text> 
      <PDFReader
          style={{ width:270, height:355}}
          source={{ base64: props.uri}}
      />
     
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

  export default ItemTaller;