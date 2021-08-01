import React from 'react';
import globalStyles from '../global/Styles';
import Link from '../components/Link';
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import RequiredLabel from '../components/RequiredLabel';
import Toolbar from '../components/Toolbar';
import ViewPager from 'react-native-pager-view';
import H1 from '../components/H1';

export default function RegistrationScreen({ navigation }) {
    return (
        <View style={[globalStyles.container, { justifyContent: 'space-between' }]}>
            <Toolbar back={true} />
            <ViewPager
                style={styles.container}
                initialPage={0}
            >
                <View key="1">
                    <View style={{ width: 248 }}>
                        <H1>Новый
                            Аккаунт</H1>
                    </View>
                </View>
                <View key="2">
                    <View style={{ width: 248 }}>
                        <H1>Вы почти
                            у цели
                        </H1>
                    </View>
                </View>
            </ViewPager>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 86,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    content: {
        padding: 20,
        justifyContent: 'space-evenly',
    },
})