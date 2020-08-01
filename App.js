import 'react-native-gesture-handler';
//import { StatusBar } from 'expo-status-bar'; <StatusBar style="auto" />
import React,{useState, useEffect} from 'react';
import { ScrollView, StyleSheet,Modal ,Image,Platform,FlatList, Switch,Text, View, TouchableOpacity, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Input from './component/Input'
import MyButton from './component/MyButton'
import ItemRecibido from './component/ItemRecibido'
import ItemTaller from './component/ItemTaller'
import ItemForo from './component/ItemForo'
import ItemChat from './component/ItemChat'
import ItemFormato from './component/ItemFormato'
import ItemProfesor from './component/ItemProfesor'
import DateTimePicker from '@react-native-community/datetimepicker';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  axios from 'axios'
const Tab = createBottomTabNavigator();

export default function App() {

const [modalVisibleProfesor, setModalVisibleProfesor ] = useState(false)
const [modalVisibleLogin, setModalVisibleLogin ] = useState(false)
const [modalVisibleAlumno,  setModalVisibleAlumno ] =  useState(false)
const [isLogin, setIsLogin ] = useState(false)

function Principal(){

  const [nombre, setNombre] = useState('');
  const [identificacion, setIdentificacion ] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [clave, setClave ] = useState('');
  const [grado, setGrado] = useState('');
  const [isEnabledP, setIsEnabledP] = useState(false);
  const [isEnabledA, setIsEnabledA] = useState(false);
  const toggleSwitchP = () => setIsEnabledP(previousState => !previousState);
  const toggleSwitchA = () => setIsEnabledA(previousState => !previousState);
  
const addProfesor = async() =>{
    try {
        const obj = {nombre, identificacion, telefono, correo, clave}
        const res = await axios.post('http://investigapp-co.preview-domain.com/backend/',obj);
        limpiar()
        alert(res.data.msg)
       } catch (error) { console.log(error) }
}

const addAlumno = async() =>{
  try {
    const obj = {nombre, identificacion, grado, correo, clave}
    const res = await axios.post('http://investigapp-co.preview-domain.com/backend/alumno.php',obj);
    alert(res.data.msg)
    limpiar()
   } catch (error) { console.log(error) }
}

function limpiar(){
  setNombre('');
  setCorreo('')
  setIdentificacion('')
  setGrado('')
  setTelefono('')
  setClave('')
 }


 const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('@KEY', jsonValue)
    
  } catch (e) { }
}

const login = async() =>{
  let bandera=''
  if(isEnabledP){
    bandera="profesor" 
   try {
    obj = {correo, clave, bandera}
    const res = await axios.post('http://investigapp-co.preview-domain.com/backend/login.php',obj) 
    if(res.data.clave===clave){
      storeData(res.data)
      setIsLogin(true)
      } else{
        alert("revise correo y clave")
      }    
   } catch (error) {  } 
 }
   
  if(isEnabledA){
      bandera="alumno" 
   try {
    obj = {correo, clave, bandera}
    const res = await axios.post('http://investigapp-co.preview-domain.com/backend/login.php' ,obj) 
    if(res.data.clave===clave){
      storeData(res.data)       
      setIsLogin(true)
      }else{
        alert("revise correo y clave")
      }
     
   } catch (error) {   }  
  }

  if(!isEnabledA && !isEnabledP){ alert("marca una opcion") }

}

  return(
    <View style={styles.container}>
       <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibleProfesor}
          onRequestClose={() => setModalVisibleProfesor(false)} >
       <View style={styles.centeredView}>
         <View style={styles.modalView}>
      
      <Text style={styles.modalText}>Registro Profesor</Text>
           
    <Input texto={"Nombre"} campo={e => setNombre(e)} valor={nombre} />
    <Input texto={"Cedula"} campo={e => setIdentificacion(e)} valor={identificacion} />
    <Input texto={"Telefono"} campo={e => setTelefono(e)} valor={telefono} />
    <Input texto={"Correo"} campo={e => setCorreo(e)} valor={correo} />
    <Input texto={"Clave"} campo={e => setClave(e)} valor={clave} />

    <View style={styles.containerButton}>
      <MyButton  texto={"Cancelar"}
         MyOnPress={()=>setModalVisibleProfesor(false)} background='red'></MyButton>
      <MyButton MyOnPress={addProfesor} texto={"Aceptar"} background='blue' ></MyButton>
    </View>
           
  </View>
</View>
</Modal>
    
     <Modal
       animationType="slide"
       transparent={true}
       visible={modalVisibleLogin}
       onRequestClose={() => setModalVisibleLogin(false)}>
       <View style={styles.centeredView}>
         <View style={styles.modalView}>
           <Text style={styles.modalText}>Login</Text>
           <Input texto={"Correo"}  valor={correo}  campo={e => setCorreo(e)}/>
           <Input texto={"Clave"}   valor={clave} seguro={true} campo={e=>setClave(e)}/>
    
           <View style={styles.containerButton}>
           {!isEnabledA?
             <View style={{flexDirection:'column',marginHorizontal:14, marginVertical:5}}> 
           <Text >Profesor</Text>
           <Switch
             trackColor={{ false: "#767577", true: "#81b0ff" }}
             thumbColor={isEnabledP ? "#f5dd4b" : "#f4f3f4"}
             onValueChange={toggleSwitchP}
             value={isEnabledP}
             />
             </View> : <Text></Text> }
             {!isEnabledP?
             <View style={{flexDirection:'column', marginHorizontal:14, marginVertical:5}}>
             <Text >Alumno</Text> 
            <Switch
             trackColor={{ false: "#767577", true: "#81b0ff" }}
             thumbColor={isEnabledA ? "#f5dd4b" : "#f4f3f4"}
             onValueChange={toggleSwitchA}
             value={isEnabledA}
             />
             </View>: <Text></Text> }
            </View>
           <View style={styles.containerButton}>
           <MyButton
             background={"red"}
             texto={"Cancelar"}
             MyOnPress={() =>  setModalVisibleLogin(!modalVisibleLogin)} >
             
           </MyButton>
           <MyButton background={ "blue" } MyOnPress={login}  texto={"Aceptar"}>
             </MyButton>
           </View>
           
         </View>
       </View>
     </Modal>
    
     <Modal
       animationType="slide"
       transparent={true}
       visible={modalVisibleAlumno}
       onRequestClose={() => setModalVisibleAlumno(false)} >
       <View style={styles.centeredView}>
         <View style={styles.modalView}>
           <Text style={styles.modalText}>Registro Alumno</Text>
       <Input texto={"Nombre"} campo={e => setNombre(e)} valor={nombre} />
       <Input texto={"identificacion"} campo={e => setIdentificacion(e)} valor={identificacion} />
       <Input texto={"grado"} campo={e => setGrado(e)} valor={grado} />
       <Input texto={"Correo"} campo={e => setCorreo(e)} valor={correo} />
       <Input texto={"Clave"} campo={e => setClave(e)} valor={clave} />
           <View style={styles.containerButton}>
           <MyButton
             texto={"Cancelar"} 
             background={"red"} 
             MyOnPress={() => setModalVisibleAlumno(!modalVisibleAlumno)}>
             
           </MyButton>
           <MyButton background={ "blue" } MyOnPress={addAlumno}  texto={"Aceptar"}>
           </MyButton>
           </View>  
         </View>
       </View>
     </Modal>

     <Image
        style={{marginHorizontal:97, height:140,width:170, marginTop:28}}
        source={ require('./assets/escudo.png')
        }
      />
  
     <TouchableOpacity style={styles.buttonUno} 
         onPress={() => setModalVisibleLogin(true)} >
       <Text style={styles.textoUno}>Iniciar Sesion</Text>      
      </TouchableOpacity>
    
     <TouchableOpacity style={styles.buttonDos}
        onPress={() => setModalVisibleProfesor(true)}>
       <Text style={styles.textoDos}>Profesor</Text>  
     </TouchableOpacity>
     
     <TouchableOpacity style={styles.buttonTres}
         onPress={() => setModalVisibleAlumno(true)}>
       <Text style={styles.textoTres}>Alumno</Text>
     </TouchableOpacity>
    </View>       
  );
}
//return de app funcion
return( isLogin? <Navegacion/>:<Principal/>)

function Navegacion() {
  return (
    <NavigationContainer>
      <Tab.Navigator
       screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Foro') {
            iconName = focused
              ? 'md-filing'
              : 'md-filing';
          } 
          else if (route.name === 'Acesoria') {
            iconName = focused ? 'md-school' : 'md-school';
          }
          else if (route.name === 'Taller') {
            iconName = focused ? 'md-calculator' : 'md-calculator';
          }
          else if (route.name === 'Chat') {
            iconName = focused ? 'md-chatboxes' : 'md-chatboxes';
          }
          else if (route.name === 'Formato') {
            iconName = focused ? 'md-clipboard' : 'md-clipboard';
          }
          else if (route.name === 'Links') {
            iconName = focused ? 'md-link' : 'md-link';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>

        <Tab.Screen name="Foro" component={ForoScreen} />
        <Tab.Screen name="Acesoria" component={AcesoriaScreen} />
        <Tab.Screen name="Chat" component={ChatScreen} />
        <Tab.Screen name="Taller" component={TallerScreen} />
        <Tab.Screen name="Formato" component={FormatoScreen}/> 
         <Tab.Screen name="Links" component={LinksScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


function LinksScreen(){

 const clearAll = async () => {
    try {
      await AsyncStorage.clear()
    
    } catch(e) {
    
    }
    setIsLogin(false)
  }

  return(
    <View style={{flex:2, alignItems:'center', justifyContent: 'center'}}>
     <Text style={{fontSize:20, fontWeight:'bold', marginVertical:15}}>Links</Text>
     <TouchableOpacity 
         style={{backgroundColor:'#DAE3EC', padding:16, marginVertical:15, borderRadius:10}} >
         <Text style={{color:'blue', fontSize:14}}>Real Colsi </Text>
      </TouchableOpacity>
      <TouchableOpacity
          style={{backgroundColor:'#DAE3EC', padding:16,borderRadius:10}}>
         <Text style={{color:'blue', fontSize:14}}>MinCiencias</Text>
      </TouchableOpacity>

      <TouchableOpacity
          style={{backgroundColor:'#DAE3EC', padding:16,borderRadius:10, marginVertical:15}}
          onPress={clearAll}>
        <Ionicons name="md-exit" size={36} color="red" />
      </TouchableOpacity>
 
    </View>
    
  );
}

function FormatoScreen(){
  const [semillero, setSemillero] = useState('')
  const [titulo, setTitulo] = useState('')
  const [autor, setAutor]=useState('')
  const [identificacion, setIdentificacion] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] =useState('')
  const [categoria, setCategoria]=useState('')
  const [area, setArea] = useState('')
  const [isAlumno, setIsAlumno] = useState(false)
  const [listaFormato, setListaFormato] = useState([])
  const [archivo , setArchivo ]= useState(null)
 useEffect(()=>{
   getFormato() 
 },[])


  const getFormato = async ()=>{
    try {
          let jsonValue = await AsyncStorage.getItem('@KEY')
          let json = JSON.parse(jsonValue);
          if(json.bandera==="profesor"){
            const res = await axios.get('http://investigapp-co.preview-domain.com/backend/formato.php')
            setListaFormato(res.data)
          
          }else{
            setIsAlumno(!isAlumno)
          }
         } catch (error) {  }
   }


  const enviarFormato =async () =>{
      try {
        if(semillero!="" && titulo !="" && autor !="" && identificacion!="" && email!="" && telefono!="" && categoria!="" && area!="" ){
          data =new FormData()
          data.append("semillero",semillero)
          data.append("titulo",titulo)
          data.append("autor",autor)
          data.append("identificacion", identificacion)
          data.append("email", email)
          data.append("telefono", telefono)
          data.append("categoria", categoria)
          data.append("area",area) 
          data.append("archivo", archivo)
          const res = await axios.post('http://investigapp-co.preview-domain.com/backend/formato.php/',data)
          limpiarEstado()      
          alert(res.data.msg) 
          }else{
          alert("te falto un campo por llenar")
        }
          
      } catch (error) { }
      
  }

  const agregarpdf =async()=>{
    let result = await DocumentPicker.getDocumentAsync({ type: "*/*", copyToCacheDirectory: true }).then(response => {

      if (response.type == 'success') {
        let { name, size, uri } = response;
        let nameParts = name.split('.');
        let fileType = nameParts[nameParts.length - 1];
        var fileToUpload = {
          name: name,
          size: size,
          uri: uri,
          type: "application/" + fileType
        };
          
          setArchivo(fileToUpload)
      }
    });  
  };

  const limpiarEstado =()=>{
   setSemillero('')
   setTitulo('')
   setAutor('')
   setIdentificacion('')
   setEmail('')
   setTelefono('')
   setCategoria('')
   setArea('')
   setArchivo(null)
  } 

  const renderItem = ({ item }) => (
    <ItemFormato 
       semillero={item.semillero} 
       titulo={item.titulo}
       autor={item.autor}
       identificacion={item.identificacion}
       email={item.email}
       telefono={item.telefono}
       categoria={item.categoria}
       area={item.area}
       uri={'data:application/pdf;base64,'+item.archivo}
       />
  );

  return(

    <View style={{flex:1 , marginTop:35}}>
    { isAlumno ?  
    
    <ScrollView style={{flex:1,marginTop:38}}>
       <Text style={{color:'green', fontSize:18,marginLeft:10}}>Investigacion Formativa</Text>
       <TextInput style={styles.campoTextoFormato}
       onChangeText={(e)=>setSemillero(e)}
       placeholder="Nombre del Semillero"  />
       <TextInput style={styles.campoTextoFormato}
       onChangeText={(e)=>setTitulo(e)}
       placeholder="Titulo del proyecto"  />
       <TextInput style={styles.campoTextoFormato} 
        onChangeText={(e)=>setAutor(e)} 
        placeholder="Autor"  />
       <TextInput style={styles.campoTextoFormato}
       onChangeText={(e)=>setIdentificacion(e)}
       placeholder="Identificacion"  />
       <TextInput style={styles.campoTextoFormato} 
       onChangeText={(e)=>setEmail(e)}
       placeholder="Email"  />
       <TextInput style={styles.campoTextoFormato}
        onChangeText={(e)=>setTelefono(e)}
       placeholder="Telefono"  />
       
        <Text style={{color:'blue', fontSize:18,marginLeft:10}}>Categoria:</Text>
        <Text style={{marginLeft:10}}>1. Propuesta de investigacion</Text>
        <Text style={{marginLeft:10}}>2. Investigacion en Curso </Text>
        <Text style={{marginLeft:10}}>3. Investigacion Terminada </Text>
        <TextInput style={styles.selectcategoria } 
        onChangeText={(e)=>setCategoria(e)}
        placeholder="Escribe Categoria" />
       
        <Text style={{color:'green', fontSize:18,marginLeft:10}}>Area de Investigacion:</Text>
        <Text style={{marginLeft:10}}>1. Matematicas</Text>
        <Text style={{marginLeft:10}}>2. Español </Text>
        <Text style={{marginLeft:10}}>3. Ciencia Sociales </Text>
        <Text style={{marginLeft:10}}>4. Ingles </Text>
        <Text style={{marginLeft:10}}>5. Tecnologia e Informatica </Text>
        <Text style={{marginLeft:10}}>6. Educacion Artisitca </Text>
        <Text style={{marginLeft:10}}>7. Educacion Fisica </Text>
        <Text style={{marginLeft:10}}>8. Etica y Religion </Text>
        <Text style={{marginLeft:10}}>9. Otras (Mencione cual) </Text>
        <TextInput style={styles.selectcategoria }
        onChangeText={(e)=>setArea(e)}
        placeholder="Escribe Area " />
      <TouchableOpacity  style={{backgroundColor:'#1A87F4', padding:12,borderRadius:10, alignItems:'center', marginVertical:10, marginHorizontal:8}}
             onPress={agregarpdf}  >
          <Ionicons name="md-attach" size={24} color="#fff" />
         </TouchableOpacity>
         <TouchableOpacity  style={{backgroundColor:'#D5074C', padding:12,borderRadius:10, alignItems:'center', marginVertical:10, marginHorizontal:8}}
             onPress={enviarFormato}  >
           <Text style={{color:'#fff', fontSize:16}}>Guardar</Text>
         </TouchableOpacity>
     </ScrollView> :  <FlatList
        data={listaFormato}
        renderItem={renderItem}
        keyExtractor={item =>item.id} 
      />} 
     </View>  
  );  

}

function TallerScreen (){
   const [listaTaller, setListaTaller] = useState([])
   const [listaTallerRecibido, setListaTallerRecibido] = useState([])
   const [isProfesor, setIsProfesor] = useState(false)
   const [modalTaller,setModalTaller] = useState(false)
   const [modalResponder,setModalResponder] = useState(false)
   const [archivo, setArchivo] = useState(null)
   const [descripcion, setDescripcionTaller] = useState('')
   const [grado, setGradoTaller] = useState('')
   const [materia,setMateriaTaller] = useState('')
   const [id, setId] = useState('')
   useEffect(()=>{
  
    getTaller()
   },[])

 
  const documenPicker =async()=>{
    let result = await DocumentPicker.getDocumentAsync({ type: "*/*", copyToCacheDirectory: true }).then(response => {

      if (response.type == 'success') {
        let { name, size, uri } = response;
        let nameParts = name.split('.');
        let fileType = nameParts[nameParts.length - 1];
        var fileToUpload = {
          name: name,
          size: size,
          uri: uri,
          type: "application/" + fileType
        };
          
          setArchivo(fileToUpload)
      }
    });  
  };

 const addArchivo = async () => {
    
     let jsonValue = await AsyncStorage.getItem('@KEY')
     let json = JSON.parse(jsonValue);
     let identificacion = json.id;
     let formdata= new FormData();
     formdata.append("archivo", archivo)
     formdata.append("descripcion", descripcion)
     formdata.append("materia", materia)
     formdata.append("grado", grado)
     formdata.append("identificacion", identificacion)
     const res = await axios.post('http://investigapp-co.preview-domain.com/backend/taller.php/',formdata)
     limpiar()
     alert(res.data.msg)
} 

const addArchivoRespuesta = async() =>{
  let data = new FormData();
  data.append("archivo", archivo)
  data.append("materia", materia)
  data.append("grado", grado)
  data.append("idprofesor", id)
  const res = await axios.post('http://investigapp-co.preview-domain.com/backend/realizado.php/',data)
  limpiar()
  alert(res.data.msg)
}

const limpiar=()=>{
  setArchivo(null)
  setDescripcionTaller('')
  setGradoTaller('')
  setMateriaTaller('')
  setId('')
}

const getTaller = async ()=>{
  try {
        let jsonValue = await AsyncStorage.getItem('@KEY')
        let json = JSON.parse(jsonValue);
        let grado = json.grado;
        let idprofesor=json.id;
        if(json.bandera==="profesor"){
          const res = await axios.get('http://investigapp-co.preview-domain.com/backend/realizado.php?id='+idprofesor)
          setListaTallerRecibido(res.data)
          setIsProfesor(!isProfesor)
        }else{
          const res = await axios.get('http://investigapp-co.preview-domain.com/backend/taller.php?grado='+grado)
          setListaTaller(res.data)
        }
       } catch (error) {  }
 }
  
const modalRespuesta=(props)=>{
       const idprofesor = props.id
       setId(idprofesor)
  setModalResponder(true) }
//para el alumno
  const renderItem = ({ item }) => (
    <ItemTaller 
       id={item.idprofesor}
       descripcion={item.descripcion} 
       respuesta={modalRespuesta}
       materia={item.materia}
       uri={'data:application/pdf;base64,'+item.archivo}
       />
  );
//para el profesor
  const renderTaller = ({ item }) => (
    <ItemRecibido 
       grado={item.grado} 
       materia={item.materia}
       fecha={item.fecha}
       uri={'data:application/pdf;base64,'+item.archivo}
       />
  );

  return(
    <View style={{flex:1, alignItems:'center' ,marginTop:40}}>
       <FlatList
        data={listaTaller}
        renderItem={renderItem}
        keyExtractor={item =>item.id} 
      />

     <FlatList
      data={listaTallerRecibido}
      renderItem={renderTaller}
      keyExtractor={item =>item.id} 
    />
     { isProfesor?    
     <View>
         <TouchableOpacity 
              style={{backgroundColor:'#077162', padding:14,borderRadius:8, marginBottom:5}}
             onPress={()=>setModalTaller(!modalTaller)}  >
           <Text style={{color:'#fff'}}>Agregar Taller</Text>
         </TouchableOpacity>
     </View>
      :<Text></Text>  }

      <Modal
          animationType="slide"
          transparent={true}
          visible={modalTaller}
          onRequestClose={() => setModalTaller(false)} >
       <View style={styles.centeredView}>
         <View style={styles.modalView}>   
      <TouchableOpacity
              style={{ padding:13,borderRadius:8, marginHorizontal:5, alignSelf:'center' }}
              onPress={()=>setModalTaller(!modalTaller)}>
             <Ionicons name="md-close" size={24} color="#CF0927" />
    </TouchableOpacity>
    <Input texto={"Descripcion"} campo={e => setDescripcionTaller(e)} valor={descripcion} />
    <Input texto={"Materia"} campo={e => setMateriaTaller(e)} valor={materia} />
    <Input texto={"Grado"} campo={e => setGradoTaller(e)} valor={grado} />

    <View style={styles.containerButton}>
      <TouchableOpacity 
        onPress={documenPicker} style={{backgroundColor:'#07C48B' ,alignItems:'center',padding:10,width:50, margin:5, borderRadius:10}}>
        <Ionicons name="md-attach" size={24} color="#fff" />
         </TouchableOpacity>
      <TouchableOpacity style={{backgroundColor:'#07BEC4', padding:10, margin:5, borderRadius:10}}
            onPress={addArchivo} >
          <Ionicons name="md-send" size={24} color="#fff" />
        </TouchableOpacity>
    </View>
  </View>
</View>
</Modal>

      <Modal   
          animationType="slide"
          transparent={true}
          visible={modalResponder}
          onRequestClose={() => setModalResponder(false)} >
       <View style={styles.centeredView}>
         <View style={styles.modalView}>   
      <TouchableOpacity
              style={{ padding:13,borderRadius:8, marginHorizontal:5, alignSelf:'center' }}
              onPress={()=>setModalResponder(!modalResponder)}>
             <Ionicons name="md-close" size={24} color="#CF0927" />
    </TouchableOpacity>
    <Input texto={"Materia"} campo={e => setMateriaTaller(e)} valor={materia} />
    <Input texto={"Grado"} campo={e => setGradoTaller(e)} valor={grado} />

    <View style={styles.containerButton}>
      <TouchableOpacity 
      onPress={documenPicker} style={{backgroundColor:'#07C48B' ,alignItems:'center',padding:10,width:50, margin:5, borderRadius:10}}>
        <Ionicons name="md-attach" size={24} color="#fff" />
         </TouchableOpacity>
      <TouchableOpacity style={{backgroundColor:'#07BEC4', padding:10, margin:5, borderRadius:10}}
            onPress={addArchivoRespuesta} >
          <Ionicons name="md-send" size={24} color="#fff" />
        </TouchableOpacity>
    </View>          
  </View>
</View>
</Modal>
</View>  
  );
}

function AcesoriaScreen() {
  
   const [listaProfesor, setListaProfesor] = useState([])
   const [modal, setModal] = useState(false);
   const [modalProfe, setModalProfe] = useState(false);
   const [listaMensaje, setListaMensaje] = useState([])
   const [mensaje, setMensajeProfesor] = useState('')
   const [identificacion, setIdentificacion] = useState('')
   useEffect(()=>{
      getProfesores()
   },[])
   
    const getProfesores = async () => {
    const res = await axios.get('http://investigapp-co.preview-domain.com/backend/') 
    setListaProfesor(res.data)
   }

  const addMensaje = async()=>{
    try {
      if(mensaje!==""){
        let jsonValue = await AsyncStorage.getItem('@KEY')
        let json = JSON.parse(jsonValue)
        let nombre = json.nombre
        let idrecibe = json.id
        const obj = {mensaje, identificacion, nombre, idrecibe}
        const res = await axios.post('http://investigapp-co.preview-domain.com/backend/chat.php', obj) 
        setMensajeProfesor('')
        setIdentificacion('')
        alert(res.data.msg)
      }else{alert("olvido escribir") }
 } catch (error) { }
}
  
  const getMensajes =async(props)=>{
    try {
      let jsonValue = await AsyncStorage.getItem('@KEY')
      let json = JSON.parse(jsonValue);
      let id=json.id
      let sid=props.identificacion 
      const res = await axios.get('http://investigapp-co.preview-domain.com/backend/chat.php?id='+id+'&ids='+sid)  
      setListaMensaje(res.data) 
      setModalProfe(true)
    } catch (error) { }
  }
   const openModal = (props) => {
     setModal(!modal)
     setIdentificacion(props.identificacion)
   }
   const renderItem = ({ item }) => (
    <ItemProfesor
       id={item.id} 
       nombre={item.nombre}
       identificacion={item.identificacion}
       telefono={item.telefono}
       correo={item.correo}
       mymodal={openModal}
       getmensaje={getMensajes} />
       )

    const deleteMensaje = async(id, sid) =>{
        try {
          const res = await axios.delete('http://investigapp-co.preview-domain.com/backend/chat.php?id='+id)   
          getMensajeProfe(sid)
        } catch (error) { }             
       }

       const getMensajeProfe =async(sid)=>{
        try {
          let jsonValue = await AsyncStorage.getItem('@KEY')
          let json = JSON.parse(jsonValue);
          let id=json.id 
          const res = await axios.get('http://investigapp-co.preview-domain.com/backend/chat.php?id='+id+'&ids='+sid)  
          setListaMensaje(res.data) 
        
        } catch (error) { }
      }

  return( 
    <View style={{flex:1, alignItems:'center',marginTop:40}}>
    <FlatList
     data={listaProfesor}
     renderItem={renderItem}
     keyExtractor={item =>item.id} 
   />

       <Modal  animationType="slide" transparent={true} visible={modal}
        onRequestClose={() => { setModal(false) }}  >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
           <TextInput  multiline={true} style={styles.input} placeholder="Mensaje" 
            maxLength={240}  
            onChangeText={(e)=>setMensajeProfesor(e)}
            value={mensaje}/>
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity
              style={{padding:13,borderRadius:8, marginHorizontal:5, backgroundColor: "#0DDCC0",alignSelf:'center' }}
              onPress={addMensaje}>
             <Ionicons name="md-checkmark" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding:13,borderRadius:8, marginHorizontal:5,  backgroundColor: "#CF0927",alignSelf:'center' }}
              onPress={()=>setModal(!modal)}>
             <Ionicons name="md-close" size={24} color="#fff" />
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalProfe}
        onRequestClose={() => {
          setModalProfe(false)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
              <TouchableOpacity
                    onPress={()=>setModalProfe(!modalProfe)}>
                    <Ionicons name="md-close" size={36} color="#CF0927" />
              </TouchableOpacity>
          {listaMensaje.map((item)=>(
                    
             <View key={item.id} style={{flexDirection:'column', marginBottom:5 }} >
                        <Text style={{marginHorizontal:5 , color:'#0FD5BA'}} multiline={true}>
                          {item.nombre}</Text>
                        <Text  style={{marginHorizontal:5}}>{item.mensaje}</Text>
                        <TouchableOpacity style={{marginLeft:10}}
                          onPress={()=>deleteMensaje(item.id, item.idenvio)}>
                        <Ionicons name="md-trash" size={36} color="#CF0927" />
              </TouchableOpacity>         
            
              </View> 
                    
          ))}
            <View >
            </View>
        
          </View>
          
        </View>
      </Modal>


 </View>
   );
}

function ChatScreen (){
 const [listaChat, setListaChat] = useState([]) 
 const [mensaje, setMensaje]=useState('')
 const [modalVisible, setModalVisible] = useState(false);
 const [modalVisibleM, setModalVisibleM] = useState(false);
 const [identificacion, setIdentificacion] = useState('')
 const [listaMensaje, setListaMensaje] = useState([])
 
 useEffect(() => {
  getChat()
 },[])

const getChat = async ()=>{
 try {
     let jsonValue = await AsyncStorage.getItem('@KEY')
     let json = JSON.parse(jsonValue);
     let grado = json.grado
     if(grado!==""){
       const res = await axios.get('http://investigapp-co.preview-domain.com/backend/alumno.php?id='+grado)
       setListaChat(res.data)
     }else{
       const res = await axios.get('http://investigapp-co.preview-domain.com/backend/alumno.php/')
       setListaChat(res.data)
     }
     
  } catch (error) {  }
}


const addMensaje=async() => {
  try {
       if(mensaje!==""){
         let jsonValue = await AsyncStorage.getItem('@KEY')
         let json = JSON.parse(jsonValue)
         let nombre = json.nombre
         let idrecibe = json.id
         const obj = {mensaje, identificacion, nombre, idrecibe}
         console.log(obj)
         const res = await axios.post('http://investigapp-co.preview-domain.com/backend/chat.php', obj) 
         setMensaje('')
         setIdentificacion('')
         alert(res.data.msg)
       
       }else{
         alert("olvido escribir")
       }
  } catch (error) {
    
  }
}

const mostrar=(props)=>{
 setIdentificacion(props.identificacion)
 setModalVisible(!modalVisible)
}
//filtrar lista para mostrar conversacion de dos personas
const getMensajes =async(props)=>{
  try {
    let jsonValue = await AsyncStorage.getItem('@KEY')
    let json = JSON.parse(jsonValue);
    let id=json.id
    let sid=props.identificacion 
    const res = await axios.get('http://investigapp-co.preview-domain.com/backend/chat.php?id='+id+'&ids='+sid)  
    setListaMensaje(res.data) 
    console.log(res.data)
    setModalVisibleM(true)
  } catch (error) { }
}

const getMensajeChat = async(sid)=>{
  try {
    let jsonValue = await AsyncStorage.getItem('@KEY')
    let json = JSON.parse(jsonValue);
    let id=json.id 
    const res = await axios.get('http://investigapp-co.preview-domain.com/backend/chat.php?id='+id+'&ids='+sid)  
    setListaMensaje(res.data) 
  
  } catch (error) { }
}

const deleteMensaje = async(id, sid) =>{
  try {
     
    const res = await axios.delete('http://investigapp-co.preview-domain.com/backend/chat.php?id='+id)   
    getMensajeChat(sid)
  } catch (error) { }
}

 const renderItem = ({ item }) => (
   <ItemChat nombre = {item.nombre}  identificacion = {item.identificacion}
    MyOnPress={addMensaje} modal={mostrar} getmensaje={getMensajes}/>
  )

return(
  <View style={{flex:1, alignItems:'flex-end' ,marginTop:40}}>
  <FlatList
   data={listaChat}
   renderItem={renderItem}
   keyExtractor={item =>item.id} />
      <Modal animationType="slide" transparent={true} visible={modalVisible}
        onRequestClose={() => {setModalVisible(false)}} >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
           <TextInput  multiline={true} style={styles.input} placeholder="Mensaje" 
            maxLength={200} onChangeText={(e)=>setMensaje(e)} value={mensaje}/>
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity
              style={{padding:13,borderRadius:8, marginHorizontal:5, backgroundColor: "#07B83A",alignSelf:'center' }}
              onPress={()=>addMensaje()}>
             <Ionicons name="md-checkmark" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding:13,borderRadius:8, marginHorizontal:5,  backgroundColor: "#CF0927",alignSelf:'center' }}
              onPress={()=>setModalVisible(!modalVisible)}>
             <Ionicons name="md-close" size={24} color="#fff" />
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

  <Modal animationType="slide" transparent={true} visible={modalVisibleM}
        onRequestClose={() => { setModalVisibleM(false)}} >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
              <TouchableOpacity onPress={()=>setModalVisibleM(!modalVisibleM)}>
                    <Ionicons name="md-close" size={36} color="#CF0927" />
              </TouchableOpacity>
          {listaMensaje.map((item)=>(
                    
             <View key={item.id} style={{flexDirection:'column', marginBottom:5 }} >
                        <Text style={{marginHorizontal:5 , color:'#0FD5BA'}} multiline={true}>
                          {item.nombre}</Text>
                        <Text  style={{marginHorizontal:5}}>{item.mensaje}</Text>
                        <TouchableOpacity style={{marginLeft:10}}
                          onPress={()=>deleteMensaje(item.id, item.idenvio)}>
                        <Ionicons name="md-trash" size={36} color="#CF0927" />
              </TouchableOpacity>         
             </View> 
                    
          ))}
           </View>
         </View>
      </Modal>
</View>  
  );
}

function ForoScreen(){
  const [date, setDate] = useState(new Date(1598051730000));
  const [listaForo, setListaForo] = useState([])
  const [respuesta , setRespuesta] = useState('')
  const [profesor , setProfesor] = useState('')
  const [modal , setModal] = useState(false)
  const [show, setShow] = useState(false)
  const [mode, setMode] = useState('date')
  const [fecha, setFecha]=useState('')
  const [descripcion, setDescripcion]=useState('')
  const [materia, setMateria]=useState('')
  useEffect(()=>{
    getForo()
  },[])

const getForo = async ()=>{
   try {

      const res = await axios.get('http://investigapp-co.preview-domain.com/backend/foro.php')
      setListaForo(res.data)
      siProfesor()   
    } catch (error) {  }
 }

 const onChange = (event, selectedDate) => {
  const currentDate = selectedDate || date;
  setShow(Platform.OS === 'ios');
  setDate(currentDate);
  setFecha(currentDate.getFullYear()+"-"+currentDate.getMonth()+"-"+currentDate.getDate())
};

const showMode = currentMode => {
  setShow(true);
  setMode(currentMode);
};

const showDatepicker = () => {
  showMode('date');
};

const respuestaForoAlumno=async(props)=>{
    if(respuesta !==""){
       const {materia, fecha} = props
       const obj =  { materia, respuesta,fecha}
       const res = await axios.post('http://investigapp-co.preview-domain.com/backend/foro.php', obj)
       alert(res.data.msg)
       getForo()
       setRespuesta('')
    }else{
      alert("se le olvido escribir")
    }
}

const nuevoForo = async()=>{
  if(materia !=="" && descripcion !==""){
     const obj = {descripcion, materia, fecha}
     console.log(fecha)
     const res = await axios.post('http://investigapp-co.preview-domain.com/backend/nuevoforo.php', obj)
     alert(res.data.msg)
     getForo()
     setDescripcion('')
     setMateria('')
  }else{
    alert("se le olvido escribir")
  }
}



const siProfesor = async () =>{
  let jsonValue = await AsyncStorage.getItem('@KEY')
  let json = JSON.parse(jsonValue);
  setProfesor(json.bandera);
}
 
const renderItem = ({ item }) => (
    <ItemForo descripcion={item.descripcion} fecha={item.fecha}
       fechaEnvio={item.fechaenvio} materia={item.materia}
       MyOnPressRes={respuestaForoAlumno}myRespuesta={setRespuesta}/> )

return(
  <View style={{flex:1, alignItems:'center',marginTop:40}}>
    <FlatList data={listaForo} renderItem={renderItem}
     keyExtractor={item =>item.id} 
    />
  { profesor==="profesor"? 
  
  <TouchableOpacity 
     onPress={()=>setModal(!modal)}
     style={{padding:5}}>
        <Ionicons name="md-add-circle" size={46} color="#07BC49" />
    </TouchableOpacity> : <Text></Text>  }


    {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}

    <Modal animationType="slide" transparent={true} visible={modal}
        onRequestClose={() => {setModal(false)}} >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
           <TextInput  multiline={true} style={styles.input} placeholder="Descripcion" 
            onChangeText={(e)=>setDescripcion(e)}   maxLength={200} value={descripcion}/>
             <TextInput  multiline={true} style={styles.input} placeholder="Materia" 
             onChangeText={(e)=>setMateria(e)} maxLength={200} value={materia}/>
             <TouchableOpacity
              style={{padding:12,alignSelf:'flex-end' }}
              onPress={showDatepicker} >
             <Ionicons name="md-calendar" size={36} color="#A607C9" />
            </TouchableOpacity>
  
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity
              style={{padding:13,borderRadius:8, marginHorizontal:5, backgroundColor: "#07B83A",alignSelf:'center' }}
              onPress={nuevoForo} >
             <Ionicons name="md-checkmark" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding:13,borderRadius:8, marginHorizontal:5,  backgroundColor: "#CF0927",alignSelf:'center' }}
              onPress={()=>setModal(!modal)}>
             <Ionicons name="md-close" size={24} color="#fff" />
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
 </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
},
   campoTextoFormato:{
    flex:1,
     borderWidth:1,
     padding:5,
     marginVertical:7,
     marginHorizontal:8
  },
  selectcategoria:{
    borderWidth:1, 
    padding:7, 
    marginHorizontal:8
  },
  buttonUno: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    marginVertical:12,
    marginHorizontal:15,
    borderWidth:1,
    borderColor:'red',
    borderRadius:8
},
  buttonDos: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    marginHorizontal:15,
    borderWidth:1,
    borderColor:'blue',
    borderRadius:8
},
 buttonTres: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    marginVertical:12,
    marginHorizontal:15,
    borderWidth:1,
    borderColor:'green',
    borderRadius:8
},
textoUno:{
  color:'red',
  fontWeight:'bold'
},
 textoDos:{
  color:'blue',
  fontWeight:'bold'
},
textoTres:{
  color:'green',
  fontWeight:'bold'
},
modalView: {
  margin: 15,
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
textStyle: {
  color: "white",
  fontSize:15,
  fontWeight: "bold",
  textAlign: "center"
},
modalText: {
  marginBottom: 15,
  textAlign: "center"
},
containerButton:{
  flexDirection:'row',
},
input:{
  borderBottomWidth:1,
  width:190,
  marginVertical:5
},
});
