import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import SvgUri from 'expo-svg-uri';
import H3 from './H3';

export default function Navbar(props) {

    const navigation = useNavigation()
    const navbarData = [
        {
            icon: require('../assets/icons/timer.svg'),
            index: 0,
            id: "0"
        },
        {
            icon: require('../assets/icons/date.svg'),
            index: 1,
            id: "1"
        },
        {
            icon: require('../assets/icons/add.svg'),
            index: 2,
            id: "2"
        },
        {
            icon: require('../assets/icons/favourite.svg'),
            index: 3,
            id: "3"
        },
        {
            icon: require('../assets/icons/profile.svg'),
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
                        props.setPageIndex(index)
                    }}
                    activeOpacity={0.5}
                >
                    <SvgUri source={item.icon} fill={props.pageIndex != index ? "#656B82" : "#fff"} />
                </TouchableOpacity>
            })}
        </View >
    )
}