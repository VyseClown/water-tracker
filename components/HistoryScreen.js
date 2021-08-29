import React from "react";
import * as firebase from "firebase";
import { Dimensions, StyleSheet, View } from "react-native";
import { Title } from "react-native-paper";
import { CalendarList } from "react-native-calendars";
import { today } from "../utilities";
import DateData from "./DateData";

export default function HistoryScreen() {
  const [marked, setMarked] = React.useState({});
  const [waterObject, setWaterObject] = React.useState({});
  const [selected, setSelected] = React.useState(null);

  // Currently breaks the app
  React.useEffect(() => {
    firebase
      .database()
      .ref("users/001/")
      .on("value", (snapshot) => {
        const data = snapshot.val();
        console.log("data", data);
        const prods = Object.values(data);
        console.log("prods", prods);
        const markedData = prods.reduce(
          (obj, item) => ({ ...obj, [item.date]: { selected: true } }),
          {}
        );
        console.log("markedData", markedData);
        const waterData = prods.reduce(
          (obj, item) => ({ ...obj, [item.date]: item.waterAmount }),
          {}
        );
        console.log("waterData", waterData);
        setMarked(markedData);
        setWaterObject(waterData);
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, "0");
        var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + "-" + mm + "-" + dd;
        setSelected(today);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Title>Water intake history</Title>
      <View style={styles.calendar}>
        <CalendarList
          theme={{
            calendarBackground: "#131A26",
            textSectionTitleColor: "#ffffff",
            selectedDayTextColor: "#ffffff",
            selectedDayBackgroundColor: "#2176FF",
            dayTextColor: "#ffffff",
            monthTextColor: "#ffffff",
            textMonthFontWeight: "bold",
          }}
          firstDay={1}
          horizontal={true}
          pagingEnabled={true}
          onDayPress={(day) => {
            console.log(
              "waterObject.hasOwnProperty",
              waterObject.hasOwnProperty(day["dateString"])
            );
            console.log('day["dateString"]', day["dateString"]);
            if (!waterObject.hasOwnProperty(day["dateString"])) {
              setSelected(null);
            } else {
              setSelected(day["dateString"]);
            }
          }}
          markedDates={{
            ...marked,
            [today()]: { selected: true, selectedColor: "#81c5fe" },
          }}
        />
      </View>
      <View style={styles.content}>
        <DateData date={selected} chartData={waterObject} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginTop: 20,
    alignItems: "center",
  },
  calendar: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  content: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  buttons: {
    flex: 0,
    flexDirection: "row",
    width: Dimensions.get("window").width,
    justifyContent: "space-evenly",
  },
});
