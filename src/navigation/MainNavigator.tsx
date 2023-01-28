import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MapScreen from '../screens/MapScreen';
import HomeScreen from '../screens/HomeScreen';
import VerificationScreen from '../screens/VerificationScreen';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="MapScreen"
            component={MapScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="VerificationScreen"
            component={VerificationScreen}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default MainNavigator;
