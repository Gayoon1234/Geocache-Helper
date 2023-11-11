import { Modal, Text, View, StyleSheet, Pressable } from "react-native";
import Colors from "../../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";

interface CustomModalProps {
  text: string;
  visible: boolean;
  setVisible: (arg0: boolean) => void;
}

const CustomModal: React.FC<CustomModalProps> = ({
  text,
  visible,
  setVisible,
}) => {
  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View style={styles.modalContainer}>
        <Text style={styles.text}>{text}</Text>
        <Pressable
          onPress={() => {
            setVisible(false);
          }}
          style={styles.fauxButton}
        >
          <FontAwesome
            name="check"
            style={{
              textAlign: "center",
              color: Colors.theme.EarthYellow,
            }}
            size={25}
          />
        </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.theme.Pakistan,
    opacity: 0.9,
  },
  text: {
    fontSize: 28,
    color: Colors.theme.Cornsilk,
    paddingBottom: 35,
    textAlign: "center",
  },
  fauxButton: {
    backgroundColor: Colors.theme.TigersEye,
    padding: 10,
    paddingVertical: 20,
    margin: 2,
    borderRadius: 10,
    width: "80%",
  },
});
export default CustomModal;
