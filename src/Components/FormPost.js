import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import {db,auth} from '../firebase/config'
import MyCamera from './MyCamera';

class FormPost extends Component {
    constructor(){
        super()
        this.state = {
            owner:'',
            text:'',
            likes:[],
            comentarios:[],
            createdAt:'',
            url:'',
            error:''
        }
    }
   
    crearPost() {
        if (this.state.text != '' || this.state.url != '') 
        {
           db.collection('posts').add({
                owner:auth.currentUser.email,
                text:this.state.text,
                likes:this.state.likes,
                comments:this.state.comentarios,
                photo: this.state.url,
                createdAt: Date.now()
            })
            .then(res => {
            this.setState({
                owner:'',
                text:'',
                likes:[],
                comentarios:[],
                createdAt:'',
                url:'',
                error:''
            })
            })
            .catch(error => {
                console.log(error)
                this.setState({error:error.message})
            });
        } else
        {
            this.state.text == ''? this.setState({error:'El texto no puede estar vacio'}) : this.setState({error:'Debe tener una imagen'});
        }
          
    }

    onImageUpload(url){
        this.setState({
            url:url
        })
    }

    render(){
        return(
            <View style={styles.container}>
                {
                    this.state.url == '' ? 
                    <MyCamera onImageUpload={(url) => this.onImageUpload(url)}/> :
                    <View>
                        <Text>Foto seleccionada con exito!</Text>
                        <TextInput
                            placeholder='Ingrese el texto del post'
                            onChangeText ={text => this.setState( { text:text } )}
                            value = { this.state.text }
                        />
                        <Text style={styles.error}> {this.state.error} </Text>
                        <TouchableOpacity onPress={() => this.crearPost()}>
                            <Text>Crear Post!</Text>   
                        </TouchableOpacity>
                    </View>
                }
            </View>
        )
    }
    
}


export default FormPost

const styles = StyleSheet.create({
    container: {
    },
    error: {
        color:'red'
    }
  });