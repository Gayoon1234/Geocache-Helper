import Colors from "../../constants/Colors";
import { View, Text } from "../Themed";
import { StyleSheet } from "react-native";

interface TagProps {
  name: string;
  value: string;
}
const Tag: React.FC<TagProps> = ({ name, value }) => {
  return (
    <View style={styles.tag}>
      <Text style={styles.text}>
        {name}={value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tag: {
    backgroundColor: Colors.theme.DarkMoss,
    padding: 7,
    borderRadius: 20,
    alignSelf: "flex-start",
    margin: 5,
  },
  text: {
    fontSize: 18,
  },
});
export default Tag;
