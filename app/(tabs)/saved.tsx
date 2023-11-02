import { StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import Colors from "../../constants/Colors";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Saved Puzzles</Text>
      <Text style={styles.subtitle}>
        Here is a list of everything you have saved.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  heading: {
    textAlign: "center",
    fontSize: 24,
    color: Colors.theme.TigersEye,
    paddingTop: 35,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 12,
    color: Colors.theme.TigersEye,
  },
});
