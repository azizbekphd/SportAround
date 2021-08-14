import React, { useRef, useState } from 'react';
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

export default function EditAccountScreen({ route, navigation }) {
    const [userData, setUserData] = useState(route.params.userData)
    const [dob, setDob] = useState(new Date())

    return (
        <>
            <Toolbar title="Редактировать" back />
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
                        defaultValue={userData.name}
                        valid={userData.name.trim() != ""}
                    />
                    <AnimatedTextInput
                        placeholder="Фамилия"
                        onChangeText={(surname) => {
                            setUserData({
                                ...userData,
                                surname: surname,
                            })
                        }}
                        defaultValue={userData.surname}
                        valid={userData.surname.trim() != ""}
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
                        defaultValue={userData.email}
                        valid={/(.+)@(.+){2,}\.(.+){2,}/.test(userData.email)}
                    />
                    <AnimatedTextInput
                        placeholder="Телефон"
                        keyboardType="phone-pad"
                        tel
                        onChangeText={(phone, rawPhone) => {
                            setUserData({
                                ...userData,
                                rawPhone: rawPhone,
                                phone: phone,
                            })
                        }}
                        defaultValue={userData.phone}
                        valid={userData.phone.length == 18}
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
                        defaultValue={userData.birth}
                        valid={dob <= new Date()}
                    />
                    <AnimatedTextInput
                        placeholder="Адрес"
                        onChangeText={(address) => {
                            setUserData({
                                ...userData,
                                address: address,
                            })
                        }}
                        defaultValue={userData.address}
                        valid={userData.address.trim() != ""}
                    />
                    <AnimatedTextInput
                        placeholder="Город"
                        onChangeText={(city) => {
                            setUserData({
                                ...userData,
                                city: city,
                            })
                        }}
                        defaultValue={userData.city}
                        valid={userData.city.trim() != ""}
                    />
                    <View style={{ height: 10 }} />
                </ScrollView>
                <View style={{ alignSelf: "stretch", padding: 20 }}>
                    <Button title="Сохранить изменения" onPress={() => {
                        navigation.navigate("Main", {
                            screen: "PersonalAccount",
                            params: {
                                userData: userData
                            }
                        })
                    }} />
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