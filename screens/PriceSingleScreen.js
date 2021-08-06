import React, { useRef, useState } from 'react';
import { View, Switch, FlatList, StyleSheet, TouchableHighlight, Image } from 'react-native';
import ViewPager from 'react-native-pager-view';
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio';
import H2 from '../components/H2';
import H3 from '../components/H3';
import Toolbar from '../components/Toolbar';
import globalStyles from '../global/Styles';
import AnimatedTextInput from '../components/AnimatedTextInput'

export default function PriceSingleScreen({ route, navigation }) {
    const [isFree, setIsFree] = useState(false)
    let arr = new Array(24)
    for (let i = 0; i < 24; i++) {
        arr[i] = {
            hour: i,
            price: 0
        }
    }
    const [prices, setPrices] = useState(arr)
    const [text, setText] = useState("Платно")

    const getNull = (number) => {
        return ((number < 10 ? "0" : "") + number.toString())
    }

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
                            setIsFree(newValue)
                            if (newValue) setText("Бесплатно"); else setText("Платно")
                        }}
                        value={isFree}
                    />
                </View>
                <View width="100%" style={{ height: 1, backgroundColor: "#656B82", marginVertical: 20 }} />
            </View>
            {!isFree &&
                <FlatList
                    data={prices}
                    keyExtractor={(item) => { return item.hour.toString() }}
                    renderItem={({ item }) => {
                        return <TouchableHighlight
                            underlayColor="rgba(0,0,0,.1)"
                            style={styles.item}
                            onPress={() => { }}
                        >
                            <View width="100%" style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <H3 color="#000">{`${getNull(item.hour)}:00`}</H3>
                                <H3 color="#6565FC">{`${item.price} руб.`}</H3>
                            </View>
                        </TouchableHighlight>
                    }}
                    ItemSeparatorComponent={() => { return <View width="100%" style={{ height: 1, backgroundColor: "#E5E5E5", marginHorizontal: 20 }} /> }}
                />}
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