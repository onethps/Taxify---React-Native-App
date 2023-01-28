import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const nav = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Text>HomeScreen</Text>
      <Button title="NAvigate" onPress={() => nav.navigate("MapScreen")} />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
