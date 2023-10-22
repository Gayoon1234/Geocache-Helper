import { View, Text } from "../Themed";
import { StyleSheet } from "react-native";

interface TagProps {
  name: string;
  value: string;
}
const Tag: React.FC<TagProps> = ({ name, value }) => {
  return (
    <View style={styles.tag}>
      <Text>
        {name}={value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tag: {
    backgroundColor: "#000",
    padding: 7,
    borderRadius: 20,
    alignSelf: "flex-start",
    margin: 5,
  },
});
export default Tag;
