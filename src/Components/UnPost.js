import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import { db, auth } from '../firebase/config';
import { StyleSheet } from 'react-native-web';
import firebase from 'firebase';


class UnPost extends Component {
    constructor(props){
        super(props)
        this.state = {
            usuario: [],
            username: '',
            nroDeLikes: this.props.post.data.likes.length,
            userLike:false
        }
    }

    componentDidMount(){
        //console.log(this.props.post.id);
        if(this.props.post.data.likes.includes(auth.currentUser.email)){ 
            this.setState({
                userLike:true
            })
        }
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

    like(){
        db.collection('posts')
            .doc(this.props.post.id) 
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email) 
            })
            .then(()=> this.setState({
                nroDeLikes: this.state.nroDeLikes +1,
                userLike: true, 
                })
            )
            .catch(e=>console.log(e))
    }

    unlike(){
        if(this.state.userLike === true){
            db.collection('posts')
            .doc(this.props.post.id) 
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email) 
            })
            .then(()=> this.setState({
                nroDeLikes: this.state.nroDeLikes -1,
                userLike: false, 
                })
            )
            .catch(e=>console.log(e))
        }
        
    }

    borrarPost(){
        console.log('borrate puto');
        console.log(this.props.post.id);
        db.collection("posts").doc(this.props.post.id).delete()
        .then(()=> this.props.navigation.navigate('Profile', {mail: this.state.usuario.data.owner}))
    }

    render(){
        //console.log(this.state.usuario[0]);
        return(
                <>
                <TouchableOpacity onPress={()=> this.props.navigation.navigate('Profile', {mail: this.state.usuario.data.owner})}>
                    <Text>{this.state.username}</Text>
                </TouchableOpacity>
                    <Image 
                        style={styles.image}
                        source={{uri:this.props.post.data.photo}}
                        resizeMode='contain'
                    />
                    <Text>{this.props.post.data.text}</Text>
                
                    <Text> Cantidad de Likes: {this.state.nroDeLikes} </Text>
                    { this.state.userLike ? 
                    <TouchableOpacity onPress={ ()=> this.unlike() }>
                        <Text>Unlike</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={ ()=> this.like() }>
                        <Text>Like</Text>
                    </TouchableOpacity>
                    }

                    {auth.currentUser.email == this.props.post.data.owner ?
                    <TouchableOpacity onPress={() => this.borrarPost()}>
                        <Text>Borrar post</Text>   
                    </TouchableOpacity> 
                    : ''
                    }


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