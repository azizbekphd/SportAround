import React from 'react';
import { Text } from 'react-native';
import { useFonts, OpenSans_700Bold } from '@expo-google-fonts/open-sans';

export default function H1(props) {
    let [fontLoaded] = useFonts({
        OpenSans_700Bold
    });
    return (
        <Text style={{
            fontSize: 30,
            fontWeight: 'bold',
            ...(fontLoaded ?? { fontLoadedfontFamily: 'OpenSans_700Bold' }),
            color: props.color ?? '#fff',
            ...props.style
        }}>{props.children}</Text>
    )
}