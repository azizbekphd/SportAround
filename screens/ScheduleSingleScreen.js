import React, { useRef, useState } from 'react';
import { View, Switch, FlatList, StyleSheet, TouchableHighlight, Image } from 'react-native';
import PagerView from 'react-native-pager-view';
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio';
import H2 from '../components/H2';
import H3 from '../components/H3';
import Toolbar from '../components/Toolbar';
import globalStyles from '../global/Styles';
import AnimatedTextInput from '../components/AnimatedTextInput'

export default function ScheduleSingleScreen({ route, navigation }) {
    const [isHoliday, setIsHoliday] = useState(false)
    const [hasBreak, setHasBreak] = useState(false)
    const [text, setText] = useState("Рабочий день")

    return (
        <>
            <Toolbar back title={route.params.title} onReady={() => { navigation.pop() }} />
            <View style={{ justifyContent: 'flex-start', padding: 20, paddingBottom: 0, backgroundColor: '#0E0938' }}>
                <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }} width="100%">
                    <H2 style={{ fontWeight: "600" }}>
                        {text}
                    </H2>
                    <Switch
                        trackColor={{ false: "#3e3e3e", true: "#c4c4c4" }}
                        thumbColor={"#fff"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(newValue) => {
                            setIsHoliday(newValue)
                            if (newValue) setText("Выходной"); else setText("Рабочий день")
                        }}
                        value={isHoliday}
                    />
                </View>
                <View width="100%" style={{ height: 1, backgroundColor: "#656B82", marginVertical: 20 }} />
            </View>
            {!isHoliday &&
                <View style={{ padding: 20 }}>
                    <AnimatedTextInput
                        light
                        placeholder="Время открытия площадки"
                        mode="time"
                    />
                    <AnimatedTextInput
                        light
                        placeholder="Время закрытия площадки"
                        mode="time"
                    />
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: 40,
                            marginBottom: 10
                        }}
                    >
                        <H2 color="#000">Перерыв</H2>
                        <Switch
                            trackColor={{ false: "#3e3e3e", true: "#c4c4c4" }}
                            thumbColor={"#e9e9e9"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={(newValue) => {
                                setHasBreak(newValue)
                            }}
                            value={hasBreak}
                        />
                    </View>
                    {hasBreak &&
                        <>
                            <AnimatedTextInput
                                light
                                placeholder="Время закрытия площадки"
                                mode="time"
                            />
                            <AnimatedTextInput
                                light
                                placeholder="Время открытия площадки"
                                mode="time"
                            />
                        </>}
                </View>}
        </>
    )
}

const styles = StyleSheet.create({
    item: {
        height: 56,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
    }
})