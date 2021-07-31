import React from 'react';
import globalStyles from '../global/Styles';
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Link from '../components/Link';

export default function AuthorizationScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View>
                <Text style={globalStyles.title}>Авторизация</Text>
            </View>
            <View>
                <View style={[globalStyles.row, styles.inputRows]}>
                    <Text style={globalStyles.label}>E-mail</Text>
                    <TextInput
                        width="77%"
                        style={globalStyles.textInput}
                        keyboardType="email-address"
                        placeholder="example@site.com"
                    />
                </View>
                <View style={[globalStyles.row, styles.inputRows]}>
                    <Text style={globalStyles.label}>Пароль</Text>
                    <TextInput
                        width="77%"
                        style={globalStyles.textInput}
                        secureTextEntry={true}
                    />
                </View>
                <View style={[globalStyles.row, styles.alternatives, styles.inputRows]}>
                    <Link title="Забыли пароль?" onPress={() => { navigation.navigate("PasswordRecovery") }} />
                    <Link title="Зарегистрироваться" onPress={() => { navigation.navigate("Registration") }} />
                </View>
            </View>
            <TouchableOpacity
                style={globalStyles.button}
                activeOpacity={0.5}
            >
                <Text style={globalStyles.buttonText}>Продолжить</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    inputRows: {
        margin: 5,
    },
    alternatives: {
        paddingVertical: 20,
        paddingHorizontal: 10
    }
})