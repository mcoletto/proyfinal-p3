import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity} from 'react-native';
import { auth } from '../firebase/config';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyProfile from '../screens/MyProfile'
import NewPost from '../screens/NewPost'
import principalMenu from './principalMenu';

const Tab = createBottomTabNavigator();

function HomeMenu () {
        return(
                <Tab.Navigator screenOptions={{tabBarShowLabel: false}}>
                    <Tab.Screen name='Principal' component = {principalMenu} options={{headerShown:false}} />
                    <Tab.Screen name='NewPost' component = {NewPost} />
                    <Tab.Screen name='MyProfile' component = {MyProfile} />
                </Tab.Navigator>
        )
}

export default HomeMenu;