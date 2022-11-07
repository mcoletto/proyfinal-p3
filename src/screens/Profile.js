import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity} from 'react-native';
import { auth } from '../firebase/config';

class Profile extends Component {
    constructor(){
        super()
        this.state = {

        }
    }

    
    logout() {
        auth.signOut()
        this.props.navigation.navigate('Login')
    }
    
    render(){
        return(
            
            <View>
                <Text>Estas en la Profile</Text>
                <TouchableOpacity onPress={() => this.logout()}>
                     <Text>Logout</Text>   
                </TouchableOpacity>

            </View>
        )
    }
    
}


export default Profile