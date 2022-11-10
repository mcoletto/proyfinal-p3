import React, {Component} from 'react';
import {Camera} from 'expo-camera';
import {storage} from '../firebase/config';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

class MyCamera extends Component{
    constructor(props){
        super(props);
        this.state = {
            permisos: false,
            showCamera: true,
            urlTemporal:''
       }

        this.metodosDeCamara = ''
    }

    componentDidMount(){
        //Solicitamos los permisos si los acepta entonces cambiamos el estado
        Camera.requestCameraPermissionsAsync()
            .then( () => {
                this.setState({
                permisos: true
            })})
            .catch( e => console.log(e))
    }

    sacarFoto(){
        //Este es el metodo sacar foto que se activa al clickear el btn.
        //Este lo que hace es que luego de guardar la foto te guarda en el estado la direccion del dispositivo donde se guardo la foto 
        //Y dsp te deja de mostrar la camara
        this.metodosDeCamara.takePictureAsync()
            .then( photo => {
                this.setState({
                    urlTemporal: photo.uri,
                    showCamera: false
                })
            })
            .catch( e => console.log(e))
    }

    guardarFoto(){
        //Si toca aceptar se accede a este metodo
        fetch(this.state.urlTemporal) //buscar la foto guardada temporalmente en el dispositivo
            .then(res => res.blob()) //La transformamos en formato binario.
            .then( image => { 
                //Ya con la foto transformada hay que guardarla en el storage
                const refStorage = storage.ref(`photos/${Date.now()}.jpg`); //Referencio al storage de la BD
                refStorage.put(image) //Envio la foto transformada al storage
                    .then(()=>{
                        refStorage.getDownloadURL() //Obtengo la URL de firebase que voy a usar.
                        .then( url => this.props.onImageUpload(url)) //La guardo en el estado
                    })
            })
            .catch(e => console.log(e))
        }

        cancelar(){
            //Si toca cancelar se accede a este metodo Donde cambio el estado de show camera para que vuelva a sacar la foto
            this.setState({showCamera:true})
        }

    render(){
        return(
            <View>
            {
                //Si los permisos estan habilitados y se desea mostar la camara entonces se muestra la camara del usuario
                this.state.permisos ? 
                    this.state.showCamera ?
                    <View style={styles.cameraBody}>
                        <Camera
                            style={styles.cameraBody}
                            type = {Camera.Constants.Type.front}
                            ref={metodosDeCamara => this.metodosDeCamara = metodosDeCamara }
                        />
                        <TouchableOpacity style={styles.button} onPress={()=>this.sacarFoto()}>
                        </TouchableOpacity>
                    </View>
                    ://Sino la showCamera = False, signifca que ya saco la foto. Entonces le tenemos que mostrar la foto y el usuario debe elegir si aceptarla o rechazarla
                    <View>
                        <Image 
                            style={styles.preview}
                            source={{uri: this.state.urlTemporal}}
                            resizeMode='cover'
                        />
                        <TouchableOpacity style={styles.button} onPress={()=>this.cancelar()}>
                            <Text>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={()=>this.guardarFoto()}>
                            <Text>Aceptar</Text>
                        </TouchableOpacity>
                    </View>

                :
                    <Text>No tengo permisos</Text>
            }
            </View>
        )
    }

}

const styles = StyleSheet.create({
    cameraBody: {
        height: '70vh',
        margin:10,
        borderRadius:90
    },  
    button:{
        height: 50,
        width: 50,
        borderRadius: 50,
        display: 'inline-block',
        backgroundColor:'rgb(75, 132, 255)'
       /*  borderColor: '#ccc',
        borderWidth: 1,
        padding: 5,
        borderRadius: 4,
        marginTop: 20 */
    },
    preview:{
        height:'40vh'
    }
}) 

export default MyCamera;
