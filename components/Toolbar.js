import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, SafeAreaView, Image, TouchableOpacity, StatusBar } from 'react-native';
import H3 from './H3';
import H6 from './H6'

export default function Toolbar(props) {

    const navigation = useNavigation()

    return (
        <SafeAreaView width="100%" style={{
            minHeight: 47 + StatusBar.currentHeight,
            position: 'relative',
            top: 0,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            padding: 7,
            zIndex: 2000,
            backgroundColor: props.backgroundColor ?? "#0E0938"
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
                            onPress={() => { props.onBack ? props.onBack() : navigation.pop() }}
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
                    {/*(props.onMenu) ?
                        <TouchableOpacity activeOpacity={0.5} onPress={props.onMenu}>
                            <Image source={require('../assets/icons/three_dots.png')} />
                        </TouchableOpacity> :
                        (props.onReady &&
                            <TouchableOpacity activeOpacity={0.5} onPress={props.onReady} style={{ position: 'absolute', width: 71 }}>
                                <H6 color="#29DEC8">{props.readyText ?? "Готово"}</H6>
                            </TouchableOpacity>)
                        */}
                </View>
            </View>
        </SafeAreaView >
    )
}