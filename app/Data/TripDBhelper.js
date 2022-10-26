import * as SQLite from "expo-sqlite";
import { Alert, ToastAndroid } from "react-native";
const db = SQLite.openDatabase("home5.db");

export const testDatabase = () => {
  db.transaction((txn) => {
    txn.executeSql("DROP TABLE IF EXISTS table_trips", []);
    txn.executeSql("DROP TABLE IF EXISTS table_expense", []);
    txn.executeSql(
      "CREATE TABLE IF NOT EXISTS table_trips(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, destination TEXT, date TEXT, risk TEXT, description TEXT)",
      []
    );
    txn.executeSql(
      "CREATE TABLE IF NOT EXISTS table_expense(id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT, amount TEXT, date TEXT, trip_id INTEGER, FOREIGN KEY(id) REFERENCES table_trips(id) ON DELETE CASCADE)",
      []
    );

    txn.executeSql(
      "INSERT INTO table_trips (name, destination, date, risk, description) VALUES (:name,:destination,:date,:risk,:description)",
      ["Vietnam", "DN", "2/11/22", "true", "Go!"]
    );
    txn.executeSql(
      "INSERT INTO table_trips (name, destination, date, risk, description) VALUES (:name,:destination,:date,:risk,:description)",
      ["US", "LA", "2/11/22", "false", "Notgo!"]
    );
    txn.executeSql(
      "INSERT INTO table_trips (name, destination, date, risk, description) VALUES (:name,:destination,:date,:risk,:description)",
      ["Laos", "Asia", "2/11/22", "false", "Notgo!"]
    );
    txn.executeSql(
      "INSERT INTO table_expense (type, amount, date, trip_id) VALUES (:type,:amount,:date,:trip_id)",
      ["Food", "2000", "2/11/22", 1]
    );
    txn.executeSql("SELECT * FROM `table_expense`", [], (tx, res) => {
      var temp = [];
      for (let i = 0; i < res.rows.length; ++i) {
        console.log("item:", res.rows.item(i));
        temp.push(res.rows.item(i));
        console.log("item:", temp);
      }
    });
  });
};
//Toast message
const Toast = (message) => {
  ToastAndroid.showWithGravityAndOffset(
    message,
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    25,
    50
  );
};
export const createTable = () => {
  db.transaction((txn) => {
    txn.executeSql("DROP TABLE IF EXISTS table_trips", []);
    txn.executeSql(
      "CREATE TABLE IF NOT EXISTS table_trips(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, destination TEXT, date TEXT, risk TEXT, description TEXT)",
      []
    );
    // txn.executeSql(
    //   "INSERT INTO table_trips (name, destination, date, risk, description) VALUES (:name,:destination,:date,:risk,:description)",
    //   ["Vietnam", "DN", "2/11/22", "true", "Go!"]
    // );

    txn.executeSql("SELECT * FROM `table_trips`", [], (tx, res) => {
      var temp = [];
      for (let i = 0; i < res.rows.length; ++i) {
        console.log("item:", res.rows.item(i));
        temp.push(res.rows.item(i));
        console.log("item:", temp);
        Toast("TripTB create" + res.rows.length);
      }
    });
    Toast("TripTB create");
  });
};
export const addTripNew = (name, destination, date, risk, description) => {
  db.transaction((txn) => {
    txn.executeSql(
      "INSERT INTO table_trips (name, destination, date, risk, description) VALUES (:name,:destination,:date,:risk,:description)",
      [name, destination, date, risk, description],
      (tx, results) => {
        console.log("Results", results.rowsAffected);
        if (results.rowsAffected > 0) {
          Toast("Add New Trip successfully");
        } else Toast("Add Failed");
      }
    );
  });
};
export const createTableExpense = () => {
  db.transaction(function (txn) {
    txn.executeSql("DROP TABLE IF EXISTS table_expense", []);
    txn.executeSql(
      "CREATE TABLE IF NOT EXISTS table_expense(id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT, amount TEXT, date TEXT, trip_id INTEGER, FOREIGN KEY(id) REFERENCES table_trips(id) ON DELETE CASCADE)",
      []
    );
    // txn.executeSql(
    //   "INSERT INTO table_expense (type, amount, date, trip_id) VALUES (:type,:amount,:date,:trip_id)",
    //   ["Food", "2000", "2/11/22", 1]
    // );
    txn.executeSql("SELECT * FROM `table_expense`", [], (tx, res) => {
      var temp = [];
      for (let i = 0; i < res.rows.length; ++i) {
        console.log("item:", res.rows.item(i));
        temp.push(res.rows.item(i));
        console.log("item:", temp);
        Toast("Expense create" + res.rows.length);
      }
    });
    // Toast("TripTB create");
  });
};

export const addExpenseNew = (type, amount, date, trip_id) => {
  db.transaction((txn) => {
    txn.executeSql(
      "INSERT INTO table_expense (type, amount, date, trip_id) VALUES (:type,:amount,:date,:trip_id)",
      [type, amount, date, trip_id],
      (tx, results) => {
        console.log("ResultsExpense", results.rowsAffected);
        if (results.rowsAffected > 0) {
          Toast("Add New Expense successfully");
        } else Toast("Add Expense Failed");
      }
    );
  });
};
export const displayALlTrips = (setListArr) => {
  db.transaction((tx) => {
    tx.executeSql("SELECT * FROM table_trips", [], (tx, results) => {
      var temp = [];
      for (let i = 0; i < results.rows.length; ++i)
        temp.push(results.rows.item(i));
      setListArr(temp);
    });
  });
};
export const displayExpenseOfTrip = (trip_id_edit, setListArr) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM table_expense where trip_id = ?",
      [trip_id_edit],
      (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setListArr(temp);
      }
    );
  });
};
export const editTrips = (
  trip_id,
  name,
  destination,
  date,
  risk,
  description
) => {
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE table_trips set name=?, destination=? , date=? , risk=? , description=? where id=?",
      [name, destination, date, risk, description, trip_id],
      (tx, results) => {
        console.log("Results", results.rowsAffected);
        if (results.rowsAffected > 0) {
          Toast("Trip updated successfully");
        } else Toast("Updation Failed");
      }
    );
  });
};
export const searchTrip = (trip_name, setListArr) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM table_trips where name = ?",
      [trip_name],
      (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setListArr(temp);
      }
    );
  });
};

export const deleteTripTableWithAllExpense = () => {
  db.transaction(function (txn) {
    txn.executeSql("DELETE FROM table_trips", []);
    txn.executeSql("DELETE FROM table_expense", []);
  });
};
