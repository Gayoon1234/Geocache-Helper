import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import SavedPuzzleModel from "../../app/models/SavedPuzzleModel";
import { useSaveData } from "../../app/contexts/SaveDataContext";
import { useRouter } from "expo-router";
interface CardProps {
  savedPuzzle: SavedPuzzleModel;
}
const SavedPuzzleCard: React.FC<CardProps> = ({ savedPuzzle }) => {
  const { saveData, setSaveData } = useSaveData();
  const router = useRouter();

  const remove = () => {
    if (saveData) {
      setSaveData(saveData.filter((x) => x.title !== savedPuzzle.title));
    }
  };

  const edit = () => {
    router.push({
      pathname: "/(tabs)/",
      params: { puzzle: savedPuzzle.title },
    });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{savedPuzzle.title}</Text>
      <View style={styles.iconBox}>
        <Pressable onPress={remove}>
          <FontAwesome name="trash" style={styles.icon} size={40} />
        </Pressable>
        <Pressable onPress={edit}>
          <FontAwesome name="edit" style={styles.icon} size={40} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.theme.DarkMoss,
    opacity: 0.9,
    width: 400,
    marginTop: 10,
    margin: 2,
    alignSelf: "center",
    borderRadius: 20,
    padding: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconBox: {
    flexDirection: "row",
    gap: 25,
    backgroundColor: "transparent",
  },
  text: {
    color: Colors.theme.EarthYellow,
    fontSize: 22,
  },
  icon: {
    color: Colors.theme.EarthYellow,
    fontSize: 35,
  },
});

export default SavedPuzzleCard;
