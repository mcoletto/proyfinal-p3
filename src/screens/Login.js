import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity} from 'react-native';
import { auth } from '../firebase/config';

class Login extends Component {
    constructor(){
        super()
        this.state = {
            email:'',
            password:'',
            error:'',
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged( user => {
            if(user != null){
                this.props.navigation.navigate('HomeMenu')
            }
        })
    }
        
    login(){
        auth.signInWithEmailAndPassword(this.state.email,this.state.password)
        .then( res => 
            {   
                this.setState({email:'',password:'',error:'Logueado correctamente'})
                this.props.navigation.navigate('HomeMenu')
            })
        .catch(error => {
            console.log(error);
            this.setState({error:error.message})
        })
    }
    
    render(){
        return(
            <View> 
                <Text>Login</Text>
                <View>
                   <TextInput  
                       placeholder='email'
                       keyboardType='email-address'
                       onChangeText={ text => this.setState({email:text}) }
                       value={this.state.email}
                    /> 
                    <TextInput  
                        placeholder='password'
                        keyboardType='default'
                        secureTextEntry={true}
                        onChangeText={ text => this.setState({password:text}) }
                        value={this.state.password}
                    />  

                    <TouchableOpacity onPress={()=>this.login()}>
                        <Text>Ingresar</Text>
                    </TouchableOpacity>
                    <Text> {this.state.error} </Text>
                    <Text onPress={ () => this.props.navigation.navigate('Register')} >Ir a Registro</Text>
                </View>
            </View>
        )
    }
    
}


export default Login