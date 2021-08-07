import React from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';
import H1 from './H1';
import H3 from './H3';

export default function Countdown(props) {

    const getNull = (number) => {
        return ((number < 10 ? "0" : "") + number.toString())
    }

    return (
        <View style={styles.container} width="100%">
            <H1 style={{ fontSize: 46 }}>{getNull(props.value)}</H1>
            <H3 style={{ fontWeight: "700" }}>{props.label}</H3>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderBottomColor: "#fff",
        borderBottomWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end"
    }
})