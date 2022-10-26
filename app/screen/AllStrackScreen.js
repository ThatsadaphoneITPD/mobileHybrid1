import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../config/globalColor";
import {
  TripAdd,
  ExpenseAdd,
  TripEdit,
  ExpenseList,
  HomeTrip,
  Search,
  CloudAPI,
} from "./index";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Alert, LogBox } from "react-native";
import { deleteTripTableWithAllExpense } from "../Data/TripDBhelper";
LogBox.ignoreLogs(["Remote debugger"]);
const Stack = createNativeStackNavigator();

const HomeNavigate = () => {
  return (
    <Stack.Navigator
      //   screenOptions={{ headerShown: false }}
      initialRouteName="Trip"
    >
      <Stack.Screen
        name="Trip"
        component={HomeTrip}
        options={{
          title: "Overview Trip",
          headerRight: () => (
            <Icon
              onPress={() =>
                Alert.alert("Delete!", "Sure All Trip", [
                  {
                    text: "Yes",
                    onPress: () => deleteTripTableWithAllExpense(),
                  },
                  { text: "No", onPress: () => console.log("No") },
                ])
              }
              name="delete"
              size={40}
              color={colors.DustRed}
            />
          ),
        }}
      />
      <Stack.Screen name="AddTrip" component={TripAdd} />
      <Stack.Screen name="Expense" component={ExpenseList} />
      <Stack.Screen name="AddExpense" component={ExpenseAdd} />
      <Stack.Screen name="EditTrip" component={TripEdit} />
    </Stack.Navigator>
  );
};
export { HomeNavigate };
const SearckNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Search"
    >
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
};
export { SearckNavigator };

const CloudAPINavigator = () => {
  return (
    <Stack.Navigator
      //   screenOptions={{ headerShown: false }}
      initialRouteName="Cloud"
    >
      <Stack.Screen name="Cloud" component={CloudAPI} />
    </Stack.Navigator>
  );
};
export { CloudAPINavigator };
