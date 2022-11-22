import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity,ImageBackground} from 'react-native';
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
            userLike:false,
            fotoUsuario:''
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
  //              console.log(docs);
                docs.forEach(doc => {
                    unUsuario.push({
                        id:doc.id,
                        data:doc.data()
                    })
                })
                this.setState({
                    usuario: unUsuario[0],
                    username: unUsuario[0].data.username,
                    fotoUsuario: unUsuario[0].data.foto
                })
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

    borrarPost(){
        let bool = confirm('desea borrar el post?')
        {bool ? db.collection("posts").doc(this.props.post.id).delete()
        : console.log('se arrepintio');}
        
    }

    render(){
        return(
                <View style={styles.container}>
                    <Image style={styles.image} source={{uri:this.props.post.data.photo}} resizeMode='auto'>
                    </Image>   
                    {auth.currentUser.email == this.props.post.data.owner ?
                            <TouchableOpacity onPress={() => this.borrarPost()}>
                                <Text>Borrar post</Text>   
                            </TouchableOpacity> 
                            : ''
                    } 
                                
                </View>
            )
        }
    }
//<Text>{this.state.usuario[0].data.bio}</Text>   esto va arriba de la imagen, tiene que mostrar el nombre de usauario que subio el post, y cuando lo tocas redirigir a la view de ver perfil de ese user
    const styles = StyleSheet.create({
        container:{
            width:'100%',
            margin:5,
            alignItems: 'center'
        },  
        image: {
            height: 300,
            width:300,
            alignSelf: 'center',
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
        }
    })
    

export default UnPost;