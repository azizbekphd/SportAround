import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingScreen from './screens/LoadingScreen';
import IntroScreen from './screens/IntroScreen';
import AuthorizationScreen from './screens/AuthorizationScreen';
import PasswordRecoveryScreen from './screens/PasswordRecoveryScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View, StatusBar } from 'react-native';
import SignInSignUpScreen from './screens/SignInSignUpScreen';
import SportChoiceScreen from './screens/SportChoiceScreen';
import NewGameScreen from './screens/NewGameScreen';
import PlaygroundChoiceScreen from './screens/PlaygroundsChoiceScreen';
import AddPlaygroundScreen from './screens/AddPlaygroundScreen';
import ScheduleScreen from './screens/ScheduleScreen';
import ScheduleSingleScreen from './screens/ScheduleSingleScreen';
import PriceScreen from './screens/PriceScreen';
import PriceSingleScreen from './screens/PriceSingleScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Loading"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen
            name="Loading"
            component={LoadingScreen}
          />
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
          <Stack.Screen
            name="SportChoice"
            component={SportChoiceScreen}
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
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar translucent={true} barStyle="light-content" backgroundColor="rgba(0,0,0,0)" />
    </>
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
