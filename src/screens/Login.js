import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity} from 'react-native';

class Login extends Component {
    constructor(){
        super()
        this.state = {
            email:'',
            password:'',
            errors:''
        }
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
                        onChangeText={ text => this.setState({password:text}) }
                        value={this.state.password}
                    />  

                    <TouchableOpacity onPress={()=>this.login(this.state.email, this.state.password)}>
                        <Text>Ingresar</Text>
                    </TouchableOpacity>
                    <Text onPress={ () => this.props.navigation.navigate('Register')} >Ir a Registro</Text>
                </View>
            </View>
        )
    }
    
}


export default Login