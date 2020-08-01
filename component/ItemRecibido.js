import React from 'react'
import {StyleSheet,  Dimensions,Text, View} from 'react-native'
import PDFReader from 'rn-pdf-reader-js'
const windowWidth = Dimensions.get('window').width-20;

const ItemRecibido = (props) => (
    
   <View style={{...styles.cardView, width:windowWidth, marginVertical:3 }}>
      <Text style={{textTransform: 'uppercase', fontWeight:'bold'}}>{props.materia}</Text>
      <Text style={{textTransform: 'uppercase', color:'green', }} >
        {props.grado}
      </Text>   
      <PDFReader
          style={{backgroundColor:'#000', borderTopWidth:1, width:270,height:400}}
          source={{
                 base64: props.uri
        }}
      />
      <Text >Entregado: {props.fecha}</Text>
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

  export default ItemRecibido ;