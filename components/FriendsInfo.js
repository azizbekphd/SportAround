import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import H3 from './H3';
import SmallButton from '../components/SmallButton'

export default function FriendsInfo({
    friendsInfo,
}) {
    return (
        <View width="100%" style={styles.container}>
            {friendsInfo &&
                friendsInfo.map((item, index, array) => {
                    return <View style={styles.item} key={item.id}>
                        <TouchableOpacity activeOpacity={0.5} onPress={() => { }} width="100%" style={styles.itemContent}>
                            <View style={styles.avatar}>
                                {item.avatar ?
                                    <Image source={item.avatar} style={styles.avatar} /> :
                                    <H3 style={{ fontWeight: "600" }}>{(() => {
                                        let arr = item.name.split(" ");
                                        let name = arr[0].charAt(0);
                                        if (arr.length > 1) name += arr[1].charAt(0);
                                        return name;
                                    })()}</H3>
                                }
                            </View>
                            <View style={styles.itemText}>
                                <H3 color="#000" style={{ fontWeight: "700" }}>{item.name}</H3>
                                <H3 color="#000">{item.phone ?? ""}</H3>
                            </View>
                            <SmallButton title="Дружить" onPress={() => { }} height={28} disabled={item.friend} onPress={() => { item.friend = !item.friend }} />
                        </TouchableOpacity>
                        {(index != array.length - 1) && <View style={styles.separator} width="100%"></View>}
                    </View>
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 10
    },
    item: {
        height: 60,
        padding: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    itemContent: {
        flexDirection: "row"
    },
    itemText: {
        flex: 1,
        marginLeft: 10,
        height: 44,
        justifyContent: "space-around"
    },
    separator: {
        height: 1,
        backgroundColor: '#E5E5E5',
        position: 'absolute',
        top: 59
    },
    button: {
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "flex-start",
        width: 160
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "#656B82",
        justifyContent: "center",
        alignItems: 'center'
    }
})