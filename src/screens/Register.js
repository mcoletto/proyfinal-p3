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


    render (){
        return (
            <View style={styles.container}>
                <Text>Registrate</Text>
                <View>
                    <TextInput style={styles.field}
                        placeholder= 'email' 
                        keyboardType= 'email-address' 
                        onChangeText= {text => this.setState({email:text})} 
                        value= {this.state.email} 
                    />
                    <TextInput style={styles.field}
                        placeholder= 'password'
                        keyboardType= 'default'
                        secureTextEntry={true}
                        onChangeText= {text => this.setState({password:text})}
                        value= {this.state.password}
                    />
                    <TextInput style={styles.field}
                        placeholder= 'username'
                        keyboardType= 'default'
                        onChangeText= {text => this.setState({user:text})}
                        value= {this.state.user}
                    />
                    <TextInput style={styles.field}
                        placeholder= 'bio'
                        keyboardType= 'default'
                        onChangeText= {text => this.setState({bio:text})}
                        value= {this.state.bio}
                    />
                    
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