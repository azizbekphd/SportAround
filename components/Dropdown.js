import React, { useState, useRef, useEffect } from "react";
import { View, TextInput, Animated, Text, StyleSheet, Alert, Image, TouchableOpacity, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import H3 from "./H3";

export default function Dropdown({
    placeholder,
    valid,
    onChange,
    data,
    ...others
}) {
    const resizeAnim = useRef(new Animated.Value(0)).current;
    const rotateAnim = useRef(new Animated.Value(90)).current;
    const [selectedId, setSelectedId] = useState(null);
    const [opened, setOpened] = useState(false);
    const [value, setValue] = useState(null);

    const getColor = function (valid) {
        return valid ? "#29dec8" :
            (valid === false ? "#ff3333" :
                (!value ? "#fff" :
                    (opened ? "#fff" : "#656b82")))
    }

    useEffect(() => {
        if (!opened) {
            Animated.timing(rotateAnim, {
                toValue: 90,
                duration: 250,
                useNativeDriver: false
            }).start()
            Animated.timing(resizeAnim, {
                toValue: 0,
                duration: 250,
                useNativeDriver: false
            }).start()
        } else {
            Animated.timing(rotateAnim, {
                toValue: 270,
                duration: 250,
                useNativeDriver: false
            }).start()
            Animated.timing(resizeAnim, {
                toValue: data.length * 40 + 68,
                duration: 250,
                useNativeDriver: false
            }).start()
        }
    }, [opened])

    const spin = rotateAnim.interpolate({
        inputRange: [90, 270],
        outputRange: ['90deg', '270deg']
    })

    return (
        <Animated.View style={{ height: 68, minHeight: 68 }}>
            <TouchableOpacity
                activeOpacity={0.5}
                style={{ height: 68 }}
                onPress={() => {
                    setOpened(!opened)
                }}
            >
                <Text style={[
                    styles.placeholder,
                    {
                        color: getColor(valid),
                        top: value ? 0 : 20,
                        fontSize: value ? 13 : 16
                    }]}>{placeholder}</Text>
                <H3
                    style={{
                        color: "#fff",
                        height: 50,
                        borderBottomColor: getColor(valid) == "#fff" ? "#656b82" : getColor(valid),
                        borderBottomWidth: 1,
                        fontSize: 16,
                        paddingHorizontal: 5,
                        textAlignVertical: "bottom",
                        paddingBottom: 6
                    }}
                >{value}</H3>
                <Animated.Image
                    source={require('../assets/icons/arrow_r_purple.png')}
                    style={[
                        styles.icon,
                        { transform: [{ rotate: spin }] }
                    ]}
                />
            </TouchableOpacity>
            <Animated.View width="100%" style={{ position: 'absolute', height: resizeAnim, top: 50, zIndex: 500, overflow: "hidden", backgroundColor: "#0E0938" }}>
                {data.map((item) => {
                    return <View key={item.id} width="100%">
                        <TouchableOpacity
                            width="100%"
                            height="100%"
                            activeOpacity={0.5}
                            onPress={() => {
                                setSelectedId(item.id);
                                setValue(item.title);
                                setOpened(false)
                            }}
                        >
                            {item.id == selectedId ?
                                <LinearGradient
                                    width="100%" height="100%"
                                    style={styles.item}
                                    colors={["rgba(38, 34, 84, 1)", "rgba(38, 34, 84, 0)"]}
                                >
                                    <H3>{item.title}</H3>
                                </LinearGradient> :
                                <View
                                    style={styles.item}>
                                    <H3>{item.title}</H3>
                                </View>
                            }
                        </TouchableOpacity>
                    </View>
                })}
            </Animated.View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    placeholder: {
        position: 'absolute'
    },
    icon: {
        position: "absolute",
        right: 3,
        top: 25,
    },
    item: {
        height: 40,
        paddingHorizontal: 16,
        alignItems: 'flex-start',
        justifyContent: 'center',
        zIndex: 500,
    }
})