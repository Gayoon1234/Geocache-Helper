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
    <View style={styles.container}>
      <View style={styles.variableContainer}>
        <Variables variables={variables} setVariables={setVariables} />
      </View>
      <ScrollView
        style={styles.coordinateContainter}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Calculator variables={variables} savedPuzzle={savedPuzzle} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  variableContainer: {
    // height: "30%",
    flex: 0.4,
    backgroundColor: Colors.theme.EarthYellow,
  },
  coordinateContainter: {
    // height: "100%",
    flex: 1.6,
    backgroundColor: Colors.theme.EarthYellow,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default TabOneScreen;
