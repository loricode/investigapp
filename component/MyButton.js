import React from 'react'
import {StyleSheet, TouchableOpacity, Text} from 'react-native'

const MyButton =(props) =><TouchableOpacity 
     style={{ ...styles.openButton, backgroundColor: props.background }}
      onPress={props.MyOnPress}>
      <Text style={styles.textoUno}>{props.texto}</Text>
     </TouchableOpacity>

const styles = StyleSheet.create({
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 10,
        padding: 14,
        marginHorizontal:3,
        elevation: 2
      },
      textoUno:{
        color:'white',
        fontWeight:'bold'
        
      },

});

export default MyButton;