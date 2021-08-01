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
