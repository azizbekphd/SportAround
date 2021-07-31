import React from 'react';
import globalStyles from '../global/Styles';
import Link from '../components/Link';
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import RequiredLabel from '../components/RequiredLabel';

export default function RegistrationScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View>
                <Text style={globalStyles.title}>Регистрация</Text>
            </View>
            <View style={styles.content}>
                <View style={globalStyles.row}>
                    <RequiredLabel>
                        E-mail
                    </RequiredLabel>
                    <TextInput
                        width="70%"
                        style={globalStyles.textInput}
                        keyboardType="email-address"
                        placeholder="example@site.com"
                    />
                </View>
                <View style={globalStyles.row}>
                    <RequiredLabel>
                        Никнейм
                    </RequiredLabel>
                    <TextInput
                        width="70%"
                        style={globalStyles.textInput}
                    />
                </View>
                <View style={globalStyles.row}>
                    <RequiredLabel>
                        Дата рождения
                    </RequiredLabel>
                    <TextInput
                        width="50%"
                        style={globalStyles.textInput}
                    />
                </View>
                <View style={globalStyles.row}>
                    <RequiredLabel>
                        Пароль
                    </RequiredLabel>
                    <TextInput
                        width="55%"
                        secureTextEntry={true}
                        style={globalStyles.textInput}
                    />
                </View>
                <View style={globalStyles.row}>
                    <RequiredLabel>
                        Повторите пароль
                    </RequiredLabel>
                    <TextInput
                        width="55%"
                        secureTextEntry={true}
                        style={globalStyles.textInput}
                    />
                </View>
                <View style={globalStyles.row}>
                    <RequiredLabel>
                        Номер телефона
                    </RequiredLabel>
                    <TextInput
                        width="55%"
                        keyboardType="phone-pad"
                        style={globalStyles.textInput}
                    />
                </View>
                <Link title="У меня уже есть аккаунт" onPress={() => { navigation.goBack() }} />
            </View>
            <TouchableOpacity
                style={globalStyles.button}
                activeOpacity={0.5}
            >
                <Text style={globalStyles.buttonText}>Продолжить</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    content: {
        padding: 20,
        justifyContent: 'space-evenly',
    },
})