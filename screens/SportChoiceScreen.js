import React from 'react';
import globalStyles from '../global/Styles';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import Toolbar from '../components/Toolbar';
import H3 from '../components/H3';
import AnimatedTextInput from '../components/AnimatedTextInput';
import Button from '../components/Button';
import H2 from '../components/H2';
import { LinearGradient } from 'expo-linear-gradient';
import Navbar from '../components/Navbar';
import { useNavigation } from '@react-navigation/native';

export default function SportChoiceScreen({ navigation, route }) {

    const openNextPage = (isSoccer) => {
        navigation.navigate('NewGame', { isSoccer: isSoccer })
    }

    return (
        <>
            <Toolbar title="Новая игра" />
            <View style={[globalStyles.container, { justifyContent: 'flex-start' }]} >
                <View height="50%" style={{ justifyContent: "space-evenly", padding: 20 }}>
                    <View style={{ justifyContent: 'space-evenly', height: 100 }}>
                        <H2>Во что хотите сыграть?</H2>
                        <H3>Выберите вид, чтобы создать или найти игру рядом с вами</H3>
                    </View>
                    <View style={[globalStyles.row, { justifyContent: 'space-around' }]}>
                        <TouchableOpacity style={styles.sport} onPress={() => { openNextPage(true) }}>
                            <LinearGradient style={[styles.sport, { padding: 16, justifyContent: 'space-between' }]} colors={["#6566FD", "#6843CF"]}>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Image source={require('../assets/icons/soccer.png')} />
                                </View>
                                <View style={{ alignItems: 'flex-start' }}>
                                    <H3>Футбол</H3>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.sport} onPress={() => { openNextPage(false) }}>
                            <LinearGradient style={[styles.sport, { padding: 16, justifyContent: 'space-between' }]} colors={["#29DEC8", "#049DFF"]}>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Image source={require('../assets/icons/basketball.png')} />
                                </View>
                                <View style={{ alignItems: 'flex-start' }}>
                                    <H3>Баскетбол</H3>
                                </View>
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