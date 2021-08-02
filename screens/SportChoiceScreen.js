import React from 'react';
import globalStyles from '../global/Styles';
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Toolbar from '../components/Toolbar';
import H3 from '../components/H3';
import AnimatedTextInput from '../components/AnimatedTextInput';
import Button from '../components/Button';
import H2 from '../components/H2';
import { LinearGradient } from 'expo-linear-gradient';

export default function SportChoiceScreen({ navigation }) {
    return (
        <>
            <Toolbar title="Новая игра" />
            <View style={[globalStyles.container, { justifyContent: 'flex-start' }]} >
                <View height="50%" style={{ justifyContent: "space-evenly", padding: 20 }}>
                    <View style={{ justifyContent: 'space-evenly', height: 100 }}>
                        <H2>Во что хотите сыграть?</H2>
                        <H3>Выберите вид, чтобы создать или найти игру рядом с вами</H3>
                    </View>
                    <View style={globalStyles.row}>
                        <TouchableOpacity style={styles.sport}>
                            <LinearGradient style={styles.sport} colors={["#6566FD", "#6843CF"]}>

                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
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