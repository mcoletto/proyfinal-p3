import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native';
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
            <View style = {styles.login}> 
                <Text  style={styles.titulo}>Login</Text>
                <View>
                    <View >
                        <TextInput  
                            style = {styles.textInput} 
                            placeholder='email'
                            keyboardType='email-address'
                            onChangeText={ text => this.setState({email:text}) }
                            value={this.state.email}
                            /> 
                            <TextInput  
                                style = {styles.textInput} 
                                placeholder='password'
                                keyboardType='default'
                                secureTextEntry={true}
                                onChangeText={ text => this.setState({password:text}) }
                                value={this.state.password}
                            />  
                    </View>
                            <TouchableOpacity  onPress={()=>this.login()}>
                                <Text style={styles.buttonL} >Ingresar</Text>
                            </TouchableOpacity>
                            <Text> {this.state.error} </Text>
                            <Text style={styles.buttonR} onPress={ () => this.props.navigation.navigate('Register')} >Registrate</Text>
                </View>
            </View>
                    )
    }
    
}

const styles = StyleSheet.create({

    login:{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        flex: 1,

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
      marginBottom: 60,
    },
    buttonL:{
        backgroundColor: '#000000',
        color: '#F5F5F5',
        textAlign: 'center',
        fontSize: 16,
        padding: 10,
        marginBottom: 27,
        marginTop: 20
        
    },

    buttonR:{
        backgroundColor: '#E0E2E4',
        color: '#667080',
        textAlign: 'center',
        fontSize: 16,
        padding: 10,
        maxWidth: 130,
        marginBottom: 27,
        alignSelf: 'center',
        alignItems: 'flex-end'
    },
    
    

  
  });
  

export default Login