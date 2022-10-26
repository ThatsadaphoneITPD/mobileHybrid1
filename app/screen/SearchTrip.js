import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { SearchBar, List } from "../component";
import colors from "../config/globalColor";
import { searchTrip } from "../Data/TripDBhelper";

const Item = ({ data }) => (
  <TouchableOpacity>
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
const SearchTrip = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [Data, setData] = useState([]);

  // get data from the fake api endpoint
  useEffect(() => {
    searchTrip(searchPhrase, setData);
  }, [Data]);
  return (
    <SafeAreaView>
      {!clicked && <Text style={styles.title1}>Search Trip on SQLite DB</Text>}
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      <FlatList
        data={Data}
        renderItem={({ item }) => <Item data={item} />}
        keyExtractor={(item) => item.id}
      />
      {/* {
        <List
          searchPhrase={searchPhrase}
          data={fakeData}
          setClicked={setClicked}
        />
      } */}
    </SafeAreaView>
  );
};

export default SearchTrip;

const styles = StyleSheet.create({
  title1: {
    width: "100%",
    marginTop: 20,
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: "10%",
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
