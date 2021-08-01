import React from 'react';
import globalStyles from '../global/Styles';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import Button from '../components/Button';
import H1 from '../components/H1';

export default function SignInSignUpScreen({ navigation }) {
    return (
        <ImageBackground source={require("../assets/images/2a.png")} style={[styles.container, { justifyContent: "space-between" }]}>
            <View style={{ marginTop: 100 }}>
                <H1>Спорт Рядом</H1>
            </View>
            <View style={styles.content}
                width="100%">
                <Button title="Зарегистрироваться" outlined onPress={() => { navigation.push("Registration") }} />
                <Button title="Войти" onPress={() => { navigation.push("Authorization") }} />
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    content: {
        height: 165,
        padding: 20,
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})