import React from 'react'
import {StyleSheet,  Dimensions,Text, View} from 'react-native'
import PDFReader from 'rn-pdf-reader-js';
const windowWidth = Dimensions.get('window').width-20;

const ItemFormato = (props) => (
   <View style={{...styles.cardView, width:windowWidth ,marginHorizontal:9 }}>
      <Text style={styles.texto} >
         Semillero: {props.semillero}</Text>
      <Text style={styles.texto} >
        Titulo: {props.titulo}
      </Text> 
      <Text style={styles.texto} >
        Autor: {props.autor}
      </Text> 
      <Text style={styles.texto}  >
          identificacion:  {props.identificacion}
      </Text> 
      <Text style={styles.texto}  >
        Email: {props.email}
      </Text> 
      <Text style={styles.texto}  >
        Telefono: {props.telefono}
      </Text> 
      <Text style={styles.texto}  >
        {props.categoria}
      </Text> 
      <Text style={styles.texto}  >
        Area:  {props.area}
      </Text> 
      <PDFReader
          style={{ width:280, height:340}}
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
      },
     texto: {textTransform: 'uppercase', color:'#076ED5', fontWeight:'bold'}

});

  export default ItemFormato;