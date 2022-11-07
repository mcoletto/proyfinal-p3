import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity} from 'react-native';
import { auth } from '../firebase/config';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home'
import Profile from '../screens/Profile'
import NewPost from '../screens/NewPost'

const Tab = createBottomTabNavigator();

function HomeMenu () {
        return(
                <Tab.Navigator screenOptions={{tabBarShowLabel: false}}>
                    <Tab.Screen name='Home' component = {Home} />
                    <Tab.Screen name='NewPost' component = {NewPost} />
                    <Tab.Screen name='Profile' component = {Profile} />
                </Tab.Navigator>
        )
}

export default HomeMenu;