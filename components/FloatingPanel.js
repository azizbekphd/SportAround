import React, { useRef, useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Dimensions, Animated, TouchableHighlight, TouchableOpacity, Image, FlatList, ScrollView, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import globalStyles from '../global/Styles';
import H3 from './H3';
import H2 from './H2';
import H7 from './H7';
import H6 from './H6';
import { useNavigation } from '@react-navigation/native';

export default function FloatingPanel(props) {
    const screenHeight = Dimensions.get("screen").height;
    const anim = useRef(new Animated.Value(screenHeight)).current;

    const handleHideCallback = useCallback(event => {
        props.hideCallback(false)
    }, [props.hideCallback])

    const navigation = useNavigation()

    useEffect(() => {
        if (props.show)
            Animated.timing(anim, {
                toValue: screenHeight - (54 + (props.items.length) * 83),
                duration: 400,
                useNativeDriver: false
            }).start()
        else
            Animated.timing(anim, {
                toValue: screenHeight,
                duration: 400,
                useNativeDriver: false
            }).start()
    }, [props.show])

    return (
        <Animated.View
            style={{
                ...styles.container,
                transform: [{ translateY: anim }]
            }}
        >
            <TouchableOpacity activeOpacity={0.5} width="100%" onPress={handleHideCallback}>
                <View width="100%" style={{ ...globalStyles.row, height: 54, paddingLeft: 15 }}>
                    <H3 color="#6D61E7">Смотреть на карте</H3>
                    <LinearGradient
                        colors={["#6566FD", "#6843CF"]}
                        style={{
                            ...globalStyles.center,
                            borderBottomLeftRadius: 10,
                            borderTopRightRadius: 10,
                            width: 54,
                            height: 54
                        }}
                    >
                        <Image source={require('../assets/icons/location.png')} />
                    </LinearGradient>
                </View>
            </TouchableOpacity>
            <FlatList
                data={props.items}
                renderItem={({ item }) => {
                    return <TouchableOpacity
                        style={styles.listItem}
                        activeOpacity={0.5}
                        onPress={() => {
                            props.hideCallback(false);
                            props.showInfo(true);
                        }}
                    >
                        <H2 color="#000">
                            {item.title}
                        </H2>
                        <View style={{ ...globalStyles.row, alignItems: 'flex-end' }}>
                            <View style={{
                                flex: 1,
                                justifyContent: 'space-evenly',
                            }}>
                                <H7 color="#000">{item.subtitle}</H7>
                            </View>
                            <H6 color="#6565FC">{item.distance}</H6>
                        </View>
                    </TouchableOpacity>
                }}
                ItemSeparatorComponent={() => { return <View style={styles.separator} width="100%"></View> }}
                style={{ maxHeight: 82 * 5 + 4, height: (54 + props.items.length * 83) - StatusBar.currentHeight }}
            />
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
        shadowRadius: 15,
        elevation: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        zIndex: 1500
    },
    listItem: {
        height: 83,
        paddingHorizontal: 10,
        marginHorizontal: 5,
        justifyContent: 'space-evenly'
    },
    separator: {
        height: 1,
        backgroundColor: '#E5E5E5'
    }
})