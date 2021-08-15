import React, { useEffect, useState } from 'react';
import Toolbar from '../components/Toolbar';
import { View, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import H3 from '../components/H3';
import SvgUri from 'expo-svg-uri';
import Checkbox from '../components/Checkbox';

export default function PaymentScreen({ navigation, route }) {
    const [isChash, setIsCash] = useState(false)
    const [card, setCard] = useState(null)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        if (route.params?.card) {
            setCard(route.params?.card)
            setIsCash(false)
        }
    }, [route.params?.card])

    return (
        <>
            <Toolbar back title="Способ оплаты" onMenu={() => { }} />
            <View style={styles.container}>
                <View>
                    {card &&
                        <>
                            <TouchableOpacity style={styles.item} activeOpacity={0.5} onPress={() => {
                                setIsCash(false)
                            }}>
                                <H3 color="#000">{card.type}  ••••{card.number.substr(-4, 4)}</H3>
                                <Checkbox checked={!isChash} />
                            </TouchableOpacity>
                            <View style={{ height: 1, alignSelf: "stretch", backgroundColor: "#ccc" }} />
                        </>
                    }
                    <TouchableOpacity style={styles.item} activeOpacity={0.5} onPress={() => {
                        navigation.navigate("AddCard", {
                            card: card
                        })
                    }}>
                        <H3 color="#000">{card ? "Карта" : "Привязать карту"}</H3>
                        <Image source={require('../assets/icons/arrow_r_purple.png')} />
                    </TouchableOpacity>
                    <View style={{ height: 1, alignSelf: "stretch", backgroundColor: "#ccc" }} />
                    <TouchableOpacity style={styles.item} activeOpacity={0.5} onPress={() => {
                        setIsCash(card ? true : !isChash)
                    }}>
                        <H3 color="#000">Наличные при встрече</H3>
                        <Checkbox checked={isChash} />
                    </TouchableOpacity>
                    <View style={{ height: 1, alignSelf: "stretch", backgroundColor: "#ccc" }} />
                </View>
                <Button
                    title="Оплатить"
                    disabled={!(isChash || card)}
                    onPress={() => { setShowModal(true) }}
                />
                <Modal
                    visible={showModal}
                    onRequestClose={() => {
                        setShowModal(false)
                    }}
                    animationType="fade"
                    style={{
                        backgroundColor: "#0E0938"
                    }}
                >

                </Modal>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "space-between",
        padding: 20,
        flex: 1
    },
    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 54,
    }
})