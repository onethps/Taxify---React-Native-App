import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';

import ScreenWrapper from '../layout/ScreenWrapper';

const HomeScreen = () => {
  const nav = useNavigation();
  return (
    <ScreenWrapper>
      <Text>HomeScreen</Text>
      <Button title="NAvigate" onPress={() => nav.navigate('MapScreen')} />
    </ScreenWrapper>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
