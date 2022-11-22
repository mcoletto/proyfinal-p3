import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacit, Image} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyProfile from '../screens/MyProfile'
import NewPost from '../screens/NewPost'
import PrincipalMenu from './PrincipalMenu';

const Tab = createBottomTabNavigator();

function HomeMenu () {
        return(
                <Tab.Navigator 
                screenOptions={{
                        tabBarShowLabel: false,
                        tabBarStyle: { backgroundColor: 'black',height:'8vh',borderTopStyle: 'none'},
                        activeTintColor: 'red'
                }} 
                >
                    <Tab.Screen name='Principal' component = {PrincipalMenu} options={{
                        headerShown:false,
                        tabBarIcon: ({focused}) => (
                                <Image
                                  source={
                                      require('../../assets/home.svg')
                                  }
                                  resizeMode='center'
                                  style={{
                                        height: 50,
                                        width:50,
                                        opacity: focused? 1 : 0.4
                                        }
                                }
                                />
                              ),
                        }} 
                    
                    />
                    <Tab.Screen name='NewPost' component = {NewPost} 
                    options={{
                      headerShown:false,
                        tabBarIcon: ({focused}) => (
                                <Image
                                  source={
                                      require('../../assets/addPhoto.svg')
                                  }
                                  resizeMode='center'
                                  style={{
                                    height: 50,
                                    width:50,
                                    opacity: focused? 1 : 0.4
                                  }}
                                />
                              ),
                    }}
                    />
                    <Tab.Screen name='MyProfile' component = {MyProfile} 
                    options={{
                        headerShown:false,
                        tabBarIcon: ({focused}) => (
                                <Image
                                  source={
                                      require('../../assets/user.svg')
                                  }
                                  resizeMode='center'
                                  style={{
                                    height: 50,
                                    width:50,
                                    opacity: focused? 1 : 0.4
                                  }}
                                />
                              ),
                    }}
                    />
                </Tab.Navigator>
        )
}

export default HomeMenu;