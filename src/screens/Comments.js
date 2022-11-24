import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';
import { StyleSheet,ActivityIndicator, FlatList } from 'react-native-web';
import UnComentario from '../Components/UnComentario'

class Comments extends Component{
    constructor (props) {
        super(props)
        this.state={
            comments: '',
            id: this.props.route.params.idPost,
            post: [],
            loading1: true,
            username:'',
            fotoUsuario:'',
            bioUsuario:''
        }
    }
    
    componentDidMount(){ 
    db.collection('posts').doc(this.state.id).onSnapshot(
        doc => {
                this.setState({
                post: doc.data(),
                loading1:false
            }, () => this.setState({commentsOrder: this.state.post.comments.reverse()}))
        })
    db.collection('users').where('owner', '==', this.props.route.params.mail).onSnapshot(
            docs =>{
                let usuario = [];
                docs.forEach (doc => {
                    usuario.push({
                        id: doc.id,
                        data: doc.data()
                    })
                this.setState({
                    username: usuario[0].data.username,
                    fotoUsuario:usuario[0].data.foto,
                    bioUsuario:usuario[0].data.bio
                })
                })
            }
        )
}

sendComment(comments) {
    db.collection('posts')
        .doc(this.state.id) 
        .update({
            comments: firebase.firestore.FieldValue.arrayUnion({
                owner: auth.currentUser.email,
                comments: comments,
                createdAt: Date.now()
            })
        })
        .then(() => {
            this.setState({
                comments: ''
            })
        })
}

render() {
    return (
        <View style={styles.scroll}>
            {this.state.loading1 === true ? <ActivityIndicator size='large' color='green' /> :
                <View style={styles.scroll}>
                    <View style={styles.containerPost}>
                        <Image style={styles.profilePhoto} source={{uri:this.state.fotoUsuario}} resizeMode='auto'/> 
                        <Text style={styles.username}>{this.state.username}</Text>
                        <Image style={styles.postPhoto} source={{uri:this.state.post.photo}} resizeMode='contain' /> 
                        <Text style={styles.bio}>{this.state.post.text}</Text>
                    </View>
                    <View style={styles.containerAdd}>
                    <TextInput
                        style={styles.input}
                        placeholder='Agregar Comentario'
                        keyboardType='default'
                        onChangeText={text => this.setState({ comments: text })}
                        value={this.state.comments}
                    />
                    <TouchableOpacity  style={styles.sendCont} onPress={() => this.sendComment(this.state.comments)}>
                        <Image 
                            style={styles.send}
                            source={require('../../assets/send.svg')}
                            resizeMode='contain' 
                        />
                    </TouchableOpacity>
                    </View> 
                    {this.state.post.comments.length === 0 && this.state.loading1 === false ? 
                    <Text>no hay comentarios</Text> 
                    : 
                        <FlatList style = {styles.containerCom} data={this.state.commentsOrder} keyExtractor={unComentario=> unComentario.createdAt.toString()} renderItem={({ item }) =>  <UnComentario comment={item}/>} />
                    }
                </View>
            }     
            
        </View>
    )

}
}

const styles = StyleSheet.create({
    containerCom:{
        flex:1
    },
    scroll:{
        flex:1
    },
    containerPost: {
      alignItems:'center',
      height:'50vh',
      marginTop:30
    },
    profilePhoto:{
        width:60,
        height:60,
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
    },
    username:{
        fontSize:20,
        marginTop:10
    },
    postPhoto:{
       marginTop:10,
       height:'70%',
       width:'100%' 
    },
    bio:{
        alignSelf:'flex-start',
        fontSize:20,
        marginTop:2,
        marginLeft:4
    },
    containerAdd:{
        marginTop:'6%',
        flexDirection:'row',
        backgroundColor:'black',
        height:50,
        alignItems:'center'
    },
    input:{
        padding:5,
        color:'white',
        width:'85%'
    },
    sendCont:{
        backgroundColor:'#C3C3C3',
        height:'100%',
        width:'15%',
        alignItems:'center',
        justifyContent: 'center'
    },
    send:{
        width:'85%',
        height:'85%'
    }

  });
  

export default Comments
