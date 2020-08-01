import React from 'react'
import {StyleSheet,TouchableOpacity, Dimensions,Text, View} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
const windowWidth = Dimensions.get('window').width-20;

const ItemChat = (props) => (
   <View style={{...styles.cardView, width:windowWidth, marginVertical:3,marginHorizontal:9 }}>
       <View style={{flexDirection:'row'}}> 
     <Text style={{padding:12,textTransform: 'uppercase', color:'#07B83A'}} >
        {props.nombre}</Text>           
    </View>    
      <View style={{flexDirection:'row-reverse'}}>
        <TouchableOpacity style={{marginHorizontal:5}}
           
            onPress={props.modal.bind(this,props)}>
           <Ionicons name="md-paper-plane" size={36} color="#07B83A" />
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

  export default ItemChat;