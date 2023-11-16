import {
  Modal,
  Text,
  View,
  StyleSheet,
  Pressable,
  StatusBar,
  FlatList,
} from "react-native";
import Colors from "../../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";

interface MoreModalProps {
  visible: boolean;
  setVisible: (arg0: boolean) => void;
}

interface SettingsOptionProps {
  id: string;
  title: string;
  icon: string;
}

const SettingsOption: React.FC<SettingsOptionProps> = ({ title, icon }) => (
  <View style={styles.settingsOptionContainer}>
    <FontAwesome
      //@ts-ignore
      name={icon}
      style={{
        textAlign: "center",
        color: Colors.theme.Cornsilk,
      }}
      size={40}
    />
    <Text style={styles.text}>{title}</Text>
  </View>
);

const MoreModal: React.FC<MoreModalProps> = ({ visible, setVisible }) => {
  const settingsOptions: SettingsOptionProps[] = [
    { id: "1", title: "Import", icon: "download" },
    { id: "2", title: "Export", icon: "upload" },
    { id: "3", title: "Privacy Policy", icon: "user-secret" },
    // Add more settings options as needed
  ];

  const renderSettings = ({ item }: { item: SettingsOptionProps }) => (
    <SettingsOption title={item.title} id={item.id} icon={item.icon} />
  );

  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.theme.Pakistan}
      />

      <View style={styles.modalContainer}>
        <Pressable
          onPress={() => {
            setVisible(false);
          }}
          style={styles.fauxButton}
        >
          <FontAwesome
            name="times"
            style={{
              textAlign: "center",
              color: Colors.theme.EarthYellow,
            }}
            size={40}
          />
        </Pressable>
        <Text style={styles.title}>Settings and Stuff</Text>
        <FlatList
          data={settingsOptions}
          renderItem={renderSettings}
          keyExtractor={(item) => item.id}
          numColumns={3}
          contentContainerStyle={{ padding: 10, marginTop: 30 }}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.theme.Pakistan,
    opacity: 0.96,
  },
  fauxButton: {
    padding: 7,
    margin: 2,
    borderRadius: 10,
    position: "absolute",
    alignSelf: "flex-end",
  },
  title: {
    color: Colors.theme.EarthYellow,
    fontSize: 24,
    alignSelf: "center",
    marginTop: 20,
    fontWeight: "bold",
  },
  settingsOptionContainer: {
    flex: 1,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.theme.DarkMoss,
    paddingBottom: 10,
    paddingTop: 10,
    borderRadius: 40,
  },
  text: {
    color: Colors.theme.Cornsilk,
  },
});
export default MoreModal;
