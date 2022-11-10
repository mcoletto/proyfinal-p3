import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import { auth } from '../firebase/config';
import FormPost from '../Components/formPost'


class NewPost extends Component {
    constructor(){
        super()
        this.state = {

        }
    }

    
    render(){
        return(
            <View>
                <FormPost/>
            </View>
        )
    }
    
}


export default NewPost

const styles = StyleSheet.create({
   
  });