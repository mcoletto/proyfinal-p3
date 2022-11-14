import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity} from 'react-native';
import { ActivityIndicator, FlatList } from 'react-native-web';
import { db, auth } from '../firebase/config';

import UnPost from '../Components/UnPost';

class MyProfile extends Component {
    constructor(){
        super()
        this.state = {
            posteos: [],
            usuario: [],
            username: '',
            loading1: true,
            loading2: true
        }
    }

    componentDidMount(){
        this.obtenerPosteos();
        this.obtenerUsuario()
    }

    obtenerPosteos(){
        db.collection('posts').where('owner', '==', auth.currentUser.email).orderBy('createdAt', 'desc').onSnapshot(
            docs =>{
                let posts = [];
                docs.forEach (doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                this.setState({
                    posteos: posts,
                    loading1: false
                }, () => console.log(this.state))
                })
            }
        )
    }

    obtenerUsuario(){
        db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot(
            docs =>{
                let usuario = [];
                docs.forEach (doc => {
                    usuario.push({
                        id: doc.id,
                        data: doc.data()
                    })
                this.setState({
                    usuario: usuario[0],
                    username: usuario[0].data.username,
                    loading2: false
                }, () => console.log(this.state))
                })
            }
        )
    }

    logout() {
        auth.signOut()
        this.props.navigation.navigate('Login')
    }

    render(){
        //console.log(this.state.usuario.data.username);
        return(
            
            <View>
                <Text>Bienvenido a tu perfil, {this.state.username}</Text>
                
                {this.state.loading1 && this.state.loading2 ? <ActivityIndicator size='large' color='green' /> : 
                <FlatList
                    data={this.state.posteos}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => <UnPost post={item} />}
                />
                
                }
                <TouchableOpacity onPress={() => this.logout()}>
                    <Text>Logout</Text>   
                </TouchableOpacity>


            </View>
        )
    }
    
}


export default MyProfile