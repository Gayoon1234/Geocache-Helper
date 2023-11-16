import {
  Modal,
  Text,
  View,
  StyleSheet,
  Pressable,
  StatusBar,
  FlatList,
  Clipboard,
} from "react-native";
import Colors from "../../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import CustomModal from "./CustomModal";
import { useSaveData } from "../../app/contexts/SaveDataContext";

interface MoreModalProps {
  visible: boolean;
  setVisible: (arg0: boolean) => void;
}

interface SettingsOptionProps {
  id: string;
  title: string;
  icon: string;
  settingsFunction: () => void;
}

const SettingsOption: React.FC<SettingsOptionProps> = ({
  title,
  icon,
  settingsFunction,
}) => (
  <Pressable onPress={settingsFunction} style={styles.settingsOptionContainer}>
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
  </Pressable>
);

const MoreModal: React.FC<MoreModalProps> = ({ visible, setVisible }) => {
  const [visible2, setVisible2] = useState(false);
  const [modalText, setModalText] = useState("");
  const { saveData } = useSaveData();

  const exportSaves = () => {
    Clipboard.setString(JSON.stringify(saveData));
    setModalText(
      `All the data has been copied to the clipboard. Go and paste it somewhere safe.`
    );
    setVisible2(true);
  };

  const importSaves = () => {
    setModalText("This feature is coming soon!");
    setVisible2(true);
  };

  const showPrivacyPolicy = () => {
    setModalText(
      "All data entered into this app is stored locally, your information remains private and does not leave your device."
    );
    setVisible2(true);
  };

  const settingsOptions: SettingsOptionProps[] = [
    {
      id: "1",
      title: "Import",
      icon: "download",
      settingsFunction: () => {
        importSaves();
      },
    },
    {
      id: "2",
      title: "Export",
      icon: "upload",
      settingsFunction: () => {
        exportSaves();
      },
    },
    {
      id: "3",
      title: "Privacy Policy",
      icon: "user-secret",
      settingsFunction: () => {
        showPrivacyPolicy();
      },
    },
  ];

  const renderSettings = ({ item }: { item: SettingsOptionProps }) => (
    <SettingsOption
      title={item.title}
      id={item.id}
      icon={item.icon}
      settingsFunction={item.settingsFunction}
    />
  );

  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.theme.Pakistan}
      />
      <CustomModal
        text={modalText}
        visible={visible2}
        setVisible={setVisible2}
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
        <Text style={styles.title}>Settings</Text>
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
    marginTop: 30,
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
