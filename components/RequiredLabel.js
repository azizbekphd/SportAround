import React from 'react';
import globalStyles from '../global/Styles';
import { View, Text } from 'react-native';

export default function RequiredLabel(props) {
    return (
        <View style={{ flexDirection: 'row' }}>
            <Text style={globalStyles.label}>{props.children}</Text>
            <Text style={{ color: 'red' }}>*</Text>
        </View>
    )
}