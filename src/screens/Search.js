import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity} from 'react-native';
import { ActivityIndicator, FlatList } from 'react-native-web';
import { db, auth } from '../firebase/config';

class Search extends Component {
    constructor(){
        super()
        this.state = {
            
        }
    }
    
    render(){
        return(
            <View>
                <Text>Buscador</Text>
            </View>
        )
    }
    
}


export default Search