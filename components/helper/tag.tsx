import Colors from "../../constants/Colors";
import { View, Text } from "../Themed";
import { Pressable, StyleSheet } from "react-native";

interface TagProps {
  name: string;
  value: string;
  remove: (name: string) => void;
}
const Tag: React.FC<TagProps> = ({ name, value, remove }) => {
  return (
    <Pressable style={styles.tag} onPress={() => remove(name)}>
      <Text style={styles.text}>
        {name}={value}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  tag: {
    backgroundColor: Colors.theme.EarthYellow,
    padding: 7,
    borderRadius: 20,
    alignSelf: "flex-start",
    margin: 5,
    elevation: 10,
  },
  text: {
    fontSize: 18,
    color: Colors.theme.Pakistan,
  },
});
export default Tag;
