import { ImageBackground, ScrollView, StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import SavedPuzzleCard from "../../components/saved/SavedPuzzleCard";
import SavedPuzzleModel from "../models/SavedPuzzleModel";
import { useSaveData } from "../contexts/SaveDataContext";
import CustomModal from "../../components/helper/CustomModal";

export default function TabTwoScreen() {
  const { saveData } = useSaveData();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/background2.jpg")}
        style={styles.backgroundImage}
      >
        <View style={styles.top}>
          <Text style={styles.heading}>Saved Puzzles</Text>
          <Text style={styles.subtitle}>
            Here is a list of everything you have saved.
          </Text>
        </View>
        <ScrollView>
          {saveData && saveData?.length > 0 ? (
            saveData.map((puzzle: SavedPuzzleModel) => {
              return (
                <SavedPuzzleCard savedPuzzle={puzzle} key={puzzle.title} />
              );
            })
          ) : (
            <Text style={[styles.heading, { marginTop: 300 }]}>
              You have nothing saved!
            </Text>
          )}
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  heading: {
    textAlign: "center",
    fontSize: 24,
    color: Colors.theme.Cornsilk,
    fontWeight: "bold",
  },
  subtitle: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
    color: Colors.theme.EarthYellow,
  },
  top: {
    marginTop: 35,
    borderRadius: 20,
    padding: 2,
    width: 340,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    alignSelf: "center",
  },
});
