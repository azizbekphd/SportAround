import React, { useContext, useEffect, useRef, useState } from 'react';
import globalStyles from '../global/Styles';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import Toolbar from '../components/Toolbar';
import H3 from '../components/H3';
import AnimatedTextInput from '../components/AnimatedTextInput';
import Button from '../components/Button';
import H2 from '../components/H2';
import { LinearGradient } from 'expo-linear-gradient';
import Navbar from '../components/Navbar';
import { useNavigation } from '@react-navigation/native';
import Searchbar from '../components/Searchbar';
import FriendsInfo from '../components/FriendsInfo';
import AuthContext from '../api/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dropdown from '../components/Dropdown';
import User from '../models/User';
import formatDate from '../global/formatDate';
import rawPhone from '../global/rawPhone';
import Loader from '../components/Loader';
import validate, { validateAll } from '../global/validate';

export default function EditAccountScreen({ route, navigation }) {
    const [userData, setUserData] = useState(new User(route.params.userData))
    const [dob, setDob] = useState(new Date())
    const [loading, setLoading] = useState(false)

    const { getUser, editAccount } = useContext(AuthContext)

    return (
        <>
            <Toolbar title="Редактировать" back />
            <Loader loading={loading} />
            <View style={[globalStyles.container, { justifyContent: 'flex-start' }]} >
                <ScrollView style={{ alignSelf: "stretch", flex: 1, paddingTop: 20, paddingHorizontal: 20 }}>
                    <AnimatedTextInput
                        placeholder="Имя"
                        onChangeText={(name) => {
                            setUserData({
                                ...userData,
                                name: name,
                            })
                        }}
                        defaultValue={userData.name ?? ""}
                    />
                    <AnimatedTextInput
                        placeholder="Фамилия"
                        onChangeText={(lastName) => {
                            setUserData({
                                ...userData,
                                lastName: lastName,
                            })
                        }}
                        defaultValue={userData.lastName ?? ""}
                    />
                    <AnimatedTextInput
                        placeholder="Имя пользователя"
                        onChangeText={(username) => {
                            setUserData({
                                ...userData,
                                username: username,
                            })
                        }}
                        defaultValue={userData.username ?? ""}
                        valid={userData.username && validate('username', userData.username)}
                    />
                    <AnimatedTextInput
                        placeholder="E-mail"
                        keyboardType="email-address"
                        onChangeText={(email) => {
                            setUserData({
                                ...userData,
                                email: email,
                            })
                        }}
                        defaultValue={userData.email ?? ""}
                        valid={userData.email && validate("email", userData.email)}
                    />
                    <AnimatedTextInput
                        placeholder="Телефон"
                        keyboardType="phone-pad"
                        tel
                        onChangeText={(phone) => {
                            setUserData({
                                ...userData,
                                phone: rawPhone(phone),
                            })
                        }}
                        defaultValue={userData.phone ?? ""}
                        valid={userData.phone && validate("phone", userData.phone)}
                    />
                    <AnimatedTextInput
                        placeholder="Дата рождения"
                        mode="date"
                        onChangeText={(date, dateString) => {
                            setUserData({
                                ...userData,
                                birth: dateString,
                            })
                            setDob(date)
                        }}
                        defaultValue={userData.birthday ? formatDate(userData.birthday) : ""}
                        valid={dob && validate("birthday", dob)}
                    />
                    <AnimatedTextInput
                        placeholder="Адрес"
                        onChangeText={(address) => {
                            setUserData({
                                ...userData,
                                address: address,
                            })
                        }}
                        defaultValue={userData.address ?? ""}
                    />
                    <Dropdown
                        placeholder="Пол"
                        data={[
                            { title: 'Мужской', id: 1 },
                            { title: 'Женский', id: 2 },
                        ]}
                        onChange={(id, title) => {
                            setUserData((prev) => {
                                return {
                                    ...prev,
                                    gender: id,
                                }
                            })
                        }}
                        initialValue={userData.gender && userData.gender == 1 ? "Мужской" : "Женский"}
                        initial={userData.gender ?? 0}
                        valid={userData.gender && validate("gender", userData.gender)}
                    />
                    <View style={{ height: 50 }} />
                </ScrollView>
                <View style={{ alignSelf: "stretch", padding: 20 }}>
                    <Button title="Сохранить изменения" onPress={() => {
                        setLoading(true)
                        editAccount(userData).then((_) => {
                            setLoading(false)
                            if (!_) {
                                navigation.navigate("Main", {
                                    screen: "PersonalAccount",
                                    params: {
                                        userData: userData
                                    }
                                })
                            }
                        })
                    }} disabled={
                        !validateAll(["username", "email", "phone", "birthday", "gender"], { ...userData, birthday: dob })
                    } />
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    sport: {
        height: 148,
        width: 160,
        borderRadius: 10
    }
})