import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  Alert,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { addExpenseNew } from "../Data/TripDBhelper";

export default function Addexpense({ navigation, route }) {
  const { trip_id } = route.params;
  const [expense, setExpense] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const message =
    "Expense Data:" +
    "\n\n" +
    "Expense" +
    ":\t" +
    expense +
    "\n\n" +
    "Amount" +
    ":\t" +
    amount +
    "\n\n" +
    "Date" +
    ":\t" +
    date;
  const Toast = (message) => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };
  const addExpense = async () => {
    try {
      addExpenseNew(expense, amount, date, trip_id);
      console.log(expense, amount, date, trip_id);
    } catch (err) {
      console.log(err);
    }
  };

  const Summit = () => {
    try {
      if (!expense) {
        Toast("Select Type, pls fulfill");
      } else if (!amount) {
        Toast("Amount is Empty, pls fulfill");
      } else if (!date) {
        Toast("Date is Empty, pls fulfill");
      } else {
        Alert.alert("Add Expense", message, [
          { text: "Yes", onPress: () => addExpense() },
          { text: "No", onPress: () => console.log("No") },
        ]);
      }
    } catch (error) {
      Toast(error.message);
      // console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>{trip_id}</Text>
      <Text>Expense</Text>
      <TextInput
        style={styles.input}
        onChangeText={(input) => setExpense(input)}
        placeholder="Expense"
      />
      <Text>Amount</Text>
      <TextInput
        style={styles.input}
        onChangeText={(input) => setAmount(input)}
        placeholder="Amount"
        keyboardType="numeric"
      />
      <Text>Date</Text>
      <TextInput
        style={styles.input}
        onChangeText={(input) => setDate(input)}
        placeholder="Date"
      />

      <Button title="Add" onPress={Summit} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    margin: 10,
    width: 200,
  },
});
