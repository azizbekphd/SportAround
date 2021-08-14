import React, { useEffect, useRef, useState } from 'react';
import globalStyles from '../global/Styles';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import Toolbar from '../components/Toolbar';
import H3 from '../components/H3';
import AnimatedTextInput from '../components/AnimatedTextInput';
import Button from '../components/Button';
import H2 from '../components/H2';
import { LinearGradient } from 'expo-linear-gradient';
import Navbar from '../components/Navbar';
import { useNavigation, useRoute } from '@react-navigation/native';
import Searchbar from '../components/Searchbar';
import FriendsInfo from '../components/FriendsInfo';
import SvgUri from 'expo-svg-uri';

export default function PersonalAccountScreen({ navigation, route }) {

    const [userData, setUserData] = useState({
        name: "Алексей",
        surname: "Кузнецов",
        email: "alex.kuznecov@gmail.com",
        phone: "+7 (906) 668 88 00",
        birth: "12.08.1992",
        address: "улица Генерала Кузнецова, 24 / 1",
        city: "Москва"
    })

    useEffect(() => {
        console.log("Hello")
        setUserData(route.params?.userData ?? {
            name: "Алексей",
            surname: "Кузнецов",
            email: "alex.kuznecov@gmail.com",
            phone: "+7 (906) 668 88 00",
            birth: "12.08.1992",
            address: "улица Генерала Кузнецова, 24 / 1",
            city: "Москва"
        })
    }, [route.params?.userData])

    return (
        <>
            <Toolbar title="Личный кабинет" onReady={() => { }} readyText="Выход" />
            <View style={[globalStyles.container, { justifyContent: 'flex-start', paddingHorizontal: 20, paddingTop: 20 }]} >
                <ScrollView width="100%">
                    <LinearGradient
                        colors={["rgba(38, 34, 84, 1)", "rgba(38, 34, 84, 0)"]}
                        style={styles.general}
                    >
                        <Image
                            source={require('../assets/images/person.jpg')}
                            style={styles.avatar}
                        />
                        <View style={styles.generalInfo}>
                            <H2 style={{ fontSize: 20 }}>{`${userData.name} ${userData.surname}`}</H2>
                            <H3>id: ivan_ivanov92</H3>
                        </View>
                    </LinearGradient>
                    <View style={{ height: 16 }} />
                    <LinearGradient
                        colors={["rgba(38, 34, 84, 1)", "rgba(38, 34, 84, 0)"]}
                        style={styles.additional}
                    >
                        <TouchableOpacity
                            style={styles.cornerButton}
                            onPress={() => {
                                navigation.navigate("EditAccount", {
                                    userData: userData,
                                })
                            }}
                        >
                            <LinearGradient
                                colors={["#6566FD", "#6843CF"]}
                                style={styles.cornerButton}
                            >
                                <SvgUri source={require('../assets/icons/pencil-edit.svg')} />
                            </LinearGradient>
                        </TouchableOpacity>
                        <H3 style={{ fontWeight: "700", marginVertical: 5 }}>
                            Личная информация
                        </H3>
                        <H3 style={{ marginVertical: 7 }}>
                            {userData.email}
                        </H3>
                        <H3 style={{ marginVertical: 7 }}>
                            {userData.phone}
                        </H3>
                        <H3 style={{ marginVertical: 7 }}>
                            {userData.birth}
                        </H3>
                        <View style={{ marginVertical: 15, height: 1, alignSelf: "stretch", backgroundColor: "#fff" }} />
                        <H3 style={{ marginVertical: 7 }}>
                            {userData.address + '\n' + userData.city}
                        </H3>
                    </LinearGradient>
                    <LinearGradient
                        colors={["rgba(38, 34, 84, 1)", "rgba(38, 34, 84, 0)"]}
                        style={styles.additional}
                    >
                        <LinearGradient
                            colors={["#29DEC8", "#049DFF"]}
                            style={styles.cornerButton}
                        >
                            <SvgUri source={require('../assets/icons/bell.svg')} />
                        </LinearGradient>
                        <H3 style={{ fontWeight: "700", marginVertical: 5 }}>
                            У вас есть одно новое уведомление:
                        </H3>
                        <H3 style={{ marginVertical: 7 }}>
                            id max_1976 пригласил вас в игру: 15.06.2019 в 17:00
                        </H3>
                    </LinearGradient>
                </ScrollView>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    general: {
        height: 108,
        borderRadius: 10,
        flexDirection: "row"
    },
    avatar: {
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    generalInfo: {
        alignSelf: "stretch",
        justifyContent: "space-evenly",
        marginLeft: 20
    },
    additional: {
        padding: 16,
        paddingRight: 65,
        borderRadius: 10
    },
    cornerButton: {
        position: "absolute",
        borderBottomLeftRadius: 10,
        borderTopRightRadius: 10,
        height: 54,
        width: 54,
        top: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center"
    }
})