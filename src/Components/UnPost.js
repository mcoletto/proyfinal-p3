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
            fotoUsuario:'',
            mailUsuario:''
        }
    }

    componentDidMount(){
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
                    fotoUsuario: unUsuario[0].data.foto,
                    mailUsuario: unUsuario[0].data.owner
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
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email) 
            })
            .then(()=> this.setState({
                nroDeLikes: this.state.nroDeLikes -1,
                userLike: false, 
                })
            )
            .catch(e=>console.log(e))
    }

    render(){
        return(
                <View>
                    <ImageBackground style={styles.image} source={{uri:this.props.post.data.photo}} resizeMode='auto'>
                        <View  style={styles.caja}>
                            
                            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Profile', {mail: this.state.usuario.data.owner})}>
                                <Image 
                                    style={styles.profile}
                                    source={{uri:this.state.fotoUsuario}}
                                    resizeMode='auto' 
                                />
                            </TouchableOpacity>

                            {/* <Text>{this.props.post.data.text}</Text>*/}

                            
                            <View style={styles.componentContainer}>

                                { this.state.userLike ? 
                                <TouchableOpacity onPress={ ()=> this.unlike() }>
                                        <Image 
                                        style={styles.like}
                                        source={require('../../assets/Like.svg')}
                                        resizeMode='contain' 
                                />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={ ()=> this.like() }>
                                    <Image 
                                        style={styles.unlike}
                                        source={require('../../assets/Like.svg')}
                                        resizeMode='contain' 
                                    />
                                </TouchableOpacity>
                                }
                                <Text style={styles.number}> {this.state.nroDeLikes} </Text>

                            </View>
                                                   
                            <TouchableOpacity onPress={ () => this.props.navigation.navigate('Comments',{idPost: this.props.post.id, mail:this.state.mailUsuario})}>
                                <View  style={styles.componentContainer}>
                                    <Image 
                                        style={styles.like}
                                        source={require('../../assets/comments.svg')}
                                        resizeMode='contain' 
                                    />  
                                    <Text style={styles.number}>{this.props.post.data.comments.length}</Text>   
                                </View>
                            </TouchableOpacity>

                        </View>      
                    </ImageBackground>
                    
                                  
                </View>
            )
        }
    }
//<Text>{this.state.usuario[0].data.bio}</Text>   esto va arriba de la imagen, tiene que mostrar el nombre de usauario que subio el post, y cuando lo tocas redirigir a la view de ver perfil de ese user
    const styles = StyleSheet.create({
        image: {
            height: 500,
            width:350,
            alignSelf:'center',
            borderRadius: 20,
            overflow: 'hidden',
            margin:10
        },
        caja: {
            flexDirection: 'row',
            height:80,
            width:250,
            alignSelf:'center',
            borderBottomRightRadius: 15,
            borderBottomLeftRadius: 15,
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
            alignItems: 'center',
            justifyContent: 'space-around',
           backgroundColor: 'rgba(217, 217, 217, 0.5)',  
            backdropFilter: 'blur(8)',
            position:'relative',
            top: 400
        },
        profile: {
            height:60,
            width:60,
            borderBottomRightRadius: 50,
            borderBottomLeftRadius: 50,
            borderTopRightRadius: 50,
            borderTopLeftRadius: 50,
        },
        unlike:{
            height:35,
            width:35,
            opacity: 0.4
        },
        like:{
            height:35,
            width:35
        },
        componentContainer:{
            flexDirection: 'column',
            alignItems:'center'
        },
        number:{
            fontWeight:'bold',
            fontFamily: "'Helvetica', 'Arial', sans-serif;",
            fontSize:15
        }
    })
    

export default UnPost;