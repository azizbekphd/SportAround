import React, { useState } from 'react';
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

export default function MainScreen({ navigation }) {

    const [pageIndex, setPageIndex] = useState(2)

    const openNextPage = (isSoccer) => {
        navigation.navigate('NewGame', { isSoccer: isSoccer })
    }

    return (
        <>
            {pageIndex == 0 ? <LobbyScreen /> :
                (pageIndex == 1 ? <></> :
                    (pageIndex == 2 ? <SportChoiceScreen /> :
                        (pageIndex == 3 ? <></> :
                            <></>)))}
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