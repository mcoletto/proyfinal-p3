import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';
import { ActivityIndicator, FlatList } from 'react-native-web';

class Comments extends Component{
    constructor (props) {
        super(props)
        this.state={
            comments: '',
            id: this.props.route.params.idPost,
            post: [],
            loading1: true
        }
    }

    componentDidMount(){
    console.log('Montoda')
    db.collection('posts').doc(this.state.id).onSnapshot(
        doc => {
            console.log(this.state.id,'Fede')
            this.setState({
                post: doc.data(),
                loading1:false
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
    console.log(this.state.post)
    return (
        <View>
            {this.state.loading1 === true ? <ActivityIndicator size='large' color='green' /> :
            
            this.state.post.comments.length === 0 ? <Text>no hay comentarios</Text> 
            : 
            <View> 
                <FlatList data={this.state.post.comments} keyExtractor={unComentario=> unComentario.createdAt.toString()} renderItem={({ item }) => <> <Text> {item.owner} </Text> <Text>{item.comments}</Text> </> } />
            </View>
         }
                  <View>
                    <TextInput
                        placeholder='Agregar Comentario'
                        keyboardType='default'
                        onChangeText={text => this.setState({ comments: text })}
                        value={this.state.comments}
                    />
                    <TouchableOpacity onPress={() => this.sendComment(this.state.comments)}>
                        <Text>Comentar</Text>
                    </TouchableOpacity>
                </View>
        </View>
    )

}
}

export default Comments
