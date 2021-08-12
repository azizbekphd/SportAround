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

export default function MainScreen({ route, navigation }) {

    const [pageIndex, setPageIndex] = useState(2)
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (route.params?.initialTab)
            setPageIndex(route.params?.initialTab)
        return () => {
            delete route.params?.initialTab
        }
    }, [route.params?.initialTab])

    useEffect(() => {
        if (route.params?.edited) { setUserData(route.params?.userData) }
        return () => {
            delete route.params?.edited;
            delete route.params?.userData;
        }
    }, [route.params?.edited])

    return (
        <>
            {pageIndex == 0 ? <LobbyScreen /> :
                (pageIndex == 1 ? <GamesHistoryScreen /> :
                    (pageIndex == 2 ? <SportChoiceScreen /> :
                        (pageIndex == 3 ? <FriendsScreen /> :
                            <PersonalAccountScreen userData={userData} />)))}
            <Navbar setPageIndex={setPageIndex} pageIndex={pageIndex} />
        </>
    )
}

const styles = StyleSheet.create({
    sport: {
        height: 148,
        width: 160,
        borderRadius: 10
    }
})