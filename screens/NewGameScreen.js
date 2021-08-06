import React, { useState } from 'react';
import globalStyles from '../global/Styles';
import { View, StyleSheet } from 'react-native';
import Toolbar from '../components/Toolbar';
import ModeSwitch from '../components/ModeSwitch';
import AnimatedTextInput from '../components/AnimatedTextInput';
import H3 from '../components/H3';
import Toggler from '../components/Toggler';
import Counter from '../components/Counter';
import Button from '../components/Button';

export default function NewGameScreen({ route, navigation }) {
    const [isNewGame, setIsNewGame] = useState(true)
    return (
        <>
            <Toolbar back title="Новая игра" />
            <View style={[globalStyles.container, { padding: 20, justifyContent: 'space-between', alignItems: 'center' }]}>
                <View style={{ alignItems: 'center' }}>
                    <ModeSwitch onChange={(pos) => { setIsNewGame(pos == 0) }} />
                    <View width="100%" style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        ...styles.item
                    }}>
                        <View width="49%">
                            <AnimatedTextInput
                                placeholder="Дата"
                                mode="date"
                            />
                        </View>
                        <View width="49%">
                            <AnimatedTextInput
                                placeholder="Время"
                                mode="time"
                            />
                        </View>
                    </View>
                    <View width="100%" style={styles.item}>
                        <H3 style={{ marginBottom: 9 }}>Тип площадки:</H3>
                        <Toggler items={["Все", "Платные", "Бесплатные"]} />
                    </View>
                    <View width="100%" style={styles.item}>
                        <H3 style={{ marginBottom: 9 }}>Интервал поиска:</H3>
                        <Counter
                            items={["0 ч.", "1 ч.", "2 ч.", "3 ч.", "4 ч.", "5 ч."]}
                            onChange={(pos) => { console.log(pos) }}
                            default={2}
                        />
                    </View>
                    {isNewGame &&
                        <View width="100%" style={styles.item}>
                            <H3 style={{ marginBottom: 9 }}>Тип команды:</H3>
                            <Counter
                                items={["3x3", "4x4", "5x5", "Любой"]}
                                default={route.params.isSoccer ? 2 : 1}
                            />
                        </View>}
                </View>
                <Button title={isNewGame ? "Начать" : "Найти"} onPress={() => { navigation.navigate("PlaygroundChoice") }} />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    item: {
        marginTop: 20,
    }
})