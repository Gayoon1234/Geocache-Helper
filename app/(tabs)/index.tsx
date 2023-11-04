import { ScrollView, StyleSheet } from "react-native";
import { View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import Variables from "../../components/multicache/Variables";
import { useEffect, useState } from "react";
import Calculator from "../../components/multicache/Calculator";
import Variable from "../models/SavedPuzzleModel";
import { useLocalSearchParams } from "expo-router";
import { useSaveData } from "../contexts/SaveDataContext";
import SavedPuzzleModel from "../models/SavedPuzzleModel";
import { LinearGradient } from "expo-linear-gradient";

const TabOneScreen = () => {
  const params = useLocalSearchParams();
  const { puzzle } = params;
  // console.log(puzzle);
  const { getSaveDataByTitle } = useSaveData();

  const savedPuzzle: SavedPuzzleModel | null = getSaveDataByTitle(
    puzzle as string
  );

  const [variables, setVariables] = useState<Variable[]>([]);

  // console.group();
  // console.log(savedPuzzle ? "True" : "False");
  // console.log(savedPuzzle?.variables);
  // console.log(variables);
  // console.groupEnd();

  useEffect(() => {
    if (savedPuzzle) {
      setVariables(savedPuzzle.variables);
    }
  }, [puzzle]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <LinearGradient
        // Background Linear Gradient
        colors={[Colors.theme.EarthYellow, Colors.theme.TigersEye]}
        style={styles.background}
      />
      <View style={styles.variableContainer}>
        <Variables variables={variables} setVariables={setVariables} />
      </View>
      <View style={styles.coordinateContainter}>
        <Calculator variables={variables} savedPuzzle={savedPuzzle} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  variableContainer: {
    height: "30%",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
  },
  coordinateContainter: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.0)",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
    // height: 600,
  },
});

export default TabOneScreen;
