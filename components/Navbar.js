import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import H3 from './H3';

export default function Navbar(props) {

    const navigation = useNavigation()
    const navbarData = [
        {
            icon: require('../assets/icons/timer.png'),
            index: 0,
            id: "0"
        },
        {
            icon: require('../assets/icons/date.png'),
            index: 1,
            id: "1"
        },
        {
            icon: require('../assets/icons/add.png'),
            index: 2,
            id: "2"
        },
        {
            icon: require('../assets/icons/favourite.png'),
            index: 3,
            id: "3"
        },
        {
            icon: require('../assets/icons/profile.png'),
            index: 4,
            id: "4"
        },
    ]

    return (
        <View width="100%" style={{
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            zIndex: 1000,
            backgroundColor: "#0A0729"
        }}>
            {navbarData.map((item, index) => {
                return <TouchableOpacity
                    key={item.id}
                    onPress={() => {
                        props.setPageIndex(item.index)
                    }}
                    style={{
                        opacity: (props.pageIndex == item.index) ? 1 : 0.7
                    }}
                >
                    <Image source={item.icon} />
                </TouchableOpacity>
            })}
        </View >
    )
}