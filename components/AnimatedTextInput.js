import React, { useState, useRef } from "react";
import { View, TextInput, Animated, Text, StyleSheet, Alert } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TextInputMask } from "react-native-masked-text";

export default function AnimatedTextInput({
    placeholder,
    valid,
    onFocus,
    date,
    tel,
    ...others
}) {
    const floatAnim = useRef(new Animated.Value(20)).current;
    const fontSizeAnim = useRef(new Animated.Value(16)).current;
    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState("");
    const [modal, setModal] = useState(false);
    const [dateValue, setDateValue] = useState(new Date());

    const getColor = function (valid) {
        return valid ? "#29dec8" :
            (valid === false ? "#ff3333" :
                (focused ? "#fff" : "#656b82"))
    }

    const animate = function (ref, value) {
        Animated.timing(ref, {
            toValue: value,
            duration: 200,
            useNativeDriver: false
        }).start();
    }

    return (
        <View style={styles.inputContainer}>
            <Animated.Text style={[
                styles.placeholder,
                {
                    color: getColor(valid),
                    top: floatAnim,
                    fontSize: fontSizeAnim
                }]}>{placeholder}</Animated.Text>
            {!tel ? <TextInput
                {...others}
                onFocus={(ev) => {
                    setFocused(true);
                    animate(floatAnim, 0)
                    animate(fontSizeAnim, 13)
                    if (date) {
                        setModal(true)
                    } else {
                        onFocus && onFocus(ev);
                    }
                }}
                onBlur={() => {
                    setFocused(false);
                    if (value.length == 0) {
                        animate(floatAnim, 20)
                        animate(fontSizeAnim, 16)
                    }
                }}
                value={value}
                onChangeText={(value) => { if (date) { setModal(true) } else { setValue(value) } }}
                style={{
                    color: "#fff",
                    height: 50,
                    borderBottomColor: getColor(valid),
                    borderBottomWidth: focused ? 2 : 1,
                    fontSize: 16,
                    paddingHorizontal: 5,
                    textAlignVertical: "bottom",
                    paddingBottom: 6
                }}
            /> :
                <TextInputMask
                    {...others}
                    type={'custom'}
                    options={{
                        mask: '+7 (999) 999 99 99'
                    }}
                    onFocus={(ev) => {
                        setFocused(true);
                        animate(floatAnim, 0)
                        animate(fontSizeAnim, 13)
                        if (date) {
                            setModal(true)
                        } else {
                            onFocus && onFocus(ev);
                        }
                    }}
                    onBlur={() => {
                        setFocused(false);
                        if (value.length == 0) {
                            animate(floatAnim, 20)
                            animate(fontSizeAnim, 16)
                        }
                    }}
                    value={value}
                    onChangeText={(value) => { if (date) { setModal(true) } else { setValue(value) } }}
                    style={{
                        color: "#fff",
                        height: 50,
                        borderBottomColor: getColor(valid),
                        borderBottomWidth: focused ? 2 : 1,
                        fontSize: 16,
                        paddingHorizontal: 5,
                        textAlignVertical: "bottom",
                        paddingBottom: 6
                    }}
                />}
            <DateTimePickerModal
                isVisible={modal}
                mode="date"
                headerTextIOS="Выберите дату"
                isDarkModeEnabled={true}
                onConfirm={(newDate) => {
                    setDateValue(newDate)
                    setValue(newDate.toUTCString());
                    setModal(false)
                }}
                date={dateValue}
                onCancel={() => { setModal(false) }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        height: 68,
        justifyContent: "space-between"
    },
    placeholder: {
        position: 'absolute'
    }
})