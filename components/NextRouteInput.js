import { useNavigation } from "@react-navigation/native";
import React, { useState, useRef } from "react";
import { View, TextInput, Animated, Text, StyleSheet, Alert, Image, TouchableOpacity } from "react-native";

export default function NextRouteInput({
    placeholder,
    valid,
    onChange,
    routeName,
    data,
    ...others
}) {
    const floatAnim = useRef(new Animated.Value(20)).current;
    const fontSizeAnim = useRef(new Animated.Value(16)).current;
    const [value, setValue] = useState("");
    const [nativeValue, setNativeValue] = useState(new Date());
    const getColor = function (valid) {
        return valid ? "#29dec8" :
            (valid === false ? "#ff3333" :
                value == "" ? "#fff" : "#656b82")
    }

    const navigation = useNavigation();

    return (
        <TouchableOpacity activeOpacity={0.5} style={styles.inputContainer} onPress={() => { navigation.navigate(routeName, data) }}>
            <Text style={[
                styles.placeholder,
                {
                    color: getColor(valid),
                    top: value == "" ? 20 : 0,
                    fontSize: value == "" ? 16 : 13
                }]}>{placeholder}</Text>
            <View
                {...others}
                value={value}
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
            />
            <Image source={require('../assets/icons/arrow_r_purple.png')} style={styles.icon} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        height: 68,
        justifyContent: "space-between"
    },
    placeholder: {
        position: 'absolute'
    },
    icon: {
        position: "absolute",
        right: 0,
        top: 25
    }
})