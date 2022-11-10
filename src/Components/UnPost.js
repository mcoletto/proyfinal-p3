import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import { db, auth } from '../firebase/config';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native-web';
import Home from '../screens/Home'
import Profile from '../screens/Profile'
import NewPost from '../screens/NewPost'


class UnPost extends Component {
    constructor(props){
        super(props)
        this.state = {
            usuario: [],
            username: ''
        }
    }

    componentDidMount(){
        //console.log(this.props.post.id);
        db.collection('users').where('owner', '==', this.props.post.data.owner).onSnapshot(
            docs => {
                let unUsuario = []
                console.log(docs);
                docs.forEach(doc => {
                    unUsuario.push({
                        id:doc.id,
                        data:doc.data()
                    })
                })
                //console.log(unUsuario);
                this.setState({
                    usuario: unUsuario[0],
                    username: unUsuario[0].data.username
                }, ()=> console.log(this.state))
            })
    }

    render(){
        //console.log(this.state.usuario[0]);
        return(
                <>
                    <Text>{this.state.username}</Text>
                    <Image 
                        style={styles.image}
                        source={{uri:this.props.post.data.photo}}
                        resizeMode='contain'
                    />
                    <Text>{this.props.post.data.text}</Text>
                </>
                
            )
        }
    }
//<Text>{this.state.usuario[0].data.bio}</Text>   esto va arriba de la imagen, tiene que mostrar el nombre de usauario que subio el post, y cuando lo tocas redirigir a la view de ver perfil de ese user
    const styles = StyleSheet.create({
        image: {
            height: 400,
        }
    })
    

export default UnPost;