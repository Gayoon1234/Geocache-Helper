import React, { useState } from "react";
import { Button, Modal, TextInput, View, Text, StyleSheet } from "react-native";
import Tag from "../helper/tag";

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
      {/* <Text style={styles.heading}>Variables:</Text> */}

      <View style={styles.variablesContainer}>
        {variables.map((v, i) => (
          <Tag name={v.name} value={v.value} key={i} />
        ))}
      </View>
      <Button title="Add" onPress={toggleModal} />
      <Button
        title="Clear"
        onPress={() => {
          setVariables([]);
        }}
      />
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
