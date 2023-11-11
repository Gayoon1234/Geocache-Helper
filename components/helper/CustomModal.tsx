import { Modal, Text, View, StyleSheet, Pressable } from "react-native";
import Colors from "../../constants/Colors";

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
  //   const [visible, setVisible] = useState(true);
  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View style={styles.modalContainer}>
        <Pressable
          onPress={() => {
            setVisible(false);
          }}
        >
          <Text style={styles.text}>{text}</Text>
          <Text style={styles.text}>Close</Text>
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
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  text: {
    fontSize: 28,
    color: Colors.theme.Cornsilk,
  },
});
export default CustomModal;
