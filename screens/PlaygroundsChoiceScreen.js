import React, { useRef, useState, createRef } from 'react';
import globalStyles from '../global/Styles';
import { View, StyleSheet, Image, Dimensions, StatusBar } from 'react-native';
import Toolbar from '../components/Toolbar';
import Searchbar from '../components/Searchbar';
import Button from '../components/Button';
import IconButton from '../components/IconButton';
import Maps from '../components/Maps';
import FloatingPanel from '../components/FloatingPanel';

export default function PlaygroundChoiceScreen(props) {
    const [showList, setShowList] = useState(false)
    const ref = createRef()

    return (
        <>
            <Toolbar title="Выберите площадку" menu />
            <View style={styles.container}>
                <View style={styles.searchbarContainer}>
                    <Searchbar ref={ref} />
                </View>
                <View style={styles.buttonsContainer} width="100%">
                    <View style={{ ...styles.button, flex: 1, marginRight: 0 }}>
                        <Button title="Список" onPress={() => { ref.current.blur(); setShowList(true) }} />
                    </View>
                    <View style={styles.button}>
                        <IconButton>
                            <Image source={require('../assets/icons/add_location.png')} />
                        </IconButton>
                    </View>
                </View>
            </View>
            <Maps />
            <FloatingPanel show={showList} items={[
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
                }]} hideCallback={setShowList} />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        zIndex: 1000,
        flex: 1,
        justifyContent: 'space-between'
    },
    searchbarContainer: {
        backgroundColor: "#0E0938",
        padding: 20
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    button: {
        margin: 20
    },
})