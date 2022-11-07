import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity} from 'react-native';
import { auth } from '../firebase/config';

class NewPost extends Component {
    constructor(){
        super()
        this.state = {

        }
    }

    
    render(){
        return(
            <View>
                <Text>Estas en la NewPost</Text>
            </View>
        )
    }
    
}


export default NewPost