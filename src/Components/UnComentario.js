import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity,ImageBackground} from 'react-native';
import { db, auth } from '../firebase/config';
import { StyleSheet } from 'react-native-web';
import firebase from 'firebase';


class UnComentario extends Component {
    constructor(props){
        super(props)
        this.state = {
        foto:''
        }
    }

    componentDidMount(){ 
        db.collection('users').where('owner', '==', this.props.comment.owner).onSnapshot(
            docs =>{
                let usuario = [];
                docs.forEach (doc => {
                    usuario.push({
                        id: doc.id,
                        data: doc.data()
                    })
                this.setState({
                    foto:usuario[0].data.foto,
                    username: usuario[0].data.username
                }, () => console.log(this.state))
                })
            }
        )
    }

   render(){
        return(
            <View style={styles.containerComent}> 
                    <Image style={styles.profilePhoto} source={{uri:this.state.foto}} resizeMode='auto'/> 
                    <Text style={styles.text}>{this.state.username} </Text>
                    <Text style={styles.text}>{this.props.comment.comments}</Text> 
            </View>  
        )}
    }
const styles = StyleSheet.create({
        containerComent:{
        alignItems: 'center',
        marginTop:10,
        flexDirection:'row',
        height:50,
        marginLeft:5
        },
        profilePhoto:{
            width:40,
            height:40,
            borderBottomRightRadius: 30,
            borderBottomLeftRadius: 30,
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            marginRight:10
        },
        text:{
            fontSize:20
        }
    })
    

export default UnComentario;