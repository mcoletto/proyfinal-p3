import React, {Component} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { auth, db } from '../firebase/config';
import MyCamera from '../Components/MyCamera';

class Register extends Component {
    constructor(){
        super()
        this.state = {
            email: '',
            password: '',
            user: '',
            bio: '',
            url: 'https://firebasestorage.googleapis.com/v0/b/proyfinal-p3.appspot.com/o/photos%2FnpPhoto.jpg?alt=media&token=6bf97125-c596-4cc2-98b8-a0a1aae243ec',
            error: '',
            tomarFoto:false
        }
    }

    onSubmit(){
        this.registerUser(this.state.email, this.state.password);
    }

    registerUser(email, pass){
        //Registrar en firebase y si el reigstro sale bien redireccionar a Home
        console.log(this.state.url,'Fede')
        auth.createUserWithEmailAndPassword(email, pass)
            .then( res => {
                //equivalente a res.redirect
                db.collection('users').add({
                    owner:email,
                    username:this.state.user,
                    bio:this.state.bio,
                    foto: this.state.url,
                    createdAt:Date.now()  
                  })
                this.props.navigation.navigate('Login')
            })
            .catch(error =>{
                console.log(error);
                this.setState({error:error.message})
            })
    }

    tomarFoto(){
        if(this.state.tomarFoto) {
            this.setState({tomarFoto:false})
        } else{
            this.setState({tomarFoto:true})
        }
       
    }

    onImageUpload(url){
        console.log(url,'link')
        this.setState({
            url:url,
            tomarFoto:false
        })
    }

    render (){
        return (
            <View style={styles.register}>
                <Text style={styles.titulo}>Registrate</Text>
                <View>
                {
                    this.state.tomarFoto? 
                    <View>
                        <MyCamera onImageUpload={(url) => this.onImageUpload(url)}/>
                        <TouchableOpacity onPress={()=> this.tomarFoto()}>
                            <Text></Text>
                        </TouchableOpacity>
                    </View>
                    :
                    this.state.url == 'https://firebasestorage.googleapis.com/v0/b/proyfinal-p3.appspot.com/o/photos%2FnpPhoto.jpg?alt=media&token=6bf97125-c596-4cc2-98b8-a0a1aae243ec'?
                        <TouchableOpacity onPress={()=> this.tomarFoto()}>
                            <Image 
                                  source={
                                      require('../../assets/cam.png')
                                  }
                                  resizeMode='center'
                                  style={styles.buttonImg}
                                />
                        </TouchableOpacity>
                    :
                    <Image 
                            style={styles.preview}
                            source={{uri: this.state.url}}
                            resizeMode='cover'
                        />
                }
                    <TextInput
                        style = {styles.textInput}  
                        placeholder= 'email' 
                        keyboardType= 'email-address' 
                        onChangeText= {text => this.setState({email:text})} 
                        value= {this.state.email} 
                    />
                    <TextInput 
                        style = {styles.textInput} 
                        placeholder= 'password'
                        keyboardType= 'default'
                        secureTextEntry={true}
                        onChangeText= {text => this.setState({password:text})}
                        value= {this.state.password}
                    />
                    <TextInput 
                        style = {styles.textInput} 
                        placeholder= 'username'
                        keyboardType= 'default'
                        onChangeText= {text => this.setState({user:text})}
                        value= {this.state.user}
                    />
                    <TextInput 
                        style = {styles.textInput} 
                        placeholder= 'bio'
                        keyboardType= 'default'
                        onChangeText= {text => this.setState({bio:text})}
                        value= {this.state.bio}
                    />

                    <Text> {this.state.error} </Text>
                
                
                    <TouchableOpacity onPress={() => this.onSubmit()}>
                        <Text style={styles.buttonR}> Register </Text>
                    </TouchableOpacity>

                    <Text style={styles.buttonL} onPress={ () => this.props.navigation.navigate('Login')} >Ir a Login</Text>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    preview:{
        height:'40vh'
    },
    register:{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        flex: 1,

    },

    buttonImg:{
        height: 80,
        width:80,
        alignSelf: 'center',
        marginBottom: 27
    }, 

    textInput: {
        flex: 1,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#667080',
        fontSize: 16,
        width: 345,
        padding: 10,
        marginBottom: 27,
        borderRadius: 5,
        color:'#667080'
    },
   
    titulo:{
      fontWeight:'bold',
      fontFamily: "'Helvetica', 'Arial', sans-serif;",
      fontSize:40,
      marginBottom: 30,
    },
    buttonR:{
        backgroundColor: '#000000',
        color: '#F5F5F5',
        textAlign: 'center',
        fontSize: 16,
        padding: 10,
        marginBottom: 27,
        
    },

    buttonL:{
        backgroundColor: '#E0E2E4',
        color: '#667080',
        textAlign: 'center',
        fontSize: 16,
        padding: 10,
        maxWidth: 130,
        marginBottom: 27,
        marginTop: 60,
        alignSelf: 'center',
        alignItems: 'flex-end'
    },
    
    

  
  });

export default Register