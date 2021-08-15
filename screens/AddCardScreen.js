import React, { useState, useEffect } from 'react';
import Toolbar from '../components/Toolbar';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import H3 from '../components/H3';
import SvgUri from 'expo-svg-uri';
import Checkbox from '../components/Checkbox';
import AnimatedTextInput from '../components/AnimatedTextInput';

export default function AddCardScreen({ navigation, route }) {
    const [card, setCard] = useState(route.params?.card ?? {
        number: "",
        rawNumber: "",
        type: "",
        cvv: "",
        expiryDate: ""
    })

    const cardTypes = {
        "3": "American Express",
        "4": "Visa",
        "5": "MasterCard"
    }

    useEffect(() => {
        setCard((prev) => {
            return {
                ...prev,
                type: cardTypes[card.number.substr(0, 1)] ?? "Карта"
            }
        })
    }, [card.number])

    return (
        <>
            <Toolbar back title="Карта" onMenu={() => { }} />
            <View style={styles.container}>
                <AnimatedTextInput
                    light
                    placeholder={card.number ? (
                        card.type
                    ) : "Номер карты"}
                    mask="9999 9999 9999 9999"
                    onChangeText={(text, rawText) => {
                        setCard(prev => {
                            return {
                                ...prev,
                                number: text,
                                rawNumber: rawText
                            }
                        })
                    }}
                    valid={card.number.length === 19}
                    keyboardType="number-pad"
                    defaultValue={card.number}
                />
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignSelf: "stretch"
                }}>
                    <View width="49%">
                        <AnimatedTextInput
                            light
                            placeholder="Срок действия"
                            onChangeText={(text) => {
                                setCard((prev) => {
                                    return {
                                        ...prev,
                                        expiryDate: text
                                    }
                                })
                            }}
                            mask="99/99"
                            keyboardType="number-pad"
                            valid={card.expiryDate.length === 5}
                            defaultValue={card.expiryDate}
                        />
                    </View>
                    <View width="49%">
                        <AnimatedTextInput
                            light
                            placeholder="CVV"
                            onChangeText={(text) => {
                                setCard((prev) => {
                                    return {
                                        ...prev,
                                        cvv: text
                                    }
                                })
                            }}
                            mask="999"
                            keyboardType="number-pad"
                            valid={card.cvv.length === 3}
                            defaultValue={card.cvv}
                        />
                    </View>
                </View>
                <Button
                    title="Привязать карту"
                    disabled={!(card.number)}
                    onPress={() => {
                        navigation.navigate({
                            name: "Payment",
                            params: {
                                card: card
                            },
                            merge: true
                        })
                    }}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "stretch",
        padding: 20,
        flex: 1
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        height: 54,
    }
})