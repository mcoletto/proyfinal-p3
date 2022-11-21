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
                        <Text style={styles.titulo}>Add post</Text>
                        <View style={styles.inputContainer}>
                            <Text style={styles.text}>Pic Upload!</Text>
                            <TextInput
                                placeholder='Write info'
                                style={styles.input}
                                onChangeText ={text => this.setState( { text:text } 
                                    )}
                                value = { this.state.text }
                            />  
                            <Text style={styles.error}> {this.state.error} </Text>
                        </View>
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
    },
    titulo:{
        marginTop:'20%',
        marginRight:10,
        fontWeight:'bold',
        fontFamily: "'Helvetica', 'Arial', sans-serif;",
        fontSize:40
      },
      inputContainer:{
        backgroundColor:'black',
        marginTop:'10%',
        height:'30vh',
        alignItems: 'center'
      },
      input:{
        height:'30%',
        borderColor: 'white',
        color:'white',
        fontSize:18,
        borderWidth: 4,
        width:'80%'
      },
      text:{
        fontWeight:'bold',
        fontFamily: "'Helvetica', 'Arial', sans-serif;",
        fontSize:20,
        color:'white'
      }
  });