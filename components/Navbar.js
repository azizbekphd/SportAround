import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import H3 from './H3';

export default function Navbar(props) {

    const navigation = useNavigation()

    return (
        <View width="100%" style={{
            height: 49,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            zIndex: 1000,
            backgroundColor: "#0A0729"
        }}>
            <TouchableOpacity>
                <Image source={require('../assets/icons/timer.png')} />
            </TouchableOpacity>
            <TouchableOpacity>
                <Image source={require('../assets/icons/date.png')} />
            </TouchableOpacity>
            <TouchableOpacity>
                <Image source={require('../assets/icons/add.png')} />
            </TouchableOpacity>
            <TouchableOpacity>
                <Image source={require('../assets/icons/favourite.png')} />
            </TouchableOpacity>
            <TouchableOpacity>
                <Image source={require('../assets/icons/profile.png')} />
            </TouchableOpacity>
        </View >
    )
}