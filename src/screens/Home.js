import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity} from 'react-native';
import { ActivityIndicator, FlatList } from 'react-native-web';
import { db, auth } from '../firebase/config';
import UnPost from '../Components/UnPost';


class Home extends Component {
    constructor(){
        super()
        this.state = {
            posteos: [],
            loading: true
        }
    }

    componentDidMount(){
        db.collection('posts').onSnapshot(
            docs => {
                
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({
                    posteos: posts,
                    loading: false
                })
                console.log(this.state)
            }
        )
    }

    
    render(){
        return(
            <View>
                <Text>Estas en la home</Text>
                {this.state.loading ? <ActivityIndicator size='large' color='green' /> : 
                <FlatList
                    data={this.state.posteos}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => <UnPost post={item} />}
                />
                
                }
            </View>
        )
    }
    
}


export default Home