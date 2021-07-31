import React from 'react';
import globalStyles from '../global/Styles';
import { Text, TouchableOpacity } from 'react-native';

export default function Link(props) {
    return (
        <TouchableOpacity activeOpacity={0.5}>
            <Text style={globalStyles.link} onPress={props.onPress}>{props.title}</Text>
        </TouchableOpacity>
    );
}