import React, { useState } from "react";
import {
  Button,
  Modal,
  TextInput,
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import Tag from "../helper/tag";
import Colors from "../../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";

interface VariablesProps {
  variables: { name: string; value: string }[];
  setVariables: React.Dispatch<
    React.SetStateAction<{ name: string; value: string }[]>
  >;
}

const Variables: React.FC<VariablesProps> = ({ variables, setVariables }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [variableName, setVariableName] = useState("");
  const [variableValue, setVariableValue] = useState("");

  const addVariable = () => {
    if (variableName && variableValue) {
      setVariables([
        ...variables,
        { name: variableName, value: variableValue },
      ]);
      setVariableName("");
      setVariableValue("");
      toggleModal();
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.input}
            placeholder="Variable Name"
            value={variableName}
            onChangeText={(text) => setVariableName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Variable Value"
            value={variableValue}
            onChangeText={(text) => setVariableValue(text)}
          />
          <View style={styles.buttonContainer}>
            <Button title="Add Variable" onPress={addVariable} />
            <Button title="Cancel" onPress={toggleModal} />
          </View>
        </View>
      </Modal>
      <View style={styles.variablesContainer}>
        {variables.map((v, i) => (
          <Tag name={v.name} value={v.value} key={i} />
        ))}
      </View>
      <View style={styles.AddClearContainer}>
        <Pressable
          onPress={toggleModal}
          style={[styles.fauxButton, { flex: 0.8 }]}
        >
          <FontAwesome
            name="plus"
            style={{ textAlign: "center", color: Colors.theme.Pakistan }}
            size={20}
          />
        </Pressable>
        <Pressable
          onPress={() => {
            setVariables([]);
          }}
          style={[styles.fauxButton, { flex: 0.2 }]}
        >
          <FontAwesome
            name="eraser"
            style={{ textAlign: "center", color: Colors.theme.Pakistan }}
            size={20}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  input: {
    width: "80%",
    marginBottom: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },
  AddClearContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  fauxButton: {
    backgroundColor: Colors.theme.TigersEye,
    padding: 10,
    margin: 2,
    borderRadius: 10,
  },
  variablesContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  variableText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default Variables;
