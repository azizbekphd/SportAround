import React, { useRef } from 'react';
import globalStyles from '../global/Styles';
import { View, StyleSheet, ScrollView } from 'react-native';
import Toolbar from '../components/Toolbar';
import Searchbar from '../components/Searchbar';
import GamesHistory from '../components/GamesHistory';

export default function GamesHistoryScreen({ navigation, route }) {

    const ref = useRef()

    return (
        <>
            <Toolbar title="История игр" onMenu={() => { }} />
            <View style={[globalStyles.container, { justifyContent: 'flex-start', paddingTop: 20 }]} >
                <View style={{ paddingHorizontal: 20 }}>
                    <Searchbar ref={ref} onChangeText={() => { }} />
                </View>
                <View style={{ height: 16 }} />
                <ScrollView width="100%" style={{ paddingHorizontal: 20 }}>
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
                    <View style={{ height: 30 }} />
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