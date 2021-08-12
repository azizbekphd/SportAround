import React, { useRef, useState, createRef, useEffect, useCallback } from 'react';
import globalStyles from '../global/Styles';
import { View, StyleSheet, Image, Dimensions, StatusBar, BackHandler, Linking, Platform } from 'react-native';
import { useFocusEffect } from "@react-navigation/native";
import Toolbar from '../components/Toolbar';
import Searchbar from '../components/Searchbar';
import Button from '../components/Button';
import IconButton from '../components/IconButton';
import Maps from '../components/Maps';
import FloatingPanel from '../components/FloatingPanel';
import PlaygroundInfo from '../components/PlaygroundInfo';
import SvgUri from 'expo-svg-uri';

export default function PlaygroundDetailsScreen({ navigation }) {
    const [showInfo, setShowInfo] = useState(false)
    const [title, setTitle] = useState("")

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                if (showInfo) {
                    setShowInfo(false);
                    return true;
                } else {
                    return false;
                }
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [showInfo, setShowInfo])
    );

    useEffect(() => {
        if (showInfo) {
            setTitle("Информация о площадке")
        } else {
            setTitle("Площадка на карте")
        }
    }, [showInfo])

    return (
        <>
            <Toolbar back title={title} onMenu={() => { }} />
            {!showInfo && <><View style={styles.container}>
            </View>
                <View style={styles.buttonsContainer} width="100%">
                    <View style={{ ...styles.button, flex: 1, marginRight: 0 }}>
                        <Button title="Подробности" onPress={() => { setShowList(true); ref.current.blur(); }} />
                    </View>
                    <View style={styles.button}>
                        <IconButton onPress={() => {
                            let lat = 55.755833333333335;
                            let lng = 37.617777777777775;
                            const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
                            const latLng = `${lat},${lng}`;
                            const label = 'Открыть в картах';
                            const url = Platform.select({
                                ios: `${scheme}${label}@${latLng}`,
                                android: `${scheme}${latLng}(${label})`
                            });

                            Linking.openURL(url);
                        }}>
                            <SvgUri source={require('../assets/icons/map.svg')} />
                        </IconButton>
                    </View>
                </View>
            </>
            }
            <Maps />
            <PlaygroundInfo show={showInfo} data={{
                title: "Название площадки"
            }} hideCallback={setShowInfo} />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        zIndex: 1000,
    },
    searchbarContainer: {
        backgroundColor: "#0E0938",
        padding: 20
    },
    buttonsContainer: {
        zIndex: 1000,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: Dimensions.get("window").height - 74
    },
    button: {
        margin: 20
    },
})