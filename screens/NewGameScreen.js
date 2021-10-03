import React, { useContext, useEffect, useState } from 'react';
import globalStyles from '../global/Styles';
import { View, StyleSheet } from 'react-native';
import Toolbar from '../components/Toolbar';
import ModeSwitch from '../components/ModeSwitch';
import AnimatedTextInput from '../components/AnimatedTextInput';
import H3 from '../components/H3';
import Toggler from '../components/Toggler';
import Counter from '../components/Counter';
import Button from '../components/Button';
import AuthContext from '../api/AuthContext';
import decodeDate from '../global/decodeDate';
import formatDate from '../global/formatDate';
import getNull from '../global/getNull';

export default function NewGameScreen({ route, navigation }) {
    const [isNewGame, setIsNewGame] = useState(true)
    const {getUser} = useContext(AuthContext)
    const [duration, setDuration] = useState(2)
    const [dateIsValid, setDateIsValid] = useState(null)
    const [timeIsValid, setTimeIsValid] = useState(null)
    const [gameData, setGameData] = useState({
        countPlays: route.params.countPlays,
        typeId: route.params.typeId,
        pay: 0,
        dateGame: null,
        startHour: null,
        startMin: 0,
        endHour: 0,
        endMin: 0,
    })

    function calculateAge(dob){
        var diff_ms = Date.now() - dob.getTime();
        var age_dt = new Date(diff_ms);
        return Math.abs(age_dt.getUTCFullYear() - 1970);
    }

    useEffect(() => {
        if(gameData.dateGame)
        setDateIsValid(
            gameData.dateGame ? new Date(decodeDate(gameData.dateGame)) >= new Date(decodeDate(new Date())) : false
        )
    }, [gameData.dateGame])

    useEffect(() => {
        if(gameData.dateGame && gameData.startHour!==null)
        setTimeIsValid(
            gameData.startHour!==null ?
            gameData.dateGame ?
            new Date(`${decodeDate(gameData.dateGame)}T${getNull(gameData.startHour)}:${getNull(gameData.startMin)}:00.000Z`)
                > new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000) :
            false : false
        )
    }, [gameData.startHour, gameData.startMin])

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
                                required
                                placeholder="Дата"
                                mode="date"
                                valid={dateIsValid}
                                onChangeText={(value, valueStr)=>{
                                    setGameData((prev)=>{
                                        return {
                                            ...prev,
                                            dateGame: formatDate(value)
                                        }
                                    })
                                }}
                            />
                        </View>
                        <View width="49%">
                            <AnimatedTextInput
                                required
                                placeholder="Время"
                                mode="time"
                                onChangeText={(value, valueStr)=>{
                                    setGameData((prev)=>{
                                        return {
                                            ...prev,
                                            startHour: value.getHours(),
                                            startMin: value.getMinutes(),
                                            endHour: (value.getHours() + duration)%24,
                                            endMin: value.getMinutes(),
                                        }
                                    })
                                }}
                                valid={
                                    timeIsValid
                                }
                            />
                        </View>
                    </View>
                    <View width="100%" style={styles.item}>
                        <H3 style={{ marginBottom: 9 }}>Тип площадки:</H3>
                        <Toggler items={getUser()
                            ? calculateAge(new Date(decodeDate(getUser().birthday))) >= 14
                            ? ["Все", "Платные", "Бесплатные"]
                            : ["Бесплатные"]
                            : ["Бесплатные"]}
                            onChange={(index)=>{
                                setGameData((prev)=>{
                                    return {
                                        ...prev,

                                    }
                                })
                            }}
                        />
                    </View>
                    <View width="100%" style={styles.item}>
                        <H3 style={{ marginBottom: 9 }}>{isNewGame ? "Длительность игры:" : "Интервал поиска:"}</H3>
                        <Counter
                            items={["0 ч.", "1 ч.", "2 ч.", "3 ч.", "4 ч.", "5 ч."]}
                            onChange={(pos) => {
                                setGameData((prev)=>{
                                    return {
                                        ...prev,
                                        endHour: (gameData.startHour + pos)%24,
                                    }
                                })
                                setDuration(pos)
                            }}
                            default={duration}
                        />
                    </View>
                    {isNewGame &&
                        <View width="100%" style={styles.item}>
                            <H3 style={{ marginBottom: 9 }}>Тип команды:</H3>
                            <Counter
                                items={["3x3", "4x4", "5x5", "6x6", "Любой"]}
                                onChange={(pos)=>{
                                    setGameData((prev)=>{
                                        return {
                                            ...prev,
                                            countPlays: pos < 4 ? (pos+3)*2 : null
                                        }
                                    })
                                }}
                                default={route.params.countPlays/2 - 3}
                            />
                        </View>}
                </View>
                <Button
                    title={isNewGame ? "Начать" : "Найти"}
                    onPress={() => {
                        navigation.navigate("PlaygroundChoice",
                            {
                                isNewGame: isNewGame,
                                gameData: gameData
                            })
                    }}
                    disabled={!(gameData.dateGame !== null &&
                        dateIsValid &&
                        gameData.startHour !== null &&
                        gameData.startMin !== null &&
                        timeIsValid)}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    item: {
        marginTop: 20,
    }
})