import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity} from 'react-native';
import { auth } from '../firebase/config';

class Profile extends Component {
    constructor(){
        super()
        this.state = {

        }
    }

    
    render(){
        return(
            <View>
                <Text>Estas en la Profile</Text>
            </View>
        )
    }
    
}


export default Profile