import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity} from 'react-native';
import { auth } from '../firebase/config';

class Home extends Component {
    constructor(){
        super()
        this.state = {

        }
    }

    
    render(){
        return(
            <View>
                <Text>Estas en la home</Text>
            </View>
        )
    }
    
}


export default Home