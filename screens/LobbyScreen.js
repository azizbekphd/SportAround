import React from 'react';
import globalStyles from '../global/Styles';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import Toolbar from '../components/Toolbar';
import H3 from '../components/H3';
import AnimatedTextInput from '../components/AnimatedTextInput';
import Button from '../components/Button';
import H2 from '../components/H2';
import { LinearGradient } from 'expo-linear-gradient';
import Navbar from '../components/Navbar';
import H1 from '../components/H1';
import Countdown from '../components/Countdown';
import GameInfo from '../components/GameInfo';
import TeamInfo from '../components/TeamInfo';

export default function LobbyScreen({ navigation, route }) {

    const openNextPage = (isSoccer) => {
        navigation.navigate('NewGame', { isSoccer: isSoccer })
    }

    return (
        <>
            <LinearGradient colors={["#1D0B36", "#4E1470", "#0B1460", "#1C0A32"]} style={{ position: 'absolute', ...StyleSheet.absoluteFill }} />
            <Toolbar title="Информация о лобби" backgroundColor="rgba(0,0,0,0)" onReady={() => { }} readyText="Выход" />
            <ScrollView style={{ padding: 20, flex: 1 }}>
                <H1>До игры:</H1>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 20 }}>
                    <View width="48%">
                        <Countdown value={0} label="ч." />
                    </View>
                    <View width="48%">
                        <Countdown value={0} label="мин." />
                    </View>
                </View>
                <GameInfo date="21.04.2019" startTime="15:00" endTime="17:00" address="Жулебинский бульвар, 29 / 2" />
                <View style={{ height: 15 }} />
                <TeamInfo teamSize="3x3" isFree={false} playersInfo={[
                    {
                        id: "1",
                        name: "Муминов Азизбек",
                        phone: "+7 123 456 78 90",
                        card: true
                    },
                    {
                        id: "2",
                        name: "Джонни Депп",
                        avatar: require('../assets/images/person.jpg'),
                        phone: "+7 987 654 32 10"
                    },
                    {
                        id: "3",
                        name: "Николас Кейдж",
                        phone: "+7 456 987 12 30",
                        card: true
                    },
                    {
                        id: "4",
                        name: "Джеки Чан",
                        avatar: require('../assets/images/person.jpg'),
                        phone: "+7 456 987 12 30",
                        card: true
                    },
                    {
                        id: "5",
                        name: "Александр Пушкин",
                        avatar: require('../assets/images/person.jpg'),
                        phone: "+7 456 987 12 30"
                    },
                    {
                        id: "6",
                        name: "Волан де Морт",
                        phone: "+7 357 546 89 51"
                    },
                ]} />
                <View style={{ height: 50 }} />
            </ScrollView>
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