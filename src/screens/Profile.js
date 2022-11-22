import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image} from 'react-native';
import { ActivityIndicator, FlatList } from 'react-native-web';
import { db, auth } from '../firebase/config';

import UnPost from '../Components/UnPost';

class Profile extends Component {
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
        db.collection('posts').where('owner', '==', this.props.route.params.mail).orderBy('createdAt', 'desc').onSnapshot(
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
        db.collection('users').where('owner', '==', this.props.route.params.mail).onSnapshot(
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
    
    render(){
        return(
            
            <View style={styles.scroll}> 
               
            <View style={styles.infoContainer}>
                <Image 
                style={styles.img}
                source={{uri: this.state.foto}}
                resizeMode='cover'
                /> 

                <Text>{this.state.username}</Text>
                <Text>{this.state.mail}</Text>
                <Text>Posts: {this.state.posteos.length}</Text>
                <Text>{this.state.bio}</Text>
            </View>

            {this.state.loading1 && this.state.loading2 ? <ActivityIndicator size='large' color='green' /> : 
            <FlatList
                data={this.state.posteos}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => <UnPost post={item} navigation={this.props.navigation} />}
            />
            }
    </View>
        )
    }
    
}

const styles = StyleSheet.create({
    infoContainer:{
        flexDirection:'column',
        alignItems:'center',
        height:'30vh'
    },
    img:{
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        height:85,
        width:85
    },
    titulo:{
        fontWeight:'bold',
        fontFamily: "'Helvetica', 'Arial', sans-serif;",
        fontSize:40
      },
      upContainer:{
        flexDirection:'row',
        justifyContent:'space-around'
      },
      text:{

      },
      scroll:{
        flex:1,
      },
      list:{
        flex:1,
        flexWrap:'wrap'
      }
}) 

export default Profile

