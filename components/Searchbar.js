import React, { forwardRef, useState } from 'react';
import { TextInput, View, Image, StyleSheet } from 'react-native';
import H3 from './H3';

export default Searchbar = forwardRef((props, ref) => {
    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState("")

    return (
        <View style={styles.container} width="100%">
            <Image source={focused ?
                require('../assets/icons/searchbar_active.png') :
                require('../assets/icons/searchbar_normal.png')
            } />
            <H3
                color={focused ? "#fff" : "#BDBDBD"}
                style={{
                    ...styles.placeholder,
                    opacity: value.length == "" ? 1 : 0
                }}
            >Поиск</H3>
            <TextInput
                height="100%"
                style={styles.input}
                onFocus={() => { setFocused(true); props.onFocus && props.onFocus() }}
                onBlur={() => { setFocused(false) }}
                onChangeText={(newValue) => {
                    setValue(newValue)
                }}
                ref={ref}
            />
        </View>
    )
})

const styles = StyleSheet.create({
    container: {
        height: 40,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 7,
        paddingHorizontal: 10,
        backgroundColor: '#656B82',

    },
    input: {
        flex: 1,
        marginLeft: 10,
        color: "#fff",
        fontSize: 16,
        zIndex: 1000
    },
    placeholder: {
        position: 'absolute',
        left: 40
    }
})