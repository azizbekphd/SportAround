import React, { useRef, useState } from 'react';
import { TouchableOpacity, View, Text, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import H3 from './H3';

export default function ModeSwitch(props) {
    const ref = useRef(new Animated.Value(0)).current;
    return (
        <View style={{
            borderRadius: 18,
            height: 36,
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginBottom: 10,
            width: (Dimensions.get("window").width - 40)
        }}>
            <Animated.View width="50%" height="100%" style={[{
                position: 'absolute',
                borderRadius: 18,
                height: 36,
                left: ref
            },
            ]}>
                <LinearGradient height="100%" width="100%" style={{
                    borderRadius: 18
                }} colors={["#29DEC8", "#049DFF"]}>

                </LinearGradient>
            </Animated.View>
            <TouchableOpacity activeOpacity={0.5} width="50%" onPressIn={() => {
                Animated.timing(ref, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: false
                }).start()
                props.onChange(0)
            }}>
                <H3 width="100%" height="100%">Создать игру</H3>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} width="50%" onPressIn={() => {
                Animated.timing(ref, {
                    toValue: (Dimensions.get("window").width - 40) / 2,
                    duration: 300,
                    useNativeDriver: false
                }).start()
                props.onChange(1)
            }}>
                <H3>Найти игру</H3>
            </TouchableOpacity>
        </View>
    );
}