import { ImageBackground, ScrollView, StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import SavedPuzzleCard from "../../components/saved/SavedPuzzleCard";
import SavedPuzzle from "../../components/models/SavedPuzzle";

export default function TabTwoScreen() {
  const DummyData: SavedPuzzle = {
    title: "The Cache at the airport",
    variables: { a: 1, b: 2, c: 3 },
    coordinates: {
      lat: {
        direction: "S",
        degrees: "37",
        minutes: "342.A*B",
      },
      long: {
        direction: "E",
        degrees: "144",
        minutes: "35. A+B",
      },
    },
  };

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
          <SavedPuzzleCard savedPuzzle={DummyData} />
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
