import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import { ActivityIndicator, FlatList, StyleSheet} from 'react-native-web';
import { db, auth } from '../firebase/config';

class Search extends Component {
    constructor(){
        super()
        this.state = {
            busqueda: '',
            usuarios: [],
            loading: true,
            result: []
        }
    }

    componentDidMount(){
        db.collection('users').onSnapshot(
            docs => {
                
                let usuarios = [];
                docs.forEach(doc => {
                    usuarios.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({
                    usuarios: usuarios,
                    loading: false
                })
            }
        )
    }

    buscar(text){
        let result = this.state.usuarios.filter((unUsuario) => {
            return unUsuario.data.username.toLowerCase().includes(text.toLowerCase())
        })
        this.setState({result: result, busqueda: text});
    }
    
    render(){
        console.log(this.state.result)
        return(
            <View>
                <TextInput
                    style={styles.input}
                        placeholder= 'Search' 
                        keyboardType= 'default' 
                        onChangeText= {text => this.buscar(text)} 
                        value= {this.state.busqueda}
                    />
                {this.state.loading ? <ActivityIndicator size='large' color='green' /> : 
                    <FlatList
                        data={this.state.result}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({item}) => 
                        <TouchableOpacity style={styles.user}onPress={()=> this.props.navigation.navigate('Profile', {mail: item.data.owner})}>
                            <Image style={styles.profilePhoto} source={{uri:item.data.foto}} resizeMode='auto'/>
                            <Text style={styles.text}>{this.state.result == [] ? 'No se encontraron resultados' : item.data.username}</Text>
                        </TouchableOpacity>
                        
                        } 
                    />}
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    input:{
        marginTop:10,
        alignSelf:'center',
        height:50,
        width:'60%',
        backgroundColor:'black',
        color:'white',
        padding:5  
    },
    user:{
        marginTop:10,
        padding:5,
        width:'100%',
        backgroundColor:'#C3C3C3',
        flexDirection:'row',
        alignItems: 'center'
    },
    profilePhoto:{
        marginRight:10,
        height:40,
        width:40,
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50
    },
    text:{fontSize:15}
})

export default Search