import React, { useEffect, useState, useContext } from 'react';
import globalStyles from '../global/Styles';
import { View, StyleSheet, TouchableOpacity, Image, ScrollView, Platform } from 'react-native';
import Toolbar from '../components/Toolbar';
import H3 from '../components/H3';
import H2 from '../components/H2';
import { LinearGradient } from 'expo-linear-gradient';
import SvgUri from 'expo-svg-uri';
import Alert from '../components/Alert';
import AuthContext from '../contexts/AuthContext';
import User from '../models/User'
import formatDate from '../global/formatDate';
import H1 from '../components/H1';
import decodeDate from '../global/decodeDate';

export default function PersonalAccountScreen({ navigation, route }) {

    const [userData, setUserData] = useState(new User({}))
    const [showModal, setShowModal] = useState(false)

    const { signOut, getUser } = useContext(AuthContext)

    useEffect(() => {
        setUserData(getUser())
    }, [])

    useEffect(() => {
        setUserData(route.params?.userData ??
            getUser()
        )
    }, [route.params?.userData])

    return (
        <>
            <Toolbar title="Личный кабинет" onReady={() => { signOut() }} readyText="Выход" />
            <View style={[globalStyles.container, { justifyContent: 'flex-start', paddingHorizontal: 20, paddingTop: 20 }]} >
                <ScrollView width="100%">
                    <LinearGradient
                        colors={["rgba(38, 34, 84, 1)", "rgba(38, 34, 84, 0)"]}
                        style={styles.general}
                    >
                        <View style={styles.avatar}>
                            <H1>{userData.username && userData.username.charAt(0)}</H1>
                        </View>
                        <View style={styles.generalInfo}>
                            <H2 style={{ fontSize: 20 }}>{`${userData.username ?? ""}`}</H2>
                            <H3>{userData.id && `id: #${userData.id}`}</H3>
                        </View>
                    </LinearGradient>
                    <View style={{ height: 16 }} />
                    <LinearGradient
                        colors={["rgba(38, 34, 84, 1)", "rgba(38, 34, 84, 0)"]}
                        style={styles.additional}
                    >
                        <View style={styles.cornerButton}>
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
                        </View>
                        <H3 style={{ fontWeight: "700", marginVertical: 5 }}>
                            Личная информация
                        </H3>
                        {
                            userData.name ?
                                <H3 style={{ marginVertical: 7 }}>
                                    {`${userData.name} ${userData.lastName ?? ""}`}
                                </H3>
                                : null
                        }
                        {userData.email ? <H3 style={{ marginVertical: 7 }}>
                            {userData.email}
                        </H3> : null}
                        {userData.phone ? <H3 style={{ marginVertical: 7 }}>
                            {userData.phone}
                        </H3> : null}
                        {userData.birthday ? <H3 style={{ marginVertical: 7 }}>
                            {formatDate(userData.birthday.includes(".") ?
                                decodeDate(userData.birthday) :
                                userData.birthday
                            )}
                        </H3> : null}
                        {userData.address ?
                            <>
                                <View style={{ marginVertical: 15, height: 1, alignSelf: "stretch", backgroundColor: "#fff" }} />
                                <H3 style={{ marginVertical: 7 }}>
                                    {userData.address}
                                </H3>
                            </> : null}
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
                            У вас 2 новых уведомления:
                        </H3>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("OfferedGameDetails", {})
                            }}
                            activeOpacity={0.5}
                        >
                            <H3 style={{ marginVertical: 15 }}>
                                id max_1976 пригласил вас в игру: 15.06.2019 в 17:00
                            </H3>
                        </TouchableOpacity>
                        <View style={{ height: 1, alignSelf: "stretch", backgroundColor: "#fff" }} />
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("OfferedGameDetails", {})
                            }}
                            activeOpacity={0.5}
                        >
                            <H3 style={{ marginVertical: 15 }}>
                                id max_1976 пригласил вас в игру: 15.06.2019 в 17:00
                            </H3>
                        </TouchableOpacity>
                    </LinearGradient>
                </ScrollView>
            </View>
            <Alert
                show={showModal}
                buttonText="Хорошо"
                buttonCallback={setShowModal}
            />
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
        borderBottomLeftRadius: 10,
        width: 108,
        height: 108,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#5E5E5E"
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
        borderRadius: Platform.OS == "ios" ? 10 : 0,
        borderTopLeftRadius: 0,
        borderBottomStartRadius: 10,
        borderTopEndRadius: 10,
        borderBottomLeftRadius: 10,
        borderTopRightRadius: 10,
        height: 54,
        width: 54,
        top: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    }
})