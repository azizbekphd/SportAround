import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import H3 from './H3';

export default function Toolbar(props) {

    const navigation = useNavigation()

    return (
        <View width="100%" style={{
            height: 47 + StatusBar.currentHeight,
            position: 'relative',
            top: 0,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            padding: 7,
            zIndex: 1000,
            backgroundColor: "#0E0938"
        }}>
            <View width="100%" style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <View
                    style={{
                        height: 40,
                        width: 40,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    {(props.back === true) &&
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => { navigation.pop() }}
                            style={{
                                height: 40,
                                width: 40,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Image source={require("../assets/icons/arrow_back.png")} />
                        </TouchableOpacity>
                    }
                </View>
                <View>
                    {(props.title != "") &&
                        <H3>{props.title}</H3>
                    }
                </View>
                <View style={{
                    height: 40,
                    width: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    {(props.menu) &&
                        <Image source={require('../assets/icons/three_dots.png')} />
                    }
                </View>
            </View>
        </View >
    )
}