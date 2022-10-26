import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { FocuseStatusBar, FloatingButton } from "../component";
import globalColor from "../config/globalColor";
import colors from "../config/globalColor";
import {
  createTable,
  testDatabase,
  displayALlTrips,
  createTableExpense,
} from "../Data/TripDBhelper";

// testDatabase();
createTable;
createTableExpense();

const DATA = [
  {
    id: "1",
    name: "He",
    destination: "DN",
    date: "22/3/22",
    risk: "false",
    description: "gone",
  },
  {
    id: "3",
    name: "He",
    destination: "DN",
    date: "22/3/22",
    risk: "false",
    description: "gone",
  },
];

const Item = ({ data, navigation }) => (
  <TouchableOpacity
    onPress={() =>
      navigation.navigate("EditTrip", {
        trip_id: data.id,
        nameTrip: data.name,
        destinationT: data.destination,
        dateT: data.date,
        riskT: data.risk,
        descriptionT: data.description,
      })
    }
  >
    <View style={styles.item}>
      <View style={{ flex: 1, flexDirection: "column" }}>
        <Text>{data.name}</Text>
        <Text> {data.destination}</Text>
      </View>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Text>{data.description}</Text>
      </View>
      <View style={{ flex: 1, flexDirection: "row-reverse" }}>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <Text>{data.date}</Text>
          <Text> {data.risk}</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

function Trip({ navigation }) {
  let [flatListItems, setFlatListItems] = useState([]);
  let [redender, setRender] = useState(false);

  useEffect(() => {
    displayALlTrips(setFlatListItems);
  }, [flatListItems]);

  return (
    <SafeAreaView style={styles.container}>
      <FocuseStatusBar backgroundColor={globalColor.Volcano} />

      <FlatList
        data={flatListItems}
        renderItem={({ item }) => <Item data={item} navigation={navigation} />}
        keyExtractor={(item) => item.id}
      />

      <FloatingButton
        onPress={() => navigation.navigate("AddTrip")}
        title={"Trip"}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginBottom: 20,
    backgroundColor: "#fff",
  },
  item: {
    backgroundColor: colors.Lime,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flex: 1,
    flexDirection: "row",
  },
  title: {
    fontSize: 15,
  },
  row: {
    padding: 10,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  box: {
    width: 50,
    height: 80,
  },
});

export default Trip;
