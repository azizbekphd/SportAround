import React, { useEffect, useState } from 'react';
import globalStyles from '../global/Styles';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import Toolbar from '../components/Toolbar';
import H3 from '../components/H3';
import AnimatedTextInput from '../components/AnimatedTextInput';
import Button from '../components/Button';
import H2 from '../components/H2';
import { LinearGradient } from 'expo-linear-gradient';
import Navbar from '../components/Navbar';
import SportChoiceScreen from './SportChoiceScreen';
import LobbyScreen from './LobbyScreen';
import GamesHistoryScreen from './GamesHistoryScreen';
import FriendsScreen from './FriendsScreen';
import PersonalAccountScreen from './PersonalAccountScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator()

export default function MainScreen(props) {
    return (
        <Tab.Navigator initialRouteName="SportChoice" screenOptions={{ headerShown: false }} tabBar={tabbarProps => <Navbar {...tabbarProps} />}>
            {/*{pageIndex == 0 ? <LobbyScreen /> :
                (pageIndex == 1 ? <GamesHistoryScreen /> :
                    (pageIndex == 2 ? <SportChoiceScreen /> :
                        (pageIndex == 3 ? <FriendsScreen /> :
                            <PersonalAccountScreen userData={userData} />)))}
            <Navbar setPageIndex={setPageIndex} pageIndex={pageIndex} />*/}
            <Tab.Screen name="Lobby" component={LobbyScreen} />
            <Tab.Screen name="GamesHistory" component={GamesHistoryScreen} />
            <Tab.Screen name="SportChoice" component={SportChoiceScreen} />
            <Tab.Screen name="Friends" component={FriendsScreen} />
            <Tab.Screen name="PersonalAccount" component={PersonalAccountScreen} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    sport: {
        height: 148,
        width: 160,
        borderRadius: 10
    }
})