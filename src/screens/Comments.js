import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, FlatList} from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

class Comments extends Component{
    constructor (props) {
        super(props)
        this.state={
            comments: '',
            id: this.props.route.params,
            post: []
        }
    }

    componentDidMount(){
    db.collection('posts').doc(this.state.id).onSnapshot(
        doc => {
            this.setState({
                post: doc.data()
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
        <View>
            {this.state.post.comments?.length === 0 ? <Text>no hay comentarios</Text> 
            : <FlatList data={this.state.post.comments} keyExtractor={unComentario=> unComentario.createdAt.toString()} renderItem={({ item }) => <> <Text> {item.owner} </Text> <Text>{item.comments}</Text> </> } />
            }
            <View>

                <TextInput
                    placeholder='Comentario'
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
