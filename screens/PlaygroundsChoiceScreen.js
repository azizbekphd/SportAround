import React, { useRef, useState, createRef, useEffect, useCallback } from 'react';
import globalStyles from '../global/Styles';
import { View, StyleSheet, Image, Dimensions, StatusBar, BackHandler, Platform, AppState, ScrollView } from 'react-native';
import { useFocusEffect } from "@react-navigation/native";
import Toolbar from '../components/Toolbar';
import Searchbar from '../components/Searchbar';
import Button from '../components/Button';
import IconButton from '../components/IconButton';
import Maps from '../components/Maps';
import FloatingPanel from '../components/FloatingPanel';
import PlaygroundInfo from '../components/PlaygroundInfo';
import Loader from '../components/Loader';
import * as Location from 'expo-location';
import checkIfLocationEnabled from '../global/checkIfLocationEnabled';
import checkLocationPermission from '../global/checkLocationPermission';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

export default function PlaygroundChoiceScreen({ navigation, route }) {
    const [isLoading, setIsLoading] = useState(null)
    const [showList, setShowList] = useState(false)
    const [showInfo, setShowInfo] = useState(false)
    const [title, setTitle] = useState("")
    const [playgrounds, setPlaygrounds] = useState([])
    const [coords, setCoords] = useState(null)
    const [isNewGame, setIsNewGame] = useState(route.params.isNewGame)
    const [gameData, setGameData] = useState(route.params.gameData)
    const ref = useRef(null)
    const map = useRef(null)

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                if (showList) {
                    setShowList(false);
                    return true;
                } else if (showInfo) {
                    setShowInfo(false);
                    setShowList(true);
                    return true;
                } else {
                    return false;
                }
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [showList, setShowList])
    );

    useEffect(() => {
        if (showList) {
            setTitle("Список площадок")
        } else if (showInfo) {
            setTitle("Информация о площадке")
        } else {
            setTitle("Выберите площадку")
        }
    }, [showList, showInfo])

    function init() {
        checkIfLocationEnabled().then((enabled)=>{
            if (enabled){
                setIsLoading(true)
                checkLocationPermission().then((granted)=>{
                    if(granted){
                        Location.getCurrentPositionAsync({}).then((location)=>{
                            if(location.coords){
                                setCoords(location.coords)
                                map.animateCamera({
                                    center: {
                                        latitude: location.coords.latitude,
                                        longitude: location.coords.longitude,
                                    },
                                    pitch: 2,
                                    heading: 20,
                                    altitude: 200,
                                    zoom: 40,
                                }, 1000)
                                Location.reverseGeocodeAsync({
                                    latitude: location.coords.latitude,
                                    longitude: location.coords.longitude,
                                }).then((address)=>{
                                    setIsLoading(false)
                                    console.log(address)
                                })
                            }
                        }).catch((reason)=>{
                            console.log(reason)
                        })
                    } else {
                        navigation.pop()
                    }
                })
            } else {
                window.location.reload()
            }
        })
    }

    useEffect(() => {
        init();
    }, [])

    return (
        <>
            <Toolbar back title={title} onMenu={() => { }} />
            {!showInfo && <><View style={styles.container}>
                <View style={styles.searchbarContainer}>
                    <Searchbar ref={ref} onFocus={() => { setShowList(false) }} onChangeText={console.log} />
                </View>
            </View>
                <View style={styles.buttonsContainer} width="100%">
                    <View style={{ ...styles.button, flex: 1, marginRight: 0 }}>
                        <Button title="Список" onPress={() => { setShowList(true); ref.current.blur(); }} />
                    </View>
                    <View style={styles.button}>
                        <IconButton onPress={() => { navigation.push("AddPlayground") }}>
                            <Image source={require('../assets/icons/add_location.png')} />
                        </IconButton>
                    </View>
                </View>
            </>
            }
            <ScrollView style={{
                zIndex: 500,
                width: Dimensions.get("window").width,
                height: Dimensions.get("window").height,
                position: 'absolute',
                top: StatusBar.currentHeight,
            }}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={{
                        zIndex: 500,
                        width: Dimensions.get("window").width,
                        height: Dimensions.get("window").height,
                    }}
                    ref={map}
                ></MapView>
        </ScrollView>
            {showList && <View width="100%" height="100%" style={{ position: "absolute", zIndex: 750 }} />}
            <FloatingPanel
                show={showList}
                showInfo={setShowInfo}
                items={playgrounds}
                hideCallback={setShowList} />
            <PlaygroundInfo show={showInfo} data={{
                title: "Название площадки"
            }} hideCallback={setShowInfo} setShowList={setShowList} />
            <Loader
                loading={isLoading}
                cancellable={true}
                setIsLoading={(value)=>{
                    setIsLoading(value);
                    if(!value){
                        navigation.pop()
                    }
                }}
            /> 
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
        bottom: Platform.OS == "ios" ? 40 : 20,
    },
    button: {
        margin: 20
    },
})