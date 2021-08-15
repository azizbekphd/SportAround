import React, { useState } from 'react';
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

export default function OfferedGameDetailsScreen({ navigation }) {

    const [requested, setRequested] = useState(false)

    return (
        <>
            <LinearGradient colors={["#1D0B36", "#4E1470", "#0B1460", "#1C0A32"]} style={{ position: 'absolute', ...StyleSheet.absoluteFill }} />
            <Toolbar back title="Команда" backgroundColor="rgba(0,0,0,0)" onMenu={() => { }} />
            <ScrollView style={{ padding: 20, flex: 1 }}>
                <GameInfo date="21.04.2019" startTime="15:00" endTime="17:00" address="Жулебинский бульвар, 29 / 2" />
                <View style={{ height: 15 }} />
                <TeamInfo legend="Игроки:" teamSize="4 из 6" isFree={true} agreements={true} playersInfo={[
                    {
                        id: "1",
                        name: "Муминов Азизбек",
                        phone: "+7 123 456 78 90",
                        accepted: true
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
                        accepted: true
                    },
                    {
                        id: "4",
                        name: "Джеки Чан",
                        avatar: require('../assets/images/person.jpg'),
                        phone: "+7 456 987 12 30",
                        accepted: true
                    }
                ]} />
                <View style={{ height: 15 }} />
                <LinearGradient
                    colors={["rgba(38, 34, 84, 1)", "rgba(38, 34, 84, 0)"]}
                    style={styles.ball}
                >
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <H3>Мяч</H3>
                        <H3 style={{ fontWeight: "700" }}>Есть</H3>
                    </View>
                    <View style={{ height: 1, alignSelf: "stretch", backgroundColor: "#fff", marginVertical: 3 }} />
                </LinearGradient>
                <View style={{ height: 50 }} />
            </ScrollView>
            <View style={{ padding: 20 }}>
                <Button title={"Присоединиться к игре"} disabled={false} onPress={() => {
                    navigation.navigate("Payment")
                }} />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    sport: {
        height: 148,
        width: 160,
        borderRadius: 10
    },
    ball: {
        borderRadius: 10,
        height: 66,
        padding: 15,
        justifyContent: "flex-end",
        alignSelf: "stretch"
    }
})