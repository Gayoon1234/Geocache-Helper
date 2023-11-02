import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import SavedPuzzleModel from "../../app/models/SavedPuzzleModel";

interface CardProps {
  savedPuzzle: SavedPuzzleModel;
}
const SavedPuzzleCard: React.FC<CardProps> = ({ savedPuzzle }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{savedPuzzle.title}</Text>
      <View style={styles.iconBox}>
        <Pressable>
          <FontAwesome name="trash" style={styles.icon} size={20} />
        </Pressable>
        <FontAwesome name="edit" style={styles.icon} size={20} />
      </View>
    </View>
  );
};

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

export default SavedPuzzleCard;
