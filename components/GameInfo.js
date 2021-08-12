import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import H3 from './H3';
import { useNavigation } from '@react-navigation/native';

export default function GameInfo({
    date,
    startTime,
    endTime,
    address
}) {

    const navigation = useNavigation()

    return (
        <View width="100%" style={styles.container}>
            <View style={styles.item}>
                <H3 color="#000">Дата</H3>
                <H3 color="#000" style={{ fontWeight: "700" }}>{date ?? ""}</H3>
            </View>
            <View style={styles.separator} width="100%"></View>
            <View style={styles.item}>
                <H3 color="#000">Время</H3>
                <H3 color="#000" style={{ fontWeight: "700" }}>{(startTime && endTime) && `с ${startTime} до ${endTime}`}</H3>
            </View>
            <View style={styles.separator} width="100%"></View>
            <View style={styles.item}>
                <H3 color="#000">Адрес площадки</H3>
                <H3 color="#000" style={{ fontWeight: "700" }}>{address ?? ""}</H3>
            </View>
            <View style={{ height: 40 }} width="100%"></View>
            <TouchableOpacity activeOpacity={0.5} style={styles.button} onPress={() => {
                navigation.navigate("PlaygroundDetails")
            }}>
                <LinearGradient width="100%" height="100%" style={styles.button} colors={["#29DEC8", "#049DFF"]}>
                    <H3>На карте</H3>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 15
    },
    item: {
        height: 44,
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        flexWrap: "wrap"
    },
    separator: {
        height: 1,
        backgroundColor: '#E5E5E5'
    },
    button: {
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "flex-start",
        width: 160
    }
})