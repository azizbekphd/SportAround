import React from 'react';
import globalStyles from '../global/Styles';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import Toolbar from '../components/Toolbar';
import H3 from '../components/H3';
import AnimatedTextInput from '../components/AnimatedTextInput';
import Button from '../components/Button';
import H2 from '../components/H2';
import { LinearGradient } from 'expo-linear-gradient';
import Navbar from '../components/Navbar';
import H1 from '../components/H1';
import Countdown from '../components/Countdown';

export default function LobbyScreen({ navigation }) {

    const openNextPage = (isSoccer) => {
        navigation.navigate('NewGame', { isSoccer: isSoccer })
    }

    return (
        <>
            <LinearGradient colors={["#1D0B36", "#4E1470", "#0B1460", "#1C0A32"]} style={{ position: 'absolute', ...StyleSheet.absoluteFill }} />
            <Toolbar title="Информация о лобби" backgroundColor="rgba(0,0,0,0)" onReady={() => { }} readyText="Выход" />
            <View style={{ padding: 20, flex: 1 }}>
                <H1>До игры:</H1>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 15 }}>
                    <View width="48%">
                        <Countdown value={0} label="ч." />
                    </View>
                    <View width="48%">
                        <Countdown value={0} label="мин." />
                    </View>
                </View>
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