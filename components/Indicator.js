import React from 'react';
import globalStyles from '../global/Styles';
import { Text, View, StyleSheet, Image, TouchableOpacity, StatusBar } from 'react-native';

export default function Indicator(props) {

    return (
        <View style={[globalStyles.row, props.style, {
            width: (props.count.length - 1) * 18 + 8,
            height: 8
        }]}>
            {props.count.map((index) => {
                return <View style={styles.dots} key={index.toString()}></View>
            })}
            <View style={[styles.dots, { backgroundColor: "#fff", position: 'absolute', left: (props.index * 18) }]}></View>
        </View>)
}

const styles = StyleSheet.create({
    dots: {
        height: 8,
        width: 8,
        borderWidth: 2,
        borderColor: "#fff",
        borderRadius: 4,
    }
});