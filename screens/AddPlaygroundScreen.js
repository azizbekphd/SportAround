import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import AnimatedTextInput from '../components/AnimatedTextInput';
import Button from '../components/Button';
import Dropdown from '../components/Dropdown';
import H3 from '../components/H3';
import NextRouteInput from '../components/NextRouteInput';
import Toolbar from '../components/Toolbar';
import globalStyles from '../global/Styles'

export default function AddPlaygroundScreen({ navigation }) {
    return (
        <>
            <Toolbar back title="Добавить площадку" />
            <View height="100%" style={{ ...globalStyles.container, paddingVertical: 20 }}>
                <ScrollView width="100%" height="100%" style={{ flex: 1, paddingHorizontal: 20 }}>
                    <AnimatedTextInput
                        placeholder="Название площадки"
                        onChangeText={console.log}
                    />
                    <AnimatedTextInput
                        placeholder="Адрес площадки"
                        onChangeText={console.log}
                    />
                    <AnimatedTextInput
                        placeholder="Телефон"
                        keyboardType="phone-pad"
                        tel
                        onChangeText={console.log}
                    />
                    <NextRouteInput
                        placeholder="График работы"
                        routeName="Schedule"
                    />
                    <NextRouteInput
                        placeholder="Стоимость"
                        routeName="Price"
                        data={{}}
                    />
                    <Dropdown
                        placeholder="Способ оплаты"
                        data={[
                            { title: "Онлайн", id: "online" },
                            { title: "Офлайн", id: "offline" },
                            { title: "Онлайн/офлайн", id: "both" }
                        ]}
                        onChange={(a, b) => console.log(a, b)}
                    />
                    <AnimatedTextInput
                        placeholder="Покрытие"
                        onChangeText={console.log}
                    />
                    <AnimatedTextInput
                        placeholder="Вид спорта"
                        onChangeText={console.log}
                    />
                </ScrollView>
                <View width="100%" style={{ paddingTop: 20, paddingHorizontal: 20 }}>
                    <TouchableOpacity width="100%" activeOpacity={0.5} style={{
                        borderRadius: 10,
                        borderColor: "#656B82",
                        borderWidth: 1,
                        paddingLeft: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        height: 54,
                        marginBottom: 20
                    }}>
                        <H3 color="#6D61E7">Добавить фотографии</H3>
                        <Image source={require('../assets/icons/add_photo_purple.png')} style={{ marginLeft: 8 }} />
                    </TouchableOpacity>
                    <Button title="Добавить" />
                </View>
            </View>
        </>
    )
}