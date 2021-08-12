import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import SvgUri from 'expo-svg-uri';
import { StyleSheet } from 'react-native';

export default function SportIcon(props) {
    return (
        <LinearGradient
            colors={props.sport == "soccer" ? ["#6566FD", "#6843CF"] : ["#29DEC8", "#049DFF"]}
            style={styles.container}
        >
            <SvgUri source={props.sport == "soccer" ? require('../assets/icons/soccer_circle.svg') : require('../assets/icons/basketball_circle.svg')} />
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 28,
        height: 28,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 14
    }
})