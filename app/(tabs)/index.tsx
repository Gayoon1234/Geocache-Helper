import { ScrollView, StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import Variables from "../../components/multicache/Variables";
import { useState } from "react";

export default function TabOneScreen() {
  const [variables, setVariables] = useState<{ name: string; value: string }[]>(
    []
  );

  return (
    <View style={styles.container}>
      <View style={styles.variableContainer}>
        <Variables variables={variables} setVariables={setVariables} />
      </View>
      <View
        style={[
          styles.coordinateContainter,
          { backgroundColor: Colors.yolo.wood },
        ]}
      >
        <Text style={styles.title}>Item 2</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  variableContainer: {
    height: "30%",
    margin: "1%",
  },
  coordinateContainter: {
    height: "70%",
    backgroundColor: "#ccc",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
