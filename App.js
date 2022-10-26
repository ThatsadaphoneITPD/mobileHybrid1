import { StatusBar } from "expo-status-bar";

import { StyleSheet, Text, View } from "react-native";
import { React, useState, useEffect } from "react";
import { NavBottomBar } from "./app/screen";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import {
  HomeNavigate,
  SearckNavigator,
  CloudAPINavigator,
} from "./app/screen/AllStrackScreen";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    backgroundColor: "transparent",
  },
};

export default function App() {
  return (
    <NavigationContainer theme={theme}>
      <NavBottomBar />
      {/* <HomeNavigate /> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
