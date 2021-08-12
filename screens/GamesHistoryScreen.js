import React, { useRef } from 'react';
import globalStyles from '../global/Styles';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import Toolbar from '../components/Toolbar';
import H3 from '../components/H3';
import AnimatedTextInput from '../components/AnimatedTextInput';
import Button from '../components/Button';
import H2 from '../components/H2';
import { LinearGradient } from 'expo-linear-gradient';
import Navbar from '../components/Navbar';
import { useNavigation } from '@react-navigation/native';
import Searchbar from '../components/Searchbar';
import GamesHistory from '../components/GamesHistory';

export default function GamesHistoryScreen(props) {

    const navigation = useNavigation()
    const ref = useRef()

    const openNextPage = (isSoccer) => {
        navigation.navigate('NewGame', { isSoccer: isSoccer })
    }

    return (
        <>
            <Toolbar title="История игр" onMenu={() => { }} />
            <View style={[globalStyles.container, { justifyContent: 'flex-start', paddingHorizontal: 20, paddingTop: 20 }]} >
                <Searchbar ref={ref} onChangeText={() => { }} />
                <View style={{ height: 16 }} />
                <ScrollView width="100%">
                    <GamesHistory
                        gamesInfo={[
                            {
                                id: "1",
                                sport: "soccer",
                                date: "21.04.2019"
                            }, {
                                id: "2",
                                sport: "soccer",
                                date: "10.04.2019"
                            }, {
                                id: "3",
                                sport: "basketball",
                                date: "5.04.2019"
                            }, {
                                id: "4",
                                sport: "basketball",
                                date: "2.04.2019"
                            }, {
                                id: "5",
                                sport: "soccer",
                                date: "13.03.2019"
                            }, {
                                id: "6",
                                sport: "soccer",
                                date: "13.03.2019"
                            }, {
                                id: "7",
                                sport: "soccer",
                                date: "13.03.2019"
                            }, {
                                id: "8",
                                sport: "soccer",
                                date: "13.03.2019"
                            }, {
                                id: "9",
                                sport: "soccer",
                                date: "13.03.2019"
                            }, {
                                id: "10",
                                sport: "soccer",
                                date: "13.03.2019"
                            }, {
                                id: "11",
                                sport: "soccer",
                                date: "13.03.2019"
                            }, {
                                id: "12",
                                sport: "soccer",
                                date: "13.03.2019"
                            }, {
                                id: "13",
                                sport: "soccer",
                                date: "13.03.2019"
                            }, {
                                id: "14",
                                sport: "soccer",
                                date: "13.03.2019"
                            }
                        ]}
                    />
                </ScrollView>
            </View>
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