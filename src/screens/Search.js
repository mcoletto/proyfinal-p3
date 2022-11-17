import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity} from 'react-native';
import { ActivityIndicator, FlatList } from 'react-native-web';
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
                console.log(this.state)
            }
        )
    }

    buscar(text){
        console.log(this.state.busqueda);
        console.log(this.state.usuarios);
        console.log(this.state.result);
        let result = this.state.usuarios.filter((unUsuario) => {
            return unUsuario.data.username.toLowerCase().includes(text.toLowerCase())
        })
        this.setState({result: result, busqueda: text});
    }
    
    render(){
        return(
            <View>
                <Text>Buscador</Text>
                <TextInput
                        placeholder= 'Ingrese un nombre de usuario para buscar' 
                        keyboardType= 'default' 
                        onChangeText= {text => this.buscar(text)} 
                        value= {this.state.busqueda}
                    />
                {this.state.loading ? <ActivityIndicator size='large' color='green' /> : 
                    <FlatList
                        data={this.state.result}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({item}) => 
                        <TouchableOpacity onPress={()=> this.props.navigation.navigate('Profile', {mail: item.data.owner})}>
                            <Text>{this.state.result == [] ? 'No se encontraron resultados' : item.data.username}</Text>
                        </TouchableOpacity>
                        
                        } 
                    />}
            </View>
        )
    }
    
}


export default Search