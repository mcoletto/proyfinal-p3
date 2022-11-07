import React, {Component} from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { auth, db } from '../firebase/config';

class Register extends Component {
    constructor(){
        super()
        this.state = {
            email: '',
            password: '',
            user: '',
            bio: '',
            foto: '',
            error: '',
        }
    }

    onSubmit(){
        console.log('si')
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
                    //falta foto
                    createdAt:Date.now()  
                  })
                this.props.navigation.navigate('Login')
            })
            .catch(error =>{
                console.log(error);
                this.setState({error:error.message})
            })
    }


    render (){
        return (
            <View>
                <Text>Registrate</Text>
                <View>
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

export default Register