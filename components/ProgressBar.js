import React from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function ProgressBar(props) {
    if (props.progress === Infinity || props.progress == null) {
        return (
            <ActivityIndicator size="large" color="#6d61e7" />
        )
    }
    return (
        <View style={{ backgroundColor: '#342c7e', height: 4, width: 245, borderRadius: 2 }}>
            <View style={{ position: 'absolute', backgroundColor: '#6d61e7', height: 4, width: (props.progress), borderRadius: 2 }}></View>
        </View>
    );
}