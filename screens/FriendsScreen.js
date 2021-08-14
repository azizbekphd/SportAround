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

export default function FriendsScreen({ navigation, route }) {

    const ref = useRef()
    const [friends, setFriends] = useState([{
        id: "1",
        name: "Муминов Азизбек",
        phone: "+7 123 456 78 90",
        friend: true
    },
    {
        id: "2",
        name: "Джонни Депп",
        avatar: require('../assets/images/person.jpg'),
        phone: "+7 987 654 32 10"
    },
    {
        id: "3",
        name: "Николас Кейдж",
        phone: "+7 456 987 12 30",
        friend: true
    },
    {
        id: "4",
        name: "Джеки Чан",
        avatar: require('../assets/images/person.jpg'),
        phone: "+7 456 987 12 30",
        friend: true
    },
    {
        id: "5",
        name: "Александр Пушкин",
        avatar: require('../assets/images/person.jpg'),
        phone: "+7 456 987 12 30"
    },
    {
        id: "6",
        name: "Волан де Морт",
        phone: "+7 357 546 89 51"
    }, {
        id: "7",
        name: "Муминов Азизбек",
        phone: "+7 123 456 78 90",
        friend: true
    },
    {
        id: "8",
        name: "Джонни Депп",
        avatar: require('../assets/images/person.jpg'),
        phone: "+7 987 654 32 10"
    },
    {
        id: "9",
        name: "Николас Кейдж",
        phone: "+7 456 987 12 30",
        friend: true
    },
    {
        id: "10",
        name: "Джеки Чан",
        avatar: require('../assets/images/person.jpg'),
        phone: "+7 456 987 12 30",
        friend: true
    },
    {
        id: "11",
        name: "Александр Пушкин",
        avatar: require('../assets/images/person.jpg'),
        phone: "+7 456 987 12 30"
    },
    {
        id: "12",
        name: "Волан де Морт",
        phone: "+7 357 546 89 51"
    }, {
        id: "13",
        name: "Муминов Азизбек",
        phone: "+7 123 456 78 90",
        friend: true
    },
    {
        id: "14",
        name: "Джонни Депп",
        avatar: require('../assets/images/person.jpg'),
        phone: "+7 987 654 32 10"
    },
    {
        id: "15",
        name: "Николас Кейдж",
        phone: "+7 456 987 12 30",
        friend: true
    },
    {
        id: "16",
        name: "Джеки Чан",
        avatar: require('../assets/images/person.jpg'),
        phone: "+7 456 987 12 30",
        friend: true
    },
    {
        id: "17",
        name: "Александр Пушкин",
        avatar: require('../assets/images/person.jpg'),
        phone: "+7 456 987 12 30"
    },
    {
        id: "18",
        name: "Волан де Морт",
        phone: "+7 357 546 89 51"
    },
    ])

    const openNextPage = (isSoccer) => {
        navigation.navigate('NewGame', { isSoccer: isSoccer })
    }

    return (
        <>
            <Toolbar title="Друзья" onMenu={() => { }} />
            <View style={[globalStyles.container, { justifyContent: 'flex-start', paddingHorizontal: 20, paddingTop: 20 }]} >
                <Searchbar ref={ref} onChangeText={() => { }} />
                <View style={{ height: 16 }} />
                <ScrollView width="100%">
                    <FriendsInfo
                        setFriends={setFriends}
                        friendsInfo={friends}
                    />
                </ScrollView>
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