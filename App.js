import 'react-native-gesture-handler';
import React, { useMemo, useState, useEffect, useReducer } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingScreen from './screens/LoadingScreen';
import IntroScreen from './screens/IntroScreen';
import AuthorizationScreen from './screens/AuthorizationScreen';
import PasswordRecoveryScreen from './screens/PasswordRecoveryScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import { LogBox, StyleSheet, StatusBar, Alert } from 'react-native';
import SignInSignUpScreen from './screens/SignInSignUpScreen';
import MainScreen from './screens/MainScreen';
import NewGameScreen from './screens/NewGameScreen';
import PlaygroundChoiceScreen from './screens/PlaygroundsChoiceScreen';
import AddPlaygroundScreen from './screens/AddPlaygroundScreen';
import ScheduleScreen from './screens/ScheduleScreen';
import ScheduleSingleScreen from './screens/ScheduleSingleScreen';
import PriceScreen from './screens/PriceScreen';
import PriceSingleScreen from './screens/PriceSingleScreen';
import EditAccountScreen from './screens/EditAccountScreen';
import PlaygroundDetailsScreen from './screens/PlaygroundDetailsScreen';
import PastGameDetailsScreen from './screens/PastGameDetailsScreen';
import OfferedGameDetailsScreen from './screens/OfferedGameDetailsScreen';
import PaymentScreen from './screens/PaymentScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AddCardScreen from './screens/AddCardScreen';
import AuthContext from './contexts/AuthContext';
import User from './models/User';
import LoaderScreen from './screens/LoaderScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './global/api';
import { loginReducer, initialLoginState } from './reducers/loginReducer';
import ImageGalleryScreen from './screens/ImageGalleryScreen';

const Stack = createStackNavigator()

export default function App() {

  /* Auth */
  const [loginState, dispatchLoginState] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(() => ({
    signIn: async (data) => {
      let response = await fetch(api + 'login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
      });
      console.log(response.status);
      if (response.ok) {
        let user = await response.json();
        if (user) {
          await AsyncStorage.setItem("user", JSON.stringify(user));
          dispatchLoginState({
            type: 'login',
            user: new User(user)
          });
        } else {
          Alert.alert("Упс...", "Не удалось войти. Проверьте правильность введенных данных и повторите попытку")
          return true
        }
      } else {
        Alert.alert("Упс...", "Не удалось войти. Проверьте правильность введенных данных и повторите попытку")
        return true
      }
    },
    signOut: async () => {
      await AsyncStorage.removeItem("user")
      dispatchLoginState({ type: 'logout' })
    },
    signUp: async (data) => {
      let response = await fetch(api + 'registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        response = await fetch(api + 'login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({ username: data.username, password: data.password })
        });
        if (response.ok) {
          console.log(response.status)
          let user = await response.json();
          console.log(JSON.stringify(user))
          if (user) {
            await AsyncStorage.setItem("user", JSON.stringify(user));
            dispatchLoginState({
              type: 'login',
              user: new User(user)
            });
          } else {
            Alert.alert("Упс...", "Не удалось зарегистрироваться. Проверьте правильность введенных данных и повторите попытку")
            return true
          }
        } else {
          Alert.alert("Упс...", "Не удалось зарегистрироваться. Проверьте правильность введенных данных и повторите попытку")
          return true
        }
      } else {
        Alert.alert("Упс...", "Не удалось зарегистрироваться. Проверьте правильность введенных данных и повторите попытку")
        return true
      }
    },
    getUser: () => {
      return loginState.user
    },
    getToken: () => {
      return loginState.user.access_token
    },
    editAccount: async (data) => {
      let requestBody = JSON.stringify({
        username: data.username ?? "",
        email: data.email ?? "",
        phone: data.phone ?? "",
        birthday: data.birthday ?? "",
        address: data.address ?? "",
        gender: data.gender ?? 0,
        name: data.name ?? "",
        lastName: data.lastName ?? ""
      }).replace("null", "\"\"")
      console.log("\n\n" + requestBody)
      let response = await fetch(api + 'profile', {
        method: 'PUT',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${data.access_token}`
        },
        body: requestBody,
      });
      let user = await response.json();
      if (response.ok) {
        await AsyncStorage.setItem("user", JSON.stringify(user));
        dispatchLoginState({
          type: 'edit',
          user: new User(user)
        });
      } else {
        console.log(JSON.stringify(user))
        Alert.alert(
          "Что-то пошло не так...",
          "Не удалось изменить аккаунт. Проверьте правильность введенных данных и повторите попытку",
          [{ text: "OK", onPress: () => { } }])
        return true
      }
    },
    getLoading: () => loginState.isLoading
  }))

  useEffect(() => {
    AsyncStorage.getItem("user").then(async (savedJson) => {
      if (savedJson) {
        let response = await fetch(api + 'profile', {
          method: 'GET',
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(savedJson).access_token}`
          },
        });
        if (Math.trunc(response.status / 100) != 2) {
          dispatchLoginState({ type: 'logout' })
        } else {
          let json = await response.json();
          dispatchLoginState({
            type: 'retrieve_token',
            user: json ? new User({
              ...json,
              access_token: JSON.parse(savedJson).access_token
            }) : null,
          });
        }
      } else {
        dispatchLoginState({ type: 'logout' })
      }
    }).catch((e) => { console.log("Error on starting the app", e.stackTrace) })
  }, [])

  useEffect(() => {
    console.log(loginState)
  }, [loginState])

  LogBox.ignoreLogs(['Remote debugger']);
  return (
    <AuthContext.Provider value={authContext}>
      <SafeAreaProvider>
        <NavigationContainer>
          {
            !loginState.isLoading ?
              loginState.user && loginState.user.access_token ?
                  <Stack.Navigator
                    screenOptions={{ headerShown: false }}
                    initialRouteName="Loading"
                  >
                    <Stack.Screen
                      name="Loading"
                      component={LoadingScreen}
                    />
                    <Stack.Screen
                      name="Main"
                      component={MainScreen}
                    />
                    <Stack.Screen
                      name="NewGame"
                      component={NewGameScreen}
                    />
                    <Stack.Screen
                      name="PlaygroundChoice"
                      component={PlaygroundChoiceScreen}
                    />
                    <Stack.Screen
                      name="AddPlayground"
                      component={AddPlaygroundScreen}
                    />
                    <Stack.Screen
                      name="Schedule"
                      component={ScheduleScreen}
                    />
                    <Stack.Screen
                      name="ScheduleSingle"
                      component={ScheduleSingleScreen}
                    />
                    <Stack.Screen
                      name="Price"
                      component={PriceScreen}
                    />
                    <Stack.Screen
                      name="PriceSingle"
                      component={PriceSingleScreen}
                    />
                    <Stack.Screen
                      name="EditAccount"
                      component={EditAccountScreen}
                    />
                    <Stack.Screen
                      name="PlaygroundDetails"
                      component={PlaygroundDetailsScreen}
                    />
                    <Stack.Screen
                      name="PastGameDetails"
                      component={PastGameDetailsScreen}
                    />
                    <Stack.Screen
                      name="OfferedGameDetails"
                      component={OfferedGameDetailsScreen}
                    />
                    <Stack.Screen
                      name="Payment"
                      component={PaymentScreen}
                    />
                    
                  <Stack.Screen
                    name="ImageGallery"
                    component={ImageGalleryScreen}
                  />
                    <Stack.Screen
                      name="AddCard"
                      component={AddCardScreen}
                    />
                  </Stack.Navigator>
                :
                <Stack.Navigator
                  screenOptions={{ headerShown: false }}
                  initialRouteName="Intro"
                >
                  <Stack.Screen
                    name="Intro"
                    component={IntroScreen}
                  />
                  <Stack.Screen
                    name="SignInSignUp"
                    component={SignInSignUpScreen}
                  />
                  <Stack.Screen
                    name="Authorization"
                    component={AuthorizationScreen}
                  />
                  <Stack.Screen
                    name="PasswordRecovery"
                    component={PasswordRecoveryScreen}
                  />
                  <Stack.Screen
                    name="Registration"
                    component={RegistrationScreen}
                  />
                </Stack.Navigator>
              : <Stack.Navigator
                screenOptions={{ headerShown: false }}
              >
                <Stack.Screen
                  name="Loader"
                  component={LoaderScreen}
                />
              </Stack.Navigator>
          }
        </NavigationContainer>
        <StatusBar translucent={true} barStyle="light-content" backgroundColor="rgba(0,0,0,0)" />
      </SafeAreaProvider>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
