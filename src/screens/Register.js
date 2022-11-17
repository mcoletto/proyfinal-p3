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
            url: '',
            error: '',
            tomarFoto:false
        }
    }

    onSubmit(){
        this.registerUser(this.state.email, this.state.password);
    }

    registerUser(email, pass){
        //Registrar en firebase y si el reigstro sale bien redireccionar a Home
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
            <View>
                <Text>Registrate</Text>
                <View>
                {
                    this.state.tomarFoto? 
                    <View>
                        <MyCamera onImageUpload={(url) => this.onImageUpload(url)}/>
                        <TouchableOpacity onPress={()=> this.tomarFoto()}>
                            <Text>No tomar foto</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    this.state.url == ''?
                        <TouchableOpacity onPress={()=> this.tomarFoto()}>
                            <Text>Tomar foto</Text>
                        </TouchableOpacity>
                    :
                    <Image 
                            style={styles.preview}
                            source={{uri: this.state.url}}
                            resizeMode='cover'
                        />
                }
                    <TextInput
                        placeholder= 'email' 
                        keyboardType= 'email-address' 
                        onChangeText= {text => this.setState({email:text})} 
                        value= {this.state.email} 
                    />
                    <TextInput 
                        placeholder= 'password'
                        keyboardType= 'default'
                        secureTextEntry={true}
                        onChangeText= {text => this.setState({password:text})}
                        value= {this.state.password}
                    />
                    <TextInput 
                        placeholder= 'username'
                        keyboardType= 'default'
                        onChangeText= {text => this.setState({user:text})}
                        value= {this.state.user}
                    />
                    <TextInput 
                        placeholder= 'bio'
                        keyboardType= 'default'
                        onChangeText= {text => this.setState({bio:text})}
                        value= {this.state.bio}
                    />

                    <Text> {this.state.error} </Text>
                    
                    <TouchableOpacity onPress={() => this.onSubmit()}>
                        <Text> Register </Text>
                    </TouchableOpacity>

                    <Text onPress={ () => this.props.navigation.navigate('Login')} >Ir a Login</Text>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    preview:{
        height:'40vh'
    }
}) 

export default Register