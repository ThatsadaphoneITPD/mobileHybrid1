import React, { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  Alert,
  Switch,
  ToastAndroid,
} from "react-native";
import { addTripNew } from "../Data/TripDBhelper";

function AddTrip({ navigation }) {
  const [name, setName] = useState("");
  const [destination, setDestination] = useState("");
  const [prick, setPick] = useState(new Date());
  const [date, setDate] = useState("");
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(!show);
    setPick(currentDate);
    let formattedDate = moment(prick).format("MMM. DD. YYYY");
    setDate(formattedDate.toString());
  };
  const [risk, setRisk] = useState(false);
  const toggleSwitch = () => {
    setRisk(!risk);
  };
  const [description, setDescription] = useState("");
  useEffect(() => {}, [date, show]);
  const message =
    "Trip Data:" +
    "\n\n" +
    "Title" +
    ":\t" +
    name +
    "\n\n" +
    "Destination" +
    ":\t" +
    destination +
    "\n\n" +
    "Date" +
    ":\t" +
    date +
    "\n\n" +
    "Risk" +
    ":\t" +
    risk +
    "\n\n" +
    "Description" +
    ":\t" +
    description;

  const Toast = (message) => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };
  const addTrip = async () => {
    try {
      addTripNew(name, destination, date, risk.toString(), description);
    } catch (err) {
      console.log(err);
    }
  };

  const Summit = () => {
    try {
      if (!name) {
        Toast("Name is Empty, pls fulfill");
      } else if (!destination) {
        Toast("Destination is Empty, pls fulfill");
      } else if (!date) {
        Toast("Date is Empty, pls fulfill");
      } else if (risk == false) {
        Toast("Select!t Risk pls fulfill");
      } else if (!description) {
        Toast("Description is Empty, pls fulfill");
      } else {
        Alert.alert("Add New Trip", message, [
          { text: "Yes", onPress: () => addTrip() },
          { text: "No", onPress: () => console.log("No") },
        ]);
      }
    } catch (error) {
      Toast(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Trip</Text>
      <TextInput
        style={styles.input}
        onChangeText={(input) => setName(input)}
        placeholder="Name"
      />
      <Text>Destination</Text>
      <TextInput
        style={styles.input}
        onChangeText={(input) => setDestination(input)}
        placeholder="Destination"
      />
      <Text onPress={() => setShow(!show)}>Date </Text>
      <TextInput
        style={styles.input}
        defaultValue={date}
        // onChangeText={(input) => setDate(input)}
        placeholder="Date"
      />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={prick}
          mode={"date"}
          is24Hour={true}
          onChange={onChange}
        />
      )}
      <Text>Risk</Text>
      <Switch
        trackColor={{ false: "red", true: "green" }}
        thumbColor={risk ? "yellow" : "pink"}
        onValueChange={toggleSwitch}
        ios_backgroundColor="red"
        value={risk}
      />
      <Text>Description</Text>
      <TextInput
        style={styles.input}
        onChangeText={(input) => setDescription(input)}
        placeholder="Description"
      />
      <Button title="Press me" onPress={Summit} />
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

export default AddTrip;
