import React from 'react';
import globalStyles from '../global/Styles';
import { Text, TouchableOpacity } from 'react-native';
import H6 from './H6';
import { useNavigation } from '@react-navigation/native';

export default function Link(props) {
    const navigation = useNavigation()

    return (
        <TouchableOpacity activeOpacity={0.5} onPress={() => { props.page && navigation.push(props.page) }}>
            <H6 style={{ textDecorationLine: "underline" }}>{props.title}</H6>
        </TouchableOpacity>
    );
}