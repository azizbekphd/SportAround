import React, { useRef, useState } from 'react';
import { View, Switch, FlatList, StyleSheet, TouchableHighlight, Image } from 'react-native';
import ViewPager from 'react-native-pager-view';
import H2 from '../components/H2';
import H3 from '../components/H3';
import Toolbar from '../components/Toolbar';
import globalStyles from '../global/Styles';

export default function PriceScreen({ navigation }) {
    const [free, setFree] = useState(false)

    return (
        <>
            <Toolbar back title="Стоимость" onReady={() => { navigation.pop() }} />
            <View style={{ ...globalStyles.container, justifyContent: 'flex-start', padding: 20 }}>
                <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }} width="100%">
                    <H2 style={{ fontWeight: "600" }}>
                        Бесплатно
                    </H2>
                    <Switch
                        trackColor={{ false: "#3e3e3e", true: "#c4c4c4" }}
                        thumbColor={"#fff"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(newValue) => { setFree(newValue) }}
                        value={free}
                    />
                </View>
                <View width="100%" style={{ height: 1, backgroundColor: "#656B82", marginVertical: 20 }} />
                {!free &&
                    <FlatList
                        width="100%"
                        style={{ backgroundColor: "#fff", borderRadius: 12, paddingVertical: 12, height: 319 }}
                        data={[
                            {
                                title: "Все рабочие дни",
                                id: "all"
                            },
                            {
                                title: "Понедельник",
                                id: "mon"
                            },
                            {
                                title: "Вторник",
                                id: "tue"
                            },
                            {
                                title: "Среда",
                                id: "wed"
                            },
                            {
                                title: "Четверг",
                                id: "thu"
                            },
                            {
                                title: "Пятница",
                                id: "fri"
                            },
                            {
                                title: "Суббота",
                                id: "sat"
                            },
                            {
                                title: "Воскресенье",
                                id: "sun"
                            },
                        ]}
                        renderItem={({ item }) => {
                            return <TouchableHighlight
                                width="100%"
                                style={styles.item}
                                key={item.id}
                                underlayColor="rgba(0,0,0,.1)"
                                onPress={() => {
                                    navigation.navigate("PriceSingle", { title: item.title, id: item.id })
                                }}
                            >
                                <View width="100%" style={styles.item}>
                                    <H3 color="#000">{item.title}</H3>
                                    <View height="100%" style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <H3 color="#6D61E7">Бесплатно</H3>
                                        <Image source={require('../assets/icons/arrow_r_purple.png')} style={{ marginLeft: 12 }} />
                                    </View>
                                </View>
                            </TouchableHighlight>
                        }}
                        ItemSeparatorComponent={() => { return <View width="100%" style={{ height: 1, backgroundColor: "#e5e5e5" }}></View> }}
                    />}
                <View style={{ flex: 1 }} />
            </View>
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