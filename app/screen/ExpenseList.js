import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FocuseStatusBar, FloatingButton } from "../component";
import globalColor from "../config/globalColor";
import colors from "../config/globalColor";
import { createTableExpense, displayExpenseOfTrip } from "../Data/TripDBhelper";
createTableExpense();
const DATA = [
  {
    id: "1",
    name: "Food",
    amount: "200000",
    date: "2/5/22",
    trip_id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
  },
  {
    id: "2",
    name: "Sea",
    amount: "200000",
    date: "2/5/22",
    trip_id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
  },
  {
    id: "3",
    name: "SPA",
    amount: "200000",
    date: "2/5/22",
    trip_id: "58694a0f-3da1-471f-bd96-145571e29d72",
  },
];

const ExpenseList = ({ navigation, route }) => {
  const { trip_id_Edit } = route.params;
  let [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    displayExpenseOfTrip(trip_id_Edit, setFlatListItems);
  }, [flatListItems]);

  const Item = ({ data }) => (
    <View style={styles.item}>
      <View style={{ flex: 1, flexDirection: "column" }}>
        <Text>{data.type}</Text>
        <Text> {data.amount}</Text>
      </View>
      {/* <Text>{trip_id}</Text> */}
      <View style={{ flex: 1, flexDirection: "row-reverse" }}>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <Text>{data.date}</Text>
          <Text> {trip_id_Edit}</Text>
        </View>
      </View>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <FocuseStatusBar backgroundColor={globalColor.Volcano} />
      <View>
        <FlatList
          data={flatListItems}
          renderItem={({ item }) => <Item data={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
      <FloatingButton
        onPress={() =>
          navigation.navigate("AddExpense", {
            trip_id: trip_id_Edit,
          })
        }
        title={""}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  item: {
    backgroundColor: colors.Volcano,
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

export default ExpenseList;
