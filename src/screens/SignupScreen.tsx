import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

const SignupScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Signup Screen</Text>
      <Text>inputs</Text>
      <Button title="input" />
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
