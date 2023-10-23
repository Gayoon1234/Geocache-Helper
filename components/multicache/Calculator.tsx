import { useState } from "react";
import { Text } from "../Themed";
import { StyleSheet, TextInput, View } from "react-native";
import Colors from "../../constants/Colors";

interface CalculatorProps {
  variables: { name: string; value: string }[];
}

const Calculator: React.FC<CalculatorProps> = ({ variables }) => {
  const [northSouthDirection, setNorthSouthDirection] = useState("S");
  const [northDegrees, setNorthDegrees] = useState("37");
  const [northMinutes, setNorthMinutes] = useState("");

  const [eastWestDirection, setEastWestDirection] = useState("E");
  const [eastDegrees, setEastDegrees] = useState("144");
  const [eastMinutes, setEastMinutes] = useState("");

  return (
    // <View style={styles.container}>
    <>
      <Text style={styles.heading}>Calculator</Text>
      <View style={styles.container}>
        <View style={styles.row}>
          <TextInput
            style={styles.inputDirection}
            placeholder="N/S"
            value={northSouthDirection}
            onChangeText={setNorthSouthDirection}
          />
          <TextInput
            style={styles.inputDegree}
            placeholder="Degrees"
            value={northDegrees}
            onChangeText={setNorthDegrees}
          />
          <TextInput
            style={styles.input}
            placeholder="Decimal Minutes"
            value={northMinutes}
            onChangeText={setNorthMinutes}
          />
        </View>

        {/* Second Row: East/West */}
        <View style={styles.row}>
          <TextInput
            style={styles.inputDirection}
            placeholder="E/W"
            value={eastWestDirection}
            onChangeText={setEastWestDirection}
          />
          <TextInput
            style={styles.inputDegree}
            placeholder="Degrees"
            value={eastDegrees}
            onChangeText={setEastDegrees}
          />
          <TextInput
            style={styles.input}
            placeholder="Decimal Minutes"
            value={eastMinutes}
            onChangeText={setEastMinutes}
          />
        </View>
      </View>
    </>
  );
};

const baseInputStyle = {
  paddingHorizontal: 8,
  fontSize: 24,
};

const styles = StyleSheet.create({
  heading: {
    textAlign: "center",
    fontSize: 24,
    paddingTop: 5,
    paddingBottom: 15,
    color: Colors.theme.Pakistan,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    ...baseInputStyle,
  },
  inputDirection: {
    flex: 0.2,
    ...baseInputStyle,
  },
  inputDegree: {
    flex: 0.3,
    ...baseInputStyle,
  },
});

export default Calculator;
