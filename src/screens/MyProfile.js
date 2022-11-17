import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity,StyleSheet,Image} from 'react-native';
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
            bio:'',
            foto:'',
            mail:'',
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
                    bio:usuario[0].data.bio,
                    mail:usuario[0].data.owner,
                    foto:usuario[0].data.foto,
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

    borrarCuenta(){
        console.log(this.state.usuario.id);
        db.collection("users").doc(this.state.usuario.id).delete()
        .then(()=> {
            console.log('entre');
            auth.currentUser.delete()
        })
        .then(()=> {
            console.log('entre 2');
            this.props.navigation.navigate('Register')
        
        })
        .catch((err) => 'pifiaste algo, el error es: ' + err)
    }

    render(){
        console.log(this.state.foto);
        return(
            <View>
                <Text>Bienvenido a tu perfil, {this.state.username}</Text>
                
                {this.state.loading1 && this.state.loading2 ? <ActivityIndicator size='large' color='green' /> : 
                 <View>
                    <Image 
                    style={styles.preview}
                    source={{uri: this.state.foto}}
                    resizeMode='cover'
                    /> 
                    <Text>{this.state.username}</Text>
                    <Text>{this.state.mail}</Text>
                    <Text>Posts: {this.state.posteos.length}</Text>
                    <Text>{this.state.bio}</Text>
                
                <FlatList
                    data={this.state.posteos}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => <UnPost post={item} />}
                />
                
                 </View>
                
                }
                <TouchableOpacity onPress={() => this.logout()}>
                    <Text>Logout</Text>   
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.borrarCuenta()}>
                    <Text>Borrar cuenta</Text>   
                </TouchableOpacity>

            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    preview:{
        height:'40vh'
    }
}) 


export default MyProfile