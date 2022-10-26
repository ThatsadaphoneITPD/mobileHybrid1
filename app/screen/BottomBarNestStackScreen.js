import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { HomeTrip, Search } from "./index";
import {
  HomeNavigate,
  SearckNavigator,
  CloudAPINavigator,
} from "./AllStrackScreen";
const Tab = createBottomTabNavigator();

const BottomBar = () => {
  return (
    <Tab.Navigator
      initialRouteName="TripHome"
      screenOptions={{
        tabBarActiveTintColor: "#e91e63",
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="TripHome"
        component={HomeNavigate}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="SearchTrip"
        component={SearckNavigator}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="magnify-expand"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CloudAPI"
        component={CloudAPINavigator}
        options={{
          tabBarLabel: "Cloud",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="cloud-upload"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomBar;
