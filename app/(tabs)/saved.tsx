import { ImageBackground, ScrollView, StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";

const SavedPuzzleCard = () => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: Colors.theme.DarkMoss,
      width: 360,
      marginTop: 10,
      margin: 2,
      alignSelf: "center",
      borderRadius: 20,
      padding: 10,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    iconBox: {
      flexDirection: "row",
      gap: 15,
      backgroundColor: Colors.theme.DarkMoss,
    },
    text: {
      color: Colors.theme.EarthYellow,
      fontSize: 18,
    },
    icon: {
      color: Colors.theme.EarthYellow,
      fontSize: 20,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Alsume's Airport MC</Text>
      <View style={styles.iconBox}>
        <FontAwesome name="trash" style={styles.icon} size={20} />
        <FontAwesome name="edit" style={styles.icon} size={20} />
      </View>
    </View>
  );
};

export default function TabTwoScreen() {
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
          <SavedPuzzleCard />
          <SavedPuzzleCard />
          <SavedPuzzleCard />
          <SavedPuzzleCard />
          <SavedPuzzleCard />
          <SavedPuzzleCard />
          <SavedPuzzleCard />
          <SavedPuzzleCard />
          <SavedPuzzleCard />
          <SavedPuzzleCard />
          <SavedPuzzleCard />
          <SavedPuzzleCard />
          <SavedPuzzleCard />
          <SavedPuzzleCard />
          <SavedPuzzleCard />
          <SavedPuzzleCard />
          <SavedPuzzleCard />
          <SavedPuzzleCard />
          <SavedPuzzleCard />
          <SavedPuzzleCard />
          <SavedPuzzleCard />
          <SavedPuzzleCard />
          <SavedPuzzleCard />
          <SavedPuzzleCard />
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
    backgroundColor: Colors.theme.Pakistan,
    width: 340,
    alignSelf: "center",
  },
});
