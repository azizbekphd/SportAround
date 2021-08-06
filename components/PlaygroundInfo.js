import React, { useRef, useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Dimensions, Animated, TouchableHighlight, TouchableOpacity, Image, FlatList, ScrollView, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import globalStyles from '../global/Styles';
import H3 from './H3';
import H2 from './H2';
import H7 from './H7';
import H6 from './H6';
import { useNavigation } from '@react-navigation/native';

export default function PlaygroundInfo(props) {
    const screenHeight = Dimensions.get("screen").height;
    const anim = useRef(new Animated.Value(screenHeight)).current;
    const ref = useRef();

    const handleHideCallback = useCallback(event => {
        props.hideCallback(false)
    }, [props.hideCallback])

    const handleListHideCallback = useCallback(event => {
        props.listHideCallback(false)
    }, [props.listHideCallback])

    const navigation = useNavigation()

    useEffect(() => {
        if (props.show) {
            Animated.timing(anim, {
                toValue: StatusBar.currentHeight + 47,
                duration: 400,
                useNativeDriver: false
            }).start()
            ref.current.scrollTo({ y: 250, animated: true })
        } else
            Animated.timing(anim, {
                toValue: screenHeight,
                duration: 400,
                useNativeDriver: false
            }).start()
    }, [props.show])

    return (
        <Animated.View
            width="100%"
            style={{
                ...styles.container,
                transform: [{ translateY: anim }]
            }}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                ref={ref}
                onMomentumScrollEnd={({ nativeEvent }) => {
                    if (nativeEvent.contentOffset.y < 250) {
                        props.hideCallback(false);
                        ref.current.scrollTo({ y: 0, animated: true })
                        props.setShowList(true)
                    }
                }}
            >
                <View width="100%" style={styles.content}>
                    <H3 color="#000" style={{ fontWeight: '600' }}>{props.data.title}</H3>
                </View>
            </ScrollView>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        height: Dimensions.get("window").height,
        zIndex: 1500
    },
    content: {
        backgroundColor: "#fff",
        marginTop: Dimensions.get("window").height,
        minHeight: Dimensions.get("screen").height - 47 - StatusBar.currentHeight,
        padding: 20
    }
})