import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import H3 from './H3';

export default function Counter(props) {
    const [count, setCount] = useState(props.default ?? 0);

    return (
        <View width="100%" style={styles.container}>
            <TouchableOpacity
                disabled={count == 0}
                activeOpacity={0.8}
                onPress={() => { setCount(count - 1); props.onChange && props.onChange(count - 1) }}
                style={[styles.item, styles.first, {
                    borderColor: (count != 0 ? "#fff" : "#656B82")
                }]}
            >
                <H3 color={count != 0 ? "#fff" : "#656B82"}>-</H3>
            </TouchableOpacity>
            <View
                style={[styles.item, {
                    borderColor: "#fff"
                }]}
            >
                <H3 color="#fff">{props.items[count]}</H3>
            </View>
            <TouchableOpacity
                disabled={count == props.items.length - 1}
                activeOpacity={0.8}
                onPress={() => { setCount(count + 1); props.onChange && props.onChange(count + 1) }}
                style={[styles.item, styles.last, {
                    borderColor: (count != props.items.length - 1 ? "#fff" : "#656B82")
                }]}
            >
                <H3 color={count != props.items.length - 1 ? "#fff" : "#656B82"}>+</H3>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    item: {
        height: 40,
        borderWidth: 1,
        borderColor: "#656B82",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    first: {
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    last: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    },
})