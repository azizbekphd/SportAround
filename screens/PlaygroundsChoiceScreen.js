import React, { useRef, useState, createRef, useEffect, useCallback } from 'react';
import globalStyles from '../global/Styles';
import { View, StyleSheet, Image, Dimensions, StatusBar, BackHandler } from 'react-native';
import { useFocusEffect } from "@react-navigation/native";
import Toolbar from '../components/Toolbar';
import Searchbar from '../components/Searchbar';
import Button from '../components/Button';
import IconButton from '../components/IconButton';
import Maps from '../components/Maps';
import FloatingPanel from '../components/FloatingPanel';
import PlaygroundInfo from '../components/PlaygroundInfo';

export default function PlaygroundChoiceScreen({ navigation }) {
    const [showList, setShowList] = useState(false)
    const [showInfo, setShowInfo] = useState(false)
    const [title, setTitle] = useState("")
    const ref = createRef()

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
            <Maps />
            <FloatingPanel
                show={showList}
                showInfo={setShowInfo}
                items={[
                    {
                        key: "1",
                        title: "Название",
                        subtitle: "Москва, Привольная улица, 64\nМосква, Россия",
                        distance: "200 м"
                    },
                    {
                        key: "2",
                        title: "Название",
                        subtitle: "Москва, Привольная улица, 64\nМосква, Россия",
                        distance: "500 м"
                    },
                    {
                        key: "3",
                        title: "Название",
                        subtitle: "Москва, Привольная улица, 64\nМосква, Россия",
                        distance: "1 км"
                    },
                    {
                        key: "4",
                        title: "Название",
                        subtitle: "Москва, Привольная улица, 64\nМосква, Россия",
                        distance: "1.5 км"
                    },
                    {
                        key: "5",
                        title: "Название",
                        subtitle: "Москва, Привольная улица, 64\nМосква, Россия",
                        distance: "2.4 км"
                    },
                    {
                        key: "6",
                        title: "Название",
                        subtitle: "Москва, Привольная улица, 64\nМосква, Россия",
                        distance: "2.4 км"
                    }]}
                hideCallback={setShowList} />
            <PlaygroundInfo show={showInfo} data={{
                title: "Название площадки"
            }} hideCallback={setShowInfo} setShowList={setShowList} />
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