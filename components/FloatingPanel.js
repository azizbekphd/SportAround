import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Animated, TouchableHighlight, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import globalStyles from '../global/Styles';
import H3 from './H3';

export default function FloatingPanel(props) {
    const anim = useRef(new Animated.Value(Dimensions.get("screen").height)).current;

    return (
        <Animated.View
            style={{
                ...styles.container,
                top: anim
            }}
            onLayout={({ height }) => {
                if (props.show)
                    Animated.timing(anim, {
                        toValue: Dimensions.get("screen").height - height,
                        duration: 300
                    })
            }}
        >
            <TouchableHighlight width="100%">
                <View width="100%" style={globalStyles.row}>
                    <H3 color="#6D61E7">Смотреть на карте</H3>
                    <LinearGradient
                        colors={["#6566FD", "#6843CF"]}
                        style={{
                            ...globalStyles.center,
                            borderBottomLeftRadius: 10,
                            borderTopRightRadius: 10
                        }}
                    >
                        <Image source={require('../assets/icons/location.png')} />
                    </LinearGradient>
                </View>
            </TouchableHighlight>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: Dimensions.get("window").width - 40,
        margin: 20,
        backgroundColor: "#fff",
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 15,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    }
})