import React, { useRef, useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Dimensions, Animated, TouchableHighlight, TouchableOpacity, Image, FlatList, ScrollView, StatusBar, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import globalStyles from '../global/Styles';
import H3 from './H3';
import H2 from './H2';
import H7 from './H7';
import H6 from './H6';
import { useNavigation } from '@react-navigation/native';
import SvgUri from 'expo-svg-uri';
import Button from './Button';
import PagerView from 'react-native-pager-view';
import Indicator from '../components/Indicator';
import Link from './Link';
import distance from '../global/distance';

export default function PlaygroundInfo(props) {
    const [index, setIndex] = useState(0);

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

    function scrollEvent ({nativeEvent}){
        let y = nativeEvent.contentOffset.y
        if (y < Dimensions.get("window").height/2 && y > StatusBar.currentHeight + 47) {
            props.hideCallback(false);
            ref.current.scrollTo({ y: 0, animated: true })
            props.setShowList && props.setShowList(true)
        } else if (y > 250) {
            ref.current.scrollTo({ y: Dimensions.get("screen").height - 47 - StatusBar.currentHeight, animated: true })
        }
    }

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
                onScrollEndDrag={Platform.OS == "ios" && scrollEvent}
                onMomentumScrollEnd={Platform.OS == "android" && scrollEvent}
            >
                <View width="100%" style={styles.content}>
                    {props.data.name &&
                    <View style={globalStyles.row}>
                        <H3 color="#000" style={{ fontWeight: '700', flex: 0.8 }}>
                            {props.data.name.charAt(0).toUpperCase() + props.data.name.slice(1)}
                        </H3>
                        <H6 color="#6D61E7">{distance(
                                props.data.latitude, props.coords.latitude,
                                props.data.longitude ?? props.data.longtitude, props.coords.longitude)}</H6>
                    </View>}
                    <View style={{ height: 1, backgroundColor: '#E5E5E5', marginVertical: 10 }} width="100%" />
                    <View style={styles.item}>
                        <View style={styles.itemIcon}>
                            <SvgUri source={require('../assets/icons/address.svg')} />
                        </View>
                        <H3 color="#000">{props.data.address}</H3>
                    </View>
                    <View style={{ height: 1, backgroundColor: '#E5E5E5', marginVertical: 5 }} width="100%" />
                    <View style={styles.item}>
                        <View style={styles.itemIcon}>
                            <SvgUri source={require('../assets/icons/phone.svg')} />
                        </View>
                        <H3 color="#000">+7 000 000 00 00</H3>
                    </View>
                    <View style={{ height: 1, backgroundColor: '#E5E5E5', marginVertical: 5 }} width="100%" />
                    {props.data.latitude && (props.data.longitude || props.data.longtitude) &&
                    <>
                        <View style={styles.item}>
                            <View style={styles.itemIcon}>
                                <SvgUri source={require('../assets/icons/target.svg')} />
                            </View>
                            <H3 color="#000">{`${props.data.latitude}, ${props.data.longitude ?? props.data.longtitude}`}</H3>
                        </View>
                        <View style={{ height: 1, backgroundColor: '#E5E5E5', marginVertical: 5 }} width="100%" />
                    </>
                    }
                    {props.data.hourWork ? <View style={styles.item}>
                        <View style={styles.itemIcon}>
                            <SvgUri source={require('../assets/icons/clock.svg')} />
                        </View>
                        <H3 color="#000">08:00 - 22:00</H3>
                    </View> : null}
                    <View style={{ height: 1, backgroundColor: '#E5E5E5', marginVertical: 5 }} width="100%" />
                    <View style={{ ...styles.item, height: 72, alignItems: 'flex-start', paddingTop: 5 }}>
                        <View style={{ ...styles.itemIcon, paddingTop: 5 }}>
                            <SvgUri source={require('../assets/icons/star_purple.svg')} />
                        </View>
                        <View>
                            <H3 color="#6D61E7">Бесплатно</H3>
                            <H3 color="#000">0 руб. / 1 ч.</H3>
                        </View>
                    </View>
                    <View style={{ height: 1, backgroundColor: '#E5E5E5', marginVertical: 5 }} width="100%" />
                    <Button title="Забронировать" onPress={() => {
                        navigation.pop()
                    }} />
                    {props.data.coverage ?
                    <View style={styles.item}>
                        <H3 color="#000">
                            Покрытие:{'\u00A0'}
                        </H3>
                        <H3 color="#656b82">
                            {props.data.coverage}
                        </H3>
                    </View> : null}
                    <View style={styles.item}>
                        <H3 color="#000">
                            Игра:{'\u00A0'}
                        </H3>
                        <H3 color="#656b82">
                            футбол
                        </H3>
                    </View>
                    {props.photos && <View width="100%" style={styles.slider}>
                        <View width="100%" style={styles.sliderTop}>
                            <Indicator count={props.photos.map((e,i)=>{return i})} index={index} />
                        </View>
                        <PagerView
                            width="100%"
                            height="100%"
                            initialPage={0}
                            onPageSelected={({ nativeEvent }) => { setIndex(nativeEvent.position) }}

                        >
                           {props.photos.map((e,i)=>{
                            return <View key={e.photo}>
                                <Image width="100%" height="100%" resizeMode="cover" source={uri(e.photo)} />
                            </View>})}
                        </PagerView>
                    </View>}
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
    },
    item: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        minHeight: 48
    },
    itemIcon: {
        marginRight: 8,
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    slider: {
        height: 250,
    },
    sliderTop: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: 'rgba(14, 9, 56, 0.5)',
        minHeight: 48,
        zIndex: 1501,
        paddingHorizontal: 20
    }
})
