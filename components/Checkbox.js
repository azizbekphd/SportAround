import SvgUri from 'expo-svg-uri';
import React from 'react';
import { View, ImageBackground } from 'react-native';

export default function Checkbox(props) {
    return (
        <View
            style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: "#C4C4C4"
            }}
        >
            {props.checked &&
                <SvgUri source={require('../assets/icons/checkbox.svg')} />
            }
        </View>
    )
}