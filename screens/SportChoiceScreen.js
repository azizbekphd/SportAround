import React, { useEffect, useContext, useState } from 'react';
import globalStyles from '../global/Styles';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image, Dimensions, ActivityIndicator } from 'react-native';
import Toolbar from '../components/Toolbar';
import H3 from '../components/H3';
import AnimatedTextInput from '../components/AnimatedTextInput';
import Button from '../components/Button';
import H2 from '../components/H2';
import { LinearGradient } from 'expo-linear-gradient';
import Navbar from '../components/Navbar';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../contexts/AuthContext';

export default function SportChoiceScreen({ navigation, route }) {

    const { getToken } = useContext(AuthContext)
    const [types, setTypes] = useState()

    const openNextPage = ({ typeId, countPlays, status }) => {
        navigation.navigate('NewGame', {
            typeId: typeId,
            countPlays: countPlays,
            status: status,
        })
    }

    useEffect(() => {
        fetch(api + 'playground/type', {
            method: "GET",
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        }).then((response) => {
            response.json().then((typeList) => {
                setTypes(typeList)
            }).catch((reason) => {
                console.log(reason)
            })
        }).catch((reason) => {
            console.log(reason)
        })
    }, [])

    return (
        <>
            <Toolbar title="Новая игра" />
            <View style={[globalStyles.container, { justifyContent: 'flex-start', padding: 20, }]} >
                <View style={{ justifyContent: 'space-evenly', height: 100 }}>
                    <H2>Во что хотите сыграть?</H2>
                    <H3>Выберите вид спорта, чтобы создать или найти игру рядом с вами</H3>
                </View>
                <View style={{
                    justifyContent: 'space-around',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    flex: 1,
                }}>
                    {types ? types.map((type, index) => {
                        return <TouchableOpacity key={type.id} style={[styles.sport, { margin: 10 }]} onPress={() => {
                            openNextPage({
                                typeId: type.id,
                                countPlays: type.countPlays
                            })
                        }}>
                            <LinearGradient style={[styles.sport, { padding: 16, justifyContent: 'space-between' }]} colors={index % 2 == 0 ? ["#6566FD", "#6843CF"] : ["#29DEC8", "#049DFF"]}>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Image source={
                                        type.name.toLowerCase() == "баскетбол" ?
                                            require('../assets/icons/basketball.png')
                                            : type.name.toLowerCase() == "футбол" ?
                                                require('../assets/icons/soccer.png')
                                                : null} />
                                </View>
                                <View style={{ alignItems: 'flex-start' }}>
                                    <H3>{type.name}</H3>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    }) : <View style={{ alignSelf: "stretch", flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <ActivityIndicator />
                    </View>}
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    sport: {
        height: 148,
        width: (Dimensions.get("window").width - 80) / 2,
        borderRadius: 10,
        overflow: "hidden",
    }
})