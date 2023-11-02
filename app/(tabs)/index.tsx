import { ImageBackground, ScrollView, StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import Variables from "../../components/multicache/Variables";
import { useState } from "react";
import Calculator from "../../components/multicache/Calculator";
import Variable from "../models/SavedPuzzleModel";
const TabOneScreen = () => {
  const [variables, setVariables] = useState<Variable[]>([]);

  return (
    <View style={styles.container}>
      <View style={styles.variableContainer}>
        <Variables variables={variables} setVariables={setVariables} />
      </View>
      <View style={styles.coordinateContainter}>
        <Calculator variables={variables} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  variableContainer: {
    height: "30%",
    backgroundColor: Colors.theme.EarthYellow,
  },
  coordinateContainter: {
    height: "70%",
    backgroundColor: Colors.theme.EarthYellow,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default TabOneScreen;
